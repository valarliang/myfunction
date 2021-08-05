export const RouterView = {
  name: 'RouterView',
  props: {
    name: { // 一个页面有多个组件时通过name区分渲染（<route-view name="/>）
      type: String,
      default: 'default'
    },
  },
  setup(props, {slots}) {
    const depth = Vue.inject('depth', 0) // 当前组件在嵌套路由中的下标，默认0，从上到下渲染
    const route = Vue.inject('route location')
    const matchedRoute = Vue.computed(() => route.matched[depth]) // route.matched: [Home, HomeChildren]
    Vue.provide('depth', depth + 1) // 给嵌套的children传递depth

    return () => {
      const matchRoute = matchedRoute.value
      const component = matchRoute && matchRoute.components[props.name] // 获取组件以渲染

      if (!component) return slots.default && slots.default()
      return Vue.h(component)
    }
  }
}
