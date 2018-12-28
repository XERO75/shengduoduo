<template>
  <div id="history">
    <div class="product-list">
      <div v-for="(item, index) in recordList" :key="index" class="product-container f-vertical">
        <img :src="item.image">
        <div class="f-column" style="margin-left: 10px; max-width: 75%;">
          <p class="name">{{item.productName}}</p>
          <p class="price">&yen;<span>{{item.minPrice}}</span></p>
          <div class="f-space-between">
            <p class="type">红色1kg <span class="more">更多</span></p><span class="delete">删除记录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import HeaderBar from "@/components/HeaderBar";
import { myHistory } from "@/api/personal";

// import { getCouponList } from "@/api/coupon";
export default {
  components: {
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    HeaderBar
  },
  data(){
    return{
      recordList: []
    }
  },
  methods: {
    onClickBack(){
      this.$router.go(-1)
    },
    onClickCart(){
      this.$router.push({path:'/cart'})
    },
    // 获取浏览历史
    async myHistory() {
      let pageNum = 1
      let pageSize = 10
      let that = this
      await myHistory(pageNum, pageSize).then(res => {
        if (res.data.code === 0) {
          that.recordList = res.data.data.list
        } else {
          Toast(res.data.errmsg)
        }
      })
    }
  },
  mounted(){
    this.myHistory()
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#history{
  min-height: 100vh;
  background-color: #f6f6f6;
  .product-list{
    width: 100%;
    margin-top: 49px;
    padding: 0 .4rem;
  }
  .product-container{
    height: 3rem;
    width: 91%;
    img{
      width: 2rem;
      height: 2rem;
    }
    .name{
      font-size: .4rem;
      color: #2e2e2d;
      max-width: 80%;
    }
    .price{
      margin-top: .2rem;
      font-size: .32rem;
      color: #2e2e2d;
      span{
        font-size: .426667rem;
      }
    }
    .type{
      font-size: .266667rem;
      color: #999;
    }
    .more{
      margin-left: .533333rem;
    }
    .delete{
      @extend .type;
      color: #8FC221;
    }
  }
}
</style>
