<template>
  <div id="pintuan">
    <div class="img-container">
      <img mode="widthFix" :src="detail.image">
    </div>
    <div class="product-container">
      <p class="name">{{detail.name}} <span>{{detail.specifications}}</span></p>
      <p class="price">&yen;<span>{{detail.isStraight?totalStraightPrice.replace('.00',''):totalPrice.replace('.00','')}} </span><del v-if="detail.isStraight">&yen; {{totalPrice}}</del></p>
      <!-- <div class="multiple-container" v-if="detail.deliveryMethod=='Multiple'"> -->
      <div class="multiple-container">
        <p class="total-title">总数量</p>
        <div class="total-container">
          <span class="total-num active">{{info.minCount}}</span>
        </div>
        <div class="preDay">
          <p class="title">每日配送</p>
          <div class="count-box">
            <i class="icon-delete" @click="onMinus"></i>
            <span class="num">{{detail.number}}</span>
            <i class="icon-add" @click="onPlus"></i>
          </div>
        </div>
      </div>
      <!-- <div class="single-container" v-if="detail.deliveryMethod=='Single'">
        <div class="preDay">
          <p class="title">总{{detail.unit}}数</p>
          <div class="count-box">
            <van-stepper v-model="detail.count" integer :min="1" :max="99" />
          </div>
        </div>
      </div> -->
      <van-row>
        <van-col span="8" class="left">产品单价：{{detail.isStraight?detail.straightPrice:detail.price}}元</van-col>
        <van-col span="8" class="right">单位：{{detail.unit}}</van-col>
        <van-col span="8" class="center">赠送积分：{{detail.points}}</van-col>
      </van-row>
    </div>
    <div class="pintuan-container">
      <p class="title"><span v-if="still">还差{{still}}人成团</span><span v-else>已满团</span><span class="fr" v-if="between>0">剩余{{countdown}}</span><span class="fr" v-else>已过期</span></p>
      <div class="team-container" v-for="n in orders">
        <img :src="n.memberAvatar">
        <div class="content">
          <p class="name"><!-- {{n.memberName}} -->匿名用户</p>
        </div>
      </div>
    </div>
    <van-tabs v-model="active">
      <van-tab class="tab-detail" title="商品详情" v-html="detail.introduction"></van-tab>
      <van-tab class="tab-view" title="用户评价">
        <div class="tag-container">
          <span class="tag active" @click="handleChooseAllView">全部 ({{totalTags}})</span>
          <span v-for="(n,i) in tags" class="tag" @click="handleChooseView($event,i)"><span class="str">{{n.tagname}}</span> ({{n.count}})</span>
        </div>
        <div class="view-container" v-for="(v,i) in comments" :key="i">
          <img class="avator" :src="v.avatar">
          <div class="view-content">
            <p class="name">{{v.memberName}}<span>{{v.createDate}}</span></p>
            <div class="star-container">
              <img v-for="s1 in v.stars" src="./../../img/用户评价1@2x.png"><img v-for="s2 in (5-v.stars)" src="./../../img/用户评价2@2x.png">
              <span>数量：{{v.count}}</span>
            </div>
            <p class="view">{{v.otherComment}}</p>
          </div>
        </div>
        <span class="more">更多评价(98)</span>
      </van-tab>
    </van-tabs>
    <div class="btn-container">
      <van-button class="btn-buy" @click="buyAlone">单独购买 &yen;{{detail.isStraight?totalStraightPrice.replace('.00',''):totalPrice.replace('.00','')}}</van-button>
      <van-button v-if="!isOver" class="btn-start" @click="buyCollage">参团购买 &yen;{{info.price.replace('.00','')}}</van-button>
      <van-button v-if="isOver" class="btn-over" disabled>拼团已结束</van-button>
    </div>
  </div>
</template>

<script>
import { Row, Col, Tab, Tabs, Button, Stepper } from 'vant';
import { getInfo } from "@/api/pintuan";
import { getProductDetail, getCommentsByTag } from "@/api/shop";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Stepper.name]: Stepper,

  },
  data(){
    return{
      current: 0,
      count: 2,
      active: 0,
      info: {},
      orders: {},
      detail: {},
      comments: [],
      tags: [],
      countdown: '',
      between: '',
      isOver: false,
    }
  },
  computed: {
    totalPrice(){
      return (this.info.minCount * this.detail.price).toFixed(2);
    },
    totalStraightPrice(){
      return (this.info.minCount * this.detail.straightPrice).toFixed(2);
    },
    still(){
      let n = '';
      if(this.orders){
        if(this.orders.length){
          n = Number(this.info.memberNumber) - this.orders.length;
          if(n>0){
            return n;
          }else{
            this.isOver = true;
            return '';
          }
        }
      }else{
        return Number(this.info.memberNumber);
      }
    },
    totalTags(){
      let total = 0;
      if(this.tags.length){
        for(let i=0;i<this.tags.length;i++) {
          total += this.tags[i].count;
        }
      }
      return total;
    },
  },
  methods: {
    onPlus(){
      if(this.detail.number<this.info.minCount){
        this.detail.number++;
      }
    },
    onMinus(){
      if(this.detail.number>1){
        this.detail.number--;
      }
    },
    onPlusBox(){
      if(this.detail.count<99){
        this.detail.count++;
      }
    },
    onMinusBox(){
      if(this.detail.count>1){
        this.detail.count--;
      }
    },
    handleChooseView(event,i){
      let tags =  event.currentTarget.parentNode.getElementsByClassName("tag");
      for(var i=0;i<tags.length;i++) {
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
      for(var i=0;i<tags.length;i++) {
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
    buyAlone(){
      // this.$store.state.buyNow.count = this.info.minCount;
      // this.$store.state.buyNow.deliveryMethod = 'Multiple';
      // this.$store.state.buyNow.number = this.detail.number;
      // this.$store.state.buyNow.produtId = this.detail.id;
      // this.$router.push({path:'/shop/configure',query:{type:'buyNow'}});
      this.$router.push({path:'/shop/sort',query:{productId: this.detail.id}});
    },
    buyCollage() {
      this.$store.state.pintuan.count = this.info.minCount;
      this.$store.state.pintuan.deliveryMethod = 'Multiple';
      this.$store.state.pintuan.number = this.detail.number;
      this.$store.state.pintuan.produtId = this.detail.id;
      this.$router.push({path:'/pintuan/configure',query:{productId: this.detail.id}});
    },
  },
  mounted(){
    handleLogin();
    let id = this.$route.query.productId;
      getProductDetail(id).then(res=>{
        this.detail = res.data.data;
        this.comments = this.detail.comments;
        this.tags = this.detail.tags;
      })
      getInfo(id).then(res=>{
        this.orders = res.data.data.collageOrders;
        this.info = res.data.data.collage;
        let that = this;
        let endTime = new Date(this.info.endDate.replace(".0","")).getTime();
        this.nowTime = new Date().getTime();
        this.between = endTime - this.nowTime;
        if(this.between>0){
          let timer = null;
          timer = setInterval(function(){
            that.nowTime = new Date().getTime();
            that.between = endTime - that.nowTime;
            if(that.between>0){
              let d = parseInt(that.between/1000/60/60/24);
              let h = parseInt(that.between/1000/60/60%24); 
              if(h){
                h = d*24 + h;
              }
              let m = parseInt(that.between/1000/60%60); 
              let s = parseInt(that.between/1000%60);
              h = h<10?("0" + h):h;
              m = m<10?("0" + m):m;
              s = s<10?("0" + s):s;
              that.countdown =  h + ':' + m + ':' + s;
            }
            else that.isOver = true;
          },1000)
        }
        else this.isOver = true;
      })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#pintuan{
  padding-bottom: 3.6rem;
  .img-container{
    width: 100%;
    /*height: 7.52rem;*/
    img{
      width: 100%;
      /*height: 100%;*/
    }
  }
  .product-container{
    padding: 0 0.4rem;
    border-bottom: 0.266667rem solid #f6f6f6;
    p.name{
      font-size: 0.426667rem;
      font-weight: bold;
      color: #202020;
      padding-top: 0.506667rem;
      span{
        color: #666;
        font-weight: normal;
        font-size: 0.346667rem;
      }
    }
    p.price{
      font-size: 0.48rem;
      font-weight: bold;
      color: #e70012;
      padding: 0.24rem 0 0.346667rem 0;
      border-bottom: 1px solid #e5e5e5;
      span{
        font-size: 0.64rem;
      }
      del{
        font-weight: normal;
        color: #999;
        font-size: 0.4rem;
      }
    }
    p.total-title{
      font-size: 0.346667rem;
      color: #666;
      padding: 0.426667rem 0 0.32rem 0;
    }
    .total-container{
      padding-bottom: 0.346667rem;
      border-bottom: 1px solid #e5e5e5;
      span.total-num{
        width: 2.96rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        display: inline-block;
        font-size: 0.346667rem;
        color: #202020;
        background-color: #f3f3f3;
        border-radius: 0.053333rem;
        margin: 0 0.053333rem; 
        margin-bottom: 0.16rem;
      }
      span.total-num.active{
        color: #fff;
        background-color: #e70012;
      }
    }
    .preDay{
      position: relative;
      height: 1.466667rem;
      p.title{
        font-size: 0.346667rem;
        color: #666;
        line-height: 1.466667rem;
        border-bottom: 1px solid #e5e5e5;
      }
      div.count-box {
        display: inline-block;
        float: right;
        line-height: 0.533333rem;
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        span.num {
          position: absolute;
          width: 0.853333rem;
          height: 0.533333rem;
          display: inline-block;
          left: 50%;
          top: 50%;
          margin-left: -0.426667rem;
          margin-top: -0.266667rem;
          font-size: 0.48rem;
          color: #202020;
          line-height: 0.533333rem;
          text-align: center;
        }
        i.icon-delete{
          width: 0.586667rem;
          height: 0.586667rem;
          display: inline-block;
          background: url(./../../img/购物车删除@2x.png) no-repeat;
          -webkit-background-size: 0.586667rem 0.586667rem;
          background-size: 0.586667rem 0.586667rem;
          margin-right: 0.8rem;
          margin-top: 0.426667rem;
        }
        i.icon-add{
          width: 0.586667rem;
          height: 0.586667rem;
          display: inline-block;
          background: url(./../../img/添加购买@2x.png) no-repeat;
          -webkit-background-size: 0.586667rem 0.586667rem;
          background-size: 0.586667rem 0.586667rem;
        }
      }
    }
    .van-row{
      height: 0.933333rem;
      .van-col{
        line-height: 0.933333rem;
        font-size: 0.32rem;
        color: #666;
      }
      .left{
        text-align: left;
      }
      .center{
        text-align: center;
      }
      .right{
        text-align: right;
      }
    }
  }
  .pintuan-container{
    border-bottom: 0.266667rem solid #f6f6f6;
    .title{
      padding: 0 0.4rem;
      font-size: 0.346667rem;
      color: #202020;
      line-height: 1.253333rem;
      border-bottom: 1px solid #e5e5e5;
      font-weight: bold;
      color: #e70012;
    }
    .team-container{
      padding-left: 0.4rem;
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
        padding: 0.506667rem 2.666667rem 0 1.2rem;
        .name{
          font-size: 0.4rem;
          color: #202020;
          line-height: 0.96rem;
        }
      }
      span.btn-join{
        width: 1.813333rem;
        height: 0.693333rem;
        display: block;
        line-height: 0.693333rem;
        background-color: #e71002;
        font-size: 0.346667rem;
        color: #fff;
        text-align: center;
        border-radius: 0.346667rem;
        position: absolute;
        right: 0.4rem;
        top: 50%;
        margin-top: -0.346667rem;
      }
    }
  }
  .tab-view{
    position: relative;
    .tag-container{
      padding: 0.373333rem 0 0.106667rem 0;
      border-bottom: 1px solid #e5e5e5;
      span.tag{
        height: 0.8rem;
        display: inline-block;
        background-color: #fdeeef;
        color: #202020;
        font-size: 0.32rem;
        line-height: 0.8rem;
        text-align: center;
        border-radius: 0.053333rem;
        padding: 0 0.4rem;
        margin-right: 0.133333rem;
        margin-bottom: 0.266667rem;
      }
      span.tag.active{
        background-color: #e71002;
        color: #fff;
      }
    }
    .view-container{
      padding: 0.48rem 0.4rem;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      img.avator{
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 0.48rem;
        position: absolute;
      }
      .view-content{
        padding-left: 1.093333rem;
        p.name{
          font-size: 0.32rem;
          color: #202020;
          span{
            float: right;
            font-size: 0.266667rem;
            color: #999;
          }
        }
        .star-container{
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
        }
        p.view{
          font-size: 0.32rem;
          color: #666;
          padding-top: 0.48rem;
        }
      }
    }
    span.more{
      width: 2.56rem;
      height: 0.8rem;
      line-height: 0.8rem;
      display: block;
      background-color: #dadada;
      border-radius: 0.4rem;
      color: #fff;
      font-size: 0.32rem;
      text-align: center;
      position: absolute;
      bottom: -1.226667rem;
      left: 50%;
      margin-left: -1.28rem;
    }
  }
  .btn-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9999;
    button.van-button {
      height: 1.306667rem;
      width: 50%;
      font-size: 0.4rem;
      margin: 0;
      display: inline-block;
      padding: 0;
      border: none;
      border-radius: unset;
      color: #fff;
    }
    button.btn-buy {
      background-color: #4c4c4c;
    }
    button.btn-start {
      position: absolute;
      background-color: #e70012;
    }
    button.btn-over {
      position: absolute;
      background-color: #e4e4e4;
      color: #666;
    }
  }
}
</style>
