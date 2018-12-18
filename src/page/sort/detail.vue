<template>
  <div id="sort-detail">
    <div class="header-bar">
      <i class="icon-back"></i>
      <i class="icon-cart"></i>
      <i class="icon-more"></i>
    </div>
    <van-swipe @change="onChangeSwipe" :autoplay="3000">
      <van-swipe-item><img src="./../../img/banner@2x.png"></van-swipe-item>
      <van-swipe-item><img src="./../../img/banner@2x.png"></van-swipe-item>
      <van-swipe-item><img src="./../../img/banner@2x.png"></van-swipe-item>
      <van-swipe-item><img src="./../../img/banner@2x.png"></van-swipe-item>
      <div class="custom-indicator" slot="indicator">
        <span>{{ current + 1 }}/4</span>
      </div>
    </van-swipe>
    <div class="product-info">
      <div class="product-name">
        <div class="left">
          <p class="name">燕塘红枣牛奶</p>
          <p class="type">1箱12瓶</p>
        </div>
        <div class="right">
          <img src="./../../img/addr-dele.png" height="20" width="20" alt="">
          <p>分享</p>
        </div>
      </div>
      <p class="product-price">&yen;5465.6 <span>已拼9件</span></p>
      <div class="product-rights">
        <span><i class="icon-rights"></i>包邮包邮</span>
        <span><i class="icon-rights"></i>包邮包邮</span>
        <span><i class="icon-rights"></i>包邮包邮</span>
        <span><i class="icon-rights"></i>包邮包邮</span>
      </div>
    </div>
    <div class="pindan-container">
      <p class="title">火热拼单中，可直接参与<span class="more">查看更多<i class="icon-right"></i></span></p>
      <div class="team-container">
        <img src="./../../pic/user2.jpg">
        <div class="content">
          <p class="name">阿萨德</p>
          <p class="tips">还差<span>1人</span>成团 剩余 <span>22:00:41</span> 结束</p>
        </div>
        <span class="btn-join" @click="onClickPin">去拼单</span>
      </div>
      <!-- <div class="team-container" v-for="n in orders">
        <img :src="n.memberAvatar">
        <div class="content">
          <p class="name">匿名用户</p>
        </div>
      </div> -->
    </div>
    <div class="comment-container">
      <p class="title">商品评价(56465) <span class="more">查看更多<i class="icon-right"></i></span></p>
      <div class="tag-container">
        <span class="tag active" @click="handleChooseAllView">全部451</span>
        <span class="tag" @click="handleChooseView($event,i)"><span class="str">好喝</span>99</span>
        <span class="tag" @click="handleChooseView($event,i)"><span class="str">好喝</span>99</span>
        <span class="tag" @click="handleChooseView($event,i)"><span class="str">好喝</span>99</span>
        <span class="tag bad" @click="handleChooseView($event,i)"><span class="str">难喝</span>99</span>
      </div>
      <!-- <div class="tag-container">
        <span class="tag active" @click="handleChooseAllView">全部 ({{totalTags}})</span>
        <span v-for="(n,i) in tags" class="tag" @click="handleChooseView($event,i)"><span class="str">{{n.tagname}}</span> ({{n.count}})</span>
      </div> -->
      <div class="view-container">
        <img class="avator" src="./../../pic/user2.jpg">
        <div class="view-content">
          <p class="name">撒旦<span>2018-10-55</span></p>
          <div class="star-container">
            <img v-for="s1 in 4" src="./../../img/用户评价1@2x.png"><img v-for="s2 in 1" src="./../../img/用户评价2@2x.png">
          </div>
          <p class="view">好喝好喝</p>
          <p class="product">燕塘牛奶</p>
        </div>
      </div>
      <div class="view-container">
        <img class="avator" src="./../../pic/user2.jpg">
        <div class="view-content">
          <p class="name">撒旦<span>2018-10-55</span></p>
          <div class="star-container">
            <img v-for="s1 in 4" src="./../../img/用户评价1@2x.png"><img v-for="s2 in 1" src="./../../img/用户评价2@2x.png">
          </div>
          <p class="view">好喝好喝</p>
          <p class="product">燕塘牛奶</p>
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
    <div class="shore-container">
      <div class="head-container">
        <img src="./../../pic/box.png">
        <p class="name">燕塘牛奶</p>
        <p class="info">商品数量：<span>54</span> 已拼：<span>4575435</span></p>
        <span class="btn-in">进入店铺</span>
      </div>
      <div class="product-box">
        <!-- <div class="product-container" v-for="n in productList" :key="n.id" @click="onClickDetail(n.id)">
          <div class="product-img"><p class="double" v-if="n.isDoublePoints=='true'">双倍积分</p><img :src="n.image"></div>
          <p class="name van-ellipsis">{{n.name}}</p>
          <p class="money">&yen; <span>{{n.isStraight=='true'?n.straightPrice:n.price}}</span><del v-if="n.isStraight=='true'">&yen;{{n.price}}</del></p>
        </div> -->
        <div class="product-container">
          <div class="product-img"><img src="./../../pic/product.png"></div>
          <p class="name van-ellipsis">99598529</p>
          <p class="money">&yen;511</p>
        </div><div class="product-container">
          <div class="product-img"><img src="./../../pic/product.png"></div>
          <p class="name van-ellipsis">99598529</p>
          <p class="money">&yen;511</p>
        </div><div class="product-container">
          <div class="product-img"><img src="./../../pic/product.png"></div>
          <p class="name van-ellipsis">99598529</p>
          <p class="money">&yen;511</p>
        </div>
      </div>
    </div>
    <div class="detail-container">
      <p class="title">商品详情</p>
      <div class="content"></div>
    </div>
    <div class="btn-container">
      <div class="tab-list">
        <div class="tab tab-home">
          <img src="./../../img/填写地址-定位.png" alt="">
          <p>首页</p>
        </div><div class="tab tab-collect">
          <img src="./../../img/填写地址-定位.png" alt="">
          <p>收藏</p>
        </div><div class="tab tab-client">
          <img src="./../../img/填写地址-定位.png" alt="">
          <p>客服</p>
        </div>
      </div><div class="btn btn-buy" @click="onClickPin">
        <p class="money">&yen; 150</p>
        <p class="text">单独购买</p>
      </div><div class="btn btn-pin" @click="onClickPin">
        <p class="money">&yen; 23</p>
        <p class="text">发起拼单(5人)</p>
      </div>
    </div>
    <!-- 放回顶部 -->
    <div class="toTop" @click="gotoTop"></div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Tab, Tabs, Button } from 'vant';
// import { getInfo } from "@/api/pintuan";
// import { getProductDetail, getCommentsByTag } from "@/api/shop";
// import { handleLogin } from "@/api/login";
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,

  },
  data(){
    return{
      current: 0,
      timer: null,

    }
  },
  computed: {

  },
  methods: {
    onClickPin(){
      this.$router.push({path:'/order/detail'});
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
  },
  mounted(){
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
        width: 85%;
        display: inline-block;
        border-right: 1px solid #f6f6f6;
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
        img{

        }
        p{

        }
      }
    }
    .product-price{
      padding: 0 10px;
      span{
        float: right;
      } 
    }
    .product-rights{
      padding: 5px 25px 5px 10px;
      background-color: #f9f9f9;
      position: relative;
      border-bottom: 5px solid #f6f6f6;
      &:after{
        content: '';
        width: 10px;
        height: 10px;
        display: block;
        background: url(./../../img/right.png) no-repeat;
        -webkit-background-size: 10px 10px;
        background-size: 10px 10px;
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -5px;
      }
      span{
        padding-left: 10px;
        padding-right: 20px;
        display: inline-block;
        position: relative;
        i.icon-rights{
          width: 8px;
          height: 8px;
          display: block;
          background: url(./../../img/填写地址-定位.png) no-repeat;
          -webkit-background-size: 8px 8px;
          background-size: 8px 8px;
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -4px;
        }
      }
    }
  }
  .pindan-container{
    border-bottom: 0.266667rem solid #f6f6f6;
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
        padding: 18px 2.666667rem 0 1.2rem;
        .name{
          font-size: 0.4rem;
          color: #202020;
        }
        .tips{

        }
      }
      span.btn-join{    
        position: absolute;
        display: inline-block;
        padding: 5px 15px;
        background-color: #e70012;
        color: #fff;
        border-radius: 15px;
        height: 15px;
        line-height: 15px;
        right: 10px;
        top: 50%;
        margin-top: -8px;
      }
    }
  }
  .comment-container{
    position: relative;
    border-bottom: 10px solid #f6f6f6;
    .tag-container{
      padding: 0.373333rem 10px 0.106667rem 10px;
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
      span.tag.bad{
        background-color: #f3f3f3;
      }
    }
    .view-container{
      padding: 0.48rem 0.4rem;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      &:last-child{
        border: 0;
      }
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
        p.product{
          font-size: 0.28rem;
          color: #999;
          padding-top: 0.3rem;
        }
      }
    }
  }
  .shore-container{
    border-bottom: 10px solid #f6f6f6;
    .head-container{
      height: 60px;
      padding: 10px;
      position: relative;
      padding-left: 75px;
      border-bottom: 1px solid #e5e5e5;
      img{
        border: 1px solid #f6f6f6;
        position: absolute;
        left: 10px;
      }
      p.name{
        padding-top: 15px;
        vertical-align: top;
      }
      p.info{
        vertical-align: top;
      }
      span.btn-in{
        position: absolute;
        display: inline-block;
        padding: 5px 8px;
        border: 1px solid #e5e5e5;
        padding-left: 30px;
        border-radius: 12px;
        height: 12px;
        line-height: 12px;
        top: 10px;
        right: 10px;
        &:after{
          content: '';
          width: 16px;
          height: 16px;
          display: block;
          background: url(./../../img/填写地址-定位.png) no-repeat;
          -webkit-background-size: 16px 16px;
          background-size: 16px 16px;
          position: absolute;
          top: 50%;
          margin-top: -8px;
          left: 10px;
        }
      }
    }
    .product-box{
      padding: 0.106667rem 0.2rem;
      width: 100%;
      box-sizing: border-box; 
      .product-container{
        width: 33.3%;
        padding: 0 0.12rem 0.346667rem 0.12rem;
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
          del{
            font-weight: normal;
            color: #999;
            padding-left: 0.266667rem;
          }
        }
      }
    }
  }
  .detail-container{

  }
  .btn-container{    
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    .tab-list{
      width: 42%;
      height: 100%;
      display: inline-block;
      padding: 5px 0;
      border-top: 1px solid #eee;
      box-sizing: border-box;
      background-color: #fff;
      .tab {
        display: inline-block;
        width: 33.333%;
        height: 100%;
        text-align: center;
        border-right: 1px solid #eee;
        box-sizing: border-box;
        &:last-child{
          border: 0;
        }
        img{
          width: 25px;
          height: 25px;
        }
        p{

        }
      }
    }
    .btn{    
      width: 29%;
      height: 100%;
      display: inline-block;
      vertical-align: top;
      text-align: center;
      color: #fff;
      .money{
        padding-top: 15px;
      }
      &.btn-buy {
        background-color: #ffb548;
      }
      &.btn-pin {
        background-color: #e64a19;
      }
    }
  }
  .toTop{
    width: 40px;
    height: 40px;
    display: inline-block;
    position: fixed;
    bottom: 65px;
    right: 10px;
    z-index: 200;
    background: url(./../../pic/top@2x.png) no-repeat;
    background-size: 40px 40px;
  }

}
</style>
