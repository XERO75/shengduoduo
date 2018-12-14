// import './common/rem';
import Vue from 'vue';
import App from './App.vue';
// import { router } from './router';
import { router } from './newRouter';
import store from "./store.js";

import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'fa88b622064b112e8caefeb05f40b790',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.10'
});

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
