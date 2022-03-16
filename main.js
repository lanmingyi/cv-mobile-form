import Vue from 'vue'
import App from './App'
import uView from "uview-ui";


import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import {
	http
} from '@/common/api/index.js' // 全局挂载引入，配置相关在该index.js文件里修改

Vue.prototype.$http = http
// Vue.prototype.$baseUrl = 'http://192.168.1.104:20004'
// Vue.prototype.$baseUrl = 'https://vue.misboot.com'
Vue.config.productionTip = false
Vue.use(uView);
Vue.use(Antd);



App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
