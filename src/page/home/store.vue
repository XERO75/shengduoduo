<template>
  <div id="store">
		<div class="store-container">
			<div class="bg-container">
				<img class="img-bg" src="./../../img/banner.png">
				<i class="icon-search"></i>
				<img class="img-store" src="./../../pic/box.png">
			</div>
			<p class="name">河北看看</p>
			<p class="info">商品数量：<span>52 </span> 已拼：<span>4545</span></p>
			<div class="btn-container">
				<span>客服</span>
				<span>收藏</span>
				<span>分享</span>
			</div>
			<div class="ticket-container">
				<div class="ticket">满100减5 <span>领取</span></div>
				<div class="ticket">满100减5 <span>领取</span></div>
				<div class="ticket">满100减5 <span>领取</span></div>
			</div>
		</div>
    <div class="pin-container">
      <p class="title title-more">大家正在拼<span class="more">查看更多</span></p>
      <div class="pin-list">
        <div class="pin-box">
          <div class="member">
          	<img class="member-img" src="./../../pic/user2.jpg">
          	<p>jahsjd</p>
          </div>
          <p class="timeout">剩余 <span>15:05:55</span></p>
          <img class="pin-img" src="./../../pic/box.png">
          <p class="name">阿斯顿</p>
          <p class="price">&yen; 13.6</p>
        </div><div class="pin-box">
          <div class="member">
          	<img class="member-img" src="./../../pic/user2.jpg">
          	<p>jahsjd</p>
          </div>
          <p class="timeout">剩余 <span>15:05:55</span></p>
          <img class="pin-img" src="./../../pic/box.png">
          <p class="name">阿斯顿</p>
          <p class="price">&yen; 13.6</p>
        </div><div class="pin-box">
          <div class="member">
          	<img class="member-img" src="./../../pic/user2.jpg">
          	<p>jahsjd</p>
          </div>
          <p class="timeout">剩余 <span>15:05:55</span></p>
          <img class="pin-img" src="./../../pic/box.png">
          <p class="name">阿斯顿</p>
          <p class="price">&yen; 13.6</p>
        </div>
      </div>
    </div>
		<div class="product-container">
			<p class="title">全部商品</p>
			<div class="tab-container">
				<div class="tab active">综合</div><div class="tab">新品</div><div class="tab">销量</div><div class="tab">价格</div>
			</div>
	    <div class="product-list">
	      <!-- <div class="product-container" v-for="n in productList" :key="n.id" @click="onClickDetail(n.id)">
	        <div class="product-img"><p class="double" v-if="n.isDoublePoints=='true'">双倍积分</p><img :src="n.image"></div>
	        <p class="name van-ellipsis">{{n.name}}</p>
	        <p class="money">&yen; <span>{{n.isStraight=='true'?n.straightPrice:n.price}}</span><del v-if="n.isStraight=='true'">&yen;{{n.price}}</del></p>
	      </div> -->
	      <div class="product-container" @click="onClickDetail">
	        <div class="product-img"><img src="./../../pic/product.png"></div>
	        <p class="name van-ellipsis">99598529</p>
	        <p class="money">&yen;511</p>
	      </div><div class="product-container" @click="onClickDetail">
	        <div class="product-img"><img src="./../../pic/product.png"></div>
	        <p class="name van-ellipsis">99598529</p>
	        <p class="money">&yen;511</p>
	      </div>
	    </div>
    </div>

    <!-- <div class="new">
      <div class="img-title">
        <img src="" alt="">
        <span class="more">更多></span>
      </div>
      <div class="ad-list">
        <div class="ad-container">
          <img src="./../../pic/earphone.png">
        </div><div class="ad-container">
          <img src="./../../pic/earphone.png">
        </div>
      </div>
      <div class="pin-list">
        <div class="pin-container" @click="onClickDetail">
          <div class="pin-img"><img src="./../../pic/pin.png"></div>
          <p class="name van-ellipsis">99598529</p>
          <p class="money">&yen;511</p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import {  } from 'vant';
// import { getHomeInfo } from "@/api/shop";
// import { handleLogin } from "@/api/login";
// import { getMenu } from "@/api/menu"
export default {
  components: {
    // [Loading.name]: Loading,
  },
  data(){
    return{

    }
  },
  methods: {
    onClickDetail() {
      this.$router.push({path:'/home/detail'});
      // this.$router.push({path:'/shop/sort',query:''});
    }
  },
  mounted(){
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#store{
	min-height: 100%;
	background-color: #f6f6f6;
  p.title{
    line-height: 40px;
    padding: 0 30px;
    border-bottom: 1px solid #f6f6f6;
    position: relative;
    &:before{
    	content: '';
    	width: 18px;
    	height: 18px;
			display: block;
			position: absolute;
			left: 10px;
			top: 50%;
			margin-top: -9px;
			background: url(./../../img/addr-dele.png) no-repeat;
			-webkit-background-size: 18px 18px;
			background-size: 18px 18px;
    }
    &.title-more:after{
    	content: '';
    	width: 15px;
    	height: 15px;
			display: block;
			position: absolute;
			right: 10px;
			top: 50%;
			margin-top: -7px;
			background: url(./../../img/addr-loc.png) no-repeat;
			-webkit-background-size: 15px 15px;
			background-size: 15px 15px;
    }
    span{
    	float: right;
    }
  }
	.store-container{
		text-align: center;
		background-color: #fff;
		border-bottom: 10px solid #f6f6f6;
		padding-bottom: 15px;
		.bg-container{
			width: 100%;
			height: 100px;
			position: relative;
			padding-bottom: 20px;
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
				background: url(./../../img/addr-loc.png) no-repeat;
				-webkit-background-size: 20px 20px;
				background-size: 20px 20px;
			}
			img.img-store{
				width: 60px;
				height: 60px;
				display: block;
				position: absolute;
				bottom: 0;
				left: 50%;
				margin-left: -30px;
			}
		}
		p.name{

		}
		p.info{

		}
		.btn-container{
			span{
				display: inline-block;
				border: 1px solid #ed6625;
				padding: 5px 10px 5px 35px;
				border-radius: 3px;
				color: #ed6625;
				position: relative;
				&:before{
					content: '';
					width: 12px;
					height: 12px;
					display: block;
					position: absolute;
					left: 10px;
					top: 50%;
					transform: translate(0, -50%);
					background: url(./../../img/addr-loc.png) no-repeat;
					-webkit-background-size: 12px 12px;
					background-size: 12px 12px;
				}
			}
		}
		.ticket-container{
			.ticket{
				display: inline-block;
			}
		}
	}
  .pin-container{
		background-color: #fff;
		border-bottom: 10px solid #f6f6f6;
    .pin-list{
    	width: 100%;
    	.pin-box{
				width: 33.33%;
				display: inline-block;
				padding: 10px 2px;
    		box-sizing: border-box;
    		margin: 0 auto;
    		.member{
    			img{
    				width: 24px;
    				height: 24px;
    				border-radius: 50%;
    			}
    			p{
    				display: inline-block;
    				vertical-align: top;
    				line-height: 24px;
    			}
    		}
    		.timeout{
    			span{

    			}
    		}
    		img.pin-img{
    			width: 95%;
    		}
    		p.name{

    		}
    		p.price{

    		}
    	}
    }
  }
  .product-container{
  	background-color: #fff;
  	.tab-container{
  		width: 100%;
  		height: 36px;
  		.tab{
				width: 25%;
				height: 100%;
				line-height: 36px;
				display: inline-block;
				text-align: center;
				border-bottom: 1px solid #f6f6f6;
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
