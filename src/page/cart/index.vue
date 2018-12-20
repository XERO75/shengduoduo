<template>
  <div id="cart">
    <HeaderBar title="购物车" @back="onClickBack"></HeaderBar>
    <div class="cart-item" v-for="(n,i) in cartList">
      <p class="store-name">
        <!-- <div @click="handleStoreCheck"> -->
          <i v-if="n.isSelected" class="icon-checked"></i>
          <i v-else class="icon-nocheck"></i>
        <!-- </div> -->
        <i class="icon-store"></i>
        {{n.shopName}} 
        <i class="icon-right"></i>
        <span @click="show=true">领券</span>
      </p>
      <div class="product-item" v-for="(p,j) in n.cartItems">
        <div @click="handleProductCheck(i,j)">
          <i v-if="p.isSelected" class="icon-checked"></i>
          <i v-else class="icon-nocheck"></i>
        </div>
        <img :src="n.img">
        <p class="product-name overTwoLine">{{p.productName}}<i class="icon-delete" @click="deleteCartItem(p.id)"></i></p>
        <div class="change">
          <div class="type">{{p.specifications}}</div> 
          <div class="stepper-container">
            <van-stepper v-model="p.count" integer :min="1" />
          </div>
        </div>
        <p class="price">&yen; {{p.price}}</p>
      </div>
    </div>
    <div class="btn-container">
      <div class="btn-left">
        <div @click="handleAllCheck">
          <i v-if="allSelected" class="icon-checked"></i>
          <i v-else class="icon-nocheck"></i>
        </div>
        <span>全选</span>
        <span class="fr">合计：<strong>&yen; {{totalPrice}}</strong></span>
      </div><div class="btn-pay">立即支付</div>
    </div>
    <van-popup position="bottom" v-model="show">
      <div class="popup-box">
        <p class="title">河南没事小店<i class="icon-close" @click="show=false"></i></p>
        <div class="content">
          <div class="coupon got">
            <div class="coupon-left">
              <p class="price">&yen; <span>5</span></p>
              <p class="tips">满100可用</p>
            </div><div class="coupon-right">
              <p class="name">店铺优惠券</p>
              <p class="date">有效期 2018.09.01-2018.09.01</p>
              <span class="btn-got">已领取</span>
            </div>
          </div>
          <div class="coupon">
            <div class="coupon-left">
              <p class="price">&yen; <span>5</span></p>
              <p class="tips">满100可用</p>
            </div><div class="coupon-right">
              <p class="name">店铺优惠券</p>
              <p class="date">有效期 2018.09.01-2018.09.01</p>
              <span class="btn-get">立即领取</span>
            </div>
          </div>
          <div class="coupon">
            <div class="coupon-left">
              <p class="price">&yen; <span>5</span></p>
              <p class="tips">满100可用</p>
            </div><div class="coupon-right">
              <p class="name">店铺优惠券</p>
              <p class="date">有效期 2018.09.01-2018.09.01</p>
              <span class="btn-get">立即领取</span>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast, Stepper, Dialog, Popup } from 'vant';
import HeaderBar from '@/components/HeaderBar';
import { getCartList, deleteCart, checkProduct, checkStore, checkAll } from '@/api/cart';
export default {
  components: {
    [Toast.name]: Toast,
    [Stepper.name]: Stepper,
    [Dialog.name]: Dialog,
    [Popup.name]: Popup,
    HeaderBar,
  },
  data(){
    return{
      count: '',
      show: false,
      cartList: [],
      totalPrice: 0,
      allSelected: false,
    }
  },
  methods: {
    onClickBack(){
      this.$router.go(-1)
    },
    handleProductCheck(i,j){
      let id = this.cartList[i].cartItems[j].id;
      this.cartList[i].cartItems[j].isSelected = !this.cartList[i].cartItems[j].isSelected;
      let formdata = new FormData();
      formdata.append('cartItemId',id);
      checkProduct(formdata).then(res=>{
        console.log(res);
        if(res.data.code===0){
          this.totalPrice = res.data.data;
        }else{
          Toast(res.data.errmsg)
        }
      })
    },
    handleStoreCheck(){

    },
    handleAllCheck(){

    },
    getCartList(){
      getCartList().then(res=>{
        if(res.data.code==0){
          this.cartList = res.data.data.shopItemVos;
          this.totalPrice = res.data.data.totalPrice;
          // for (let i = 0; i < this.cartList.length; i++) {
          //   for (let j = 0; j < this.cartList[i].cartItems.length; j++) {
          //     if(this.cartList[i].cartItems[j].isSelected){
          //       this.totalPrice += this.cartList[i].cartItems[j].price;
          //     }
          //   }
          // }
          for (let i = 0; i < this.cartList.length; i++) {
            for (let j = 0; j < this.cartList[i].cartItems.length; j++) {
              if(this.cartList[i].cartItems[j].isSelected==false){
                this.cartList[i].isSelected = false;
                break;
              }
              this.cartList[i].isSelected = true;
            }
            if(this.cartList[i].isSelected==false){
              this.allSelected = false;
              break;
            }else{
              this.allSelected = true;
            }
          }
        }else{
          Toast(res.data.errmsg);
        }
      })
    },
    deleteCartItem(id){
      Dialog.confirm({
        title: '是否确定删除该商品吗？',
        // message: '弹窗内容'
      }).then(() => { // on confirm
        deleteCart(id).then(res=>{
          if(res.data.code==0){
            this.getCartList();
            Toast('删除成功')
          }else{
            Toast(res.data.errmsg)
          }
        })
      }).catch(() => { // on cancel
        
      });
    },
  },
  mounted(){
    this.getCartList();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#cart{
  min-height: 100%;
  padding-top: 1.2rem;
  padding-bottom: 1.306667rem;
  box-sizing: border-box;
  position: relative;
  background-color: #f6f6f6;
  i.icon-nocheck{
    width: 0.48rem;
    height: 0.48rem;
    display: inline-block;
    background: url(./../../image/未选择@2x.png) no-repeat;
    -webkit-background-size: 0.48rem 0.48rem;
    background-size: 0.48rem 0.48rem;
    position: absolute;
    left: 0;
    top: 1.0rem;
  }
  i.icon-checked{
    @extend i.icon-nocheck;
    background: url(./../../image/选择@2x.png) no-repeat;
    -webkit-background-size: 0.48rem 0.48rem;
    background-size: 0.48rem 0.48rem;
  }
  .cart-item{
    padding-left: 0.32rem;
    border-top: 0.266667rem solid #f6f6f6;
    background-color: #fff;
    .store-name{
      padding-left: 1.2rem;
      line-height: 1.066667rem;
      border-bottom: 1px solid #f6f6f6;
      font-size: 0.32rem;
      color: #2d2d2d;
      position: relative;
      span{
        float: right;
        padding-right: 0.32rem; 
      }
      i.icon-nocheck,
      i.icon-checked{
        top: 50%;
        margin-top: -0.24rem;
      }
      i.icon-store{
        width: 0.4rem;
        height: 0.346667rem;
        display: inline-block;
        background: url(./../../image/订单详情-小店@2x.png) no-repeat;
        -webkit-background-size: 0.4rem 0.346667rem;
        background-size: 0.4rem 0.346667rem;
        position: absolute;
        top: 50%;
        margin-top: -0.173333rem;
        left: 0.64rem;
      }
      i.icon-right{
        width: 0.133333rem;
        height: 0.24rem;
        display: inline-block;
        background: url(./../../image/订单相情，查看小店@2x.png) no-repeat;
        -webkit-background-size: 0.133333rem 0.24rem;
        background-size: 0.133333rem 0.24rem;
        margin-top: 0.413333rem;
      }
    }
    .product-item{
      padding: 0.453333rem 0.32rem 0.453333rem 3.093333rem;
      position: relative;
      border-bottom: 1px solid #f6f6f6;
      &:last-child{
        border-bottom: 0;
      }
      img{
        width: 2.0rem;
        height: 2.0rem;
        position: absolute;
        left: 0.666667rem;
        top: 0.453333rem;
      }
      p.product-name{
        height: 1.066667rem;
        font-size: 0.4rem;
        color: #2d2d2d;
        padding-right: 1.733333rem;
        position: relative;
        i.icon-delete{
          width: 0.373333rem;
          height: 0.386667rem;
          display: inline-block;
          background: url(./../../image/地址管理-删除地址@2x.png) no-repeat;
          -webkit-background-size: 0.373333rem 0.386667rem;
          background-size: 0.373333rem 0.386667rem;
          position: absolute;
          top: 0.066667rem;
          right: 0;
        }
      }
      div.change{
        padding-top: 0.066667rem;
        div.type{
          height: 0.48rem;
          line-height: 0.48rem;
          padding: 0.16rem 0.2rem;
          padding-right: 0.8rem;
          font-size: 0.373333rem;
          color: #999;
          background-color: #f4f4f4;
          border-radius: 0.026667rem;
          display: inline-block;
          position: relative;
          &:after{
            content: '';
            width: 0.373333rem;
            height: 0.213333rem;
            line-height: 0.213333rem;
            display: inline-block;
            background: url(./../../image/价格下-灰@2x.png) no-repeat;
            -webkit-background-size: 0.373333rem 0.213333rem;
            background-size: 0.373333rem 0.213333rem;
            position: absolute;
            top: 50%;
            margin-top: -2px;
            right: 0.2rem;
          }
        }
        div.stepper-container{
          padding-left: 0.08rem;
          display: inline-block;
          vertical-align: top;
        }
      }
      p.price{
        padding-top: 0.32rem;
        font-size: 0.4rem;
        font-weight: bold;
        color: #e64a19;
      }
    }
  }
  .btn-container{
    width: 100%;
    height: 1.306667rem;
    position: fixed;
    bottom: 0;
    i.icon-nocheck,
    i.icon-checked{
      top: 50%;
      margin-top: -0.24rem;
      left: 0.32rem;
    }
    div.btn-left{
      width: 70%;
      height: 100%;
      line-height: 1.306667rem;
      display: inline-block;
      padding-left: 1.066667rem;
      padding-right: 0.32rem;
      box-sizing: border-box;
      border-top: 1px solid #f6f6f6;
      font-size: 0.346667rem;
      color: #2d2d2d;
      background-color: #fff;
      strong{
        font-size: 0.48rem;
        color: #e64a19;
      }
    }
    div.btn-pay{
      width: 30%;
      height: 100%;
      display: inline-block;
      line-height: 1.306667rem;
      background-color: #e64a19;
      color: #fff;
      font-size: 0.4rem;
      text-align: center;
    }
  }
  .van-popup{
    height: 50%;
    .popup-box{
      overflow: hidden;
      .title{
        font-size: 0.426667rem;
        font-weight: bold;
        text-align: center;
        line-height: 1.333333rem;
        border-bottom: 1px solid #f6f6f6;
        position: relative;
        i.icon-close{
          content: '';
          width: 0.4rem;
          height: 0.4rem;
          display: block;
          position: absolute;
          right: 0.4rem;
          top: 50%;
          margin-top: -0.2rem;
          background: url(./../../image/close.png) no-repeat;
          -webkit-background-size: 0.4rem 0.4rem;
          background-size: 0.4rem 0.4rem;
        }
      }
      .content{
        height: 6.666666rem;
        padding: 0.4rem;
        box-sizing: border-box;
        overflow: scroll;
        .coupon{
          width: 100%;
          height: 2.666667rem;
          margin-bottom: 0.4rem;
          background: url(./../../image/券@2x.png) no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
          box-shadow: #aaa 0.133333rem 0.133333rem 0.8rem -0.266667rem;
          &.got{
            background: url(./../../image/券-已领取@2x.png) no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          .coupon-left{
            width: 36%;
            height: 100%;
            display: inline-block;
            p.price{
              padding-top: 0.4rem;
              font-size: 0.586667rem;
              font-weight: bold;
              color: #fff;
              text-align: center;
              span{
                font-size: 0.693333rem;
              }
            }
            p.tips{
              text-align: center;
              padding-top: 0.08rem;
              font-size: 0.346667rem;
              color: #fff;
            }
          }
          .coupon-right{
            width: 64%;
            height: 100%;
            display: inline-block;
            padding: 0.426667rem 0.4rem 0 0.453333rem;
            box-sizing: border-box;
            vertical-align: top;
            position: relative;
            p.name{
              font-size: 0.4rem;
              color: #2d2d2d;
              font-weight: bold;
            }
            p.date{
              font-size: 0.32rem;
              color: #666;
            }
            span.btn-got{
              width: 1.893333rem;
              height: 0.613333rem;
              border: 1px solid #dcdcdc;
              border-radius: 0.306667rem;
              color: #999;
              display: inline-block;
              line-height: 0.613333rem;
              text-align: center;
              position: absolute;
              bottom: 0.32rem;
              right: 0.4rem;
            }
            span.btn-get{
              width: 1.893333rem;
              height: 0.613333rem;
              border: 1px solid #e64a19;
              background-color: #e64a19;
              color: #fff;
              border-radius: 0.306667rem;
              display: inline-block;
              line-height: 0.613333rem;
              text-align: center;
              position: absolute;
              bottom: 0.32rem;
              right: 0.4rem;
            }
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
}
</style>
