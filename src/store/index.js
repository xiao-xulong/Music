import Vue from 'vue'
import Vuex from 'vuex'
import { pics, url, PlayMusicInfo } from '../request/axios'
import router from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingShow: false
  },
  mutations: {

  },
  actions: {
    async play_music(context, par) {
      console.log(this.$router)
      context.state.loadingShow = true
      const info = (await PlayMusicInfo(par.id)).data.data
      console.log(info)
      const result = (await url(par.id)).data.data
      console.log(result)
      let pic = info.songs[0].al.picUrl
      let singer = info.songs[0].ar[0].name
      let songUrl = result.url
      let songname = par.name
      router.push({ name: 'Play_music', query: { id: par.id, pic: pic, singer: singer, songUrl: songUrl, songname: songname } })
      context.state.loadingShow = false
      // console.log(id, name)
    },
  },
  modules: {
  }
})
