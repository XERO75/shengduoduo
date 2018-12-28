<template>
  <div id="index">
    <van-tabbar v-model="active">
      <!-- <van-tabbar-item icon="home" v-bind:class="{ 'active' : currentView === 'home' }" @click="changeView('home')" >首页</van-tabbar-item> -->
      <van-tabbar-item @click="changeView(active)">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          src="../../assets/img/icon_home1@2x.png"
        >
      </van-tabbar-item>
      <van-tabbar-item @click="changeView(active)">
        <span>分类</span>
        <img
          slot="icon"
          slot-scope="props"
          src="../../assets/img/icon_fenlei@2x.png"
        >
      </van-tabbar-item >
      <van-tabbar-item @click="changeView(active)">
        <span>搜索</span>
        <img
          slot="icon"
          slot-scope="props"
          src="../../assets/img/icon_sousuo@2x.png"
        >
      </van-tabbar-item >
      <van-tabbar-item @click="changeView(active)">
        <span>购物车</span>
        <img
          slot="icon"
          slot-scope="props"
          src="../../assets/img/icon_gouwuche@2x.png"
        >
      </van-tabbar-item>
      <van-tabbar-item @click="changeView(active)">
        <span>我</span>
        <img
          slot="icon"
          slot-scope="props"
          src="../../assets/img/icon_me@2x.png"
        >
      </van-tabbar-item>
    </van-tabbar>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'
import Home from '@/page/home/index'
import Cart from '@/page/cart/index'
import Mine from '@/page/mine/index'

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    'home': Home,
    'cart': Cart,
    'mine': Mine
  },
  data() {
    return {
      active: 0,
      icon: {
        normal: '../../assets/img/icon_home1@2x.png',
        active: '../../assets/img/icon_home1@2x.png'
      },
      currentView: 'home'
    }
  },
  methods: {
    changeView (val) {
      switch (val) {
        case 0:
          this.currentView = 'home'
          break;
        case 1:
          this.currentView = ''
          break;
        case 2:
          this.currentView = ''
          break;
        case 3:
          this.currentView = 'cart'
          break;
        case 4:
          this.currentView = 'mine'
          break;
      
        default:
          break;
      }
      // this.currentView = view
    }
  },
}
</script>
<style lang="scss">
 #index {
   .van-tabbar-item {
     font-size: 12px;
     img {
       height: 25px;
     }
   }
   .van-tabbar-item__icon {
     margin-bottom: 2px;
   }
   .van-tabbar-item--active {
     color: #8FC221;
   }
 }
</style>
