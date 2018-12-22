<template>
  <div id="return">
    <div class="product-container">
      <img src="./../../pic/box.png">
      <div class="product-item">
        <div class="item-left">
          <p class="item-name overTwoLine">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda distinctio natus quis saepe et nemo doloribus iste aliquid incidunt fugiat.</p>
          <p class="item-type">lorem</p>
        </div><div class="item-right">
          <p class="price">&yen;745</p>
          <p class="count">X5</p>
        </div>
      </div>
    </div>
    <div class="select-container">
      <div class="select-item">
        <img style="width:27px" src="./../../image/仅退款@2x.png">
        <p class="title">仅退款</p>
        <p class="tips">未收到货（包含未签收）或卖家协商同意前提下</p>
      </div>
      <div class="select-item">
        <img src="./../../image/退款退货@2x.png">
        <p class="title">退款退货</p>
        <p class="tips">已收到货，需要退换已收到的货物</p>
      </div>
      <div class="select-item">
        <img src="./../../image/换货@2x.png">
        <p class="title">换货</p>
        <p class="tips">已收到货，需要退换已收到的货物</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, } from 'vant';
// import { getDetail, cancelOrder, getComment, handleCommit } from "@/api/order";
// import { handleLogin } from "@/api/login";
// import { WXPay, payFree } from "@/api/pay";
export default {
  components: {
    [Toast.name]: Toast,

  },
  data(){
    return{

    }
  },
  computed: {

  },
  methods: {

  },
  mounted(){

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#return{
  .product-container{
    padding: 0.373333rem 15px;
    position: relative;
    border-bottom: 10px solid #f6f6f6;
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
        .item-name {
          font-size: .4rem;
          width: 5rem;
        }
        .item-type {
          font-size: .35rem;
          color:#999999;
        }
      }
      .item-right{
        vertical-align: top;
        width: 25%;
        display: inline-block;
        p{
          text-align: right;
        }
        .price {
          font-size: .4rem;
          color: rgb(230, 74, 25)
        }
        .count {
          font-size: .35rem;
          color: #999999;
        }
      }
    }
  }
  .select-container{
    padding-left: .4rem;
    .select-item{
      height: .933333rem;
      // padding: 0 0 .4rem 0;
      border-bottom: 1px solid #f6f6f6;
      padding: 20px 40px 20px 35px;
      position: relative;
      &:after{
        content: '';
        width: 16px;
        height: 16px;
        display: block;
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -5px;
        background: url(./../../image/MORE@2x.png) no-repeat;
        -webkit-background-size: 16px 16px;
        background-size: 8px 11px;
      }
      img{
        width: 25px;
        height: 25px;
        position: absolute;
        left: 0;
        // top: 50%;
        // margin-top: -12px;
      }
      .title{
        display: inline-block;
        margin-bottom: .12rem;
        font-size: .4rem;
        color: #2e2d2d;
      }
      .tips{
        font-size: .32rem;
        color: #999999;
      }
    }
  }
}
</style>
