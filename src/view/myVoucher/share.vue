<template>
  <div id="myVoucher-share">
    
    
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
      this.$router.back(-1);
    },
  },
  mounted(){
    // this.type = this.$route.query.type;
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#myVoucher-share{

}
</style>
