<template>
  <div id="return-refund">
    <div class="product-container">
      <img src="./../../pic/box.png">
      <div class="product-item">
        <div class="item-left">
          <p class="item-name">考核会计阿斯加德库巴姬爱神的箭安康市道具卡含税单价卡时间的话卡萨丁按时间看大家
          </p>
          <p>交换空间还款计划看空间客家话</p>
        </div><div class="item-right">
          <p class="price">&yen;745</p>
          <p class="count">X4545</p>
        </div>
      </div>
    </div>
    <div class="form-container">
      <div class="form-top">
        <p class="select">货物状态<span>请选择</span></p>
        <p class="select" @click="showReason=true">退款原因<span>请选择</span></p>
        <!-- <div class="count">
          <p>退货数量<span>（最多可选1个）</span></p>
          <div class="count-box">
            <van-stepper v-model="count" integer :min="1" :max="99" />
          </div>   
        </div> -->
        <!-- <div class="address" @click="onClickAddress">
          <p class="title">收货地址：</p>  
          <div class="content">
            <p class="receiver">萨达 1547753653</p>
            <p class="place">时间的话计划计划计划</p>
          </div>
        </div> -->
        <p>退款金额：<span>&yen; 12.5</span></p>
      </div>
      <p class="form-tips">最多&yen;12.5，含发货邮费 &yen;5.00</p>
      <div class="form-bottom">
        <p class="reason"><span>退款说明：</span><input type="text" placeholder="选填"></p>
        <div class="upload">
          <p class="title">上传凭证：</p>
          <van-uploader :after-read="onRead" accept="image/jpeg" multiple>
            <div v-if="images.length" v-for="n in images" class="img-box">
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
    <van-popup class="reason-popup" position="bottom" v-model="showReason">
      <div class="popup-box">
        <p class="title">退款原因</p>
        <div class="content">
          <p class="reason checked">7天无理由退换货</p>
          <p class="reason">退运费</p>
          <p class="reason">大小/重量与商品描述不符</p>
        </div>
        <van-button @click="showDelivery=false">提交</van-button>
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
      showReason: false,
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
  background-color: #f6f6f6;
  min-height: 100%;
  position: relative;
  .product-container{
    padding: 0.373333rem 15px;
    position: relative;
    background-color: #fff;
    border-bottom: 10px solid #f6f6f6;
    img{
      position: absolute;
      width: 1.52rem;
      height: 1.52rem;
    }
    .product-item{
      padding-left: 70px;
      height: 1.52rem;
      &:last-child{
        border-bottom: 0;
      }
      .item-left{
        width: 75%;
        display: inline-block;
      }
      .item-right{
        vertical-align: top;
        width: 25%;
        display: inline-block;
        p{
          text-align: right;
        }
      }
    }
  }
  .form-container{
    background-color: #fff;
    .form-top{
      padding-left: 15px;
      p{
        padding-right: 15px;
        line-height: 36px;
      }
      p.select{
        position: relative;
        border-bottom: 1px solid #f6f6f6;
        &:after{
          content: '';
          width: 16px;
          height: 16px;
          display: block;
          position: absolute;
          right: 15px;
          top: 50%;
          margin-top: -8px;
          background: url(./../../image/MORE@2x.png) no-repeat;
          -webkit-background-size: 16px 16px;
          background-size: 16px 16px;
        }
        span{
          float: right;
          padding-right: 20px;
        }
      }
      div.count{
        position: relative;
        height: 1.466667rem;
        border-bottom: 1px solid #f6f6f6;
        div.count-box {
          display: inline-block;
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
      line-height: 36px;
      padding-left: 15px;
      background-color: #f6f6f6;
    }
    .form-bottom{
      padding-left: 15px;
      padding-bottom: 10px;
      p.reason{
        line-height: 36px;
        border-bottom: 1px solid #f6f6f6;
        span{
          display: inline-block;
        }
        input{
          border: 0;
        }
      }
      div.upload{
        p.title{
          line-height: 32px;
        }
        div.img-box{
          width: 70px;
          height: 70px;
          border: 1px solid #f6f6f6;
          display: inline-block;
          margin-right: 20px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        div.upload-box{
          width: 70px;
          height: 70px;
          border: 1px dashed #eee;
          text-align: center;
          display: inline-block;
          vertical-align: top;
          img{
            width: 30px;
            height: 30px;
            
          }
          p{

          }
        }
      }

    }
  }
  .btn-container{
    width: 100%;
    height: 50px;
    text-align: center;
    padding: 30px 0;
    button{
      width: 90%;
      height: 50px;
      background-color: #e64a19;
      color: #fff;
      border-radius: 25px;
      margin: 0 auto;
    }
  }
  .popup-box{
    height: 290px;
    .title{
      text-align: center;
      line-height: 40px;
      border-bottom: 1px solid #f6f6f6;
      position: relative;
      i.icon-close{
        content: '';
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        right: 15px;
        top: 50%;
        margin-top: -7px;
        background: url(./../../image/MORE@2x.png) no-repeat;
      }
    }
    .content{
      padding-left: 15px;
      p.reason{
        line-height: 40px;
        position: relative;
        border-bottom: 1px solid #f6f6f6;
        &:after{
          content: '';
          width: 17px;
          height: 17px;
          display: block;
          background: url(./../../image/MORE@2x.png) no-repeat;
          -webkit-background-size: 17px 17px;
          background-size: 17px 17px;
          position: absolute;
          top: 50%;
          margin-top: -9px;
          right: 15px;
        }
        &.checked:after{
          content: '';
          width: 17px;
          height: 17px;
          display: block;
          background: url(./../../image/MORE@2x.png) no-repeat;
          -webkit-background-size: 17px 17px;
          background-size: 17px 17px;
          position: absolute;
          top: 50%;
          margin-top: -9px;
          right: 15px;
        }
      }
    }
    button{
      width: 90%;
      height: 44px;
      margin: 0 auto;
      border: 0;
      background-color: #e64a19;
      color: #fff;
      border-radius: 22px;
      position: absolute;
      left: 50%;
      transform: translate(-50%,0);
      bottom: 15px;        
    }
  }
}
</style>
