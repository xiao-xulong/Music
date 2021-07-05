<template>
  <div>
    <header>
      <i>
        <van-icon name="search" />
      </i>
      <input class="search_input" @input="changeInput" type="text" placeholder="搜索歌曲、歌手、专辑" v-model="user_search_info">
      <svg @click="clear"   v-show="user_search_info.trim()!=''" viewBox="0 0 1024 1024" ><path d="M511.998977 961.610044c-248.306272 0-449.607998-201.307865-449.607998-449.614138S263.692704 62.389956 511.998977 62.389956c248.364601 0 449.610044 201.299679 449.610044 449.606974S760.363577 961.610044 511.998977 961.610044L511.998977 961.610044zM718.186989 380.921639c8.457626-8.462742 8.457626-22.202675 0-30.658254l-45.927005-45.871747c-8.459672-8.459672-22.138206-8.459672-30.599925 0L511.603981 434.44874 381.546879 304.391638c-8.459672-8.459672-22.1423-8.459672-30.599925 0l-45.927005 45.871747c-8.457626 8.455579-8.457626 22.195511 0 30.658254l130.057101 130.053008L305.019948 641.031748c-8.457626 8.455579-8.457626 22.140253 0 30.599925L350.946954 717.555609c8.457626 8.404414 22.140253 8.404414 30.599925 0l130.057101-130.057101L641.661082 717.555609c8.461719 8.404414 22.140253 8.404414 30.599925 0l45.927005-45.922912c8.457626-8.459672 8.457626-22.144346 0-30.599925L588.129888 510.97567 718.186989 380.921639 718.186989 380.921639z"  fill="#8a8a8a"></path></svg>
    </header>
    <article ref="article" v-show="user_search_info.trim()!='' && commit_flag==false">
      <span @click="search_song"> 搜索"{{user_search_info.trim()}}"</span>
    </article>
    <nav v-show="user_search_info.trim()==''">
      <div class="title">
        热门搜索
      </div>
      <ul class="hot_search">
        <li v-for="item in hot_search_info" :key="item.name" @click="Jump(item.name)">
          {{item.name}}
        </li>
      </ul>
    </nav>
    <div v-show="no_result_flag" class="no_result">
      暂无搜索结果
    </div>
    <div v-if="commit_flag">
      <song_list @click="play_music(item.id,item.name)"  v-for="item in search_result" :key="item.id" :Name="item.name" :SingerName="item.artists[0].name"> </song_list>
    </div>

  </div>
</template>

<script>
  import {search} from '../request/axios'
  import song_list from '../common/song_list'
  export default {
    name: 'search',
    components:{
      song_list
    },
    data(){
      return{
        hot_search_info:[
          {name:'梦鱼'},
          {name:'扶桑树'},
          {name:'彩虹'},
          {name:'EA7满怀希望'},
          {name:'城南花已开'},
          {name:'Standing When It All Falls Down'},
          {name:'盗将行'},
        ],
        user_search_info:'',
        commit_flag:false,
        no_result_flag:false,
        search_result:[]
      }
    },
    methods:{
      Jump(name){
        this.user_search_info=name
        this.search_song();
        this. commit_flag=true


      },
      async search_song(){
        this.$refs.article.style.display='none'
        console.log(this.$refs.article.style.display)
        let result=(await search(this.user_search_info)).data.data
        if (result.songCount==0){
          this.no_result_flag=true
        }
        this. commit_flag=true
        this.search_result=result.songs
        console.log(result)
      },
      changeInput(){
        // if (this.user_search_info.trim()==''){
        //
        // }
        this.no_result_flag=false
        this.commit_flag=false
        this.search_result=[]
      },
      clear(){
        this.user_search_info=''
        this.commit_flag=false
        this.no_result_flag=false
      this.search_result=[]
      },
      play_music(id,name){
        this.$router.push({name:'Play_music',params:{id:id,name:name}})
      }
    }
  }
</script>

<style scoped lang="less">
  @input_background-color:#ebecec;
  ::placeholder {
    color: #c9c9c9;
  }
  header{
    position: relative;
    width: 100vw;
    height: 60px;
    margin-top: 1vh;
    background-color: #ffffff;
    border-bottom: #ebecec solid 0.5px ;
    margin-bottom: 10px;
    i{
      width: 13px;
      height: 13px;
      position: absolute;
      top: 18px;
      left: 5vw;
      transform: translate(-50%,-50%);
      z-index: 2;
    }

    input{

      width: 90vw;
      height: 30px;
      border-radius: 25px;
      border: none;
      background-color:@input_background-color;
      padding: 0 30px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    svg{
      width: 16px;
      position: absolute;
      top: 50%;
      right: 7vw;
      transform: translateY(-50%);
      z-index: 5;
    }
  }
  article{
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    padding: 0 10px;
    span{
      color: steelblue;
    }
  }
  nav{
    padding: 0 5px;
    .title{
      font-size: small;
    }
    .hot_search{
      width: 100%;
      padding: 0 10px;
      margin-top: 10px;
      li{
        font-size: 14px;
        line-height: 32px;
        display: inline-block;
        border:#c9c9c9 solid 1px ;
        border-radius: 20px;
        height: 32px;
        color: #0f1111 ;
        margin-right: 8px;
        margin-bottom: 8px;
        padding:0 10px;
      }
    }
  }
  .no_result{
    width: 100vw;
    text-align: center;

  }
</style>
