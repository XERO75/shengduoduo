<template>
  <div id="login">
    <img src="./../../image/miduoduo@2x.png" class="login-avatar" alt="">
    <div class="login-form">
      <form action="" class="f-column">
        <input type="text" placeholder="请输入米高e购会员账号">
        <input type="password" placeholder="请输入登录密码">
        <button class="login-button">立即登录</button>
      </form>
    </div>
    <p class="login-tips">
      没有账号？立即注册
    </p>
  </div>
</template>
<script>
import { Field, Button } from 'vant';
export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  #login {
    position: relative;
    height: 100%;
    .login-avatar {
      display: block;
      width: 2rem;
      height: 2rem;
      margin: 1.04rem auto .933333rem;
    }
    .login-form {
      margin: 0 1.066667rem;
      input::-webkit-input-placeholder { 
        color: #c5c5c5; 
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
      .login-button {
        height: 1.173333rem;
        margin-bottom: .266667rem;
        background: #e64a19;
        color: #ffffff;
        font-size: .426667rem;
        border: 1px solid #e64a19;
        border-radius: .586667rem;
      }
    }
    .login-tips {
      text-align: center;
      font-size: .32rem;
      color: #2e2d2d;
    }
  }
</style>