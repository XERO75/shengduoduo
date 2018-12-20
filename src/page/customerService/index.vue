<template>
  <div id="customerService">
    <div class="customerService-developing">
      <img src="./../../pic/开发中.jpeg" alt="">
      <!-- <p>正在开发中</p> -->
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
$fzm: PingFang-SC-Medium;
  #customerService {
    position: relative;
    height: 100%;
    background-color: #fff;
    display: flex;
    .customerService-developing {
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translateX(-50%);
      img {
        width: 3rem;
      }
      p {
        font-family: $fzm;
        text-align: center;
        position: relative;
        top: 15px;
        font-size: .346667rem;
        color: #999999;
      }
    }
  }
</style>