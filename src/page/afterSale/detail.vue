<template>
  <div id="after-sale-detail">
    <div class="bg-container">
      <img src="./../../image/img_beijin@2x.png">
      <p class="status">{{refundDetails.refundStatus}}</p>
      <p class="date">{{refundDetails.createDate}}</p>
    </div>
    <div class="money-container">
      <p>退款总金额<span>&yen;{{refundDetails.actualPay}}</span></p>
    </div>
    <div class="info-container">
      <p class="title">退款信息</p>
      <div class="product-container">
        <img :src="refundDetails.image">
        <p class="name">{{refundDetails.product}}</p>
        <p class="price">&yen;{{refundDetails.actualPay}}</p>
        <p class="type">{{(refundDetails.specifications.replace(/；/g,' '))}} <span>更多</span></p>
      </div>
      <div class="other-container">
        <p>退款原因：{{refundDetails.rejectReason}}</p>
        <p>退款金额：&yen; {{refundDetails.refundPrice}}</p>
        <p>申请时间：{{refundDetails.createDate}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast,  } from 'vant';
import { getRefundDetails } from '@/api/afterSale.js'
export default {
  components: {
    [Toast.name]: Toast,
  },
  data(){
    return{
      refundDetails: {}
    }
  },
  methods: {
    onClickPoints() {
      this.$router.push({path:'/points/coupon'});
    },
    async getRefundDetails() {
      let that = this
      getRefundDetails(this.$route.query.paidCode).then(res => {
        if (res.data.code === 0) {
          console.log(res);
          that.refundDetails = res.data.data
        } else {
          Toast(res.data.errmsg)
        }
      })
    }
  },
  mounted(){
    this.getRefundDetails()
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#after-sale-detail{
  .bg-container{
    width: 100%;
    height: 2.613333rem;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
    }
    .status{
      padding-top: 0.533333rem;
      padding-left: 0.533333rem;
      font-size: 0.506667rem;
      color: #fff;
    }
    .date{
      padding-left: 0.533333rem;
      font-size: 0.266667rem;
      color: #fff;
    }
  }
  .money-container{
    padding: 0 0.533333rem;
    p{
      border-bottom: 1px solid #e5e5e5;
      line-height: 1.2rem;
      font-size: 0.4rem;
      color: #2d2e2d;
      span{
        float: right;
        font-size: 0.426667rem;
        color: #e64a19;
      }
    }
  }
  .info-container{
    p.title{
      line-height: 0.933333rem;
      padding-left: 0.533333rem;
      color: #2d2e2d;
      font-size: 0.4rem;
    }
    div.product-container{
      width: 100%;
      height: 3.093333rem;
      background-color: #f9f9f9;
      padding: 0.533333rem;
      padding-left: 2.933333rem;
      position: relative;
      box-sizing: border-box;
      img{
        width: 2.16rem;
        height: 2.16rem;
        position: absolute;
        left: 0.533333rem;
        top: 50%;
        margin-top: -1.08rem;
      }
      .name{
        font-size: 0.36rem;
        color: #2d2e2d;
      }
      .price{
        font-size: 0.386667rem;
        font-weight: bold;
        padding-top: 0.266667rem;
      }
      .type{
        font-size: 0.253333rem;
        color: #7f7f7f;
        span{
          padding-left: 0.533333rem;
        }
      }
    }
    div.other-container{
      padding-top: 0.4rem;
      padding-left: 0.533333rem;
      p{
        font-size: 0.32rem;
        color: #979696;
        line-height: 0.613333rem;
      }
    }
  }
}
</style>
