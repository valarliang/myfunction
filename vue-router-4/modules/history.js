// 创建自定义的路由state
function buildState(back, current, forward, replace=false, computedScroll) {
  return {
    back, current, forward, replace,
    scroll: computedScroll ? {left: window.pageXOffset, top: window.pageYOffset} : null,
    position: window.history.length - 1
  }
}
// 获取当前路由
function createCurrentLocation(base = '') {
  const { pathname, search, hash } = window.location
  // hash模式下
  const hashPos = base.indexOf('#')
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos))
      ? base.slice(hashPos).length
      : 1
    let pathFromHash = hash.slice(slicePos) // 去掉用户自定义的base和'#'，获取path
    if (pathFromHash[0] !== '/') pathFromHash = '/' + pathFromHash // 默认为'/'
    return pathFromHash
  }
  return pathname + search + hash
}

function useHistoryStateNavigation(base = '') {
  const currentLocation = { value: createCurrentLocation(base) } // 获取当前路由
  const historyState = { value: window.history.state } // 导航状态

  function changeLocation(to, state, replace) {
    const url = base.indexOf('#') > -1 ? base + to : to // 跳转路径要拼base
    window.history[replace ? 'replaceState' : 'pushState'](state, null, url)
    historyState.value = state
  }
  // 初始化自定义history state
  if (!historyState.value) {
    changeLocation(currentLocation.value, buildState(null, currentLocation.value, null, true), true)
  }
  // replace方法
  function replace(to, data) {
    const state = Object.assign(
      {},
      buildState(historyState.value.back, to, historyState.value.forward, true),
      data
    );
    changeLocation(to, state, true);
    currentLocation.value = to
  }
  // push方法
  function push(to, data) {
    // 跳转前状态更新
    const currentState = Object.assign(
      {},
      historyState.value,
      { forward: to, scroll: {left: window.pageXOffset, top: window.pageYOffset} }
    );
    changeLocation(currentLocation.value, currentState, true)
    // 跳转后状态
    const state = Object.assign({},
      buildState(currentLocation.value, to, null),
      {position: currentState.position + 1},
      data
    );
    changeLocation(to, state, false)
    currentLocation.value = to
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  }
}
// 监听浏览器前进后退按钮
function useHistoryListeners(base, preState, preLocation) {
  const listeners = []
  const popStateHandler = ({state}) => {
    // 保存跳转之前的状态
    const to = createCurrentLocation(base);
    const from = preLocation.value;
    const fromState = preState.value;
    // 更新跳转之后的状态
    preLocation.value = to;
    preState.value = state;
    const isBack = state.position - fromState.position < 0
    // 执行用户回调
    listeners.forEach(listener => listener(to, from, {isBack}))
  }

  window.addEventListener('popstate', popStateHandler)
  function listen(cb) {
    listeners.push(cb)
  }
  return { listen }
}


export function createWebHistory(base) {
  // 路由状态维护
  const historyNavigation = useHistoryStateNavigation(base)
  // 监听浏览器前进后退按钮
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location)

  const historyRoute = Object.assign({}, historyNavigation, historyListeners)
  Object.defineProperty(historyRoute, 'location', {
    get: () => historyNavigation.location.value
  })
  Object.defineProperty(historyRoute, 'state', {
    get: () => historyNavigation.state.value
  })
  return historyRoute
}

export function createWebHashHistory(base) {
  base = location.host ? base || location.pathname + location.search : ''
  // allow the user to provide a `#` in the middle: `/base/#/app`
  if (!base.includes('#')) base += '#'
  return createWebHistory(base)
}


