<template>
  <div id="history">
    <div class="product-list">
      <div class="product-container">
        <img src="./../../pic/box.png">
        <p class="name">哦来看哈阿萨德哈吉看时间哈斯柯达按时大叔大婶大所多</p>
        <p class="price">&yen;<span>500</span></p>
        <p class="type">红色1kg <span class="more">更多</span><span class="delete" @click="deleteLog">删除记录</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog  } from 'vant';
// import { getCouponList } from "@/api/coupon";
export default {
  components: {
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
  },
  data(){
    return{

    }
  },
  methods: {
    onClickPoints() {
      this.$router.push({path:'/points/coupon'});
    },
    deleteLog(){
      Dialog.confirm({
        title: '是否确定删除该记录？',
        // message: '弹窗内容'
      }).then(() => { // on confirm
        // let formdata = new FormData();
        // formdata.append('ids',id);
        // // formdata.append('WX_TYPE','OfficialAccount');
        // deleteAddress(formdata).then(res=>{
        //   // console.log(res);
        //   getAdressList().then(response=>{
        //     console.log(response);
        //     this.addressList = response.data.data;
        //   })
        // })

      }).catch(() => { // on cancel
        
      });
    }
  },
  mounted(){

  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#history{
  min-height: 100%;
  .product-list{
    padding: 0.533333rem;
    .product-container{
      position: relative;
      padding-left: 2.4rem;
      padding-bottom: 1.2rem;
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
        span.more{
          padding-left: 0.4rem;
        }
        span.delete{
          color: #e64a19;
          float: right;
        }
      }
    }
  }
}
</style>
