<template>
  <div id="voucher">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="n in voucherList" :key="n.id"><img @click="onClickDetail(n.id)" :src="n.firestLevelImage"></van-swipe-item>
    </van-swipe>
    <div class="kind-container">
      <p class="title">选择优鲜卡</p>
      <div class="card-container" @click="onClickDetail(n.id)" v-for="n in voucherList" :key="n.id">
        <img :src="n.firestLevelImage"><p>{{n.name}}</p>
      </div>
    </div>
    <div class="bottom_tab">
      <van-row>
        <van-col span="6"><div @click="onClickHome"><img :src="iconList.home"></div></van-col>
        <van-col span="6"><div @click="onClickBook"><img :src="iconList.booking"></div></van-col>
        <van-col span="6"><div><img :src="iconList.giftCardLight"></div></van-col>
        <van-col span="6"><div @click="onClickMine"><img :src="iconList.my"></div></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Row, Col } from 'vant';
import { getVoucher } from "@/api/voucher";
import { handleLogin } from "@/api/login";
import { getMenu } from "@/api/menu";
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  data(){
    return{
      voucherList: [],
      iconList: [],
    }
  },
  methods: {
    onClickDetail(id) {
      this.$router.push({path:'/voucher/detail',query:{id:id}});
    },
    onClickHome() {
      this.$router.push({path:'/shop'});
    },
    onClickBook() {
      this.$router.push({path:'/shop/sort'});
    },
    onClickMine() {
      this.$router.push({path:'/mine'});
    }
  },
  mounted(){
    handleLogin();
      getMenu().then(res=>{
        this.iconList = res.data.data;
      });
      getVoucher().then(res=>{
        // console.log(res);
        this.voucherList = res.data.data;
      });
      
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#voucher{
  padding-bottom: 1.333333rem;
  box-sizing: border-box;
  .kind-container{
    .title{
      border-top: 0.266667rem solid #f6f6f6;
      padding: 0.8rem 0 0.4rem 0.32rem;
      font-size: 0.4rem;
      color: #202020;
    }
    .card-container{
      width: 4.533333rem;
      height: 3.12rem;
      border: 0.013333rem solid #d2d2d2;
      border-radius: 0.133333rem;
      margin-left: 0.306667rem;
      margin-bottom: 0.306667rem;
      display: inline-block;
      box-sizing: border-box;
      overflow: hidden;
      img{
        width: 100%;
        height: 2.186667rem;
      }
      p{
        font-size: 0.346667rem;
        color: #202020;
        text-align: center;
        line-height: 0.7rem;
      }
    }
  }
}
</style>
