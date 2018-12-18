<template>
  <div id="points">
    <div class="points-header">
      <p>积分<span>&nbsp;{{myPoints}}</span><span class="history" @click="onClickHistory">兑换历史</span></p>
    </div>
    <div class="icon-container">
      <div class="icon-item" @click="onClickCoupon">
        <i class="icon-coupon"></i>
        <p>兑换优惠券</p>
      </div>
      <div class="icon-item">
        <i class="icon-gift" @click="onClickSort"></i>
        <p>兑换物品</p>
      </div>
      <div class="icon-item">
        <div v-if="showSign">
          <i v-if="!hasSign" class="icon-sign" @click="handleSign"></i>
          <i v-if="hasSign" class="icon-hasSign">已签到</i>
        </div>
        <p>每日签到</p>
      </div>
    </div>
    <p class="recommend">推荐商品</p>
    <div v-for="(n,i) in products" :key="i" class="product-container" @click="onClickDetail(i)">
      <img :src="n.picture">
      <div class="info-container">
        <p class="product-title van-ellipsis">{{n.name}}</p>
        <p class="product-points">兑换积分 {{n.costPoint.replace('.00','')}}</p>
      </div>
    </div>
    <!-- <div class="product-container" @click="onClickDetail">
      <img src="./../../pic/iphone.png">
      <div class="info-container">
        <p class="product-title van-ellipsis">Apple iPhone X (A1903) 64GB 银色</p>
        <p class="product-points">兑换积分 20000</p>
      </div>
    </div> -->
    <div class="tips">
      <transition name="fade">
        <p v-if="show">签到成功</p>
      </transition>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { getPointsIndex, isSign, Sign } from "@/api/points";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Toast.name]: Toast,
  },
  data(){
    return{
      show: false,
      hasSign: false,
      showSign: false,
      myPoints: 0,
      products: [],
    }
  },
  methods: {
    onClickDetail(i) {
      let id = Number(this.products[i].id);
      this.$router.push({path:'/points/detail',query:{id:id}});
    },
    onClickCoupon() {
      this.$router.push({path:'/points/coupon'});
    },
    onClickSort() {
      this.$router.push({path:'/points/sort'});
    },
    onClickHistory() {
      this.$router.push({path:'/points/history'});
    },
    handleSign(){
      if(!this.hasSign){
        this.show = true;
        let that = this;
        let timer = null;
        Sign().then(()=>{
          isSign().then(res=>{
            this.hasSign = res.data.code==0 ? false : true;
            timer = setTimeout(function(){
              that.show = false;
              // Toast('签到成功');
            },1000)
          })
        })
        getPointsIndex().then(res1=>{
          console.log(res1);
          this.myPoints = res1.data.data.points;
          this.products = res1.data.data.ExchangeProduct;
        })
      }
    }
  },
  mounted(){
    getPointsIndex().then(res1=>{
      console.log(res1);
      this.myPoints = res1.data.data.points;
      this.products = res1.data.data.ExchangeProduct;
    })
  },
  created(){
    handleLogin();
      this.showSign = false;
      isSign().then(res=>{
        this.hasSign = res.data.code==0 ? false : true;
        this.showSign = true;
      })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#points{
  .van-toast.van-toast--text.van-toast--middle {
    z-index: 2003;
    border-radius: 20px;
    width: 100px;
    height: 35px;
    background-color: #f2f2f2;
    color: #888;
    top: 90%;
    min-width: auto;
  }
  .points-header{
    background-color: #fff;
    height: 1.653333rem;
    border-bottom: 0.266667rem solid #f6f6f6;
    position: relative;
    p{
      font-size: 0.4rem;
      color: #666;
      padding-left: 0.4rem;
      line-height: 1.653333rem;
      span{
        font-size: 0.8rem;
        color: #202020;
        font-weight: bold;
      }
      span.history{
        width: 1.973333rem;
        height: 0.64rem;
        line-height: 0.64rem;
        font-size: 0.32rem;
        text-align: center;
        display: inline-block;
        border: 1px solid #d2d2d2;
        border-radius: 0.32rem;
        color: #666;
        font-weight: normal;
        position: absolute;
        right: 0.4rem;
        top: 50%;
        margin-top: -0.32rem;
      }
    }
  }
  .icon-container{
    padding: 0.56rem 0 0.64rem 0;
    border-bottom: 0.266667rem solid #f6f6f6;
    .icon-item{
      width: 32.6%;
      text-align: center;
      display: inline-block;
      i{
        margin: 0 auto;
        width: 1.306667rem;
        height: 1.306667rem;
        display: block;
      }
      i.icon-coupon{
        background: url(./../../img/兑换优惠券@2x.png) no-repeat;
        background-size: 1.306667rem 1.306667rem;
      }
      i.icon-gift{
        background: url(./../../img/兑换奖品@2x.png) no-repeat;
        background-size: 1.306667rem 1.306667rem;
      }
      i.icon-sign{
        background: url(./../../img/签到@2x.png) no-repeat;
        background-size: 1.306667rem 1.306667rem;
      }
      .icon-hasSign{
        margin: 0 auto;
        width: 1.306667rem;
        height: 1.306667rem;
        display: block;
        background-color: #dadada;
        color: #fff;
        font-weight: bold;
        line-height: 1.306667rem;
        border-radius: 0.666667rem;
      }
      p{
        margin-top: 0.266667rem;
        font-size: 0.32rem;
        color: #666;
      }
    }
  }
  p.recommend{
    height: 1.2rem;
    line-height: 1.2rem;
    border-bottom: 1px solid #eee;
    font-size: 0.4rem;
    font-weight: bold;
    padding-left: 0.4rem;
  }
  .product-container {
    padding-left: 0.4rem;
    margin-top: 0.4rem;
    position: relative;
    height: 2.24rem;
    img {
      position: absolute;
      width: 1.84rem;
      height: 1.84rem;
    }
    .info-container {
      padding: 0 0.4rem 0 2.32rem;
      /*font-weight: bold;*/
      height: 1.84rem;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      p.product-title {
        padding-top: 0.266667rem;
        font-size: 0.4rem;
        color: #202020;
      }
      p.product-points {
        color: #e70012;
        padding-top: 0.266667rem;
        font-size: 0.346667rem;
        font-weight: bold;
      }
    }
  }
  .tips {
    position: fixed;
    bottom: 0.613333rem;
    width: 100%;
    text-align: center;
    p{
      background-color: #dadada;
      width: 2.133333rem;
      height: 0.666667rem;
      display: inline-block;
      line-height: 0.666667rem;
      border-radius: 0.333333rem;
      color: #fff;
      font-weight: bold;
      font-size: 0.32rem;
    }
  }
}
</style>
