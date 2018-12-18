<template>
  <div id="points-sort">
    <div class="points-header">
      <p>积分<span>&nbsp;{{points}}</span></p>
    </div>
    <ul class="tabs">
      <!-- <li v-for="(item,index) in alltabs" :class="{activeTab:index==isActive}" @click="tab(index)" :key="index">{{item.categoryName}}</li> -->
      <li class="allTab activeTab" @click="clickAllTab()">全部</li>
      <li v-for="(n,i) in product" @click="clickTab($event,i)">{{n.exchangeProductCategory.name}}</li>
    </ul>
    <div class="tabCon">
      <div v-if="isAllTab" v-for="n in productList" class="product-container" @click="onClickDetail(n.id)">
        <img :src="n.picture">
        <div class="info">
          <p class="product-name van-ellipsis">{{n.name}}</p>
          <p class="points">兑换积分: <strong>{{n.costPoint.replace('.00','')}}</strong></p>
        </div>
      </div>
      <div v-if="!isAllTab" v-for="n in product[index].exchangeProductList" class="product-container" @click="onClickDetail(n.id)">
        <img :src="n.picture">
        <div class="info">
          <p class="product-name van-ellipsis">{{n.name}}</p>
          <p class="points">兑换积分: <strong>{{n.costPoint.replace('.00','')}}</strong></p>
        </div>
      </div>
    </div> 
  </div> 
</template>
<script>
import { Tab, Tabs } from 'vant';
import { getProductList } from "@/api/points";
import { handleLogin } from "@/api/login";

export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      isActive: 0,//默认选择
      product: [], // 某个分类的奖品集合
      productList: [], // 全部奖品集合
      points: 0,
      index: 0,
      isAllTab: true,
    }
  },
  methods: {
    clickTab(event,i) {
      this.isAllTab = false;
      this.index = i;
      let tab = document.getElementsByClassName('activeTab');
      for (let i = 0; i < tab.length; i++) {
        tab[i].classList.remove('activeTab');
      }
      event.currentTarget.classList.add('activeTab');
    },
    clickAllTab() {
      let allTab = document.querySelectorAll('.allTab')[0];
      this.isAllTab = true;
      let tab = document.getElementsByClassName('activeTab');
      for (let i = 0; i < tab.length; i++) {
        tab[i].classList.remove('activeTab');
      }
      allTab.classList.add('activeTab');
    },
    onClickDetail(id) {
      this.$router.push({path:'/points/detail',query:{id:Number(id)}});
    }
  },
  mounted(){
    handleLogin();
      getProductList().then(res=>{
        console.log(res);
        this.points = res.data.data.points;
        this.product = res.data.data.content;
        this.productList = [];
        for(let i=0;i<this.product.length;i++) {
          if(this.product[i].exchangeProductList){
            this.productList = this.productList.concat(this.product[i].exchangeProductList);
          }
        }
        console.log(this.productList);
      })
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
#points-sort{
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  .points-header{
    background-color: #fff;
    height: 1.653333rem;
    border-bottom: 1px solid #e5e5e5;
    p{
      font-size: 0.4rem;
      color: #666;
      padding-left: 0.4rem;
      line-height: 1.653333rem;
      span{
        font-size: 0.8rem;
        color: #202020;
        font-weight: bold;
      }
    }
  }
  .tabs{
    background-color: #f6f6f6;
    position:fixed;
    width: 2.026667rem;
    height: 100vh;
    li{
      height: 1.466667rem;
      width: 2.026667rem;
      text-align: center;
      line-height: 1.466667rem;
      color: #666;
      position: relative;
      font-size: 0.373333rem;
    }
    li.activeTab{
      color: #e70012;
      background-color: #fff;
    }
    li.activeTab:after{
      content: '';
      width: 0.053333rem;
      height: 0.533333rem;
      display: block;
      position: absolute;
      top: 50%;
      margin-top: -0.266667rem;
      left: 0;
      border-radius: 2px;
      background-color: #e70012;
    }
  }
  .tabCon{
    background-color: #fff;
    padding-left: 2.026667rem;
    .product-container{
      height: 70px;
      padding: 0.4rem 0 0 0.266667rem;
      position: relative;
      img{
        width: 1.84rem;
        height: 1.84rem;
        border: 1px solid #f2f2f2;
        position: absolute;
      }
      .info{
        margin-left: 2.186667rem;
        /*padding-top: 6px;*/
        height: 1.84rem;
        /*box-sizing: border-box;*/
        border-bottom: 1px solid #e5e5e5;
      }
      p{
        line-height: 0.666667rem;
      }
      p.product-name {
        font-size: 0.4rem;
        font-weight: bold;
        padding-right: 1.066667rem; 
      }
      p.points {
        font-size: 0.346667rem;
        color: #e70012;
        strong{
          font-size: 0.373333rem;
        }
      }
    }
  }
}
</style>

