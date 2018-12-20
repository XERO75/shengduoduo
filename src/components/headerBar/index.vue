<template>
  <div id="header-bar">
  <p>
    <i class="icon-back" @click="onClickBack"></i>
    {{title}}
    <i class="icon-cart" @click="onClickCart"></i>
    <i class="icon-more"></i>
  </p>
  </div>
</template>

<script>
import {  } from 'vant';
export default {
  components: {
    // [Tab.name]: Tab,
  },
  props:{
    title: String,
  },
  data(){
    return{
      // title: '',
    }
  },
  methods: {
    onClickBack(){
      this.$emit('back');
    },
    onClickCart(){
      this.$emit('cart');
    },
  },
  mounted(){

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#header-bar{
  width: 100%;
  height: 1.2rem;
  text-align: center;
  background-color: #e64a19;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1500;
  p{
    line-height: 1.2rem;
    text-align: center;
    font-size: 0.48rem;
    position: relative;
    i.icon-back{
      width: 0.28rem;
      height: 0.506667rem;
      display: block;
      position: absolute;
      left: 0.32rem;
      top: 50%;
      margin-top: -0.253333rem;
      background: url(./../../image/导航返回@2x.png) no-repeat;
      -webkit-background-size: 0.28rem 0.506667rem;
      background-size: 0.28rem 0.506667rem;
    }
    i.icon-cart{
      width: 0.64rem;
      height: 0.533333rem;
      display: block;
      position: absolute;
      right: 1.2rem;
      top: 50%;
      margin-top: -0.266667rem;
      background: url(./../../image/导肮购物车@2x.png) no-repeat;
      -webkit-background-size: 0.64rem 0.533333rem;
      background-size: 0.64rem 0.533333rem;
    }
    i.icon-more{
      width: 0.56rem;
      height: 0.133333rem;
      display: block;
      position: absolute;
      right: 0.32rem;
      top: 50%;
      margin-top: -0.066667rem;
      background: url(./../../image/导航更多@2x.png) no-repeat;
      -webkit-background-size: 0.56rem 0.133333rem;
      background-size: 0.56rem 0.133333rem;
    }
  }
}
</style>
