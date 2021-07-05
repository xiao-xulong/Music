<template>
  <div class="body">
    <audio class="audio" ref='audio' @ended="ended" @durationchange="getDuration" @timeupdate="currentTime"  autoplay>
      <source src="">
    </audio>
    <article>
      <div class="song_turn">
        <div class="black_panel">
          <img ref="img" v-lazy="pic">
        </div>
      </div>
    </article>
    <div class="songs_info">
      <span class="song_name">
        {{name}}&nbsp; -
        <span class="singer_name">  {{singer}}</span>
      </span>


</div>
    <div class="Player">
      <div class="icons">
        <van-icon class="van-icon" name="play-circle-o" size="8vw"  @click="pause" v-if="animation_play_state_flag===true"/>
        <van-icon name="pause-circle-o" size="8vw" @click="pause"  v-if="animation_play_state_flag===false"/>
      </div>
      <div class="progress">
        <van-progress class="van-progress" :percentage="percent" stroke-width="2"/>
      </div>
      <span  class="count-down">
        {{mm | show_mm }}:{{ss | show_ss}}
      </span>
      <!--        <van-count-down-->
      <!--          class="count-down"-->
      <!--          :time="time"-->
      <!--          format=" mm:ss"-->
      <!--          ref="countDown"-->
      <!--        />-->

    </div>

    <footer ref="footer"  @click="push_commit">
      <div class="line">

      </div>
      <svg t="1624866291586" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2402"><path d="M896 544H193.3312a32 32 0 1 1 0-64H896a32 32 0 0 1 0 64z" fill="#2C2C2C" p-id="2403"></path><path d="M426.5984 798.72a31.8976 31.8976 0 0 1-22.6304-9.3696L126.8736 512 403.968 234.9056a32 32 0 0 1 45.2608 45.2608L217.3952 512l231.8336 231.8336A32 32 0 0 1 426.5984 798.72z" fill="#2C2C2C" p-id="2404"></path></svg>
      <div class="commit" ref="commit" >
        精彩评论
      </div>
    </footer>
    <div class="child_view" ref="child_view" v-show="ChildView">
      <router-view/>
    </div>

  </div>
</template>

<script>
  import {url,PlayMusicInfo} from '../request/axios'
  export default {
    name: 'play_music',
    async created () {
      // this.id=this.$route.params.id
      // this.name=this.$route.params.name
      let id_key=this.$route.params.id
      const info=(await PlayMusicInfo(id_key)).data.data


      // this.pic=info.songs[0].al.picUrl
      // this.singer=info.songs[0].ar[0].name
      console.log(info)
      const result=(await url(id_key)).data.data
      // this.$refs.audio.src = result.url
   if (info!=null){
  let pic_key=info.songs[0].al.picUrl
  let singer_key=info.songs[0].ar[0].name
  let url_key=result.url
  let songname_key=this.$route.params.name
  let data= {id:id_key,pic: pic_key,singer:singer_key,url:url_key,name:songname_key}
  window.sessionStorage.setItem('data',JSON.stringify(data))
  let get_data=JSON.parse(window.sessionStorage.getItem('data'))
  console.log(get_data)
  this.$refs.audio.src =get_data.url
  this.id=get_data.id
  this.pic=get_data.pic
  this.singer=get_data.singer
  this.name=get_data.name
}else {

  let get_data=JSON.parse(window.sessionStorage.getItem('data'))
  console.log(get_data)
  this.$refs.audio.src =get_data.url
  this.id=get_data.id
  this.pic=get_data.pic
  this.singer=get_data.singer
  this.name=get_data.name
     this.pause();
}

    },


    data(){
      return{
        id:'',
        name:'',
        pic:'',
        singer:'',
        animation_play_state_flag:true,
        time:0,
        percent:0,
        end:false,
        ChildView:false,
        commit_flag:false,
        ss:0,
        mm:0
      }
    },
    filters:{
      show_ss(ss){
        if (ss<10){
          return '0'+ss
        }else {
          return ss
        }

      },
      show_mm(mm){
        if (mm<10){
          return '0'+mm
        }else {
          return mm
        }
      }
    },
    methods:{
      // getDuration(){
      // let audio= document.getElementsByClassName('audio')
      //   console.log(audio[0].duration*1000)
      //   setTimeout(()=>{
      //     this.time=audio[0].duration*1000
      //   },200)
//
//   setTimeout(
//     ()=>{
//       this.time=this.$refs.audio.duration*1000
//       let ss=  parseInt((this.time/1000)%60)
//       console.log(ss)
//       let mm=parseInt((this.time/1000)/60)
//       this.ss=ss
//       this.mm=mm
//     },400)
//
//
// },
      getDuration(){
        let time=this.$refs.audio.duration*1000
        if (Number.isNaN(time)){
          this.time=0
        }else {
          this.time=time
          console.log( time)
          let ss=  parseInt((this.time/1000)%60)
          console.log(ss)
          let mm=parseInt((this.time/1000)/60)
          this.ss=ss
          this.mm=mm
        }

      },
      pause(){
        if(this.animation_play_state_flag===true){
          this.$refs.img.style.animationPlayState='paused';
          this.animation_play_state_flag=false
          this.$refs.audio.pause();

        }else {
          this.$refs.img.style.animationPlayState='running';
          this.animation_play_state_flag=true
          this.$refs.audio.play();


        }


      },
      ended(){
        this.pause();
      },
      currentTime(){
        let audio=document.getElementsByClassName('audio')
        // console.log(audio[0].currentTime)
        // this.percent= parseInt(audio[0].currentTime / (this.time/1000) *100)
        // this.percent=parseInt(this.$refs.audio.currentTime / (this.time/1000) *100)

        let  current=parseInt(audio[0].currentTime / (this.time/1000) *100)

        if (Number.isNaN(current)){
          this.percent=0}else {

          this.percent= parseInt(audio[0].currentTime / (this.time/1000) *100)
        }

      },
      push_commit(){
        this.commit_flag=!  this.commit_flag
        if(this.commit_flag==true){
          this.$router.push({
            name:'Commit',params:{
              id:this.id,
              song_name:this.name,
              song_pic:this.pic,
              singer:this.singer,
            }})

          this.ChildView=true;
          setTimeout(()=>{
            this.$refs.footer.style.top='0'
            this.$refs.footer.style.background='#ffffff'
            this.$refs.footer.style.position='fixed'
            this.$refs.commit.style.color='#0f1111'
            this.$refs.child_view.style.top='58px'
          },200)
        }else {
          this.$refs.footer.style.top='90vh'
          this.$refs.footer.style.background='-webkit-linear-gradient(top,#22272b,#1c1d1e)'
          this.$refs.commit.style.color='#898b8d'
          this.$refs.child_view.style.top='100vh'

          setTimeout(()=>{
            this.$router.push('/Play_music')
            this.ChildView=false;
          },1000)

        }







      },

    }
  }
</script>

<style scoped lang="less">
  @body_background:-webkit-linear-gradient(top,#8d9294,#0f1111);
  @black_panel_background: #171717;
 @Player_box-shadow: 0px 0px 10px #888888;
  .body{
    height: 100%;
    background:@body_background;

    article{
      height: 300/ 375* 100vw ;
      .song_turn{
        width: 247/ 375* 100vw;
        height: 247/ 375* 100vw ;
        background: rgba(149,143,145,.3);
        border-radius: 50%;
        margin:  auto;
        position: relative;
        top: 50px;

        .black_panel{
          width: 220/ 375* 100vw;
          height: 220/ 375* 100vw;
          background:@black_panel_background;
          border-radius: 50%;
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          img{
            width: 160/ 375* 100vw;
            height:160 / 375* 100vw;
            border-radius: 50%;
            position: relative;
            top: 50%;
            left: 50%;
            animation-name: rotate;
            animation-duration: 4s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-play-state:running;
          }
        }
      }
    }
    .songs_info{
      width: 100%;
      margin-top: 10px;
      text-align: center;
      .song_name{
        position: relative;
        width: 100%;
        color: #f3f5f7;
        font-size: larger;
        font-weight: 400;
        .singer_name{
          font-size: 16px;
          color: hsla(0,0%,100%,.6)

        }

        /*top: 50%;*/
        /*left: 50%;*/
        /*transform: translate(-50%,-50%);*/
      }
    }
    .Player{
      margin-top: 50px;
      width: 100%;
      height: 10vw;
      display: flex;
      text-align: center;
      line-height: 10vw;
      background: rgba(159,138,143,.3);
      box-shadow:@Player_box-shadow;
      border-radius: 20px;
      .icons{
        flex: 2;
        line-height: 5vw;
        .van-icon{
          position: relative;
          color: #f3f5f7;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .progress{
        flex: 6;
        .van-progress{
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }

      }
      .count-down{
        color: #f3f5f7;
        font-weight: bold;
        flex: 2;line-height: 10vw;
      }
    }
    footer{
      z-index: 3;

      width: 100%;
      height: 58px;
      position: absolute;

      top:90vh;
      bottom: 0;
      border: none;
      background: -webkit-linear-gradient(top,#22272b,#1c1d1e);
      display: flex;
      flex-direction: column;

      transition: all 1s;
      svg{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 10vw;
        text-align: left;
      }
      .line{
        flex: 1;
        &:after{
          content: '';
          display: block;
          width: 15vw;
          height: 0.8vh;
          background-color: #383c3f;
          border-radius: 20px;
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }

      .commit{
        color: #898b8d;
        text-align: center;
        font-size: 16px;
        flex: 1;

      }

    }

    .child_view{
      width: 100vw;
      position: absolute;
      top: 100vh;
      overflow: scroll;
      height: 100vh;
      transition: all 1s;
    }
  }
  @keyframes rotate {
    0%{
      transform:translate(-50%,-50%) rotate(0deg);
    }
    100%{
      transform:translate(-50%,-50%) rotate(360deg);
    }

  }

</style>
