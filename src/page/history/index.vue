<template>
  <div id="history">
    <div class="product-list">
      <div class="product-list__time">2018-01-21</div>
      <div v-for="(item, index) in 3" :key="index" class="product-container f-vertical">
        <img src="../../assets/img/icon_miaosha@2x.png">
        <div class="f-column" style="margin-left: 10px; max-width: 75%;">
          <p class="name">Lorem ipsum dolor sit amet consectetur.</p>
          <div class="history-bottom clearfloat">
            <p class="price fl">&yen;<span>1</span></p>
            <div class="history-button fr">删除记录</div>
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
  .product-list{
    background: #fff;
    width: 100%;
    .product-list__time {
      line-height: 1.3rem;
      padding: 0 .4rem;
      border-bottom: 1px solid #efefef;
    }
    .history-button {
      border: 1px solid #E5E5E5;
      padding: .12rem .2rem;
      border-radius: 50px;
    }
  }
  .product-container{
    height: 3rem;
    width: 91%;
    padding: 0 .4rem;
    border-top: 1px solid #efefef;
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
