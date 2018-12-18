<template>
  <div id="shop-h5">
    <div v-html="content"></div>
  </div>
</template>

<script>
// import { Tabs } from 'vant';
import { getH5 } from "@/api/shop";
import { handleLogin } from "@/api/login";
export default {
  components: {

  },
  data(){
    return{
      id: '',
      type: '',
      content: ''
    }
  },
  methods: {
    // onClickPoints() {
    //   this.$router.push({path:'/points/coupon'});
    // },
  },
  mounted(){
    handleLogin();
      this.type = this.$route.query.type;
      this.id = this.$route.query.id;
      getH5(this.id,this.type).then(res=>{
        console.log(res);
        this.content = res.data.data.content;
      })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#shop-h5{
  overflow-x: hidden;
  table{
    width: 100%!important;
  }
  img{
    max-width: 100%;
  }
  vidio{
    max-width: 100%;
  }
}
</style>
