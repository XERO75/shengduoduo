<template>
  <div id="mine">
    <div class="avatar-container">
      <div class="avatar-box">
        <img src="./../../pic/user2.jpg">
        <p class="van-ellipsis">3131321321</p>
        <span class="btn-pin">拼单返现</span>
      </div>
    </div>
    <div class="order-container container" @click="onClickOrder">
      <p class="title">我的订单<span>查看更多</span></p>
      <div class="status-list">
        <div class="status-item">
          <img src="./../../pic/o.png">
          <p>待付款</p>
        </div><div class="status-item">
          <img src="./../../pic/o.png">
          <p>待分享</p>
        </div><div class="status-item">
          <img src="./../../pic/o.png">
          <p>待发货</p>
        </div><div class="status-item">
          <img src="./../../pic/o.png">
          <p>待收货</p>
        </div><div class="status-item">
          <img src="./../../pic/o.png">
          <p>待评价</p>
        </div>
      </div>
    </div>
    <div class="service-container container">
      <div class="service-list">
        <div class="service-item"  @click="onClickCoupon">
          <img src="./../../pic/o.png">
          <p>优惠券</p>
        </div><div class="service-item"  @click="onClickCollect">
          <img src="./../../pic/o.png">
          <p>我的收藏</p>
        </div><div class="service-item"  @click="onClickCollect2">
          <img src="./../../pic/o.png">
          <p>店铺收藏</p>
        </div><div class="service-item"  @click="onClickHistory">
          <img src="./../../pic/o.png">
          <p>历史浏览</p>
        </div><div class="service-item"  @click="onClickSale">
          <img src="./../../pic/o.png">
          <p>退款售后</p>
        </div>
      </div>
    </div>
    <div class="function-container container">
      <div class="function-list">
        <div class="function-item">
          <img src="./../../pic/o.png">
          <p>打卡领红包</p>
        </div><div class="function-item">
          <img src="./../../pic/o.png">
          <p>砍价免费拿</p>
        </div><div class="function-item">
          <img src="./../../pic/o.png">
          <p>每日夺宝</p>
        </div><div class="function-item">
          <img src="./../../pic/o.png">
          <p>米多多矿场</p>
        </div>
      </div>
      <div class="function-list">
        <div class="function-item" @click="onClickAddress">
          <img src="./../../pic/o.png">
          <p>收货地址</p>
        </div><div class="function-item">
          <img src="./../../pic/o.png">
          <p>官方客服</p>
        </div><div class="function-item">
          <img src="./../../pic/o.png">
          <p>我的评价</p>
        </div><div class="function-item">
          <img src="./../../pic/o.png">
          <p>帮助</p>
        </div>
      </div>
    </div>
    <div class="bottom_tab">
      <van-row>
        <van-col span="6"><div @click="onClickHome"><img src="./../../pic/n1.png"></div></van-col>
        <van-col span="6"><div @click=""><img src="./../../pic/n2.png"></div></van-col>
        <van-col span="6"><div @click=""><img src="./../../pic/n2.png"></div></van-col>
        <van-col span="6"><div><img src="./../../pic/n3.png"></div></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Row, Col } from 'vant';
import { getUserInfo } from "@/api/mine";
import { getMenu } from "@/api/menu";
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
      this.$router.push({path:'/order/list'});
    },
    onClickHome() {
      this.$router.push({path:'/index'});
    },
    onClickAddress() {
      this.$router.push({path:'/address'});
    },
    onClickCoupon() {
      this.$router.push({path:'/coupon'});
    },
    onClickCollect() {
      this.$router.push({path:'/collect'});
    },
    onClickCollect2() {
      this.$router.push({path:'/collect/store'});
    },
    onClickHistory() {
      this.$router.push({path:'/history'});
    },
    onClickSale() {
      this.$router.push({path:'/afterSale'});
    },

  },
  mounted(){

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
      width: 100%;
      padding-left: 0.586667rem;
      box-sizing: border-box;
      position: absolute;
      bottom: 1.04rem;
      img{
        width: 1.52rem;
        height: 1.52rem;
        border-radius: 0.76rem;
        border: 0.053333rem solid rgba(255,255,255,.45);
      }
      p{
        font-family: PingFangBold;
        position: absolute;
        margin-left: 1.973333rem;
        top: 0.48rem;
        width: 6.0rem;
        font-size: 0.48rem;
        color: #fff;
      }
      span.btn-pin{    
        position: absolute;
        border: 1px solid #fff;
        padding: 5px 10px;
        border-radius: 12px;
        height: 12px;
        color: #fff;
        line-height: 14px;
        right: 10px;
        top: 50%;
        margin-top: -12px;
      }     
    }
  }
  .container{
    border-bottom: 10px solid #f6f6f6;
    background-color: #fff;
  }
  .order-container{
    padding-left: 15px;
    p.title{
      padding-right: 15px;
      line-height: 40px;
      font-weight: bold;
      position: relative;
      border-bottom: 1px solid #f6f6f6;
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
      span{
        float: right;
        padding-right: 20px;
        font-weight: normal;
      }
    }
    div.status-list{
      padding-right: 15px;
      .status-item{
        width: 20%;
        display: inline-block;
        text-align: center;
        img{

        }
        p{

        }
      }
    }
  } 
  .service-container{
    padding: 0 15px;
    .service-list{
      .service-item{
        width: 20%;
        display: inline-block;
        text-align: center;
      }
    }
  }  
  .function-container{
    .function-list{
      &:first-child{
        border-bottom: 1px solid #f6f6f6;
      }
      .function-item{
        width: 25%;
        display: inline-block;
        text-align: center;
        border-right: 1px solid #f6f6f6;
        box-sizing: border-box;
        &:last-child{
          border-right: 0;
        }
      }
    }
  } 


  
}
</style>
