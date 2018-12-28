<template>
  <div id="coupon">
    <van-tabs v-model="active">
      <van-tab title="未使用">
        <p class="header-bar">领券中心</p>
        <div class="coupon-list">
          <div class="coupon-container toUse">
            <div class="coupon-left">
              <p class="price">&yen;<span>5</span></p>
              <p class="tips">满100可用</p>
            </div><div class="coupon-right">
              <p class="name">仅限LOVO集团官方旗舰店</p>
              <p class="date">2018.08.09-2019.10.22</p>
              <span class="btn btn-use">立即使用</span>
            </div>
          </div>
        </div>
        <!-- <div class="nodata"  v-if="!weishiyong.length">
          <img src="./../../img/优惠券-空.png">
          <p>您没有未使用优惠券</p>
        </div> -->
      </van-tab>
      <van-tab title="已使用">
        <p class="header-bar" @click="onClickCenter">领券中心</p>
        <div class="coupon-list">
          <div class="coupon-container used">
            <div class="coupon-left">
              <p class="price">&yen;<span>5</span></p>
              <p class="tips">满100可用</p>
            </div><div class="coupon-right">
              <p class="name">仅限LOVO集团官方旗舰店</p>
              <p class="date">2018.08.09-2019.10.22</p>
              <span class="btn btn-used">已使用</span>
            </div>
          </div>
        </div>
        <!-- <div class="nodata"  v-if="!yishiyong.length">
          <img src="./../../img/优惠券-空.png">
          <p>您没有已使用优惠券</p>
        </div> -->
      </van-tab>
      <van-tab title="已过期">
        <p class="header-bar" @click="onClickCenter">领券中心</p>
        <div class="coupon-list">
          <div class="coupon-container passed">
            <div class="coupon-left">
              <p class="price">&yen;<span>5</span></p>
              <p class="tips">满100可用</p>
            </div><div class="coupon-right">
              <div class="coupon-right__content">
                <p class="name">仅限LOVO集团官方旗舰店</p>
                <p class="date">2018.08.09-2019.10.22</p>
              </div>
              <span class="btn btn-passed">已过期</span>
            </div>
          </div>
        </div>
        <!-- <div class="nodata"  v-if="!yiguoqi.length">
          <img src="./../../img/优惠券-空.png">
          <p>您没有已过期优惠券</p>
        </div> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast, Tab, Tabs } from 'vant';
// import { getCouponList } from "@/api/coupon";
export default {
  components: {
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  data(){
    return{
      active: 0,
      hasCoupon: false,
      coupons: [],
      weishiyong: [],
      yishiyong: [],
      yiguoqi: [],
    }
  },
  methods: {
    onClickCenter() {
      this.$router.push({path:'/coupon/center'});
    },
    onClickPoints() {
      this.$router.push({path:'/points/coupon'});
    },
    onClickSort() {
      this.$router.push({path:'/shop/sort'});
    },
    toastMore(str){
      Toast('适用范围：'+str)
    },
  },
  mounted(){

  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#coupon{
  min-height: 100%;
  background-color: #f6f6f6;
  p.header-bar{
    line-height: 0.64rem;
    font-size: 0.293333rem;
    color: #f7ab07;
    background-color: #fff2dd;
    padding-left: 1.2rem;
    position: relative;
    &:before{
      content: '';
      width: 0.373333rem;
      height: 0.373333rem;
      display: block;
      background: url(./../../image/icon_zhongxin@2x.png) no-repeat;
      -webkit-background-size: 0.373333rem 0.373333rem;
      background-size: 0.373333rem 0.373333rem;
      position: absolute;
      top: 50%;
      margin-top: -0.186667rem;
      left: 0.533333rem;
    }
    &:after{
      content: '';
      width: 0.133333rem;
      height: 0.24rem;
      display: block;
      background: url(./../../image/icon_jinru@2x.png) no-repeat;
      -webkit-background-size: 0.133333rem 0.24rem;
      background-size: 0.133333rem 0.24rem;
      position: absolute;
      top: 50%;
      margin-top: -0.12rem;
      right: 0.533333rem
    }
  }
  .coupon-list{
    .coupon-container{
      margin: 0 auto;
      margin-top: 0.266667rem;
      width: 9.2rem;
      height: 2.533333rem;
      background: #fff;
      border-radius: 10px;
      // background: url(./../../image/img_youhuiquan@2x.png) no-repeat;
      -webkit-background-size: 8.933333rem 2.533333rem;
      background-size: 8.933333rem 2.533333rem;
      .coupon-left{
        width: 33%;
        height: 100%;
        display: inline-block;
        text-align: center;
        .price{
          padding-top: 0.266667rem;
          font-size: 0.453333rem;
          font-weight: bold;
          color: #FE7D14;
          span{
            font-size: 1.066667rem;
          }
        }
        .tips{
          font-size: 0.32rem;
          color: #FE7D14;
        }
      }
      .coupon-right{
        display: flex;
        width: 67%;
        height: 100%;
        display: inline-block;
        vertical-align: top;
        padding: 0.266667rem;
        box-sizing: border-box;
        position: relative;
        .name{
          font-size: 0.346667rem;
          color: #2d2e2d;
        }
        .date{
          font-size: 0.293333rem;
          color: #afaeaf;
        }
        span.btn{
          width: 1.706667rem;
          height: 0.56rem;
          display: inline-block;
          border: 1px solid #f7ab07;
          text-align: center;
          line-height: 0.586667rem;
          color: #f7ab07;
          border-radius: 0.28rem;
          position: absolute;
          bottom: 0.266667rem;
        }
      }
      &.used{
        background: url(./../../image/img_yishiyongquan@2x.png) no-repeat;
        -webkit-background-size: 8.933333rem 2.533333rem;
        background-size: 8.933333rem 2.533333rem;
        .coupon-right{
          .name{
            color: rgba(165,166,165,.8);
          }
          .date{
            color: rgba(218,218,218,.8);
          }
          span.btn-used{
            border: 1px solid rgba(209,208,209,.8);
            color: rgba(209,208,209,.8);
          }
        }
      }
      &.passed{
        background: url(./../../image/img_yiguoqiquan@2x.png) no-repeat;
        -webkit-background-size: 8.933333rem 2.533333rem;
        background-size: 8.933333rem 2.533333rem;
        .coupon-right{
          .name{
            color: rgba(95,95,95,.8);
          }
          .date{
            color: rgba(189,188,189,.8);
          }
          span.btn-passed{
            border: 1px solid rgba(189,188,189,.8);
            color: rgba(189,188,189,.8);
          }
        }
      }

    }
  }
  .nodata{
    width: 100%;
    position: absolute;
    text-align: center;
    img{
      width: 4.04rem;
      height: 2.146667rem;
      margin-top: 2.773333rem;
    }
    p{
      padding: 0.88rem 0 0.453333rem 0;
      font-size: 0.346667rem;
      color: #999;
    }
    span{
      width: 2.986667rem;
      height: 0.88rem;
      display: block;
      color: #666;
      font-size: 0.426667rem;
      border: 1px solid #b5b5b5;
      border-radius: 0.44rem;
      line-height: 0.88rem;
      margin: 0 auto;
    }
  }
}
</style>
