<template>
  <div id="treasure">
    <HeaderBar title="米多多矿场"></HeaderBar> 
    <div class="treasure-top">
      <img src="./../../pic/开发中.jpeg">
    </div>
    <!-- <div class="treasure-bottom">
      <img src="./../../pic/矿场.jpeg" alt="">
    </div> -->
  </div>
</template>
<script>
import HeaderBar from "@/components/HeaderBar";
export default {
  components: {
    HeaderBar
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  #treasure {
    padding-top: 1.2rem;
    box-sizing: border-box;
    position: relative;
    .treasure-top {
      img {
        display: block;
        width: 3rem;
        // margin: 0 auto;
        position: fixed;
        top: 35%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .treasure-bottom {
      img {
        position: absolute;
        bottom: 0;
        width: 100%;
      }
    }
  }
</style>