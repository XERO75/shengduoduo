<template>
  <div id="mine">
    <div class="avatar-container">
      <div class="avatar-box">
        <img :src="info.avatar">
        <p class="van-ellipsis">{{info.nickName}}</p>
        <span class="btn-pin">拼单返现</span>
      </div>
    </div>
    <div class="order-container container" @click="onClickOrder">
      <p class="title">我的订单</p>
      <div class="status-list">
        <div class="status-item">
          <div class="status-img">
            <img src="../../assets/img/icon_fahuo@2x.png">
            <!-- <span v-if="info.unPaidCount > 0" class="numberIcon">{{info.unPaidCount}}</span> -->
          </div>
          <p>待付款</p>
        </div><div class="status-item">
          <div class="status-img">
            <img src="../../assets/img/mine_fenxiang@2x.png">
          </div>
          <p>待分享</p>
        </div><div class="status-item">
          <div class="status-img">
            <img src="../../assets/img/icon_fahuo@2x.png">
          </div>
          <p>待发货</p>
        </div><div class="status-item">
          <div class="status-img">
            <img src="../../assets/img/icon_shouhuo@2x.png">
          </div>
          <p>待收货</p>
        </div><div class="status-item">
          <div class="status-img">
            <img src="../../assets/img/icon_pingjia@2x.png">
          </div>
          <p>待评价</p>
        </div>
      </div>
    </div>
    <div class="service-container container">
      <p class="title">我的足迹</p>
      <div class="service-list">
        <div class="service-item"  @click="onClickCoupon">
          <div class="service-img">
            <img src="../../assets/img/icon_youhuiquan@2x.png">
          </div>
          <p>优惠券</p>
        </div><div class="service-item"  @click="onClickCollect">
          <div class="service-img">
            <img src="../../assets/img/icon_shoucang@2x.png">
          </div>
          <p>我的收藏</p>
        </div><div class="service-item"  @click="onClickCollect2">
          <div class="service-img">
            <img src="../../assets/img/icon_dianpu@2x.png">
          </div>
          <p>店铺收藏</p>
        </div><div class="service-item"  @click="onClickHistory">
          <div class="service-img">
            <img src="../../assets/img/icon_lishi@2x.png">
          </div>
          <p>历史浏览</p>
        </div><div class="service-item"  @click="onClickSale">
          <div class="service-img">
            <img src="../../assets/img/icon_shouhou@2x.png">
          </div>
          <p>退款售后</p>
        </div>
      </div>
    </div>
    <div class="function-container container">
      <p class="title">必备工具</p>
      <div class="function-list">
        <div @click="onClickRedPacket" class="function-item">
          <div class="function-img">
            <img src="../../assets/img/icon_daka@2x.png">
          </div>
          <p>打卡领红包</p>
        </div><div @click="onClickBargain" class="function-item">
          <div class="function-img">
            <img src="../../assets/img/icon_kanjia@2x.png">
          </div>
          <p>砍价免费拿</p>
        </div><div @click="onClickTreasure" class="function-item">
          <div class="function-img">
            <img  src="../../assets/img/icon_duobao@2x.png">
          </div>
          <p>每日夺宝</p>
        </div><div @click="onClickOreYard" class="function-item">
          <div class="function-img">
            <img src="../../assets/img/icon_kuangchang@2x.png">
          </div>
          <p>米多多矿场</p>
        </div>
      </div>
      <div class="function-list">
        <div class="function-item" @click="onClickAddress">
          <div class="function-img">
            <img src="../../assets/img/icon_lishi@2x.png">
          </div>
          <p>收货地址</p>
        </div><div @click="onClickCustomerService" class="function-item">
          <div class="function-img">
            <img src="../../assets/img/icon_guangfang@2x.png">
          </div>
          <p>官方客服</p>
        </div><div @click="onClickComments" class="function-item">
          <div class="function-img">
            <img src="../../assets/img/icon_wodepingjia@2x.png">
          </div>
          <p>我的评价</p>
        </div><div @click="onClickHelp" class="function-item">
          <div class="function-img">
            <img src="../../assets/img/icon_bangzhu@2x.png">
          </div>
          <p>帮助</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Row, Col, NavBar, Badge, BadgeGroup, Toast } from 'vant';
import HeaderBar from "@/components/HeaderBar";
import { center } from '@/api/personal';

// import { getUserInfo } from "@/api/mine";
// import { getMenu } from "@/api/menu";
export default {
  components: {
    [Toast.name]: Toast,
    [Row.name]: Row,
    [Col.name]: Col,
    [NavBar.name]: NavBar,
    [Badge.name]: Badge,
    [BadgeGroup.name]: BadgeGroup,
    HeaderBar
  },
  data(){
    return{
      info: [],
      iconList: [],
    }
  },
  methods: {
    onClickBack() {
      this.$router.go(-1);
    },
    onClickCart() {
      this.$router.push({path:'/cart'});
    },
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
    // 请求个人中心信息
    async center() {
      let that = this
      await center().then(res => {
        if (res.data.code === 0) {
          that.info = res.data.data
        } else {
          Toast(res.data.errmsg)
        }
      })
    }
  },
  mounted(){
    this.center()
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$fzm: PingFang-SC-Medium;
$fzr: PingFang-SC-Regular;
$fzb: PingFang-SC-Bold;
#mine{
  box-sizing: border-box;
  position: relative;
  p.title{
      padding: 0 15px;
      height: 1.2rem;
      line-height: 1.2rem;
      font-family: $fzb;
      font-size: .4rem;
      color: #202020;
      position: relative;
  }
  .avatar-container{
    height: 2.666667rem;
    background: url(../../assets/img/img_beijin@2x.png) no-repeat;
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
      // padding: 0 15px;
      // height: 1.2rem;
      // line-height: 1.2rem;
      // font-family: $fzb;
      // font-size: .4rem;
      // color: #202020;
      // position: relative;
      // border-bottom: 1px solid #f6f6f6;
      // &:after{
      //   content: '';
      //   width: 10px;
      //   height: 11px;
      //   display: block;
      //   background: url(./../../image/MORE@2x.png) no-repeat;
      //   -webkit-background-size: 7px 11px;
      //   background-size: 7px 11px;
      //   position: absolute;
      //   top: 50%;
      //   margin-top: -6px;
      //   right: 10px;
      // }
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
      // height: 1.9rem;
      // padding: .4rem 0;
      padding-bottom: .4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .status-item{
        width: 20%;
        // display: inline-block;
        text-align: center;
        .status-img{
          display: inline-block;
          width: .6rem;
          height: .6rem;
          margin-bottom: .24rem;
          position: relative;
        }
        img {
          width: 100%;
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
      height: 1.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .service-item{
        width: 20%;
        text-align: center;
        .service-img{
          display: inline-block;
          width: .7rem;
          // height: .6rem;
          margin-bottom: .24rem;
        }
        img {
          width: 100%;
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
      height: 2.2rem;
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
        border-left: 1px solid transparent;
        // box-sizing: border-box;
        &:last-child{
          border-right: 0;
        }
        .function-img{
          display: inline-block;
          width: 1rem;
          // height: .6rem;
          margin-bottom: .25rem;
        }
        img {
          width: 100%;
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
// 圆形数字icon
.numberIcon{
  background-color: #fff;
  border: 1px solid #8FC221;
  border-radius: 50%;
  height: .346667rem;
  width: .346667rem;
  font-size: .266667rem;
  color: #8FC221;
  position: absolute;
  top: -30%;
  right: -36%;
}
</style>
