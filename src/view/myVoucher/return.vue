<template>
  <div id="myVoucher-return">
    <div class="card-container">
      <img :src="detail.image">
    </div>
    <p class="title">优鲜卡</p>
    <p class="content" v-for="n in detail.content">&yen;
      <span>{{n.value.replace('.00','')}}</span>
      <span class="fr">{{n.count}}</span>
    </p>
    <p class="tips">提示：退卡成功，将无法使用以上所有卡片。</p>
    <div class="btn-container">
      <van-button @click="onClickReturn">立即退卡（&yen;{{total}}）</van-button>
    </div>
  </div>
</template>

<script>
import { Toast, Button, Popup, Dialog } from 'vant';
import { getReturnDetail, returnCard } from "@/api/myVoucher";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
  },
  data(){
    return{
      show: false,
      detail: {},
      total: 0
    }
  },
  methods: {
    onClickReturn() {
      Dialog.confirm({
        title: '退卡',
        message: '是否确定退卡？',
      }).then(() => {
        let code = this.$route.query.code;
        let formdata = new FormData();
        formdata.append('code',code);
        returnCard(formdata).then(res=>{
          if(res.data.code == 0){
            this.$router.push({path:'/myVoucher/success'});
          }else{
            this.$router.push({path:'/myVoucher'});
            Toast(res.data.errmsg);
          }
        })
      }).catch(() => {
        // on cancel
      });
      
    },
  },
  mounted(){
    handleLogin();
      let code = this.$route.query.code;
      let formdata = new FormData();
      formdata.append('code',code)
      getReturnDetail(formdata).then(res=>{
        console.log(res);
        this.detail = res.data.data;
        for(let i=0;i<this.detail.content.length;i++) {
          this.total += Number(this.detail.content[i].value) * this.detail.content[i].count;
        }
      })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#myVoucher-return{
  min-height: 100%;
  box-sizing: border-box;
  padding: 0.4rem 0.826667rem;
  .card-container{
    height: 4.0rem;
    width: 100%;
    img{
      width: 100%;
      height: 100%;
      border-radius: 0.266667rem;
    }
  }
  p.title{
    font-size: 0.4rem;
    color: #666;
    line-height: 1.413333rem;
    border-bottom: 1px solid #e5e5e5;
  }
  p.content{
    font-size: 0.4rem;
    color: #202020;
    font-weight: bold;
    line-height: 1.413333rem;
    border-bottom: 1px solid #e5e5e5;
    span{
      font-size: 0.48rem;
    }
  }
  p.tips{
    padding-top: 0.266667rem;
    font-size: 0.32rem;
    color: #999;
  }
  .btn-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    button.van-button {
      height: 1.306667rem;
      width: 100%;
      font-size: 0.4rem;
      margin: 0;
      color: #fff;
      display: inline-block;
      padding: 0;
      border: none;
      background-color: #e70012;
      border-radius: unset;
    }
  }
}
</style>
