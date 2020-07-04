import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
//axios 拦截
import './utils/axios'

import {parseTime} from './utils'

import Highlight from './utils/highlight'; // from 路径是highlight.js的路径，纯属自定义
Vue.use(Highlight);

import './assets/css/style.less'
import './assets/font/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.filter('parseTime', (v) => parseTime(v,'{y}-{m}-{d}'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
