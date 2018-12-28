<template>
  <div id="collect-store">
    <div class="collect-list">

      <div v-for="(item, index) in storeInfoList" :key="index" class="collect-container">
        <div class="store-container">
          <img :src="item.logo">
          <p class="name">{{item.shopName}}</p>
          <p class="info">商品数量：{{item.productCount}} 已拼：9856</p>
          <span class="btn-in" @click="gotoStore(item.code)">进入店铺</span>
        </div>
        <div class="product-list">
          <div v-for="(n, i) in item.products" :key="i" class="product-box">
            <img src="./../../pic/box.png">
            <p>{{n.name}}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
// import { getCouponList } from "@/api/coupon";
import { myFavoriteShop } from '@/api/store'
export default {
  components: {
    [Toast.name]: Toast
  },
  data(){
    return{
      storeInfoList: null
    }
  },
  methods: {
    onClickPoints() {
      this.$router.push({path:'/points/coupon'});
    },
    gotoStore(code) {
      this.$router.push({path:'/store', query: {code}});
    },
    // 加载店铺收藏
    async myFavoriteShop() {
      let that = this
      await myFavoriteShop().then(res => {
        if (res.data.code === 0) {
          that.storeInfoList = res.data.data
        } else {
          Toast(res.data.errmsg)
        }
      })
    }
  },
  mounted(){
    this.myFavoriteShop()
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#collect-store{
  .collect-list{
    padding: 0.533333rem;
    .collect-container{
      padding-bottom: 1.28rem;
      .store-container{
        position: relative;
        padding-left: 1.4rem;
        padding-bottom: 0.533333rem;
        img{
          width: 1.12rem;
          height: 1.12rem;
          border: 1px solid #eee;
          position: absolute;
          left: 0;
          border-radius: 0.106667rem;
        }
        .name{
          font-size: 0.373333rem;
          color: #2d2e2d;
        }
        .info{
          font-size: 0.293333rem;
          color: #afaeaf;
          padding-top: 0.133333rem;
        }
        span.btn-in{
          width: 1.866667rem;
          height: 0.56rem;
          box-sizing: border-box;
          display: inline-block;
          border: 1px solid #8FC221;
          color: #8FC221;
          font-size: 0.266667rem;
          border-radius: 0.28rem;
          line-height: 0.506667rem;
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -0.253333rem;
          padding-left: 0.586667rem;
          &:before{
            content: '';
            width: 0.293333rem;
            height: 0.253333rem;
            display: block;
            background: url(./../../image/icon_dianpu@2x.png) no-repeat;
            -webkit-background-size: 0.293333rem 0.253333rem;
            background-size: 0.293333rem 0.253333rem;
            position: absolute;
            left: 0.186667rem;
            top: 50%;
            margin-top: -0.12rem;
          }
        }
      }
      .product-list{
        width: 100%;
        height: 2.8rem;
        .product-box{
          width: 33.33%;
          height: 100%;
          display: inline-block;
          position: relative;
          text-align: center;
          img{
            width: 2.8rem;
            height: 2.8rem;
            border-radius: 0.213333rem;
          }
          p{
            width: 2.8rem;
            height: 0.48rem;
            line-height: 0.48rem;
            font-size: 0.266667rem;
            color: #2d2e2d;
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -1.4rem;
            background-color: rgba(255,255,255,0.5);
          }
        }
      }
    }
  }
}
</style>
