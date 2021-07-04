import axios from 'axios'
let api=axios.create(
  {
    baseURL:'https://v2.alapi.cn/api',
    timeout:3000
  })
let pics=function(){
return  api.get('/music/detail',{params:{'id':'1464168586,1397345903,1494738691,1426959223,1433584979,1338711251 ',
    'token':'pG70XSoRwSkGQPQm'
  }})
}

let url=function(id){
  return  api.get('/music/url',{params:{'id':`${id}`,
   'format':"json" ,'token':'pG70XSoRwSkGQPQm'
    }})
}
let PlayMusicInfo=function(id){
  return  api.get('/music/detail',{params:{'id':`${id}`,
      'token':'pG70XSoRwSkGQPQm'
    }})
}

let commit=function(id){
  return  api.get('/music/hot_comment',{params:{'id':`${id}`,
      'token':'pG70XSoRwSkGQPQm'
    }})
}

let hot_music=function(){
  return  api.get('/music/detail',{params:{'id':'1855488113,1456673752,26305527,448738638,507761891,31838335,492591165 ',
      'token':'pG70XSoRwSkGQPQm'
    }})
}


let search=function(keyword){
  return  api.get('/music/search',{params:{'keyword':`${keyword}`,'limit':'30',
      'token':'pG70XSoRwSkGQPQm'
    }})
}


export {pics,url,PlayMusicInfo,commit,hot_music,search}
