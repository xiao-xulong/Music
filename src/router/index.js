import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/topbar'
import Recommended from '../views/recommended'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/Recommended',
    children:[
      {
        path: '/Recommended',
        name: 'Rcommended',
        component: Recommended,
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
