<template>
  <div id="store">
		<div class="store-container">
			<div class="bg-container">
				<img class="img-bg" src="./../../image/顶部背景@2x.png">
				<img class="img-store" src="./../../pic/box.png">
			</div>
			<p class="name">河北看看</p>
			<p class="info">商品数量：<span>52 </span> 已拼：<span>4545</span></p>
			<div class="btn-container">
				<span class="client">客服</span>
				<span class="collect">收藏</span>
				<span class="share">分享</span>
			</div>
			<div class="ticket-container">
				<div class="ticket">满100减5 <span>领取</span></div>
				<div class="ticket used">满100减5 <span>已领取</span></div>
				<div class="ticket">满100减5 <span>领取</span></div>
			</div>
		</div>
    <div class="pin-container">
      <p class="title title-pin title-more">大家正在拼<span class="more">查看更多</span></p>
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
			<p class="title title-product">全部商品</p>
			<div class="tab-container">
				<div class="tab active">综合</div><div class="tab">新品</div><div class="tab">销量</div><div class="tab"><span>价格</span></div>
			</div>
	    <div class="product-list">
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
  </div>
</template>

<script>
import {  } from 'vant';
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
				background: url(./../../img/addr-loc.png) no-repeat;
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
        width: 1.84rem;
        height: 0.613333rem;
        line-height: 0.613333rem;
        padding-left: 0.266667rem;
				display: inline-block;
				border: 1px solid #ed6625;
        box-sizing: border-box;
				border-radius: 0.053333rem;
        font-size: 0.32rem;
				color: #ed6625;
				position: relative;
        &.client:before{
          background: url(./../../image/客服@2x.png) no-repeat;
          -webkit-background-size: 0.28rem 0.373333rem;
          background-size: 0.28rem 0.373333rem;
        }
        &.collect:before{
          background: url(./../../image/收藏@2x.png) no-repeat;
          -webkit-background-size: 0.373333rem 0.346667rem;
          background-size: 0.373333rem 0.346667rem;
        }
        &.share:before{
          background: url(./../../image/分享@2x.png) no-repeat;
          -webkit-background-size:0.293333rem 0.306667rem;
          background-size:0.293333rem 0.306667rem;
        }
				&:before{
					content: '';
					width: 12px;
					height: 12px;
					display: block;
					position: absolute;
					left: 10px;
					top: 50%;
					transform: translate(0, -50%);
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
            color: #e64a19;
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
          color: #e64a19;
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

}
</style>
