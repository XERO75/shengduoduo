<template>
  <div id="address-edit">
  </div>
</template>
<script>
import { Toast } from 'vant';
import { handleLogin } from "@/api/login";
import { getBannerKeyCode } from "@/api/banner"
export default {
  components: {
    [Toast.name]: Toast,
  },
  data(){
    return{

    }
  },
  computed:{

  },
  methods: {
   
  },
  mounted(){
    handleLogin();
      getBannerKeyCode().then(res=>{
        console.log(res)
      })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
