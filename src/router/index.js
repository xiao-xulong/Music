import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/topbar'
import Recommended from '../views/recommended'
import Play_music from '../views/play_music'
import Commit from '../views/commit'
import Hot_music from '../views/hot_music'
import Search from '../views/search'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/recommended',
    children:[
      {
        path: '/recommended',
        name: 'Rcommended',
        component: Recommended,
      },
      {
        path: '/hot_music',
        name: 'Hot_music',
        component: Hot_music,
      },
      {
        path: '/Search',
        name: 'Search',
        component: Search ,
      }
    ]
  },
  {
    path: '/Play_music',
    name: 'Play_music',
    component: Play_music,
    children: [
      {
      path: '/Commit',
      name: 'Commit',
      component: Commit,
    }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
