<template>
  <div id="collect-store">
    <div class="collect-list"  v-for="(item, index) in 2" :key="index">

      <div  class="collect-container">
        <div class="store-container">
          <img src="../../assets/img/icon_miaosha@2x.png">
          <p class="name">lorem</p>
          <p class="info">商品数量：<span>11</span> 已拼：<span>2123</span></p>
          <span class="btn-in" @click="gotoStore(item.code)">进入店铺</span>
        </div>
        <div class="product-list">
          <div class="product-box" v-for="(item, index) in 3" :key="index">
            <img src="./../../pic/box.png">
            <p class="van-ellipsis">Lorem ipsum dolor</p>
            <p><span>$11</span></p>
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
    background: #fff;
    margin: 10px 0;
    .collect-container{
      padding-bottom: 1.28rem;
      .store-container{
        position: relative;
        padding-left: 1.4rem;
        padding-bottom: 0.533333rem;
        span {
          color: #FE7E00;
        }
        img{
          width: 1.12rem;
          height: 1.12rem;
          border: 1px solid #eee;
          position: absolute;
          left: 0;
          border-radius: 0.106667rem;
        }
        .name{
          font-size: 0.4rem;
          color: #2d2e2d;
        }
        .info{
          font-size: 0.37rem;
          color: #afaeaf;
          padding-top: 0.133333rem;
        }
        span.btn-in{
          width: 2.1rem;
          height: 0.56rem;
          box-sizing: border-box;
          display: inline-block;
          border: 1px solid #E1E1E1;
          color: #4C4C4C;
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
            width: 0.33333rem;
            height: 0.263333rem;
            display: block;
            background: url(../../assets/img/store_dianpu@2x.png) no-repeat;
            -webkit-background-size: 0.293333rem 0.283333rem;
            background-size: 0.33333rem 0.263333rem;
            position: absolute;
            left: 0.186667rem;
            top: 50%;
            margin-top: -0.15rem;
          }
        }
      }
      .product-list{
        width: 100%;
        height: 2.8rem;
        .product-box{
          width: 28%;
          margin: 0 .2rem;
          height: 100%;
          display: inline-block;
          position: relative;
          text-align: center;
          img{
            width: 2.8rem;
            height: 2.8rem;
            border-radius: 0.213333rem;
          }
          p {
            text-align: left;
            font-size: .4rem;
          }
          span {
            color:#FE7E00;
          }
          // p{
          //   width: 2.8rem;
          //   height: 0.48rem;
          //   line-height: 0.48rem;
          //   font-size: 0.266667rem;
          //   color: #2d2e2d;
          //   position: absolute;
          //   bottom: 0;
          //   left: 50%;
          //   margin-left: -1.4rem;
          //   background-color: rgba(255,255,255,0.5);
          // }
        }
      }
    }
  }
}
</style>
