<template>
  <div id="banner-getPoints">
    <div class="img-container">
      <img :src="detail.bannerImage">
    </div>
    <div class="ticket-container">
      <div class="ticket">
        <span class="points">{{detail.bonusPoints?detail.bonusPoints.replace('.00',''):''}}积分</span>
        <span class="btn-get" @click="onClickGet">立即领取</span>
      </div>
    </div>
    <div class="rules" v-html="detail.content">
   <!--    <p class="title"><span>活动规则</span></p>
      <div v-html="detail.content"></div> -->
    </div>
    <van-popup v-model="show">                                          
      <div class="qrcode-container">
        <div class="title">
          <p class="success">领取成功</p>
          <p class="tips">长按二维码关注燕塘公众号使用积分</p>
        </div>
        <img src="./../../pic/QRcode.png">
          <van-button class="btn-ok" @click="show=false">好的</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast, Button, Popup } from 'vant';
import { getPointsDetail, revicePoints } from "@/api/banner"
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Popup.name]: Popup,
  },
  data(){
    return{
      show: false,
      detail: {},
      // style: 'color:red;'
    }
  },
  methods: {
    onClickGet() {
      let formdata = new FormData();
      formdata.append('keyCode',this.$route.query.code);
      revicePoints(formdata).then(res=>{
        console.log(res)
        if(res.data.code==0){
          this.show = true;
        }else{
          Toast(res.data.errmsg);
        }
      })
    },
    onClickOrder() {
      this.$router.push({path:'/order/detail'});
    },
    onClickUse() {
      this.$router.push({path:'/shop/sort'});
    },
  },
  mounted(){
    handleLogin();
    let code = this.$route.query.code;
    // getPointsDetail('2bee7f6a-80de-4cdd-86a7-57922dfde0b9').then(res=>{
    getPointsDetail(code).then(res=>{
      console.log(res);
      this.detail = res.data.data;
    })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#banner-getPoints{
  width: 100%;
  /*height: 21.653333rem;*/
  min-height: 100%;
  /*background: url(./../../img/分享领取优惠券@2x.png) no-repeat;*/
  /*-webkit-background-size: 100% 21.653333rem;*/
  /*background-size: 100% 21.653333rem;*/
  background-color: #f6f6f6;
  /*padding-top: 7.013333rem;*/
  padding-top: 7.333333rem;
  /*padding-bottom: 1.866667rem;*/
  box-sizing: border-box;
  position: relative;
  .img-container{
    width: 100%;
    height: 7.013333rem;
    position: absolute;
    top: 0;
    left: 0;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .ticket-container{
    width: 100%;
    padding: 0 0.4rem;
    box-sizing: border-box;
    .ticket{
      position: relative;
      height: 2.8rem;
      width: 100%;
      border-radius: 0.213333rem;
      background-color: #fff;
      vertical-align: middle;
      box-shadow: 0px 1px 8px #e5e5e5;
      &:before{
        content: '';
        width: 0.773333rem;
        height: 0.826667rem;
        display: block;
        position: absolute;
        background: url(./../../img/积分@2x.png) no-repeat;
        -webkit-background-size: 0.773333rem 0.826667rem;
        background-size: 0.773333rem 0.826667rem;
        top: 50%;
        margin-top: -0.413333rem;
        left: 0.533333rem;
      }
      span.points{
        font-weight: bold;
        font-size: 0.573333rem;
        color: #333;
        padding-left: 1.466667rem;
        line-height: 2.8rem;
      }
      span.btn-get{
        width: 2.693333rem;
        height: 0.88rem;
        background-color: #e70012;
        color: #fff;
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.4rem;
        position: absolute;
        top: 50%;
        margin-top: -0.44rem;
        right: 0.533333rem;
        display: inline-block;
        border-radius: 0.44rem;
      }
    }
  }
  .rules{
    margin: 0.533333rem 0.32rem 0 0.32rem;
    /*border: 1px solid #f9eca1;*/
    border-radius: 0.133333rem;
    padding: 0.533333rem  0.453333rem;
    font-size: 0.373333rem;
    /*color: #f9eca1;*/
    position: relative;
    /*p.title{
      width: 100%;
      height: 0.32rem;
      text-align: center;
      color: #202020;
      font-size: 0.48rem;
      position: absolute;
      top: -0.4rem;
      left: 0;
      span{
        width: 2.666667rem;
        text-align: center;
        font-weight: bold;
        font-size: 0.426667rem;
        color: #333;
        display: inline-block;
        position: absolute;
        left: 50%;
        margin-left: -1.333333rem;
      }
      span:before{
        content: '';
        width: 0.133333rem;
        height: 0.133333rem;
        display: block;
        border-radius: 0.066667rem;
        background-color: #e70012;
        left: 0;
        position: absolute;
        top: 0.24rem;
      }
      span:after{
        content: '';
        width: 0.133333rem;
        height: 0.133333rem;
        display: block;
        border-radius: 0.066667rem;
        //background-color: #f9eca1;
        background-color: #e70012;
        right: 0;
        position: absolute;
        top: 0.24rem;
      }
    }*/
    /*p.content{
      padding-top: 0.133333rem;
      font-size: 0.373333rem;
    }*/
  }
  .van-popup{
    text-align: center;
    background-color: inherit;
    width: 80%;
    border-radius: 0.16rem;
    .qrcode-container{
      padding: 0 0 0.8rem 0;
      border-radius: 0.106667rem;
      background-color: #fff;
    }
    div.title{
      background-color: #f6f6f6;
      padding-top: 0.8rem;
      p.success{
        font-size: 0.56rem;
        font-weight: bold;
        color: #202020;
      }
      p.tips{
        color: #999;
        font-size: 0.32rem;
        margin-top: 0.24rem;
        padding-bottom: 0.453333rem;
      }
    }
    img{
      width: 4.4rem;
      height: 4.4rem;
      border: 1px solid #d2d2d2;
      border-radius: 0.08rem;
      display: block;
      margin: 0 auto;
      margin-top: 0.586667rem;
    }
    .van-button{
      width: 3.2rem;
      height: 1.173333rem;
      line-height: 1.173333rem;
      margin-top: 0.8rem;
      border-radius: 0.586667rem;
      font-size: 0.426667rem;
      background-color: #e70012;
      color: #fff;
    }
  }
}
</style>
