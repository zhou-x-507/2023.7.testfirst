// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import LoginView from '../components/LoginView'
import CeShi from '../components/CeShi'
import Test from '../components/Test'


//创建并暴露一个路由器
const router =  new VueRouter({
	routes:[
		{
			name:'login',
			path:'/login',
			component:LoginView,
			meta:{isLogin:false,title:'login'}
		},
		{
			name:'ceshi',
			path:'/ceshi',
			component:CeShi,
			meta:{isLogin:true,title:'ceshi'}
		},
		{
			name:'test',
			path:'/test',
			component:Test,
			meta:{isLogin:true,title:'test'}
		},
	]
})


// 前置路由守卫
router.beforeEach((to, from, next) => {
	// 查看本地存储，如果存在 token ，说明已经登录并记住了登录状态。否则需要重新登录。
	let token = window.localStorage.getItem('token');
	console.log('getItem_token', token)
	if (token) {
		// ==========存在 "Flag" "isLogin" 时==========
		if (!to.meta.isLogin) {
			// to 不需要登录状态的路径时（如：登录页），重定向至主页
			// next({path:'/ceshi'})
			next()
		} else {
			// to 需要登录状态的路径时（如：主页），可以直接访问
			next()
		}
	} else {
		// ==========没有 "Flag" "isLogin" 时==========
		if (to.meta.isLogin) {
			// to 需要登录状态的路径时（如：主页），重定向至登录
			next({path:'/login'})
		} else {
			// to 不需要登录状态的路径时（如：登录页），可以直接访问
			next()
		}
	}
})



export default router
