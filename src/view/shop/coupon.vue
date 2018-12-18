<template>
  <div id="shop-coupon">
    <div class="coupon-container">
      <div class="coupon-box">
        <div class="coupon-left">
          <p class="value">&yen; <span>5</span></p>
          <div class="coupon-left-left">
            <p class="condition">满100可用</p>
            <p class="tips">瓶装鲜奶/酸奶分类</p>
          </div>
        </div>
        <div class="coupon-right">
          <p class="status">剩5天</p>
          <span class="btn-use" @click="onClickUse">立即使用</span>
        </div>
      </div>
    </div>
    <div class="coupon-container">
      <div class="coupon-box">
        <div class="coupon-left">
          <p class="value">&yen; <span>5</span></p>
          <div class="coupon-left-left">
            <p class="condition">满100可用</p>
            <p class="tips">瓶装鲜奶/酸奶分类</p>
          </div>
        </div>
        <div class="coupon-right">
          <p class="status">剩5天</p>
          <span class="btn-use" @click="onClickUse">立即使用</span>
        </div>
      </div>
    </div>
    <div class="nodata" v-if="hasCoupon">
      <img src="./../../img/优惠券-空@2x.png">
      <p>您没有优惠券</p>
      <span class="btn-exchange" @click="onClickPoints">去兑换</span>
    </div>
  </div>
</template>

<script>
// import { Tabs } from 'vant';
// import { articleList } from "@/api/article"
export default {
  components: {

  },
  data(){
    return{
      hasCoupon: false,
    }
  },
  methods: {
    onClickUse() {
      this.$router.go(-1);
    },
    onClickPoints() {
      this.$router.push({path:'/points/coupon'});
    },
  },
  mounted(){

  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#shop-coupon{
  min-height: 100%;
  background-color: #f6f6f6;
  .coupon-container {
    padding: 0.266667rem 0.4rem 0 0.4rem;
    height: 2.986667rem;
    .coupon-box{
      width: 100%;
      height: 100%;
      background: url(./../../img/优惠券@2x.png) no-repeat;
      background-size: 100% 100%;
      .coupon-left {
        width: 70%;
        height: 100%;
        position: relative;
        display: inline-block;
        p.value {
          width: 39%;
          height: 100%;
          line-height: 2.986667rem;
          box-sizing: border-box;
          padding-left: 0.453333rem;
          font-size: 0.64rem;
          font-weight: bold;
          color: #e70012;
          float: left;
          span{
            font-size: 1.266667rem;
          }
        }
        .coupon-left-left{
          p.condition{
            padding: 0.9rem 0 0.133333rem 0;
            font-size: 0.48rem;
            color: #202020;
            font-weight: bold;
          }
          p.tips{
            font-size: 0.32rem;
            color: #666;
          }

        }
      }
      .coupon-right{
        width: 29%;
        height: 100%;
        display: inline-block;
        float: right;
        text-align: center;
        p.status{
          font-size: 0.293333rem;
          color: #e70012;
          padding: 0.746667rem 0 0.24rem 0;
        }
        span.btn-use{
          width: 1.6rem;
          height: 0.56rem;
          line-height: 0.56rem;
          text-align: center;
          display: block;
          color: #fff;
          font-size: 0.293333rem;
          background-color: #e70012;
          border-radius: 0.28rem;
          margin: 0 auto;
          padding: 0.013333rem 0.066667rem;
        }
        span.btn-use.disabled{
          background-color: #ccc;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          padding: 0;
        }
      }
    }
  }
  .nodata{
    width: 100%;
    position: absolute;
    text-align: center;
    img{
      width: 40%;
      margin-top: 2.773333rem;
    }
    p{
      padding: 0.88rem 0 0.453333rem 0;
      font-size: 0.346667rem;
      color: #999;
    }
    span{
      width: 2.986667rem;
      height: 0.88rem;
      display: block;
      color: #666;
      font-size: 0.426667rem;
      border: 1px solid #b5b5b5;
      border-radius: 0.44rem;
      line-height: 0.88rem;
      margin: 0 auto;
    }
  }
}
</style>
