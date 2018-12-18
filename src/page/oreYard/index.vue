<template>
  <div id="treasure">
    <div class="treasure-top">
      <img src="./../../pic/开发中.jpeg">
    </div>
    <div class="treasure-bottom">
      <img src="./../../pic/矿场.jpeg" alt="">
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  #treasure {
    position: relative;
    height: 100%;
    background-color: #fff;
    .treasure-top {
      img {
        display: block;
        width: 3rem;
        // margin: 0 auto;
        position: absolute;
        top: 8%;
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