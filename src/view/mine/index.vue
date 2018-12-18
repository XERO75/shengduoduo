<template>
  <div id="mine">
    <div class="avatar-container">
      <div class="avatar-box">
        <img :src="info.avatar">
        <p>{{info.name}}</p>
      </div>
    </div>
    <div class="my-item-list">
      <p @click="onClickOrder"><i class="icon-order"></i>我的订单<i class="icon-go"></i></p>
      <p @click="onClickMyCoupon"><i class="icon-coupon"></i>我的优惠券<i class="icon-go"></i></p>
      <p @click="onClickMyVoucher"><i class="icon-voucher"></i>我的优鲜卡<i class="icon-go"></i></p>
      <p @click="onClickAddress"><i class="icon-address"></i>收货地址管理<i class="icon-go"></i></p>
      <p @click="onClickPoints"><i class="icon-points"></i>我的积分<i class="icon-go"></i></p>
    </div>
    <span class="agreement" @click="onClickAgreement">用户使用协议</span>
    <div class="bottom_tab">
      <van-row>
        <van-col span="6"><div @click="onClickHome"><img :src="iconList.home"></div></van-col>
        <van-col span="6"><div @click="onClickBook"><img :src="iconList.booking"></div></van-col>
        <van-col span="6"><div @click="onClickVoucher"><img :src="iconList.giftCard"></div></van-col>
        <van-col span="6"><div><img :src="iconList.myLight"></div></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Row, Col } from 'vant';
import { getUserInfo } from "@/api/mine";
import { getMenu } from "@/api/menu";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
  },
  data(){
    return{
      info: [],
      iconList: [],
    }
  },
  methods: {
    onClickOrder() {
      this.$router.push({path:'/order'});
    },
    onClickAgreement() {
      this.$router.push({path:'/agreement'});
    },
    onClickMyCoupon() {
      this.$router.push({path:'/coupon'});
    },
    onClickMyVoucher() {
      this.$router.push({path:'/myVoucher'});
    },
    onClickAddress() {
      this.$router.push({path:'/address'});
    },
    onClickPoints() {
      this.$router.push({path:'/points'});
    },
    onClickHome() {
      this.$router.push({path:'/shop'});
    },
    onClickBook() {
      this.$router.push({path:'/shop/sort'});
    },
    onClickVoucher() {
      this.$router.push({path:'/voucher'});
    }
  },
  mounted(){
    handleLogin();
      getUserInfo().then(res=>{
        // console.log(res);
        this.info = res.data.data;
      });
      getMenu().then(res=>{
        // console.log(res);
        this.iconList = res.data.data;
      });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#mine{
  position: relative;
  height: 100%;
  background-color: #f6f6f6;
  .avatar-container{
    height: 4.853333rem;
    background: url(./../../img/我的背景@2x.png) no-repeat;
    background-size: 100%;
    position: relative;
    border-bottom: 0.266667rem solid #f6f6f6;
    .avatar-box{
      position: absolute;
      left: 0.586667rem;
      bottom: 1.04rem;
      img{
        width: 1.52rem;
        height: 1.52rem;
        border-radius: 0.76rem;
        border: 0.053333rem solid rgba(255,255,255,.45);
      }
      p{
        position: absolute;
        margin-left: 1.973333rem;
        top: 0.48rem;
        width: 6.0rem;
        font-size: 0.48rem;
        color: #fff;
      }     
    }
  }
  .my-item-list{
    background-color: #fff;
    p{
      padding: 0.4rem 0;
      margin-left: 1.413333rem;
      position: relative;
      color: #202020;
      font-size: 0.4rem;
      border-bottom: 1px solid #f6f6f6;
    }
    i.icon-order{
      width: 0.426667rem;
      height: 0.453333rem;
      position: absolute;
      top: 50%;
      margin-top: -0.213333rem;
      margin-left: -0.88rem;
      background: url(./../../img/我的订单@2x.png) no-repeat;
      background-size: 0.426667rem 0.453333rem;
    }
    i.icon-coupon{
      width: 0.533333rem;
      height: 0.333333rem;
      position: absolute;
      top: 50%;
      margin-top: -0.166667rem;
      margin-left: -0.86667rem;
      background: url(./../../img/我的优惠券@2x.png) no-repeat;
      background-size: 0.533333rem 0.333333rem;
    }
    i.icon-voucher{
      width: 0.5rem;
      height: 0.333333rem;
      position: absolute;
      top: 50%;
      margin-top: -0.166667rem;
      margin-left: -0.84rem;
      background: url(./../../img/我的优鲜卡@2x.png) no-repeat;
      background-size: 0.5rem 0.333333rem;
    }
    i.icon-address{
      width: 0.526667rem;
      height: 0.553333rem;
      position: absolute;
      top: 50%;
      margin-top: -0.263333rem;
      margin-left: -0.88rem;
      background: url(./../../img/收货地址管理@2x.png) no-repeat;
      background-size: 0.526667rem 0.553333rem;
    }
    i.icon-points{
      width: 0.526667rem;
      height: 0.503333rem;
      position: absolute;
      top: 50%;
      margin-top: -0.263333rem;
      margin-left: -0.88rem;
      background: url(./../../img/我的积分@2x.png) no-repeat;
      background-size: 0.526667rem 0.503333rem;
    }
    i.icon-go{
      width: 0.213333rem;
      height: 0.426667rem;
      position: absolute;
      right: 0.4rem;
      top: 50%;
      margin-top: -0.263333rem;
      background: url(./../../img/go@2x.png) no-repeat;
      background-size: 0.213333rem 0.426667rem;
    }
  }
  .agreement{
    width: 2.666667rem;
    height: 0.733333rem;
    line-height: 0.733333rem;
    text-align: center;
    color: #fff;
    font-size: 0.293333rem;
    background-color: #dadada;
    border-radius: 0.373333rem;
    bottom: 1.573333rem;
    position: absolute;
    left: 50%;
    margin-left: -1.333333rem;
  }
/*  .bottom_tab{
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 1.28rem;
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
    .van-col--6{
      text-align: center;
      line-height: 1.306667rem;
      img{
        vertical-align: middle;
      }
    }
  }*/
}
</style>
