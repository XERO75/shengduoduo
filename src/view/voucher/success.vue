<template>
  <div id="voucher-success">
    <img src="./../../img/支付成功@2x.png">
    <p class="success">购买成功</p>
    <span class="btn-myCard" @click="onClickMyVoucher">查看我的优鲜卡</span>
  </div>
</template>

<script>
import {  } from 'vant';
// import { articleList } from "@/api/article"
export default {
  components: {
    // [Checkbox.name]: Checkbox,
  },
  data(){
    return{
      type: ''
    }
  },
  methods: {
    onClickMyVoucher() {
      this.$router.push({path:'/myVoucher'});
    },
  },
  mounted(){
    // this.type = this.$route.query.type;
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#voucher-success{
  text-align: center;
  img{
    width: 1.92rem;
    height: 2.306667rem;
    margin-top: 4.0rem;
  }
  p.success {
    padding: 0.48rem 0 0.346667rem 0;
    font-size: 0.48rem;
    font-weight: bold;
    color: #202020;
  }
  span.btn-myCard{
    padding: 0 0.266667rem;
    margin-top: 15px;
    width: 2.986667rem;
    height: 0.88rem;
    display: inline-block;
    border: 1px solid #d2d2d2;
    border-radius: 0.44rem;
    font-size: 0.373333rem;
    color: #666;
    line-height: 0.88rem;
    text-align: center;
  }
}
</style>
