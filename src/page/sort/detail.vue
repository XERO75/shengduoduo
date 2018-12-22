<template>
  <div id="sort-detail">
    <div class="header-bar">
      <i class="icon-back" @click="onClickBack"></i>
      <i class="icon-cart" @click="onClickCart"></i>
      <i class="icon-more" @click=""></i>
    </div>
    <van-swipe @change="onChangeSwipe" :autoplay="3000">
      <van-swipe-item v-for="(n, i) in detail.image" :key="i"><img :src="n"></van-swipe-item>
      <div class="custom-indicator" slot="indicator">
        <span>{{current + 1}}/{{detail.image.length}}</span>
      </div>
    </van-swipe>
    <div class="product-info">
      <div class="product-name">
        <div class="left">
          <p class="name">{{detail.name}}</p>
          <p class="type">{{detail.type}}</p>
        </div>
        <div class="right collect">
          <img src="./../../image/详情-收藏@2x.png">
          <p>收藏</p>
        </div>
        <div class="right share">
          <img src="./../../image/详情-分享@2x.png">
          <p>分享</p>
        </div>
      </div>
      <p class="product-price">&yen;{{minPrice}} - &yen;{{maxPrice}} <span>已拼{{detail.totalGrouped}}件</span></p>
      <div class="product-rights">
        <span><i class="icon-rights"></i>包邮包邮</span>
        <span><i class="icon-rights"></i>包邮包邮</span>
        <span><i class="icon-rights"></i>包邮包邮</span>
        <span><i class="icon-rights"></i>包邮包邮</span>
      </div>
    </div>
    <div class="pindan-container">
      <p class="title">火热拼单中，可直接参与<span class="more">查看更多<i class="icon-right"></i></span></p>
      <div class="team-list">
        <div class="team-container" v-for="n in collages">
          <img :src="n.avatar">
          <div class="content">
            <p class="name">{{n.name}}</p>
            <p class="tips">还差<span>{{n.groupNumber - n.joinNumber}}人</span>成团 剩余 <span>22:00:41</span> 结束</p>
          </div>
          <span class="btn-join" @click="onClickPin">去拼单</span>
        </div>
      </div>
    </div>
    <div class="comment-container">
      <p class="title">商品评价({{totalCommentCount}}) <span class="more" @click="onClickComment">查看更多<i class="icon-right"></i></span></p>
      <div class="content">
        <div class="tag-container">
          <span class="tag active" @click="handleChooseAllView">全部{{totalCommentCount}}</span>
          <span v-for="(n,i) in commentTags" class="tag" @click="handleChooseView($event,i)"><span class="str">{{n.tag}}</span>{{n.count}}</span>
          <span class="tag bad" @click="handleChooseView($event,i)"><span class="str">难喝</span>99</span>
        </div>
        <div v-for="v in comments" class="view-container">
          <img class="avator" :src="v.avatar">
          <div class="view-content">
            <p class="name">{{v.memberName}}<span>{{v.createDate}}</span></p>
            <p class="type">{{v.level}}</p>
            <p class="view">{{v.info}}</p>
            <p class="product">{{v.productName}} {{v.count}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="store-container">
      <div class="head-container">
        <img :src="store.shopLogo">
        <p class="name">{{store.shopName}}</p>
        <p class="info">商品数量：<span>{{store.count}} </span> 已拼：<span>{{store.totalGrouped}}</span></p>
        <span class="btn-in" @click="onClickStore">进入店铺</span>
      </div>
      <div class="product-box">
        <div class="product-container" v-for="n in storeProduct">
          <div class="product-img"><img :src="n.pictureUrl"></div>
          <p class="name van-ellipsis">{{n.productName}}</p>
          <p class="money">&yen;{{n.minPrice}}</p>
        </div>
      </div>
    </div>
    <div class="detail-container">
      <p class="title">商品详情</p>
      <div class="content" v-html="detail.detail"></div>
    </div>
    <div class="btn-container">
      <div v-if="!showBox">
        <div class="tab-home" @click="onClickHome">
          <img src="./../../image/首页@2x.png">
          <p>首页</p>
        </div><div class="btn-list">
          <div class="btn btn-vip" @click="showVipInfoBox">
            <p class="money">&yen; {{vipPrice}}+{{coin}}e币</p>
            <p class="text">会员价</p>
          </div><div class="btn btn-buy" @click="showInfoBox">
            <p class="money">&yen; {{minPrice}}</p>
            <p class="text">单独购买</p>
          </div><div class="btn btn-pin" @click="showPinInfoBox">
            <p class="money">&yen; {{collagePrice}}</p>
            <p class="text">发起拼单({{detail.groupNumber}}人)</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p v-if="isCollage" class="btn-confirm" @click="onClickPin">确定</p>
        <p v-else class="btn-addCart" @click="addCart">加入购物车</p><p class="btn-buyNow">立即购买</p>
      </div>
    </div>
    <van-popup v-model="showBox" position="bottom">
      <i class="icon-close" @click="close"></i>
      <div v-if="!changeInfo" class="box-product">
        <img :src="info.pictureUrl">
        <p v-if="isVip" class="price">&yen;{{info.minVipPrice}}+{{info.minecoin}}e币 ~ &yen; {{info.maxVipPrice}}+{{info.maxecoin}}e币</p>
        <p v-else-if="isCollage" class="price">&yen; {{info.minCollagePrice}} - &yen; {{info.maxCollagePrice}}</p>
        <p v-else class="price">&yen; {{info.minPrice}} - &yen; {{info.maxPrice}}</p>
        <p class="stock">库存{{info.totalStock}}件</p>
        <p class="choose">
          <span v-if="value1||value2">已选：{{value1}} ; {{value2}}</span>
          <span v-else>请选择</span>
        </p>
      </div>
      <div v-else class="box-product">
        <img :src="changeInfo.image">
        <p v-if="isVip" class="price">&yen; {{changeInfo.vipPrice}} + {{changeInfo.ecoin}}e币</p>
        <p v-else-if="isCollage" class="price">&yen; {{changeInfo.collagePrice}}</p>
        <p v-else class="price">&yen; {{changeInfo.price}}</p>
        <p class="stock">库存{{changeInfo.stock}}件</p>
        <p class="choose">
          <span>已选：{{value1}} ; {{value2}}</span>
        </p>
      </div>
      <div class="box-item">
        <p>{{typeNames[0]}}</p>
        <div class="type-list">
          <span class="type type1" v-for="(n,i) in info.specification[typeNames[0]]" @click="handleChooseType">{{n}}</span>
        </div>
      </div>
      <div class="box-item">
        <p>{{typeNames[1]}}</p>
        <div class="type-list">
          <span class="type type2" v-for="(n,i) in info.specification[typeNames[1]]" @click="handleChooseType">{{n}}</span>
        </div>
      </div>
      <div class="box-count">
        <p>购买数量</p>
        <div class="stepper-container">
          <van-stepper v-model="count" integer :min="1" />
        </div>
      </div>
    </van-popup>
    <!-- 放回顶部 -->
    <div class="toTop" @click="gotoTop"></div>
  </div>
</template>

<script>
import { Toast, Swipe, SwipeItem, Tab, Tabs, Button, Popup, Stepper } from 'vant';
import { getProductDetail, getProductInfo, getChangeProductInfo, addHistory, addCart, addCartWithEcoin } from '@/api/sort';
export default {
  components: {
    [Toast.name]: Toast,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Stepper.name]: Stepper,
  },
  data(){
    return{
      loading: false,
      current: 0,
      timer: null,
      showBox: false,
      isVip: false,
      isCollage: false,
      showComment: false,
      minPrice: 0,
      maxPrice: 0,
      collagePrice: 0,
      vipPrice: 0,
      coin: 0,
      detail: {},
      commentTags: [],
      comments: [],
      collages: [],
      store: {},
      storeProduct: [],
      info: {},
      typeNames: [],
      value1: '',
      value2: '',
      count: 1,
      changeInfo: null,
    }
  },
  computed: {
    totalCommentCount(){
      let total = 0;
      for(let item of this.commentTags){
        total += item.count;
      }
      return total;
    },
  },
  methods: {
    close(){
      this.showBox = false;
      this.isVip = false;
      console.log(this.showBox);
    },
    showInfoBox(){
      this.showBox = true;
      this.isVip = false;
      this.isCollage = false;
    },
    showVipInfoBox(){
      this.showBox = true;
      this.isVip = true;
      this.isCollage = false;
    },
    showPinInfoBox(){
      this.showBox = true;
      this.isVip = false;
      this.isCollage = true;
    },
    onClickBack() {
      this.$router.go(-1);
    },
    onClickCart() {
      this.$router.push({path:'/cart'});
    },
    onClickComment(){
      this.$router.push({path:'/sort/comment',query:{id:this.$route.query.id}})
    },
    onClickHome(){
      this.$router.push({path:'/'});
    },
    onClickStore(){
      this.$router.push({path:'/sort/store'});
    },
    onClickPin(){
      this.$router.push({path:'/order/detail'});
    },
    addCart(){
      if(!this.loading){
        if(this.changeInfo){
          if(this.isVip){
            addCartWithEcoin(this.changeInfo.code,this.count).then(res=>{
              this.showBox = false;
              this.loading = false;
              this.isVip = false;
              this.value1 = '',
              this.value2 = '',
              this.count = 1,
              this.changeInfo = null;
              if(res.data.code===0){
                Toast('添加购物车成功')
              }else{
                Toast(res.data.errmsg)
              }
            })
          }else{
            addCart(this.changeInfo.code,this.count).then(res=>{
              this.showBox = false;
              this.loading = false;
              this.value1 = '',
              this.value2 = '',
              this.count = 1,
              this.changeInfo = null;
              if(res.data.code===0){
                Toast('添加购物车成功')
              }else{
                Toast(res.data.errmsg)
              }
            })
          }
        }else{
          Toast('请选择规格')
        }
      }
    },
    /* 获取浏览器被卷去的高度(兼容性处理) */
    getScrollTop() {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      return scrollTop;
    },
    /* 设置浏览器被卷去的高度(兼容性处理) */
    setScrollTop(top) {
      document.documentElement.scrollTop = top;
      window.pageYOffset = top;
      document.body.scrollTop = top;
    },
    gotoTop(){
      let that = this;
      let isTop = true;
      this.timer = null;
      this.timer = setInterval(function(){
        let Top = that.getScrollTop();
        //ceil向上取整，floor向下取整
        let speed = Math.ceil(Top/2);
        //做一个变换速度的回到顶部效果
        that.setScrollTop(Top - speed);
        if(Top<=0){
          //清除定时器
          clearInterval(that.timer);
        }
        isTop = true;
      },40)
    },
    onChangeSwipe(index) {
      this.current = index;
    },
    handleChooseView(event,i){
      let tags =  event.currentTarget.parentNode.getElementsByClassName("tag");
      for(let i=0;i<tags.length;i++) {
        tags[i].classList.remove("active");
      }
      event.currentTarget.classList.add("active");
      let tag = event.currentTarget.children[0].innerText;
      let formdata = new FormData();
      formdata.append('productId',this.detail.id);
      formdata.append('tag',tag);
      getCommentsByTag(formdata).then(res=>{
        this.comments = res.data.data;
      })
    },
    handleChooseAllView(event){
      let tags =  event.currentTarget.parentNode.getElementsByClassName("tag");
      for(let i=0;i<tags.length;i++) {
        tags[i].classList.remove("active");
      }
      let formdata = new FormData();
      formdata.append('productId',this.detail.id);
      formdata.append('tag','');
      getCommentsByTag(formdata).then(res=>{
        this.comments = res.data.data;
      })
      event.currentTarget.classList.add("active");
    },
    handleChooseType(event){
      let types =  event.currentTarget.parentNode.getElementsByClassName("type");
      for(let i=0;i<types.length;i++) {
        types[i].classList.remove("active");
      }
      event.currentTarget.classList.add("active");
      let id = this.info.productId;

      let activeType1 = document.querySelectorAll('.type1.active')[0];
      if(activeType1){
        this.value1 = activeType1.innerText;
      }
      let activeType2 = document.querySelectorAll('.type2.active')[0];
      if(activeType2){
        this.value2 = activeType2.innerText;
      }
      if(this.value1&&this.value2){
        getChangeProductInfo(id,this.value1,this.value2).then(res=>{
          if(res.data.code==0){
            this.changeInfo = res.data.data;
          }else{
            Toast(res.data.errmsg);
          }
        })
      }
    },
  },
  mounted(){
    let id = this.$route.query.id;
    getProductDetail(id).then(res=>{
      if(res.data.code===0){
        this.detail = res.data.data.product;
        this.commentTags = res.data.data.commentTagNumbers;
        this.comments = res.data.data.comments;
        this.collages = res.data.data.collages;
        this.store = res.data.data.shopProduct;
        this.storeProduct = this.store.productPriceVos;
        this.maxPrice = res.data.data.maxPrice;
        this.minPrice = res.data.data.minPrice;
        this.collagePrice = res.data.data.minCollagePrice;
        this.vipPrice = res.data.data.minVipPrice;
        this.coin = res.data.data.minecoin;
        addHistory(this.detail.sn);
      }else{
        Toast(res.data.errmsg);
      }
    })
    getProductInfo(id).then(res=>{
      if(res.data.code===0){
        this.info = res.data.data;
        this.typeNames = [];
        for(let key in this.info.specification){
          this.typeNames.push(key);
        }
        // this.value1 = this.info.specification[this.typeNames[0]][0];
        // this.value2 = this.info.specification[this.typeNames[1]][0];
      }else{
        Toast(res.data.errmsg)
      }
    })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#sort-detail{
  padding-bottom: 3.6rem;
  position: relative;
  .header-bar{
    width: 100%;
    height: 1.2rem;
    position: absolute;
    left: 0;
    top: 0;
    i.icon-back{
      width: 0.773333rem;
      height: 0.773333rem;
      display: block;
      background: url(./../../image/商品详情-返回@2x.png) no-repeat;
      -webkit-background-size: 0.773333rem 0.773333rem;
      background-size: 0.773333rem 0.773333rem;
      position: absolute;
      left: 0.32rem;
      top: 50%;
      margin-top: -0.386667rem;
      z-index: 50;
    }
    i.icon-cart{
      width: 0.773333rem;
      height: 0.773333rem;
      display: block;
      background: url(./../../image/商品详情-购物车@2x.png) no-repeat;
      -webkit-background-size: 0.773333rem 0.773333rem;
      background-size: 0.773333rem 0.773333rem;
      position: absolute;
      right: 1.253333rem;
      top: 50%;
      margin-top: -0.386667rem;
      z-index: 50;
    }
    i.icon-more{
      width: 0.773333rem;
      height: 0.773333rem;
      display: block;
      background: url(./../../image/商品详情-更多@2x.png) no-repeat;
      -webkit-background-size: 0.773333rem 0.773333rem;
      background-size: 0.773333rem 0.773333rem;
      position: absolute;
      right: 0.32rem;
      top: 50%;
      margin-top: -0.386667rem;
      z-index: 50;
    }
  }
  .title{
    padding: 0 0.4rem;
    font-size: 0.373333rem;
    color: #2d2d2d;
    line-height: 1.173333rem;
    border-bottom: 1px solid #eee;
    font-weight: bold;
    position: relative;
    span.more{
      float: right;
      font-size: 0.293333rem;
      font-weight: normal;
      color: #666;
      padding-right: 0.266667rem;
      i.icon-right{
        width: 0.133333rem;
        height: 0.24rem;
        display: block;
        background: url(./../../image/MORE@2x.png) no-repeat;
        -webkit-background-size: 0.133333rem 0.24rem;
        background-size: 0.133333rem 0.24rem;
        position: absolute;
        right: 0.4rem;
        top: 50%;
        margin-top: -0.12rem;
      }
    }
  }
  .product-info{
    .product-name{
      padding: 0.426667rem 0.4rem;
      .left{
        width: 72%;
        display: inline-block;
        .name{
          font-size: 0.4rem;
          color: #2d2d2d;
          padding-bottom: 0.106667rem;
        }
        .type{
          font-size: 0.32rem;
          color: #666;
        }
      }
      .right{
        display: inline-block;
        width: 13%;
        text-align: center;
        &.share{
          border-left: 1px solid #f6f6f6;
          img{
            width: 0.44rem;
            height: 0.466667rem;
          }
        }
        &.collect{
          img{
            width: 0.52rem;
            height: 0.493333rem;
          }
        }
        p{
          font-size: 0.266667rem;
          color: #666;
        }
      }
    }
    .product-price{
      padding: 0.533333rem 0.4rem;
      font-weight: bold;
      color: #e64a19;
      font-size: 0.48rem;
      span{
        float: right;
        font-size: 0.32rem;
        color: #666;
        font-weight: normal;
      }
    }
    .product-rights{
      line-height: 0.88rem;
      padding-left: 0.4rem;
      padding-right: 0.8rem;
      background-color: #f9f9f9;
      position: relative;
      border-bottom: 0.266667rem solid #f6f6f6;
      &:after{
        content: '';
        width: 0.133333rem;
        height: 0.24rem;
        display: block;
        background: url(./../../image/MORE@2x.png) no-repeat;
        -webkit-background-size: 0.133333rem 0.24rem;
        background-size: 0.133333rem 0.24rem;
        position: absolute;
        right: 0.4rem;
        top: 50%;
        margin-top: -0.066667rem;
      }
      span{
        padding-left: 0.4rem;
        padding-right: 0.56rem;
        font-size: 0.293333rem;
        color: #999;
        display: inline-block;
        position: relative;
        i.icon-rights{
          width: 0.266667rem;
          height: 0.266667rem;
          display: block;
          background: url(./../../image/详情-全店包邮@2x.png) no-repeat;
          -webkit-background-size: 0.266667rem 0.266667rem;
          background-size: 0.266667rem 0.266667rem;
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -0.133333rem;
        }
      }
    }
  }
  .pindan-container{
    border-bottom: 0.266667rem solid #f6f6f6;
    .team-list{
      padding-left: 0.4rem;
      .team-container{
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        height: 1.866667rem;
        &:last-child{
          border-bottom: 0;
        }
        img{
          width: 1.013333rem;
          height: 1.013333rem;
          position: absolute;
          top: 50%;
          margin-top: -0.506667rem;
          border-radius: 0.506667rem;
        }
        .content{
          padding: 0.48rem 2.666667rem 0 1.2rem;
          .name{
            font-size: 0.4rem;
            font-weight: bold;
            color: #2d2d2d;
          }
          .tips{
            font-size: 0.293333rem;
            color: #666;
            span{
              color: #e64a19;
            }
          }
        }
        span.btn-join{
          position: absolute;
          display: inline-block;
          padding: 0.133333rem 0.333333rem;
          background-color: #e64a19;
          color: #fff;
          font-size: 0.346667rem;
          border-radius: 0.4rem;
          height: 0.4rem;
          line-height: 0.4rem;
          right: 0.266667rem;
          top: 50%;
          margin-top: -0.213333rem;
        }
      }
    }
  }
  .comment-container{
    position: relative;
    border-bottom: 0.266667rem solid #f6f6f6;
    .content{
      padding-left: 0.4rem;
      .tag-container{
        padding: 0.373333rem 0.4rem 0.106667rem 0;
        border-bottom: 1px solid #e5e5e5;
        span.tag{
          height: 0.8rem;
          display: inline-block;
          background-color: #fdeeef;
          color: #444;
          font-size: 0.32rem;
          line-height: 0.8rem;
          text-align: center;
          border-radius: 0.053333rem;
          padding: 0 0.4rem;
          margin-right: 0.133333rem;
          margin-bottom: 0.266667rem;
        }
        span.tag.active{
          background-color: #e64a19!important;
          color: #fff!important;
        }
        span.tag.bad{
          background-color: #f3f3f3;
        }
      }
      .view-container{
        padding: 0.48rem 0.4rem;
        padding-left: 0;
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        &:last-child{
          border: 0;
        }
        img.avator{
          width: 0.933333rem;
          height: 0.933333rem;
          border-radius: 50%;
          position: absolute;
        }
        .view-content{
          padding-left: 1.2rem;
          p.name{
            padding-top: 0.08rem;
            font-size: 0.346667rem;
            color: #2d2d2d;
            span{
              float: right;
              font-size: 0.266667rem;
              color: #999;
            }
          }
          p.type{
            font-size: 0.32rem;
            color: #e64a19;

          }
          /*.star-container{
            img{
              width: 0.266667rem;
              height: 0.266667rem;
              padding-right: 0.106667rem;
              padding-top: 0.186667rem;
            }
            span{
              float: right;
              font-size: 0.266667rem;
              color: #666;
            }
          }*/
          p.view{
            font-size: 0.373333rem;
            color: #2d2d2d;
            padding-top: 0.4rem;
          }
          p.product{
            font-size: 0.32rem;
            color: #999;
            padding-top: 0.266667rem;
          }
        }
      }
    }
  }
  .store-container{
    border-bottom: 10px solid #f6f6f6;
    .head-container{
      padding: 0.533333rem 0.4rem;
      position: relative;
      padding-left: 1.813333rem;
      border-bottom: 1px solid #e5e5e5;
      img{
        width: 1.146667rem;
        height: 1.146667rem;
        box-sizing: border-box;
        border: 1px solid #eee;
        position: absolute;
        left: 0.4rem;
      }
      p.name{
        padding-top: 0;
        font-size: 0.4rem;
        font-weight: bold;
        color: #2d2d2d;
        vertical-align: top;
      }
      p.info{
        padding-top: 0.213333rem;
        color: #666;
        vertical-align: top;
        span{
          font-weight: bold;
          color: #2d2d2d;
        }
      }
      span.btn-in{
        width: 2.426667rem;
        height: 0.693333rem;
        position: absolute;
        display: inline-block;
        border: 1px solid #e5e5e5;
        color: #2d2d2d;
        font-size: 0.346667rem;
        padding-left: 0.733333rem;
        box-sizing: border-box;
        border-radius: 0.346667rem;
        line-height: 0.64rem;
        top: 0.533333rem;
        right: 0.4rem;
        &:after{
          content: '';
          width: 0.386667rem;
          height: 0.333333rem;
          display: block;
          background: url(./../../image/订单详情-小店@2x.png) no-repeat;
          -webkit-background-size: 0.386667rem 0.333333rem;
          background-size: 0.386667rem 0.333333rem;
          position: absolute;
          top: 50%;
          margin-top: -0.16rem;
          left: 0.24rem;
        }
      }
    }
    .product-box{
      padding: 0.426667rem 0.4rem;
      width: 100%;
      box-sizing: border-box;
      .product-container{
        width: 33.3%;
        padding: 0 0.12rem 0 0.12rem;
        box-sizing: border-box;
        display: inline-block;
        text-align: center;
        .product-img{
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          overflow: hidden;
          margin: 0;
          img{
            width: 100%;
          }
        }
        p.name{
          font-size: 0.373333rem;
          color: #202020;
          padding: 0.24rem 0 0 0.106667rem;
          text-align: left;
        }
        p.money{
          padding-left: 0.106667rem;
          font-size: 0.4rem;
          font-weight: bold;
          color: #e70012;
          text-align: left;
          span{
            font-size: 0.48rem;
          }
        }
      }
    }
  }
  .detail-container table,
  .detail-container img{
    width: 100%!important;
    display: block!important;
  }
  .btn-container{
    width: 100%;
    height: 1.306667rem;
    position: fixed;
    bottom: 0;
    z-index: 6000;
    .tab-home{
      width: 1.36rem;
      height: 100%;
      text-align: center;
      border-top: 1px solid #eee;
      box-sizing: border-box;
      display: inline-block;
      padding-top: 0.24rem;
      background-color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      img{
        width: 0.506667rem;
        height: 0.466667rem;
      }
      p{
        font-size: 0.24rem;
        color: #666;
      }
    }
    .btn-list{
      width: 100%;
      height: 100px;
      padding-left: 1.36rem;
      box-sizing: border-box;
      display: inline-block;
      .btn{
        width: 33.3%;
        height: 100%;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        color: #fff;
        .money{
          padding-top: 0.213333rem;
          font-size: 0.373333rem;
        }
        .text{
          padding-top: 0;
          font-size: 0.293333rem;
        }
        &.btn-vip {
          background-color: #ec414d;
        }
        &.btn-buy {
          background-color: #ffb548;
        }
        &.btn-pin {
          background-color: #e64a19;
        }
      }
    }
    p.btn-confirm{
      width: 100%;
      height: 100%;
      font-size: 0.4rem;
      color: #fff;
      text-align: center;
      line-height: 1.306667rem;
      vertical-align: top;
      background-color: #e64a19;
    }
    p.btn-addCart{
      width: 50%;
      height: 100%;
      display: inline-block;
      font-size: 0.4rem;
      color: #fff;
      text-align: center;
      line-height: 1.306667rem;
      vertical-align: top;
      background-color: #ffb548;
    }
    p.btn-buyNow{
      width: 50%;
      height: 100%;
      display: inline-block;
      font-size: 0.4rem;
      color: #fff;
      text-align: center;
      line-height: 1.306667rem;
      vertical-align: top;
      background-color: #e64a19;
    }
  }
  .toTop{
    width: 1.04rem;
    height: 1.04rem;
    display: inline-block;
    position: fixed;
    bottom: 1.653333rem;
    right: 0.4rem;
    z-index: 200;
    background: url(./../../image/置顶@2x.png) no-repeat;
    background-size: 1.04rem 1.04rem;
  }
  .van-popup{
    width: 100%;
    height: 70%;
    border-radius: 0.106667rem 0.106667rem 0 0;
    padding: 0 0.4rem;
    padding-top: 0.533333rem;
    box-sizing: border-box;
    bottom: 1.306667rem;
    i.icon-close{
      width: 0.373333rem;
      height: 0.373333rem;
      display: inline-block;
      background: url(./../../image/close.png) no-repeat;
      -webkit-background-size: 0.373333rem 0.373333rem;
      background-size: 0.373333rem 0.373333rem;
      position: absolute;
      top: 0.426667rem;
      right: 0.4rem;
    }
    .box-product{
      position: relative;
      padding-left: 3.466667rem;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid #f6f6f6;
      img{
        width: 2.933333rem;
        height: 2.933333rem;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 0.053333rem;
      }
      p.price{
        padding-top: 0.8rem;
        font-size: 0.64rem;
        color: #e64a19;
        font-weight: bold;
        del{
          font-size: 0.48rem;
          color: #999;
          font-weight: normal;
        }
      }
      p.stock{
        padding-top: 0.186667rem;
        font-size: 0.373333rem;
        color: #999;
      }
      p.choose{
        font-size: 0.426667rem;
        color: #2d2d2d;
      }
    }
    .box-item{
      padding-top: 0.4rem;
      padding-bottom: 0.48rem;
      border-bottom: 1px solid #f6f6f6;
      p{
        padding-bottom: 0.213333rem;
        font-size: 0.373333rem;
        color: #2d2d2d;
      }
      div.type-list{
        span{
          height: 0.8rem;
          padding: 0 0.8rem;
          display: inline-block;
          font-size: 0.373333rem;
          color: #2d2d2d;
          line-height: 0.8rem;
          text-align: center;
          border: 1px solid #eee;
          border-radius: 0.053333rem;
          margin-right: 0.133333rem;
          &.active{
            color: #e64a19;
            border-color: #e64a19;
          }
        }
      }
    }
    .box-count{
      border-bottom: 1px solid #f6f6f6;
      position: relative;
      p{
        line-height: 1.6rem;
        font-size: 0.373333rem;
        color: #2d2d2d;
      }
      .stepper-container{
        position: absolute;
        top: 50%;
        margin-top: -15px;
        right: 0;
      }
    }
  }

}
</style>
