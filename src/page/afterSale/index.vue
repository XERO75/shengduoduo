<template>
  <div id="after-sale">
    <div class="order-list" >
      <div class="order-container" v-for="n in 3" :key="n.index">
        <div class="order-list__header">lorem</div>
        <div class="product-container">
          <img :src="n.image">
          <p class="name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, omnis.</p>
          <!-- <p class="price">&yen;<span>1</span></p> -->
          <p class="type">颜色:1 规格:2 <span>X2</span></p>
          <!-- <p class="type">{{(n.specifications).replace(/[；]/g," ")}} <span>更多</span></p> -->
        </div>
        <p class="status">Lorem, ipsum dolor.<span @click="onClickDetail(n.paidCode)" class="btn-detail">查看详情</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast,  } from 'vant';
import { getRefundLists } from "@/api/afterSale.js";
export default {
  components: {
    [Toast.name]: Toast,
  },
  data(){
    return{
      pageNum: 1,
      pageSize: 4,
      orderLists: []
    }
  },
  methods: {
    onClickPoints() {
      this.$router.push({path:'/points/coupon'});
    },
    // 获取退款列表
    async getRefundLists() {
      let that = this
      await getRefundLists(this.pageNum , this.pageSize).then(res => {
        if (res.data.code === 0) {
          console.log(res);
          that.orderLists = res.data.data.list
        } else {
          Toast(res.data.errmsg)
        }
      })
    },
    // 查看详情
    onClickDetail(val) {
      this.$router.push({path:'/afterSale/detail',query:{paidCode:val}})
    }
  },
  mounted(){
    this.getRefundLists() //获取退款列表
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#after-sale{
  min-height: 100%;
  .order-list{
    .order-list__header {
      line-height: 1.2rem;
      padding-left: .4rem;
      border-bottom: 1px solid #efefef;
    }
    .order-container{
      margin-bottom: 0.3rem;
      background: #fff;
      .product-container{
        position: relative;
        margin: 0 .533333rem;
        padding-left: 2.4rem;
        padding-bottom: 1rem;
        padding-top: .3rem;
        // padding-bottom: 0.346667rem;
        img{
          width: 2.2rem;
          height: 2.2rem;
          position: absolute;
          left: 0;
        }
        .name{
          font-size: 0.373333rem;
          color: #2d2e2d;
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2; 
        }
        .price{
          font-size: 0.293333rem;
          color: #2d2e2d;
          margin-top: 0.266667rem;
          span{
            font-size: 0.453333rem;
          }
        }
        .type{
          font-size: 0.266667rem;
          color: #afaeaf;
          span{
            padding-left: 0.4rem;
          }
        }
      }
      .status{
        line-height: 0.826667rem;
        margin: 0 .533333rem;
        border-top: 1px solid #e5e5e5;
        // border-bottom: 1px solid #e5e5e5;
        color: #2d2e2d;
        font-size: 0.266667rem;
        padding-left: 0.4rem;
        position: relative;
        &:before{
          content: '';
          width: 0.32rem;
          height: 0.32rem;
          display: inline-block;
          background: url(./../../image/icon_tuikuan@2x.png) no-repeat;
          -webkit-background-size: 0.32rem 0.32rem;
          background-size: 0.32rem 0.32rem;
          position: absolute;
          top: 50%;
          margin-top: -0.16rem;
          left: 0;
        }
        span.btn-detail{
          width: 1.573333rem;
          height: 0.56rem;
          display: inline-block;
          text-align: center;
          line-height: 0.56rem;
          border: 1px solid #efefef;
          border-radius: 0.28rem;
          color: #000;
          font-size: 0.266667rem;
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -0.293333rem;
        }
      }
    }
  }
}
</style>
