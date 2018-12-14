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
  </div>
</template>
<script>
import { Tab, Tabs } from 'vant';
import HomePage from './home'
import SortPage from './sort'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    HomePage,
    SortPage,
  },
  data(){
    return{
      active: 0,
    }
  },
  methods: {

  },
  mounted(){
  
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#home-tab{


}
</style>
