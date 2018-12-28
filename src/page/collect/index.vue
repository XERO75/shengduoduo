<template>
  <div id="collect">
    <div class="product-list">
      <div class="product-container" v-for="(item, index) in 2" :key="index">
        <img src="./../../pic/box.png">
        <p class="name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, accusantium.</p>
        <div class="product-bottom clearfloat">
          <p class="price fl">&yen;<span>500</span></p>
          <div class="product-bottom__button fr">发起拼单</div>
          <div class="product-bottom__button fr">取消收藏</div>
        </div>
        <!-- <p class="type">红色1kg <span>更多</span></p> -->
        <!-- <span class="btn-pin">发起订单</span> -->
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
  background: #fff;
  .product-list{
    padding: 0 0.533333rem;
    .product-container{
      position: relative;
      padding-left: 2.4rem;
      padding-bottom: .4rem;
      margin-top: .4rem;
      border-bottom: 1px solid #efefef;
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
        color: #FE7000;
        margin-top: 0.266667rem;
        span{
          font-size: 0.453333rem;
          color: #FE7000;
        }
      }
      .product-bottom__button {
        border: 1px solid #E5E5E5;
        padding: .12rem .2rem;
        border-radius: 50px;
        margin-top: .2rem;
        margin-left: .2rem;
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
