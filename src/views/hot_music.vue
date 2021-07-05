<template>
<div>
  <header>
<div class="hoticon">

</div>
    <div class="date">
      更新日期:{{mouth | showMouth}}月{{day | showDay}}日
    </div>
  </header>
  <div class="ranking_list">
<ul>
  <li v-for="(item,index) in hot_music_list" :key="item.id" @click="play_music(item.id,item.name)">
    <div class="index">
     {{index+1 |showindex}}
    </div>
    <div class="song_info">
      <div class="song_name">
        {{item.name}}
      </div>
      <div class="singer">
   <i></i>    {{item.ar[0].name}}
      </div>
    </div>
    <div class="icon">
      <i>

      </i>
    </div>
  </li>
</ul>

  </div>
</div>
</template>

<script>
  import {hot_music} from '../request/axios'

  export default {
    name: 'hot_music',
   async created () {
      let date =new Date()
    this.mouth= date.getMonth()
      this.day=date.getDate()
      const result=await hot_music()
this.hot_music_list=result.data.data.songs
     console.log(this.hot_music_list)

    },
    data(){
      return{
     mouth:0,
        day:0,
        hot_music_list:[]
      }
    },
    methods:{
      play_music(id,name){
        this.$router.push({name:'Play_music',params:{id:id,name:name}})
      }
    },
    filters:{
      showMouth(mouth){
        if (mouth<10){
          return '0'+(mouth+1)
        }else {
          return mouth+1
        }

      },
      showDay(day){
        if (day<10){
          return '0'+(day)
        }else {
          return day
        }
      },
      showindex(index){
        if (index<10){
        return '0'+(index)
      }else {
        return index
      }
      },


    }
  }
</script>

<style scoped lang="less">
  @rankingList_top_threeColor:#d43c33;
header{
  width: 100vw;
  height: 24vh;
  background: url("https://s3.music.126.net/mobile-new/img/hot_music_bg_3x.jpg?2bfefd3ba37eaffbd66b7d108b9de26a=") no-repeat;
  background-size: 100% 100%;
  padding-left: 25px;
  padding-top: 30px;
  .hoticon{
    width: 142px;
    height: 67px;
    background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=") no-repeat;
    background-size: 166px 97px;
    background-position: -24px -30px;
  }
  .date{
    margin-top: 10px;
      color: #f3f5f7;
    font-size: small;
  }
}
.ranking_list{
  width: 100%;
  ul{
    li{
      width: 100%;
      height: 10vh;
      &:nth-child(-n+3){
         .index{
           color: @rankingList_top_threeColor;
         }
      }
      .index{
        width: 15vw;
        height: 100%;
        float: left;
        line-height: 10vh;
        text-align: center;
      }
      .song_info{
        width: 70vw;
        height: 100%;
        float: left;
        padding-top: 2vh;
        .song_name{
          width: 100%;
          height: 50%;
          font-size: 17px;
         color: #0f1111;
          /*margin-top: 20%;*/
        }
        .singer{
          width: 100%;
          height: 50%;
          font-size: 12px;
          color: #888;
           /*margin-bottom: 20        %;*/
          i{
            display: inline-block;
            width: 12px;
            height: 8px;
            margin-right: 4px;
            background:url('https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=') no-repeat;
            background-size: 166px 97px;
          }
        }
      }
      .icon{
        width: 15vw;
        height: 100%;
        float: right;
        i{
          display: inline-block;
          width: 22px;
          height: 22px;
          background: url('https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=') no-repeat -24px 0;
          background-size: 166px 97px;
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
    }
  }
}

</style>
