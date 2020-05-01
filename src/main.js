// 插件
import Vue from 'vue'
import router from './router'
import axios from 'axios'

// 组件
// 第三方组件与样式
import './assets/js/vant_import.js'
import 'vant/lib/index.css'
// 自定义组件与样式
import App from './App.vue'
import './assets/css/index.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
