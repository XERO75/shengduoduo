<template>
  <div id="address-list">
    <div class="address-list">
      <div class="address-container" v-for="n in addressLists" :key="n.index">
        <p class="phone" :class="{'default':n.isDefault==true}">{{n.contact}} {{n.phone}}</p>
        <p class="address">{{n.area}}{{n.specificAddress}}</p>
        <div class="action-container">
          <i class="icon-edit" @click="onClickEdit(n.id)"></i>
          <i class="icon-delete" @click="showDialog(n.id)"></i>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <van-button @click="onClickAdd">添加收货地址</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog, Button, Toast } from 'vant';
import { getAddress, handleDel } from '@/api/address.js'
export default {
  components: {
    [Dialog.name]: Dialog,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  data(){
    return{
      addressLists: [],
    }
  },
  methods: {
    handleGetDetail() {
      getAddress().then(res => {
        if (res.data.code === 0 ) {
          this.addressLists = res.data.data
        }
      })
    },
    onClickAdd() {
      this.$router.push({path:'/address/add'});
    },
    onClickEdit(id) {
      this.$router.push({path:'/address/edit',query:{addressId:id}});
    },
    showDialog(id){
      Dialog.confirm({
        title: '是否确定删除该地址？',
        // message: '弹窗内容'
      }).then(() => { // on confirm
        handleDel(id).then(res => {
          if (res.data.code === 0) {
            Toast.success({message:'删除成功',duration:1000})
            this.handleGetDetail()
          } else {
            Toast.fail(res.data.code)
          }
        })
      }).catch(() => { // on cancel
        
      });
    }
  },
  mounted(){
    this.handleGetDetail()
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#address-list{
  min-height: 100%;
  box-sizing: border-box;
  position: relative;
  .address-list{
    padding: 0 0.4rem;
    background-color: #fff;
    margin-bottom: 2.533333rem;
    .address-container{
      position: relative;
      padding-right: 2.133333rem;
      border-bottom: 1px solid #e5e5e5;
      .phone {
        font-weight: bold;
        font-size: 0.4rem;
        color: #202020;
        padding-top: 0.533333rem;
      }
      .phone.default:after {
        content: '[默认]';
        margin-left: 0.32rem;
        width: 0.933333rem;
        height: 0.426667rem;
        font-size: 0.373333rem;
        color: #e70012;
        font-weight: normal;
      }
      .address{
        font-size: 0.346667rem;
        color: #666;
        padding: 0.32rem 0 0.533333rem 0;
      }
      .action-container{
        position: absolute;
        width: 1.466667rem;
        top: 0.666667rem;
        right: 0;
        i.icon-edit{
          width: 0.4rem;
          height: 0.4rem;
          background: url(./../../image/编辑地址@2x.png) no-repeat;
          -webkit-background-size: 0.4rem 0.4rem;
          background-size: 0.4rem 0.4rem;
          display: inline-block;
          margin-right: 0.56rem;
        }
        i.icon-delete{
          width: 0.386667rem;
          height: 0.4rem;
          background: url(./../../image/地址管理-删除地址@2x.png) no-repeat;
          -webkit-background-size: 0.386667rem 0.4rem;
          background-size: 0.386667rem 0.4rem;
          display: inline-block;
        }
      }
    }
  }
  .btn-container{
    width: 100%;
    height: 1.173333rem;
    position: fixed;
    bottom: 0.746667rem;
    padding: 0 0.533333rem;
    box-sizing: border-box;
    button{
      width: 100%;
      height: 100%;
      background-color: #8FC221;
      border-radius: 0.586667rem;
      line-height: 1.173333rem;
      text-align: center;
      color: #fff;
      font-size: 0.4rem;
    }
  }
}
</style>
