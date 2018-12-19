<template>
  <div id="home-sort">
    <van-swipe :autoplay="3000">
      <!-- <van-swipe-item v-for="n in bannerList" :key="n.id"><a :href="n.h5Url" v-if="n.type=='Link'"><img :src="n.image"></a><img v-if="n.type=='H5'" :src="n.image" @click="onClickH5(n.id,0)"></van-swipe-item> -->
      <van-swipe-item><a><img src="./../../pic/banner.png"></a></van-swipe-item>
      <van-swipe-item><a><img src="./../../pic/banner.png"></a></van-swipe-item>
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
        <img src="./../../pic/all.png">
        <p>查看全部</p>
      </div>
    </div>
    <div class="product-list">
      <!-- <div class="product-container" v-for="n in productList" :key="n.id" @click="onClickDetail(n.id)">
        <div class="product-img"><p class="double" v-if="n.isDoublePoints=='true'">双倍积分</p><img :src="n.image"></div>
        <p class="name van-ellipsis">{{n.name}}</p>
        <p class="money">&yen; <span>{{n.isStraight=='true'?n.straightPrice:n.price}}</span><del v-if="n.isStraight=='true'">&yen;{{n.price}}</del></p>
      </div> -->
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
   
    <!-- <div class="bottom_tab">
      <van-row>
        <van-col span="6"><div><img :src="iconList.home-sortLight"></div></van-col>
        <van-col span="6"><div @click="onClickBook"><img :src="iconList.booking"></div></van-col>
        <van-col span="6"><div @click="onClickVoucher"><img :src="iconList.giftCard"></div></van-col>
        <van-col span="6"><div @click="onClickMine"><img :src="iconList.my"></div></van-col>
      </van-row>
    </div> -->
  </div>
</template>

<script>
import { Swipe, SwipeItem, Row, Col } from 'vant';
// import { getHomeInfo } from "@/api/shop";
// import { handleLogin } from "@/api/login";
// import { getMenu } from "@/api/menu"
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Row.name]: Row,
    [Col.name]: Col,
    // [Loading.name]: Loading,
  },
  data(){
    return{

    }
  },
  methods: {
    onClickDetail(){
      this.$router.push({path:'/home/detail'});
    },
    onClickSecond(){
      this.$router.push({path:'/home/second'});
    },
  },
  mounted(){
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#home-sort{
  padding-bottom: 1.333333rem;
  box-sizing: border-box;
  .nav-container{
    /*height: 2.56rem;*/
    border-bottom: 0.266667rem solid #f6f6f6;
    .nav-box{
      width: 20%;
      display: inline-block;
      text-align: center;
      img{
        width: 1.2rem;
        height: 1.2rem;
        margin-top: 0.4rem;
      }
      p{
        font-size: 0.32rem;
        color: #666;
        line-height: 0.666667rem;
        text-align: center;
      }
    }
  }
  .product-list{
    padding: 0.106667rem 0.2rem;
    width: 100%;
    box-sizing: border-box; 
    .product-container{
      width: 50%;
      padding: 0 0.12rem 0.346667rem 0.12rem;
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
        }
        
      }
      p.name{
        font-size: 0.373333rem;
        color: #202020;
        padding: 0.24rem 0 0 0.106667rem;
        text-align: left;
      }
      p.money{
        padding-left: 0.106667rem;
        font-size: 0.4rem;
        font-weight: bold;
        color: #e70012;
        text-align: left;
        span{
          font-size: 0.48rem;
        }
        del{
          font-weight: normal;
          color: #999;
          padding-left: 0.266667rem;
        }
      }
    }
  }

}
</style>
