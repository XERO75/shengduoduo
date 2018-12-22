<template>
  <div id="sign">
    <img src="./../../image/miduoduo@2x.png" class="sign-avatar" alt="">
    <div class="sign-form">
      <form action="" class="f-column">
        <input type="text" placeholder="请输入您的手机号码" >
        <div class="sign-verify">
          <input class="sign-verify__input" type="text" placeholder="请输入验证码">
          <span v-show="sendAuthCode" @click="getAuthCode">获取验证码</span>
          <span v-show="!sendAuthCode">{{auth_time}}秒后重新发送</span>
        </div>
        <input type="text" placeholder="请输入登录密码">
        <input type="password" placeholder="请再次输入登录密码">
        <button class="sign-button">立即注册</button>
      </form>
    </div>
    <p @click="onClickLogin" class="sign-tips">
      已有账号，直接登录
    </p>
    <div class="sign-contract">
      注册代表您同意《米多多用户协议》
    </div>
  </div>
</template>
<script>
import { Field, Button } from 'vant';
export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button
  },
  data() {
    return{
      sendAuthCode: true,
      auth_time: 0
    }
  },
  methods: {
    getAuthCode:function () {
      this.sendAuthCode = false;
      this.auth_time = 6;
      var auth_timetimer =  setInterval(()=>{
          this.auth_time--;
          if(this.auth_time<=0){
              this.sendAuthCode = true;
              clearInterval(auth_timetimer);
          }
      }, 1000);
    },
    onClickLogin() {
      this.$router.push({path:'/login'})
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  #sign {
    position: relative;
    height: 100%;
    .sign-avatar {
      display: block;
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
      padding: 1.04rem 0;
      // margin: 1.04rem auto .933333rem;
    }
    .sign-form {
      margin: 0 1.066667rem;
      input::-webkit-input-placeholder { 
        color: #c5c5c5; 
      }
      .sign-verify {
        position: relative;
        .sign-verify__input {
          width: 93%;
        }
        span {
          position: absolute;
          top: .333333rem;
          right: 0.533333rem;
          font-size: .4rem;
          color: #2e2d2d;
        }
      }
      input {
        height: 1.173333rem;
        border: 1px solid #e5e5e5;
        border-radius: .586667rem;
        padding-left: 0.533333rem;
        font-size: .4rem;
        color: #c5c5c5;
        margin-bottom: .266667rem;
      }
      .sign-button {
        height: 1.173333rem;
        margin-bottom: .266667rem;
        background: #e64a19;
        color: #ffffff;
        font-size: .426667rem;
        border: 1px solid #e64a19;
        border-radius: .586667rem;
      }
    }
    .sign-tips {
      text-align: center;
      font-size: .32rem;
      color: #2e2d2d;
    }
    .sign-contract {
      position: absolute;
      width: 100%;
      font-size: .32rem;
      color: #999999;
      bottom: .4rem;
      text-align: center;
    }
  }
</style>