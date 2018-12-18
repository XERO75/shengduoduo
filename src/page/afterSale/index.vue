<template>
  <div id="after-sale">
    <div class="order-list">
      <div class="order-container">
        <div class="product-container">
          <img src="./../../pic/box.png">
          <p class="name">哦来看哈阿萨德哈吉看时间哈斯柯达按时大叔大婶大所多</p>
          <p class="price">&yen;<span>500</span></p>
          <p class="type">红色1kg <span>更多</span></p>
        </div>
        <p class="status">仅退款 退款成功<span class="btn-detail">查看详情</span></p>
      </div>
      <div class="order-container">
        <div class="product-container">
          <img src="./../../pic/box.png">
          <p class="name">哦来看哈阿萨德哈吉看时间哈斯柯达按时大叔大婶大所多</p>
          <p class="price">&yen;<span>500</span></p>
          <p class="type">红色1kg <span>更多</span></p>
        </div>
        <p class="status">仅退款 退款成功<span class="btn-detail">查看详情</span></p>
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
#after-sale{
  min-height: 100%;
  .order-list{
    padding: 0.533333rem;
    .order-container{
      padding-bottom: 0.933333rem;
      .product-container{
        position: relative;
        padding-left: 2.4rem;
        padding-bottom: 0.346667rem;
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
      }
      .status{
        line-height: 0.826667rem;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        color: #2d2e2d;
        font-size: 0.266667rem;
        padding-left: 0.4rem;
        position: relative;
        &:before{
          content: '';
          width: 0.32rem;
          height: 0.32rem;
          display: inline-block;
          background: url(./../../image/icon_tuikuan@2x.png) no-repeat;
          -webkit-background-size: 0.32rem 0.32rem;
          background-size: 0.32rem 0.32rem;
          position: absolute;
          top: 50%;
          margin-top: -0.16rem;
          left: 0;
        }
        span.btn-detail{
          width: 1.573333rem;
          height: 0.56rem;
          display: inline-block;
          text-align: center;
          line-height: 0.56rem;
          border: 1px solid #e64a19;
          border-radius: 0.28rem;
          color: #e64a19;
          font-size: 0.266667rem;
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -0.293333rem;
        }
      }
    }
  }
}
</style>
