// 路由配置文件

// 引入
import VueRouter from "vue-router";
import Login from '../src/view/Login'
import Home from '../src/view/Home'
import Welcome from '../src/view/Welcome'
import User from '../src/view/User'
import Rights from '../src/view/Rights'
import Roles from '../src/view/Roles'
import Power from '../src/view/Power'
import Param from '../src/view/Param'
import Sort from '../src/view/Sort'
import Listes from '../src/view/Listes'
import Dates from '../src/view/Dates'


// 穿件实例化对象
const router=new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/login'
        },
        {
            path:'/login',
            component:Login,
            meta:{title:'登陆'}
        },
        {
            path:'/home',
            component:Home,
            meta:{isAout:true},
            // 重定向
            redirect:'/welcome',
            children:[
                {
                    path:'/welcome',
                    component:Welcome,
                    meta:{title:'欢迎来到后台'}
                },
                {
                    path:'/users',
                    component:User,
                    meta:{title:'用户列表页'}
                },
                {
                    path:'/rights',
                    component:Rights,
                    meta:{title:'权限列表页'}
                },
                {
                    path:'/roles',
                    component:Roles,
                    meta:{title:'角色列表页'}
                },
                {
                    path:'/power',
                    component:Power,
                    meta:{title:'商品列表页'}
                },
                {
                    path:'/param',
                    component:Param,
                    meta:{title:'分类参数页'}
                },
                {
                    path:'/sort',
                    component:Sort,
                    meta:{title:'商品分类页'}
                },
                {
                    path:'/listes',
                    component:Listes,
                    meta:{title:'用户订单页'}
                },
                {
                    path:'/dates',
                    component:Dates,
                    meta:{title:'数据详情页'}
                },
            ]
        }
    ],
})

// 前置路由守卫
router.beforeEach((to,from,next)=>{
    if(to.meta.isAout){
        // 判断是否有token
        // 判断有token值是否和服务器传递的一致
        const key=window.atob(sessionStorage.getItem('key'))    //atob 解密
        const token=sessionStorage.getItem('token')
        if(key!==token){
            next('/login')
            return
        }
        else{
            next()
        }
    }
    else{
        next()
    }
})

// 后置路由守卫
router.afterEach((to)=>{
    document.title=to.meta.title;
})

// 将实例化对象暴露出去
export default router;