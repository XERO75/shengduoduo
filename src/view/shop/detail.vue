<template>
  <div id="shop-detail">
    <van-swipe @change="onChange" :autoplay="3000">
      <van-swipe-item><img src="./../../img/banner@2x.png"></van-swipe-item>
      <van-swipe-item><img src="./../../img/banner@2x.png"></van-swipe-item>
      <van-swipe-item><img src="./../../img/banner@2x.png"></van-swipe-item>
      <van-swipe-item><img src="./../../img/banner@2x.png"></van-swipe-item>
      <div class="custom-indicator" slot="indicator">
        <span>{{ current + 1 }}/4</span>
      </div>
    </van-swipe>
    <div class="product-container">
      <p class="name">谷元黑米牛奶饮品(236ml)</p>
      <p class="price">&yen;<span>36 </span><del>&yen; 56</del></p>
      <p class="total-title">总数量</p>
      <div class="total-container">
        <span class="total-num active" @click="handleChooseSize">30</span><span class="total-num" @click="handleChooseSize">60</span><span class="total-num" @click="handleChooseSize">90</span><span class="total-num" @click="handleChooseSize">120</span><span class="total-num" @click="handleChooseSize">150</span><span class="total-num" @click="handleChooseSize">180</span>
      </div>
      <div class="preDay">
        <p class="title">每日配送</p>
        <div class="count-box">
          <span class="minus" @click="onMinus"></span>
          <span class="num">{{count}}</span>
          <span class="plus" @click="onPlus"></span>
        </div>
      </div>
      <van-row>
        <van-col span="8" class="left">产品单价：4.5元</van-col>
        <van-col span="8" class="center">赠送积分：500</van-col>
        <van-col span="8" class="right">单位：瓶</van-col>
      </van-row>
    </div>
    <van-tabs v-model="active">
      <van-tab class="tab-detail" title="商品详情">内容 1</van-tab>
      <van-tab class="tab-view" title="用户评价">
        <div class="tag-container">
          <span class="tag active" @click="handleChooseView">全部 (98)</span>
          <span class="tag" @click="handleChooseView">送货快 (23)</span>
          <span class="tag" @click="handleChooseView">准时送达 (11)</span>
          <span class="tag" @click="handleChooseView">口感好 (32)</span>
          <span class="tag" @click="handleChooseView">包装完整 (9)</span>
          <span class="tag" @click="handleChooseView">好评 (10)</span>
        </div>
        <div class="view-container">
          <img class="avator" src="./../../pic/user2.jpg">
          <div class="view-content">
            <p class="name">匿名用户<span>2018-10-21 06:21:36</span></p>
            <div class="star-container">
              <img src="./../../img/用户评价1@2x.png"><img src="./../../img/用户评价1@2x.png"><img src="./../../img/用户评价1@2x.png"><img src="./../../img/用户评价2@2x.png"><img src="./../../img/用户评价2@2x.png">
              <span>数量：5</span>
            </div>
            <p class="view">第一次购买，送货很准时，下次还会再来。</p>
          </div>
        </div>
        <div class="view-container">
          <img class="avator" src="./../../pic/user2.jpg">
          <div class="view-content">
            <p class="name">匿名用户<span>2018-10-21 06:21:36</span></p>
            <div class="star-container">
              <img src="./../../img/用户评价1@2x.png"><img src="./../../img/用户评价1@2x.png"><img src="./../../img/用户评价1@2x.png"><img src="./../../img/用户评价1@2x.png"><img src="./../../img/用户评价2@2x.png">
              <span>数量：5</span>
            </div>
            <p class="view">这个商品非常好，这个商品非常好，这个商品非常好，这个商品非常好，这个商品非常好，这个商品非常好，这个商品非常好，这个商品非常好，这个商品非常好，这个商品非常好，这个商品非常好！</p>
          </div>
        </div>
        <span class="more">更多评价(98)</span>
      </van-tab>
    </van-tabs>
    <div class="btn-container">
      <van-button class="btn-addCart" @click="onClickNext">添加到购物车</van-button>
      <van-button class="btn-buy" @click="onClickNext">立即购买 &yen;36</van-button>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Row, Col, Tab, Tabs, Button } from 'vant';
// import { articleList } from "@/api/article"
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,

  },
  data(){
    return{
      current: 0,
      count: 2,
      active: 1,
    }
  },
  methods: {
    handleChooseSize(event){
      let sizes =  event.currentTarget.parentNode.getElementsByClassName("total-num");
      for(var i=0;i<sizes.length;i++) {
        sizes[i].classList.remove("active");
      }
      event.currentTarget.classList.add("active");
    },
    handleChooseView(event){
      let tags =  event.currentTarget.parentNode.getElementsByClassName("tag");
      for(var i=0;i<tags.length;i++) {
        tags[i].classList.remove("active");
      }
      event.currentTarget.classList.add("active");
    },
    onClickNext() {
      this.$router.push({path:'/shop/configure'});
    },
    onChange(index) {
      this.current = index;
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

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#shop-detail{
  padding-bottom: 3.6rem;
  .product-container{
    padding: 0 0.4rem;
    border-bottom: 0.266667rem solid #f6f6f6;
    p.name{
      font-size: 0.426667rem;
      font-weight: bold;
      color: #202020;
      padding-top: 0.506667rem;
    }
    p.price{
      font-size: 0.48rem;
      font-weight: bold;
      color: #e70012;
      padding: 0.24rem 0 0.346667rem 0;
      border-bottom: 1px solid #e5e5e5;
      span{
        font-size: 0.64rem;
      }
      del{
        font-weight: normal;
        color: #999;
        font-size: 0.4rem;
      }
    }
    p.total-title{
      font-size: 0.346667rem;
      color: #666;
      padding: 0.426667rem 0 0.32rem 0;
    }
    .total-container{
      padding-bottom: 0.346667rem;
      border-bottom: 1px solid #e5e5e5;
      span.total-num{
        width: 2.96rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        display: inline-block;
        font-size: 0.346667rem;
        color: #202020;
        background-color: #f3f3f3;
        border-radius: 0.053333rem;
        margin: 0 0.053333rem; 
        margin-bottom: 0.16rem;
      }
      span.total-num.active{
        color: #fff;
        background-color: #e70012;
      }
    }
    .preDay{
      position: relative;
      height: 1.466667rem;
      p.title{
        font-size: 0.346667rem;
        color: #666;
        line-height: 1.466667rem;
        border-bottom: 1px solid #e5e5e5;
      }
      div.count-box {
        display: inline-block;
        float: right;
        line-height: 0.533333rem;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -0.24rem;
        span.minus {
          width: 0.48rem;
          height: 0.48rem;
          text-align: center;
          border: 1px solid #e71002;
          display: inline-block;
          border-radius: 0.266667rem;
          margin-right: 0.586667rem;
          position: relative;
        }
        span.minus:after {
          content: '-';
          font-size: 0.96rem;
          position: absolute;
          left: 50%;
          margin-left: -0.213333rem;
          margin-top: -0.346667rem;
          top: 50%;
          color: #e71002;
        }
        span.num {
          position: absolute;
          margin-left: -0.64rem;
          font-size: 0.48rem;
          color: #202020;
          line-height: 0.533333rem;
          text-align: center;
          width: 0.613333rem;
        }
        span.plus {
          width: 0.48rem;
          height: 0.48rem;
          text-align: center;
          background-color: #e71002;
          border: 1px solid #e71002;
          display: inline-block;
          border-radius: 0.266667rem;
          position: relative;
        }
        span.plus:after {
          content: '+';
          font-size: 0.586667rem;
          color: #fff;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -0.213333rem;
          margin-top: -0.293333rem;
        }
      }
    }
    .van-row{
      height: 0.933333rem;
      .van-col{
        line-height: 0.933333rem;
        font-size: 0.32rem;
        color: #666;
      }
      .left{
        text-align: left;
      }
      .center{
        text-align: center;
      }
      .right{
        text-align: right;
      }
    }
  }
  .tab-view{
    position: relative;
    .tag-container{
      padding: 0.373333rem 0 0.106667rem 0;
      border-bottom: 1px solid #e5e5e5;
      span.tag{
        height: 0.8rem;
        display: inline-block;
        background-color: #fdeeef;
        color: #202020;
        font-size: 0.32rem;
        line-height: 0.8rem;
        text-align: center;
        border-radius: 0.053333rem;
        padding: 0 0.4rem;
        margin-right: 0.133333rem;
        margin-bottom: 0.266667rem;
      }
      span.tag.active{
        background-color: #e71002;
        color: #fff;
      }
    }
    .view-container{
      padding: 0.48rem 0.4rem;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      img.avator{
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 0.48rem;
        position: absolute;
      }
      .view-content{
        padding-left: 1.093333rem;
        p.name{
          font-size: 0.32rem;
          color: #202020;
          span{
            float: right;
            font-size: 0.266667rem;
            color: #999;
          }
        }
        .star-container{
          img{
            width: 0.266667rem;
            height: 0.266667rem;
            padding-right: 0.106667rem;
            padding-top: 0.186667rem;
          }
          span{
            float: right;
            font-size: 0.266667rem;
            color: #666;
          }
        }
        p.view{
          font-size: 0.32rem;
          color: #666;
          padding-top: 0.48rem;
        }
      }
    }
    span.more{
      width: 2.56rem;
      height: 0.8rem;
      line-height: 0.8rem;
      display: block;
      background-color: #dadada;
      border-radius: 0.4rem;
      color: #fff;
      font-size: 0.32rem;
      text-align: center;
      position: absolute;
      bottom: -1.226667rem;
      left: 50%;
      margin-left: -1.28rem;
    }
  }
  .btn-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9999;
    button.van-button {
      height: 1.306667rem;
      width: 50%;
      font-size: 0.4rem;
      margin: 0;
      display: inline-block;
      padding: 0;
      border: none;
      border-radius: unset;
      color: #fff;
    }
    button.btn-addCart {
      background-color: #4c4c4c;
    }
    button.btn-buy {
      position: absolute;
      background-color: #e70012;
    }
  }
}
</style>
