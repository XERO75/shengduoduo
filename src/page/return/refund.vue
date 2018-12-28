<template>
  <div id="return-refund">
    <div class="product-container clearfix">
      <img src="./../../pic/box.png">
      <div class="product-item clearfix">
        <div class="item-left">
          <p class="item-name overTwoLine">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda distinctio natus quis saepe et nemo doloribus iste aliquid incidunt fugiat.</p>
          <p class="item-type">lorem</p>
        </div>
        <div class="item-right">
          <p class="price">&yen;745</p>
          <p class="count">X5</p>
        </div>
      </div>
    </div>
    <div class="form-container">
      <div class="form-top">
        <p class="select" @click="showStatus=true">货物状态<span>请选择</span></p>
        <p class="select" @click="showReason=true">退款原因<span>请选择</span></p>
        <p class="amount"> 退款金额：<span>&yen; 12.5</span></p>
      </div>
      <p class="form-tips">最多&yen;12.5，含发货邮费 &yen;5.00</p>
      <div class="form-bottom">
        <p class="reason"><span>退款说明：</span><input type="text" placeholder="选填"></p>
        <div class="upload">
          <p class="title">上传凭证：</p>
          <van-uploader :after-read="onRead" accept="image/jpeg" multiple>
            <div v-if="images.length" v-for="n in images" :key="n.index" class="img-box">
              <img :src="n">
            </div>
            <div v-if="images.length<3" class="upload-box">
              <img src="./../../image/MORE@2x.png">
              <p>上传凭证</p>
              <p>（最多3张）</p>
            </div>
          </van-uploader>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <van-button>提交</van-button>
    </div>
    <!-- 订单状态弹出层 -->
    <van-popup class="useCoupon-popup" position="bottom" v-model="showStatus">
      <div class="popup-box">
        <p class="title f-center">货物状态</p>
        <div class="content">
          <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">生成日期/保质期与商品描述不符</p>
            </div>
            <div>
              <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
            </div>
          </div>
          <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">标签/批次/包装/成分等与商品描述不符</p>
            </div>
            <div>
              <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
            </div>
          </div>
        </div>
        <van-button class="popup-status__button" @click="showUseCoupon=false">确定</van-button>
      </div>
    </van-popup>
    <!-- 退款原因弹出层 -->
    <van-popup class="reason-popup" position="bottom" v-model="showReason">
      <div class="popup-box">
        <p class="title f-center">退款原因</p>
        <div class="content">
          <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">7天无理由退换货</p>
            </div>
            <div>
              <img v-if="!checked" mode="widthFix" src="../../image/选择@2x.png" @click="checked = !checked"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png" @click="checked = !checked"/>
            </div>
          </div>
           <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">退运费</p>
            </div>
            <div>
              <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
            </div>
          </div>
           <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">大小/重量与商品描述不符</p>
            </div>
            <div>
              <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
            </div>
          </div>
           <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">生成日期/保质期与商品描述不符</p>
            </div>
            <div>
              <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
            </div>
          </div>
           <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">标签/批次/包装/成分等与商品描述不符</p>
            </div>
            <div>
              <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
            </div>
          </div>
           <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">商品变质/发霉/有异物</p>
            </div>
            <div>
              <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
            </div>
          </div>
           <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">质量问题</p>
            </div>
            <div>
              <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
            </div>
          </div>
           <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">少件/漏发</p>
            </div>
            <div>
              <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
            </div>
          </div>
           <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">包装/商品破损</p>
            </div>
            <div>
              <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
            </div>
          </div>
           <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">发票问题</p>
            </div>
            <div>
              <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
            </div>
          </div>
           <div class="coupon f-space-between">
            <div class="f-column">
              <p class="value">卖家发错货</p>
            </div>
            <div>
              <img v-if="false" mode="widthFix" src="../../image/选择@2x.png"/>
              <img v-else mode="widthFix" src="../../image/未选择@2x.png"/>
            </div>
          </div>
        </div>
        <van-button @click="showUseCoupon=false">确定</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast, Uploader, Button, Popup, Stepper } from 'vant';
// import { getDetail, cancelOrder, getComment, handleCommit } from "@/api/order";
// import { handleLogin } from "@/api/login";
// import { WXPay, payFree } from "@/api/pay";
export default {
  components: {
    [Toast.name]: Toast,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Stepper.name]: Stepper,
  },
  data(){
    return{
      showStatus: false,
      showReason: false,

      checked: false,

      images: [],
      count: 1,
    }
  },
  computed: {

  },
  methods: {
    onRead(file){
      if(this.images.length<3){
        console.log(file);
        this.images.push(file.content);
      }else{
        Toast('最多只能上传三张图片');
      }
    },
    onClickAddress(){
      this.$router.push({path:'/address'})
    },
  },
  mounted(){

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#return-refund{
  position: relative;
  .product-container {
    padding: .48rem .4rem .453333rem ;
    border-bottom: 10px solid #f6f6f6;
    img{
      float: left;
      width: 2rem;
      height: 2rem;
      margin-right: .48rem;
    }
    .product-item{
      padding-left: 70px;
      height: 1.52rem;
      &:last-child{
        border-bottom: 0;
      }
      .item-left{
        display: inline-block;
        .item-name {
          font-size: .4rem;
          width: 5rem;
        }
        .item-type {
          font-size: .35rem;
          color:#999999;
        }
      }
      .item-right{
        float: right;
        vertical-align: top;
        display: inline-block;
        p{
          text-align: right;
        }
        .price {
          font-size: .4rem;
          color: rgb(230, 74, 25)
        }
        .count {
          font-size: .35rem;
          color: #999999;
        }
      }
    }
  }
  .form-container{
    background-color: #fff;
    .form-top{
      padding-left: 15px;
      p{
        line-height: 1.2rem;
        padding-right: 15px;
      }
      p.amount {
        position: relative;
        font-size: .4rem;
        color: #2e2d2d;
        span {
          color: #8FC221;
        }
      }
      p.select{
        position: relative;
        font-size: .4rem;
        color: #2e2d2d;
        border-bottom: 1px solid #f6f6f6;
        &:after{
          content: '';
          width: 16px;
          height: 16px;
          display: block;
          position: absolute;
          right: 12px;
          top: 50%;
          margin-top: -5px;
          background: url(./../../image/MORE@2x.png) no-repeat;
          -webkit-background-size: 16px 16px;
          background-size: 7px 11px;
        }
        span{
          float: right;
          padding-right: 20px;
          color: #999999;
        }
      }
      div.count{
        position: relative;
        height: 1.466667rem;
        border-bottom: 1px solid #f6f6f6;
        div.count-box {
          // display: inline-block;
          float: right;
          line-height: 0.533333rem;
          position: absolute;
          right: 15px;
          top: 0;
          height: 100%;
          .van-stepper{
            margin-top: 0.346667rem;
          }
        }
      }
      div.address{
        border-bottom: 1px solid #f6f6f6;
        position: relative;
        &:after{
          content:'';
          width: 16px;
          height: 16px;
          display: block;
          background: url(./../../image/MORE@2x.png) no-repeat;
          -webkit-background-size: 16px 16px;
          background-size: 16px 16px;
          position: absolute;
          right: 15px;
          top: 50%;
          margin-top: -8px;
        }
        p.title{
          display: inline-block;
          vertical-align: top;
        }
        div.content{
          display: inline-block;
          padding-right: 60px;
          p.receiver{

          }
          p.place{

          }
        }
      }
    }
    .form-tips{
      line-height: 1.066667rem;
      font-size: .32rem;
      color: #999999;
      padding-left: 15px;
      background-color: #f6f6f6;
    }
    .form-bottom{
      // height: 3.6rem;
      padding-left: 15px;
      padding-bottom: 10px;
      border-bottom: 10px solid #f6f6f6;
      p.reason{
        // line-height: 36px;
        line-height: 1.2rem;
        font-size: .4rem;
        border-bottom: 1px solid #f6f6f6;
        span{
          display: inline-block;
        }
        input{
          border: 0;
        }
      }
      div.upload{
        height: 2.8rem;
        padding: .4rem 0;
        p.title{
          line-height: 32px;
          font-size: .4rem;
        }
        .upload-box{
          width: 2.133333rem;
          height: 2.133333rem;
          border: 1px dashed #eee;
          text-align: center;
          display: inline-block;
          vertical-align: top;
          img{
            width: 12px;
            height: 15px;
            padding: 10px;
          }
          p{

          }
        }
      }

    }
  }
  .btn-container{
    position: fixed;
    bottom:0;
    // background: #f6f6f6;
    width: 100%;
    height: 50px;
    text-align: center;
    padding: 30px 0;
    button{
      width: 90%;
      height: 50px;
      background-color: #8FC221;
      color: #fff;
      border-radius: 25px;
      margin: 0 auto;
    }
  }
  .popup-box{
    height: 343px;
    .title{
      border-bottom: 1px solid #eee;
      position: relative;
      height: 1.333333rem;
      font-size: .426667rem;
      font-weight: bold;
      color: #2e2d2d;
      // .icon-close{
      //   width: 20px;
      //   height: auto;
      //   position: absolute;
      //   right: 15px;
      //   top: 29%;
        // background: url(./../../image/MORE@2x.png) no-repeat;
        // background: url(./../../image/A9@2x.png) no-repeat;
      // }
    }
    .content{
      margin: 0 15px;
      // 弹出层优惠券主体
      .coupon-container{
        position: relative;
        min-height: 96px;
        margin-top: 15px;
        // font-family: 'PingFangBold'
        img{
          width: 100%;
          position: absolute;
          z-index: 1;
        }
        .price{
          font-weight: bold;
          font-size: .96rem;
          color: #fff;
        }
        .tips{
          @extend .price;
          font-size: .346667rem;
        }
        .coupon-left{
          min-width: 35.6%;
          max-width: 35.6%;
          z-index: 2;
        }
        .coupon-right{
          margin-left: .506667rem;
          min-width: 58.8%;
          max-width: 58.8%;
          z-index: 2;
        }
        .name{
          font-size: .4rem;
          font-weight: bold;
          color: #2e2d2d;
        }
        .date{
          margin-top: .24rem;
          font-size: .32rem;
          color: #666;
        }
        .btn-got{
          margin-top: .266667rem;
          height: .613333rem;
          width: 1.893333rem;
          border-radius: .306667rem;
          color: #999;
          font-size: .293333rem;
          border: 1px solid #dcdcdc;
          position: relative;
          left: 60%;
        }
        .btn-get{
          @extend .btn-got;
          border: none;
          background-color: #8FC221;
          color: #fffeff;
        }
      }
      // 配送方式样式
      .delivery-item{
        height: 1.333333rem;
        border-bottom: 1px solid #eee;
        img{
          width: .533333rem;
          height: auto;
        }
        .type{
          font-size: .4rem;
          color: #2e2d2d;
        }
      }
      // 选择优惠券的优惠券样式
      div.coupon{
        position: relative;
        height: 1.733333rem;
        border-bottom: 1px solid #eee;
        p.value{
          font-size: .4rem;
          color: #2e2d2d;
        }
        p.name{
          margin-top: .186667rem;
          font-size: .32rem;
          color: #666;
        }
        img{
          width: .533333rem;
          height: auto;
        }
      }
    }
    button{
      width: 90%;
      height: 44px;
      border: 0;
      background-color: #8FC221;
      color: #fff;
      border-radius: 22px;
      // position: absolute;
      margin: .5rem 0;
      left: 50%;
      transform: translate(-50%,0);
      bottom: 0;
    }
    .popup-status__button {
      width: 90%;
      height: 44px;
      border: 0;
      background-color: #8FC221;
      color: #fff;
      border-radius: 22px;
      position: absolute;
      margin: .5rem 0;
      left: 50%;
      transform: translate(-50%,0);
      bottom: 0;
    }
  }
}
</style>
