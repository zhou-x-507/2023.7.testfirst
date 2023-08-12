//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'

//关闭Vue的生产提示
Vue.config.productionTip = false
//应用插件
Vue.use(VueRouter)

import { Form,FormItem,Input,Table,TableColumn,Button,Link,Select,Col,DatePicker,Option,Pagination,Cascader,Container,Header,Aside,Main,Footer  } from 'element-ui';
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Button.name, Button);
Vue.component(Link.name, Link);
Vue.component(Select.name, Select);
Vue.component(Input.name, Input);
Vue.component(Col.name, Col);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Option.name, Option);
Vue.component(Pagination.name, Pagination);
Vue.component(Cascader.name, Cascader);
Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Aside.name, Aside);
Vue.component(Main.name, Main);
Vue.component(Footer.name, Footer);

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080" // 配置请求默认接口
axios.defaults.timeout = 15000 // 设置请求超时时间
axios.defaults.withCredentials = false; // 是否允许跨域携带cookie信息
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; // 配置请求头
// 配置请求拦截器，用于 JWT 登录认证
axios.interceptors.request.use((config) => { 
    // 获取token
    let token = window.localStorage.getItem('token');
	console.log('=====token=====', token)
    // 添加token
    token && (config.headers.token = token)
    return config;
}, (error) => {
    // 请求出错
    return Promise.reject(error);
});

Vue.prototype.$axios = axios

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	router:router,
	
})