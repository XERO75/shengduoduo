<template>
  <div id="sort">
    <HeaderBar title="商品分类" @back="onClickBack" @cart="onClickCart"></HeaderBar>
    <van-tabs v-model="active" @click="onClickClass">
      <template v-for="(item, index) in classes">
        <van-tab :title="item.name" :key="index"></van-tab>
      </template>
      <!-- <van-tab title="服饰"></van-tab>
      <van-tab title="鞋包"></van-tab>
      <van-tab title="母婴"></van-tab>
      <van-tab title="特产"></van-tab>
      <van-tab title="百货"></van-tab> -->
    </van-tabs>
    <van-swipe :autoplay="3000">
      <!-- <van-swipe-item v-for="n in bannerList" :key="n.id"><a :href="n.h5Url" v-if="n.type=='Link'"><img :src="n.image"></a><img v-if="n.type=='H5'" :src="n.image" @click="onClickH5(n.id,0)"></van-swipe-item> -->
      <van-swipe-item v-for="(n, i) in banners" :key="i"><a :href="n.url"><img :src="n.image"></a></van-swipe-item>
    </van-swipe>
    <div class="nav-container">
      <template v-for="(item, index) in categories">
        <div class="nav-box" @click="onClickSecond(item.id)" :key="index">
          <img :src="item.icon">
          <p>{{item.name}}</p>
        </div>
      </template>
      <!-- <div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>糖果</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>坚果</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>肉铺</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>蜜栈</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>糖果</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>坚果</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>肉铺</p>
      </div><div class="nav-box" @click="onClickSecond">
        <img src="./../../pic/p2.png">
        <p>蜜栈</p>
      </div> -->
      <div class="nav-box" @click="onClickSecond">
        <img src="./../../image/一级分类查看更多@2x.png">
        <p>查看全部</p>
      </div>
    </div>
    <div class="product-list">
      <div v-for="(item, index) in products" :key="index" class="product-container" @click="onClickDetail">
        <div class="product-img"><img :src="item.pictureUrl"></div>
        <p class="name van-ellipsis">{{item.productName}}</p>
        <p class="money">&yen;{{item.minPrice}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs, Swipe, SwipeItem, Toast } from 'vant';
import HeaderBar from "@/components/HeaderBar";
import { list, findProductByCategoryId } from '@/api/sort'
export default {
  components: {
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    HeaderBar
  },
  data(){
    return{
      active: 0,
      classes: [],
      categories: [],
      banners: [],
      firstClass: '', // 一级分类名，用于传到二级分类显示用
      products: []
    }
  },
  methods: {
    onClickBack(){
      this.$router.go(-1)
    },
    onClickCart(){
      this.$router.push({path:'/cart'})
    },
    // 点击更改一级分类 点击vant组件会执行active = index的操作
    onClickClass(index) {
      // 点击根据index修改一二级分类
      this.firstClass = this.classes[index].name
      this.categories = this.classes[index].categories
      this.banners = this.classes[index].imageUrl
      this.findProductByCategoryId()
    },
    onClickMine(id){
      this.$router.push({path:'/mine'})
    },
    onClickSecond(id){
      // 带参传
      this.$router.push({path:'/sort/second', query:{'id': id, 'second': this.categories, 'first': this.firstClass}})
    },
    onClickDetail(){
      this.$router.push({path:'/sort/detail'});
    },
    // 获取商品分类信息
    async list() {
      let that = this
      await list().then(res => {
        if (res.data.code === 0) {
          that.classes = res.data.data
          if (that.classes.length > 0) {
            // 设置默认一级分类为第一个， 默认二级分类为该一级分类下的默认二级分类
            that.firstClass = that.classes[0].name
            that.categories = that.classes[0].categoryLv2
            that.banners = that.classes[0].imageUrl
          }
          that.findProductByCategoryId()
        } else {
          Toast(res.data.errmsg)
        }
      })
    },
    // 根据分类id获取分类商品
    async findProductByCategoryId() {
      let that = this
      let id = this.classes[this.active].id
      await findProductByCategoryId(id).then(res => {
        if (res.data.code === 0) {
          that.products = res.data.data
        } else {
          Toast(res.data.errmsg)
        }
      })
    }
  },
  mounted(){
    this.list()
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#sort{
  position: relative;
  padding-top: 2.4rem;
  box-sizing: border-box;
  .header-bar{
    width: 100%;
    height: 1.2rem;
    text-align: center;
    background-color: #8FC221;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    p{
      line-height: 1.2rem;
      text-align: center;
      font-size: 0.48rem;
      position: relative;
      i.icon-back{
        width: 0.28rem;
        height: 0.506667rem;
        display: block;
        position: absolute;
        left: 0.32rem;
        top: 50%;
        margin-top: -0.253333rem;
        background: url(./../../image/导航返回@2x.png) no-repeat;
        -webkit-background-size: 0.28rem 0.506667rem;
        background-size: 0.28rem 0.506667rem;
      }
      i.icon-cart{
        width: 0.64rem;
        height: 0.533333rem;
        display: block;
        position: absolute;
        right: 1.2rem;
        top: 50%;
        margin-top: -0.266667rem;
        background: url(./../../image/导肮购物车@2x.png) no-repeat;
        -webkit-background-size: 0.64rem 0.533333rem;
        background-size: 0.64rem 0.533333rem;
      }
      i.icon-more{
        width: 0.56rem;
        height: 0.133333rem;
        display: block;
        position: absolute;
        right: 0.32rem;
        top: 50%;
        margin-top: -0.066667rem;
        background: url(./../../image/导航更多@2x.png) no-repeat;
        -webkit-background-size: 0.56rem 0.133333rem;
        background-size: 0.56rem 0.133333rem;
      }
    }
  }
  .nav-container{
    /*height: 2.56rem;*/
    border-bottom: 0.266667rem solid #f6f6f6;
    padding-bottom: 0.533333rem;
    .nav-box{
      width: 20%;
      padding-top: 0.773333rem;
      display: inline-block;
      text-align: center;
      &:last-child{
        img{
          width: 0.773333rem;
          height: 0.773333rem;
        }
      }
      img{
        width: 1.093333rem;
        height: 1.093333rem;
      }
      p{
        font-size: 0.293333rem;
        color: #5f5f5f;
        padding-top: 0.266667rem;
        text-align: center;
      }
    }
  }
  .product-list{
    padding: 0.533333rem 0.2rem;
    width: 100%;
    box-sizing: border-box;
    .product-container{
      width: 50%;
      padding: 0 0.12rem;
      padding-bottom: 0.48rem;
      box-sizing: border-box;
      display: inline-block;
      text-align: center;
      .product-img{
        position: relative;
        p.double{
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 0.693333rem;
          line-height: 0.693333rem;
          font-size: 0.4rem;
          color: #fff;
          background-color: #e70012;
        }
        img{
          width: 4.533333rem;
          height: 4.533333rem;
          border-radius: 0.08rem;
        }

      }
      p.name{
        font-size: 0.373333rem;
        color: #2d2d2d;
        padding: 0.32rem 0 0 0.186667rem;
        text-align: left;
      }
      p.money{
        padding-left: 0.106667rem;
        font-size: 0.4rem;
        font-weight: bold;
        color: #8FC221;
        text-align: left;
      }
    }
  }
}
</style>
