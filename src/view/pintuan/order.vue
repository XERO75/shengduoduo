<template>
  <div id="pintuan-order">
    <div class="progress-container">
      <van-row type="flex" justify="space-between">
        <van-col span="8">
          <div @click="clickProductIcon">
            <img src="./../../img/选择商品@2x.png">
            <p class="active">选择商品</p>
          </div>
        </van-col>
        <van-col span="8">
          <div @click="clickConfigureIcon">
            <img src="./../../img/送奶配置-红@2x.png">
            <p class="active">送奶配置</p>
          </div>
        </van-col>
        <van-col span="8">
          <div @click="clickAddressIcon">
            <img src="./../../img/填写地址-红@2x.png">
            <p class="active">填写地址</p>
          </div>
        </van-col>
        <van-col span="8">
          <div>
            <img src="./../../img/提交订单-红@2x.png">
            <p class="active">提交订单</p>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="address-container container">
      <p class="title">配送地址</p>
      <div class="address-content">
        <p class="receiver">{{info.memberName}}  {{info.memberPhone}}</p>
        <p class="address">{{info.memberDistrict}}{{info.groupName}}{{info.memberAddress}}{{info.memberRoom}}</p>
      </div>
    </div>
    <div class="product-container container">
      <p class="productStatus title">商品清单<span class="fr">未支付</span></p>
      <div class="product-box">
        <div class="product-content">
          <div class="product-item" v-for="n in productList">
            <img :src="n.image">
            <div class="item-right">
              <div class="item-top">
                <p class="item-name">{{n.productName}}<span>&yen;{{n.price}}</span>
                </p>
              </div>
              <div class="item-bottom clearfloat">
                <span class="item-date fl">配送完结时间：{{n.date}}</span>
                <span class="item-size fr">{{n.totalCount}}{{n.unit}}/每日{{n.number}}{{n.unit}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="total text-right">合计：&nbsp;<span>&yen;{{info.totalPrice}}</span></p>
    </div>
    <div class="other-container container">
      <p class="cycle">配送周期<span>{{info.deliverType}}{{info.halfDateType}}</span></p>
      <p class="points">赠送积分<span>{{info.bonusPoints}}</span></p>
    </div>
    <div class="btn-container">
      <van-button @click="onclickPintuan">立即拼团<!--  &yen; {{info.actualPay}} --></van-button>
    </div>
  </div>
</template>

<script>
import { Toast, Row, Col, Button, Popup, Checkbox } from 'vant';
import { getOrderInfo, createOrder } from "@/api/pintuan";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox,
    [Toast.name]: Toast,
  },
  data(){
    return{
      checked: false,
      info: [],
      productList: [],
      orderSn: '',
    }
  },
  methods: {
    // remove(arr,val) { 
    //   let index = arr.indexOf(val); 
    //   if (index > -1) { 
    //     arr.splice(index, 1); 
    //   } 
    // },
    timestampToDate(timestamp) {
      let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = date.getDate() + ' ';
      return Y+M+D;
    },
    getOrderInfo(){
      let formdata = new FormData();
      console.log(this.$store.state);
      if(this.$store.state.addressId&&this.$store.state.beginDate&&this.$store.state.DeliverType&&this.$store.state.HalfDateType&&this.$store.state.pintuan.number&&this.$store.state.pintuan.produtId){
        formdata.append('addressId',this.$store.state.addressId);
        formdata.append('beginDate',this.$store.state.beginDate);
        formdata.append('deliverType',this.$store.state.DeliverType);
        formdata.append('halfDateType',this.$store.state.HalfDateType);
        formdata.append('number',this.$store.state.pintuan.number);
        formdata.append('produtId',this.$store.state.pintuan.produtId);
        getOrderInfo(formdata).then(res=>{
          console.log(res);
          this.info = res.data.data;
          this.productList = this.info.orderItems;
          this.coupons = this.info.couponRecords;
          this.vouchers = this.info.giftCards;
          if(this.coupons&&this.coupons.length){
            this.hasCoupon = true;
          }else{
            this.hasCoupon = false;
          }
          if(this.vouchers&&this.vouchers.length){
            this.hasVoucher = true;
          }else{
            this.hasVoucher = false;
          }
          for(let i=0;i<this.productList.length;i++) {
            this.productList[i].date = this.timestampToDate(this.productList[i].finishDate);
          }
          console.log(this.productList)
        })
      }else{
        Toast('页面信息已过期，请重新下单');
        this.$router.push({path:'/shop'});
      }
    },
    clickProductIcon(){
      this.$router.push({path:'/pintuan',query:{productId: this.$route.query.productId}});
    },
    clickConfigureIcon(){
      this.$router.push({path:'/pintuan/configure',query:{productId: this.$route.query.productId}});
    },
    clickAddressIcon(){
      this.$router.push({path:'/pintuan/address',query:{productId: this.$route.query.productId}});
    },
    onclickPintuan(){
      let formdata = new FormData();
      formdata.append('addressId',this.$store.state.addressId);
      formdata.append('beginDate',this.$store.state.beginDate);
      formdata.append('deliverType',this.$store.state.DeliverType);
      formdata.append('halfDateType',this.$store.state.HalfDateType);
      formdata.append('deliveryMethod','Multiple');
      formdata.append('number',this.$store.state.pintuan.number);
      formdata.append('produtId',this.$store.state.pintuan.produtId);
      createOrder(formdata).then(res=>{
        if(res.data.code==0){
          this.orderSn = res.data.data;
          this.$router.push({path:'/pintuan/success',query:{sn:this.orderSn}});
        }else{
          Toast(res.data.errmsg);
        }
      })
    },
  },
  mounted(){
    handleLogin();
      this.getOrderInfo();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#pintuan-order{
  background-color: #f6f6f6;
  min-height: 100%;
  position: relative;
  box-sizing: border-box;
  //padding-top: 2.613333rem;
  padding-bottom: 1.306667rem;
  .progress-container{
    width: 100%;
    box-sizing: border-box;
    z-index: 9999;
    background-color: #fff;
    padding: 0.533333rem 0.533333rem;
    border-bottom:0.266667rem solid #f6f6f6;  
    .van-col{
      text-align: center;
      position: relative;
      img{
        width: 1.04rem;
        height: 1.04rem;
      }
      p{
        font-size: 0.293333rem;
        color: #999;
      }
      p.active{
        color: #202020;
      }
    }
    .van-col:after{
      content: '';
      width: 0.906667rem;
      height: 0.013333rem;
      display: block;
      background-color: #eee;
      position: absolute;
      right: -0.44rem;
      top: 37%;
    }
    .van-col:last-child:after{
      width: 0;
    }
  }
  .container {
    border-bottom: 0.266667rem solid #f6f6f6;
    background-color: #fff;
    &:last-child{
      border: 0;
    }
    .title{
      line-height: 1.2rem;
      padding: 0 0.4rem;
      font-weight: bold;
      color: #202020;
      font-size: 0.373333rem;
      border-bottom: 1px solid #f6f6f6;
    }
  }
  .address-container{
    .address-content{
      position: relative;
      .receiver{
        padding: 0.4rem 1.066667rem 0 0.4rem;
        font-weight: bold;
        font-size: 0.4rem;
      }
      .address{
        color: #666;
        font-size: 0.346667rem;
        padding: 0.133333rem 1.066667rem 0.533333rem 0.4rem;
      }
      
    }
  }
  .product-container{
    .product-box{
      padding: 0 0.4rem;
      border-bottom: 1px solid #e5e5e5;
      .product-item{
        position: relative;
        padding: 0.373333rem 0;
        height: 1.52rem;
        border-bottom: 1px solid #e5e5e5;
        &:last-child{
          border-bottom: 0;
        }
        img{
          position: absolute;
          width: 1.52rem;
          height: 1.52rem;
        }
        .item-right{
          padding-left: 1.6rem;
          .item-top{
            font-weight: bold;
            color: #202020;
            font-size: 0.373333rem;
            line-height: 0.746667rem;
            p.item-name{
              padding-right: 2.266667rem;
              padding-bottom: 0.133333rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1; 
              position: relative;
              span{
                position: absolute;
                top: 0;
                right: 0;
              }
            }  
          }
          .item-bottom{
            color: #666;
            font-size: 0.346667rem;
          }
        }
      }
    }
    p.total{
      line-height: 1.2rem;
      font-weight: bold;
      color: #666;
      font-size: 0.346667rem;
      padding-right: 0.4rem;
      span{
        color: #e70012;
        font-size: 0.426667rem; 
      }
    }
  }
  .other-container{
    padding: 0 0.4rem;
    p{
      line-height: 1.2rem;
      border-bottom: 1px solid #e5e5e5;
      font-size: 0.4rem;
      color: #202020;
      font-weight: bold;
      &:last-child{
        border-bottom: 0;
      }
      span{
        font-size: 0.373333rem;
        color: #666;
        float: right;
        font-weight: normal;
      }
      span.select{
        padding-right: 0.4rem;
        position: relative;
        &:after{
          content: '';
          width: 0.2rem;
          height: 0.333333rem;
          display: block;
          background: url(./../../img/go@2x.png) no-repeat;
          -webkit-background-size: 0.2rem 0.333333rem;
          background-size: 0.2rem 0.333333rem;
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -0.133333rem;
        }
      }
    }
  }
  .btn-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    button.van-button {
      height: 1.306667rem;
      width: 100%;
      font-size: 0.4rem;
      margin: 0;
      display: block;
      background-color: #e70012;
      color: #fff;
      padding: 0;
      border: none;
      border-radius: unset;
    }
  }
  .van-popup.pay-popup{
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
        background: url(./../../img/微信支付@2x.png) no-repeat;
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
  .van-popup.coupon-popup{
    width: 100%;
    height: 100%;
    #shop-coupon{
      min-height: 100%;
      background-color: #f6f6f6;
      .coupon-container {
        padding: 0.266667rem 0.4rem 0 0.4rem;
        height: 2.986667rem;
        position: relative;
        i.icon-checkbox{
          width: 0.453333rem;
          height: 0.453333rem;
          background: url(./../../img/配送选择地址二@2x.png) no-repeat;
          -webkit-background-size: 0.453333rem 0.453333rem;
          background-size: 0.453333rem 0.453333rem;
          display: block;
          position: absolute;
          top: 50%;
          left: 0.48rem;
        }
        &.checked{
          i.icon-checkbox{
            background: url(./../../img/配送选择地址@2x.png) no-repeat;
            -webkit-background-size: 0.453333rem 0.453333rem;
            background-size: 0.453333rem 0.453333rem;
          }
        }
        .coupon-box{
          /*width: 100%;*/
          width: 92%;
          float: right;
          height: 100%;
          background: url(./../../img/优惠券@2x.png) no-repeat;
          background-size: 100% 100%;
          .coupon-left {
            width: 70%;
            height: 100%;
            position: relative;
            display: inline-block;
            p.value {
              width: 41%;
              height: 100%;
              line-height: 2.986667rem;
              box-sizing: border-box;
              padding-left: 0.453333rem;
              font-size: 0.933333rem;
              font-weight: bold;
              color: #e70012;
              float: left;
              span{
                font-size: 1.066667rem;
              }
            }
            .coupon-left-left{
              p.name{
                padding: 0.8rem 0 0.133333rem 0;
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
              line-height: 2.986667rem;
            }
          }
        }
      }
      .button-container {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 9999;
        button.van-button {
          height: 1.306667rem;
          width: 50%;
          font-size: 0.4rem;
          margin: 0;
          display: inline-block;
          padding: 0;
          border: none;
          border-radius: unset;
          color: #fff;
        }
        button.btn-addCart {
          background-color: #4c4c4c;
        }
        button.btn-buy {
          position: absolute;
          background-color: #e70012;
        }
        button.btn-back {
          width: 100%;
          background-color: #4c4c4c;
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
  }
  .van-popup.voucher-popup{
    width: 100%;
    height: 100%;
    #shop-voucher{
      min-height: 100%;
      padding-bottom: 1.066667rem;
      box-sizing: border-box;
      background-color: #f6f6f6;
      .card-container{
        height: 3.2rem;
        padding: 0.4rem 0.4rem 0 0.4rem;
        .card-box{
          width: 100%;
          height: 100%;
          // background: url(./../../img/优鲜卡@2x.png) no-repeat;
          background-size: 100%;
          padding: 0.266667rem;
          box-sizing: border-box;
          position: relative;
          border-radius: 0.106667rem;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
          p.money{
            position: absolute;
            font-size: 0.64rem;
            color: #fff;
            span{
              font-size: 0.96rem;
            }
          }
          div.bottom-bar{
            width: 100%;
            height: 0.88rem;
            position: absolute;
            bottom: 0;
            left: 0;
            color: #fff;
            font-size: 0.346667rem;
            line-height: 0.88rem;
            padding: 0 0.266667rem;
            box-sizing: border-box;
            background-color: rgba(20, 20, 20, .4);
          }
          div.bottom-bar.give{
            padding: 0 0.533333rem 0 0.266667rem;
          }
          div.bottom-bar.give:after{
            content: '>';
            width: 0.32rem;
            height: 0.83333rem;
            display: block;
            position: absolute;
            right: 0.16rem;
            bottom: 0.026666rem;
            font-size: 0.52222rem;
            color: #fff;
          }
        }
      }
      .button-container {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 9999;
        button.van-button {
          height: 1.306667rem;
          width: 50%;
          font-size: 0.4rem;
          margin: 0;
          display: inline-block;
          padding: 0;
          border: none;
          border-radius: unset;
          color: #fff;
        }
        button.btn-back {
          width: 100%;
          background-color: #4c4c4c;
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
  }

}
</style>
