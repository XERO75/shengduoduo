<template>
  <div id="myVoucher-detail">
    <div class="card-container">
      <img :src="detail.secondLevelImage">
    </div>
    <p class="money">面值&nbsp;<strong>&yen; <span>{{detail.value.replace('.00','')}}</span></strong></p>
    <div class="rule-container">
      <p class="title">使用规则</p>
      <p class="content">1.礼品卡需要在有效期内使用，过期作废。</p>
      <p class="content">2.礼品卡不予兑换，购物金额不足部分以现金补偿。</p>
      <p class="content">3.礼品卡支付部分不开发票。</p>
      <p class="content">4.发生退货时，礼品卡支付部分退回卡内，不予兑现。</p>
      <p class="content">5.礼品卡一旦绑定，将只能被绑定账号使用，不能夸账户使用。</p>
    </div>
    <div class="btn-container" v-if="detail.status=='WaitToGive'">
      <van-button class="btn-share" type="danger" @click="onClickShare">赠送给好友</van-button>
      <van-button class="btn-return" type="default" @click="onClickReturn">我要退卡</van-button>
    </div>
    <div class="btn-container" v-else>
      <van-button class="btn-back" type="default" @click="onClickBack">返回</van-button>
    </div>
    <van-popup v-model="show">
      <p>点击右上角菜单</p>
      <p>【分享给好友】</p>
    </van-popup>
  </div>
</template>

<script>
import { Button, Popup, Toast } from 'vant';
import wx from 'weixin-js-sdk';
import { getDetail, shareCard } from "@/api/myVoucher";
import { getWXConfigure } from "@/api/share";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
  },
  data(){
    return{
      show: false,
      detail: {},
      appId: '',
      jsapi_ticket: '',
      signature: '',
      nonceStr: '',
      timestamp: '',
      url: '',
    }
  },
  methods: {
    onClickBack(){
      this.$router.push({path:'/myVoucher'});
    },
    onClickShare() {
      this.show = true;
      let that = this;
      let sourcePath = window.location.href.replace("#","%23");
        // this.url = encodeURI(this.url.split('#')[0]+'&code='+this.detail.code);
        this.url = encodeURI(window.location.href.split('#')[0]);
        // console.log(window.location.href);
        // console.log(this.url);
      getWXConfigure(this.url).then(res=>{
        // console.log(res);
        this.appId = res.data.data.appId;
        this.jsapi_ticket = res.data.data.jsapi_ticket;
        this.signature = res.data.data.signature;
        this.nonceStr = res.data.data.noncestr;
        this.timestamp = res.data.data.timestamp;

        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: that.appId, // 必填，公众号的唯一标识
          timestamp: that.timestamp, // 必填，生成签名的时间戳
          nonceStr: that.nonceStr, // 必填，生成签名的随机串
          signature: that.signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareWeibo']
        })

        wx.ready(function(){
          wx.onMenuShareAppMessage({
            title: '燕塘牛奶',
            desc: '不是一般的牛奶都叫燕塘牛奶',
            link: sourcePath,
            imgUrl: 'http://img1.imgtn.bdimg.com/it/u=661260060,1668025219&fm=26&gp=0.jpg',
            trigger: function (res) {
              // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            },
            success: function (res) {
              let formdata = new FormData();
              formdata.append('code',that.detail.code);
              shareCard(formdata).then(response=>{
                if(response.data.code==0){
                  Toast('分享成功');
                  that.$router.go(0);
                }else{
                  Toast(response.data.errmsg);
                }
              })
            },
            cancel: function (res) {

            },
            fail: function (res) {

            }
          });

          // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
          wx.onMenuShareTimeline({
            title: '燕塘牛奶',
            desc: '不是一般的牛奶都叫燕塘牛奶',
            link: sourcePath,
            imgUrl: 'http://img1.imgtn.bdimg.com/it/u=661260060,1668025219&fm=26&gp=0.jpg',
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            },
            success: function (res) {
              let formdata = new FormData();
              formdata.append('code',that.detail.code);
              shareCard(formdata).then(response=>{
                if(response.data.code==0){
                  Toast('分享成功');
                  that.$router.go(0);
                }else{
                  Toast(response.data.errmsg);
                }
              })
            },
            cancel: function (res) {

            },
            fail: function (res) {

            }
          });

          // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
          wx.onMenuShareQQ({
            title: '燕塘牛奶',
            desc: '不是一般的牛奶都叫燕塘牛奶',
            link: sourcePath,
            imgUrl: 'http://img1.imgtn.bdimg.com/it/u=661260060,1668025219&fm=26&gp=0.jpg',
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            },
            success: function (res) {
              let formdata = new FormData();
              formdata.append('code',that.detail.code);
              shareCard(formdata).then(response=>{
                if(response.data.code==0){
                  Toast('分享成功');
                  that.$router.go(0);
                }else{
                  Toast(response.data.errmsg);
                }
              })
            },
            cancel: function (res) {

            },
            fail: function (res) {

            }
          });

          // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
          wx.onMenuShareWeibo({
            title: '燕塘牛奶',
            desc: '不是一般的牛奶都叫燕塘牛奶',
            link: sourcePath,
            imgUrl: 'http://img1.imgtn.bdimg.com/it/u=661260060,1668025219&fm=26&gp=0.jpg',
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            },
            success: function (res) {
              let formdata = new FormData();
              formdata.append('code',that.detail.code);
              shareCard(formdata).then(response=>{
                if(response.data.code==0){
                  Toast('分享成功');
                  that.$router.go(0);
                }else{
                  Toast(response.data.errmsg);
                }
              })
            },
            cancel: function (res) {

            },
            fail: function (res) {

            }
          });
        });
        //ready结束
        wx.error(function(res){
          alert('error:' + JSON.stringify(res))
        });
      })  
    },
    onClickReturn() {
      this.$router.push({path:'/myVoucher/return',query:{code:this.detail.code}});
    },
  },
  mounted(){
    handleLogin();
      let code = this.$route.query.code;
      getDetail(code).then(res=>{
        if(res.data.code==0){
          console.log(res);
          this.detail = res.data.data;
        }else if(res.data.code==2){
          this.$router.push({path:'/myVoucher/receive',query:{code:code}});
        }else{
          Toast(res.data.errmsg);
        }
      })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#myVoucher-detail{
  min-height: 100%;
  box-sizing: border-box;
  padding: 0.4rem;
  .card-container{
    margin: 0 0.426667rem;
    height: 4.0rem;
    img{
      width: 100%;
      height: 100%;
      border-radius: 0.266667rem;
    }
  }
  p.money{
    font-size: 0.4rem;
    color: #666;
    padding: 0.453333rem 0 0.4rem 0.426667rem;
    border-bottom: 1px solid #e5e5e5;
    strong{
      padding-left: 0.266667rem;
      font-size: 0.48rem;
      color: #202020;
      span{
        font-size: 0.8rem;
      }
    }
  }
  .rule-container{
    .title{
      padding: 0.533333rem 0 0.2rem 0;
      font-size: 0.4rem;
      color: #202020;
      font-weight: bold;
    }
    .content{
      font-size: 0.373333rem;
      color: #666;
      line-height: 0.666667rem;
    }
  }
  .btn-container{
    position: absolute;
    width: 100%;
    padding: 0 0.4rem;
    box-sizing: border-box;
    margin-left: -0.4rem;
    bottom: 0.64rem;
    .van-button{
      width: 100%;
      height: 1.173333rem;
      line-height: 1.173333rem;
      border-radius: 0.586667rem;
      font-size: 0.426667rem;
      color: #fff;
    }
    .btn-share{
      background-color: #e70012;
      margin-bottom: 0.266667rem;
    }
    .btn-return{
      background-color: #fff;
      color: #666;
      border: none;
      border: 1px solid #d2d2d2;
    }
    .btn-back{
      background-color: #e5e5e5;
      color: #666;
      border: none;
    }
  }
  .van-popup{
    padding: 0.666667rem 0;
    width: 75%;
    border-radius: 0.133333rem;
    top: 15%;
    font-size: 0.373333rem;
    text-align: center;
  }
}
</style>
