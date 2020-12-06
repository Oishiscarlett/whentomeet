import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import "./assets/iconfont/iconfont.css";
import "./assets/iconfont2/iconfont.css";
import axios from 'axios';
import api from './api' // 导入api接口
import VueCookies from 'vue-cookies'
import clipboard from 'clipboard'
import VueClipboard from 'vue-clipboard2'
import animate from 'animate.css' //动画效果


Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码
Vue.use(VueClipboard)

Vue.use(VueCookies)
Vue.prototype.clipboard = clipboard

Vue.use(VueClipboard)
Vue.use(animate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.afterEach((to,from, next) => {

  window.scrollTo(0,0)

})
  
