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

import { Form,FormItem,Input,Table,TableColumn,Button,Select,Col,DatePicker,Option, Pagination, Cascader } from 'element-ui';
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Input.name, Input);
Vue.component(Col.name, Col);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Option.name, Option);
Vue.component(Pagination.name, Pagination);
Vue.component(Cascader.name, Cascader);


//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	router:router
})
