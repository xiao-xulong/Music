import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/topbar'
const Home =()=> import(/* webpackChunkName: "home_recommended" */ '../views/topbar')
// import Recommended from '../views/recommended'
const Recommended  =()=> import(/* webpackChunkName: "home_recommended" */ '../views/recommended')
// import Play_music from '../views/play_music'
const Play_music  = () => import(/* webpackChunkName: "play_music_commit" */ '../views/play_music')
// import Commit from '../views/commit'
const Commit  = () => import(/* webpackChunkName: "play_music_commit" */ '../views/commit')
// import Hot_music from '../views/hot_music'
const Hot_music  = () => import(/* webpackChunkName: "hot_music_search" */ '../views/hot_music')
// import Search from '../views/search'
const Search  = () => import(/* webpackChunkName: "hot_music_search" */ '../views/search')
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

router.beforeEach((to, from, next)=>{
  if (to.path==='/recommended'){
    return next()
  }else {
    const key=window.sessionStorage.getItem('token')
    if (!key){
      return next('/recommended')
    }
  next()
  }



})

export default router
