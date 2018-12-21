<template>
  <div id="order-detail">
    <HeaderBar title="订单详情" @back="onClickBack" @cart="onClickCart"></HeaderBar>
    <div class="address-container container" @click="onClickAddress">
      <!-- <div class="noAddress"><p>添加收货地址</p></div> -->
      <div class="defalutAddress">
        <p class="receiver">撒旦 135135454 <span>[默认]</span></p>
        <p class="address">按时发发生发发呆</p>
      </div>
    </div>
    <div class="product-container container">
      <p class="productStatus title">荷兰小店<i class="icon-right"></i><span class="fr">待付款</span></p>
      <div class="product-box">
        <img src="./../../pic/box.png">
        <div class="product-item">
          <div class="item-left">
            <p class="item-name">考核会计阿斯加德库巴姬爱神的箭安康市道具卡含
            </p>
            <p class="item-type">交换空间还</p>
          </div><div class="item-right">
            <p class="price">&yen;745</p>
          </div>
        </div>
      </div>
      <div class="product-count">
        <p class="title">购买数量</p>
        <div class="count-box">
          <van-stepper v-model="count" integer :min="1" :max="99" />
        </div>
      </div>
      <div class="product-coupon">
        <p>店铺优惠券<span @click="showGetCoupon=true">领取优惠券</span></p>
      </div>
    </div>
    <div class="pay-container container">
      <p class="title">微信支付</p>
      <div class="content">
        <p class="select" @click="showUseCoupon=true">使用优惠券</p>
        <p class="input">使用e币<input type="number" placeholder="输入使用e币，当前可用780"></p>
        <p class="select" @click="showDelivery=true">配送方式<span>快递 免邮费</span></p>
        <p class="input">买家留言<input type="text" placeholder="填写内容和卖家协商确定"></p>
        <P class="total">共2件商品 合计：<span>&yen; 500</span></P>
      </div>
    </div>
    <div class="btn-container">
      <p class="amount">实付款：<span>&yen; 500</span></p><!-- <p class="btn-cancel" @click="cancelOrder">取消</p> --><p class="btn-pay" @click="onClickToPay">立即支付</p>
    </div>
    <!-- 领取商家优惠券弹出层 -->
    <van-popup class="getCoupon-popup" position="bottom" v-model="showGetCoupon">
      <div class="popup-box">
        <p class="title f-center">荷兰小店<img mode="widthFix" class="icon-close" src="../../image/close.png" @click="showGetCoupon=false"/></p>
        <div class="content">
          <div class="coupon-container f-vertical">
            <img mode="widthFix" src="../../image/券@2x.png"/>
            <div class="coupon-left f-column f-center">
              <div class="price f-vertical"><p style="font-size:24px; margin-top:8px;">&yen;&nbsp;</p><p>5</p></div>
              <p class="tips">满100可用</p>
            </div>
            <div class="coupon-right f-column">
              <p class="name">爱仕达东方</p>
              <p class="date">有效期 2018.09.01-2018.09.01</p>
              <span class="btn-get f-center">立即领取</span>
            </div>
          </div>
          <div class="coupon-container f-vertical">
            <img mode="widthFix" src="../../image/券-已领取@2x.png"/>
            <div class="coupon-left f-column f-center">
              <div class="price f-vertical"><p style="font-size:24px; margin-top:8px;">&yen;&nbsp;</p><p>5</p></div>
              <p class="tips">满100可用</p>
            </div>
            <div class="coupon-right f-column">
              <p class="name">爱仕达东方</p>
              <p class="date">有效期 2018.09.01-2018.09.01</p>
              <span class="btn-got f-center">已领取</span>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 配送方式弹出层 -->
    <van-popup class="delivery-popup" position="bottom" v-model="showDelivery">
      <div class="popup-box">
        <p class="title f-center">配送方式</p>
        <div class="content">
          <div class="delivery-item f-space-between">
            <p class="type">快递 免运费</p>
            <img v-if="true" mode="widthFix" src="../../image/选择@2x.png"/>
            <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
          </div>
          <div class="delivery-item f-space-between">
            <p class="type">圆碗快递 5元</p>
            <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
            <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
          </div>
          <div class="delivery-item f-space-between">
            <p class="type">顺便快递 10元</p>
            <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
            <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
          </div>
        </div>
        <van-button @click="showDelivery=false">关闭</van-button>
      </div>
    </van-popup>
    <!-- 使用优惠券弹出层 -->
    <van-popup class="useCoupon-popup" position="bottom" v-model="showUseCoupon">
      <div class="popup-box">
        <p class="title f-center">优惠券</p>
        <div class="content">
          <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">满100减5</p>
              <p class="name">店铺优惠券</p>
            </div>
            <div>
              <img v-if="!checked" mode="widthFix" src="../../image/选择@2x.png" @click="checked = !checked"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png" @click="checked = !checked"/>
            </div>
          </div>

           <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">满100减5</p>
              <p class="name">店铺优惠券</p>
            </div>
            <div>
              <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
            </div>
          </div>
        </div>
        <van-button @click="showUseCoupon=false">确定</van-button>
      </div>
    </van-popup>

    <div class="mask" v-if="loading">
      <van-loading color="white" />
    </div>
  </div>
</template>

<script>
import { Toast, Stepper, Dialog, Popup, Button, Checkbox, Loading } from 'vant';
import HeaderBar from '@/components/HeaderBar';
// import headerBar from '../../components/headerBar/index'
// import { getDetail, cancelOrder, getComment, handleCommit } from "@/api/order";
// import { handleLogin } from "@/api/login";
// import { WXPay, payFree } from "@/api/pay";
export default {
  components: {
    [Toast.name]: Toast,
    [Stepper.name]: Stepper,
    [Dialog.name]: Dialog,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Loading.name]: Loading,
    HeaderBar
  },
  data(){
    return{
      showDelivery: false, // 配送方式弹出层 开关
      showUseCoupon: false, // 使用优惠券 开关
      showGetCoupon: false, // 领取商家优惠券 开关
      count: 1,

      checked: false,
      show: false,
      show1: false,
      show2: false,
      loading: false,
      starCount: 5,

      info: [],
      phones: [],
      calls: [],

      //取消订单
      resason: '',

      /* 微信支付配置参数 */
      appId: undefined,
      timeStamp: undefined,
      nonceStr: undefined,
      package: undefined,
      signType: undefined,
      paySign: undefined,

      /* 评价 */
      AllTags: [],
      comment: '',
      view: '',
      views: ['非常不满意，各方面都很差','不满意，比较差','一般，还需改善','比较满意，仍可改善','非常满意，无可挑剔'],
    }
  },
  computed: {
    phoneCall(){
      return 'tel:' + this.info.memberPhone;
    }
  },
  methods: {
    onClickBack() {
      this.$router.go(-1);
    },
    onClickCart() {
      this.$router.push({path:'/cart'});
    },
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
    onClickAddress(){
      this.$router.push({path:'/address'});
    },
    onClickToPay(){
      this.$router.push({path:'/order/info'});
    },

    onClickTag(event) {
      let currentTag = event.currentTarget;
      if(currentTag.classList.contains("active")){
        currentTag.classList.remove("active");
      }else{
        currentTag.classList.add("active");
      }
    },
    showCommentBox(){
      this.show2 = true;
      getComment().then(res=>{
        // console.log(res);
        this.AllTags = res.data.data;
      })
    },
    changeStar(){
      // console.log(this.starCount);
      if(this.starCount>=1){
        this.view = this.views[this.starCount-1];
        console.log(this.starCount);
        console.log(this.view);
      }
      let checkedTags = document.querySelectorAll('.view-tab.active');
      for(let i=0;i<checkedTags.length;i++) {
        checkedTags[i].classList.remove('active');
      }
      checkedTags[0].classList.add('active');
    },
    handleCommit(){
      this.show2 = false;
      if(!this.loading){
        this.loading = true;
        let checkedTags = document.querySelectorAll('.view-tab.active');
        let tags = [];
        for(let i=0;i<checkedTags.length;i++) {
          tags.push(checkedTags[i].innerText);
        }
        if(tags.length){
          let formdata = new FormData();
          formdata.append('sn',this.$route.query.sn);
          formdata.append('star',this.starCount);
          formdata.append('tags',tags);
          formdata.append('comment',this.comment);
          handleCommit(formdata).then(res=>{
            this.loading = false;
            // console.log(res)
            if(res.data.code==0){
              Toast('评价成功');
              window.reload();
            }else{
              Toast(res.data.errmsg);
            }
          })
        }else{
          Toast('请选择至少一条评语');
        }
      }
    },
    payNow(sn){
      if(this.checked){
        this.show = false;
        this.loading = true;
        let formdata = new FormData();
        formdata.append('sn',sn);
        if(Number(this.info.actualPay)==0){
          payFree(formdata).then(res=>{
            if(res.data.code==0){
              window.reload();
            }else{
              Toast("支付失败");
              window.reload();
              // location.href = '?WX_TYPE=OfficialAccount#/order';
            }
          })
        }else{
          WXPay(formdata).then(res=>{
            this.appId = res.data.data.appId;
            this.timeStamp = res.data.data.timeStamp;
            this.nonceStr = res.data.data.nonceStr;
            this.package = res.data.data.package;
            this.signType = res.data.data.signType;
            this.paySign = res.data.data.paySign;
            this.pay();
          })
        }
      }else{
        Toast('请阅读并同意协议');
      }
    },
    pay() {
      if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if (document.attachEvent){
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      }else{
        this.onBridgeReady();
      }
    },
    onBridgeReady(){
      let that = this;
      let sn = this.$route.query.sn;
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId" : this.appId,     //公众号名称，由商户传入
            "timeStamp": this.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr" : this.nonceStr, //随机串
            "package" : this.package,
            "signType" : "MD5",         //微信签名方式:
            "paySign" : this.paySign    //微信签名
        },
        function(res){
          // that.loading = false;
         if(res.err_msg == "get_brand_wcpay_request:ok"){
            // this.$router.push({path:"/course/success",query:{id:this.$route.query.id}});
            // location.href = 'http://dydbuy.cn/wechat/?#/course/success?id='+this.$route.query.id;

            that.timer = setTimeout(function(){
              that.loading = false;
              location.href = '?WX_TYPE=OfficialAccount#/order/success?sn='+ sn;
            }, 1000);
            // location.href = '?WX_TYPE=OfficialAccount#/order/success?sn='+ sn;
         }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
            that.loading = false;
            Toast("用户取消支付");
         }else{
            that.loading = false;
            Toast("支付失败");
         }
       });
    },
  },
  mounted(){

  },
  beforeDestroy(){
    if(this.timer){
      clearTimeout(this.timer);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#order-detail{
  background-color: #f6f6f6;
  min-height: 100%;
  padding-bottom: 50px;
  position: relative;
  padding-top: .6rem;
  box-sizing: border-box;
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
  .address-container{
    position: relative;
    padding: 0;
    div.noAddress{
      p{
        line-height: 2.426667rem;
        padding-left: 1.066667rem;
        font-size: 0.426667rem;
        color: #2d2d2d;
        font-weight: bold;
        position: relative;
        &:before{
          content: '';
          width: 0.52rem;
          height: 0.52rem;
          display: block;
          background: url(./../../image/添加地址@2x.png) no-repeat;
          -webkit-background-size: 0.52rem 0.52rem;
          background-size: 0.52rem 0.52rem;
          position: absolute;
          top: 50%;
          margin-top: -0.266667rem;
          left: 0.4rem;
        }
      }
    }
    div.defalutAddress{
      padding: 0.6rem 0.4rem;
      &:after{
        content: '';
        width: 0.133333rem;
        height: 0.24rem;
        display: block;
        background: url(./../../image/MORE@2x.png) no-repeat;
        -webkit-background-size: 0.133333rem 0.24rem;
        background-size: 0.133333rem 0.24rem;
        position: absolute;
        top: 50%;
        margin-top: -0.12rem;
        right: 0.4rem;
      }
      p.receiver{
        font-size: 0.426667rem;
        font-weight: bold;
        color: #2d2d2d;
        span{
          font-size: 0.293333rem;
          color: #e64a19;
          line-height: 0.56rem;
          vertical-align: top;
        }
      }
      p.address{
        padding-top: 0.266667rem;
        font-size: 0.373333rem;
        color: #666;
      }
    }
  }
  .product-container{
    .productStatus{
      padding-left: 0.533333rem;
      position: relative;
      &:before{
        content: '';
        width: 0.4rem;
        height: 0.346667rem;
        display: inline-block;
        background: url(./../../image/订单详情-小店@2x.png) no-repeat;
        -webkit-background-size: 0.4rem 0.346667rem;
        background-size: 0.4rem 0.346667rem;
        position: absolute;
        top: 50%;
        margin-top: -0.173333rem;
        left: 0;
      }
      i.icon-right{
        width: 0.133333rem;
        height: 0.24rem;
        display: inline-block;
        background: url(./../../image/订单相情，查看小店@2x.png) no-repeat;
        -webkit-background-size: 0.133333rem 0.24rem;
        background-size: 0.133333rem 0.24rem;
        margin-left: 0.133333rem;
        vertical-align: middle;
      }
      span{
        color: #e64a19;
        font-size: 0.32rem;
        font-weight: normal;
      }
    }
    .product-box{
      height: 2.933333rem;
      padding: 0.373333rem 0;
      box-sizing: border-box;
      position: relative;
      border-bottom: 1px solid #f6f6f6;
      img{
        position: absolute;
        width: 2.0rem;
        height: 2.0rem;
      }
      .product-item{
        padding-left: 2.48rem;
        height: 1.52rem;
        &:last-child{
          border-bottom: 0;
        }
        .item-left{
          width: 75%;
          display: inline-block;
          .item-name{
            padding-top: 0.106667rem;
            font-size: 0.4rem;
            color: #2d2d2d;
          }
          .item-type{
            padding-top: 0.106667rem;
            font-size: 0.373333rem;
            color: #999;
          }
        }
        .item-right{
          vertical-align: top;
          width: 25%;
          display: inline-block;
          p{
            font-size: 0.4rem;
            font-weight: bold;
            color: #e64a19;
            text-align: right;
          }
        }
      }
    }
    .product-count{
      position: relative;
      height: 1.466667rem;
      p.title{
        font-size: 0.4rem;
        font-weight: normal;
        color: #2d2d2d;
        line-height: 1.466667rem;
      }
      div.count-box {
        display: inline-block;
        float: right;
        line-height: 0.533333rem;
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        .van-stepper{
          margin-top: 0.346667rem;
        }
      }
    }
    .product-coupon{
      position: relative;
      height: 1.466667rem;
      &:after{
        content: '';
        width: 0.133333rem;
        height: 0.24rem;
        display: block;
        background: url(./../../image/MORE@2x.png) no-repeat;
        -webkit-background-size: 0.133333rem 0.24rem;
        background-size: 0.133333rem 0.24rem;
        position: absolute;
        top: 50%;
        margin-top: -0.12rem;
        right: 0;
      }
      p{
        font-size: 0.4rem;
        color: #2d2d2d;
        line-height: 1.466667rem;
        span{
          font-size: 0.373333rem;
          color: #e64a19;
          float: right;
          padding-right: 0.4rem;
        }
      }
    }
  }
  .pay-container{
    padding: 0;
    border-bottom: 10px solid #f6f6f6;
    p.title{
      padding-left: 1.066667rem;
      position: relative;
      &:before{
        content: '';
        width: 0.533333rem;
        height: 0.466667rem;
        display: block;
        background: url(./../../image/微信支付@2x.png) no-repeat;
        -webkit-background-size: 0.533333rem 0.466667rem;
        background-size: 0.533333rem 0.466667rem;
        position: absolute;
        top: 50%;
        margin-top: -0.226667rem;
        left: 0.4rem;
      }
    }
    div.content{
      padding-left: 0.4rem;
      p{
        padding-right: 0.4rem;
        line-height: 1.2rem;
        border-bottom: 1px solid #f6f6f6;
        font-size: 0.4rem;
        color: #2d2d2d;
        &.select{
          position: relative;
          &:after{
            content: '';
            width: 0.133333rem;
            height: 0.24rem;
            display: block;
            background: url(./../../image/MORE@2x.png) no-repeat;
            -webkit-background-size: 0.133333rem 0.24rem;
            background-size: 0.133333rem 0.24rem;
            position: absolute;
            right: 0.4rem;
            top: 50%;
            margin-top: -0.12rem;
          }
          span{
            padding-left: 37px;
            color: #666;
          }
        }
        &.input{
          position: relative;
          input{
            border: 0;
            padding-left: 95px;
            padding-right: 15px;
            width: 100%;
            display: inline-block;
            left: 0;
            position: absolute;
            box-sizing: border-box;
            background: transparent;
          }
        }
        &.total{
          font-size: 0.32rem;
          text-align: right;
          span{
            font-size: 0.4rem;
            font-weight: bold;
            color: #e64a19;
          }
        }
      }
    }
  }
  .btn-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.306667rem;
    p.amount{
      width: 60%;
      height: 100%;
      padding-left: 0.4rem;
      display: inline-block;
      line-height: 1.306667rem;
      font-size: 0.346667rem;
      background-color: #fff;
      color: #2d2d2d;
      border-top: 1px solid #f6f6f6;
      box-sizing: border-box;
      span{
        font-size: 0.48rem;
        color: #e64a19;
        font-weight: bold;
      }
    }
    /*p.btn-cancel{
      width: 30%;
      height: 100%;
      line-height: 1.306667rem;
      text-align: center;
      display: inline-block;
      color: #fff;
      background-color: #c7c7c7;
    }*/
    p.btn-pay{
      width: 40%;
      height: 100%;
      font-size: 0.4rem;
      line-height: 1.306667rem;
      text-align: center;
      display: inline-block;
      color: #fff;
      background-color: #e64a19;
    }
  }
  .popup-box{
    height: 343px;
    background: #f6f6f6;
    .title{
      border-bottom: 1px solid #eee;
      position: relative;
      height: 1.333333rem;
      font-size: .426667rem;
      font-weight: bold;
      color: #2e2d2d;
      .icon-close{
        width: 20px;
        height: auto;
        position: absolute;
        right: 15px;
        top: 29%;
        // background: url(./../../image/MORE@2x.png) no-repeat;
        // background: url(./../../image/A9@2x.png) no-repeat;
      }
    }
    .content{
      margin: 0 15px;
      // 弹出层优惠券主体
      .coupon-container{
        position: relative;
        min-height: 96px;
        margin-top: 15px;
        // font-family: 'PingFangBold'
        img{
          width: 100%;
          position: absolute;
          z-index: 1;
        }
        .price{
          font-weight: bold;
          font-size: .96rem;
          color: #fff;
        }
        .tips{
          @extend .price;
          font-size: .346667rem;
        }
        .coupon-left{
          min-width: 35.6%;
          max-width: 35.6%;
          z-index: 2;
        }
        .coupon-right{
          margin-left: .506667rem;
          min-width: 58.8%;
          max-width: 58.8%;
          z-index: 2;
        }
        .name{
          font-size: .4rem;
          font-weight: bold;
          color: #2e2d2d;
        }
        .date{
          margin-top: .24rem;
          font-size: .32rem;
          color: #666;
        }
        .btn-got{
          margin-top: .266667rem;
          height: .613333rem;
          width: 1.893333rem;
          border-radius: .306667rem;
          color: #999;
          font-size: .293333rem;
          border: 1px solid #dcdcdc;
          position: relative;
          left: 60%;
        }
        .btn-get{
          @extend .btn-got;
          border: none;
          background-color: #e64a19;
          color: #fffeff;
        }
      }
      // 配送方式样式
      .delivery-item{
        height: 1.333333rem;
        border-bottom: 1px solid #eee;
        img{
          width: .533333rem;
          height: auto;
        }
        .type{
          font-size: .4rem;
          color: #2e2d2d;
        }
      }
      // 选择优惠券的优惠券样式
      div.coupon{
        position: relative;
        height: 1.733333rem;
        border-bottom: 1px solid #eee;
        p.value{
          font-size: .4rem;
          color: #2e2d2d;
        }
        p.name{
          margin-top: .186667rem;
          font-size: .32rem;
          color: #666;
        }
        img{
          width: .533333rem;
          height: auto;
        }
      }
    }
    button{
      width: 90%;
      height: 44px;
      margin: 0 auto;
      border: 0;
      background-color: #e64a19;
      color: #fff;
      border-radius: 22px;
      position: absolute;
      left: 50%;
      transform: translate(-50%,0);
      bottom: 15px;
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
