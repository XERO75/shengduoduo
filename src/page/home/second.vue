<template>
  <div id="home-second">
    <div class="tabs-bar">
      <van-tabs v-model="active">
        <van-tab title="标签 1"></van-tab>
        <van-tab title="标签 2"></van-tab>
        <van-tab title="标签 3"></van-tab>
        <van-tab title="标签 4"></van-tab>
      </van-tabs>
      <i class="icon-down" @click="show=true"></i>
    </div>
    <div class="mask" v-if="show">
      <div class="tabs-box">
        <p>饮食<i class="icon-up" @click="show=false"></i></p>
        <div class="tags-container">
          <span class="tag active">金卡价是</span><span class="tag">金卡价是</span><span class="tag">金卡价是</span><span class="tag">金卡价是</span><span class="tag">金卡价是</span><span class="tag">金卡价是</span>
        </div>
      </div>
    </div>
    <div class="product-list">
      <!-- <div class="product-container" v-for="n in productList" :key="n.id" @click="onClickDetail(n.id)">
            <div class="product-img"><p class="double" v-if="n.isDoublePoints=='true'">双倍积分</p><img :src="n.image"></div>
            <p class="name van-ellipsis">{{n.name}}</p>
            <p class="money">&yen; <span>{{n.isStraight=='true'?n.straightPrice:n.price}}</span><del v-if="n.isStraight=='true'">&yen;{{n.price}}</del></p>
      </div> -->
      <div class="product-container">
        <div class="product-img"><img src="./../../pic/product.png"></div>
        <p class="name van-ellipsis">99598529</p>
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
import { Tab, Tabs } from 'vant';
// import { getHomeInfo } from "@/api/shop";
// import { handleLogin } from "@/api/login";
// import { getMenu } from "@/api/menu"
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    // [Loading.name]: Loading,
  },
  data(){
    return{
      active: 0,
      show: false,
    }
  },
  methods: {
    onClickH5(id,type) {
      this.$router.push({path:'/shop/h5',query:{id:id,type:type}});
    },
    onClickSort(i) {
      this.$router.push({path:'/shop/sort',query:{categoryIndex:i}});
    },
    onClickBook() {
      this.$router.push({path:'/shop/sort'});
    },
    onClickVoucher() {
      this.$router.push({path:'/voucher'});
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
#home-second{
  padding-bottom: 1.333333rem;
  box-sizing: border-box;
  .tabs-box{
    z-index: 7000;
    background-color: #fff;
    p{
      position: relative;
      line-height: 35px;
      padding-left: 10px;
      i.icon-up{
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        background: url('./../../img/up.png') no-repeat;
        -webkit-background-size: 20px 20px;
        background-size: 20px 20px;
        right: 10px;
        top: 50%;
        margin-top: -10px;
      }
    }
    .tags-container{
      padding: 5px;
      .tag{
        padding: 5px 10px;
        display: inline-block;
        border: 1px solid #e5e5e5;
        border-radius: 2px;
        margin: 5px;
      }
    }
  }
  .tabs-bar{
    position: relative;
    .van-tabs--line{
      width: 90%;
    }
    .icon-down{
      width: 20px;
      height: 20px;
      display: block;
      position: absolute;
      background: url('./../../img/down.png') no-repeat;
      -webkit-background-size: 20px 20px;
      background-size: 20px 20px;
      right: 10px;
      top: 50%;
      margin-top: -10px;
    }
  }
  .product-list{
    border-top: 10px solid #f6f6f6;
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
