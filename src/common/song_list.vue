<template>
  <div>
    <ul class="new_music">
      <li  @click="play_music()">
        <div class="new_music_info">
          <div  class="new_music_name">
            <span>
              {{songName}}
            </span>
          </div>
          <div  class="new_music_singer">
            <i class="sq"></i>
            {{singer}}
          </div>
        </div>
        <div class="new_music_icon">
          <span></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'song_list',
    props:['Name','SingerName','Id'],
    data(){
      return{
        songName:this.Name,
        singer:this.SingerName,
        id:this.Id
      }


    },
    methods:{
      play_music(){
        // this.$emit('play_music',this.id,this.songName)
        this.$emit('click')
      }
    }
  }
</script>

<style scoped lang="less">
  .new_music{
    li{
      height: 54.4px;
      display: flex;
      padding-left: 2vw;

      .new_music_info{
        flex: 9;
        color: black;
        display: flex;
        flex-direction: column;
        min-width:0;
        .new_music_name{
          flex: 7;
          color: black;
          line-height: 34.74px;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        .new_music_singer{
          flex: 5;
          color: grey;
          font-size: small;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;

          .sq{
            display: inline-block;
            width: 12px;
            height: 8px;
            background-image: url("http://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=)");
            background-repeat: no-repeat;
            background-size: 166px 97px;


          }
        }


      }
      .new_music_icon{
        flex: 1;
        /*http://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=)*/
        span{
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          display: block;
          width: 22px;
          height: 22px;
          background-image: url("http://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=)");
          background-repeat: no-repeat;
          background-size: 166px 97px;
          background-position: -24px 0;

        }
      }
    }
  }
</style>
