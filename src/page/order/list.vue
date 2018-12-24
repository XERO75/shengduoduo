<template>
  <div id="order-list">
    <van-tabs v-model="active" :swipe-threshold="tabNum" @click="tabClick">
      <van-tab title="全部">
        <div v-for="(item, index) in orderList" :key="index" class="order-container" @click="onClickInfo(item.sn)">
          <div class="order-header">
            <div class="f-vertical">
              <img mode="widthFix" src="../../image/订单详情-小店@2x.png" style="width: 15px; hetght:auto;"/>
              <span class="store-name">{{item.shopName}}</span>
              <img mode="widthFix" src="../../image/订单相情，查看小店@2x.png" style="width: 5px; hetght:auto;"/>
            </div>
            <span class="order-status fr">{{item.orderStatus}}</span>
          </div>
          <div class="order-content">
            <div v-for="(n, i) in item.items" :key="i" class="order-item f-space-between">
              <img mode="widthFix" :src="n.image"/>
              <div class="order-item-div1 f-colunm"><p class="order-item-name overTwoLine">{{n.productName}}</p><p class="order-item-text">{{n.specifications}}</p></div>
              <div class="order-item-div2 f-colunm"><p class="order-item-price">&yen; {{n.price}}</p><p class="order-item-count">&times; {{n.count}}</p></div>
            </div>
          </div>
          <div class="order-bottom">
            <van-button class="fr" type="primary" size="small" @click="onClickDetail">去支付</van-button>
            <span class="orderTotal fl">实付：<strong>&yen;&nbsp;{{item.actualPay}} <span v-if="item.postage === 0">（免邮费）</span></strong></span>
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
import { Tab, Tabs, Button, Loading, Toast } from 'vant';
import { myOrders } from '@/api/order'
// import { getList } from "@/api/order";
// import { handleLogin } from "@/api/login";
export default {
  components: {
    [Toast.name]: Toast,
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
    onClickInfo(sn) {
      this.$router.push({path:'/order/info', query: {sn}});
    },
    // 加载我的所有订单
    async myOrders() {
      let that = this
      that.loading = true
      let pageNum = 1
      let pageSize = 10
      await myOrders(pageNum, pageSize).then(res => {
        if (res.data.code === 0) {
          that.loading = false;
          that.orderList = res.data.data.list
        } else {
          Toast(res.data.errmsg)
        }
      })
    }
  },
  mounted(){
    this.myOrders()
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
        display: inline-block;
        position: relative;
        padding: 0 .266667rem;
      }
      .order-status{
        font-weight: bold;
      }
    }
    .order-content{
      .order-item{
        padding: .293333rem .4rem;
        width: 92%;
        height: 2.133333rem;
        img{
          width: 2.133333rem;
          height: auto;
        }
        &-div1{
          margin-left: .266667rem;
          min-width: 53%;
          max-width: 53%;
        }
        &-div2{
          margin-left: .266667rem;
          min-width: 14%;
          max-width: 14%;
        }
        &-name{
          font-size: .4rem;
          color: #2e2e2d;
        }
        &-price{
          font-size: .426667rem;
          color: #e64a19;
          text-align: right;
        }
        &-text{
          font-size: .32rem;
          color: #999;
          margin-top: .32rem;
        }
        &-count{
          @extend .order-item-text;
          text-align: right;
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
