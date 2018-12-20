<template>
  <div id="home-index">
    <div class="search-bar">
      <i class="icon-item" @click="onClickSort"></i>
      <van-search 
        placeholder="搜索" 
        v-model="value"
        background="#e64a19"
      />
      <i class="icon-user" @click="onClickMine"></i>
    </div>
    <van-swipe :autoplay="3000">
      <!-- <van-swipe-item v-for="n in bannerList" :key="n.id"><a :href="n.h5Url" v-if="n.type=='Link'"><img :src="n.image"></a><img v-if="n.type=='H5'" :src="n.image" @click="onClickH5(n.id,0)"></van-swipe-item> -->
      <van-swipe-item><a><img src="./../../pic/banner.png"></a></van-swipe-item>
      <van-swipe-item><a><img src="./../../pic/banner.png"></a></van-swipe-item>
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
        <span class="more" @click="">更多</span>
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
        <span class="more" @click="">更多</span>
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
  </div>
</template>

<script>
import { Search, Swipe, SwipeItem, Row, Col } from 'vant';
// import { getHomeInfo } from "@/api/shop";
export default {
  components: {
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Row.name]: Row,
    [Col.name]: Col,
    // [Loading.name]: Loading,
  },
  data(){
    return{
      value: '',
    }
  },
  methods: {
    onClickDetail() {
      this.$router.push({path:'/sort/detail'});
      // this.$router.push({path:'/shop/sort',query:''});
    },
    onClickMine() {
      this.$router.push({path:'/mine'});
    },
    onClickSort() {
      this.$router.push({path:'/sort'});
    }
  },
  mounted(){
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#home-index{
  padding-top: 1.2rem;
  box-sizing: border-box;
  .search-bar{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    width: 100%;
    i.icon-item{
      width: 0.506667rem;
      height: 0.466667rem;
      display: block;
      background: url(./../../image/分类@2x.png) no-repeat;
      -webkit-background-size: 0.506667rem 0.466667rem;
      background-size: 0.506667rem 0.466667rem;
      position: absolute;
      left: 0.32rem;
      top: 50%;
      margin-top: -0.233333rem;
    }
    i.icon-user{
      width: 0.56rem;
      height: 0.613333rem;
      display: block;
      background: url(./../../image/我@2x.png) no-repeat;
      -webkit-background-size: 0.56rem 0.613333rem;
      background-size: 0.56rem 0.613333rem;
      position: absolute;
      right: 0.32rem;
      top: 50%;
      margin-top: -0.306667rem;
    }
  }
  .nav-container{
    padding: 0.333333rem 0 0.666667rem 0;
    border-bottom: 0.266667rem solid #f6f6f6;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .nav{
      padding-top: 0.333333rem;
      width: 20%;
      text-align: center;
      img{
        width: 1.253333rem;
        height: 1.253333rem;
      }
      p{
        font-size: 0.293333rem;
        color: #5f5f5f;
        line-height: 0.666667rem;
        text-align: center;
      }
    }
  }
  .img-title{    
    height: 1.146667rem;
    position: relative;
    overflow: hidden;
    position: relative;
    &:after{
      content: '';
      width: 0.133333rem;
      height: 0.24rem;
      display: block;
      background: url(./../../image/MORE@2x.png) no-repeat;
      -webkit-background-size: 0.133333rem 0.24rem;
      background-size: 0.133333rem 0.24rem;
      position: absolute;
      right: 0.32rem;
      top: 50%;
      margin-top: -0.12rem;
    }
    img{
      height: 100%;
    }
    .more{    
      position: absolute;
      right: 0.533333rem;
      line-height: 1.146667rem;
      color: #afaeaf;
      font-size: 0.32rem;
    }
  }
  .pin{
    .ad{
      border-bottom: 0.266667rem solid #f6f6f6;
      padding-bottom: 0.48rem;
      img{
        width: 100%;
        padding: 0 0.186667rem;
        box-sizing: border-box;
      }
    }
    .pin-list{
      padding: 0 0.28rem;
      padding-bottom: 0.4rem;
      .pin-container{
        width: 33.3%;
        display: inline-block;
        margin: 0 auto;
        padding: 0 0.04rem;
        box-sizing: border-box;
        border-radius: 0.08rem;
        .pin-box{
          background-color: #f4f4f4;
          text-align: center;
          padding-bottom: 0.266667rem;
          padding-top: 0.373333rem;
          .name{
            font-size: 0.373333rem;
            font-weight: bold;
            color: #2d2e2d;
            padding-bottom: 0.186667rem;
          }
          .price{
            font-size: 0.373333rem;
            font-weight: bold;
            color: #2d2e2d;
          }
          img{
            width: 2.053333rem;
            height: 2.053333rem;
            margin-bottom: 0.2rem;
          }
          .btn-pin{
            width: 2.053333rem;
            height: 0.56rem;
            display: block;
            margin: 0 auto;
            background-color: #e64a19;
            color: #fff;
            font-size: 0.32rem;
            border-radius: 0.28rem;
            line-height: 0.56rem;
          }

        }
      }
    }
  }
  .new{
    .ad-list{
      height: 2.186667rem;
      padding: 0 0.28rem 0.373333rem 0.28rem;
      .ad-container{
        width: 50%;
        height: 100%;
        padding: 0 0.04rem;
        box-sizing: border-box;
        vertical-align: top;
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
      padding: 0 0.2rem;
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

}
</style>
