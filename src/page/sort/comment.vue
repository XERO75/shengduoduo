<template>
  <div id="home-detail">
   
    <div class="comment-container">
      <p class="title">商品评价(56465)</p>
      <div class="tag-container">
        <span class="tag active" @click="handleChooseAllView">全部451</span>
        <span class="tag" @click="handleChooseView($event,i)"><span class="str">几十块</span>5716</span>
        <span class="tag" @click="handleChooseView($event,i)"><span class="str">几十块</span>5716</span>
        <span class="tag" @click="handleChooseView($event,i)"><span class="str">几十块</span>5716</span>
        <span class="tag bad" @click="handleChooseView($event,i)"><span class="str">撒旦</span>5716</span>
      </div>
      <!-- <div class="tag-container">
        <span class="tag active" @click="handleChooseAllView">全部 ({{totalTags}})</span>
        <span v-for="(n,i) in tags" class="tag" @click="handleChooseView($event,i)"><span class="str">{{n.tagname}}</span> ({{n.count}})</span>
      </div> -->
      <div class="view-container">
        <img class="avator" src="./../../pic/user2.jpg">
        <div class="view-content">
          <p class="name">完全分为<span>2018-54-55</span></p>
          <!-- <div class="star-container">
            <img v-for="s1 in 4" src="./../../img/用户评价1@2x.png"><img v-for="s2 in 1" src="./../../img/用户评价2@2x.png">
          </div> -->
          <p class="view">阿发沙发沙发无法为范围未发完涩费玩儿法违法染色费阿斯顿发生放大阿斯蒂芬阿斯蒂芬阿萨德阿斯蒂芬按时</p>
          <p class="product">按时打算多</p>
        </div>
      </div>
      <div class="view-container">
        <img class="avator" src="./../../pic/user2.jpg">
        <div class="view-content">
          <p class="name">完全分为<span>2018-54-55</span></p>
          <p class="view">阿发沙发沙发无法为范围未发完涩费玩儿法违法染色费阿斯顿发生放大阿斯蒂芬阿斯蒂芬阿萨德阿斯蒂芬按时</p>
          <p class="product">按时打算多</p>
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
    <div class="btn-container">
      <div class="tab-list">
        <div class="tab tab-home">
          <img src="./../../image/添加地址@2x.png" alt="">
          <p>首页</p>
        </div><div class="tab tab-collect">
          <img src="./../../image/添加地址@2x.png" alt="">
          <p>收藏</p>
        </div><div class="tab tab-client">
          <img src="./../../image/添加地址@2x.png" alt="">
          <p>客服</p>
        </div>
      </div><div class="btn btn-buy">
        <p class="money">&yen; 150</p>
        <p class="text">单独购买</p>
      </div><div class="btn btn-pin">
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
      this.$store.state.pintuan.count = this.info.minCount;
      this.$store.state.pintuan.deliveryMethod = 'Multiple';
      this.$store.state.pintuan.number = this.detail.number;
      this.$store.state.pintuan.produtId = this.detail.id;
      this.$router.push({path:'/pintuan/configure',query:{productId: this.detail.id}});
    },
  },
  mounted(){
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#home-detail{
  padding-bottom: 3.6rem;
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
