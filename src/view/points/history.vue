<template>
  <div id="coupon">
    <van-tabs v-model="active">
      <van-tab title="优惠券兑换">
        <div class="coupon-list">
          <div class="coupon-box" v-for="n in coupons">
            <div class="coupon-left">
              <p class="value">&yen; <span>{{n.discount.replace('.00','')}}</span></p>
              <div class="coupon-left-left">
                <p class="name van-ellipsis">{{n.couponName}}</p>
                <p class="tips">满{{n.price.replace('.00','')}}可用</p>
                <p class="tips">适用范围：{{n.str}}<span v-if="n.availableProduct&&n.availableProduct.length&&n.availableProduct.length>4" class="more" @click="toastMore(n.availableProduct)">更多</span></p>
                <p class="date">{{n.createDate.replace('.0','')}}</p>
              </div>
            </div>
            <div class="coupon-right">
              <p class="text">兑换积分</p>
              <p class="num">{{n.costPoint.replace('.00','')}}</p>
            </div>
          </div>
        </div>
        <div class="no-history" v-if="!coupons.length">
          <img class="coupon-img" src="./../../img/优惠券-空.png">
          <p class="tips">暂无兑换优惠券</p>
        </div>
      </van-tab>
      <van-tab title="物品兑换">
        <div class="product-container" v-for="n in products">
          <p v-if="n.expressCode" class="transform">{{n.expressName}}<span> （订单号：{{n.expressCode}}）</span></p>
          <p v-else class="transform">暂未发货</p>
          <div v-for="m in n.exchangeOrderItemList" class="product-item">
            <img :src="m.image">
            <div class="info-container">
              <p class="name">{{m.productName}}</p>
              <p class="num">{{m.costPoint}}</p>
              <p class="count">数量：X{{m.totalCount}}</p>
            </div>
          </div>
          <p class="date">{{n.createDate.replace('.0','')}}<span>兑换积分：{{n.totalCostPoints.replace('.00','')}}</span></p>
        </div>
        <div class="no-history" v-if="!products.length">
          <img class="gift-img" src="./../../img/兑换奖品-空.png">
          <p class="tips">暂无兑换物品</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast, Tab, Tabs, Row, Col } from 'vant';
import { getCouponHistory, getProductHistory } from "@/api/points";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  data(){
    return{
      active: 0,
      coupons: [],
      products: [],
    }
  },
  methods: {
    onClickOrder() {
      this.$router.push({path:'/order'});
    },
    onClickAgreement() {
      this.$router.push({path:'/agreement'});
    },
    toastMore(str){
      Toast('适用范围：'+str)
    },
  },
  mounted(){
    handleLogin();
      getCouponHistory().then(res=>{
        this.coupons = res.data.data;
        if(this.coupons){
          for(let i=0;i<this.coupons.length;i++) {
            if(this.coupons[i].availableProduct){
              this.coupons[i].str = this.coupons[i].availableProduct.substring(0,4);
            }
          }
        }
      });
      getProductHistory().then(res=>{
        this.products = res.data.data.content;
      });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#coupon{
  background-color: #f6f6f6;
  min-height: 100%;
  .van-tab {
    background-color: #fff;
    color: #000;
    .van-ellipsis{
      font-size: 0.4rem;
      color: #666;
    }
  }
  .van-tab.van-tab--active {
    background-color: #fff;
    color: #000;
    .van-ellipsis{
      color: #202020;
    }
  }
  .van-tab.van-tab--active:after {
    content: '';
    width: 0.933333rem;
    height: 0.08rem;
    border-radius: 0.04rem;
    background-color: #e70012;
    display: block;
    bottom: 0.08rem;
    position: absolute;
    left: 50%;
    margin-left: -0.466667rem;
  }
  .van-tabs__line{
    height: 0;
  }
  .van-tabs__wrap.van-hairline--top-bottom:after{
    border: none;
  }
  [class*=van-hairline]::after {
    border: 0!important;
  }
  .no-history{
    text-align: center;
    img.gift-img{
      width: 3.24rem;
      height: 2.933333rem;
      margin-top: 2.666667rem;
    }
    img.coupon-img{
      width: 4.04rem;
      height: 2.146667rem;
      margin-top: 3.466667rem;
    }
    p.tips{
      padding-top: 0.666667rem;
      font-size: 0.346667rem;
      color: #999;
    }
    
  }
  .coupon-list {
    padding: 0 0.4rem;
    .coupon-box{
      width: 100%;
      height: 100%;
      margin-top: 0.266667rem;
      background: url(./../../img/优惠券@2x.png) no-repeat;
      background-size: 100% 100%;
      .coupon-left {
        width: 70%;
        height: 100%;
        position: relative;
        display: inline-block;
        p.value {
          width: 39%;
          height: 100%;
          line-height: 2.986667rem;
          box-sizing: border-box;
          padding-left: 0.453333rem;
          font-size: 0.64rem;
          font-weight: bold;
          color: #e70012;
          float: left;
          span{
            font-size: 0.853333rem;
          }
        }
        .coupon-left-left{
          p.name{
            padding: 0.426667rem 0 0.106667rem 0;
            font-size: 0.48rem;
            color: #202020;
            font-weight: bold;
          }
          p.tips{
            font-size: 0.32rem;
            color: #666;
            span.more{
              color: #3879d9;
            }
          }
          p.date{
            padding-top: 0.106667rem;
            font-size: 0.32rem;
            color: #999;
          }

        }
      }
      .coupon-right{
        width: 29%;
        height: 100%;
        display: inline-block;
        float: right;
        text-align: center;
        p.text{
          font-size: 0.32rem;
          color: #e70012;
          padding: 0.9rem 0 0.16rem 0;
        }
        p.num{
          font-size: 0.48rem;
          color: #e70012;
          font-weight: bold;
        }
      }
    }
  }
  .product-container {
    background-color: #fff;
    margin-top: 0.266667rem;
    p.transform{
      font-size: 0.4rem;
      color: #202020;
      font-weight: bold;
      padding-left: 0.4rem;
      line-height: 1.2rem;
      span{
        font-size: 0.373333rem;
        color: #666;
        font-weight: normal;
      }
    }
    .product-item{
      height: 2.533333rem;
      position: relative;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      img{
        width: 1.84rem;
        height: 1.84rem;
        display: block;
        position: absolute;
        left: 0.4rem;
        top: 0.346667rem;
      }
      .info-container{
        padding: 0.346667rem 0 0 2.64rem;
        position: relative;
        height: 1.84rem;
        p.name{
          width: 5.333333rem;
          line-height: 0.613333rem;
          font-size: 0.4rem;
          color: #202020;
          font-weight: bold;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        p.num{
          position: absolute;
          top: 0.373333rem;
          right: 0.4rem;
          font-weight: bold;
          font-size: 0.426667rem;
          color: #202020;
        }
        p.count{
          position: absolute;
          bottom: 0.133333rem;
          font-size: 0.346667rem;
          color: #666;
        }
      }
    }
    p.date{
      padding: 0 0.4rem;
      font-size: 0.32rem;
      color: #999;
      line-height: 1.066667rem;
      span{
        float: right;
        font-size: 0.373333rem;
        color: #e70012;
        font-weight: bold;
      }
    }
  }
}
</style>
