import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home')
const ResetPswVerify = () => import('../views/reset_psw/PhoneVerify')
const SetPsw = () => import('../views/reset_psw/SetPsw')
const SetSuccess = () => import('../views/reset_psw/SetSuccess')

Vue.use(VueRouter)

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
  }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
