import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//时间格式化
import {parseTime} from './utils'
Vue.filter('parseTime', (v) => parseTime(v,'{y}-{m}-{d}'))


import Highlight from './utils/highlight'; // from 路径是highlight.js的路径，纯属自定义
Vue.use(Highlight);

import './assets/css/style.less'
import './assets/font/iconfont.css'

Vue.config.productionTip = false

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue;
