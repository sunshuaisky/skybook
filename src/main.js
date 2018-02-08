// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import http from './utils/http'
import api from './utils/api'
import store from './store/index'

Vue.use(MintUI)

Vue.config.productionTip = false

Vue.prototype.$http = http;
Vue.prototype.api = api;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App,
	},
	template: '<App/>'
})