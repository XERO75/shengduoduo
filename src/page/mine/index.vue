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
          <img src="./../../image/待评价@2x.png">
          <p>待付款</p>
        </div><div class="status-item">
          <img src="./../../image/待分享@2x.png">
          <p>待分享</p>
        </div><div class="status-item">
          <img src="./../../image/代发货@2x.png">
          <p>待发货</p>
        </div><div class="status-item">
          <img src="./../../image/待收货@2x.png">
          <p>待收货</p>
        </div><div class="status-item">
          <img src="./../../image/待评价@2x.png">
          <p>待评价</p>
        </div>
      </div>
    </div>
    <div class="service-container container">
      <div class="service-list">
        <div class="service-item"  @click="onClickCoupon">
          <img src="./../../image/优惠券@2x.png">
          <p>优惠券</p>
        </div><div class="service-item"  @click="onClickCollect">
          <img src="./../../image/我的收藏@2x.png">
          <p>我的收藏</p>
        </div><div class="service-item"  @click="onClickCollect2">
          <img src="./../../image/店铺收藏@2x.png">
          <p>店铺收藏</p>
        </div><div class="service-item"  @click="onClickHistory">
          <img src="./../../image/历史浏览@2x.png">
          <p>历史浏览</p>
        </div><div class="service-item"  @click="onClickSale">
          <img src="./../../image/退款售后@2x.png">
          <p>退款售后</p>
        </div>
      </div>
    </div>
    <div class="function-container container">
      <div class="function-list">
        <div @click="onClickRedPacket" class="function-item">
          <img src="./../../image/打卡@2x.png">
          <p>打卡领红包</p>
        </div><div @click="onClickBargain" class="function-item">
          <img src="./../../image/砍价@2x.png">
          <p>砍价免费拿</p>
        </div><div @click="onClickTreasure" class="function-item">
          <img src="./../../image/夺宝@2x.png">
          <p>每日夺宝</p>
        </div><div @click="onClickOreYard" class="function-item">
          <img src="./../../image/矿场@2x.png">
          <p>米多多矿场</p>
        </div>
      </div>
      <div class="function-list">
        <div class="function-item" @click="onClickAddress">
          <img src="./../../image/收货地址@2x.png">
          <p>收货地址</p>
        </div><div @click="onClickCustomerService" class="function-item">
          <img src="./../../image/官方客服@2x.png">
          <p>官方客服</p>
        </div><div @click="onClickComments" class="function-item">
          <img src="./../../image/我的评价@2x.png">
          <p>我的评价</p>
        </div><div @click="onClickHelp" class="function-item">
          <img src="./../../image/帮助@2x.png">
          <p>帮助</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Row, Col, NavBar, Badge, BadgeGroup } from 'vant';
import { getUserInfo } from "@/api/mine";
import { getMenu } from "@/api/menu";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [NavBar.name]: NavBar,
    [Badge.name]: Badge,
    [BadgeGroup.name]: BadgeGroup
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
    onClickComments() {
      this.$router.push({path:'/comments'});
    },
    onClickBargain() {
      this.$router.push({path:'/bargain'});
    },
    onClickTreasure() {
      this.$router.push({path:'/treasure'});
    },
    onClickRedPacket() {
      this.$router.push({path:'/redPacket'});
    },
    onClickOreYard() {
      this.$router.push({path:'/oreYard'});
    },
    onClickCustomerService() {
      this.$router.push({path:'/customerService'});
    },
    onClickHelp() {
      this.$router.push({path:'/help'});
    },

  },
  mounted(){

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$fzm: PingFang-SC-Medium;
$fzr: PingFang-SC-Regular;
$fzb: PingFang-SC-Bold;
#mine{
  position: relative;
  height: 100%;
  background-color: #f6f6f6;
  .avatar-container{
    height: 2.666667rem;
    background: url(./../../image/img_beijin@2x.png) no-repeat;
    background-size: 100%;
    position: relative;
    // border-bottom: 0.266667rem solid #f6f6f6;
    .avatar-box{
      width: 100%;
      padding-left: .4rem;
      box-sizing: border-box;
      position: absolute;
      // bottom: 1.04rem;
      top: 50%;
      transform: translateY(-50%);
      img{
        width: 1.52rem;
        height: 1.52rem;
        border-radius: 50%;
        border: 0.053333rem solid #ffffff;
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
    p.title{
      padding: 0 15px;
      height: 1.2rem;
      line-height: 1.2rem;
      font-family: $fzb;
      font-size: .4rem;
      font-weight: bold;
      color: #202020;
      position: relative;
      border-bottom: 1px solid #f6f6f6;
      &:after{
        content: '';
        width: 15px;
        height: 15px;
        display: block;
        background: url(./../../img/right.png) no-repeat;
        -webkit-background-size: 15px 15px;
        background-size: 15px 15px;
        position: absolute;
        top: 50%;
        margin-top: -8px;
        right: 10px;
      }
      span{
        font-family: $fzr;
        font-size: .293333rem;
        color: #666666;
        float: right;
        padding-right: 10px;
        font-weight: normal;
      }
    }
    div.status-list{
      // padding: 0 .533333rem;
      height: 2.346667rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .status-item{
        width: 20%;
        // display: inline-block;
        // text-align: center;
        text-align: center;
        img{
          display: inline-block;
          width: .8rem;
          height: .8rem;
          margin-bottom: .24rem;
        }
        p{
          font-family: $fzr;
          font-size: .32rem;
          color: #2d2d2d;
        }
      }
    }
  } 
  .service-container{
    .service-list{
      height: 2.346667rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .service-item{
        width: 20%;
        text-align: center;
        img{
          display: inline-block;
          width: .8rem;
          height: .8rem;
          margin-bottom: .24rem;
        }
        p{
          font-family: $fzr;
          font-size: .32rem;
          color: #2d2d2d;
        }
      }
    }
  }  
  .function-container{
    .function-list{
      height: 2.56rem;
      display: flex;
      align-items: center;
      &:first-child{
        border-bottom: 1px solid #f6f6f6;
      }
      .function-item{
        width: 25%;
        // height: 2.533333rem;
        display: inline-block;
        text-align: center;
        border-right: 1px solid #f6f6f6;
        &:last-child{
          border-right: 0;
        }
        img{
          display: inline-block;
          width: .8rem;
          height: .8rem;
          margin-bottom: .24rem;
        }
        p{
          font-family: $fzr;
          font-size: .32rem;
          color: #2d2d2d;
        }
      }
    }
  } 
}
</style>
