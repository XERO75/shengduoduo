<template>
  <div id="shop-voucher">
    <div class="card-container" @click="onClickUse">
      <div class="card-box">
        <p class="money">&yen;&nbsp;<span>200</span></p>
        <div class="bottom-bar">
          <span class="fl">圣诞节快乐</span>
          <span class="fr">待使用</span>
        </div>
      </div>
    </div>
    <div class="card-container" @click="onClickUse">
      <div class="card-box">
        <p class="money">&yen;&nbsp;<span>200</span></p>
        <div class="bottom-bar">
          <span class="fl">圣诞节快乐</span>
          <span class="fr">待使用</span>
        </div>
      </div>
    </div>
    <div class="nodata" v-if="hasVoucher">
      <img src="./../../img/优鲜卡-空@2x.png">
      <p>您没有优鲜卡</p>
      <span class="btn-buy" @click="onClickVoucher">去购买</span>
    </div>
  </div>
</template>

<script>
import { Toast, Tab, Tabs } from 'vant';
// import { articleList } from "@/api/article"
export default {
  components: {
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  data(){
    return{
      active: 0,
      hasVoucher: false,
    }
  },
  methods: {
    onClickVoucher() {
      this.$router.push({path:'/voucher'});
    },
    onClickUse() {
      this.$router.go(-1);
    },
  },
  mounted(){

  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#shop-voucher{
  min-height: 100%;
  padding-bottom: 1.066667rem;
  box-sizing: border-box;
  background-color: #f6f6f6;
  .card-container{
    height: 3.2rem;
    padding: 0.4rem 0.4rem 0 0.4rem;
    .card-box{
      width: 100%;
      height: 100%;
      background: url(./../../img/优鲜卡@2x.png) no-repeat;
      background-size: 100%;
      padding: 0.266667rem;
      box-sizing: border-box;
      position: relative;
      border-radius: 0.106667rem;
      overflow: hidden;
      p.money{
        font-size: 0.64rem;
        color: #fff;
        span{
          font-size: 0.96rem;
        }
      }
      div.bottom-bar{
        width: 100%;
        height: 0.88rem;
        position: absolute;
        bottom: 0;
        left: 0;
        color: #fff;
        font-size: 0.346667rem;
        line-height: 0.88rem;
        padding: 0 0.266667rem;
        box-sizing: border-box;
        background-color: rgba(20, 20, 20, .4);
      }
      div.bottom-bar.give{
        padding: 0 0.533333rem 0 0.266667rem;
      }
      div.bottom-bar.give:after{
        content: '>';
        width: 0.32rem;
        height: 0.83333rem;
        display: block;
        position: absolute;
        right: 0.16rem;
        bottom: 0.026666rem;
        font-size: 0.52222rem;
        color: #fff;
      }
    }
  }
  .nodata{
    width: 100%;
    position: absolute;
    text-align: center;
    img{
      width: 40%;
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
