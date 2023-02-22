import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'
import Index from '../views/index.vue'

import axios from "axios"
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/sys/UserCenter',
        name: 'UserCenter',
        component: () => import('../views/sys/UserCenter.vue')
      }]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to , from, next) =>{
    let hasRoute = store.state.menus.hasRoutes
    if(!hasRoute) {
      axios.get("/sys/menu/nav", {
        headers: {
          Authorization : localStorage.getItem("token")
        }
      }).then(res =>{
        // console.log(res.data.data.nav)
        // 拿到menuList
        store.commit("setMenuList",res.data.data.nav)

        //拿到用户权限
        store.commit("setPermList",res.data.data.authorization)
        // console.log(store.state.menus.menuList)

        //动态绑定路由
        let newRouters = router.options.routes

        res.data.data.nav.forEach(menu=>{
          if(menu.children) {
            menu.children.forEach(e =>{

              // 转成路由
              let route = menuToRouter(e)
              //把路由添加到路由管理器中
              if(route){
                newRouters[0].children.push(route)
              }


            })
          }
        })
        console.log("newRouters")
        console.log(newRouters)
        router.addRoutes(newRouters)
        hasRoute = true
        store.commit("changeRouteStatus",hasRoute)
        // next({path: to.path})
      })
    }
    next()



})
//导航转成路由
const menuToRouter = (menu) => {

  if (!menu.component) {
    return null
  }

  let route = {
    name:menu.name,
    path:menu.path,
    meta:{
      icon: menu.icon,
      title:menu.title
    }
  }

  route.component = () => import('@/views/' + menu.component +'.vue')

  return route
}

export default router
