<template>
  <div id="coupon">
    <van-tabs v-model="active">
      <van-tab title="未使用">
        <div class="coupon-container" v-for="n in weishiyong" :key="n.id">
          <div class="coupon-box">
            <div class="coupon-left">
              <p class="value">&yen;<span>{{n.discount.replace('.00','')}}</span></p>
              <div class="coupon-left-left">
                <p class="name van-ellipsis">{{n.name}}</p>
                <p class="tips">满{{n.price.replace('.00','')}}可用</p>
                <p class="tips">适用范围：{{n.str}} <span v-if="n.availableProduct.length&&n.availableProduct.length>16" class="more" @click="toastMore(n.availableProduct)">更多</span></p>
              </div>
            </div>
            <div class="coupon-right">
              <p class="status">{{n.time}}</p>
              <span class="btn-use" @click="onClickSort">立即使用</span>
            </div>
          </div>
        </div>
        <div class="nodata"  v-if="!weishiyong.length">
          <img src="./../../img/优惠券-空.png">
          <p>您没有未使用优惠券</p>
          <span class="btn-exchange" @click="onClickPoints">去兑换</span>
        </div>
      </van-tab>
      <van-tab title="已使用">
        <div class="coupon-container" v-for="n in yishiyong" :key="n.id">
          <div class="coupon-box">
            <div class="coupon-left">
              <p class="value">&yen;<span>{{n.discount.replace('.00','')}}</span></p>
              <div class="coupon-left-left">
                <p class="name van-ellipsis">{{n.name}}</p>
                <p class="tips">满{{n.price.replace('.00','')}}可用</p>
                <p class="tips">适用范围：{{n.str}} <span v-if="n.availableProduct.length&&n.availableProduct.length>16" class="more" @click="toastMore(n.availableProduct)">更多</span></p></p>
              </div>
            </div>
            <div class="coupon-right">
              <span class="btn-use disabled">已使用</span>
            </div>
          </div>
        </div>
        <div class="nodata"  v-if="!yishiyong.length">
          <img src="./../../img/优惠券-空.png">
          <p>您没有已使用优惠券</p>
          <span class="btn-exchange" @click="onClickPoints">去兑换</span>
        </div>
      </van-tab>
      <van-tab title="已过期">
        <div class="coupon-container" v-for="n in yiguoqi" :key="n.id">
          <div class="coupon-box">
            <div class="coupon-left">
              <p class="value">&yen;<span>{{n.discount.replace('.00','')}}</span></p>
              <div class="coupon-left-left">
                <p class="name van-ellipsis">{{n.name}}</p>
                <p class="tips">满{{n.price.replace('.00','')}}可用</p>
                <p class="tips">适用范围：{{n.str}} <span v-if="n.availableProduct.length&&n.availableProduct.length>16" class="more" @click="toastMore(n.availableProduct)">更多</span></p>
              </div>
            </div>
            <div class="coupon-right">
              <span class="btn-use disabled">已过期</span>
            </div>
          </div>
        </div>
        <div class="nodata"  v-if="!yiguoqi.length">
          <img src="./../../img/优惠券-空.png">
          <p>您没有已过期优惠券</p>
          <span class="btn-exchange" @click="onClickPoints">去兑换</span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast, Tab, Tabs } from 'vant';
import { getCouponList } from "@/api/coupon";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  data(){
    return{
      active: 0,
      hasCoupon: false,
      coupons: [],
      weishiyong: [],
      yishiyong: [],
      yiguoqi: [],
    }
  },
  methods: {
    onClickPoints() {
      this.$router.push({path:'/points/coupon'});
    },
    onClickSort() {
      this.$router.push({path:'/shop/sort'});
    },
    toastMore(str){
      Toast('适用范围：'+str)
    },
  },
  mounted(){
    handleLogin();
      getCouponList().then(res=>{
        console.log(res);
        this.coupons = res.data.data;
        for(let i=0;i<this.coupons.length;i++) {
          this.coupons[i].str = this.coupons[i].availableProduct.substring(0,16);
          if (this.coupons[i].useDate) {
            if (parseInt(this.coupons[i].useDate) === 0) {
              this.coupons[i].time = '不足1小时'
            }else if (parseInt(this.coupons[i].useDate) < 24) {
              this.coupons[i].time = '剩' + this.coupons[i].useDate + '小时'
            }else if (parseInt(this.coupons[i].useDate) >= 24) {
              this.coupons[i].time = '剩' + (this.coupons[i].useDate / 24).toFixed(0) + '天'
            }
          }
          if(this.coupons[i].status=="未使用"){
            this.coupons[i].useDate = Math.ceil(Number(this.coupons[i].useDate)/24);
            // console.log(this.coupons[i].useDate);
            this.weishiyong.push(this.coupons[i]);
          }else if(this.coupons[i].status=="已使用"){
            this.yishiyong.push(this.coupons[i]);
          }else if(this.coupons[i].status=="已过期"){
            this.yiguoqi.push(this.coupons[i]);
          }
        }
        console.log(this.coupons)
      })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#coupon{
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
            font-size: 0.853333rem;
          }
        }
        .coupon-left-left{
          p.name{
            padding: 0.426667rem 0 0.133333rem 0;
            font-size: 0.48rem;
            color: #202020;
            font-weight: bold;
          }
          p.tips{
            font-size: 0.32rem;
            color: #666;
            span.more{
              color: #3879d9;
            }
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
      width: 4.04rem;
      height: 2.146667rem;
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
