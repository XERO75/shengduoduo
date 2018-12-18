<template>
  <div id="sort">
    <div class="header-bar">
      <p><i class="icon-back"></i>商品分类<i class="icon-cart"></i><i class="icon-more"></i></p>
    </div>
    <van-tabs v-model="active">
      <van-tab title="饮食"></van-tab>
      <van-tab title="服饰"></van-tab>
      <van-tab title="鞋包"></van-tab>
      <van-tab title="母婴"></van-tab>
      <van-tab title="特产"></van-tab>
      <van-tab title="百货"></van-tab>
    </van-tabs>
    <van-swipe :autoplay="3000">
      <!-- <van-swipe-item v-for="n in bannerList" :key="n.id"><a :href="n.h5Url" v-if="n.type=='Link'"><img :src="n.image"></a><img v-if="n.type=='H5'" :src="n.image" @click="onClickH5(n.id,0)"></van-swipe-item> -->
      <van-swipe-item><a><img src="./../../img/banner.png"></a></van-swipe-item>
      <van-swipe-item><a><img src="./../../img/banner.png"></a></van-swipe-item>
    </van-swipe>
    <div class="nav-container">
      <div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>饼干</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>糖果</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>坚果</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>肉铺</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>蜜栈</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>糖果</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>坚果</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>肉铺</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>蜜栈</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../image/一级分类查看更多@2x.png">
        <p>查看全部</p>
      </div>
    </div>
    <div class="product-list">
      <div class="product-container" @click="onClickDetail">
        <div class="product-img"><img src="./../../pic/p1.png"></div>
        <p class="name van-ellipsis">袋装坚果</p>
        <p class="money">&yen;511</p>
      </div><div class="product-container" @click="onClickDetail">
        <div class="product-img"><img src="./../../pic/p1.png"></div>
        <p class="name van-ellipsis">袋装坚果</p>
        <p class="money">&yen;511</p>
      </div><div class="product-container" @click="onClickDetail">
        <div class="product-img"><img src="./../../pic/p1.png"></div>
        <p class="name van-ellipsis">袋装坚果</p>
        <p class="money">&yen;511</p>
      </div><div class="product-container" @click="onClickDetail">
        <div class="product-img"><img src="./../../pic/p1.png"></div>
        <p class="name van-ellipsis">袋装坚果</p>
        <p class="money">&yen;511</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs, Swipe, SwipeItem,  } from 'vant';
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data(){
    return{
      active: 0,
    }
  },
  methods: {
    onClickMine(){
      this.$router.push({path:'/mine'})
    },
    onClickSecond(){
      this.$router.push({path:'/sort/second'})
    },
    onClickDetail(){
      this.$router.push({path:'/sort/detail'});
    },
  },
  mounted(){
  
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#sort{
  position: relative;
  padding-top: 2.4rem;
  box-sizing: border-box;
  .header-bar{
    width: 100%;
    height: 1.2rem;
    text-align: center;
    background-color: #e64a19;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
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
  .nav-container{
    /*height: 2.56rem;*/
    border-bottom: 0.266667rem solid #f6f6f6;
    padding-bottom: 0.533333rem;
    .nav-box{
      width: 20%;
      padding-top: 0.773333rem;
      display: inline-block;
      text-align: center;
      &:last-child{
        img{
          width: 0.773333rem;
          height: 0.773333rem;
        }
      }
      img{
        width: 1.093333rem;
        height: 1.093333rem;
      }
      p{
        font-size: 0.293333rem;
        color: #5f5f5f;
        padding-top: 0.266667rem;
        text-align: center;
      }
    }
  }
  .product-list{
    padding: 0.533333rem 0.2rem;
    width: 100%;
    box-sizing: border-box; 
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
