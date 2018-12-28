<template>
  <div id="after-sale-detail">
    <div class="bg-container">
      <img src="./../../image/img_beijin@2x.png">
      <p class="status">退款成功</p>
      <p class="date">2010-2-11</p>
    </div>
    <div class="money-container">
      <p>退款总金额<span>&yen;2</span></p>
    </div>
    <div class="info-container">
      <p class="title">退款信息</p>
      <div class="product-container">
        <img src="../../assets/img/icon_miaosha@2x.png">
        <p class="name overTwoLine">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, aut.</p>
        <!-- <p class="price">&yen;2</p> -->
        <p class="type">颜色:red 规格:1L </p>
        <!-- <p class="type">{{(refundDetails.specifications.replace(/；/g,' '))}} <span>更多</span></p> -->
      </div>
      <div class="other-container">
        <p>退款原因：1</p>
        <p>退款金额：&yen;1</p>
        <p>申请时间：1</p>
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
  background: #fff;
  height: 100%;
  .bg-container{
    width: 100%;
    height: 2.613333rem;
    position: relative;
    background: #92C221;
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
      font-size: .4rem;
      color: #fff;
    }
  }
  .money-container{
    padding: 0 0.533333rem;
    p{
      // border-bottom: 1px solid #e5e5e5;
      line-height: 1.2rem;
      font-size: 0.4rem;
      color: #2d2e2d;
      span{
        float: right;
        font-size: 0.426667rem;
        // color: #8FC221;
      }
    }
  }
  .info-container{
    border-top: 10px solid #efefef;
    p.title{
      line-height: 0.933333rem;
      padding-left: 0.533333rem;
      color: #2d2e2d;
      font-size: 0.4rem;
      border-bottom: 1px solid #efefef;
    }
    div.product-container{
      width: 100%;
      height: 3.093333rem;
      border-bottom: 1px solid #efefef;
      // background-color: #f9f9f9;
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
        margin-top: .2rem;
      }
      .price{
        font-size: 0.386667rem;
        font-weight: bold;
        padding-top: 0.266667rem;
      }
      .type{
        margin-top: .2rem;
        font-size: 0.4rem;
        color: #7f7f7f;
        span{
          padding-left: 0.533333rem;
        }
      }
    }
    div.other-container{
      font-size: .4rem;
      padding-top: 0.4rem;
      padding-left: 0.533333rem;
      p{
        // font-size: 0.32rem;
        color: #979696;
        line-height: 0.613333rem;
      }
    }
  }
}
</style>
