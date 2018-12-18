<template>
  <div id="myVoucher-receive">
    <p class="tips">你的好友给你赠送了1张优鲜卡</p>
    <div class="card-container">
      <img :src="detail.secondLevelImage">
    </div>
    <p class="money">面值&nbsp;<strong>&yen; <span>{{detail.value.replace('.00','')}}</span></strong></p>
    <div class="btn-container">
      <van-button class="btn-use" type="danger" @click="onClickGet">立即领取</van-button>
      <van-button class="btn-follow" type="default" @click="show=true">关注公众号立即使用</van-button>
    </div>
    <div class="rule-container">
      <p class="title">优鲜卡使用说明</p>
      <p class="content">1.礼品卡需要在有效期内使用，过期作废。</p>
      <p class="content">2.礼品卡不予兑换，购物金额不足部分以现金补偿。</p>
      <p class="content">3.礼品卡支付部分不开发票。</p>
      <p class="content">4.发生退货时，礼品卡支付部分退回卡内，不予兑现。</p>
      <p class="content">5.礼品卡一旦绑定，将只能被绑定账号使用，不能夸账户使用。</p>
    </div>
    <van-popup v-model="show">
      <div class="qrcode-container">
        <img src="./../../pic/QRcode.png">
          <p>关注公众号获取更多的优惠信息</p>
          <van-button class="btn-ok" @click="show=false">好的</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast, Button, Popup } from 'vant';
import { receiveCard, getReceiveDetail } from "@/api/myVoucher"
import { handleLogin } from "@/api/login"
export default {
  components: {
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Popup.name]: Popup,
  },
  data(){
    return{
      show: false,
      code: '',
      detail: {},
    }
  },
  methods: {
    onClickGet() {
      let formdata = new FormData();
      formdata.append('code',this.code);
      receiveCard(formdata).then(res=>{
        console.log(res);
        if(res.data.code==0){
          Toast('领取成功');
        }else{
          Toast(res.data.errmsg);
        }
      })
    },
    // onClickReturn() {
    //   this.$router.push({path:'/myVoucher/return'});
    // },
  },
  mounted(){
    handleLogin();
    this.code = this.$route.query.code;
    getReceiveDetail(this.code).then(res=>{
      this.detail = res.data.data;
    })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#myVoucher-receive{
  min-height: 100%;
  box-sizing: border-box;
  margin: 0.4rem;
  .card-container{
    margin: 0 0.426667rem;
    height: 4.0rem;
    img{
      width: 100%;
      height: 100%;
      border-radius: 0.16rem;
    }
  }
  p.money{
    font-size: 0.4rem;
    color: #666;
    padding: 0.453333rem 0 0.4rem 0.426667rem;
    border-bottom: 1px solid #e5e5e5;
    strong{
      padding-left: 0.266667rem;
      font-size: 0.48rem;
      color: #202020;
      span{
        font-size: 0.8rem;
      }
    }
  }
  p.tips{
    padding: 0 0.426667rem 0.4rem 0.426667rem;
    font-size: 0.4rem;
  }
  .rule-container{
    padding: 0 0.426667rem;
    .title{
      padding: 0.533333rem 0 0.2rem 0;
      font-size: 0.4rem;
      color: #202020;
      font-weight: bold;
    }
    .content{
      font-size: 0.373333rem;
      color: #666;
      line-height: 0.666667rem;
    }
  }
  .btn-container{
    width: 100%;
    padding: 0.8rem 0.4rem 0.4rem 0.4rem;
    box-sizing: border-box;
    bottom: 0.64rem;
    .van-button{
      width: 100%;
      height: 1.173333rem;
      line-height: 1.173333rem;
      border-radius: 0.586667rem;
      font-size: 0.426667rem;
      color: #fff;
    }
    .btn-use{
      background-color: #e70012;
      margin-bottom: 0.266667rem;
    }
    .btn-follow{
      background-color: #fff;
      color: #666;
      border: none;
      border: 1px solid #d2d2d2;
    }
  }
  .van-popup{
    text-align: center;
    background-color: inherit;
    width: 100%;
    .qrcode-container{
      margin: 0 0.533333rem;
      padding: 0.8rem 0;
      border-radius: 0.106667rem;
      background-color: #fff;
    }
    img{
      width: 6.133333rem;
      height: 6.133333rem;
      border: 1px solid #000;
      border-radius: 0.08rem;
    }
    p{
      font-size: 0.373333rem;
      padding: 0.266667rem 0 0.533333rem 0;
      color: #666;
    }
    .van-button{
      width: 60%;
      height: 1.173333rem;
      line-height: 1.173333rem;
      border-radius: 0.586667rem;
      font-size: 0.426667rem;
      background-color: #e70012;
      color: #fff;
    }
  }
}
</style>
