<template>
  <div id="points-coupon">
    <div class="points-header">
      <p>积分<span>&nbsp;{{myPoints}}</span></p>
    </div>
    <div class="coupon-container" v-for="(n,i) in coupons">
      <div class="coupon-box">
        <div class="coupon-left">
          <p class="value">&yen;<span>{{n.discount}}</span></p>
          <div class="coupon-left-left">
            <p class="name van-ellipsis">{{n.couponName}}</p>
            <p class="tips">满{{n.price}}可用</p>
            <p class="tips">适用范围：{{n.str}} <span v-if="n.availableProduct.length&&n.availableProduct.length>16" class="more" @click="toastMore(n.availableProduct)">更多</span></p>
          </div>
        </div>
        <div class="coupon-right">
          <p class="text">兑换积分</p>
          <p class="num">{{n.costPoint}}</p>
          <span class="btn-use" @click="showDialog(i)">立即兑换</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import { getCouponList, exchangeCoupon } from "@/api/points";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
    // [Button.name]: Button,
    // [Row.name]: Row,
    // [Col.name]: Col,
  },
  data(){
    return{
      // show: false,
      coupons: [],
      myPoints: 0,
    }
  },
  methods: {
    onClickSuccess() {
      this.$router.push({path:'/points/success',query:{type:'coupon'}});
    },
    showDialog(i){
      Dialog.confirm({
        title: '是否确定兑换优惠券？',
        // message: '弹窗内容'
      }).then(() => {
        if(this.myPoints>=Number(this.coupons[i].costPoint)){
          let formdata = new FormData();
          formdata.append('id',this.coupons[i].id);
          exchangeCoupon(formdata).then(res=>{
            console.log(res);
            if(res.data.code==0){
              this.onClickSuccess(); // on confirm
            }else{
              Toast(res.data.errmsg);
            }
          })
        }else{
          Toast("抱歉，您的积分不足");
        }
      }).catch(() => {
        // on cancel
      });
    },
    toastMore(str){
      Toast('适用范围：'+str)
    },
  },
  mounted(){
    handleLogin();
      getCouponList().then(res=>{
        console.log(res);
        this.coupons = res.data.data.exchangeCoupon;
        if(this.coupons&&this.coupons.length){
          for(let i=0;i<this.coupons.length;i++) {
            if(this.coupons[i].availableProduct){
              console.log(this.coupons[i].availableProduct)
              this.coupons[i].str = this.coupons[i].availableProduct.substring(0,16);
            }
          }
        }
        this.myPoints = res.data.data.points;
      })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#points-coupon{
  min-height: 100%;
  background-color: #f6f6f6;
  .points-header{
    background-color: #fff;
    height: 1.653333rem;
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
    }
  }
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
            padding: 0.48rem 0 0.133333rem 0;
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
        p.text{
          font-size: 0.293333rem;
          color: #e70012;
          padding: 0.48rem 0 0.16rem 0;
        }
        p.num{
          font-size: 0.373333rem;
          color: #e70012;
          font-weight: bold;
          padding-bottom: 0.266667rem;
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
      }
    }
  }
}
</style>
