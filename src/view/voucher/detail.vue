<template>
  <div id="voucher-detail">
    <div class="largeImg-container">
      <img :src="pic">
    </div>
    <div class="img-box">
      <p class="title">选择卡面</p>
      <div v-for="(n,i) in cards" class="smallImg-container" :class="[i==0?'clicked':'']" @click="changeImg($event,i)">
        <img :src="n">
      </div>
    </div>
    <div class="money-container">
      <p class="title">选择面值</p>
      <div class="exchange" v-for="(n,i) in prices" :key="i">
        <p class="money">&yen; <span>{{n.value}}</span></p>
        <div class="count-box">
          <i v-if="n.count" class="icon-minus" @click="onMinus(i)"></i>
          <span v-if="n.count" class="num">{{n.count}}</span>
          <i class="icon-plus" @click="onPlus(i)"></i>
        </div>
      </div>
    </div>
    <div class="bottom-container">
      <p class="home" @click="onClickHome"><i class="icon-home"></i></p><p class="left">合计：<span>&yen;{{totalPrice}}</span> ({{totalCount}}张卡)</p><p class="right" @click="showPayBox">购买</p>
    </div>
    <van-popup v-model="show">
      <div class="pay-container">
        <p class="box-title">微信支付</p>
        <div class="agreement-container">
            <p class="title">燕塘优鲜达微商城用户使用协议</p>
            <p class="content">1、燕塘优鲜达微商城（以下简称"本平台"）为广东燕塘乳业股份有限公司旗下的电商平台，旨在为您提供更为便捷高效的订奶到家服务。指尖订奶，新鲜送到家。</p>
            <p class="content">2、本平台所有展示商品均为"燕塘"品牌巴氏奶，须冷藏保存，请在保质期前饮用。</p>
            <p class="content">3、本平台所有展示商品均为"燕塘"品牌巴氏奶，须冷藏保存，请在保质期前饮用。</p>
            <p class="content">4、本平台所有展示商品均为"燕塘"品牌巴氏奶，须冷藏保存，请在保质期前饮用。</p>
            <p class="content">5、本平台所有展示商品均为"燕塘"品牌巴氏奶，须冷藏保存，请在保质期前饮用。</p>
        </div>
        <!-- <van-checkbox v-model="checked">我已阅读并同意协议</van-checkbox> -->
        <div data-v-1f1a3456="" class="van-checkbox" @click="checked=!checked">
          <div class="van-checkbox__icon van-checkbox__icon--round">
            <!-- <i class="van-icon van-icon-success"></i> -->
            <i class="van-icon van-icon-success" :class="{noChecked:!checked,hasChecked:checked}"></i>
          </div>
          <span class="van-checkbox__label">我已阅读并同意协议</span>
        </div>
        <van-button class="btn-WXPay" v-if="!checked" style="background-color:#999;" disabled>微信支付</van-button>
        <van-button class="btn-WXPay" v-else @click="buyNow">微信支付</van-button>
      </div>
    </van-popup>
    <div class="mask" v-if="loading">
      <van-loading color="white" />
    </div>
  </div>
</template>

<script>
import { Button, Popup, Checkbox, Toast, Loading } from 'vant';
import { getDetail, buyCard, WXPay } from "@/api/voucher"
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
  },
  data(){
    return{
      pic: '',
      cards: [],
      prices: [],
      clicked: false,
      checked: false,
      show: false,
      loading: false,
      /* 购买字段 */
      image: '',
      id: '',
      /* 微信支付订单 */
      sn: '',
      /* 微信支付配置参数 */
      appId: undefined,
      timeStamp: undefined,
      nonceStr: undefined,
      package: undefined,
      signType: undefined,
      paySign: undefined,
    }
  },
  computed:{
    totalCount(){
      let total = 0;
      for(let i=0;i<this.prices.length;i++) {
        total += this.prices[i].count;
      }
      return total;
    },
    totalPrice(){
      let total = 0;
      for(let i=0;i<this.prices.length;i++) {
        total += this.prices[i].count * Number(this.prices[i].value);
      }
      return total;
    }
  },
  methods: {
    onClickHome(){
      this.$router.push({path:'/shop'});
    },
    onPlus(i){
      if(this.prices[i].count<99){
        this.prices[i].count++;
      }
    },
    onMinus(i){
      if(this.prices[i].count>0){
        this.prices[i].count--;
      }
    },
    showPayBox(){
      console.log(this.totalCount);
      if(this.totalCount!==0){
        this.show = true;
      }else{
        Toast('请选择要购买的优鲜卡');
      }
    },
    buyNow(){
      // this.$router.push({path:'/order/success'});
      if(this.checked){
        this.show = false;
        this.loading = true;
        let formdata = new FormData();
        formdata.append('id',this.id);
        formdata.append('image',this.image);
        formdata.append('json',JSON.stringify(this.prices));
        buyCard(formdata).then(res=>{
          this.sn = res.data.data;
          let formdata2 = new FormData();
          formdata2.append("sn",this.sn);
          WXPay(formdata2).then(res2=>{
            console.log(res2);
            this.appId = res2.data.data.appId;
            this.timeStamp = res2.data.data.timeStamp;
            this.nonceStr = res2.data.data.nonceStr;
            this.package = res2.data.data.package;
            this.signType = res2.data.data.signType;
            this.paySign = res2.data.data.paySign;
            this.pay();
          })
        })
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
      let id = this.$route.query.id;
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
            that.loading = false;
           if(res.err_msg == "get_brand_wcpay_request:ok"){  
              // this.$router.push({path:"/shop/success",query:{orderId:}}); //改为orderId？
              // this.$router.push({path:"/course/success",query:{id:this.$route.query.id}}); 
              // location.href = 'http://dydbuy.cn/wechat/?#/course/success?id='+this.$route.query.id;
              location.href = '?WX_TYPE=OfficialAccount#/voucher/success';
           }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
              Toast("用户取消支付");
           }else{  
              // this.$router.push({path:"/course/error",query:{id:this.$route.query.id}});
              // location.href = 'http://dydbuy.cn/wechat/?#/course/error?id='+this.$route.query.id;
              Toast("支付失败");
           }  
       }); 
    },
    changeImg(event,i){
      this.image = this.cards[i];
      let el = document.getElementsByClassName("clicked")[0];
      el.classList.remove("clicked");
      event.currentTarget.classList.add("clicked");
      this.pic=document.getElementsByClassName("clicked")[0].children[0].src;
    },
  },
  mounted(){
    handleLogin();
      let id = this.$route.query.id;
      getDetail(id).then(res=>{
        console.log(res);
        this.id = res.data.data.content.id;
        this.cards = res.data.data.content.secondLevelImages;
        this.pic = this.cards[0];
        this.prices = res.data.data.price;
        this.image = this.cards[0];
      })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#voucher-detail{
  padding-top: 0.613333rem; 
  padding-bottom: 1.333333rem;
  .van-checkbox{
    margin: 0.4rem 0;
    .van-checkbox__label{
      margin-left: 0.133333rem;
      position: absolute;
      font-size: 0.32rem;
      color: #028bd7;
    }
  }
  .largeImg-container{
    text-align: center;
    img{
      width: 8.346667rem;
      height: 4.0rem;
      border-radius: 0.266667rem;

    }
  }
  .img-box{
    margin: 0 0.72rem;
    p.title{
      padding: 0.533333rem 0.106667rem 0.16rem 0.106667rem;
      font-size: 0.4rem;
      color: #666;
    }
    .smallImg-container{
      width: 2.64rem;
      height: 1.28rem;
      display: inline-block;
      box-sizing: border-box;
      margin: 0.106667rem;
      img{
        width: 100%;
        height: 100%;
        border-radius: 0.133333rem;
        box-sizing: border-box;
      }
    }
    .smallImg-container.clicked img{
      border: 0.026667rem solid #e71002;
    }
  }
  .money-container{
    padding: 0 0.826667rem;
    p.title{
      font-size: 0.4rem;
      color: #666;
      padding: 0.613333rem 0 0.48rem 0;
      border-bottom: 1px solid #e5e5e5;
    }
    div.exchange {
      border-bottom: 1px solid #e5e5e5;
      line-height: 1.333333rem;
      color: #202020;
      position: relative;
      p.money {
        font-size: 0.4rem;
        font-weight: bold;
        span{
          font-size: 0.48rem;
        }
      }
      div.count-box {
        display: inline-block;
        float: right;
        line-height: 0.533333rem;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -0.24rem;
        i.icon-minus{
          width: 0.48rem;
          height: 0.48rem;
          display: inline-block;
          background: url(./../../img/购物车删除@2x.png) no-repeat;
          -webkit-background-size: 0.48rem 0.48rem;
          background-size: 0.48rem 0.48rem;
          border-radius: 0.266667rem;
          margin-right: 0.586667rem;
        }
        i.icon-plus{
          width: 0.48rem;
          height: 0.48rem;
          display: inline-block;
          background: url(./../../img/添加购买@2x.png) no-repeat;
          -webkit-background-size: 0.48rem 0.48rem;
          background-size: 0.48rem 0.48rem;
        }
        span.num {
          position: absolute;
          margin-left: -0.64rem;
          font-size: 0.48rem;
          color: #202020;
          line-height: 0.533333rem;
          text-align: center;
          width: 0.613333rem;
        }
      }
    }
  }
  .bottom-container {
    height: 1.306667rem;
    line-height: 1.306667rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    p.home{
      width: 13%;
      height: 100%;
      display: inline-block;
      background-color: #6a6a6a;
      position: relative;
      vertical-align: top;
      i.icon-home{
        position: absolute;
        width: 0.533333rem;
        height: 0.533333rem;
        background: url(./../../img/返回首页@2x.png) no-repeat;
        -webkit-background-size: 0.533333rem 0.533333rem;
        background-size: 0.533333rem 0.533333rem;
        top: 50%;
        left: 50%;
        margin-top: -0.266667rem;
        margin-left: -0.266667rem;
      }
    }
    p.left {
      width: 47%;
      display: inline-block;
      text-align: center;
      color: #fff;
      height: 100%;
      background-color: #4c4c4c;
      font-size: 0.4rem;
      vertical-align: top;
      span{
        font-size: 0.48rem;
      }
    }
    p.right {
      width: 40%;
      display: inline-block;
      background-color: #e70012;
      color: #fff;
      font-size: 15px;
      font-size: 0.4rem;
      text-align: center;
      vertical-align: top;
      border-bottom: 1px solid #e70012;
    }
  }
  .van-popup{
    width: 85%;
    height: 11.866667rem;
    top: 45%;
    box-sizing: border-box;
    border-radius: 0.186667rem;
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
}
</style>
