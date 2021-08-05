import { createRouter, createWebHistory, createWebHashHistory } from './modules/index.js'

const Home = { template: '<h2>Home</h2>' }
const About = {
  template: `
    <div>
      <h2>About</h2>
      <router-link class="link" to="/about/posts">posts</router-link>
      <router-view></router-view>
    </div>
  `,
  beforeRouteEnter(to, from, next) {
    console.log('before about RouteEnter')
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    console.log('before about RouteUpdate')
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    console.log('before about RouteLeave')
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
 }
const Other = { template: '<h2>Other</h2>' }
const UserPosts = { template: '<h4>Posts</h4>' }

const routes = [
  { path: '/', component: Home },
  {
    path: '/about',
    component: About,
    children: [
      {
        path: 'posts',
        component: UserPosts,
      },
    ],
    beforeEnter(to,from,next) {
      console.log('before about Enter')
    }
  },
  { path: '/other', component: Other },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to,from,next) => {
  console.log('beforeEach', to)
})
router.beforeResolve((to,from,next) => {
  console.log('beforeResolve', to)
})
router.afterEach((to,from,next) => {
  console.log('afterEach', to)
})

const app = Vue.createApp({})
app.use(router)
app.mount('#app')
// 导航被触发。
// 在失活的组件里调用 beforeRouteLeave 守卫。
// 调用全局的 beforeEach 守卫。
// 在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
// 在路由配置里调用 beforeEnter。
// 解析异步路由组件。
// 在被激活的组件里调用 beforeRouteEnter。
// 调用全局的 beforeResolve 守卫(2.5+)。
// 导航被确认。
// 调用全局的 afterEach 钩子。
// 触发 DOM 更新。
// 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
