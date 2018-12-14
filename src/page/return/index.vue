<template>
  <div id="return">
    <div class="product-container">
      <img src="./../../pic/box.png">
      <div class="product-item">
        <div class="item-left">
          <p class="item-name">考核会计阿斯加德库巴姬爱神的箭安康市道具卡含税单价卡时间的话卡萨丁按时间看大家
          </p>
          <p>交换空间还款计划看空间客家话</p>
        </div><div class="item-right">
          <p class="price">&yen;745</p>
          <p class="count">X4545</p>
        </div>
      </div>
    </div>
    <div class="select-container">
      <div class="select-item">
        <img src="./../../img/袋装.png">
        <p class="title">仅退款</p>
        <p class="tips">未收到货（包含未签收）或卖家协商同意前提下</p>
      </div>
      <div class="select-item">
        <img src="./../../img/袋装.png">
        <p class="title">退款退货</p>
        <p class="tips">已收到货，需要退换已收到的货物</p>
      </div>
      <div class="select-item">
        <img src="./../../img/袋装.png">
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
  .select-container{
    padding-left: 10px;
    .select-item{
      border-bottom: 1px solid #f6f6f6;
      padding: 10px 40px 10px 30px;
      position: relative;
      &:after{
        content: '';
        width: 16px;
        height: 16px;
        display: block;
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -8px;
        background: url(./../../img/addr-loc.png) no-repeat;
        -webkit-background-size: 16px 16px;
        background-size: 16px 16px;
      }
      img{
        width: 25px;
        height: 25px;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -12px;
      }
      .title{
        
      }
      .tips{

      }
    }
  }
}
</style>
