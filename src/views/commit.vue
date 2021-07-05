<template >
    <div>

<nav class="margin">
  <div class="song_pic">
      <img class="center" :src="song_pic">
  </div>
  <div class="song_info">
    <span class="song_name">
      {{song_name}}<br>
      <span class="singer">
      {{singer}}
    </span>
    </span>

  </div>
  <div class="back_icon" >

  </div>
</nav>
      <article class="margin">
<div class="commit_title">

<span>
  评论区
</span>
  <span class="right">
    推荐
  </span>
</div>
      <ul class="commit_area">
        <li class="users" v-for="item in commit_info" :key="item.commentId">
          <div class="user_info">
            <span class="user_info_left">
              <span class="user_pic">
                <img :src="item.user.avatarUrl">
              </span>
           <span class="username_time">
            <span class="username">
              {{item.user.nickname}}
            </span><br>

            <span class="user_time">
              {{item.time | showTime}}
            </span>
           </span></span>

            <span class="zan">
              <span class="zan_num center">{{item.likedCount}} </span>      <svg t="1624936327231"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2462" ><path d="M298.666667 853.333333h-85.333334c-23.514074 0-42.666667-19.152593-42.666666-42.666666V440.888889c0-23.514074 19.152593-42.666667 42.666666-42.666667h85.333334c23.514074 0 42.666667 19.152593 42.666666 42.666667v369.777778c0 23.514074-19.152593 42.666667-42.666666 42.666666z m-85.333334-42.666666h85.333334V440.888889c0 0.094815 0 0-0.094815 0H213.333333v369.777778z" p-id="2463" fill="#8a8a8a"></path><path d="M612.02963 853.333333h-270.222223c-11.757037 0-21.333333-9.576296-21.333333-21.333333v-403.911111c0-11.757037 9.576296-21.333333 21.333333-21.333333 17.825185 0 37.831111-14.601481 59.448889-43.330371C422.874074 334.696296 442.405926 296.77037 459.662222 263.395556c29.866667-57.837037 47.881481-92.728889 76.610371-92.728889 84.574815 0 97.185185 51.958519 97.185185 82.962963 0 41.339259-24.462222 98.133333-41.813334 133.214814h162.133334c54.897778 0 99.555556 44.657778 99.555555 99.555556v61.62963c0 60.302222-9.860741 113.303704-29.202963 157.582222-16.592593 37.831111-40.201481 69.404444-70.068148 93.961481-48.545185 39.632593-106.856296 53.76-142.032592 53.76zM363.140741 810.666667h248.888889c6.257778 0 62.577778-1.232593 114.915555-44.183704 55.561481-45.511111 83.721481-118.992593 83.721482-218.453333v-61.62963c0-31.383704-25.505185-56.888889-56.888889-56.888889H556.088889c-7.585185 0-14.696296-4.077037-18.488889-10.714074s-3.792593-14.696296 0-21.333333c14.791111-25.505185 53.096296-101.167407 53.096296-143.834074 0-19.152593-4.077037-39.537778-51.674074-40.296297-1.991111 1.801481-6.731852 6.826667-14.885926 20.195556-8.059259 13.274074-17.066667 30.814815-26.642963 49.398518-34.228148 66.37037-75.946667 147.152593-134.352592 163.460741V810.666667z" p-id="2464" fill="#8a8a8a"></path></svg>
            </span>
          </div>
          <div class="user_commit">
            {{item.content}}
          </div>
        </li>
      </ul>
      </article>
    </div>
</template>

<script>
  import {commit} from '../request/axios'
  export default {
    name: 'commit',
   async created () {
      this.id=this.$route.params.id
    this.singer=this.$route.params.singer
      this.song_pic=this.$route.params.song_pic
      this.song_name=this.$route.params.song_name
     this.commit_info=(await commit(this.id)).data.data;
     Date.prototype.toLocaleString = function() {
       return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " ;
     };
      console.log(this.commit_info)

      },
    data(){
      return{
        id:'',
        song_name:'',
        song_pic:'',
        singer:'1232',
        commit_info:[]
      }
    },
    methods:{

    },
filters:{
showTime(time){

  let unixTimestamp = new Date(time ) ;
  let filtersTime = unixTimestamp.toLocaleString();
  return filtersTime
}
}
  }
</script>

<style scoped lang="less">

  .center{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .margin{
    padding-left: 10px;
    padding-right: 10px;
  }


  nav{
    height: 28vw;
    display: flex;
    .song_pic{
      flex: 2.5;
      img{
           width: 100%;
        border-radius: 5px;
             }
    }
    .song_info{
      flex: 6;
      padding-left: 10px;
   .song_name{
      color: #0f1111;
     position: relative;
     top: 15%;
     transform: translateY(-15%);
     .singer{
     font-size: small;
     color: blue;

   }
   }
    }
    .back_icon{
      flex: 1.5;
      text-align: right;
     svg{
       width: 8vw;
     }
    }
  }
  article{

    .commit_title{
   display: flex;
   justify-content: space-between;
height: 5vh;

   span{
    flex: 1;
     color: #0f1111;
     font-size: small;
font-weight: 500;
     line-height: 5vh;
   }
   .right{
 text-align: right;

   }
 }
    .commit_area{

      .users{
         margin-top: 15px;

        .user_info{
        display: flex;
          justify-content: space-between;

          .user_info_left{
            flex: 1.5;
            .user_pic{
              display: inline-block;
              width: 12vw;
              height: 10vw; vertical-align: middle;
              padding-right: 2vw;
              img{
                width: 100%;
                border-radius: 50%;
              }
            }
            .username_time{
              display: inline-block;
             line-height: 0;
              height: 10vw;
              vertical-align: middle;

              .username{
            font-size: small;
              }
              .user_time {
              font-size:xx-small;
                color: #8d9294;

            }
            }

          }
      .zan{
        flex: 0.5;
        color: #8a8a8a;
        font-size: small;
vertical-align: center;
        text-align: right;
        .zan_num{
 display: inline-block;
          vertical-align: middle;
        }

        svg{
          width: 5vw;
vertical-align: middle;
          position: relative;
          top: 45%;
          transform: translateY(-45%);
        }
      }

        }
        .user_commit{
          width: 100%;
        padding-left: 12vw;word-break:break-all;word-wrap:break-word;
          color: #0f1111;
          border-bottom: solid 0.1px lightgrey;
        font-size: small;

        }
      }
    }


  }
</style>
