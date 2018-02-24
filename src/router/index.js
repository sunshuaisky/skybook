import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Mainbook from '@/components/Mainbook'
import Booklist from '@/components/Booklist'
import Read from '@/components/Read'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Home',
		component: Home
	}, {
		path: '/mainbook/:bid',
		name: 'Mainbook',
		component: Mainbook
	}, {
		path: '/booklist/:type',
		name: 'Booklist',
		component: Booklist
	}, {
		path: '/read/:bid',
		name: 'Read',
		component: Read
	}]
})