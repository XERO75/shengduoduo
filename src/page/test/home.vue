<template>
  <div id="home-index">
    <van-swipe :autoplay="3000">
      <!-- <van-swipe-item v-for="n in bannerList" :key="n.id"><a :href="n.h5Url" v-if="n.type=='Link'"><img :src="n.image"></a><img v-if="n.type=='H5'" :src="n.image" @click="onClickH5(n.id,0)"></van-swipe-item> -->
      <van-swipe-item><a><img src="./../../img/banner.png"></a></van-swipe-item>
      <van-swipe-item><a><img src="./../../img/banner.png"></a></van-swipe-item>
    </van-swipe>
    <div class="nav-container">
      <div class="nav" @click="">
        <img src="./../../image/A1@2x.png">
        <p>限时秒杀</p>
      </div><div class="nav" @click="">
        <img src="./../../image/A2@2x.png">
        <p>清仓专场</p>
      </div><div class="nav" @click="">
        <img src="./../../image/A3@2x.png">
        <p>天天拼团</p>
      </div><div class="nav" @click="">
        <img src="./../../image/A4@2x.png">
        <p>1元抢购</p>
      </div><div class="nav" @click="">
        <img src="./../../image/A5@2x.png">
        <p>当地特产</p>
      </div><div class="nav" @click="">
        <img src="./../../image/A6@2x.png">
        <p>高米易购</p>
      </div><div class="nav" @click="">
        <img src="./../../image/A7@2x.png">
        <p>高米餐饮</p>
      </div><div class="nav" @click="">
        <img src="./../../image/A8@2x.png">
        <p>高米洗车</p>
      </div><div class="nav" @click="">
        <img src="./../../image/A9@2x.png">
        <p>高米洗衣</p>
      </div><div class="nav" @click="">
        <img src="./../../image/A10@2x.png">
        <p>附近高米</p>
      </div>
    </div>
    <div class="pin">
      <div class="img-title">
        <img src="./../../pic/title1.png">
        <span class="more" @click="onClickSecond">更多></span>
      </div>
      <div class="ad">
        <img src="./../../image/限时必拼@2x.png">
      </div>
      <div class="pin-list">
        <div class="pin-container">
          <div class="pin-box">
            <p class="name">地方特产</p>
            <p class="price">&yen;12.8</p>
            <img src="./../../pic/p1.png">
            <span class="btn-pin" @click="onClickDetail">去拼团</span>
          </div>
        </div><div class="pin-container">
          <div class="pin-box">
            <p class="name">满50送20</p>
            <p class="price">&yen;12.8</p>
            <img src="./../../pic/p1.png">
            <span class="btn-pin" @click="onClickDetail">去拼团</span>
          </div>
        </div><div class="pin-container">
          <div class="pin-box">
            <p class="name">网红美味</p>
            <p class="price">&yen;12.8</p>
            <img src="./../../pic/p1.png">
            <span class="btn-pin" @click="onClickDetail">去拼团</span>
          </div>
        </div>
      </div>
    </div>
    <div class="new">
      <div class="img-title">
        <img src="./../../pic/title1.png">
        <span class="more" @click="onClickSecond">更多></span>
      </div>
      <div class="ad-list">
        <div class="ad-container" @click="onClickDetail">
          <img src="./../../pic/ad1.png">
        </div><div class="ad-container" @click="onClickDetail">
          <img src="./../../pic/ad2.png">
        </div>
      </div>
      <div class="product-list">
        <!-- <div class="product-container" v-for="n in productList" :key="n.id" @click="onClickDetail(n.id)">
          <div class="product-img"><p class="double" v-if="n.isDoublePoints=='true'">双倍积分</p><img :src="n.image"></div>
          <p class="name van-ellipsis">{{n.name}}</p>
          <p class="money">&yen; <span>{{n.isStraight=='true'?n.straightPrice:n.price}}</span><del v-if="n.isStraight=='true'">&yen;{{n.price}}</del></p>
        </div> -->
        <div class="product-container" @click="onClickDetail">
          <div class="product-img"><img src="./../../pic/p2.png"></div>
          <p class="name van-ellipsis">可比克薯片</p>
          <p class="money">&yen;511</p>
        </div><div class="product-container" @click="onClickDetail">
          <div class="product-img"><img src="./../../pic/p2.png"></div>
          <p class="name van-ellipsis">可比克薯片</p>
          <p class="money">&yen;511</p>
        </div><div class="product-container" @click="onClickDetail">
          <div class="product-img"><img src="./../../pic/p2.png"></div>
          <p class="name van-ellipsis">可比克薯片</p>
          <p class="money">&yen;511</p>
        </div><div class="product-container" @click="onClickDetail">
          <div class="product-img"><img src="./../../pic/p2.png"></div>
          <p class="name van-ellipsis">可比克薯片</p>
          <p class="money">&yen;511</p>
        </div>
      </div>
    </div>
   
    <!-- <div class="bottom_tab">
      <van-row>
        <van-col span="6"><div><img :src="iconList.homeLight"></div></van-col>
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
    onClickDetail() {
      this.$router.push({path:'/home/detail'});
      // this.$router.push({path:'/shop/sort',query:''});
    },
    onClickSecond() {
      this.$router.push({path:'/home/second'});
    }
  },
  mounted(){
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#home-index{
  padding-bottom: 1.333333rem;
  box-sizing: border-box;
  .nav-container{
    /*height: 2.56rem;*/
    border-bottom: 0.266667rem solid #f6f6f6;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    .nav{
      width: 20%;
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
  .img-title{    
    height: 30px;
    position: relative;
    img{
      height: 100%;
    }
    .more{    
      position: absolute;
      right: 10px;
      line-height: 30px;
    }
  }
  .pin{
    .ad{
      img{
        width: 100%;
      }
    }
    .pin-list{
      .pin-container{
        width: 33.3%;
        display: inline-block;
        margin: 0 auto;
        padding: 0 3px;
        box-sizing: border-box;
        .pin-box{
          background-color: #f4f4f4;
          text-align: center;
          padding-bottom: 10px;
          .name{

          }
          .price{

          }
          img{
            width: 100%;
          }
          .btn-pin{
            width: 60px;
            height: 20px;
            display: block;
            margin: 0 auto;
            background-color: #e64a19;
            color: #fff;
            border-radius: 20px;
            line-height: 20px;
          }

        }
      }
    }
  }
  .new{
    .ad-list{
      .ad-container{
        width: 50%;
        display: inline-block;
        margin: 0 auto;
        padding: 0 2px;
        box-sizing: border-box;
        img{
          width: 100%;
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

}
</style>
