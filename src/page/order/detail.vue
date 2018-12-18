<template>
  <div id="order-detail">
    <div class="address-container container" @click="onClickAddress">
      <!-- <div><p class="noAddress">添加收货地址</p></div> -->
      <div class="defalutAddress">
        <p class="receiver">撒旦 135135454 <span>[默认]</span></p>
        <p class="address">按时发发生发发呆</p>
      </div>
    </div>
    <div class="product-container container">
      <p class="productStatus title">荷兰阿卡就是点击<img src="./../../pic/top@2x.png"><span class="fr">待支付</span></p>
      <div class="product-box">
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
      <p class="amount">实付金额：&yen; 500</p><p class="btn-cancel" @click="cancelOrder">取消</p><p class="btn-pay" @click="onClickToPay">立即支付</p>
    </div>
    <van-popup class="getCoupon-popup" position="bottom" v-model="showGetCoupon">
      <div class="popup-box">
        <p class="title">河南小店<i class="icon-close" @click="showGetCoupon=false"></i></p>
        <div class="content">
          <div class="coupon-container">
            <div class="coupon-left">
              <p class="price">&yen; 5</p>
              <p class="tips">满100可用</p>
            </div>
            <div class="coupon-right">
              <p class="name">爱仕达东方</p>
              <p class="date">有效期 2018.09.01-2018.09.01-</p>
              <span class="btn-get">立即领取</span>
            </div>
          </div>
          <div class="coupon-container">
            <div class="coupon-left">
              <p class="price">&yen; 5</p>
              <p class="tips">满100可用</p>
            </div>
            <div class="coupon-right">
              <p class="name">爱仕达东方</p>
              <p class="date">有效期 2018.09.01-2018.09.01-</p>
              <span class="btn-got">已领取</span>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup class="delivery-popup" position="bottom" v-model="showDelivery">
      <div class="popup-box">
        <p class="title">配送方式</p>
        <div class="content">
          <p class="type checked">快递 免运费</p>
          <p class="type">顺便快递 10元</p>
          <p class="type">大碗快递 100元</p>
        </div>
        <van-button @click="showDelivery=false">关闭</van-button>
      </div>
    </van-popup>
    <van-popup class="useCoupon-popup" position="bottom" v-model="showUseCoupon">
      <div class="popup-box">
        <p class="title">优惠券</p>
        <div class="content">
          <div class="coupon checked">
            <p class="value">满100减5</p>
            <p class="name">店铺优惠券</p>
          </div>
          <div class="coupon">
            <p class="value">满100减15</p>
            <p class="name">店铺优惠券</p>
          </div>
          <div class="coupon">
            <p class="value">满100减50</p>
            <p class="name">店铺优惠券</p>
          </div>
        </div>
        <van-button @click="showUseCoupon=false">确定</van-button>
      </div>
    </van-popup>


    <!-- 
    <van-popup class="popup-pay" v-model="show">
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
        <van-checkbox v-model="checked">我已阅读并同意协议</van-checkbox>
        <div class="van-checkbox">
          <div class="van-checkbox__icon van-checkbox__icon--round" @click="checked=!checked">
            <i class="van-icon van-icon-success"></i>
            <i class="van-icon van-icon-success" :class="{noChecked:!checked,hasChecked:checked}"></i>
          </div>
          <span class="van-checkbox__label">我已阅读并同意协议</span>
        </div>
        <van-button class="btn-WXPay" v-if="!checked" style="background-color:#999;" disabled>微信支付</van-button>
        <van-button class="btn-WXPay" v-else @click="payNow(info.sn)">微信支付</van-button>
      </div>
    </van-popup>
    <van-popup class="popup-cancel" v-model="show1">
      <p>取消原因</p>
      <input type="text" placeholder="请填写订单的取消原因">
      <textarea v-model="resason" placeholder="请填写订单的取消原因"></textarea>
      <div class="popup-btn-container">
        <van-row gutter="15">
          <van-col span="12">
            <van-button class="cancel-btn" @click="show1=false">取消</van-button>   
          </van-col>
          <van-col span="12">
            <van-button class="submit-btn" type="danger" @click="cancelOrder">提交</van-button>
          </van-col>
        </van-row>
      </div>
    </van-popup>
    <van-actionsheet v-model="show2" title="评价">
      <p class="view">"{{view}}"</p>
      <van-rate
        v-model="starCount"
        :size="27"
        :count="5"
        @change="changeStar"
        color="#e70012"
        void-color="#e5e5e5"
      />
      <div class="view-tabs">
        <span v-for="(n,i) in AllTags[starCount-1]" class="view-tab" :class="{'active':i==0}" @click="onClickTag">{{n}}</span>
        <div style="margin:0.133333rem;margin-top:0.266667rem">
          <textarea placeholder="我还有其他话要说" v-model="comment"></textarea>
          <van-button class="btn-view" @click="handleCommit">匿名提交</van-button>
        </div>
      </div>
    </van-actionsheet>
    <div class="mask" v-if="loading">
      <van-loading color="white" />
    </div> -->
  </div>
</template>

<script>
import { Toast, Stepper, Dialog, Popup, Button, Checkbox, Loading } from 'vant';
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
  },
  data(){
    return{
      showDelivery: false,
      showUseCoupon: false,
      showGetCoupon: false,
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
    padding: 0 10px;
    position: relative;
    &:after{
      content: '';
      width: 15px;
      height: 15px;
      display: block;
      background: url(./../../img/新增地址.png) no-repeat;
      -webkit-background-size: 15px 15px;
      background-size: 15px 15px;
      position: absolute;
      top: 50%;
      margin-top: -7px;
      right: 10px;
    }
    p.noAddress{
      line-height: 2.0rem;
      padding-left: 20px;
      position: relative;
      &:before{
        content: '';
        width: 15px;
        height: 15px;
        display: block;
        background: url(./../../img/新增地址.png) no-repeat;
        -webkit-background-size: 15px 15px;
        background-size: 15px 15px;
        position: absolute;
        top: 50%;
        margin-top: -7px;
        left: 0;
      }
    }
    div.defalutAddress{
      padding: 20px 0;
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
    .product-count{
      position: relative;
      height: 1.466667rem;
      p.title{
        font-size: 0.346667rem;
        color: #666;
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
        width: 15px;
        height: 15px;
        display: block;
        background: url(./../../img/新增地址.png) no-repeat;
        -webkit-background-size: 15px 15px;
        background-size: 15px 15px;
        position: absolute;
        top: 50%;
        margin-top: -7px;
        right: 0;
      }
      p{
        font-size: 0.346667rem;
        color: #666;
        line-height: 1.466667rem;
        span{
          float: right;
          padding-right: 20px;
        }
      }
    }
  }
  .pay-container{
    padding: 0;
    border-bottom: 10px solid #f6f6f6;
    p.title{
      padding-left: 35px;
      position: relative;
      &:before{
        content: '';
        width: 15px;
        height: 15px;
        display: block;
        background: url(./../../pic/edit.png) no-repeat;
        -webkit-background-size: 15px 15px;
        background-size: 15px 15px;
        position: absolute;
        top: 50%;
        margin-top: -7px;
        left: 15px;
      }
    }
    div.content{
      padding-left: 0.4rem; 
      p{
        padding-right: 0.4rem;
        line-height: 1.2rem;
        border-bottom: 1px solid #f6f6f6;
        font-size: 0.4rem;
        color: #202020;
        &.select{
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
            right: 0.4rem;
            top: 50%;
            margin-top: -0.133333rem;
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
          text-align: right;
        }
      }
    }
  }
  .btn-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    p.amount{
      width: 40%;
      height: 100%;
      text-align: center;
      display: inline-block;
      line-height: 50px;
      background-color: #fff;
      border-top: 1px solid #f6f6f6;
      box-sizing: border-box;
      span{

      }
    }
    p.btn-cancel{
      width: 30%;
      height: 100%;
      line-height: 50px;
      text-align: center;
      display: inline-block;
      color: #fff;
      background-color: #c7c7c7;
    }
    p.btn-pay{
      width: 30%;
      height: 100%;
      line-height: 50px;
      text-align: center;
      display: inline-block;
      color: #fff;
      background-color: #e64a19;
    }
  }
  .popup-box{
    height: 290px;
    .title{
      text-align: center;
      line-height: 40px;
      border-bottom: 1px solid #f6f6f6;
      position: relative;
      i.icon-close{
        content: '';
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        right: 15px;
        top: 50%;
        margin-top: -7px;
        background: url(./../../img/购物车删除.png) no-repeat;
      }
    }
    .content{
      padding-left: 15px;
      p.type{
        line-height: 40px;
        position: relative;
        border-bottom: 1px solid #f6f6f6;
        &:after{
          content: '';
          width: 17px;
          height: 17px;
          display: block;
          background: url(./../../img/配送选择地址二@2x.png) no-repeat;
          -webkit-background-size: 17px 17px;
          background-size: 17px 17px;
          position: absolute;
          top: 50%;
          margin-top: -9px;
          right: 15px;
        }
        &.checked:after{
          content: '';
          width: 17px;
          height: 17px;
          display: block;
          background: url(./../../img/配送选择地址@2x.png) no-repeat;
          -webkit-background-size: 17px 17px;
          background-size: 17px 17px;
          position: absolute;
          top: 50%;
          margin-top: -9px;
          right: 15px;
        }
      }
      div.coupon{
        position: relative;
        border-bottom: 1px solid #f6f6f6;
        height: 55px;
        &:after{
          content: '';
          width: 17px;
          height: 17px;
          display: block;
          background: url(./../../img/配送选择地址二@2x.png) no-repeat;
          -webkit-background-size: 17px 17px;
          background-size: 17px 17px;
          position: absolute;
          top: 50%;
          margin-top: -9px;
          right: 15px;
        }
        &.checked:after{
          content: '';
          width: 17px;
          height: 17px;
          display: block;
          background: url(./../../img/配送选择地址@2x.png) no-repeat;
          -webkit-background-size: 17px 17px;
          background-size: 17px 17px;
          position: absolute;
          top: 50%;
          margin-top: -9px;
          right: 15px;
        }
        p.value{

        }
        p.name{

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
