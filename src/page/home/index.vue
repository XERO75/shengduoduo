<template>
  <div id="home-index">
    <van-tabs v-model="activeOne">
      <van-tab title="热门">
        <img class="van-tab__hot" src="../../assets/img/banner@2x.png" alt="">
        <div class="nav-container">
          <div class="nav" @click="">
            <img src="../../assets/img/icon_miaosha@2x.png">
            <p>限时秒杀</p>
          </div><div class="nav" @click="">
            <img src="../../assets/img/icon_temai@2x.png">
            <p>一元特卖</p>
          </div><div class="nav" @click="">
            <img src="../../assets/img/icon_qianggou@2x.png">
            <p>拼团抢购</p>
          </div><div class="nav" @click="">
            <img src="../../assets/img/icon_qingcang@2x.png">
            <p>每日清仓</p>
          </div><div class="nav" @click="">
            <img src="../../assets/img/icon_tijian@2x.png">
            <p>体检中心</p>
          </div><div class="nav" @click="">
            <img src="../../assets/img/icon_jiangtang@2x.png">
            <p>养生讲堂</p>
          </div><div class="nav" @click="">
            <img src="../../assets/img/icon_luntan@2x.png">
            <p>养生论坛</p>
          </div><div class="nav" @click="">
            <img src="../../assets/img/icon_baojian@2x.png">
            <p>养生保健</p>
          </div>
        </div>
        <div class="pin">
          <div class="img-title">
            <img src="./../../pic/title1.png">
            <span class="more" @click="">更多</span>
          </div>
          <div class="ad">
            <img src="../../assets/img/img_banner@2x.png"/>
          </div>
          <!-- <div v-for="(item, index) in zhanweiAdsHeng" :key="index" class="ad">
            <img :src="item.picture"/>
          </div> -->
          <div class="pin-list">
            <div class="pin-container" v-for="n in 3" :key="n.index">
              <div class="pin-box">
                <p class="name">网红美味</p>
                <p class="price">&yen;12.8</p>
                <img src="./../../pic/p1.png">
                <span class="btn-pin" @click="onClickDetail">去拼团</span>
              </div>
            </div>
          </div>
          <!-- <div class="pin-list"> -->
            <!-- <div v-for="(item, index) in zhanweiAdsShu" :key="index" class="pin-container">
              <img :src="item.picture"/> -->
              <!-- <div class="pin-box">
                <p class="name">网红美味</p>
                <p class="price">&yen;12.8</p>
                <img src="./../../pic/p1.png">
                <span class="btn-pin" @click="onClickDetail">去拼团</span>
              </div> -->
            <!-- </div>
          </div> -->
        </div>
        <div class="new">
          <div class="img-title">
            <img src="./../../pic/title1.png">
            <span class="more" @click="">更多</span>
          </div>
          <div class="ad-list">
            <!-- <div v-for="n in productAdLists" :key="n.index" class="ad-container" @click="onClickDetail">
              <img :src="n.picture">
            </div> -->
            <div class="ad-container" @click="onClickDetail">
              <img src="../../assets/img/banner@2x.png">
            </div>
            <div class="ad-container" @click="onClickDetail">
              <img src="../../assets/img/banner@2x.png">
            </div>
          </div>
          <div class="product-list">
            <div class="product-container" @click="onClickDetail(p.productId)">
              <div class="product-img"><img src="../../assets/img/miduoduo@2x.png"></div>
              <p class="name van-ellipsis">Lorem, ipsum.</p>
              <p class="money">&yen;1</p>
            </div>
            <div class="product-container"  @click="onClickDetail(p.productId)">
              <div class="product-img"><img src="../../assets/img/miduoduo@2x.png"></div>
              <p class="name van-ellipsis">Lorem, ipsum.</p>
              <p class="money">&yen;1</p>
            </div>
          </div>
          <!-- <div class="product-list">
            <div class="product-container" v-for="p in products" @click="onClickDetail(p.productId)">
              <div class="product-img"><img :src="p.pictureUrl"></div>
              <p class="name van-ellipsis">{{p.productName}}</p>
              <p class="money">&yen;{{p.minPrice}}</p>
            </div>
          </div> -->
        </div>
      </van-tab>
    <van-tab title="补血养血">
      <div class="product-list">
        <div class="product-container" @click="onClickDetail(p.productId)">
          <div class="product-img"><img src="../../assets/img/miduoduo@2x.png"></div>
          <p class="name van-ellipsis">Lorem, ipsum.</p>
          <p class="money">&yen;1</p>
        </div>
        <div class="product-container"  @click="onClickDetail(p.productId)">
          <div class="product-img"><img src="../../assets/img/miduoduo@2x.png"></div>
          <p class="name van-ellipsis">Lorem, ipsum.</p>
          <p class="money">&yen;1</p>
        </div>
      </div>
    </van-tab>
    <van-tab title="清肺润肺">
      <div class="nav-container">
        <div class="nav" @click="">
          <img src="../../assets/img/icon_miaosha@2x.png">
          <p>限时秒杀</p>
        </div><div class="nav" @click="">
          <img src="../../assets/img/icon_temai@2x.png">
          <p>一元特卖</p>
        </div><div class="nav" @click="">
          <img src="../../assets/img/icon_qianggou@2x.png">
          <p>拼团抢购</p>
        </div><div class="nav" @click="">
          <img src="../../assets/img/icon_qingcang@2x.png">
          <p>每日清仓</p>
        </div>
      </div>
      <div class="product-list">
        <div class="product-container" @click="onClickDetail(p.productId)">
          <div class="product-img"><img src="../../assets/img/miduoduo@2x.png"></div>
          <p class="name van-ellipsis">Lorem, ipsum.</p>
          <p class="money">&yen;1</p>
        </div>
        <div class="product-container"  @click="onClickDetail(p.productId)">
          <div class="product-img"><img src="../../assets/img/miduoduo@2x.png"></div>
          <p class="name van-ellipsis">Lorem, ipsum.</p>
          <p class="money">&yen;1</p>
        </div>
      </div>
    </van-tab>
    <van-tab title="补肺壮阳"></van-tab>
    <van-tab title="润肠通便"></van-tab>
  </van-tabs>
    <!-- <van-swipe :autoplay="3000">
      <template v-for="(item, index) in banners">
        <van-swipe-item :key="index"><a><img :src="item.picture"></a></van-swipe-item>
      </template>
    </van-swipe> -->
<!--     
    <div class="home-tabbar">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home">首页</van-tabbar-item>
        <van-tabbar-item icon="search">分类</van-tabbar-item>
        <van-tabbar-item icon="setting">搜索</van-tabbar-item>
        <van-tabbar-item icon="setting" >购物车</van-tabbar-item>
        <van-tabbar-item icon="setting" >我</van-tabbar-item>
      </van-tabbar>
    </div> -->
  </div>
</template>

<script>
import { Search, Swipe, SwipeItem, Row, Col, Toast, Tab, Tabs, Tabbar, TabbarItem } from 'vant';
import { getProductList, bannerAdList, positionAdList, productAdList, positionAdParallelList, positionAdVerticalList } from "@/api/home";
export default {
  components: {
    [Toast.name]: Toast,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    // [Loading.name]: Loading,
  },
  data(){
    return{
      products: '',
      value: '',  // 搜索框的值
      banners: [],
      zhanweiAds: [],
      productAdLists: [],
      zhanweiAdsHeng: [],
      zhanweiAdsShu: [],

      activeOne: 0,
      active: 0
    }
  },
  methods: {
    gotoList() {
      this.$router.push({path:'/home/list',query:{ value: this.value }});
    },
    onClickDetail(id) {
      this.$router.push({path:'/sort/detail',query:{id:id}});
    },
    onClickMine() {
      this.$router.push({path:'/mine'});
    },
    onClickSort() {
      this.$router.push({path:'/sort'});
    },
    // 获取首页banner广告图
    async bannerAdList() {
      let that = this
      await bannerAdList().then(res => {
        if (res.data.code === 0) {
          that.banners = res.data.data
        } else {
          Toast(res.data.errmsg)
        }
      })
    },
    // 获取首页占位广告(横排)
    async positionAdParallelList() {
      let that = this
      await positionAdParallelList().then(res => {
        if (res.data.code === 0) {
          that.zhanweiAdsHeng = res.data.data
        } else {
          Toast(res.data.errmsg)
        }
      })
    },
    // 获取首页占位广告(竖排)
    async positionAdVerticalList() {
      let that = this
      await positionAdVerticalList().then(res => {
        if (res.data.code === 0) {
          that.zhanweiAdsShu = res.data.data
        } else {
          Toast(res.data.errmsg)
        }
      })
    },
    // 获取首页商品广告
    async productAdList() {
      let that = this
      await productAdList().then(res => {
        if (res.data.code === 0) {
          that.productAdLists = res.data.data
        } else {
          Toast(res.data.errmsg)
        }
      })
    }
  },
  mounted(){
    this.bannerAdList()  // 获取banner图片
    this.productAdList() // 获取商品广告
    this.positionAdParallelList()  // 获取占位广告(横排)
    this.positionAdVerticalList()  // 获取占位广告(竖排)
    getProductList().then(res=>{
      this.products = res.data.data;
    })
  }
};
</script>

<style lang="scss">
#home-index{
  background: #fff;
  .van-tab--active:after {
    background-color: #8FC221;
    height: 0.06rem;
  }
  .van-search .van-icon-search{
    left: 14% !important;
  }
  .van-search .van-cell{
    border-radius: 16px;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
#home-index{
  box-sizing: border-box;
  margin-bottom: 1.2rem;
  .van-tab__hot {
    width: 100%;
  }
  .search-bar{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    width: 100%;
    /*i.icon-item{
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
    }*/
    img.icon-item{
      z-index: 999;
      width: 0.506667rem;
      height: 0.466667rem;
      position: absolute;
      left: 0.32rem;
      top: 50%;
      margin-top: -0.233333rem;
    }
    /*i.icon-user{
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
    }*/
    img.icon-user{
      width: 0.56rem;
      height: 0.613333rem;
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
      width: 21%;
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
      // border-bottom: 0.266667rem solid #f6f6f6;
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
            background-color: #8FC221;
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
      display: flex;
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
      display: flex;
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
          color: #8FC221;
          text-align: left;
        }
      }
    }
  }
  .product-list{
      padding: 0 0.2rem;
      width: 100%;
      display: flex;
      box-sizing: border-box;
      .product-container{
        width: 50%;
        padding: 0.48rem 0.12rem;
        // padding-bottom: 0.48rem;
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
            width: 3.533333rem;
            height: 3.533333rem;
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
          color: #8FC221;
          text-align: left;
        }
      }
    }

}
</style>
