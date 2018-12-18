<template>
  <div id="banner">
    <div class="img-container">
      <img :src="detail.bannerImage">
    </div>
    <div class="ticket" v-if="coupons" v-for="(n,i) in coupons">
      <div class="top">
        <p class="value">&yen;<span>{{n.discount.replace('.00','')}}</span></p>
        <p class="name van-ellipsis">{{n.name}}</p>
        <p class="tips">满{{n.price.replace('.00','')}}可用</p>
        <p class="tips">领取时间：{{n.start.split(' ')[0]}}至{{n.end.split(' ')[0]}}</p>
      </div>
      <div class="bottom">
        <p class="tips">有效时间：领取后{{n.available}}个小时内有效</p>
        <span class="btn-get" @click="onClickGet(i)">立即领取</span>
      </div>
    </div>
    <div class="btn-container">
      <span class="btn-use" @click="onClickUse">立即使用</span>
    </div>
    <div class="rules" v-html="detail.rule">
      <!-- <p class="title"><span>活动规则</span></p>
      <p class="content">1、活动时间：2018.10.25至2019.10.25；</p>
      <p class="content">2、优惠券限于购买鲜牛奶和酸奶分类；</p>
      <p class="content">3、最终解释权归于广东燕塘乳业股份有限公司所有。</p>
      <p class="content" v-html="detail.rule"></p> -->
    </div>
    <van-popup v-model="show">                                                                                                                                               
      <div class="qrcode-container">
        <img src="./../../pic/QRcode.png">
          <p>长按二维码关注燕塘公众号领取</p>
          <van-button class="btn-ok" @click="show=false">好的</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast, Button, Popup } from 'vant';
import { getBannerDetail, reviceCoupon } from "@/api/banner"
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
      coupons: [],
      // style: 'color:red;'
    }
  },
  methods: {
    onClickGet(i) {
      let id = Number(this.coupons[i].id);
      let formdata = new FormData();
      formdata.append('couponId',id)
      reviceCoupon(formdata).then(res=>{
        console.log(res)
        if(res.data.code==0){
          Toast('领取成功');
        }else if(res.data.code==2){
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
    getBannerDetail(code).then(res=>{
    // getBannerDetail('2bee7f6a-80de-4cdd-86a7-57922dfde0b9').then(res=>{
      console.log(res);
      if(res.data.code){
        this.detail = res.data.data;
        this.coupons = this.detail.coupons;
      }else{
        Toast(res.data.errmsg);
      }
    })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#banner{
  width: 100%;
  /*height: 21.653333rem;*/
  min-height: 100%;
  /*background: url(./../../img/分享领取优惠券@2x.png) no-repeat;*/
  /*-webkit-background-size: 100% 21.653333rem;*/
  /*background-size: 100% 21.653333rem;*/
  background-color: #f6f6f6;
  /*padding-top: 7.013333rem;*/
  padding-top: 7.333333rem;
  padding-bottom: 1.866667rem;
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
  .ticket{
    width: 9.573333rem;
    height: 3.68rem;
    background: url(./../../img/优惠券2@2x.png) no-repeat;
    -webkit-background-size: 9.573333rem 3.68rem;
    background-size: 9.573333rem 3.68rem;
    position: relative;
    margin: 0 auto;
    margin-bottom: 0.066667rem;
    .top{
      padding-top: 0.4rem;
      p.value{
        font-weight: bold;
        font-size: 0.64rem;
        color: #e71002;
        width: 2.506667rem;
        position: absolute;
        top: 0.6rem;
        text-align: center;
        span{
          font-size: 1.013333rem;
        }
      }
      p.name{
        padding-left: 2.506667rem;
        font-size: 0.48rem;
        font-weight: bold;
        color: #202020;
      }
      p.tips{
        padding-left: 2.506667rem;
        padding-top: 0.133333rem;
        font-size: 0.346667rem;
        color: #666;
      }
    }
    .bottom{
      p.tips{
        position: absolute;
        left: 0.453333rem;
        bottom: 0.45rem;
        color: #999;
        font-size: 0.32rem;
      }
      span.btn-get{
        width: 2.0rem;
        height: 0.613333rem;
        display: block;
        line-height: 0.613333rem;
        position: absolute;
        right: 0.453333rem;
        bottom: 0.32rem;
        color: #fff;
        background-color: #e71002;
        text-align: center;
        border-radius: 0.306667rem;
        font-size: 0.293333rem;
      }
    }
  }
  .btn-container{
    span.btn-use{
      width: 7.866667rem;
      height: 1.173333rem;
      line-height: 1.173333rem;
      border-radius: 0.586667rem;
      display: block;
      color: #964112;
      font-size: 0.426667rem;
      font-weight: bold;
      background-image: linear-gradient(to bottom, #fdf4d4,#f9eb9c);
      margin: 0 auto;
      margin-top: 0.4rem;
      margin-bottom: 0.8rem;
      text-align: center;
    }
  }
  .rules{
    margin: 1.04rem 0.32rem 0 0.32rem;
    //border: 1px solid #999;
    border-radius: 0.133333rem;
    padding: 0.533333rem  0.453333rem;
    /*color: #f9eca1;*/
    color: #202020;
    position: relative;
    p.title{
      width: 100%;
      height: 0.32rem;
      text-align: center;
      font-size: 0.48rem;
      position: absolute;
      top: -0.4rem;
      left: 0;
      background-color: transparent;
      span{
        width: 2.666667rem;
        text-align: center;
        font-weight: bold;
        display: inline-block;
        /*background-color: #f13a42;*/
        background-color: #e5e5e5;
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
        /*background-color: #f9eca1;*/
        background-color: #999;
        left: 0;
        position: absolute;
        top: 0.32rem;
      }
      span:after{
        content: '';
        width: 0.133333rem;
        height: 0.133333rem;
        display: block;
        border-radius: 0.066667rem;
        /*background-color: #f9eca1;*/
        background-color: #999;
        right: 0;
        position: absolute;
        top: 0.32rem;
      }
    }
    p.content{
      padding-top: 0.133333rem;
      font-size: 0.373333rem;
    }
  }
  .van-popup{
    text-align: center;
    background-color: inherit;
    width: 80%;
    border-radius: 0.16rem;
    .qrcode-container{
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
