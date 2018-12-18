<template>
  <div id="shop-order">
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
                <span v-if="n.halfDateType=='单次配送'" class="item-size fr">{{n.totalCount}}{{n.unit}}(单次配送)</span>
                <span v-else class="item-size fr">{{n.totalCount}}{{n.unit}}/每日{{n.number}}{{n.unit}}</span>
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
      <p class="coupon" @click="showCoupon=true">优惠券
        <span v-if="!couponStr" class="select van-ellipsis">{{coupons&&coupons.length?coupons.length:0}}张可用</span>
        <span v-else class="select van-ellipsis">{{couponStr}}</span>
      </p>
      <!-- <p class="voucher" @click="showVoucher=true">优鲜卡<span class="select">父亲节赠送卡( &yen;20 )</span></p> -->
      <p class="voucher" @click="showVoucher=true">优鲜卡
        <span v-if="!voucherId" class="select van-ellipsis">{{vouchers&&vouchers.length?vouchers.length:0}}张可用</span>
        <span v-else class="select van-ellipsis">{{voucherName}}(&yen;{{voucherValue}})</span>
      </p>
    </div>
    <div class="btn-container">
      <van-button @click="showPayBox=true">立即支付 &yen; {{info.actualPay}}</van-button>
    </div>
    <van-popup class="pay-popup" v-model="showPayBox">
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
        <div class="van-checkbox" @click="checked=!checked">
          <div class="van-checkbox__icon van-checkbox__icon--round">
            <!-- <i class="van-icon van-icon-success"></i> -->
            <i class="van-icon van-icon-success" :class="{noChecked:!checked,hasChecked:checked}"></i>
          </div>
          <span class="van-checkbox__label">我已阅读并同意协议</span>
        </div>
        <van-button class="btn-WXPay" v-if="!checked" style="background-color:#999;" disabled>微信支付</van-button>
        <van-button class="btn-WXPay" v-else @click="onClickPay">微信支付</van-button>
      </div>
    </van-popup>
    <van-popup class="coupon-popup" v-model="showCoupon" position="right" :overlay="false">
      <div id="shop-coupon">
        <div class="coupon-container" v-for="(n,i) in coupons1" :key="n.id">
           <i class="icon-checkbox" @click="handleClick($event,i)"></i>
           <div class="coupon-box">
            <div class="coupon-left">
              <p class="value">&yen;<span>{{n.discount}}</span></p>
              <div class="coupon-left-left">
                <p class="name">{{n.name}}</p>
                <p class="tips">满{{n.price}}可用</p>
              </div>
            </div>
            <div class="coupon-right">
              <p class="status">{{n.useDate}}</p>
              <!-- <span class="btn-use">立即使用</span> -->
            </div>
           </div>
        </div>
        <div class="button-container" v-if="hasCoupon">
          <van-button class="btn-addCart" @click="handleCancel">取消</van-button>
          <van-button class="btn-buy" @click="handleConfirm">立即使用</van-button>
        </div>
        <div class="button-container" v-if="!hasCoupon">
          <van-button class="btn-back" @click="showCoupon=false">返回</van-button>
        </div>
        <div class="nodata" v-if="!hasCoupon">
          <img src="./../../img/优惠券-空@2x.png">
          <p>您没有可用的优惠券</p>
          <!-- <span class="btn-exchange" @click="onClickPoints">去兑换</span> -->
        </div>
      </div>
    </van-popup>
    <van-popup class="voucher-popup" v-model="showVoucher" position="right" :overlay="false">
      <div id="shop-voucher">
        <div v-for="(n,i) in vouchers" :key="i" class="card-container" @click="onClickUse(i)">
          <div class="card-box">
            <img :src="n.secondLevelImage">
            <p class="money">&yen;&nbsp;<span>{{n.value}}</span></p>
            <div class="bottom-bar">
              <span class="fl">{{n.giftCardName}}</span>
              <span class="fr">待使用</span>
            </div>
          </div>
        </div>
        <div class="button-container">
          <van-button class="btn-back" @click="handleCancel2">取消</van-button>
        </div>
        <div class="nodata" v-if="!hasVoucher">
          <img src="./../../img/优鲜卡-空@2x.png">
          <p>您没有可用的优鲜卡</p>
          <!-- <span class="btn-buy" @click="onClickVoucher">去购买</span> -->
        </div>
      </div>
    </van-popup>
    <div class="mask" v-if="loading">
      <van-loading color="white" />
    </div>
  </div>
</template>

<script>
import { Toast, Row, Col, Button, Popup, Checkbox, Loading } from 'vant';
import { submitOrder, createOrder } from "@/api/shop";
import { handleLogin } from "@/api/login";
import { WXPay, payFree } from "@/api/pay";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
  },
  data(){
    return{
      checked: false,
      loading: false,
      info: [],
      productList: [],
      coupons: [],
      vouchers: [],

      showPayBox: false,
      showCoupon: false,
      showVoucher: false,
      hasCoupon: false,
      hasVoucher: false,
      voucherId: '',
      voucherName: '',
      voucherValue: '',
      couponIds: [],
      usableCouponIds: [],
      couponStr: '',

      orderSn: '',
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
    coupons1(){
      let arr = this.coupons;
      if(this.coupons&&this.coupons.length){
        for(let i=0;i<this.coupons.length;i++) {
          if (this.coupons[i].useDate) {
            if (parseInt(this.coupons[i].useDate) === 0) {
              arr[i].useDate = '不足1小时'
            }else if (parseInt(this.coupons[i].useDate) < 24) {
              arr[i].useDate = '剩' + arr[i].useDate + '小时'
            }else if (parseInt(this.coupons[i].useDate) >= 24) {
              arr[i].useDate = '剩' + (arr[i].useDate / 24).toFixed(0) + '天'
            }
          }
        }
      }
      return arr;
    }
  },
  methods: {
    /* 匹配数组对象的某个属性的值 返回该对象的索引 */
    getObjListIndex(arr,key,value){
      if(arr){
        for(let i=0;i<arr.length;i++) {
          if(arr[i][key]==value){
            return i;
            break;
          }
        }
      }
      return '';
    },
    /* 两数组的交集 */
    intersection(arr1,arr2){
      return arr1.filter(v => arr2.includes(v))
    },
    /* 两数组的差集 */
    difference(arr1,arr2){
      return arr1.concat(arr2).filter(v => !arr1.includes(v) || !arr2.includes(v))
    },
    remove(arr,val) { 
      let index = arr.indexOf(val); 
      if (index > -1) { 
        arr.splice(index, 1); 
      } 
    },
    timestampToDate(timestamp) {
      let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = date.getDate() + ' ';
      // let h = date.getHours() + ':';
      // let m = date.getMinutes() + ':';
      // let s = date.getSeconds();
      return Y+M+D;
    },
    submitOrder(){
      let formdata = new FormData();
      console.log(this.$store.state);
      if(this.$store.state.addressId&&this.$store.state.beginDate&&this.$store.state.DeliverType&&this.$store.state.HalfDateType){
        formdata.append('id',this.$store.state.addressId);
        formdata.append('beginDate',this.$store.state.beginDate);
        formdata.append('deliverType',this.$store.state.DeliverType);
        formdata.append('halfDateType',this.$store.state.HalfDateType);
        formdata.append('couponIds',this.couponIds);
        formdata.append('giftCardId',this.voucherId);
        submitOrder(formdata).then(res=>{
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
        this.$router.push({path:'/shop/sort'});
      }
    },
    clickProductIcon(){
      // this.$router.go(-3);
      this.$router.push({path:'/shop/sort'});
    },
    clickConfigureIcon(){
      // this.$router.go(-2);
      this.$router.push({path:'/shop/configure',query:{type:this.$route.query.type}});
    },
    clickAddressIcon(){
      // this.$router.go(-1);
      this.$router.push({path:'/shop/address',query:{type:this.$route.query.type}});
    },
    onClickCoupon() {
      this.$router.push({path:'/shop/coupon',query:{type:this.$route.query.type}});
    },
    onClickVoucher() {
      this.$router.push({path:'/shop/voucher',query:{type:this.$route.query.type}});
    },
    onClickPay(){
      if(this.checked){
        this.loading = true;
        let formdata = new FormData();
        // console.log(this.$store.state);
        formdata.append('id',this.$store.state.addressId);
        formdata.append('beginDate',this.$store.state.beginDate);
        formdata.append('deliverType',this.$store.state.DeliverType);
        formdata.append('halfDateType',this.$store.state.HalfDateType);
        formdata.append('couponIds',this.couponIds);
        formdata.append('giftCardId',this.voucherId);
        createOrder(formdata).then(res=>{
          this.orderSn = res.data.data;
          let formdata = new FormData();
          formdata.append('sn',this.orderSn);
          if(this.info.actualPay==0){
            payFree(formdata).then(res=>{
              if(res.data.code==0){
                location.href = '?WX_TYPE=OfficialAccount#/order/success?sn='+this.orderSn;
              }else{
                Toast("支付失败");
                location.href = '?WX_TYPE=OfficialAccount#/order/detail?sn='+this.orderSn;
              }
            })
          }else{
            WXPay(formdata).then(res1=>{
              this.appId = res1.data.data.appId;
              this.timeStamp = res1.data.data.timeStamp;
              this.nonceStr = res1.data.data.nonceStr;
              this.package = res1.data.data.package;
              this.signType = res1.data.data.signType;
              this.paySign = res1.data.data.paySign;
              this.pay();
            })
          }
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
      let id = this.$route.query.id;
      let that = this;
      WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
              "appId" : this.appId,          //公众号名称，由商户传入     
              "timeStamp": this.timeStamp,   //时间戳，自1970年以来的秒数     
              "nonceStr" : this.nonceStr,    //随机串     
              "package" : this.package,     
              "signType" : "MD5",            //微信签名方式:     
              "paySign" : this.paySign       //微信签名 
          },
          function(res){
            that.loading = false;
           if(res.err_msg == "get_brand_wcpay_request:ok"){  
              // this.$router.push({path:"/shop/success",query:{orderId:}}); //改为orderId？
              // this.$router.push({path:"/course/success",query:{id:this.$route.query.id}}); 
              // location.href = 'http://dydbuy.cn/wechat/?#/course/success?id='+this.$route.query.id;
              location.href = '?WX_TYPE=OfficialAccount#/order/success?sn='+that.orderSn;
           }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
              Toast("用户取消支付");
              location.href = '?WX_TYPE=OfficialAccount#/order/detail?sn='+that.orderSn;
           }else{  
              // this.$router.push({path:"/course/error",query:{id:this.$route.query.id}});
              // location.href = 'http://dydbuy.cn/wechat/?#/course/error?id='+this.$route.query.id;
              Toast("支付失败");
              location.href = '?WX_TYPE=OfficialAccount#/order/detail?sn='+that.orderSn;
           }  
       }); 
    },
    /* 优惠券 */
    // onClickPoints() {
    //   this.$router.push({path:'/points/coupon'});
    // },
    handleClick(event,index) {
      console.log(index)
      let id = this.coupons[index].id; // 当前的优惠券id
      let couponId = this.coupons[index].couponId; // 当前的优惠券couponId
      let withIds = this.coupons[index].useWithResult||[]; // 当前优惠券的可同时使用优惠券ids
      let current = event.currentTarget.parentNode;
      // 取消勾选
      if(current.classList.contains("checked")){
        current.classList.remove("checked");
        this.remove(this.couponIds,id);
        if(this.couponIds.length){
          for(let i=0;i<this.couponIds.length;i++){ //遍历已选的优惠券，重新获取可用ids
            // 获得已选优惠券id 返回该id所在coupons数组下所属对象的索引
            let checkedIndex =  this.getObjListIndex(this.coupons,'id',this.couponIds[i]);
            // if(checkedIndex){
              let nowWithIds = this.coupons[checkedIndex].useWithResult;
              this.usableCouponIds = this.intersection(this.usableCouponIds,nowWithIds);
            // }
          }
        }else{
          this.usableCouponIds = [];
        }
      }else{
      // 勾选 usableCouponIds
        if(!this.couponIds.length){ //勾选第一个(已选0张)
          current.classList.add("checked");
          this.couponIds.push(id);
          this.usableCouponIds = withIds;
        }else{ //已勾选了优惠券再勾选
          if(this.usableCouponIds.indexOf(couponId)>-1){ //判断该优惠券id是否在可用ids内
            current.classList.add("checked");
            this.couponIds.push(id);
            if(this.couponIds.length){
              for(let i=0;i<this.couponIds.length;i++){ //遍历已选的优惠券，重新获取可用ids
                // 获得已选优惠券id 返回该id所在coupons数组下所属对象的索引
                let checkedIndex =  this.getObjListIndex(this.coupons,'id',this.couponIds[i]);
                // if(checkedIndex){
                  let nowWithIds = this.coupons[checkedIndex].useWithResult;
                  this.usableCouponIds = this.intersection(this.usableCouponIds,nowWithIds);
                // }
              }
            }else{
              this.usableCouponIds = [];
            }
          }else{
            Toast('已选优惠券与该券不能共用');
          }
        }
      }
      // console.log(this.couponIds);
      // console.log(this.usableCouponIds);
    },
    handleCancel(){
      this.showCoupon = false;
      this.couponIds = [];
      this.couponStr = '';
      let checkedDom = document.querySelectorAll('.coupon-container.checked');
      console.log(checkedDom);
      for(let i=0;i<checkedDom.length;i++) {
        checkedDom[i].classList.remove('checked');
      }
      this.submitOrder();
    },
    handleConfirm(){
      this.showCoupon = false;
      console.log(this.couponIds);
      if(this.couponIds.length){
        this.couponStr = '';
        for(let i=0;i<this.couponIds.length;i++){ //遍历已选的优惠券，重新获取可用ids
          // 获得已选优惠券id 返回该id所在coupons数组下所属对象的索引
          let checkedIndex =  this.getObjListIndex(this.coupons,'id',this.couponIds[i]);
          if(i==0){
            this.couponStr += this.coupons[checkedIndex].name + '(￥'+ this.coupons[checkedIndex].discount +')';
          }else{
            this.couponStr += '/' +this.coupons[checkedIndex].name + '(￥'+ this.coupons[checkedIndex].discount +')';
          }
          console.log(this.couponStr)
        }
      }else{
        this.usableCouponIds = [];
      }
      this.submitOrder();
    },
    /* 优鲜卡 */
    onClickUse(index) {
      this.showVoucher = false;
      this.voucherId = this.vouchers[index].id;
      this.voucherName = this.vouchers[index].giftCardName;
      this.voucherValue = this.vouchers[index].value;
      this.submitOrder();
    },
    handleCancel2(){
      this.showVoucher = false;
      this.voucherId = '';
      this.voucherName = '';
      this.voucherValue = '';
      this.submitOrder();
    },
  },
  mounted(){
    handleLogin();
    this.submitOrder();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#shop-order{
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
        width: 6.933333rem;
        padding-right: 0.4rem;
        text-align: right;
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
        &:last-child{
          padding-bottom: 0.266667rem;
        }
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
        position: sticky;
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
      /*padding-bottom: 1.066667rem;*/
      box-sizing: border-box;
      background-color: #f6f6f6;
      .card-container{
        height: 3.2rem;
        padding: 0.4rem 0.4rem 0 0.4rem;
        &:last-child{
          padding-bottom: 0.4rem;
        }
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
        position: sticky;
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
