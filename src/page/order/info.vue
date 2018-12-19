<template>
  <div id="order-detail">
    <div class="img-container">
      <img src="./../../image/img_beijin@2x.png">
    </div>
    <div class="address-container container">
      <div class="defalutAddress">
        <p class="receiver">撒旦 135135454 <span>[默认]</span></p>
        <p class="address">天河</p>
      </div>
    </div>
    <div class="product-container container">
      <p class="productStatus title">美食小店<img src="./../../pic/top@2x.png"></p>
      <div class="product-box">
        <img src="./../../pic/box.png">
        <div class="product-item">
          <div class="item-left">
            <p class="item-name">台湾豌豆
            </p>
            <p>原味</p>
          </div><div class="item-right">
            <p class="price">&yen;745</p>
            <p class="count">X4545</p>
          </div>
        </div>
      </div>
      <div class="info-container">
        <p class="info-item">商品总价<span class="fr">&yen; 500</span></p>
        <p class="info-item">运费<span class="fr">&yen; 500</span></p>
        <p class="info-item">优惠券<span class="fr">满10减3</span></p>
        <p class="info-item">使用e币<span class="fr">5个</span></p>
        <p class="info-item">买家留言<span class="fr">无</span></p>
      </div>
      <p class="need">须付款  <span class="fr">&yen; 500</span></p>
    </div>
    <div class="btn-container">
      <p>付款：&yen; 500</p>
      <span class="btn-pay" @click="gotohome">立即支付</span>
      <span class="btn-cancel">取消订单</span>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog, Popup } from 'vant';
// import { getDetail, cancelOrder, getComment, handleCommit } from "@/api/order";
// import { handleLogin } from "@/api/login";
// import { WXPay, payFree } from "@/api/pay";
export default {
  components: {
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [Popup.name]: Popup,
  },
  data(){
    return{

    }
  },
  computed: {

  },
  methods: {
    cancelOrder(){
      Dialog.confirm({
        title: '确认取消订单？',
        // message: '弹窗内容'
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      });
    },
    gotohome(){
      this.$router.push({path:'/order/list'})
    }



  },
  mounted(){

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#order-detail{
  background-color: #f6f6f6;
  min-height: 100%;
  padding-bottom: 50px;
  .container {
    border-top: 0.266667rem solid #f6f6f6;
    padding: 0 0.4rem;
    background-color: #fff;
    &:first-child{
      border-top: 0;
    }
    .title{
      line-height: 1.2rem;
      font-weight: bold;
      color: #202020;
      font-size: 0.373333rem;
      border-bottom: 1px solid #f6f6f6;
    }
  }
  .img-container{
    width: 100%;
    height: 90px;
    img{
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }
  .address-container{
    padding: 0 10px;
    position: relative;
    p.noAddress{
      line-height: 2.0rem;
      padding-left: 20px;
      position: relative;
      &:before{
        content: '';
        width: 15px;
        height: 15px;
        display: block;
        background: url(./../../image/添加地址@2x.png) no-repeat;
        -webkit-background-size: 15px 15px;
        background-size: 15px 15px;
        position: absolute;
        top: 50%;
        margin-top: -7px;
        left: 0;
      }
    }
    div.defalutAddress{
      padding: 20px 15px 20px 40px;
      &:before{
        content: '';
        width: 20px;
        height: 20px;
        display: block;
        background: url(./../../image/添加地址@2x.png) no-repeat;
        -webkit-background-size: 20px 20px;
        background-size: 20px 20px;
        position: absolute;
        top: 50%;
        margin-top: -10px;
        left: 15px;
      }
      p.receiver{

        span{
          
        }
      }
      p.address{
        height: 50px;
      }
    }
  }
  .product-container{
    .productStatus{
      padding-left: 25px;
      position: relative;
      &:before{
        content: '';
        width: 15px;
        height: 15px;
        display: inline-block;
        background: url(./../../pic/edit.png) no-repeat;
        -webkit-background-size: 15px 15px;
        background-size: 15px 15px;
        position: absolute;
        top: 50%;
        margin-top: -7px;
        left: 0;
      }
      img{
        width: 15px;
        height: 15px;
        padding-left: 5px;
        vertical-align: middle;
      }
      span{
        color: #999;
        font-weight: normal;
      }
    }
    .product-box{
      padding: 0.373333rem 0;
      position: relative;
      border-bottom: 1px solid #f6f6f6;
      img{
        position: absolute;
        width: 1.52rem;
        height: 1.52rem;
      }
      .product-item{
        padding-left: 70px;
        height: 1.52rem;
        &:last-child{
          border-bottom: 0;
        }
        .item-left{
          width: 75%;
          display: inline-block;
        }
        .item-right{
          vertical-align: top;
          width: 25%;
          display: inline-block;
          p{
            text-align: right;
          }
        }
      }
    }
    .info-container{
      border-bottom: 1px solid #f6f6f6;
      .info-item{
        line-height: 30px;
      }
    }
  }
  .btn-container{
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    p{
      line-height: 50px;
      display: inline-block;
    }
    span.btn-cancel{
      width: 70px;
      height: 30px;
      display: inline-block;
      border: 1px solid #eee;
      line-height: 30px;
      padding: 0 10px;
      border-radius: 15px;
      text-align: center;
      float: right;
      margin-top: 10px;
    }
    span.btn-pay{
      width: 70px;
      height: 30px;
      display: inline-block;
      border: 1px solid #ed5422;
      background-color: #ed5422;
      color: #fff;
      line-height: 30px;
      padding: 0 10px;
      border-radius: 15px;
      text-align: center;
      float: right;
      margin-top: 10px;
    }
  }
  







  .van-popup.popup-pay{
    width: 85%;
    height: 11.866667rem;
    top: 45%;
    box-sizing: border-box;
    border-radius: 0.186667rem;
    .van-checkbox{
      margin: 0.4rem 0;
      .van-checkbox__label{
        margin-left: 0.133333rem;
        position: absolute;
        font-size: 0.32rem;
        color: #028bd7;
      }
    }
    .hasChecked {
      border-color: #24af41;
      background-color: #24af41;
      color: #fff;
    }
    .noChecked {
      border-color: #c7c7c7;
      background-color: #c7c7c7;
      color: #fff;
    }
    .pay-container {
      top: 20%;
      background-color: #fff;
      border-radius: 2px;
      padding: 0 0.346667rem;
      p.box-title {
        line-height: 1.386667rem;
        font-size: 0.4rem;
        font-weight: bold;
        padding-left: 0.7rem;
        position: relative;
      }
      p.box-title:before {
        content: '';
        width: 0.6rem;
        height: 0.6rem;
        display: block;
        position: absolute;
        top: 0.426667rem;
        left: 0;
        background: url(./../../image/微信支付@2x.png) no-repeat;
        -webkit-background-size: 0.6rem 0.6rem;
        background-size: 0.6rem 0.6rem;

      }
      .agreement-container {
        border: 1px solid #e5e5e5;
        border-radius: 0.053333rem;
        background-color: #fafafa;
        padding: 0 0.373333rem 0.266667rem 0.373333rem;
        height: 7.333333rem;
        box-sizing: border-box;
        overflow: scroll;
        p.title {
          //font-weight: bold;
          font-size: 0.346667rem;
          color: #202020;
          padding: 0.4rem 0 0.2rem 0;
        }
        p.content {
          padding-top: 0.1rem;
          font-size: 0.32rem;
          line-height: 0.64rem;
          color: #666;
        }
      }
      .read {
        color: #ffd100;
        font-weight: bold;
        font-size: 12px;
        padding: 8px 0 15px 0;
      }
      .btn-WXPay {
        width: 100%;
        height: 1.173333rem;
        line-height: 1.173333rem;
        background-color: #24af41;
        color: #fff;
        border-radius: 0.586667rem;
        text-align: center;
        font-size: 0.4rem;
      }
    }
  }
  .van-popup.popup-cancel{
    top: 6.133333rem;
    width: 85%;
    border-radius: 0.133333rem;
    p{
      margin: 0.506667rem 0 0.4rem 0;
      text-align: center;
      font-weight: bold;
      font-size: 0.48rem;
      color: #202020;
    }
    input{
      width: 85%;
      height: 2.48rem;
      display: block;
      margin: 0 auto;
      padding: 0;
      padding-left: 0.266667rem;
      border: none;
      border: 1px solid #d2d2d2;
      border-radius: 0.133333rem;
      background-color: #f5f5f5;
    }
    textarea{
      width: 85%;
      height: 2.48rem;
      display: block;
      font-size: 0.373333rem;    
      margin: 0 auto;
      padding: 0.133333rem;
    }
    .popup-btn-container {
      margin: 0.56rem 0.586667rem;
      button{
        width: 100%;
        height: 1.04rem;    
        line-height: 1.04rem;
        border-radius: 0.52rem;
      }
    }
  }
  .van-actionsheet{
    p.view{
      font-size: 0.4rem;
      color: #202020;
      font-weight: bold;
      padding: 0.666667rem 0 0.4rem 0;
      text-align: center;
    }
    .view-tabs{
      margin: 0.266667rem 0.72rem 0.533333rem 0.72rem;
      text-align: center;
      span.view-tab{
        border: 1px solid #e5e5e5;
        border-radius: 0.08rem;    
        min-width: 90px;
        padding: 0 10px;
        box-sizing: border-box;
        height: 0.826667rem;
        display: inline-block;
        color: #666;
        font-size: 0.346667rem;
        text-align: center;
        line-height: 0.826667rem;
        margin: 0.133333rem;
      }
      span.view-tab.active{
        border: 1px solid #e70012;
        color: #e70012;
        background-color: #fde5e7;
      }
      textarea{
        width: 100%;
        height: 2.573333rem;  
        font-size: 0.373333rem;
      }
      .btn-view{
        width: 100%;
        margin-top: 0.666667rem;
        height: 1.173333rem;
        border: none;
        background-color: #e70012;
        color: #fff;
        font-size: 0.426667rem;
        border-radius: 0.586667rem;
      }
    }
  } 
}
</style>
