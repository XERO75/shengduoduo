<template>
  <div id="comments">
    <div class="comment-wrapper" v-for="(item, index) in 2" :key="index">
      <div class="comment-header">
        <img src="../../assets/img/icon_miaosha@2x.png" alt="">
        <span>jane</span>
      </div>
      <div class="comment-statistic">
        2018-01-21
        颜色: 红色
        规格500g
      </div>
      <div class="comment-comments">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, sequi?
      </div>
      <div class="comments-productWrap">
        <img src="../../assets/img/icon_miaosha@2x.png" alt="">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum, rerum.</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  data(){
    return{
      commentList: [],
      
    }
  },
  methods:{
  },
  mounted(){
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  #comments {
    border-bottom: 10px solid #F5F5F4;
    // box-sizing: border-box;
    // position: relative;
    .comment-wrapper {
      padding: .4rem;
      margin-bottom: .2rem;
      background: #fff;
    }
    .comment-header {
      display: flex;
      align-items: center;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%; 
        border: 0.053333rem solid #ffffff;
        margin-right: .2rem;
      }
      span {
        font-size: .45rem;
        font-weight: bold;
      }
    }
    .comment-statistic {
      margin: .3rem 0;
      font-size: .35rem;
      color: #8C8C8C;
    }
    .comment-comments {
      font-size: .4rem;
    }
    .comments-productWrap {
      display: flex;
      align-items: center;
      background: #F5F5F4;
      margin: .2rem 0;
      img {
        width: 3rem;
        margin-right: .2rem;
      }
      p {
        font-size: .4rem;
      }
    }
   
  }
</style>