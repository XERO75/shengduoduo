<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
import { autoLogin } from "@/api/login"
export default {
  name:"app",
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive : true
    }
  },

  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive=true;
      })
    }
  },
  mounted(){
    autoLogin();
  }

}
</script>

<style>
/*html{
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app{
  width: 100%;
  height: 100%;
  font-size: 0.26rem;
  color: #202020;
  font-family: PingFang Regular;
}
.clearfloat:after{
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height:0
}
.clearfloat{
  zoom: 1;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.text-right{
  text-align: right;
}
.text-center{
  text-align: center;
}
p{
  margin: 0;
}
@font-face {
  font-family: 'PingFangBold';
  src:  url('./../static/fonts/PingFangBold.ttf');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'PingFangRegular';
  src:  url('./../static/fonts/PingFangRegular.ttf');
  font-weight: normal;
  font-style: normal;
}*/
</style>
