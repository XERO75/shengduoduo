<template>
  <div id="home-list">
    <HeaderBar title="搜索商品" @back="onClickBack" @cart="onClickCart"></HeaderBar>
    <div class="product-container">
			<p class="title title-product">全部商品</p>
			<div class="tab-container f-vertical">
				<div class="tab" :class="productTabIndex === '综合' ? 'active' : ''" @click="onClickProTab('综合')">综合</div>
        <div class="tab" :class="productTabIndex === 0 ? 'active' : ''" @click="onClickProTab(0)">新品</div>
        <div class="tab" :class="productTabIndex === 1 ? 'active' : ''" @click="onClickProTab(1)">销量</div>
        <div class="tab" :class="productTabIndex === 2 ? 'active' : ''" @click="onClickProTab(2)"><span>价格</span></div>
			</div>
	    <div class="product-list">
	      <div v-for="(item, index) in products" :key="index" class="product-container" @click="onClickDetail">
	        <div class="product-img"><img :src="item.pictureUrl"></div>
	        <p class="name van-ellipsis">{{item.name}}</p>
	        <p class="money">&yen;{{item.minPrice}}</p>
	      </div>
	    </div>
    </div>
  </div>
</template>

<script>
import { Search, Toast } from 'vant';
import HeaderBar from '@/components/HeaderBar';
import { findProductByName } from '@/api/home'
// import {  } from "@/api/home";
export default {
  components: {
    [Toast.name]: Toast,
    [Search.name]: Search,
    HeaderBar
    // [Loading.name]: Loading,
  },
  data(){
    return{
      name: '',
      products: '',
      productTabIndex: '综合',
      priceStatus: true, // 价格升降序切换 ， true 为 2，false 为3
    }
  },
  methods: {
    onClickBack() {
      this.$router.go(-1);
    },
    onClickCart() {
      this.$router.push({path:'/cart'});
    },
    // 根据值搜索获得商品列表
    async findProductByName(number) {
      let that = this
      let parms = {}
      parms.name = this.name
      number === '综合' ? parms.number = '' : parms.number = number
      parms.pageNum = 1
      parms.pageSize = 10
      await findProductByName(parms).then(res => {
        if (res.data.code === 0) {

        } else {
          Toast(res.data.errmsg)
        }
      })
    }
  },
  mounted(){
    if (this.$route.query.value) {
      this.name = this.$route.query.value
      this.findProductByName('综合')
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .product-container{
  	background-color: #fff;
  	.tab-container{
  		width: 100%;
  		height: 1.066667rem;
      line-height: 1.066667rem;
  		.tab{
				width: 25%;
				height: 100%;
				line-height: 1.066667rem;
				display: inline-block;
				text-align: center;
        font-size: 0.373333rem;
        color: #2d2d2d;
				border-bottom: 1px solid #f6f6f6;
        &.active{
          color: #e64a19;
        }
        &:last-child span{
          display: inline-block;
          position: relative;
          padding-right: 0.266667rem;
          &:before{
            content: '';
            width: 0.186667rem;
            height: 0.106667rem;
            display: inline-block;
            background: url(./../../image/价格上-灰@2x.png) no-repeat;
            -webkit-background-size: 0.186667rem 0.106667rem;
            background-size: 0.186667rem 0.106667rem;
            position: absolute;
            bottom: 50%;
            margin-bottom: 0.026667rem;
            right: 0;
          }
          &:after{
            content: '';
            width: 0.186667rem;
            height: 0.106667rem;
            display: inline-block;
            background: url(./../../image/价格下-灰@2x.png) no-repeat;
            -webkit-background-size: 0.186667rem 0.106667rem;
            background-size: 0.186667rem 0.106667rem;
            position: absolute;
            top: 50%;
            margin-top: 0.026667rem;
            right: 0;
          }
        }
  		}
  	}
    .product-list{
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
</style>
