<template>
  <div id="order-info" class="orderinfo">
    <!-- <HeaderBar title="订单详情" @back="onClickBack" @cart="onClickCart"></HeaderBar> -->
    <!-- 等待商家付款倒计时部分 -->
    <div class="orderinfo-second">
      <div class="orderinfo-second-content f-space-between">
        <div class="orderinfo-second-text f-column">
          <p>{{info.orderStatus}}</p>
          <p>剩23小时59分自动关闭</p>
        </div>
        <img class="orderinfo-second-pic" mode="widthFix" src="../../image/待付款@2x.png"/>
      </div>
      <img class="orderinfo-second-bg" mode="widthFix" src="../../image/顶部背景@2x.png"/>
    </div>
    <!-- 用户地址部分 -->
    <div class="orderinfo-third f-vertical">
      <img mode="widthFix" src="../../image/地址-@2x.png"/>
      <div class="orderinfo-third-text f-column">
        <p>{{info.contact}}&nbsp;&nbsp;&nbsp;{{info.phone}}</p>
        <p>{{info.area}}{{info.specificAddress}}</p>
      </div>
    </div>
    <!-- 商家、商品、各种数据部分 -->
    <div class="orderinfo-fourth f-column">
      <!-- 商户名 -->
      <div class="orderinfo-fourth-bname f-vertical">
        <img mode="widthFix" src="../../image/订单详情-小店@2x.png"/>
        <p>{{info.shopName}}</p>
      </div>
      <!-- 商品 -->
      <div class="f-column">
        <div v-for="(item, index) in info.items" :key="index" class="orderinfo-fourth-prod f-space-between">
          <img mode="widthFix" :src="item.image"/>
          <div class="prod-text">
            <p class="overTwoLine">{{item.productName}}</p>
            <p>{{item.specifications}}</p>
          </div>
          <div class="prod-price">
            <p>&yen; {{item.price}}</p>
            <p>&times;{{item.count}}</p>
          </div>
        </div>
      </div>
      <!-- 数据详情 -->
      <div class="orderinfo-fourth-detail f-column f-space-around">
        <div class="f-space-between"><p>商品总价</p><p>&yen;{{info.totalFee}}</p></div>
        <div class="f-space-between"><p>运费</p><p>&yen;{{info.postage}}</p></div>
        <div class="f-space-between"><p>优惠券</p><p>{{info.discount}}</p></div>
        <div class="f-space-between"><p>使用e币</p><p>{{info.ecoin}}</p></div>
        <div class="f-space-between"><p>买家留言</p><p>{{info.remark}}</p></div> <!-- 此处以后必有坑 -->
      </div>
      <!-- 需付款 -->
      <div class="orderinfo-fourth-needpay f-space-between">
        <p>需付款</p>
        <p>&yen;{{info.actualPay}}</p>
      </div>
    </div>
    <!-- 取消订单、立即支付 -->
    <div class="orderinfo-fifth f-space-between">
      <div class="orderinfo-fifth-text f-vertical"><p>付款:&nbsp;</p><p>&yen;{{info.actualPay}}</p></div>
      <div class="orderinfo-fifth-btn f-vertical"><span class="f-center">取消订单</span><span class="f-center">立即支付</span></div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import HeaderBar from '@/components/HeaderBar';
import { ordersDetail } from '@/api/order'

export default {
  components: {
    HeaderBar,
    [Toast.name]: Toast
  },

  data() {
    return{
      sn: null,
      info: {}
    }
  },

  methods: {
    // HeadBar按钮函数
    onClickBack() {
      this.$router.go(-1);
    },
    onClickCart() {
      this.$router.push({path:'/cart'});
    },
    // 订单详情
    async ordersDetail() {
      let sn = this.sn
      let that = this
      await ordersDetail(sn).then(res => {
        if (res.data.code === 0) {
          that.info = res.data.data
        } else {
          Toast(res.data.errmsg)
        }
      })
    }
  },

  mounted() {
    if (this.$route.query.sn) {
      this.sn = this.$route.query.sn
      this.ordersDetail()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.orderinfo{
  background-color: #f6f6f6;
  min-height: 100%;
  padding-bottom: 50px;
  position: relative;
  // padding-top: 1.2rem;
  box-sizing: border-box;
}
// 第二部分(等待卖家付款倒计时)
.orderinfo-second{
  width: 100%;
  position: relative;
  &-bg{
    width: 100%;
    height: auto;
  }
  &-content{
    height: 100%;
    width: 100%;
    position: absolute;
  }
  &-text{
    margin-left: 1.12rem;
    font-size: .426667rem;
    color: #fff;
    p:nth-child(1){
      font-weight: bold;
    }
    p:nth-child(2){
      margin-top: .133333rem;
      font-size: .346667rem;
    }
  }
  &-pic{
    margin-right: .96rem;
    width: 1.333333rem;
    height: auto;
  }
}
// 第三部分(地址)
.orderinfo-third{
  height: 2.106667rem;
  background: #fff;
  img{
    margin-left: .32rem;
    width: 1.066667rem;
    height: auto;
  }
  &-text{
    margin-left: .24rem;
    font-size: .426667rem;
    color: #2e2d2d;
    p:nth-child(1){
      font-weight: bold;
    }
    p:nth-child(2){
      margin-top: .24rem;
      font-size: .373333rem;
      color: #666;
    }
  }
}
// 第四部分(商家、商品部分)
.orderinfo-fourth{
  margin-top:.266667rem;
  background: #fff;
  &-bname{
    margin-left: .4rem;
    height: 1.066667rem;
    border-bottom: 1px solid #eee;
    img{
      width: .533333rem;
      height: auto;
    }
    p{
      margin-left: .2rem;
      font-size: .32rem;
      color: #2e2d2d;
      position: relative;
    }
    p:after{
      content: "";
      width: .186667rem;
      height: .186667rem;
      transform: rotate(45deg);
      border-top: 1px solid #2e2d2d;
      border-right: 1px solid #2e2d2d;
      position: absolute;
      top: 30%;
      right: -58%;
    }
  }
  &-prod{
    margin-left: .4rem;
    border-bottom: 1px solid #eee;
    height: 2.933333rem;
    img{
      width: 2rem;
      height: 2rem;
    }
    .prod-text{
      margin-left: .4rem;
      max-width: 53%;
      min-width: 53%;
      font-size: .4rem;
      color: #2e2e2d;
      p:nth-child(2){
        margin-top: .133333rem;
        font-size: .373333rem;
        color: #666;
      }
    }
    .prod-price{
      min-width: 14.5%;
      font-size: .4rem;
      color: #999;
      text-align: right;
      padding-right: .4rem;
      p{
        margin-top: .32rem;
      }
      p:nth-child(1){
        margin: 0;
        color: #8FC221;
        font-weight: bold;
      }
    }
  }
  &-detail{
    margin-left: .4rem;
    border-bottom: 1px solid #eee;
    height: 4.666667rem;
    div{
      font-size: .373333rem;
      color: #666;
      p:nth-child(2){
        margin-right: .4rem;
        color: #2e2d2d;
      }
    }
  }
  &-needpay{
    margin-left: .4rem;
    height: 1.2rem;
    font-size: .373333rem;
    color: #333;
    p:nth-child(2){
      color: #8FC221;
      font-size: .4rem;
      margin-right: .4rem;
    }
  }
}
// 第五部分(付款按钮)
.orderinfo-fifth{
  height: 1.306667rem;
  margin-top: .4rem;
  background: #fff;
  &-text{
    margin-left: .4rem;
    font-size: .373333rem;
    color: #2e2e2d;
    p:nth-child(2){
      font-size: .48rem;
      color: #8FC221;
    }
  }
  &-btn{
    margin-right: .4rem;
    font-size: .346667rem;
    color: #fff;
    span{
      border-radius: .386667rem;
      background: #8FC221;
      margin-left: .16rem;
      width: 2.133333rem;
      height: .773333rem;
    }
    span:nth-child(1){
      border: 1px solid #c9c9c9;
      background: #fff;
      color: #2e2e2d;
    }
  }
}
</style>
