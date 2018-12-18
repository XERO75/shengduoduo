<template>
  <div id="points-detail">
    <div class="points-header">
      <p>积分<span>&nbsp;{{detail.points}}</span></p>
    </div>
    <div class="swipe-container">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(n,i) in detail.imageList" :key="i"><img :src="n"></van-swipe-item>
      </van-swipe>
    </div>
    <div class="product-container">
      <p class="name">{{detail.name}}</p>
      <div class="exchange">
        <p class="need">兑换积分：<strong>{{detail.costPoint}}</strong></p>
        <div class="count-box">
          <i class="icon-delete" @click="onMinus"></i>
          <span class="num">{{count}}</span>
          <i class="icon-add" @click="onPlus"></i>
        </div>
      </div>
    </div>
    <div class="detail-container">
      <p class="title">商品介绍</p>
      <div class="content" v-html="detail.info"></div>
    </div>
    <div class="bottom-container">
      <p class="home" @click="onClickHome"><i class="icon-home"></i></p><p class="left">兑换积分 {{detail.costPoint*count}}</p><p class="right" @click="onClickExchange">立即兑换</p>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import { getDetail } from "@/api/points";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data(){
    return{
      count: 1,
      detail: {},
    }
  },
  methods: {
    onClickHome(){
      this.$router.push({path:'/shop'});
    },
    onClickExchange() {
      this.$router.push({path:'/points/order',query:{id:this.detail.id,count:this.count}});
    },
    onPlus(){
      if(this.count<99){
        this.count++;
      }
    },
    onMinus(){
      if(this.count>1){
        this.count--;
      }
    },
  },
  mounted(){
    let id = this.$route.query.id;
    handleLogin();
      getDetail(id).then(res=>{
        console.log(res);
        this.detail = res.data.data;
      })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#points-detail{

  .points-header{
    background-color: #fff;
    height: 1.653333rem;
    position: relative;
    p{
      font-size: 0.4rem;
      color: #666;
      padding-left: 0.4rem;
      line-height: 1.653333rem;
      span{
        font-size: 0.8rem;
        color: #202020;
        font-weight: bold;
      }
    }
  }
  .swipe-container{
    img{
      width: 100%;
      height: 5.6rem;
    }
  }
  .product-container {
     margin: 0 0.4rem;
     p.name {
      font-size: 0.48rem;
      color: #202020;
      line-height: 1.413333rem;
      border-bottom: 1px solid #e5e5e5;
    }
    div.exchange {
      border-bottom: 1px solid #e5e5e5;
      line-height: 1.333333rem;
      color: #e70012;
      position: relative;
      p.need {
        font-size: 0.413333rem;
      }
      div.count-box {
        display: inline-block;
        float: right;
        line-height: 0.533333rem;
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        span.num {
          position: absolute;
          width: 0.853333rem;    
          height: 26px;
          line-height: 26px;
          display: inline-block;
          left: 50%;
          top: 50%;
          margin-left: -0.426667rem;
          margin-top: -0.266667rem;
          font-size: 0.48rem;
          color: #202020;
          text-align: center;
        }
        i.icon-delete{
          width: 0.586667rem;
          height: 0.586667rem;
          display: inline-block;
          background: url(./../../img/购物车删除@2x.png) no-repeat;
          -webkit-background-size: 0.586667rem 0.586667rem;
          background-size: 0.586667rem 0.586667rem;
          margin-right: 0.8rem;
          margin-top: 0.426667rem;
        }
        i.icon-add{
          width: 0.586667rem;
          height: 0.586667rem;
          display: inline-block;
          background: url(./../../img/添加购买@2x.png) no-repeat;
          -webkit-background-size: 0.586667rem 0.586667rem;
          background-size: 0.586667rem 0.586667rem;
        }
      }
    }
   } 
  .detail-container {
    margin: 0.6rem 0.4rem 0 0.4rem;
    padding-bottom: 2.0rem;
    p{
      font-weight: bold;
      font-size: 0.4rem;
      color: #202020;
      margin-bottom: 15px;
    }
  }
  .bottom-container {
    height: 1.306667rem;
    line-height: 1.306667rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    p.home{
      width: 13%;
      height: 100%;
      display: inline-block;
      background-color: #6a6a6a;
      position: relative;
      vertical-align: top;
      i.icon-home{
        position: absolute;
        width: 0.533333rem;
        height: 0.533333rem;
        background: url(./../../img/返回首页@2x.png) no-repeat;
        -webkit-background-size: 0.533333rem 0.533333rem;
        background-size: 0.533333rem 0.533333rem;
        top: 50%;
        left: 50%;
        margin-top: -0.266667rem;
        margin-left: -0.266667rem;
      }
    }
    p.left {
      width: 47%;
      display: inline-block;
      text-align: center;
      color: #fff;
      background-color: #4c4c4c;
      font-size: 0.4rem;
      vertical-align: top;

    }
    p.right {
      width: 40%;
      display: inline-block;
      background-color: #e70012;
      color: #fff;
      font-size: 15px;
      font-size: 0.4rem;
      vertical-align: top;
      text-align: center;
    }
  }
}
</style>
