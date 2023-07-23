// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import LoginView from '../components/LoginView'
import CeShi from '../components/CeShi'


//创建并暴露一个路由器
const router =  new VueRouter({
	routes:[
		{
			name:'login',
			path:'/login',
			component:LoginView,
			// meta:{}
		},
		{
			name:'ceshi',
			path:'/ceshi',
			component:CeShi,
			// meta:{}
		},
	]
})

// //全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
// router.beforeEach((to,from,next)=>{
// 	console.log('前置路由守卫',to,from)
// 	if(to.meta.isAuth){ //判断是否需要鉴权
// 		if(localStorage.getItem('school')==='atguigu'){
// 			next()
// 		}else{
// 			alert('学校名不对，无权限查看！')
// 		}
// 	}else{
// 		next()
// 	}
// })

// //全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
// router.afterEach((to,from)=>{
// 	console.log('后置路由守卫',to,from)
// 	document.title = to.meta.title || '硅谷系统'
// })

export default router
