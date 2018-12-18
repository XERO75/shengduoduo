<template>
  <div id="coupon-center">
    <van-tabs v-model="active">
      <van-tab title="精选"></van-tab>
      <van-tab title="服饰"></van-tab>
      <van-tab title="鞋包"></van-tab>
      <van-tab title="母婴"></van-tab>
      <van-tab title="特产"></van-tab>
      <van-tab title="百货"></van-tab>
    </van-tabs>
    <div class="coupon-list">
      <div class="coupon-container">
        <div class="coupon-left">
          <img src="./../../pic/box.png">
          <p class="name">好久好久还是接受电锯惊魂江湖你别墨迹不具备可见</p>
          <p class="before">拼单价：<del>&yen;9</del></p>
          <p class="after">领券后：&yen;6</p>
        </div><div class="coupon-right">
          <p class="price">&yen;<span>3</span></p>
          <p class="tips">无门槛</p>
          <span class="btn btn-get">立即领取</span>
        </div>
      </div>
      <div class="coupon-container">
        <div class="coupon-left">
          <img src="./../../pic/box.png">
          <p class="name">好久好久还是接受电锯惊魂江湖你别墨迹不具备可见</p>
          <p class="before">拼单价：<del>&yen;9</del></p>
          <p class="after">领券后：&yen;6</p>
        </div><div class="coupon-right">
          <p class="price">&yen;<span>3</span></p>
          <p class="tips">无门槛</p>
          <span class="btn btn-get">立即领取</span>
        </div>
      </div>
    </div>
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

    }
  },
  methods: {
    onClickPoints() {
      this.$router.push({path:'/points/coupon'});
    },
    onClickSort() {
      this.$router.push({path:'/shop/sort'});
    },
  },
  mounted(){

  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#coupon-center{
  min-height: 100%;
  background-color: #f6f6f6;
  .coupon-list{
    .coupon-container{
      width: 8.946667rem;
      height: 2.546667rem;
      margin: 0 auto;
      margin-top: 0.266667rem;
      background: url(./../../image/img_lingququan@2x.png) no-repeat;
      -webkit-background-size: 8.946667rem 2.546667rem;
      background-size: 8.946667rem 2.546667rem;
      .coupon-left{
        width: 76%;
        height: 100%;
        display: inline-block;
        position: relative;
        padding: 0.373333rem 0.533333rem 0 2.2rem;
        box-sizing: border-box;
        img{
          width: 1.786667rem;
          height: 1.786667rem;
          position: absolute;
          left: 0.266667rem;
          top: 50%;
          margin-top: -0.893333rem;
        }
        .name{
          font-size: 0.266667rem;
          color: #fdbb49;
          overflow:hidden; 
          text-overflow:ellipsis;
          display:-webkit-box; 
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2; 
        }
        .before{
          font-size: 0.28rem;
          color: #afaeaf;
          padding-top: 0.16rem;
        }
        .after{
          font-size: 0.4rem;
          color: #fdbb49;
        }
      }
      .coupon-right{
        width: 24%;
        height: 100%;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        color: #fff;
        .price{
          font-size: 0.453333rem;
          font-weight: bold;
          span{
            font-size: 1.053333rem;
          }
        }
        .tips{
          font-size: 0.266667rem;
          padding-bottom: 0.08rem;
        }
        span.btn{
          width: 1.2rem;
          height: 0.4rem;
          display: inline-block;
          border: 1px solid #fff;
          line-height: 0.4rem;
          font-size: 0.2rem;
          border-radius: 0.2rem;
        }
      }
    }
  }

}
</style>
