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
      <li v-for="(n,i) in categoryList" :class="[i==0?'activeTab':'']" :key="i" @click="clickTab(i)">{{n.productCategory.name}}</li>
    </ul>
    <div class="tabCon">
      <div class="category-box" v-for="(n,i) in categoryList" :key="i">
        <div class="product-container" :class="{'doublePoints':m.isDoublePoints}" v-for="m in productList[i]" :key="m.id" >
          <img :src="m.image">
          <div class="info">
            <p class="name">{{m.name}}</p>
            <p class="size">{{m.specifications}}</p>
            <p class="price">&yen;
              <span class="new_price">{{m.isStraight?m.straightPrice:m.price}}&nbsp;</span>
              <del class="old_price" v-if="m.isStraight">&yen;{{m.price}}</del>
              <i class="icon-add" v-if="!m.isCart" @click="showProduct($event,m.id)"></i>
              <i class="icon-edit" v-if="m.isCart" @click="showCartProduct(m.id)"></i>
            </p>
          </div>
        </div>
      </div>
    </div> 
    <div class="bottom-container" v-if="!show2">
      <i v-if="!show" class="icon-cart" @click="showCartBox"></i>
      <i v-if="show" class="icon-cartOpen" @click="showCartBox"></i>
      <span class="circle-count" v-if="carts.length">{{carts.length}}</span><p v-if="carts.length" class="total">&yen;<span> {{totalCartPrice}}</span></p><p v-if="!carts.length" class="noproduct">未选购商品</p><p class="home" @click="onClickShop">
        <i class="icon-home"></i>
      </p><p class="next" @click="onClickNext">下一步</p>
    </div>
    <div v-else class="btn-container">
      <van-button v-if="!isEdit" class="btn-addCart" @click="addCart">添加到购物车</van-button>
      <van-button v-else class="btn-addCart" @click="editProduct">确定</van-button>
      <van-button class="btn-buy" @click="buyNow">立即购买 &yen;{{detail.isStraight?totalStraightPrice:totalPrice}}</van-button>
    </div>
    <van-popup class="cart-popup" v-model="show" position="bottom">
      <div class="cart-box">
        <p class="title">已选商品<span @click="clearCart" class="clear">清空</span></p>
        <div v-if="carts.length" class="cart-list">
          <div class="cart-item" v-for="c in carts">
            <p class="name van-ellipsis">{{c.productName}} {{c.specifications}} </p><strong>&yen; <span>{{c.totalPrice.replace('.00','')}}</span></strong>
            <p v-if="c.deliveryMethod=='Multiple'" class="size">{{c.count}}{{c.unit}}/每日{{c.number}}{{c.unit}}</p>
            <p v-if="c.deliveryMethod=='Single'" class="size">{{c.count}}{{c.unit}}(单次配送)</p>
            <span class="action-box">
              <i class="icon-delete" @click="deleteCart(c.id)"></i>
              <i class="icon-edit" @click="showCartProduct(c.produtId)"></i>
            </span>
          </div>
        </div>
        <div v-else class="noproduct">
          <img src="./../../img/未选购商品@2x.png">
          <p>暂无选购商品</p>
        </div>
      </div>
    </van-popup>
    <van-popup class="detail-popup" v-model="show2" position="bottom">
      <div id="shop-detail">
        <div class="img-container">
          <img mode="widthFix" :src="detail.image">
        </div>
        <div class="product-container">
          <p class="name">{{detail.name}} <span>{{detail.specifications}}</span></p>
          <p class="price">&yen;<span>{{detail.isStraight?totalStraightPrice:totalPrice}} </span><del v-if="detail.isStraight">&yen; {{totalPrice}}</del></p>
          <div class="multiple-container" v-if="detail.deliveryMethod=='Multiple'">
            <p class="total-title">总数量</p>
            <div class="total-container">
              <span class="total-num" :class="{'active':detail.count==30}" @click="handleChooseSize">30</span><span class="total-num" :class="{'active':detail.count==60}" @click="handleChooseSize">60</span><span class="total-num" :class="{'active':detail.count==90}" @click="handleChooseSize">90</span><span class="total-num" :class="{'active':detail.count==120}" @click="handleChooseSize">120</span><span class="total-num" :class="{'active':detail.count==150}" @click="handleChooseSize">150</span><span class="total-num" :class="{'active':detail.count==180}" @click="handleChooseSize">180</span>
            </div>
            <div class="preDay">
              <p class="title">每日配送</p>
              <div class="count-box">
                <i class="icon-delete" @click="onMinus"></i>
                <span class="num">{{detail.number}}</span>
                <i class="icon-add" @click="onPlus"></i>
              </div>
            </div>
          </div>
          <div class="single-container" v-if="detail.deliveryMethod=='Single'">
            <div class="preDay">
              <p class="title">总{{detail.unit}}数</p>
              <div class="count-box">
                <van-stepper v-model="detail.count" integer :min="1" :max="99" />
              </div>
            </div>
          </div>
          <van-row>
            <van-col span="8" class="left">产品单价：{{detail.isStraight?detail.straightPrice:detail.price}}元</van-col>
            <van-col span="8" class="center">单位：{{detail.unit}}</van-col>
            <van-col span="8" class="right">赠送积分：{{detail.points}}</van-col>
            <!-- <van-col span="6" class="center">净含量：{{detail.specifications}}</van-col> -->
          </van-row>
        </div>
        <van-tabs v-model="active">
          <van-tab class="tab-detail" title="商品详情" v-html="detail.introduction"></van-tab>
          <van-tab class="tab-view" title="用户评价">
            <div class="tag-container">
              <span class="tag active" @click="handleChooseAllView">全部 ({{totalTags}})</span>
              <span v-for="(n,i) in tags" class="tag" @click="handleChooseView($event,i)"><span class="str">{{n.tagname}}</span> ({{n.count}})</span>
            </div>
            <div class="view-container" v-for="(v,i) in comments" :key="i">
              <img class="avator" :src="v.avatar">
              <div class="view-content">
                <p class="name"><!-- {{v.memberName}} -->匿名用户<span>{{v.createDate}}</span></p>
                <div class="star-container">
                  <img v-for="s1 in v.stars" src="./../../img/用户评价1@2x.png"><img v-for="s2 in (5-v.stars)" src="./../../img/用户评价2@2x.png">
                  <span>数量：{{v.count}}</span>
                </div>
                <p class="view">{{v.otherComment}}</p>
              </div>
            </div>
            <!-- <span class="more">更多评价(98)</span> -->
          </van-tab>
        </van-tabs>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Row, Col, Tab, Tabs, Popup, Swipe, SwipeItem, Button, Toast, Stepper, Dialog } from 'vant';
import { getProductList, getProductDetail, getEditProduct, editProduct, addCart, getCart, deleteCart, clearCart, buyNow, getCommentsByTag } from "@/api/shop";
import { handleLogin } from "@/api/login";

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Stepper.name]: Stepper,
    [Dialog.name]: Dialog,
  },
  data(){
    return{
      // detail
      active: 0, //商品详情&评论tab
      show: false,
      show2: false,
      isEdit: false,
      detail: {},
      comments: [],
      tags: [],

      scrollTop: '', // 临时储存点商品详情前的scrollTop

      e: '',
      x: '',
      y: '',
      balls: [],
      speed: 7, // 控制小球运动速度

      categoryList: [],
      productList: [],
      allProductList: [],
      carts: [],
      cartIds: [],
      isEditable: true, // 清空购物车是判断是否能进行别的操作
    }
  },
  computed: {
    cartX(){
      let cart = document.getElementsByClassName("icon-cart")[0];
      return cart.offsetWidth + 10;
    },
    cartY(){
      // let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // return document.body.offsetHeight-165+scrollTop;
      return document.body.offsetHeight - 165 + this.scrollTop;
    },
    totalPrice(){
      return (this.detail.count * this.detail.price).toFixed(2);
    },
    totalStraightPrice(){
      return (this.detail.count * this.detail.straightPrice).toFixed(2);
    },
    totalCartPrice(){
      let total = 0;
      if(this.carts){
        for(let i=0;i<this.carts.length;i++) {
          total += Number(this.carts[i].totalPrice);
        }
        return total.toFixed(2);
      }else{
        return 0
      }
    },
    totalTags(){
      let total = 0;
      if(this.tags.length){
        for(let i=0;i<this.tags.length;i++) {
          total += this.tags[i].count;
        }
      }
      return total;
    },
  },
  methods: {
    /* 拼接二维数组 */
    getAllList(arr){
      let allList = [];
      if(arr){
        for(let i=0;i<arr.length;i++) {
          for(let j=0;j<arr[i].length;j++) {
            if(arr[i].length){
              allList.push(arr[i][j]);
            }
          }
        }
      }
      return allList;
    },
    /* 匹配数组对象的某个属性的值 返回该对象的索引 */
    getObjListIndex(arr,key,value){
      if(arr){
        for(let i=0;i<arr.length;i++) {
          if(arr[i][key]==value){
            return i;
            break;
          }
        }
      }
      return null;
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
    /* 滚动条滚动时左侧tab切换选中状态 */
    handleScroll() {
      if(!this.isScroll){
        let a = 100;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let tabs = document.getElementsByClassName("tabs")[0].children;
        let boxs = document.getElementsByClassName("category-box");
        for(let i = 0;i < tabs.length; i++) {
          if(scrollTop + a >= boxs[i].offsetTop){
            for(let j = 0;j < tabs.length; j++) {
              tabs[j].classList.remove("activeTab");
            }
            // tab_all.classList.remove("activeTab");
            tabs[i].classList.add("activeTab");
          }
        }
      }
    },
    /* 点击左侧tab的选择状态&缓动滚动到对应区域 */
    clickTab(i) {
      if(!this.isScroll){
        // 当该分类下的内容为空不执行操作
        // if(this.categoryList[i].product&&this.categoryList[i].product.length){
          let that = this;
          /* 点击tab高亮变化 */
          let tabs = document.getElementsByClassName("tabs")[0].children;
          tabs[0].classList.remove("activeTab");
          for(let j=0;j<tabs.length;j++) {
            tabs[j].classList.remove("activeTab");
          }
          tabs[i].classList.add("activeTab");
          /* 点击tab缓动到对应位置 */
          let timer = null;
          let boxs = document.getElementsByClassName("category-box");
          let a = 100; //progress盒子的高度
          let end = boxs[i].offsetTop - a;
          // console.log(boxs[i].offsetTop);

          // 方法一
          // 如果某个box的高度小于可视盒子的高度 则该盒子的底部滚动到可视盒子的底部
          // let end = 0;
          // let BoxOffsetHeight = document.body.offsetHeight - a; //可视商品的高度
          // if(boxs[i].offsetHeight<BoxOffsetHeight){ 
          //   end = boxs[i].offsetTop  - (document.body.offsetHeight-boxs[i].offsetHeight) - 50;
            
          // }else{
          //   end = boxs[i].offsetTop - a;
          // }

          clearInterval(timer);
          this.isScroll = true;
          timer = setInterval(function () {
            let step = (end-that.getScrollTop())/2;
            if(Math.abs(step)<1) step = 0
            step = step>0?Math.ceil(step):Math.floor(step);
            that.setScrollTop(that.getScrollTop() + step);
            if(step == 0){
              that.setScrollTop(end);
              clearInterval(timer);
              that.isScroll = false;
            }
          },25);
        // }
      }
      // document.documentElement.scrollTop = boxs[i].offsetTop - a +10;
    },
    /* 点击添加按钮弹出商品详情 */
    showProduct(event,id) {
      // console.log(document.documentElement.scrollTop);
      // this.scrollTop = this.getScrollTop();
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(this.scrollTop);
      this.isEdit = false;
      this.x = event.pageX-50;
      this.y = event.pageY-110;
      this.e = event.currentTarget;
      this.show2 = true;
      this.detail = []; // 数据初始化
      // this.add(this.x, this.y); // test

      getProductDetail(id).then(res=>{
        // console.log(res);
        this.setScrollTop(this.scrollTop);
        this.detail = res.data.data;
        this.comments = this.detail.comments;
        this.tags = this.detail.tags;
      })
    },
    /* 点击编辑按钮弹出商品详情 */
    showCartProduct(id) {
      this.scrollTop = this.getScrollTop();
      this.isEdit = true;
      this.show = false;
      this.show2 = true;
      this.detail = []; // 数据初始化
      // this.add(this.x, this.y);
      getEditProduct(id).then(res=>{
        this.setScrollTop(this.scrollTop);
        // console.log(res);
        this.detail = res.data.data;
        this.comments = this.detail.comments;
        this.tags = this.detail.tags ? this.detail.tags : [];
      })
    },
    /* 添加购物车抛物线动画 */
    addCart(){
      let formdata = new FormData();
      formdata.append('produtId',this.detail.id);
      formdata.append('count',this.detail.count);
      if(this.detail.deliveryMethod=='Multiple'){
        formdata.append('number',this.detail.number);
      }
      formdata.append('deliveryMethod',this.detail.deliveryMethod);
      addCart(formdata).then(res=>{
        if(res.data.code == 0){
          this.show2 = false;
          this.isEdit = false;
          Toast('添加购物车成功');
          // if (this.e&&this.e.classList.contains("icon-add")) {
            this.add(this.x, this.y);
          //   this.e.classList.remove("icon-add");
          //   this.e.classList.add("icon-edit");
          // }else{
          //   this.getCart();
          //   this.getProductList();
          //   this.$forceUpdate();
          // }

          this.getCart();
          this.getProductList();
          this.$forceUpdate();
        }else{
          Toast(res.data.errmsg);
        }
      })
    },
    /* 修改购物车商品 */
    editProduct(){
      let formdata = new FormData();
      formdata.append('id',this.detail.id);
      if(this.detail.deliveryMethod=='Multiple'){
        formdata.append('number',this.detail.number);
      }
      formdata.append('count',this.detail.count);
      editProduct(formdata).then(()=>{
        this.show2 = false;
        this.isEdit = false;
        this.getCart();
        this.getProductList();
        this.$forceUpdate();
      })
    },
    add(x, y) {
      let balls = this.balls;
      balls.push({id: new Date().getTime(), x, y, show: true})
    },
    move(el, x, y, a, done) {
      let style = el.style
      // 记录下起始点坐标
      let sx = x
      let sy = y
      let moveFn = (x, y) => {
      // this.setScrollTop(this.scrollTop);
        requestAnimationFrame(()=>{
          this.setScrollTop(this.scrollTop);
          style.transform = `translate3d(${x}px, ${y}px, 0)`;
          if(x > this.cartX) {
            y = a*Math.pow(x-sx, 2) + sy
            x -= this.speed
            moveFn(x, y)
          } else {
            // console.log('done')
            done()
          }
        })
      }
      // this.setScrollTop(this.scrollTop);
      moveFn(x, y)
    },
    appear (el, done) {
      // console.log('enter')
      let balls = this.balls
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
      // let a = (target.y - y) / Math.pow(target.x - x, 2)
      let a = (this.cartY - y) / Math.pow(this.cartX - x, 2)
      // this.setScrollTop(this.scrollTop);
      this.move(el, x, y, a, done)
      // done()
    },
    afterAppear (el) {
      // this.setScrollTop(this.scrollTop);
      let balls = this.balls
      let id = el.dataset.id
      // console.log('afterEnter')
      // 隐藏小球
      for (let i=0; i< balls.length; i++) {
        if (balls[i].id == id) {
          balls[i].show = false
          break
        }
      }
      this.getCart();
      this.getProductList();
      this.$forceUpdate();
    },
    getProductList(){
      getProductList().then(res=>{
        // console.log(res);
        this.categoryList = res.data.data;
        this.productList = [];
        if(this.categoryList){
          for(let i=0;i<this.categoryList.length;i++) {
            this.productList.push(this.categoryList[i].product);
          }
          this.allProductList = this.getAllList(this.productList); 
          // console.log(this.allProductList);
          for(let i=0;i<this.allProductList.length;i++) {
            this.allProductList[i].isCart = '';
            for(let j=0;j<this.cartIds.length;j++) {
              let pid = this.allProductList[i].id;
              let cid = this.cartIds[j];
              if(this.allProductList[i].id == this.cartIds[j]){
                this.allProductList[i].isCart = true;
                break;
              }else{
                this.allProductList[i].isCart = false;
              }
            }
          }
        }
        // if(this.$route.query)
        // console.log(this.allProductList);
      })
    },
    /* 获取购物车信息 */
    getCart(){
      getCart().then(res=>{
        // console.log(res);
        this.carts = res.data.data;
        console.log(this.carts);
        this.cartIds = [];
        if(this.carts){
          for(var i=0;i<this.carts.length;i++) {
            this.cartIds.push(Number(this.carts[i].produtId));
          }
          // console.log(this.cartIds);
        }
      })
    },
    showCartBox(){
      if(this.isEditable){
        this.show = !this.show;
      }
    },
    /* 删除购物车 */
    deleteCart(id){
      if(this.isEditable){
        let formdata = new FormData();
        formdata.append('id', id);
        deleteCart(formdata).then(res=>{
          // console.log(res);
          if(res.data.code==0){
            this.getCart();
            this.getProductList();
            this.$forceUpdate();
          }
        })
      }
    },
    /* 清空购物车 */
    clearCart(){
      if(this.carts.length&&this.isEditable){
        this.show = false;
        this.isEditable = false;
          // overlay: false
        Dialog.confirm({
          title: '清空购物车',
          message: '是否清空购物车内的所有商品？',
        }).then(() => {
          clearCart().then(res=>{
            if(res.data.code==0){
              this.getCart();
              this.getProductList();
              this.$forceUpdate();
              this.isEditable = true;
            }
          })
        }).catch(() => {
          this.isEditable = true;
          // on cancel
        });
      }else{
        Toast('购物车内暂无商品');
      }
    },
    /* 商品规格选择 */
    handleChooseSize(event){
      let sizes =  event.currentTarget.parentNode.getElementsByClassName("total-num");
      for(var i=0;i<sizes.length;i++) {
        sizes[i].classList.remove("active");
      }
      event.currentTarget.classList.add("active");
      this.detail.count = Number(event.currentTarget.innerText);
      // console.log(this.detail.count);
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
    /* 点击home按钮 */
    onClickShop() {
      if(this.isEditable){
        this.$router.push({path:'/shop'});
      }
    },
    /* 点击下一步 */
    onClickNext() {
      if(this.isEditable){
        if(this.carts&&this.carts.length){
          this.$router.push({path:'/shop/configure',query:{type:'cart'}});
        }else{
          Toast('购物车内暂无商品');
        }
      }
    },
    /* 点击立即购买 */
    buyNow() {
      this.$store.state.buyNow.count = this.detail.count;
      this.$store.state.buyNow.deliveryMethod = this.detail.deliveryMethod;
      this.$store.state.buyNow.number = this.detail.number;
      this.$store.state.buyNow.produtId = this.detail.id;
      this.$router.push({path:'/shop/configure',query:{type:'buyNow'}});
    },
    onPlus(){
      if(this.detail.number<this.detail.count){
        this.detail.number++;
      }
    },
    onMinus(){
      if(this.detail.number>1){
        this.detail.number--;
      }
    },
    onPlusBox(){
      if(this.detail.count<99){
        this.detail.count++;
      }
    },
    onMinusBox(){
      if(this.detail.count>1){
        this.detail.count--;
      }
    },
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll);
    handleLogin();
      this.getCart();
      this.getProductList();
      // this.$forceUpdate();
      if(this.$route.query.categoryIndex){
        getProductList().then(res=>{
          this.categoryList = res.data.data;
          // this.productList = [];
          // if(this.categoryList){
          //   for(let i=0;i<this.categoryList.length;i++) {
          //     this.productList.push(this.categoryList[i].product);
          //   }
          //   this.allProductList = this.getAllList(this.productList); 
          //   // console.log(this.allProductList);
          //   for(let i=0;i<this.allProductList.length;i++) {
          //     this.allProductList[i].isCart = '';
          //     for(let j=0;j<this.cartIds.length;j++) {
          //       let pid = this.allProductList[i].id;
          //       let cid = this.cartIds[j];
          //       if(this.allProductList[i].id == this.cartIds[j]){
          //         this.allProductList[i].isCart = true;
          //         break;
          //       }else{
          //         this.allProductList[i].isCart = false;
          //       }
          //     }
          //   }
          // }
          let cIndex = this.$route.query.categoryIndex;
          this.clickTab(cIndex);
          this.$router.push({path:'/shop/sort'});
        })
      }
      if(this.$route.query.productId){
        getProductDetail(this.$route.query.productId).then(res=>{
          // console.log(res);
          // this.setScrollTop(this.scrollTop);
          if(this.cartIds.indexOf(Number(this.$route.query.productId))>-1){
            this.isEdit = true;
          }else{
            this.isEdit = false;
          }
          this.$router.push({path:'/shop/sort'});
          this.detail = res.data.data;
          this.comments = this.detail.comments;
          this.show2 = true;
        })
      }
  },
  destroyed(){
    window.removeEventListener('scroll', this.handleScroll)
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
  .van-stepper{
    margin-top: 0.346667rem;
  }
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
    .category-box{
      min-height: 1px;
      &:last-child{
        min-height: 13.733333rem;
      }
      .product-container{
        height: 2.293333rem;
        padding: 0.453333rem 0.373333rem 0 0.32rem;
        position: relative;
        &.doublePoints:before{
          content: '双倍积分';
          width: 2.306667rem;
          height: 0.48rem;
          line-height: 0.48rem;
          color: #fff;
          background-color: #e70012;
          text-align: center;
          font-size: 0.266667rem;
          position: absolute;
          bottom: -1px;
          z-index: 2;
        }
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
  }
  .bottom-container{
    height: 1.306667rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 2088;
    i.icon-cart{
      width: 1.6rem;
      height: 1.266667rem;
      background: url(./../../img/购物车@2x.png) no-repeat;
      -webkit-background-size: 1.6rem 1.266667rem;
      background-size: 1.6rem 1.266667rem;
      position: absolute;
      // left: 0.373333rem;
      // bottom: 0.2rem;
      left: 14px;
      bottom: 10px;
    }
    i.icon-cartOpen{
      width: 1.626667rem;
      height: 1.546667rem;
      background: url(./../../img/购物车打开@2x.png) no-repeat;
      -webkit-background-size: 1.626667rem 1.546667rem;
      background-size: 1.626667rem 1.546667rem;
      position: absolute;
      // left: 0.373333rem;
      // bottom: 0.2rem;
      left: 14px;
      bottom: 10px;
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
      // top: -0.32rem;
      top: -0.36rem;
      left: 1.6rem;
    }
    p.total{
      width: 57.5%;
      height: 100%;
      line-height: 1.306667rem;
      display: inline-block;
      vertical-align: top;
      background-color: #403f3f;
      color: #fff;
      font-size: 0.4rem;
      font-weight: bold;
      padding-left: 2.32rem;
      box-sizing: border-box;
      span{
        font-size: 0.48rem;
      }
    }
    p.noproduct{
      width: 57.5%;
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
      font-size: 0.373333rem;
      color: #c7c7c7;
    }
    p.home{
      width: 12.5%;
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
      width: 30%;
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
  .btn-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9999;
    button.van-button {
      height: 1.306667rem;
      width: 50%;
      font-size: 0.4rem;
      margin: 0;
      display: inline-block;
      padding: 0;
      border: none;
      border-radius: unset;
      color: #fff;
    }
    button.btn-addCart {
      background-color: #4c4c4c;
    }
    button.btn-buy {
      position: absolute;
      background-color: #e70012;
    }
  }
  .van-popup.cart-popup{
    bottom: 1.306667rem;
    max-height: 50%;
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
    .noproduct{
      height: 4.533333rem;
      width: 100%;
      text-align: center;
      img{
        width: 2.266667rem;
        height: 2.266667rem;
        padding-top: 0.853333rem;
        padding-bottom: 0.133333rem;
      }
      p{
        font-size: 0.32rem;
        color: #999;
      }
    }
    .cart-list{
      max-height: 6.666667rem;
      overflow-y: scroll;
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
          width: 5.733333rem;
          display: inline-block;
        }
        strong{
          font-size: 0.32rem;
          color: #e70012;
          span{
            font-size: 0.4rem;
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
  .van-popup.detail-popup{
    height: 90%;
    overflow-x: hidden;
  }
}
#shop-detail{
  padding-bottom: 1.6rem;
  .img-container{
    width: 100%;
    /*height: 7.52rem;*/
    height: 100%;
    img{
      width: 100%;
      /*height: auto;*/
      height: 100%;
    }
  }
  .product-container{
    padding: 0 0.4rem;
    border-bottom: 0.266667rem solid #f6f6f6;
    p.name{
      font-size: 0.426667rem;
      font-weight: bold;
      color: #202020;
      padding-top: 0.506667rem;
      span{
        color: #666;
        font-weight: normal;
        font-size: 0.346667rem;
      }
    }
    p.price{
      font-size: 0.48rem;
      font-weight: bold;
      color: #e70012;
      padding: 0.24rem 0 0.346667rem 0;
      border-bottom: 1px solid #e5e5e5;
      span{
        font-size: 0.64rem;
      }
      del{
        font-weight: normal;
        color: #999;
        font-size: 0.4rem;
      }
    }
    p.total-title{
      font-size: 0.346667rem;
      color: #666;
      padding: 0.426667rem 0 0.32rem 0;
    }
    .total-container{
      padding-bottom: 0.346667rem;
      border-bottom: 1px solid #e5e5e5;
      span.total-num{
        width: 2.96rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        display: inline-block;
        font-size: 0.346667rem;
        color: #202020;
        background-color: #f3f3f3;
        border-radius: 0.053333rem;
        margin: 0 0.053333rem; 
        margin-bottom: 0.16rem;
      }
      span.total-num.active{
        color: #fff;
        background-color: #e70012;
      }
    }
    .preDay{
      position: relative;
      height: 1.466667rem;
      p.title{
        font-size: 0.346667rem;
        color: #666;
        line-height: 1.466667rem;
        border-bottom: 1px solid #e5e5e5;
      }
      div.count-box {
        display: inline-block;
        float: right;
        line-height: 0.533333rem;
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        span.num {
          position: absolute;
          width: 0.853333rem;
          height: 0.533333rem;
          display: inline-block;
          left: 50%;
          top: 50%;
          margin-left: -0.426667rem;
          margin-top: -0.266667rem;
          font-size: 0.48rem;
          color: #202020;
          line-height: 0.533333rem;
          text-align: center;
        }
        i.icon-delete{
          width: 0.586667rem;
          height: 0.586667rem;
          display: inline-block;
          background: url(./../../img/购物车删除@2x.png) no-repeat;
          -webkit-background-size: 0.586667rem 0.586667rem;
          background-size: 0.586667rem 0.586667rem;
          margin-right: 0.8rem;
          margin-top: 0.426667rem;
        }
        i.icon-add{
          width: 0.586667rem;
          height: 0.586667rem;
          display: inline-block;
          background: url(./../../img/添加购买@2x.png) no-repeat;
          -webkit-background-size: 0.586667rem 0.586667rem;
          background-size: 0.586667rem 0.586667rem;
        }
      }
    }
    .van-row{
      height: 0.933333rem;
      .van-col{
        line-height: 0.933333rem;
        font-size: 0.32rem;
        color: #666;
      }
      .left{
        text-align: left;
      }
      .center{
        text-align: center;
      }
      .right{
        text-align: right;
      }
    }
  }
  .tab-view{
    position: relative;
    .tag-container{
      padding: 0.373333rem 0 0.106667rem 0;
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
      }
    }
    span.more{
      width: 2.56rem;
      height: 0.8rem;
      line-height: 0.8rem;
      display: block;
      background-color: #dadada;
      border-radius: 0.4rem;
      color: #fff;
      font-size: 0.32rem;
      text-align: center;
      position: absolute;
      bottom: -1.226667rem;
      left: 50%;
      margin-left: -1.28rem;
    }
  }
}
</style>
