import Vue from 'vue'
import App from './App'
import router from './router'
import $ajax from './utils/ajax.js'
import {
	RouterMount
} from 'uni-simple-router'
import store from './store'
import './api'
import formatDate from 'utils/utils.js'
import {socket} from './utils/socket'
Vue.filter('formatDate', formatDate)
Vue.prototype.$store = store
Vue.prototype.$ajax = $ajax
Vue.prototype.UniSocket = socket
Vue.config.productionTip = false

App.mpType = 'app'

//导入国际化
import i18n from './locale/index.js'
Vue.prototype._i18n = i18n
/* 
	导入工具
 */
import {
	msg,
	debounce,
	throttle,
	prePage,
	date
} from '@/utils/utils.js'

import filter from './utils/filter/filter.js'
Vue.prototype.$util = {
	msg,
	debounce,
	throttle,
	prePage,
	date
}
// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
	...App,
	router,
	store,
	i18n
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, '#app');
// #endif

// #ifndef H5
app.$mount(); //
// #endif
