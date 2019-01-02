<template>
  <div id="category">
    <div class="category-searchbar">
      <van-search placeholder="请输入搜索关键词" v-model="value" />
    </div>
    <div class="product-list">
      <div class="product-container" @click="onClickDetail(p.productId)">
        <div class="product-img"><img src="../../assets/img/miduoduo@2x.png"></div>
        <p class="name van-ellipsis">Lorem, ipsum.</p>
        <p class="money">&yen;1</p>
      </div>
      <div class="product-container"  @click="onClickDetail(p.productId)">
        <div class="product-img"><img src="../../assets/img/miduoduo@2x.png"></div>
        <p class="name van-ellipsis">Lorem, ipsum.</p>
        <p class="money">&yen;1</p>
      </div>
    </div>
  </div>
</template>
<script>
import { TreeSelect, Search } from 'vant';

export default {
  components: {
    [TreeSelect.name]: TreeSelect,
    [Search.name]: Search,
  },
  data() { 
    return {
      value:''
    }
  },
  
  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    }
  }
}
</script>
<style lang="scss" scoped>
 #category {
  height: 100%;
  background: #fff;
  .van-tree-select__nav {
    width: 30%;
    background: #efefef;
  }
  .van-tree-select__nitem {
    line-height: 50px;
  }
  .van-tree-select__nitem--active {

  }
  .van-tree-select__content {
    // width: 50%;
    margin-left: 30%;
    // width:70%;
  }
 }
 .product-list{
      padding: 0 0.2rem;
      width: 100%;
      display: flex;
      box-sizing: border-box;
      .product-container{
        width: 50%;
        padding: 0.48rem 0.12rem;
        // padding-bottom: 0.48rem;
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
            width: 3.533333rem;
            height: 3.533333rem;
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
</style>
