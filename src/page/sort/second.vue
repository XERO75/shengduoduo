<template>
  <div id="sort-second">
    <HeaderBar title="饮食" @back="onClickBack" @cart="onClickCart"></HeaderBar> 
    <div class="tabs-bar">
      <van-tabs v-model="active">
        <van-tab title="饼干糕点"></van-tab>
        <van-tab title="小食糖巧"></van-tab>
        <van-tab title="坚果炒货"></van-tab>
        <van-tab title="肉类零食"></van-tab>
      </van-tabs>
      <i class="icon-down" @click="show=true"></i>
    </div>
    <div class="mask" v-if="show">
      <div class="tabs-box" v-if="show">
        <p>饮食<i class="icon-up" @click="show=false"></i></p>
        <div class="tags-container">
          <span class="tag active">饼干小吃</span><span class="tag">饼干小吃</span><span class="tag">饼干小吃</span><span class="tag">饼干小吃</span><span class="tag">饼干小吃</span><span class="tag">饼干小吃</span>
        </div>
      </div>
    </div>
    <div class="product-list">
      <div class="product-container">
        <div class="product-img"><img src="./../../pic/p2.png"></div>
        <p class="name van-ellipsis">好吃薯片</p>
        <p class="money">&yen;511</p>
      </div><div class="product-container">
        <div class="product-img"><img src="./../../pic/p2.png"></div>
        <p class="name van-ellipsis">好吃薯片</p>
        <p class="money">&yen;511</p>
      </div><div class="product-container">
        <div class="product-img"><img src="./../../pic/p2.png"></div>
        <p class="name van-ellipsis">好吃薯片</p>
        <p class="money">&yen;511</p>
      </div><div class="product-container">
        <div class="product-img"><img src="./../../pic/p2.png"></div>
        <p class="name van-ellipsis">好吃薯片</p>
        <p class="money">&yen;511</p>
      </div><div class="product-container">
        <div class="product-img"><img src="./../../pic/p2.png"></div>
        <p class="name van-ellipsis">好吃薯片</p>
        <p class="money">&yen;511</p>
      </div><div class="product-container">
        <div class="product-img"><img src="./../../pic/p2.png"></div>
        <p class="name van-ellipsis">好吃薯片</p>
        <p class="money">&yen;511</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, } from 'vant';
// import { getHomeInfo } from "@/api/shop";
import HeaderBar from "@/components/HeaderBar";
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    // [Loading.name]: Loading,
    HeaderBar,
  },
  data(){
    return{
      active: 0,
      show: false,
    }
  },
  methods: {
    onClickBack() {
      this.$router.go(-1);
    },
    onClickCart() {
      this.$router.push({path:'/cart'});
    },
    onClickMine() {
      this.$router.push({path:'/mine'});
    },
    onClickDetail(id) {
      this.$router.push({path:'/shop/sort',query:{productId:id}});
      // this.$router.push({path:'/shop/sort',query:''});
    }
  },
  mounted(){
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#sort-second{
  padding-top: 2.4rem;
  box-sizing: border-box;
  position: relative;
  .header-bar{
    width: 100%;
    height: 1.2rem;
    text-align: center;
    background-color: #e64a19;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 7000;
    p{
      line-height: 1.2rem;
      text-align: center;
      font-size: 0.48rem;
      position: relative;
      i.icon-back{
        width: 0.28rem;
        height: 0.506667rem;
        display: block;
        position: absolute;
        left: 0.32rem;
        top: 50%;
        margin-top: -0.253333rem;
        background: url(./../../image/导航返回@2x.png) no-repeat;
        -webkit-background-size: 0.28rem 0.506667rem;
        background-size: 0.28rem 0.506667rem;
      }
      i.icon-cart{
        width: 0.64rem;
        height: 0.533333rem;
        display: block;
        position: absolute;
        right: 1.2rem;
        top: 50%;
        margin-top: -0.266667rem;
        background: url(./../../image/导肮购物车@2x.png) no-repeat;
        -webkit-background-size: 0.64rem 0.533333rem;
        background-size: 0.64rem 0.533333rem;
      }
      i.icon-more{
        width: 0.56rem;
        height: 0.133333rem;
        display: block;
        position: absolute;
        right: 0.32rem;
        top: 50%;
        margin-top: -0.066667rem;
        background: url(./../../image/导航更多@2x.png) no-repeat;
        -webkit-background-size: 0.56rem 0.133333rem;
        background-size: 0.56rem 0.133333rem;
      }
    }
  }
  .tabs-box{
    width: 100%;
    position: fixed;
    top: 1.2rem;
    background-color: #fff;
    z-index: 7000;
    /*-webkit-animation-name: fadeIn;
    animation-name: fadeIn;
    -webkit-animation-duration: 0s;
    animation-duration: 0s;  
    -webkit-animation-fill-mode: forwards ;  
    animation-fill-mode: forwards ;
    -webkit-animation-delay:1s;
    animation-delay:1s;*/
/*    @-webkit-keyframes fadeIn {
      0% {
        opacity: 0
      }
      100% {
        opacity: 1
      }
    }
    @keyframes fadeIn {
      0% {
        opacity: 0
      }
      100% {
        opacity: 1
      }
    }*/
    p{
      position: relative;
      line-height: 1.333333rem;
      padding-left: 0.4rem;
      font-size: 0.4rem;
      color: #2d2d2d;
      .icon-up{
        width: 0.4rem;
        height: 0.213333rem;
        display: block;
        position: absolute;
        background: url('./../../image/二级分类-关闭@2x.png') no-repeat;
        -webkit-background-size: 0.4rem 0.213333rem;
        background-size: 0.4rem 0.213333rem;
        right: 0.4rem;
        top: 50%;
        margin-top: -0.106667rem;
      }
    }
    .tags-container{
      padding: 0 0.2rem;
      padding-bottom: 0.266667rem;
      .tag{
        margin: 0 0.2rem;
        margin-bottom: 0.4rem;
        padding: 0.2rem 0.32rem;
        display: inline-block;
        border: 1px solid #dcdcdc;
        box-sizing: border-box;
        border-radius: 0.053333rem;
        font-size: 0.32rem;
        color: #2d2d2d;
        &.active{
          color: #e64a19;
          border: 1px solid #e64a19;
        }
      }
    }
  }
  .tabs-bar{
    width: 100%;
    height: 1.2rem;
    position: fixed;
    top: 1.2rem;
    background-color: #fff;
    border-bottom: 1px solid #f6f6f6;
    z-index: 200;
    .van-tabs--line{
      width: 90%;
    }
    .icon-down{
      width: 0.4rem;
      height: 0.213333rem;
      display: block;
      position: absolute;
      background: url('./../../image/二级分类-展开@2x.png') no-repeat;
      -webkit-background-size: 0.4rem 0.213333rem;
      background-size: 0.4rem 0.213333rem;
      right: 0.4rem;
      top: 50%;
      margin-top: -0.106667rem;
    }
  }
  .product-list{
    padding: 0.533333rem 0.2rem;
    width: 100%;
    box-sizing: border-box;
    border-top: 0.266667rem solid #f6f6f6;
    .product-container{
      width: 50%;
      padding: 0 0.12rem;
      padding-bottom: 0.48rem;
      box-sizing: border-box;
      display: inline-block;
      text-align: center;
      .product-img{
        position: relative;
        p.double{
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 0.693333rem;
          line-height: 0.693333rem;
          font-size: 0.4rem;
          color: #fff;
          background-color: #e70012;
        }
        img{
          width: 4.533333rem;
          height: 4.533333rem;
          border-radius: 0.08rem;
        }
        
      }
      p.name{
        font-size: 0.373333rem;
        color: #2d2d2d;
        padding: 0.32rem 0 0 0.186667rem;
        text-align: left;
      }
      p.money{
        padding-left: 0.106667rem;
        font-size: 0.4rem;
        font-weight: bold;
        color: #e64a19;
        text-align: left;
      }
    }
  }

}
</style>
