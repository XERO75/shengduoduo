<template>
  <div id="order-list">
    <van-tabs v-model="active" :swipe-threshold="tabNum" @click="tabClick">
      <van-tab title="全部">
        <div class="order-container" @click="onClickInfo">
          <div class="order-header">
            <span class="store-name">绝杀空间</span>
            <span class="order-status fr">待付款</span>
          </div>
          <div class="order-content">
            <div class="order-item">
              <img src="./../../pic/p2.png">
              <div class="item-right">
                <div class="item-top clearfloat">
                  <span class="item-name van-ellipsis fl">好好吃的苹果味饼干</span>
                  <span class="item-price fr">&yen;127</span>
                </div>
                <div class="item-bottom clearfloat">
                  <span class="item-date fl">原味</span>
                </div>
              </div>
            </div>
          </div>
          <div class="order-bottom">
            <van-button class="fr" type="primary" size="small" @click="onClickDetail">去支付</van-button> 
            <span class="orderTotal fl">实付：<strong>&yen;&nbsp;546546（免邮费）</strong></span>
          </div>
        </div>
        <div class="order-container">
          <div class="order-header">
            <span class="store-name">绝杀空间</span>
            <span class="order-status fr">待付款</span>
          </div>
          <div class="order-content">
            <div class="order-item">
              <img src="./../../pic/p2.png">
              <div class="item-right">
                <div class="item-top clearfloat">
                  <span class="item-name van-ellipsis fl">好好吃的苹果味饼干</span>
                  <span class="item-price fr">&yen;127</span>
                </div>
                <div class="item-bottom clearfloat">
                  <span class="item-date fl">原味</span>
                </div>
              </div>
            </div>
          </div>
          <div class="order-bottom">
            <van-button class="fr" type="primary" size="small" @click="onClickDetail">去支付</van-button> 
            <span class="orderTotal fl">实付：<strong>&yen;&nbsp;546546</strong></span>
          </div>
        </div>
        <!-- <div class="no-order" v-if="!orderList.length">
          <img src="./../../img/没有订单.png">
          <p class="tips">没有订单</p>
        </div> -->
      </van-tab>
      <van-tab title="待付款">
      </van-tab>
      <van-tab title="待发货">
      </van-tab>
      <van-tab title="待发货">
      </van-tab>
      <van-tab title="待评价">
      </van-tab>
    </van-tabs>
    <!-- <div class="mask" v-if="loading">
      <van-loading color="white" />
    </div> -->
  </div>
</template>

<script>
import { Tab, Tabs, Button, Loading } from 'vant';
import { getList } from "@/api/order";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Loading.name]: Loading,
  },
  data(){
    return{
      active: 0,
      tabNum: 6,
      orderList: [],
      loading: true,
    }
  },
  methods: {
    onClickDetail(sn) {
      this.$router.push({path:'/index'});
    },
    tabClick(index, title) {
      this.getOrderList(title);
    },
    getOrderList(str){
      this.loading = true;
      console.log(this.loading);
      getList(str).then(res=>{
        this.loading = false;
        console.log(res);
        this.orderList = res.data.data;
      })
    },
    onClickInfo() {
      this.$router.push({path:'/order/info'});
    }
  },
  mounted(){
    handleLogin();
      this.getOrderList('全部');
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#order-list{
  height: 100%;
  color: #666;
  background-color: #f6f6f6;
  .order-container{
    background-color: #fff;
    margin: 10px 0;
    .order-header{
      line-height: 1.2rem;
      font-size: 0.346667rem;
      color: #666;
      padding: 0 0.4rem;
      border-bottom: 1px solid #f6f6f6;
      .store-name{
        padding-left: 16px;
        display: inline-block;
        position: relative;
        &:before{
          content: '';
          width: 20px;
          height: 20px;
          display: block;
          background: url(./../../image/MORE@2x.png) no-repeat;
          -webkit-background-size: 20px 20px;
          // background-size: 20px 20px;
          background-size: 10px 16px;
          position: absolute;
          top: 50%;
          margin-top: -9px;
          left: 0;
        }
        &:after{
          content: '';
          width: 20px;
          height: 20px;
          display: block;
          background: url(./../../image/MORE@2x.png) no-repeat;
          -webkit-background-size: 20px 20px;
          // background-size: 20px 20px;
          background-size: 10px 16px;
          position: absolute;
          top: 50%;
          margin-top: -9px;
          right: -25px;
        }
      }
      .order-status{
        font-weight: bold;
      }
    }
    .order-content{
      .order-item{
        position: relative;
        height: 50px;
        padding: 0.3rem;
        border-bottom: 1px solid #f6f6f6;
        img{
          height: 60px;
          position: absolute;
        }
        .item-right{
          padding: 0 0 0 65px;
          .item-top{
            font-weight: bold;
            line-height: 0.666667rem;
            .item-name{
              color: #000;
              font-size: 0.373333rem;
              width: 6.4rem;
              display: inline-block;
            }
            .item-price{
              color: #000;
              font-size: 0.373333rem;
            }
          }
        }
      }
    }
    .order-bottom{
      height: 1.2rem;
      line-height: 1.2rem;
      padding: 0 0.4rem;
      position: relative;
      .orderDate{
        font-size: 0.32rem;
        color: #666;
      }
      .orderTotal{
        font-size: 0.32rem;
        color: #666;
        strong{
          font-size: 0.426667rem;
          color: #202020;
        }
      }
      .orderTotal.pay{
        padding-right: 2.133333rem;
        strong{
          color: #e70012;
        }
      }
      .van-button--small {
        position: absolute;
        background-color: #fff;
        color: #e70012;
        border: none;
        border: 1px solid #e70012;
        border-radius: 27px;
        right: 0.4rem;
        width: 2.0rem;
        height: 0.72rem;
        font-size: 0.32rem;
        line-height: 0.72rem;
        top: 50%;
        margin-top: -0.36rem;
      }
    }
  }
  .no-order{
    text-align: center;
    img{
      width: 2.64rem;
      height: 2.8rem;
      margin-top: 2.666667rem;
    }
    p.tips{
      padding-top: 0.666667rem;
      font-size: 0.346667rem;
      color: #999;
    }
  }
}
</style>
