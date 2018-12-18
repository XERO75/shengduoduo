<template>
  <div id="shop">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="n in bannerList" :key="n.id"><a :href="n.h5Url" v-if="n.type=='Link'"><img :src="n.image"></a><img v-if="n.type=='H5'" :src="n.image" @click="onClickH5(n.id,0)"></van-swipe-item>
    </van-swipe>
    <div class="nav-container">
      <van-row>
        <van-col span="6" v-for="(n,i) in categoryList" :key="n.id">
          <div @click="onClickSort(i)">
            <img :src="n.image">
            <p>{{n.name}}</p>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="banner" v-if="activities.length">
      <div class="title">
        <img :src="titleList.event">
      </div>
      <div class="banner-box one" v-if="activities.length==1">
        <a v-if="activities[0].type=='Link'" :href="activities[0].h5Url"><img :src="activities[0].image"></a>
        <img v-if="activities[0].type=='H5'" @click="onClickH5(activities[0].id,1)" :src="activities[0].image">
      </div>
      <div class="banner-box two" v-if="activities.length==2">
        <div class="left">
          <a v-if="activities[0].type=='Link'" :href="activities[0].h5Url"><img :src="activities[0].image"></a>
          <img v-if="activities[0].type=='H5'" @click="onClickH5(activities[0].id,1)" :src="activities[0].image">
        </div><div class="right">
          <a v-if="activities[1].type=='Link'" :href="activities[1].h5Url"><img :src="activities[1].image"></a>
          <img v-if="activities[1].type=='H5'" @click="onClickH5(activities[1].id,1)" :src="activities[1].image">
        </div>
      </div>
      <div class="banner-box three" v-if="activities.length==3">
        <div class="left">
          <a v-if="activities[0].type=='Link'" :href="activities[0].h5Url"><img :src="activities[0].image"></a>
          <img v-if="activities[0].type=='H5'" @click="onClickH5(activities[0].id,1)" :src="activities[0].image">
        </div><div class="right">
          <div class="top">
            <a v-if="activities[1].type=='Link'" :href="activities[1].h5Url"><img :src="activities[1].image"></a>
            <img v-if="activities[1].type=='H5'" @click="onClickH5(activities[1].id,1)" :src="activities[1].image">
          </div>
          <div class="bottom">
            <a v-if="activities[2].type=='Link'" :href="activities[2].h5Url"><img :src="activities[2].image"></a>
            <img v-if="activities[2].type=='H5'" @click="onClickH5(activities[2].id,1)" :src="activities[2].image">
          </div>
        </div>
      </div>
      <div class="banner-box four" v-if="activities.length==4">
        <div class="left">
          <div class="top">
            <a v-if="activities[0].type=='Link'" :href="activities[0].h5Url"><img :src="activities[0].image"></a>
            <img v-if="activities[0].type=='H5'" @click="onClickH5(activities[0].id,1)" :src="activities[0].image">
          </div>
          <div class="bottom">
            <a v-if="activities[1].type=='Link'" :href="activities[1].h5Url"><img :src="activities[1].image"></a>
            <img v-if="activities[1].type=='H5'" @click="onClickH5(activities[1].id,1)" :src="activities[1].image">
          </div>
        </div><div class="right">
          <div class="top">
            <a v-if="activities[2].type=='Link'" :href="activities[2].h5Url"><img :src="activities[2].image"></a>
            <img v-if="activities[2].type=='H5'" @click="onClickH5(activities[2].id,1)" :src="activities[2].image">
          </div>
          <div class="bottom">
            <a v-if="activities[3].type=='Link'" :href="activities[3].h5Url"><img :src="activities[3].image"></a>
            <img v-if="activities[3].type=='H5'" @click="onClickH5(activities[3].id,1)" :src="activities[3].image">
          </div>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="title">
        <img :src="titleList.product">
      </div>
      <div class="top">
        <a v-for="n in productAdList" v-if="n.type=='Link'" :href="n.h5Url"><img :src="n.image"></a>
        <img v-for="n in productAdList" @click="onClickH5(n.id,2)" v-if="n.type=='H5'" :src="n.image">
      </div>
      <div class="bottom">
        <div class="product-container" v-for="n in productList" :key="n.id" @click="onClickDetail(n.id)">
          <div class="product-img"><p class="double" v-if="n.isDoublePoints=='true'">双倍积分</p><img :src="n.image"></div>
          <p class="name van-ellipsis">{{n.name}}</p>
          <p class="money">&yen; <span>{{n.isStraight=='true'?n.straightPrice:n.price}}</span><del v-if="n.isStraight=='true'">&yen;{{n.price}}</del></p>
        </div>
      </div>
    </div>
    <div class="bottom_tab">
      <van-row>
        <van-col span="6"><div><img :src="iconList.homeLight"></div></van-col>
        <van-col span="6"><div @click="onClickBook"><img :src="iconList.booking"></div></van-col>
        <van-col span="6"><div @click="onClickVoucher"><img :src="iconList.giftCard"></div></van-col>
        <van-col span="6"><div @click="onClickMine"><img :src="iconList.my"></div></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Row, Col, Loading } from 'vant';
import { getHomeInfo } from "@/api/shop";
import { handleLogin } from "@/api/login";
import { getMenu } from "@/api/menu"
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Loading.name]: Loading,
  },
  data(){
    return{
      type: '',
      activities: [],
      categoryList: [],
      bannerList: [],
      productAdList: [],
      productList: [],
      titleList: [],
      iconList: [],
    }
  },
  methods: {
    onClickH5(id,type) {
      this.$router.push({path:'/shop/h5',query:{id:id,type:type}});
    },
    onClickSort(i) {
      this.$router.push({path:'/shop/sort',query:{categoryIndex:i}});
    },
    onClickBook() {
      this.$router.push({path:'/shop/sort'});
    },
    onClickVoucher() {
      this.$router.push({path:'/voucher'});
    },
    onClickMine() {
      this.$router.push({path:'/mine'});
    },
    onClickDetail(id) {
      this.$router.push({path:'/shop/sort',query:{productId:id}});
      // this.$router.push({path:'/shop/sort',query:''});
    }
  },
  mounted(){
    handleLogin();
    getMenu().then(res=>{
      this.iconList = res.data.data;
    });
    getHomeInfo().then(res=>{
      // console.log(res);
      this.activities = res.data.data.promoteAdList;
      this.productAdList = res.data.data.productAdList;
      // this.bannerList = res.data.data.eventList;
      this.bannerList = res.data.data.banner;
      // console.log(this.bannerList);
      this.categoryList = res.data.data.productCategoryList;
      this.productList = res.data.data.productList;
      this.titleList = res.data.data.menu;
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#shop{
  padding-bottom: 1.333333rem;
  box-sizing: border-box;
  .loading-box{
    width: 100%;
    height: 100%;
    position: fixed;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    background: #e5e5e5;

  }
  .nav-container{
    height: 2.56rem;
    border-bottom: 0.266667rem solid #f6f6f6;
    .van-col.van-col--6{
      text-align: center;
      img{
        width: 1.2rem;
        height: 1.2rem;
        margin-top: 0.4rem;
      }
      p{
        font-size: 0.32rem;
        color: #666;
        line-height: 0.666667rem;
        text-align: center;
      }
    }
  }
  .banner{
    border-bottom: 0.266667rem solid #f6f6f6;
    div.title{
      width: 100%;
      height: 1.2rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .banner-box.one{
      margin: 0 0.32rem;
      height: 5.28rem;
      padding-bottom: 0.4rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .banner-box.two{
      margin: 0 0.32rem;
      height: 5.28rem;
      padding-bottom: 0.4rem;
      .left,
      .right{
        width: 50%;
        height: 100%;
        display: inline-block;
        padding-right: 0.053333rem;
        box-sizing: border-box;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .banner-box.three{
      margin: 0 0.32rem;
      height: 5.28rem;
      padding-bottom: 0.4rem;
      .left{
        width: 50%;
        height: 100%;
        display: inline-block;
        padding-right: 0.053333rem;
        box-sizing: border-box;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .right{
        width: 50%;
        height: 100%;
        display: inline-block;
        padding-left: 0.053333rem;
        box-sizing: border-box;
        .top, .bottom{
          width: 100%;
          height: 50%;
          box-sizing: border-box;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .top{
          padding-bottom: 0.053333rem;
        }
        .bottom{
          padding-top: 0.053333rem;
        }
      }
    }
    .banner-box.four{
      margin: 0 0.32rem;
      height: 5.28rem;
      padding-bottom: 0.4rem;
      .left,
      .right{
        width: 50%;
        height: 100%;
        display: inline-block;
        padding-right: 0.053333rem;
        box-sizing: border-box;
        .top, 
        .bottom{
          width: 100%;
          height: 50%;
          margin-top: 0.106667rem;
          box-sizing: border-box;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .recommend{
    div.title{
      width: 100%;
      height: 1.2rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .top{
      padding: 0 0.32rem;
      width: 100%;
      box-sizing: border-box;
      img{
        width: 100%;
        height: 2.933333rem;
        margin-bottom: 0.186667rem;
      }
    }
    .bottom{
      padding: 0.106667rem 0.2rem;
      width: 100%;
      box-sizing: border-box; 
      .product-container{
        width: 50%;
        padding: 0 0.12rem 0.346667rem 0.12rem;
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

}
</style>
