<template>
  <div id="myVoucher-success">
    <img src="./../../img/退卡@2x.png">
    <p class="success">退卡成功</p>
    <p class="soon">您支付的货款会在1到3个工作日内返还</p>
    <span class="btn-back" @click="onClickBack">返回</span>
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
    onClickBack() {
      this.$router.push({path:'/myVoucher'});
    },
  },
  mounted(){
    // this.type = this.$route.query.type;
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#myVoucher-success{
  text-align: center;
  img{
    width: 2.4rem;
    height: 1.533333rem;
    margin-top: 4.0rem;
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
  span.btn-back{
    width: 2.986667rem;
    height: 0.88rem;
    display: inline-block;
    border: 1px solid #d2d2d2;
    border-radius: 0.44rem;
    font-size: 0.426667rem;
    color: #666;
    line-height: 0.88rem;
    text-align: center;
  }
}
</style>
