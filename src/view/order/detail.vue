<template>
  <div id="order-detail">
    <div class="sn-container container">
      <p class="sn-title">订单号<span class="fr">{{info.createDate.replace('.0','')}}</span></p>
      <p class="content">{{info.sn}}</p>
    </div>
    <div class="product-container container">
      <p class="productStatus title">商品清单<span class="fr">{{info.status}}</span></p>
      <div class="product-box">
        <div class="product-content">
          <div class="product-item" v-for="m in info.orderItems">
            <img :src="m.image">
            <div class="item-right">
              <div class="item-top">
                <p class="item-name">{{m.productName}}<span>&yen;{{m.price.replace('.00','')}}</span>
                </p>
              </div>
              <div class="item-bottom clearfloat">
                <span class="item-date fl">配送完结时间：{{m.finishDate.replace('.0','').split(' ')[0]}}</span>
                <span class="item-size fr">{{m.totalCount}}{{m.unit}}/每日{{m.number}}{{m.unit}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="total text-right">合计：&nbsp;<span>&yen;{{info.totalPrice.replace('.00','')}}</span></p>
    </div>
    <!-- <div class="service-container container" v-if="info.status!=='未支付'&&info.status!=='未处理'"> -->
    <div class="service-container container" v-if="info.expressServerName||info.departmentPhone">
      <p class="title">服务部</p>
      <p class="shipper" v-if="info.expressServerName"><span>优鲜达人: </span> {{info.expressServerName}} {{info.expressServerPhone}}</p>
      <!-- <p class="tel" v-if="info.departmentPhone"><span>电话: </span> {{info.departmentPhone}}</p> -->
      <p class="tel" v-if="info.departmentPhone"><span>电话: </span><a v-for="(p,i) in phones" :href="calls[i]"><span v-if="i!==0"> / </span>{{p}}</a></p>
    </div>
    <div class="address-container container">
      <p class="title">配送地址</p>
      <p class="receiver">{{info.memberName}} <a :href="phoneCall">{{info.memberPhone}}</a></p>
      <p class="address">{{info.memberDistrict+info.memberAddress}}{{info.gaodeAddress?info.gaodeAddress:''}}{{info.memberRoom?info.memberRoom:''}}</p>
    </div>
    <div class="cycle-container container">
      <p class="title">配送周期<span class="fr">{{info.deliverType=='WorkingDay'?'周一到周五':'周一到周日'}}{{info.halfDateType=='Morning'?'上午(6-8点)':'下午(4-6点)'}}</span></p>
      <p class="title">赠送积分<span class="fr">{{info.bonusPoints.replace('.00','')}}</span></p>
    </div>
    <div class="total-container container">
      <p class="title">合计</p>
      <p class="content">商品总额<span class="fr">&yen;{{info.totalPrice}}</span></p>
      <p class="content">优惠券<span class="fr red">-&yen;{{info.couponDiscount}}</span></p>
      <p class="content">优鲜卡<span class="fr red">-&yen;{{info.giftCardDiscount}}</span></p>
      <p class="content">实付金额<span class="fr">&yen;{{info.actualPay}}</span></p>
    </div>
    <div class="btn-container">
      <!-- 取消&立即支付 -->
      <div v-if="info.status=='未支付'">
        <van-button class="pay-btn" type="default" @click="show1=true">取消订单</van-button>
        <van-button class="cancel-btn" type="danger" @click="show=true">立即支付&nbsp;&yen;{{info.actualPay}}</van-button>
      </div>
      <!-- 取消订单 -->
      <div v-if="info.status=='未处理'||info.status=='未安排配送员'">
        <van-button class="cancel-btn" @click="show1=true" type="danger" style="width:100%;position:initial;">取消订单</van-button>
      </div>
      <!-- 配送中 -->
      <div v-if="info.status=='正常派送'">
        <van-button class="transport-btn" style="background-color:#24af41;color:#fff;width:100%;position:initial;" disabled>配送中</van-button>
      </div>
      <!-- 待评价 -->
      <div v-if="info.status=='已完成'">
        <van-button class="review-btn" style="background-color:#e70012;color:#fff;width:100%;position:initial;" @click="showCommentBox">待评价</van-button>
      </div>
      <!-- 已评价 -->
      <div v-if="info.status=='已评价'">
        <van-button class="review-btn" style="background-color:#c7c7c7;width:100%;position:initial;color:#fff;" disabled>已评价</van-button>
      </div>
      <!-- 已取消 -->
      <div v-if="info.status=='已取消'">
        <van-button class="review-btn" style="background-color:#c7c7c7;width:100%;position:initial;color:#fff;" disabled>已取消 (如您已支付，将在1到3个工作日内返还)</van-button>
      </div>
      <!-- 暂停派送 -->
      <div v-if="info.status=='暂停派送'">
        <van-button class="review-btn" style="background-color:#c7c7c7;width:100%;position:initial;color:#fff;" disabled>暂停派送</van-button>
      </div>
      <!-- 未安排配送员 -->
      <!-- <div v-if="info.status=='未安排配送员'">
        <van-button class="review-btn" style="background-color:#c7c7c7;width:100%;position:initial;color:#fff;" disabled>未安排配送员</van-button>
      </div> -->
      <!-- 被拒绝 -->
      <div v-if="info.status=='被拒绝'">
        <van-button class="review-btn" style="background-color:#c7c7c7;width:100%;position:initial;color:#fff;" disabled>被拒绝</van-button>
      </div>
    </div>
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
        <!-- <van-checkbox v-model="checked">我已阅读并同意协议</van-checkbox> -->
        <div class="van-checkbox">
          <div class="van-checkbox__icon van-checkbox__icon--round" @click="checked=!checked">
            <!-- <i class="van-icon van-icon-success"></i> -->
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
      <!-- <input type="text" placeholder="请填写订单的取消原因"> -->
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
    </div>
  </div>
</template>

<script>
import { Toast, Button, Popup, Row, Col, Actionsheet, Rate, Checkbox, Loading } from 'vant';
import { getDetail, cancelOrder, getComment, handleCommit } from "@/api/order";
import { handleLogin } from "@/api/login";
import { WXPay, payFree } from "@/api/pay";
export default {
  components: {
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Actionsheet.name]: Actionsheet,
    [Rate.name]: Rate,
    [Checkbox.name]: Checkbox,
    [Loading.name]: Loading,
  },
  data(){
    return{
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
    cancelOrder(){
      this.show1 = false;
      if(!this.loading){
        this.loading = true;
        let formdata = new FormData();
        formdata.append('resason',this.resason);
        formdata.append('sn',this.info.sn);
        cancelOrder(formdata).then(res=>{
          this.loading = false;
          if(res.data.code==0){
            Toast('取消订单成功');
            // location.href = '?WX_TYPE=OfficialAccount#/order/detail?sn='+this.info.sn;
            window.reload();
          }else{
            Toast(res.data.errmsg);
            window.reload();
            // location.href = '?WX_TYPE=OfficialAccount#/order';
          }
        })
        
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
    handleLogin();
      getDetail(this.$route.query.sn).then(res=>{
        // console.log(res);
        this.info = res.data.data.content;
        this.view = this.views[4];
        this.phones = res.data.data.phones||[];
        this.calls = [];
        for(let i=0;i<this.phones.length;i++) {
          this.calls.push('tel:' + this.phones[i]);
        }
      });
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
  .container {
    border-top: 0.266667rem solid #f6f6f6;
    .title{
      line-height: 1.2rem;
      padding: 0 0.4rem;
      font-weight: bold;
      color: #202020;
      font-size: 0.373333rem;
      border-bottom: 1px solid #f6f6f6;
    }
  }
  .sn-container{
    padding: 0.4rem 0.4rem 0.373333rem 0.4rem;
    .sn-title{
      font-size: 0.373333rem;
      color: #202020;
      font-weight: bold;
      padding-bottom: 0.373333rem;
      span{
        color: #999;
        font-size: 0.346667rem;
        font-weight: normal;
      }
    }
    .content{
      font-size:0.346667rem;
      color: #333;
    }
  }
  .product-container{
    .productStatus{
      span{
        color: #999;
        font-weight: normal;
      }
    }
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

  .service-container{
    .shipper,.tel,{
      padding: 0 0.4rem;
      line-height:0.8rem;
      font-weight: bold;
      font-size: 0.4rem;
    }
    .shipper{
      padding-top: 0.133333rem;
    }
    .tel{
      padding-bottom: 0.133333rem;
      a{
        color: #202020!important;
      }
    }
  }
  .address-container{
    .receiver{
      padding: 0.4rem 0.4rem 0 0.4rem;
      font-weight: bold;
      font-size: 0.4rem;
      a{
        color: #202020!important;
      }
    }
    .address{
      color: #666;
      font-size: 0.346667rem;
      padding: 0.133333rem 0.4rem 0.533333rem 0.4rem;
    }
  }
  .cycle-container{
    p.title{
      padding-left: 0;
      margin-left: 0.4rem;
      span{
        font-size: 0.346667rem;
        color: #666;
        font-weight: normal;
      }
    }
  }
  .total-container{
    padding-bottom: 1.866667rem;
    .title{
      border: none;
    }
    .content{
      padding: 0 0.4rem;
      color: #666;
      font-size: 0.4rem;
      line-height: 0.933333rem;
      span{
        font-size: 0.426667rem;
        color: #202020;
        font-weight: bold;
      }
      span.red{
        color: #e70012;
      }
    }
  }
  .btn-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    button.van-button {
      height: 1.306667rem;
      width: 50%;
      font-size: 0.4rem;
      margin: 0;
      display: inline-block;
      padding: 0;
      border: none;
      border-radius: unset;
    }
    button.pay-btn {
      background-color: #4c4c4c;
      color: #fff;
    }
    button.cancel-btn {
      position: absolute;
      background-color: #e70012;
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
