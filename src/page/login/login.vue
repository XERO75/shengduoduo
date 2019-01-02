<template>
  <div id="login">
    <img src="./../../image/miduoduo@2x.png" class="login-avatar" alt="">
    <div class="login-form">
      <form action="/" class="f-column">
        <input v-model="userName" type="text" placeholder="请输入米高e购会员账号">
        <input v-model="userPwd" type="password" placeholder="请输入登录密码">
        <button type="button" class="login-button" @click="onClickLogin">立即登录</button>
      </form>
    </div>
    <p class="login-tips" @click="gotoSign">
      没有账号？立即注册
    </p>
  </div>
</template>
<script>
import { Field, Button, Toast } from 'vant';
import { handleLogin } from '@/api/login.js'
export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  data() {
    return {
      userName:'',
      userPwd: ''
    }
  },
  methods: {
    gotoSign() {
      this.$router.push({path: '/sign'})
    },
    onClickLogin() {
      if (this.userName == '') {
        Toast.fail('账号不能为空')
      } else if (this.userPwd == '') {
        Toast.fail('密码不能为空')
      } else {
        let formdata = new FormData();
        formdata.append('username', this.userName);
        formdata.append('password', this.userPwd);
        handleLogin(formdata).then(res=>{
          if (res.data.code === 0) {
            console.log(res);
          } else Toast.fail(res.data.errmsg)
        }).catch()
      }

    }
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  #login {
    position: relative;
    height: 100%;
    background: #fff;
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
        background: #8FC221;
        color: #ffffff;
        font-size: .426667rem;
        border: 1px solid #8FC221;
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
