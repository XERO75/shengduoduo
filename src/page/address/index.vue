<template>
  <div id="address-list">
    <div class="add-address">
      <p @click="onClickAdd">新增地址</p>
    </div>
    <div class="address-list">
      <div class="address-container">
        <p class="phone default">啊是大 5464848684</p>
        <p class="address">好噶就是个多久啊是党和国家好几个哈很快就吖金黄即可</p>
        <div class="action-container">
          <i class="icon-edit" @click="onClickEdit"></i>
          <i class="icon-delete" @click="showDialog"></i>
        </div>
      </div>
      <div class="address-container">
        <p class="phone">啊是大 5464848684</p>
        <p class="address">好噶就是个多久啊是党和国家好几个哈很快就吖金黄即可</p>
        <div class="action-container">
          <i class="icon-edit" @click="onClickEdit"></i>
          <i class="icon-delete" @click="showDialog"></i>
        </div>
      </div>
    </div>
    <!-- <div class="address-list">
      <div class="address-container" v-for="n in addressList" :key="n.id">
        <p class="phone" :class="{'default':n.isDefault=='true'}">{{n.contact}} {{n.phone}}</p>
        <p class="address">{{n.specificAddress}}</p>
        <div class="action-container">
          <i class="icon-edit" @click="onClickEdit(n.id)"></i>
          <i class="icon-delete" @click="showDialog(n.id)"></i>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { getAdressList, deleteAddress } from "@/api/address";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Dialog.name]: Dialog,
  },
  data(){
    return{
      addressList: [],
    }
  },
  methods: {
    onClickAdd() {
      this.$router.push({path:'/address/add'});
    },
    onClickEdit(id) {
      this.$router.push({path:'/address/edit',query:{id:id}});
    },
    showDialog(id){
      Dialog.confirm({
        title: '是否确定删除该地址？',
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
    // handleLogin();
    //   getAdressList().then(res=>{
    //     console.log(res);
    //     this.addressList = res.data.data;
    //   })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#address-list{
  padding-top: 0.266667rem;
  background-color: #f6f6f6;
  min-height: 100%;
  box-sizing: border-box;
  .add-address{
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    height: 1.306667rem;
    p{
      width: 2.0rem;
      text-align: right;
      float: right;
      display: inline-block;
      padding-right: 0.4rem;
      font-size: 0.373333rem;
      color: #666;
      line-height: 1.28rem;
      position: relative;
    }
    p:before{
      content: '';
      width: 0.373333rem;
      height: 0.373333rem;
      position: absolute;
      display: block;
      background: url(./../../image/icon_dianpu@2x.png) no-repeat;
      -webkit-background-size: 0.373333rem 0.373333rem;
      background-size: 0.373333rem 0.373333rem;
      left: 0;
      top: 50%;
      margin-top: -0.186667rem;

    }
  }
  .address-list{
    padding: 0 0.4rem;
    background-color: #fff;
    .address-container{
      position: relative;
      padding-right: 2.133333rem;
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
        top: 1.48rem;
        right: 0;
        i.icon-edit{
          width: 0.4rem;
          height: 0.4rem;
          background: url(./../../image/icon_dianpu@2x.png) no-repeat;
          -webkit-background-size: 0.4rem 0.4rem;
          background-size: 0.4rem 0.4rem;
          display: inline-block;
          margin-right: 0.56rem;
        }
        i.icon-delete{
          width: 0.386667rem;
          height: 0.4rem;
          background: url(./../../image/icon_dianpu@2x.png) no-repeat;
          -webkit-background-size: 0.386667rem 0.4rem;
          background-size: 0.386667rem 0.4rem;
          display: inline-block;
        }
      }
    }
    .address-container +.address-container{
      border-top: 1px solid #e5e5e5;
    }
  }
}
</style>
