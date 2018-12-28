<template>
  <div id="store">
		<div class="store-container">
			<div class="bg-container">
				<img class="img-bg" src="./../../image/顶部背景@2x.png">
				<img class="img-store" :src="storeInfo.logo">
			</div>
			<p class="name">{{storeInfo.shopName}}</p>
			<p class="info">商品数量：<span>{{storeInfo.productNumber}} </span> 已拼：<span>{{storeInfo.collageNumber}}</span></p>
			<div class="btn-container f-vertical f-center">
        <span class="client f-center"><img mode="widthFix" src="../../image/客服@2x.png"/><a :href="storeInfo.hotLine">客服</a></span>
        <span v-if="!isFavorite" class="collect f-center" @click="addFavorite"><img mode="widthFix" src="../../image/收藏@2x.png"/>收藏</span>
        <span v-else class="alredyCollect f-center" @click="removeFavorite"><img mode="widthFix" src="../../image/订单评价-星星-红@2x.png"/>已收藏</span>
        <span class="share f-center"><img mode="widthFix" src="../../image/分享@2x.png"/>分享</span>
			</div>
			<div class="ticket-container">
				<div v-for="(item, index) in coupons" :key="index" class="ticket" :class="item.status === '已领取' ? 'used' : ''">{{item.couponName}} <span v-if="item.status === '领取中'" @click="takeShopCoupon(item.id)">领取</span><span v-else>已领取</span></div>
				<!-- <div class="ticket used">满100减5 <span>已领取</span></div>
				<div class="ticket">满100减5 <span>领取</span></div> -->
			</div>
		</div>
    <div class="pin-container">
      <p class="title title-pin title-more">大家正在拼<span class="more">查看更多</span></p>
      <div class="pin-list">

        <div v-for="(item, index) in collage" :key="index" class="pin-box">
          <div class="member">
          	<img class="member-img" :src="item.avatar">
          	<p>{{item.name}}</p>
          </div>
          <p class="timeout">剩余 <span>15:05:55</span></p>
          <img class="pin-img" :src="item.productImage">
          <p class="name">{{item.productName}}</p>
          <p class="price">&yen; {{item.minPrice}}</p>
        </div>

      </div>
    </div>
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
import { Toast } from 'vant';
import { shopInfo, shopCollage, shopCouponList, takeShopCoupon, findProductByShopId, myFavoriteShop, removeFavorite, addFavorite } from '@/api/store'
export default {
  components: {
    [Toast.name]: Toast
  },
  data(){
    return{
      code: null, // 当前店铺的code，通过query获取
      storeInfo: null, // 当前店铺的信息
      coupons: null, // 当前店铺可领取的优惠券
      collage: null, // 正在拼团的信息
      products: null, // 全部商品信息
      productTabIndex: '综合',
      priceStatus: true, // 价格升降序切换 ， true 为 2，false 为3
      isFavorite: false
    }
  },
  methods: {
    onClickDetail() {
      this.$router.push({path:'/home/detail'});
      // this.$router.push({path:'/shop/sort',query:''});
    },
    onClickProTab(status) {
      this.productTabIndex = status
      if (status === 2) {
        this.priceStatus ? status = 2 : status = 3
        this.priceStatus = !this.priceStatus
      }
      this.findProductByShopId(status)
    },
    // 根据code获取商铺详情
    async shopInfo() {
      let code = this.code
      let that = this
      await shopInfo(code).then(res => {
        if (res.data.code === 0) {
          that.storeInfo = res.data.data
          that.coupons = res.data.data.shopCouponList
          that.shopCouponList()
        } else {
          Toast(res.data.errmsg)
        }
      })
    },
    // 根据code获取商铺正在拼团信息
    async shopCollage() {
      let that = this
      let code = this.code
      let number = 3 // 显示条数
      await shopCollage(code, number).then(res => {
        if (res.data.code === 0) {
          that.collage = res.data.data
        } else {
          Toast(res.data.errmsg)
        }
      })
    },
    // 根据code获取用户已领取的该店铺的优惠券 需要将获取到的couponId和商铺的couponList中的每一项的id比对，一致即已领取
    async shopCouponList() {
      let that = this
      let code = this.code
      await shopCouponList(code).then(res => {
        if (res.data.code === 0) {
          // 双循环遍历 比较couponId 和 id，一致的情况，将状态变为已领取
          for (let i of res.data.data) {
            for (let j of that.coupons) {
              if(i.couponId === j.id) {
                j.status = '已领取'
              }
            }
          }
        } else {
          Toast(res.data.errmsg)
        }
      })
    },
    // 领取优惠券
    async takeShopCoupon(couponId) {
      let that = this
      await takeShopCoupon(couponId).then(res => {
        if (res.data.code === 0) {
          Toast('领取优惠券成功')
          that.shopInfo() // 更新页面状态
        } else {
          Toast(res.data.errmsg)
        }
      })
    },
    // 获取该店铺的全部商品
    async findProductByShopId(number) {
      let that = this
      let parms = {}
      number === '综合' ? parms.number = '' : parms.number = number  // 如果传入的参为全部 则为'' ，其他情况赋值number
      parms.pageNum = 1
      parms.pageSize = 10
      // parms.shopId = this.code
      parms.shopId = '1'
      await findProductByShopId(parms).then(res => {
        if (res.data.code === 0) {
          that.products = res.data.data.list
        } else {
          Toast(res.data.errmsg)
        }
      })
    },
    // 用户的店铺收藏，调这个接口对比当前店铺，查看是否已收藏
    async myFavoriteShop() {
      let that = this
      await myFavoriteShop().then(res => {
        if (res.data.code === 0) {
          for (let i of res.data.data) {
            if (i.code === this.code) {
              that.isFavorite = true
            } else {
              that.isFavorite = false
            }
          }
        } else {
          Toast(res.data.errmsg)
        }
      })
    },
    // 添加收藏
    async addFavorite() {
      let that = this
      let formData = new FormData()
      formData.append('code', this.code)
      await addFavorite(formData).then(res => {
        if (res.data.code === 0) {
          Toast('收藏成功')
          that.myFavoriteShop()  // 刷新页面状态
        } else {
          Toast(res.data.errmsg)
        }
      })
    },
    // 移除收藏
    async removeFavorite() {
      let that = this
      let formData = new FormData()
      formData.append('code', this.code)
      await removeFavorite(formData).then(res => {
        if (res.data.code === 0) {
          Toast('取消收藏成功')
          that.myFavoriteShop() // 刷新页面状态
        } else {
          Toast(res.data.errmsg)
        }
      })
    }
  },
  mounted(){
    if (this.$route.query.code) {
      this.code = this.$route.query.code
      this.shopInfo()  // 获取商铺信息
      this.shopCollage()  // 获取拼团信息
      this.findProductByShopId('综合') // 获取商品信息
      this.myFavoriteShop() // 是否已收藏该店铺
    } else {
      Toast('无店铺信息')
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#store{
	min-height: 100%;
	background-color: #f6f6f6;
  p.title{
    line-height: 1.2rem;
    padding-left: 0.9rem;
    padding-right: 0.64rem;
    border-bottom: 1px solid #f6f6f6;
    font-size: 0.4rem;
    font-weight: bold;
    position: relative;
    &.title-pin:before{
      content: '';
      width: 0.333333rem;
      height: 0.4rem;
      display: block;
      position: absolute;
      left: 0.4rem;
      top: 50%;
      margin-top: -0.2rem;
      background: url(./../../image/大家在拼@2x.png) no-repeat;
      -webkit-background-size: 0.333333rem 0.4rem;
      background-size: 0.333333rem 0.4rem;
    }
    &.title-product:before{
    	content: '';
    	width: 0.373333rem;
    	height: 0.4rem;
			display: block;
			position: absolute;
			left: 0.4rem;
			top: 50%;
			margin-top: -0.186667rem;
			background: url(./../../image/全部商品@2x.png) no-repeat;
			-webkit-background-size: 0.373333rem 0.4rem;
			background-size: 0.373333rem 0.4rem;
    }
    &.title-more:after{
    	content: '';
    	width: 0.133333rem;
    	height: 0.24rem;
			display: block;
			position: absolute;
			right: 0.4rem;
			top: 50%;
			margin-top: -0.12rem;
			background: url(./../../image/MORE@2x.png) no-repeat;
			-webkit-background-size: 0.133333rem 0.24rem;
			background-size: 0.133333rem 0.24rem;
    }
    span{
      font-weight: normal;
      font-size: 0.293333rem;
      color: #666;
    	float: right;
    }
  }
	.store-container{
		text-align: center;
		background-color: #fff;
		border-bottom: 0.266667rem solid #f6f6f6;
		padding-bottom: 0.4rem;
		.bg-container{
			width: 100%;
			height: 2.666667rem;
			position: relative;
			padding-bottom: 0.4rem;
			img.img-bg{
				width: 100%;
				height: 100%;
			}
			i.icon-search{
				content: '';
				width: 20px;
				height: 20px;
				display: block;
				position: absolute;
				top: 15px;
				right: 15px;
				background: url(./../../image/MORE@2x.png) no-repeat;
				-webkit-background-size: 20px 20px;
				background-size: 20px 20px;
			}
			img.img-store{
				width: 2.0rem;
				height: 2.0rem;
        border: 1px solid #f6f6f6;
        border-radius: 0.053333rem;
				display: block;
				position: absolute;
				bottom: 0;
				left: 50%;
				margin-left: -1rem;
			}
		}
		p.name{
      padding-top: 0.293333rem;
      font-size: 0.426667rem;
      color: #2d2d2d;
      font-weight: bold;
		}
		p.info{
      padding-top: 0.16rem;
      font-size: 0.32rem;
      color: #999;
      span{
        font-weight: bold;
      }
		}
		.btn-container{
      padding-top: 0.333333rem;
      padding-bottom: 0.4rem;
			span{
        min-width: 1.84rem;
        height: 0.613333rem;
				border: 1px solid #ed6625;
        margin-right: .266667rem;
				border-radius: 0.053333rem;
        font-size: 0.32rem;
				color: #ed6625;
        a{
          color: #ed6625;
        }
        img{
          width: 0.3rem;
          height: auto;
          margin-right: .133333rem;
        }
			}
		}
		.ticket-container{
			.ticket{
        width: 2.96rem;
        height: 0.64rem;
        padding-left: 0.266667rem;
        box-sizing: border-box;
				display: inline-block;
        font-size: 0.266667rem;
        color: #fff;
        line-height: 0.64rem;
        background: url(./../../image/未领取@2x.png) no-repeat;
        -webkit-background-size: 2.96rem 0.64rem;
        background-size: 2.96rem 0.64rem;
        &.used{
          background: url(./../../image/已领取@2x.png) no-repeat;
          -webkit-background-size: 2.96rem 0.64rem;
          background-size: 2.96rem 0.64rem;
        }
        span{
          width: 1.0rem;
          height: 100%;
          display: inline-block;
          float: right;
          text-align: center;
          border-left: 0.5px dashed #fff;
        }
			}
		}
	}
  .pin-container{
		background-color: #fff;
		border-bottom: 0.266667rem solid #f6f6f6;
    .pin-list{
    	width: 100%;
      padding: 0 0.32rem;
      box-sizing: border-box;
    	.pin-box{
				width: 33.33%;
				display: inline-block;
				padding: 0.4rem 0.08rem;
    		box-sizing: border-box;
    		margin: 0 auto;
    		.member{
    			img{
    				width: 0.48rem;
    				height: 0.48rem;
    				border-radius: 50%;
    			}
    			p{
    				display: inline-block;
    				vertical-align: top;
    				line-height: 0.48rem;
            font-size: 0.32rem;
            color: #2d2d2d;
    			}
    		}
    		.timeout{
          font-size: 0.293333rem;
          color: #2d2d2d;
    			span{
            color: #8FC221;
    			}
    		}
    		img.pin-img{
    			width: 100%;
          border-radius: 0.04rem;
    		}
    		p.name{
          font-size: 0.346667rem;
          color: #2d2d2d;
          padding-top: 0.16rem;
    		}
    		p.price{
          font-size: 0.32rem;
          font-weight: bold;
          color: #8FC221;
    		}
    	}
    }
  }
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
          color: #8FC221;
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

}
</style>
