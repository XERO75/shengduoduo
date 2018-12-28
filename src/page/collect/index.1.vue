<template>
  <div id="collect">
    <div class="product-list">
      <div class="product-container">
        <img src="./../../pic/box.png">
        <p class="name">哦来看哈阿萨德哈吉看时间哈斯柯达按时大叔大婶大所多</p>
        <p class="price">&yen;<span>500</span></p>
        <p class="type">红色1kg <span>更多</span></p>
        <span class="btn-pin">发起订单</span>
      </div>
      <div class="product-container">
        <img src="./../../pic/box.png">
        <p class="name">哦来看哈阿萨德哈吉看时间哈斯柯达按时大叔大婶大所多</p>
        <p class="price">&yen;<span>500</span></p>
        <p class="type">红色1kg <span>更多</span></p>
        <span class="btn-pin">发起订单</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast,  } from 'vant';
// import { getCouponList } from "@/api/coupon";
export default {
  components: {
    [Toast.name]: Toast,
  },
  data(){
    return{

    }
  },
  methods: {
    onClickPoints() {
      this.$router.push({path:'/points/coupon'});
    },
  },
  mounted(){

  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#collect{
  min-height: 100%;
  .product-list{
    padding: 0.533333rem;
    .product-container{
      position: relative;
      padding-left: 2.4rem;
      padding-bottom: 1.2rem;
      img{
        width: 2.2rem;
        height: 2.2rem;
        position: absolute;
        left: 0;
      }
      .name{
        font-size: 0.373333rem;
        color: #2d2e2d;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
      }
      .price{
        font-size: 0.293333rem;
        color: #2d2e2d;
        margin-top: 0.266667rem;
        span{
          font-size: 0.453333rem;
        }
      }
      .type{
        font-size: 0.266667rem;
        color: #afaeaf;
        span{
          padding-left: 0.4rem;
        }
      }
      span.btn-pin{
        width: 1.52rem;
        height: 0.506667rem;
        display: inline-block;
        font-size: 0.266667rem;
        line-height: 0.506667rem;
        color: #fff;
        background-color: #8FC221;
        text-align: center;
        position: absolute;
        bottom: 1.2rem;
        right: 0;
        border-radius: 0.253333rem;
      }
    }
  }
}
</style>
