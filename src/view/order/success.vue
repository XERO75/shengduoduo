<template>
  <div id="pay-success">
    <img src="./../../img/支付成功@2x.png">
    <p class="success">支付成功</p>
    <p class="soon">您的订单正在火速处理</p>
    <div class="btn-container">
      <span class="btn btn-detail" @click="onClickOrder">查看订单</span>
      <span class="btn btn-back" @click="onClickIndex">返回首页</span>
    </div>
    <div class="redPacket" v-if="keyCode">
      <span class="btn-share" @click="onClickShare">分享获得红包</span>
    </div>
    <van-popup v-model="show">
      <p>点击右上角菜单</p>
      <p>【分享给好友】</p>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Toast } from 'vant';
import wx from 'weixin-js-sdk';
import { getWXConfigure } from "@/api/share";
import { getBannerKeyCode } from "@/api/banner";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Popup.name]: Popup,
    [Toast.name]: Toast,
  },
  data(){
    return{
      type: '',
      show: false,
      keyCode: '',

      appId: '',
      jsapi_ticket: '',
      signature: '',
      nonceStr: '',
      timestamp: '',
      url: '',
    }
  },
  methods: {
    onClickOrder() {
      this.$router.push({path:'/order/detail',query:{sn:this.$route.query.sn}});
    },
    onClickIndex() {
      this.$router.push({path:'/shop'});
    },
    onClickShare() {
      this.show = true;
      let that = this;
      // let sourcePath = window.location.href; //分享本页
      let sourcePath = 'http://yantang.ittun.com/app/member/dist/index.html?WX_TYPE=OfficialAccount#/banner?code='+this.keyCode;
      sourcePath = sourcePath.replace("#","%23");
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
            desc: '你有一个红包待领取',
            link: sourcePath,
            imgUrl: 'http://img1.imgtn.bdimg.com/it/u=661260060,1668025219&fm=26&gp=0.jpg',
            trigger: function (res) {
              // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            },
            success: function (res) {
              that.show = true;
              let formdata = new FormData();
              formdata.append('code',that.code);
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
            desc: '你有一个红包待领取',
            link: sourcePath,
            imgUrl: 'http://img1.imgtn.bdimg.com/it/u=661260060,1668025219&fm=26&gp=0.jpg',
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            },
            success: function (res) {
              let formdata = new FormData();
              formdata.append('code',that.code);
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
            desc: '你有一个红包待领取',
            link: sourcePath,
            imgUrl: 'http://img1.imgtn.bdimg.com/it/u=661260060,1668025219&fm=26&gp=0.jpg',
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            },
            success: function (res) {
              let formdata = new FormData();
              formdata.append('code',that.code);
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
            desc: '你有一个红包待领取',
            link: sourcePath,
            imgUrl: 'http://img1.imgtn.bdimg.com/it/u=661260060,1668025219&fm=26&gp=0.jpg',
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            },
            success: function (res) {
              let formdata = new FormData();
              formdata.append('code',that.code);
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
  },
  mounted(){
    handleLogin();
    getBannerKeyCode().then((res)=>{
      this.keyCode = res.data.data;
    })
    // this.type = this.$route.query.type;
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#pay-success{
  text-align: center;
  position: relative;
  min-height: 100%;
  img{
    width: 1.893333rem;
    height: 2.24rem;
    margin-top: 2.0rem;
  }
  p.success {
    padding: 0.48rem 0 0.346667rem 0;
    font-size: 0.48rem;
    font-weight: bold;
    color: #202020;
  }
  p.soon {
    font-size: 0.346667rem;
    color: #999;
    padding-bottom: 0.373333rem;
  }
  .btn-container{
    text-align: center;
    margin: 0 1.2rem;
    span.btn{
      width: 100%;
      height: 1.12rem;
      margin: 0 auto;
      margin-bottom: 0.266667rem;
      display: block;
      border-radius: 0.56rem;
      font-size: 0.426667rem;
      //font-weight: bold;
      line-height: 1.12rem;
      text-align: center;
    }
    span.btn-detail{
      border: 1px solid #e71002;
      background-color: #e71002;
      color: #fff;
    }
    span.btn-back{
      border: 1px solid #d2d2d2;
      color: #666;
    }
  }
  .redPacket{
    width: 9.133333rem;
    height: 4.506667rem;
    background: url(./../../img/分享获得红包@2x.png) no-repeat;
    -webkit-background-size: 9.133333rem 4.506667rem;
    background-size: 9.133333rem 4.506667rem;
    position: absolute;
    bottom: 1.28rem;
    left: 50%;
    margin-left: -4.56rem;
    span.btn-share{
      width: 4.4rem;
      height: 1.173333rem;
      line-height: 1.173333rem;
      border-radius: 0.586667rem;
      display: block;
      color: #964112;
      font-size: 0.4rem;
      font-weight: bold;
      background-image: linear-gradient(to bottom, #fdf4d4,#f9eb9c);
      position: absolute;
      bottom: 1.28rem;
      right: 0.586667rem;
    }
  }
  .van-popup{
    padding: 0.666667rem 0;
    width: 75%;
    border-radius: 0.133333rem;
    top: 15%;
    font-size: 0.373333rem;
  }
}
</style>
