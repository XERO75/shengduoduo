<template>
  <div id="points-order">
    <div class="points-header">
      <p>积分<span>&nbsp;{{info.points}}</span></p>
    </div>
    <div class="address-container container">
      <p class="title">配送地址</p>
      <div class="content" @click="showAddress=true">
        <p class="receiver">{{receiver}}</p>
        <p class="address">{{address}}</p>
      </div>
    </div>
    <div class="order-container container">
      <p class="title">商品清单</p>
      <div class="order-box">
        <img :src="info.productImage">
        <div class="item-right">
          <p class="item-top">{{info.productName}}
            <span class="item-points">{{info.singlePoint}}</span>
          </p>
          <div class="item-bottom clearfloat">
            <span class="item-count fl">数量：X{{info.count}}</span>
          </div>
        </div>
      </div>
      <p class="points text-right">兑换积分：&nbsp;<span>{{info.totalPoint}}</span></p>
    </div>
    <div class="btn-container">
      <van-button @click="show=true">使用积分 {{info.totalPoint}}</van-button>
    </div>
    <van-popup class="popup-pay" v-model="show">
      <div class="pay-container">
        <p class="box-title">积分支付</p>
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
        <van-button class="btn" v-if="!checked" style="background-color:#999;" disabled>使用积分</van-button>
        <van-button class="btn" v-if="checked" @click="payPoints">使用积分</van-button>
      </div>
    </van-popup>
    <van-popup class="popup-address" v-model="showAddress" position="right" :overlay="false">
      <div class="addr-container">
        <p class="title">配送地址</p>
        <div class="address-list">
          <div class="address-item" :class="{'checked':addressId&&n.id==addressId||n.isDefault=='true'}" v-for="(n,i) in addressList" :key="n.id" @click="handleClick($event,i)">
            <i class="icon-checkbox"></i>
            <p class="phone" :class="{'default':n.isDefault=='true'}">{{n.contact}} {{n.phone}}</p>
            <p class="address">
              <span class="gaode">{{n.district+n.specificAddress}}</span>
              <span class="room">{{n.room?n.room:''}}</span>
            </p>
          </div>
        </div>
        <div class="noAddress-container" v-if="!addressList.length">
          <img src="./../../img/还没收货地址@2x.png">
          <p class="tips">你还没添加收货地址</p>
          <!-- <span class="btn-add" @click="onClickAdd">添加收货地址</span> -->
        </div>
      </div>
      <!-- <div class="button-container">
        <van-button class="btn-back" @click="chooseAddress">确定</van-button>
      </div> -->
    </van-popup>
  </div>
</template>

<script>
import { Stepper, Row, Col, Button, Popup, Checkbox, Toast } from 'vant';
import { getOrderInfo, exchangeProduct } from "@/api/points";
import { getAdressList } from "@/api/address";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Toast.name]: Toast,
    [Stepper.name]: Stepper,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox,
  },
  data(){
    return{
      count: 1,
      checked: false,
      show: false,
      showAddress: false,
      loading: false,
      info: {},
      addressList: [],
      addressId: '',
      receiver: '', // 收货人和姓名
      address: '', // 详细地址
    }
  },
  methods: {
    /* 匹配数组对象的某个属性的值 返回该对象的索引 */
    getObjListIndex(arr,key,value){
      if(arr&&arr.length){
        for(let i=0;i<arr.length;i++) {
          if(arr[i][key]==value){
            return i;
            break;
          }
        }
      }
      return '';
    },
    onClickAddress() {
      this.$router.push({path:'/points/address'});
    },
    onClickPay() {
      this.$router.push({path:'/points/pay'});
    },
    payPoints() {
      let productId = this.$route.query.id;
      let count = this.$route.query.count;
      if(this.info.points>=this.info.totalPoint){
        exchangeProduct(productId,count,this.addressId).then(res=>{
          if(res.data.code==0){
            this.$router.push({path:'/points/success',query:{type:'gift'}});
          }else{
            Toast(res.data.errmsg);
          }
        })
      }else{
        this.show = false;
        Toast('抱歉，您的积分不足');
      }
    },
    onClickAdd() {
      this.$router.push({path:'/shop/addAddress'});
    },
    handleClick(event,i) {
      this.addressId = this.addressList[i].id;
      this.receiver = this.addressList[i].contact + ' ' + this.addressList[i].phone;
      this.address = this.addressList[i].district + this.addressList[i].specificAddress + this.addressList[i].room;
      if(document.getElementsByClassName("checked")[0]){
        document.getElementsByClassName("checked")[0].classList.remove("checked");
      }
      event.currentTarget.classList.add("checked");
      this.showAddress = false;
    },
    // chooseAddress(){
    //   this.showAddress = false;
    // }
  },
  mounted(){
    let id = this.$route.query.id;
    let count = this.$route.query.count;
    handleLogin();
      getOrderInfo(id,count).then(res=>{
        console.log(res);
        this.info = res.data.data;
        this.receiver = this.info.memberName + " " + this.info.memberPhone;
        this.address = this.info.memberDistrict + this.info.memberAddress + this.info.memberRoom;
      });
      getAdressList().then(res=>{
        this.addressList = res.data.data;
        let defaultIndex =  this.getObjListIndex(this.addressList,"isDefault","true");
        if(defaultIndex===0||defaultIndex){
          this.addressId = this.addressList[defaultIndex].id;
        }else{
          this.addressId = '';
        }
        console.log(this.addressId);
        // this.addressList = [];
      })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#points-order{
  background-color: #f6f6f6;
  min-height: 100%;
  .van-checkbox{
    margin: 0.4rem 0;
    .van-checkbox__label{
      margin-left: 0.133333rem;
      position: absolute;
      font-size: 0.32rem;
      color: #028bd7;
    }
  }
  .points-header{
    background-color: #fff;
    height: 1.653333rem;
    margin-bottom: 0.266667rem;
    p{
      font-size: 0.4rem;
      color: #666;
      padding-left: 0.4rem;
      line-height: 1.653333rem;
      span{
        font-size: 0.8rem;
        color: #202020;
        font-weight: bold;
      }
    }
  }
  .container {
    background-color: #fff;
    .title{
      line-height: 1.2rem;
      padding: 0 0.4rem;
      font-weight: bold;
      color: #202020;
      font-size: 0.373333rem;
      border-bottom: 1px solid #e5e5e5;
    }
  }
  .address-container{
    margin-bottom: 0.266667rem;
    div.content{
      position: relative;
      .receiver{
        padding: 0.4rem 0.4rem 0 0.4rem;
        font-weight: bold;
        font-size: 0.4rem;
      }
      .address{
        color: #666;
        font-size: 0.346667rem;
        padding: 0.133333rem 1.066667rem 0.533333rem 0.4rem;
      }
      &:after{
        content: '';
        width: 0.426667rem;
        height: 0.426667rem;
        display: block;
        background: url(./../../img/right.png) no-repeat;
        -webkit-background-size: 0.426667rem 0.426667rem;
        background-size: 0.426667rem 0.426667rem;
        position: absolute;
        top: 50%;
        margin-top: -0.213333rem;
        right: 0.4rem;
      }
    }
  }
  .order-container{
    background-color: #fff;
    position: relative;
    img{
      position: absolute;
      width: 1.84rem;
      height: 1.84rem;
    }
    .order-box{
      padding: 0.346667rem 0.4rem;
      border-bottom: 1px solid #e5e5e5;
      .item-right{
        height: 1.84rem;
        padding-left: 2.24rem;
        position: relative;
        p.item-top{
          position: relative;
          font-weight: bold;
          color: #202020;
          font-size: 0.4rem;
          line-height: 0.533333rem;
          padding-right: 2.0rem;
          padding-top: 0.133333rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; 
          span.item-points{
            font-size: 0.426667rem;
            position: absolute;
            right: 0;
            top: 0.133333rem;
          }
        }
        .item-bottom{
          color: #666;
          font-size: 0.346667rem;
          position: absolute;
          bottom: 0.16rem;
        }
      }
    }
    p.points{
      line-height: 1.2rem;
      font-weight: bold;
      color: #e70012;
      font-size: 0.346667rem;
      padding-right: 0.4rem;
      span{
        font-size: 0.426667rem; 
      }
    }
  }
  .btn-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    button.van-button {
      width: 100%;
      height: 1.306667rem;
      font-size: 0.4rem;
      border: none;
      border-radius: unset;
      background-color: #e70012;
      color: #fff;
    }
  }
  .van-popup.popup-pay{
    width: 85%;
    height: 11.866667rem;
    top: 45%;
    box-sizing: border-box;
    border-radius: 0.186667rem;
    .hasChecked {
      border-color: #e70012;
      background-color: #e70012;
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
        width: 0.48rem;
        height: 0.52rem;
        display: block;
        position: absolute;
        top: 0.426667rem;
        left: 0;
        background: url(./../../img/积分支付@2x.png) no-repeat;
        -webkit-background-size: 0.48rem 0.52rem;
        background-size: 0.48rem 0.52rem;

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
      .btn {
        width: 100%;
        height: 1.173333rem;
        line-height: 1.173333rem;
        background-color: #e70012;
        color: #fff;
        border-radius: 0.586667rem;
        text-align: center;
        font-size: 0.4rem;
      }
    }
  }
  .van-popup.popup-address{
    width: 100%;
    height: 100%;
    .addr-container{
      background-color: #fff;
      p.title{
        font-size: 0.4rem;
        font-weight: bold;
        color: #202020;
        line-height: 1.28rem;
        padding-left: 0.4rem;
        border-bottom: 1px solid #e5e5e5;
        span{
          width: 2.0rem;
          text-align: right;
          float: right;
          display: inline-block;
          padding-right: 0.4rem;
          font-weight: normal;
          font-size: 0.373333rem;
          color: #666;
          position: relative;
          &:before{
            content: '';
            width: 0.373333rem;
            height: 0.373333rem;
            position: absolute;
            display: block;
            background: url(./../../img/新增地址@2x.png) no-repeat;
            -webkit-background-size: 0.373333rem 0.373333rem;
            background-size: 0.373333rem 0.373333rem;
            left: 0;
            top: 50%;
            margin-top: -0.186667rem;
          }
        }
      }
      .address-list{
        padding-left: 1.12rem;
        min-height: 100%;
        .address-item{
          position: relative;
          border-bottom: 1px solid #e5e5e5!important;
          &:last-child{
            border-bottom: 0;
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
            margin-top: -0.226667rem;
            left: -0.72rem;
          }
          &.checked{
            i.icon-checkbox{
              background: url(./../../img/配送选择地址@2x.png) no-repeat;
              -webkit-background-size: 0.453333rem 0.453333rem;
              background-size: 0.453333rem 0.453333rem;
            }
          }
          p.phone{
            padding: 0.453333rem 0 0.266667rem 0;
            font-size: 0.4rem;
            font-weight: bold;
            color: #202020;
          }
          .phone.default:after {
            content: '[默认]';
            margin-left: 0.32rem;
            width: 0.933333rem;
            height: 0.426667rem;
            font-size: 0.373333rem;
            color: #e70012;
            font-weight: normal;
          }
          p.address{
            font-size: 0.373333rem;
            color: #666;
            padding-bottom: 0.48rem;
            padding-right: 1.333333rem;
            position: relative;
            i.icon-edit{
              width: 0.4rem;
              height: 0.4rem;
              display: block;
              background: url(./../../img/编辑地址@2x.png) no-repeat;
              -webkit-background-size: 0.4rem 0.4rem;
              background-size: 0.4rem 0.4rem;
              position: absolute;
              top: 0.106667rem;
              right: 0.4rem;
            }
          }
        }
      }
    }
    .noAddress-container{
      text-align: center;
      img{
        width: 2.72rem;
        height: 1.52rem;
        //margin-top: 1.52rem;
        margin-top: 50%;
      }
      p.tips{
        font-size: 0.32rem;
        color: #b8b8b8;
        padding-top: 0.4rem;
        padding-bottom: 0.48rem;
      }
      .btn-add{
        width: 4.773333rem;
        height: 1.146667rem;
        display: block;
        border-radius: 1.146667rem;
        color: #fff;
        background-color: #e70012;
        font-size: 0.4rem;
        margin: auto;
        line-height: 1.146667rem;
      }
    }
    .button-container {
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 2999;
      button.van-button {
        height: 1.306667rem;
        width: 100%;
        font-size: 0.4rem;
        margin: 0;
        display: block;
        padding: 0;
        border: none;
        border-radius: unset;
        color: #fff;
        background-color: #4c4c4c;
      }
    }
  }
}
</style>
