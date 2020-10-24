import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home')
const ResetPswVerify = () => import('../views/reset_psw/PhoneVerify')
const SetPsw = () => import('../views/reset_psw/SetPsw')
const SetSuccess = () => import('../views/reset_psw/SetSuccess')
const Login = () => import('../views/Login')
const Faqs = () => import('../views/Faqs')

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
// 重写了原型上的push方法，统一的处理了错误信息
// 解决了路由跳转到相同页面时抛出的错误
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/resetpsw',
    redirect: '/resetpsw/verify',
  },
  {
    path: '/resetpsw/verify',
    component: ResetPswVerify
  },
  {
    path: '/resetpsw/password',
    component: SetPsw
  },
  {
    path: '/resetpsw/success',
    component: SetSuccess
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/faqs',
    component: Faqs
  },
]

const router = new VueRouter({
  routes: routes,
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router