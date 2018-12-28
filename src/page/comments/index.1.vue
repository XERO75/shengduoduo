<template>
  <div id="comments">
    <div class="comment-wrapper" v-for="(item, index) in 3" :key="index">
      <div class="comment-header">Lorem ipsum dolor sit amet.!</div>
      <div class="comment-content">
        <div class="comment-content__img">
          <img src="./../../pic/p2.png">
        </div>
        <div class="comment-content__desc">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, qui.</p><br/>
          <span>lorem100g</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderBar from "@/components/HeaderBar";
import { getCommentList } from "@/api/sort";

export default {
  components: {
    HeaderBar
  },
  data(){
    return{
      commentList: [],
      
    }
  },
  methods:{

  },
  mounted(){
    let id = this.$route.query.id;
    getCommentList(1,10,id).then(res=>{
      this.commentList = res.data.data;
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  $fzm: PingFang-SC-Medium;
  $fzr: PingFang-SC-Medium;
  #comments {
    // padding-top: 1.2rem;
    box-sizing: border-box;
    position: relative;
    .comment-wrapper {
      margin: .8rem;
    }
    .comment-header {
      font-family: $fzm;
      font-size: .373333rem;
      color: #2d2e2d;
    }
    .comment-content {
      display: flex;
      padding: .5rem 0;
      border-bottom: 1px solid #e5e5e5;
      .comment-content__img {
        width: 1.253333rem;
        height: 1.253333rem;
        margin-right: .3rem;
        img {
          width: 1.253333rem;
          height: 1.253333rem;
        }
      }
      .comment-content__desc {
        p {
          display: inline-block;
          font-family: $fzr;
          font-size: .293333rem;
          color: #8FC221;
          text-align: left;
        }
        span {
          font-family: $fzr;
          font-size: .293333rem;
          color: #afaeaf;
          text-align: left;
        }
      }
    }
  }
</style>