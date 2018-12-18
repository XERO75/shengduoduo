<template>
  <div id="redPacket">
    <div class="redPacket-developing">
      <img src="./../../pic/develop.png" alt="">
      <span>正在开发中</span>
    </div>
    <div class="redPacket-envelope">
      <img src="./../../pic/redpacket.jpeg" alt="">
    </div>
    <div class="redPacket-bottom">
      <span>分享群好友领取红包</span>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  #redPacket {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    .redPacket-developing {
      border: 1.3px solid rgb(120, 120, 120);
      border-radius: 50%;
      width: 2.2rem;
      height: 2.2rem;
      position: relative;
      img {
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 50%;
        left: 28%;
        transform: translateY(-50%);
        // transform: translateX((-50%)
      }
      span {
        position: absolute;
        bottom: -25px;
        left: 12px;
        font-weight: bold;
      }
    }
    .redPacket-envelope {
      img {
        width: 3rem;
      }
    }
    .redPacket-bottom {
      width: 70%;
      text-align: center;
      padding: .5rem;
      border: 1px solid rgb(204, 204, 204);
      background: rgb(242, 242, 242);
      color: rgb(153, 153, 153);
      font-size: 14px;
      border-radius: 30px;
    }
  }
</style>