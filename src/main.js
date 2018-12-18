// import './common/rem';
import Vue from 'vue';
import App from './App.vue';
// import { router } from './router';
import { router } from './newRouter';
import store from "./store.js";

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
