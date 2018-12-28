<template>
  <div id="sort-second">
    <HeaderBar :title="firstTitle" @back="onClickBack" @cart="onClickCart"></HeaderBar>
    <div class="tabs-bar">
      <van-tabs v-model="active" @click="changeCategorie">
        <van-tab v-for="(item, index) in categories" :key="index" :title="item.name"></van-tab>
      </van-tabs>
      <i class="icon-down" @click="show=true"></i>
    </div>

    <div class="mask" v-if="show">
      <div class="tabs-box" v-if="show">
        <p>{{firstTitle}}<i class="icon-up" @click="show=false"></i></p>
        <div class="tags-container">
          <span v-for="(item, index) in categories" :key="index" class="tag" :class="active === index ? 'active' : ''" @click="changeCategorie(index)">{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="product-list">
      <div v-for="(item, index) in products" :key="index" class="product-container">
        <div class="product-img"><img :src="item.pictureUrl"></div>
        <p class="name van-ellipsis">{{item.productName}}</p>
        <p class="money">&yen;{{item.minPrice}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Toast } from 'vant';
import { findProductByCategoryId } from '@/api/sort'
// import { getHomeInfo } from "@/api/shop";
import HeaderBar from "@/components/HeaderBar";
export default {
  components: {
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    // [Loading.name]: Loading,
    HeaderBar,
  },
  data(){
    return{
      active: 0,
      show: false,
      memberProductCategoryId: null,
      products: [],
      categories: [],
      firstTitle: ''
    }
  },
  methods: {
    onClickBack() {
      this.$router.go(-1);
    },
    onClickCart() {
      this.$router.push({path:'/cart'});
    },
    onClickMine() {
      this.$router.push({path:'/mine'});
    },
    onClickDetail(id) {
      this.$router.push({path:'/shop/sort',query:{productId:id}});
    },
    // 根据分类id获取分类商品
    async findProductByCategoryId() {
      let that = this
      await findProductByCategoryId(this.memberProductCategoryId).then(res => {
        if (res.data.code === 0) {
          that.products = res.data.data
        } else {
          Toast(res.data.errmsg)
        }
      })
    },
    // 点击二级分类，切换active以及商品，重新调用 根据分类id获取分类商品 接口
    changeCategorie(index) {
      this.show = false
      this.active = index
      this.memberProductCategoryId = this.categories[index].id
      this.findProductByCategoryId()
    }
  },
  mounted(){
    if (this.$route.query.id) {
      this.memberProductCategoryId = this.$route.query.id
      this.categories = this.$route.query.second
      this.firstTitle = this.$route.query.first
      this.findProductByCategoryId()
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#sort-second{
  padding-top: 2.4rem;
  box-sizing: border-box;
  position: relative;
  .header-bar{
    width: 100%;
    height: 1.2rem;
    text-align: center;
    background-color: #8FC221;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 7000;
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
  .tabs-box{
    width: 100%;
    position: fixed;
    top: 1.2rem;
    background-color: #fff;
    z-index: 7000;
    /*-webkit-animation-name: fadeIn;
    animation-name: fadeIn;
    -webkit-animation-duration: 0s;
    animation-duration: 0s;
    -webkit-animation-fill-mode: forwards ;
    animation-fill-mode: forwards ;
    -webkit-animation-delay:1s;
    animation-delay:1s;*/
/*    @-webkit-keyframes fadeIn {
      0% {
        opacity: 0
      }
      100% {
        opacity: 1
      }
    }
    @keyframes fadeIn {
      0% {
        opacity: 0
      }
      100% {
        opacity: 1
      }
    }*/
    p{
      position: relative;
      line-height: 1.333333rem;
      padding-left: 0.4rem;
      font-size: 0.4rem;
      color: #2d2d2d;
      .icon-up{
        width: 0.4rem;
        height: 0.213333rem;
        display: block;
        position: absolute;
        background: url('./../../image/二级分类-关闭@2x.png') no-repeat;
        -webkit-background-size: 0.4rem 0.213333rem;
        background-size: 0.4rem 0.213333rem;
        right: 0.4rem;
        top: 50%;
        margin-top: -0.106667rem;
      }
    }
    .tags-container{
      padding: 0 0.2rem;
      padding-bottom: 0.266667rem;
      .tag{
        margin: 0 0.2rem;
        margin-bottom: 0.4rem;
        padding: 0.2rem 0.32rem;
        display: inline-block;
        border: 1px solid #dcdcdc;
        box-sizing: border-box;
        border-radius: 0.053333rem;
        font-size: 0.32rem;
        color: #2d2d2d;
        &.active{
          color: #8FC221;
          border: 1px solid #8FC221;
        }
      }
    }
  }
  .tabs-bar{
    width: 100%;
    height: 1.2rem;
    position: fixed;
    top: 1.2rem;
    background-color: #fff;
    border-bottom: 1px solid #f6f6f6;
    z-index: 200;
    .van-tabs--line{
      width: 90%;
    }
    .icon-down{
      width: 0.4rem;
      height: 0.213333rem;
      display: block;
      position: absolute;
      background: url('./../../image/二级分类-展开@2x.png') no-repeat;
      -webkit-background-size: 0.4rem 0.213333rem;
      background-size: 0.4rem 0.213333rem;
      right: 0.4rem;
      top: 50%;
      margin-top: -0.106667rem;
    }
  }
  .product-list{
    padding: 0.533333rem 0.2rem;
    width: 100%;
    box-sizing: border-box;
    border-top: 0.266667rem solid #f6f6f6;
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
