<template>
  <div id="shop-sort">
    <transition
      v-for="(ball, index) in balls"
      :key="ball.id"
      name="ballslist"
      @appear="appear"
      @after-appear="afterAppear">
      <div
        v-if="ball.show"
        class="ball"
        :data-id="ball.id"
        :style="{transform: `translate3d(${ball.x}px, ${ball.y}px, 0)`}"></div>
    </transition>
    <div class="progress-container">
      <van-row type="flex" justify="space-between">
        <van-col span="8">
          <img src="./../../img/选择商品@2x.png">
          <p class="active">选择商品</p>
        </van-col>
        <van-col span="8">
          <img src="./../../img/送奶配置-灰@2x.png">
          <p>送奶服务</p></van-col>
        <van-col span="8">
          <img src="./../../img/填写地址-灰@2x.png">
          <p>填写地址</p></van-col>
        <van-col span="8">
          <img src="./../../img/提交订单-灰@2x.png">
          <p>提交订单</p></van-col>
      </van-row>
    </div>
    <ul class="tabs">
      <!-- <li v-for="(item,index) in alltabs" :class="{activeTab:index==isActive}" @click="tab(index)" :key="index">{{item.categoryName}}</li> -->
      <li class="activeTab" @click="clickTab">全部</li>
      <li @click="clickTab">瓶装鲜奶酸奶</li>
      <li @click="clickTab">杯装酸奶</li>
      <li @click="clickTab">袋装鲜奶</li>
    </ul>
    <div class="tabCon">
      <!-- <div class="product-container" v-for="(n,i) in tabsconten" :key="i" @click="onClickList(i)">
        <img :src="n.categoryImg">
        <p>{{n.categoryName}}</p> 
      </div> -->
      <div class="product-container" key="0">
        <img src="./../../pic/product.png">
        <div class="info">
          <p class="name">Apple iPhone X (A1903) 64GB 银色银色银色银色</p>
          <p class="size">236ml</p>
          <p class="price">&yen;
            <span class="new_price">56&nbsp;</span>
            <del class="old_price">&yen;69</del>
            <i class="icon-add" @click="onClickAction"></i>
          </p>
        </div>
      </div>
      <div class="product-container" key="1">
        <img src="./../../pic/product.png">
        <div class="info">
          <p class="name">Apple iPhone X (A1903) 64GB 银色银色银色银色</p>
          <p class="size">236ml</p>
          <p class="price">&yen;
            <span class="new_price">56&nbsp;</span>
            <del class="old_price">&yen;69</del>
            <i class="icon-edit" @click="onClickNext"></i>
          </p>
        </div>
      </div>
    </div> 
    <div class="bottom-container">
      <i class="icon-cart" @click="show=!show"></i>
      <span class="circle-count">{{count}}</span>
      <p class="total">&yen;<span> 365.3</span></p><p class="home" @click="onClickShop">
        <i class="icon-home"></i>
      </p><p class="next" @click="onClickNext">下一步</p>
    </div>
    <van-popup v-model="show" position="bottom">
      <div class="cart-box">
        <p class="title">已选商品<span class="clear">清空</span></p>
        <div class="cart-list">
          <div class="cart-item">
            <p class="name">谷元黑米牛奶饮品236ml <strong>&yen; <span>65.3</span></strong></p>
            <p class="size">30瓶/每日1瓶</p>
            <span class="action-box">
              <i class="icon-delete"></i>
              <i class="icon-edit"></i>
            </span>
          </div>
          <div class="cart-item">
            <p class="name">谷元黑米牛奶饮品236ml <strong>&yen; <span>65.3</span></strong></p>
            <p class="size">30瓶/每日1瓶</p>
            <span class="action-box">
              <i class="icon-delete"></i>
              <i class="icon-edit"></i>
            </span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Row, Col, Tab, Tabs, Popup } from 'vant';
// import { articleList } from "@/api/article"
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup,
  },
  data(){
    return{
      isActive: 0,//默认选择
      count: 5,
      show: false,

      balls: [],
      // 控制小球运动速度
      speed: 8,
      // 购物车坐标
      target: {x: 70, y: 434}
      // showBall: false,
    }
  },
  methods: {
    onClickShop() {
      this.$router.push({path:'/shop'});
    },
    clickTab(event) {
      // console.log(event.currentTarget);
      let tab = document.getElementsByClassName('activeTab');
      for (var i = 0; i < tab.length; i++) {
        tab[i].classList.remove('activeTab');
      }
      event.currentTarget.classList.add('activeTab');
      // tab高亮切换
      // this.isActive=index;
      //子内容切换
      // let pid =this.alltabs[index].id;
      // allList(pid).then(Response =>{
      //   this.tabsconten=Response.data.data;
      // })
    },
    onClickNext() {
      this.$router.push({path:'/shop/detail'});
    },
    onClickAction(event){
      let e = event.currentTarget;
      if (e.classList.contains("icon-add")) {
        this.add(event.pageX-50, event.pageY-110);
        e.classList.remove("icon-add");
        e.classList.add("icon-edit");
      }else{
        this.onClickNext();
      }
    },
    add(x, y) {
      let balls = this.balls
      balls.push({id: new Date().getTime(), x, y, show: true})
      // console.log(balls);
    },
    move(el, x, y, a, done) {
      let style = el.style
      // 记录下起始点坐标
      let sx = x
      let sy = y

      let moveFn = (x, y) => {

        requestAnimationFrame(()=>{
          style.transform = `translate3d(${x}px, ${y}px, 0)`
          if(x > this.target.x) {
            y = a*Math.pow(x-sx, 2) + sy
            x -= this.speed
            moveFn(x, y)
          } else {
            console.log('done')
            done()
          }
        })
      }
      moveFn(x, y)
    },
    appear (el, done) {
      console.log('enter')
      let balls = this.balls
      let target = this.target
      // console.log(target);
      let id = el.dataset.id
      let x, y
      for (let i=0; i< balls.length; i++) {
        if (balls[i].id == id) {
          x = balls[i].x
          y = balls[i].y
          break
        }
      }
      // let {x, y} = balls[id]
      // 假设抛物线顶点在原点，则抛物线方式为 y = a*Math.pow(x-h, 2) + k，
      // 其中(h,k)即为抛物线顶点坐标
      let a = (target.y - y) / Math.pow(target.x - x, 2)
      this.move(el, x, y, a, done)
      // done()
    },
    afterAppear (el) {
      let balls = this.balls
      let id = el.dataset.id
      console.log('afterEnter', id)
      // 隐藏小球
      for (let i=0; i< balls.length; i++) {
        if (balls[i].id == id) {
          balls[i].show = false
          break
        }
      }
    }
  },
  mounted(){
    // this.click2Show();
    this.target.x = document.getElementsByClassName("bottom-container")[0].offsetLeft+70;
    this.target.y = document.getElementsByClassName("bottom-container")[0].offsetTop-120;
    // console.log(this.target);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#shop-sort{
  min-height: 100%;
  position: relative;
  box-sizing: border-box;
  padding-top: 2.613333rem;
  padding-bottom: 1.866667rem;
  .ball {
    position: absolute;
    //width: 0.533333rem;
    //height: 0.533333rem;
    width: 0.453333rem;
    height: 0.453333rem;
    border-radius: 50%;
    background-color: #e70012;
    z-index: 999;
  }
  .progress-container{
    width: 100%;
    box-sizing: border-box;
    z-index: 100;
    background-color: #fff;
    padding: 0.533333rem 0.533333rem;
    border-bottom: 1px solid #e5e5e5;
    position: fixed;
    top: 0;    
    .van-col{
      text-align: center;
      position: relative;
      img{
        width: 1.04rem;
        height: 1.04rem;
      }
      p{
        font-size: 0.293333rem;
        color: #999;
      }
      p.active{
        color: #202020;
      }
    }
    .van-col:after{
      content: '';
      width: 0.906667rem;
      height: 0.013333rem;
      display: block;
      background-color: #eee;
      position: absolute;
      right: -0.426667rem;
      top: 37%;
    }
    .van-col:last-child:after{
      width: 0;
    }
  }
  .tabs{
    background-color: #f6f6f6;
    position:fixed;
    width: 2.133333rem;
    min-height: 100%;
    li{
      height: auto;
      width: 2.133333rem;
      box-sizing: border-box;
      padding: 0.48rem 0.373333rem;
      color: #666;
      position: relative;
      font-size: 0.346667rem;
    }
    li.activeTab{
      color: #000;
      background-color: #fff;
    }
  }
  .tabCon{
    background-color: #fff;
    padding-left: 2.026667rem;
    .product-container{
      height: 2.293333rem;
      padding: 0.453333rem 0.373333rem 0 0.32rem;
      position: relative;
      img{
        width: 2.293333rem;
        height: 2.293333rem;
        border: 1px solid #e5e5e5;
        border-radius: 0.053333rem;
        position: absolute;
      }
      .info{
        margin-left: 2.533333rem;
        height: 2.293333rem;
        position: relative;
        p.name {
          font-size: 0.4rem;
          font-weight: bold;
          overflow:hidden; 
          text-overflow:ellipsis;
          display:-webkit-box; 
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2; 
        }
        p.size{
          font-size: 0.346667rem;
          color: #999;
          padding-top: 0.053333rem;
        }
        p.price{
          width: 100%;
          font-size: 0.4rem;
          color: #e70012;
          font-weight: bold;
          position: absolute;
          bottom: 0;
          span.new_price{
            font-size: 0.48rem;
          }
          del.old_price{
            font-size: 0.346667rem;
            color: #999;
            font-weight: normal;
          }
          i.icon-add{
            //content: '';
            width: 0.586667rem;
            height: 0.586667rem;
            display: block;
            background: url(./../../img/添加购买@2x.png) no-repeat;
            -webkit-background-size: 0.586667rem;
            background-size: 0.586667rem;
            position: absolute;
            bottom: 0;
            right: 0;
          }
          i.icon-edit{
            content: '';
            width: 0.586667rem;
            height: 0.586667rem;
            display: block;
            background: url(./../../img/修改规格@2x.png) no-repeat;
            -webkit-background-size: 0.586667rem;
            background-size: 0.586667rem;
            position: absolute;
            bottom: 0;
            right: 0;
          }
        }
      }
    }
  }
  .bottom-container{
    height: 1.306667rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 9999;
    i.icon-cart{
      width: 1.6rem;
      height: 1.266667rem;
      background: url(./../../img/购物车@2x.png) no-repeat;
      -webkit-background-size: 1.6rem 1.266667rem;
      background-size: 1.6rem 1.266667rem;
      position: absolute;
      left: 0.373333rem;
      bottom: 0.2rem;
    }
    span.circle-count{
      width: 0.533333rem;
      height: 0.533333rem;
      background-color: #e70012;
      box-sizing: border-box;
      border: 0.04rem solid #fff;
      border-radius: 0.266667rem;
      color: #fff;
      font-size: 0.293333rem;
      font-weight: bold;
      text-align: center;
      line-height: 0.453333rem;
      position: absolute;
      top: -0.32rem;
      left: 1.6rem;
    }
    p.total{
      width: 5.733333rem;
      height: 100%;
      line-height: 1.306667rem;
      display: inline-block;
      vertical-align: top;
      background-color: #4c4c4c;
      color: #fff;
      font-size: 0.4rem;
      font-weight: bold;
      padding-left: 2.32rem;
      box-sizing: border-box;
      span{
        font-size: 0.48rem;
      }
    }
    p.home{
      width: 1.333333rem;
      height: 100%;
      display: inline-block;
      vertical-align: top;
      background: #6a6a6a;
      position: relative;
      i.icon-home{
        width: 0.533333rem;
        height: 0.533333rem;
        background: url(./../../img/返回首页@2x.png) no-repeat;
        -webkit-background-size: 0.533333rem 0.533333rem;
        background-size: 0.533333rem 0.533333rem;
        position: absolute;
        left: 50%;
        margin-left: -0.266667rem;
        top: 50%;
        margin-top: -0.266667rem;
      }
    }
    p.next{
      width: 2.933333rem;
      height: 100%;
      display: inline-block;
      vertical-align: top;
      color: #fff;
      background-color: #e70012;
      line-height: 1.306667rem;
      text-align: center;
      font-size: 0.4rem;
    }
  }
  .van-popup{
    bottom: 1.306667rem;
    .title{
      width: 100%;
      height: 1.333333rem;
      box-sizing: border-box;
      font-size: 0.4rem;
      color: #202020;
      padding-left: 0.4rem;
      line-height: 1.333333rem;
      background-color: #f6f6f6;
      span.clear{
        width: 1.2rem;
        font-size: 0.346667rem;
        color: #666;
        float: right;
        text-align: right;
        padding-right: 0.4rem;
        position: relative;
        &:before{
          content: '';
          width: 0.373333rem;
          height: 0.386667rem;
          background: url(./../../img/地址管理-删除地址@2x.png) no-repeat;
          -webkit-background-size: 0.373333rem 0.386667rem;
          background-size: 0.373333rem 0.386667rem;
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -0.2rem;
        }
      }
    }
    .cart-list{
      padding-left: 0.4rem;
      .cart-item{
        position: relative;
        //height: 1.92rem;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 0.453333rem;
        .name{
          font-size: 0.373333rem;
          color: #333;
          padding: 0.48rem 0 0.106667rem 0;
          strong{
            font-size: 0.32rem;
            color: #e70012;
            span{
              font-size: 0.4rem;
            }
          }
        }
        .size{
          font-size: 0.346667rem;
          color: #666;
        }
        .action-box{
          width: 1.973333rem;
          height: 0.586667rem;
          display: inline-block;
          position: absolute;
          top: 50%;
          margin-top: -0.293333rem;
          right: 0;
          i.icon-delete{
            width: 0.586667rem;
            height: 0.586667rem;
            display: inline-block;
            background: url(./../../img/购物车删除@2x.png) no-repeat;
            -webkit-background-size: 0.586667rem 0.586667rem;
            background-size: 0.586667rem 0.586667rem;
            margin-right: 0.373333rem;
          }
          i.icon-edit{
            width: 0.586667rem;
            height: 0.586667rem;
            display: inline-block;
            background: url(./../../img/修改规格@2x.png) no-repeat;
            -webkit-background-size: 0.586667rem 0.586667rem;
            background-size: 0.586667rem 0.586667rem;
          }
        }
      }
    }
  }
}
</style>
