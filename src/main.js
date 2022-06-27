import Vue from 'vue'
import App from './App.vue'



Vue.config.productionTip = false

// 引入路由配置文件
import VueRouter from 'vue-router'
import router from '../router'

import store from '../store'

// 引入axios
import axios from 'axios'
axios.defaults.baseURL="http://106.15.3.117:8887"
Vue.prototype.$http=axios

// 引入全局样式
import './assets/css/global.css'

// 引入样式
import 'element-ui/lib/theme-chalk/index.css';
import {Button,Form,FormItem,Input,Message,Container,Header,
  Aside,Main,Submenu,MenuItemGroup,MenuItem,Menu,
  Breadcrumb,BreadcrumbItem,Card,Row,Col,Table,TableColumn,Switch,
  Loading,Tooltip,Pagination,Dialog,Progress,MessageBox,Tag} from 'element-ui';
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Loading)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Progress)
Vue.use(Tag)



import * as echarts from 'echarts'
import {TitleComponent,TooltiComponent,LegendComponent,GridComponent,
  DatasetComponent,TransformComponent
} from 'echarts/components'
import {PieChart,LineChart} from 'echarts/charts'
import {LabelLayout,UniversalTransition} from 'echarts/features'
import {CanvasRenderer} from 'echarts/renderers'
Vue.use([
  TitleComponent,TooltiComponent,LegendComponent,PieChart,LabelLayout,
  CanvasRenderer,GridComponent,DatasetComponent,TransformComponent,
  LineChart,UniversalTransition
])

// 挂载使用
Vue.prototype.$message=Message
Vue.prototype.$messagebox=MessageBox
Vue.prototype.$echarts=echarts

// 注册使用路由
Vue.use(VueRouter)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
