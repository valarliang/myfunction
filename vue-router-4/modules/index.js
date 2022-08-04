import createRouterMatcher from "./matcher.js"
import { RouterLink } from "./RouterLink.js"
import { RouterView } from "./RouterView.js"
export { createWebHistory, createWebHashHistory } from "./history.js"

const START_LOCATION_NORMALIZED = {
  path: '/',
  // name: undefined,
  // params: {},
  // query: {},
  // hash: '',
  // fullPath: '/',
  matched: [], // 当前匹配的记录
  // meta: {},
  // redirectedFrom: undefined,
}
function useCallback() {
  const handlers = []
  function add(handler) {
    handlers.push(handler)
  }
  return { add, list: handlers }
}
function extractChangeRecords(to, from) {
  const leavingRecords = [], updateRecords = [], enteringRecords = []
  const recordsFrom = from.matched, recordsTo = to.matched
  const len = Math.max(recordsFrom.length, recordsTo.length) // /home/a/b --> /home/c
  for (let i = 0; i < len; i++) {
    const recordFrom = recordsFrom[i]
    if (recordFrom) {
      if (recordsTo.find(record => record.path == recordFrom.path)) { // 要更新的组件 e.g./home
        updateRecords.push(recordFrom)
      } else { // 离开的组件 e.g. /a、/a/b
        leavingRecords.push(recordFrom)
      }
    }
    const recordTo = recordsTo[i]
    if (recordTo) { // 要进入的组件 e.g. /c
      if (!recordsFrom.find(record => record.path == recordTo.path)) enteringRecords.push(recordTo)
    }
  }
  return [leavingRecords, updateRecords, enteringRecords]
}
function guardToPromiseFn(guard, to, from, record) {
  return () => new Promise((resolve, reject) => {
    const next = resolve
    const guardReturn = guard.call(record, to, from, next)
    return Promise.resolve(guardReturn).then(next) // 守卫如果没调用next，这里会执行next
  })
}
function extractComponentsGuards(records, guardType, to, from) {
  const guards = []
  for (const record of records) {
    for (const name in record.components) { // Object is not iterable不能用for...of
      const rawComponent = record.components[name]
      const guard = rawComponent[guardType]
      guard && guards.push(guardToPromiseFn(guard, to, from, record))
    }
  }
  return guards
}
function runGuardQueue(guards) {
  return guards.reduce((acc, guard) => acc.then(() => guard()), Promise.resolve())
}

// router插件初始化
export function createRouter(options) {
  const routerHistory = options.history; // 维护路由状态、监听前进后退
  const matcher = createRouterMatcher(options.routes) // 格式化路由配置，构建路由父子关系（将输入的嵌套路由树平铺）
  // shallowRef 不会将值转为代理对象（使用原值，所以可以使用解构并且只跟踪 currentRoute.value 的修改，后续通过修改 value 更新视图）
  const currentRoute = Vue.shallowRef(START_LOCATION_NORMALIZED)

  const beforeGuards = useCallback();
  const beforeResolveGuards = useCallback();
  const afterGuards = useCallback();

  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push({to, replace: true})
  }

  function pushWithRedirect(to) {
    // 跳转前
    const targetLocation = resolve(to); // 解析得到目标 START_LOCATION_NORMALIZED
    const from = currentRoute.value
    const replace = to.replace === true
    // 处理跳转导航守卫
    navigate(targetLocation, from).then(() => {
      return finalizeNavigation(targetLocation, from, replace) // 跳转并更新路由状态
    }).then(() => {
      // 执行跳转后的afterEach守卫
      for (const guard of afterGuards.list) guard(to, from)
    })
  }
  function resolve(to) {
    if (typeof to === 'string') {
      return matcher.resolve({path: to}) // 通过 matcher 的链表收集匹配的路由配置
    }
    return matcher.resolve(to)
  }
  function finalizeNavigation(to, from, replace) {
    // 如果是页面初始化会执行 replace 跳转以初始化路由状态
    if (from === START_LOCATION_NORMALIZED || replace) routerHistory.replace(to.path)
    else routerHistory.push(to.path)
    currentRoute.value = to // 更新 $route
    markAsReady() // 初始化时挂载 监听浏览器前进后退的回调
  }

  let ready
  function markAsReady() {
    if (ready) return // 只挂载一次
    ready = true
    routerHistory.listen((to) => {
      const targetLocation = resolve(to);
      const from = currentRoute.value
      finalizeNavigation(targetLocation, from, true) // 使用 replace更新浏览器前进后退之后的状态
    })
  }
  function navigate(to, from) {
    const [leavingRecords, updateRecords, enteringRecords] = extractChangeRecords(to, from) // 收集参与跳转的组件
    let guards = extractComponentsGuards(leavingRecords.reverse(), 'beforeRouteLeave', to, from) // 收集离开组件的守卫
    return runGuardQueue(guards).then(() => {
      // 执行beforEatch守卫
      guards = beforeGuards.list.map(guard => guardToPromiseFn(guard, to, from, guard))
      return runGuardQueue(guards)
    }).then(() => {
      // 收集和执行beforeRouteUpdate（更新组件的守卫）
      guards = extractComponentsGuards(updateRecords, 'beforeRouteUpdate', to, from)
      return runGuardQueue(guards)
    }).then(() => {
      // 收集和执行路由配置的beforEnter守卫
      guards = to.matched.reduce((acc, record) =>{
        record.beforEnter && acc.push(guardToPromiseFn(record.beforEnter, to, from, record))
        return acc
      }, [])
      return runGuardQueue(guards)
    }).then(() => {
      // 收集和执行beforeRouteEnter（进入的组件的守卫）
      guards = extractComponentsGuards(enteringRecords, 'beforeRouteEnter', to, from)
      return runGuardQueue(guards)
    }).then(() => {
      // 执行beforeResolve守卫
      guards = beforeResolveGuards.list.map(guard => guardToPromiseFn(guard, to, from, guard))
      return runGuardQueue(guards)
    })
  }

  const router = {
    push,
    replace,
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    install(app) {
      const router = this
      // 兼容vue2的 $router、$route
      app.config.globalProperties.$router = router;
      Object.defineProperty(app.config.globalProperties, '$route', {
        get:() => Vue.unref(currentRoute)
      })
      // vue3组合式API的router、route: useRouter()、useRoute()
      const reactiveRoute = {}
      for(let key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = Vue.computed(() => currentRoute.value[key])
      }
      app.provide('router', router)
      app.provide('route location', Vue.reactive(reactiveRoute)) // 使用reactive可略去 .value: reactiveRoute.path

      app.component('RouterLink', RouterLink);
      app.component('RouterView', RouterView);
      // 初始化时 START_LOCATION_NORMALIZED 默认无 matched，通过触发 push 匹配
      if (currentRoute.value === START_LOCATION_NORMALIZED) {
        push(routerHistory.location)
      }
    }
  }
  return router
}
