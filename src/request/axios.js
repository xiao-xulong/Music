import axios from 'axios'
let swiper=axios.create(
  {
    timeout:3000
  })
let pics=swiper.get('https://gank.io/api/v2/banners')
export {pics}
