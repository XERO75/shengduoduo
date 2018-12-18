<template>
  <div id="home-tab">
    <van-tabs v-model="active">
      <van-tab title="热门">
        <div class="home">
          <home-page></home-page>
        </div>
      </van-tab>
      <van-tab title="服饰">
        <sort-page></sort-page>
      </van-tab>
      <van-tab title="鞋包">
        <sort-page></sort-page>
      </van-tab>
      <van-tab title="母婴">
        <sort-page></sort-page>
      </van-tab>
      <van-tab title="特产">
        <sort-page></sort-page>
      </van-tab>
      <van-tab title="百货">
        <sort-page></sort-page>
      </van-tab>
    </van-tabs>
    <div class="bottom_tab">
      <van-row>
        <van-col span="6"><div><img src="./../../pic/n1.png"></div></van-col>
        <van-col span="6"><div @click=""><img src="./../../pic/n2.png"></div></van-col>
        <van-col span="6"><div @click=""><img src="./../../pic/n2.png"></div></van-col>
        <van-col span="6"><div @click="onClickMine"><img src="./../../pic/n3.png"></div></van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs, Row, Col } from 'vant';
import HomePage from './home'
import SortPage from './sort'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Row.name]: Row,
    [Col.name]: Col,
    HomePage,
    SortPage,
  },
  data(){
    return{
      active: 0,
    }
  },
  methods: {
    onClickMine(){
      this.$router.push({path:'/mine'})
    }
  },
  mounted(){
  
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#home-tab{


}
</style>
