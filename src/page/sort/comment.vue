<template>
  <div id="sort-comment">
    <HeaderBar title="全部评论" @back="onClickBack" @cart="onClickCart"></HeaderBar> 
    <div class="comment-container">
      <p class="title">商品评价({{totalCommentCount}})</p>
      <div class="content">
        <div class="tag-container">
          <span class="tag active" @click="handleChooseAllView">全部{{totalCommentCount}}</span>
          <span v-for="n in commentTags" class="tag" @click="handleChooseView($event,i)"><span class="str">{{n.tag}}</span>{{n.count}}</span>
          <span class="tag bad" @click="handleChooseView($event,i)"><span class="str">难喝</span>99</span>
        </div>
        <!-- <div class="tag-container">
          <span class="tag active" @click="handleChooseAllView">全部 ({{totalTags}})</span>
          <span v-for="(n,i) in tags" class="tag" @click="handleChooseView($event,i)"><span class="str">{{n.tagname}}</span> ({{n.count}})</span>
        </div> -->
        <div v-for="n in commentList" class="view-container">
          <img class="avator" :src="n.avatar">
          <div class="view-content">
            <p class="name van-ellipsis">{{n.memberName}}<span>{{n.createDate}}</span></p>
            <p class="type">{{n.level}}</p>
            <p class="view">{{n.info}}</p>
            <p class="product">{{n.productName}} {{n.count}}</p>
          </div>
        </div>
        <!-- <div class="view-container" v-for="(v,i) in comments" :key="i">
          <img class="avator" :src="v.avatar">
          <div class="view-content">
            <p class="name">{{v.memberName}}<span>{{v.createDate}}</span></p>
            <div class="star-container">
              <img v-for="s1 in v.stars" src="./../../img/用户评价1@2x.png"><img v-for="s2 in (5-v.stars)" src="./../../img/用户评价2@2x.png">
              <span>数量：{{v.count}}</span>
            </div>
            <p class="view">{{v.otherComment}}</p>
          </div>
        </div> -->
      </div>
    </div>
    <div class="btn-container">
      <div v-if="!showBox">
        <div class="tab-home">
          <img src="./../../image/首页@2x.png">
          <p>首页</p>
        </div><div class="btn-list">
          <div class="btn btn-vip" @click="onClickPin">
            <p class="money">&yen; {{vipPrice}}+{{coin}}e币</p>
            <p class="text">会员价</p>
          </div><div class="btn btn-buy" @click="showBox=true">
            <p class="money">&yen; {{minPrice}}</p>
            <p class="text">单独购买</p>
          </div><div class="btn btn-pin" @click="onClickPin">
            <p class="money">&yen; {{collagePrice}}</p>
            <p class="text">发起拼单({{groupNumber}}人)</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="btn-addCart">加入购物车</p><p class="btn-buyNow">立即购买</p>
      </div>
    </div>
    <van-popup v-model="showBox" position="bottom">
      <i class="icon-close" @click="showBox=false"></i>
      <div class="box-product">
        <img src="./../../pic/iphone.png">
        <p class="price">&yen; 9.9 <del>&yen; 25.2</del></p>
        <p class="stock">库存36525件</p>
        <p class="choose">已选：原味 ; 500g</p>
      </div>
      <div class="box-item">
        <p>口味</p>
        <div class="type-list">
          <span class="active">原味</span>
          <span class="">骚烤</span>
          <span class="">麻辣</span>
        </div>
      </div>
      <div class="box-item">
        <p>重量</p>
        <div class="type-list">
          <span class="active">500g</span>
          <span class="">700g</span>
          <span class="">900g</span>
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
import { Swipe, SwipeItem, Tab, Tabs, Button, Popup } from 'vant';
import HeaderBar from "@/components/HeaderBar";
import { getCommentList } from "@/api/sort";
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Popup.name]: Popup,
    HeaderBar
  },
  data(){
    return{
      timer: null,
      showBox: false,
      count: '',
      commentList: [],
      commentTags: [],
      minPrice: 0,
      collagePrice: 0,
      vipPrice: 0,
      coin: 0,
      groupNumber: 0,
    }
  },
  computed: {
    totalCommentCount(){
      let total = 0;
      for(let item of this.commentTags){
        total += item.count;
      }
      return total;
    }
  },
  methods: {
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
      this.$router.push({path:'/shop/sort',query:{productId: this.detail.id}});
    },
    buyCollage() {

    },
    onClickBack(){
      this.$router.go(-1);
    },
    onClickCart(){
      this.$router.push({path:'/cart'});
    },
    onClickPin(){
      this.$router.push({path:'/order/detail'});
    },
    onClickStore(){
      this.$router.push({path:'/sort/store'});
    },
  },
  mounted(){
    let id = this.$route.query.id;
    getCommentList(1,10,id).then(res=>{
      this.commentList = res.data.data.Comment.list;
      this.minPrice = res.data.data.minPrice;
      this.collagePrice = res.data.data.minCollagePrice;
      this.vipPrice = res.data.data.minVipPrice;
      this.coin = res.data.data.minecoin;
      this.groupNumber = res.data.data.groupNumber;
    })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#sort-comment{
  padding-top: 1.2rem;
  box-sizing: border-box;
  /*padding-bottom: 3.6rem;*/
  position: relative;
  .title{
    padding: 0 0.4rem;
    font-size: 0.346667rem;
    color: #202020;
    line-height: 1.253333rem;
    border-bottom: 1px solid #e5e5e5;
    font-weight: bold;
    position: relative;
  }
  .comment-container{
    position: relative;
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
          background-color: #8FC221!important;
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
            color: #8FC221;

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
        color: #8FC221;
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
            color: #8FC221;
            border-color: #8FC221;
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
          background-color: #8FC221;
        }
      }
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
      background-color: #8FC221;
    }
  }
}
</style>
