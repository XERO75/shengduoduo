<template>
  <div id="banner">
    <div class="ticket" v-if="coupons" v-for="(n,i) in coupons">
      <div class="top">
        <p class="value">&yen;<span>{{n.discount.replace('.00','')}}</span></p>
        <p class="name van-ellipsis">{{n.name}}</p>
        <p class="tips">满{{n.price.replace('.00','')}}可用</p>
        <p class="tips">领取时间：{{n.start.split(' ')[0]}}至{{n.end.split(' ')[0]}}</p>
      </div>
      <div class="bottom">
        <p class="tips">有效时间：领取后{{n.available}}个小时内有效</p>
        <span class="btn-get" @click="show=true">立即领取</span>
      </div>
    </div>
    <!-- <div class="ticket">
      <div class="top">
        <p class="value">&yen;<span>5</span></p>
        <p class="name">满100可用</p>
        <p class="tips">领取时间：2018-02-03至2018-09-09</p>
      </div>
      <div class="bottom">
        <p class="tips">有效时间：领取后5个小时内有效</p>
        <span class="btn-get" @click="show=true">立即领取</span>
      </div>
    </div> -->
    <div class="btn-container">
      <span class="btn-use" @click="show=true">立即使用</span>
    </div>
    <div class="rules">
      <p class="title"><span>活动规则</span></p>
      <p class="content">1、活动时间：2018.10.25至2019.10.25；</p>
      <p class="content">2、优惠券限于购买鲜牛奶和酸奶分类；</p>
      <p class="content">3、最终解释权归于广东燕塘乳业股份有限公司所有。</p>
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
import { Button, Popup } from 'vant';
import { getBannerDetail } from "@/api/banner"
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
  },
  data(){
    return{
      show: false,
      detail: {},
      coupons: [],
    }
  },
  methods: {
    onClickOrder() {
      this.$router.push({path:'/order/detail'});
    },
    onClickIndex() {
      // this.$router.back(-1);
    },
  },
  mounted(){
    handleLogin();
    getBannerDetail('2bee7f6a-80de-4cdd-86a7-57922dfde0b9').then(res=>{
      console.log(res);
      this.detail = res.data.data;
      this.coupons = this.detail.coupons;
    })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#banner{
  width: 100%;
  /*height: 21.653333rem;*/
  min-height: 100%;
  background: url(./../../img/分享领取优惠券@2x.png) no-repeat;
  -webkit-background-size: 100% 21.653333rem;
  background-size: 100% 21.653333rem;
  padding-top: 7.013333rem;
  padding-bottom: 1.866667rem;
  box-sizing: border-box;
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
    border: 1px solid #f9eca1;
    border-radius: 0.133333rem;
    padding: 0.533333rem  0.453333rem;
    color: #f9eca1;
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
        background-color: #f13a42;
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
        background-color: #f9eca1;
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
        background-color: #f9eca1;
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
