<template>
  <div id="pintuan-success">
    <img src="./../../img/支付成功@2x.png">
    <p class="success">拼团成功</p>
    <p class="soon">等待满团之后请及时付款</p>
    <div class="btn-container">
      <span class="btn btn-detail" @click="onClickOrder">查看订单</span>
      <span class="btn btn-back" @click="onClickIndex">返回首页</span>
    </div>
  </div>
</template>

<script>
import { handleLogin } from "@/api/login";
export default {
  components: {
    // [Popup.name]: Popup,
  },
  data(){
    return{
      // type: '',
      // show: false,

      // appId: '',
      // jsapi_ticket: '',
      // noncestr: '',
      // signature: '',
      // timestamp: '',
      // url: '',
    }
  },
  methods: {
    onClickOrder() {
      this.$router.push({path:'/order/detail',query:{sn:this.$route.query.sn}});
    },
    onClickIndex() {
      this.$router.push({path:'/shop'});
    },
  },
  mounted(){
    handleLogin();
    // this.type = this.$route.query.type;
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#pintuan-success{
  text-align: center;
  position: relative;
  min-height: 100%;
  img{
    width: 1.893333rem;
    height: 2.24rem;
    margin-top: 2.0rem;
  }
  p.success {
    padding: 0.48rem 0 0.346667rem 0;
    font-size: 0.48rem;
    font-weight: bold;
    color: #202020;
  }
  p.soon {
    font-size: 0.346667rem;
    color: #999;
    padding-bottom: 0.373333rem;
  }
  .btn-container{
    text-align: center;
    margin: 0 1.2rem;
    span.btn{
      width: 100%;
      height: 1.12rem;
      margin: 0 auto;
      margin-bottom: 0.266667rem;
      display: block;
      border-radius: 0.56rem;
      font-size: 0.426667rem;
      //font-weight: bold;
      line-height: 1.12rem;
      text-align: center;
    }
    span.btn-detail{
      border: 1px solid #e71002;
      background-color: #e71002;
      color: #fff;
    }
    span.btn-back{
      border: 1px solid #d2d2d2;
      color: #666;
    }
  }
}
</style>
