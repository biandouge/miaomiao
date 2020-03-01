import Vue from 'vue'
import VueRouter from 'vue-router'
import moveRouter from './move'
import mineRouter from './mine'
import cinemaRouter from './cinema'

Vue.use(VueRouter)

const routes = [
  moveRouter,
  mineRouter,
  cinemaRouter,
    //防止找不到路由的时候页面挂掉，配置一下页面重定向
  {
    path: '/*',
    redirect: '/move'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
