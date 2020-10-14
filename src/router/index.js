import Vue from 'vue'
import VueRouter from 'vue-router'
import Faqs from '../views/Faqs.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/faqs', component: Faqs}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
