<template>
  <div id="order-list">
    <van-tabs v-model="active" :swipe-threshold="tabNum" @click="tabClick">
      <van-tab title="全部">
        <div class="order-container" @click="onClickDetail(n.sn)" v-for="n in orderList" :key="n.id">
          <div class="order-header">
            <span class="orderSn">{{n.sn}}</span>
            <span class="orderStatus fr" :class="{'red':n.status=='未支付'||n.status=='未处理','green':n.status=='正常派送'}">{{n.status}}</span>
          </div>
          <div class="order-content">
            <div class="order-item" v-for="m in n.orderItems" :key="m.id">
              <img :src="m.image" height="45" width="45">
              <div class="item-right">
                <div class="item-top clearfloat">
                  <span class="item-name van-ellipsis fl">{{m.productName}} {{m.specifications}}</span>
                  <span class="item-price fr">&yen;{{m.price.replace('.00','')}}</span>
                </div>
                <div class="item-bottom clearfloat">
                  <span class="item-date fl">配送完结时间：{{m.finishDate?m.finishDate.replace('.0',''):''}}</span>
                  <span class="item-size fr">{{m.totalCount}}{{m.unit}}/每日{{m.number}}{{m.unit}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="order-bottom">
            <span class="orderDate">{{n.createDate.replace('.0','')}}</span>
            <van-button v-if="n.status=='未支付'" class="fr" type="primary" size="small" @click="onClickDetail(n.id)">立即支付</van-button> 
            <span class="orderTotal fr" :class="{'pay':n.status=='未支付'}">合计：<strong>&yen;&nbsp;{{n.actualPay.replace('.00','')}}</strong></span>
          </div>
        </div>
        <div class="no-order" v-if="!orderList.length">
          <img src="./../../img/没有订单.png">
          <p class="tips">没有订单</p>
        </div>
      </van-tab>
      <van-tab title="未支付">
        <div class="order-container" @click="onClickDetail(n.sn)" v-for="n in orderList" :key="n.id">
          <div class="order-header">
            <span class="orderSn">{{n.sn}}</span>
            <span class="orderStatus fr" :class="{'red':n.status=='未支付'||n.status=='未处理','green':n.status=='正常派送'}">{{n.status}}</span>
          </div>
          <div class="order-content">
            <div class="order-item" v-for="m in n.orderItems" :key="m.id">
              <img :src="m.image" height="45" width="45">
              <div class="item-right">
                <div class="item-top clearfloat">
                  <span class="item-name van-ellipsis fl">{{m.productName}} {{m.specifications}}</span>
                  <span class="item-price fr">&yen;{{m.price.replace('.00','')}}</span>
                </div>
                <div class="item-bottom clearfloat">
                  <span class="item-date fl">配送完结时间：{{m.finishDate?m.finishDate.replace('.0',''):''}}</span>
                  <span class="item-size fr">{{m.totalCount}}{{m.unit}}/每日{{m.number}}{{m.unit}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="order-bottom">
            <span class="orderDate">{{n.createDate.replace('.0','')}}</span>
            <van-button v-if="n.status=='未支付'" class="fr" type="primary" size="small">立即支付</van-button> 
            <span class="orderTotal fr" :class="{'pay':n.status=='未支付'}">合计：<strong>&yen;&nbsp;{{n.actualPay.replace('.00','')}}</strong></span>
          </div>
        </div>
        <div class="no-order" v-if="!orderList.length">
          <img src="./../../img/没有订单.png">
          <p class="tips">没有订单</p>
        </div>
      </van-tab>
      <van-tab title="未处理">
        <div class="order-container" @click="onClickDetail(n.sn)" v-for="n in orderList" :key="n.id">
          <div class="order-header">
            <span class="orderSn">{{n.sn}}</span>
            <span class="orderStatus fr" :class="{'red':n.status=='未支付'||n.status=='未处理','green':n.status=='正常派送'}">{{n.status}}</span>
          </div>
          <div class="order-content">
            <div class="order-item" v-for="m in n.orderItems" :key="m.id">
              <img :src="m.image" height="45" width="45">
              <div class="item-right">
                <div class="item-top clearfloat">
                  <span class="item-name van-ellipsis fl">{{m.productName}} {{m.specifications}}</span>
                  <span class="item-price fr">&yen;{{m.price.replace('.00','')}}</span>
                </div>
                <div class="item-bottom clearfloat">
                  <span class="item-date fl">配送完结时间：{{m.finishDate?m.finishDate.replace('.0',''):''}}</span>
                  <span class="item-size fr">{{m.totalCount}}{{m.unit}}/每日{{m.number}}{{m.unit}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="order-bottom">
            <span class="orderDate">{{n.createDate.replace('.0','')}}</span>
            <van-button v-if="n.status=='未支付'" class="fr" type="primary" size="small">立即支付</van-button> 
            <span class="orderTotal fr" :class="{'pay':n.status=='未支付'}">合计：<strong>&yen;&nbsp;{{n.actualPay.replace('.00','')}}</strong></span>
          </div>
        </div>
        <div class="no-order" v-if="!orderList.length">
          <img src="./../../img/没有订单.png">
          <p class="tips">没有订单</p>
        </div>
      </van-tab>
      <van-tab title="配送中">
        <div class="order-container" @click="onClickDetail(n.sn)" v-for="n in orderList" :key="n.id">
          <div class="order-header">
            <span class="orderSn">{{n.sn}}</span>
            <span class="orderStatus fr" :class="{'red':n.status=='未支付'||n.status=='未处理','green':n.status=='正常派送'}">{{n.status}}</span>
          </div>
          <div class="order-content">
            <div class="order-item" v-for="m in n.orderItems" :key="m.id">
              <img :src="m.image" height="45" width="45">
              <div class="item-right">
                <div class="item-top clearfloat">
                  <span class="item-name van-ellipsis fl">{{m.productName}} {{m.specifications}}</span>
                  <span class="item-price fr">&yen;{{m.price.replace('.00','')}}</span>
                </div>
                <div class="item-bottom clearfloat">
                  <span class="item-date fl">配送完结时间：{{m.finishDate?m.finishDate.replace('.0',''):''}}</span>
                  <span class="item-size fr">{{m.totalCount}}{{m.unit}}/每日{{m.number}}{{m.unit}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="order-bottom">
            <span class="orderDate">{{n.createDate.replace('.0','')}}</span>
            <van-button v-if="n.status=='未支付'" class="fr" type="primary" size="small">立即支付</van-button> 
            <span class="orderTotal fr" :class="{'pay':n.status=='未支付'}">合计：<strong>&yen;&nbsp;{{n.actualPay.replace('.00','')}}</strong></span>
          </div>
        </div>
        <div class="no-order" v-if="!orderList.length">
          <img src="./../../img/没有订单.png">
          <p class="tips">没有订单</p>
        </div>
      </van-tab>
      <van-tab title="已结束">
        <div class="order-container" @click="onClickDetail(n.sn)" v-for="n in orderList" :key="n.id">
          <div class="order-header">
            <span class="orderSn">{{n.sn}}</span>
            <span class="orderStatus fr" :class="{'red':n.status=='未支付'||n.status=='未处理','green':n.status=='正常派送'}">{{n.status}}</span>
          </div>
          <div class="order-content">
            <div class="order-item" v-for="m in n.orderItems" :key="m.id">
              <img :src="m.image" height="45" width="45">
              <div class="item-right">
                <div class="item-top clearfloat">
                  <span class="item-name van-ellipsis fl">{{m.productName}} {{m.specifications}}</span>
                  <span class="item-price fr">&yen;{{m.price.replace('.00','')}}</span>
                </div>
                <div class="item-bottom clearfloat">
                  <span class="item-date fl">配送完结时间：{{m.finishDate?m.finishDate.replace('.0',''):''}}</span>
                  <span class="item-size fr">{{m.totalCount}}{{m.unit}}/每日{{m.number}}{{m.unit}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="order-bottom">
            <span class="orderDate">{{n.createDate.replace('.0','')}}</span>
            <van-button v-if="n.status=='未支付'" class="fr" type="primary" size="small">立即支付</van-button> 
            <span class="orderTotal fr" :class="{'pay':n.status=='未支付'}">合计：<strong>&yen;&nbsp;{{n.actualPay.replace('.00','')}}</strong></span>
          </div>
        </div>
        <div class="no-order" v-if="!orderList.length">
          <img src="./../../img/没有订单.png">
          <p class="tips">没有订单</p>
        </div>
      </van-tab>
      <van-tab title="已取消">
        <div class="order-container" @click="onClickDetail(n.sn)" v-for="n in orderList" :key="n.id">
          <div class="order-header">
            <span class="orderSn">{{n.sn}}</span>
            <span class="orderStatus fr" :class="{'red':n.status=='未支付'||n.status=='未处理','green':n.status=='正常派送'}">{{n.status}}</span>
          </div>
          <div class="order-content">
            <div class="order-item" v-for="m in n.orderItems" :key="m.id">
              <img :src="m.image" height="45" width="45">
              <div class="item-right">
                <div class="item-top clearfloat">
                  <span class="item-name van-ellipsis fl">{{m.productName}} {{m.specifications}}</span>
                  <span class="item-price fr">&yen;{{m.price.replace('.00','')}}</span>
                </div>
                <div class="item-bottom clearfloat">
                  <span class="item-date fl">配送完结时间：{{m.finishDate?m.finishDate.replace('.0',''):''}}</span>
                  <span class="item-size fr">{{m.totalCount}}{{m.unit}}/每日{{m.number}}{{m.unit}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="order-bottom">
            <span class="orderDate">{{n.createDate.replace('.0','')}}</span>
            <van-button v-if="n.status=='未支付'" class="fr" type="primary" size="small">立即支付</van-button> 
            <span class="orderTotal fr" :class="{'pay':n.status=='未支付'}">合计：<strong>&yen;&nbsp;{{n.actualPay.replace('.00','')}}</strong></span>
          </div>
        </div>
        <div class="no-order" v-if="!orderList.length">
          <img src="./../../img/没有订单.png">
          <p class="tips">没有订单</p>
        </div>
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
      this.$router.push({path:'/order/detail',query:{sn:sn}});
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
      .orderStatus{
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
          position: absolute;
        }
        .item-right{
          padding: 0 0 0 50px;
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
