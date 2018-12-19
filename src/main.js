// import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import Style from "./assets/css/main.css";
import FlexibleCss from "./assets/css/flexible.css";
import FlexibleJs from "./assets/js/flexible.js";

new Vue({
  router,
  Style,
  FlexibleCss,
  FlexibleJs,
  el: '#app',
  render: h => h(App)
});
