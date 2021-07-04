import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './vant'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{
  loading:require('./assets/img/loading.jpeg')
})
Vue.config.productionTip = false
FastClick.attach(document.body)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
