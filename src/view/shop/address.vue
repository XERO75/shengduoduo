<template>
  <div id="shop-address">
    <div class="progress-container">
      <van-row type="flex" justify="space-between">
        <van-col span="8">
          <div @click="clickProductIcon">
            <img src="./../../img/选择商品@2x.png">
            <p class="active">选择商品</p>
          </div>
        </van-col>
        <van-col span="8">
          <div @click="clickConfigureIcon">
            <img src="./../../img/送奶配置-红@2x.png">
            <p class="active">送奶配置</p>
          </div>
        </van-col>
        <van-col span="8">
          <div>
            <img src="./../../img/填写地址-红@2x.png">
            <p class="active">填写地址</p>
          </div>
        </van-col>
        <van-col span="8">
          <div>
            <img src="./../../img/提交订单-灰@2x.png">
            <p>提交订单</p>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="amap-container"><van-loading v-if="loading" /><div id="map-container"></div></div>
    <div class="address-container" v-if="hasAddress">
      <p class="title">配送地址<span @click="onClickAdd">新增地址</span></p>
      <div class="address-list">
        <div class="address-item" :class="{'checked':addressId&&n.id==addressId}" v-for="(n,i) in addressList" :key="n.id">
          <i class="icon-checkbox" @click="handleClick($event,n.id)"></i>
          <p class="phone" :class="{'default':n.isDefault=='true'}">{{n.contact}} {{n.phone}}</p>
          <p class="address">
            <span class="gaode">{{n.district+n.specificAddress}}</span>
            <span class="room">{{n.room?n.room:''}}</span>
            <i class="icon-edit" @click="onClickEdit(n.id)"></i>
          </p>
        </div>
      </div>
    </div>
    <div class="noAddress-container" v-if="!hasAddress">
      <img src="./../../img/还没收货地址@2x.png">
      <p class="tips">你还没添加收货地址</p>
      <span class="btn-add" @click="onClickAdd">添加收货地址</span>
    </div>
    <div class="btn-container">
      <van-button @click="onClickNext" v-if="hasAddress">下一步</van-button>
    </div>
  </div>
</template>

<script src="https://webapi.amap.com/maps?v=1.4.8&key=fa88b622064b112e8caefeb05f40b790"></script>
<script>
import { Toast, Row, Col, Button, Checkbox, Loading } from 'vant';
import { getAdressList, addAddress, getSearchList } from "@/api/address";
import { createOrder } from "@/api/shop";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Toast.name]: Toast,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Loading.name]: Loading,
  },
  data(){
    return{
      addressList: [],
      addressId: '',
      address: '',
      location: [],
      hasAddress: false,
      loading: true,
    }
  },
  computed: {
    // location(){
    //   let location = [];
    //   getSearchList(this.address).then(res2=>{
    //     location[0] = Number(res2.data.data.addressVos[0].location.split(',')[0]);
    //     location[1] = Number(res2.data.data.addressVos[0].location.split(',')[1]);
    //     return location;
    //   })
    // }
  },
  methods: {
    /* 匹配数组对象的某个属性的值 返回该对象的索引 */
    getObjListIndex(arr,key,value){
      if(arr&&arr.length){
        for(let i=0;i<arr.length;i++) {
          if(arr[i][key]==value){
            return i;
            break;
          }
        }
      }
      return '';
    },
    addMarker(){
      let that = this;
      var map = new AMap.Map('map-container', {
         center:that.location,
         zoom:15,
         resizeEnable: true
      });
      var pointMarker = new AMap.Marker({
        position: new AMap.LngLat(that.location[0],that.location[1]),
        // 将一张图片的地址设置为 icon
        icon: require('./../../img/填写地址-定位.png'),
        // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
        offset: new AMap.Pixel(0, 0)
      });
      // 将 markers 添加到地图
      map.add([pointMarker]);
      this.loading = false;
    },
    clickProductIcon(){
      this.$router.push({path:'/shop/sort'});
      // this.$router.go(-2);
    },
    clickConfigureIcon(){
      // this.$router.go(-1);
      this.$router.push({path:'/shop/configure',query:{type:this.$route.query.type}});
    },
    handleClick(event,id) {
      this.loading = true;
      console.log(this.loading)
      this.addressId = id;
      // this.$router.push({path:'/shop'});
      if(document.getElementsByClassName("checked")[0]){
        document.getElementsByClassName("checked")[0].classList.remove("checked");
      }
      // console.log( event.currentTarget.parentNode)
      event.currentTarget.parentNode.classList.add("checked");
      this.address = event.currentTarget.parentNode.querySelectorAll('span.gaode')[0].innerText;
      console.log(this.address);
      this.location = [];
      getSearchList(this.address).then(res2=>{
        if(res2.data.data.addressVos.length){
          this.location[0] = Number(res2.data.data.addressVos[0].location.split(',')[0]);
          this.location[1] = Number(res2.data.data.addressVos[0].location.split(',')[1]);
          this.addMarker();
        }else{
          this.location = [113.27,23.135];
          this.addMarker();
        }
      })
    },
    onClickNext() {
      if(this.addressId){
        this.$store.state.addressId = this.addressId;
        this.$router.push({path:'/shop/order',query:{type:this.$route.query.type}});
      }else{
        Toast('请选择配送地址');
      }
    },
    onClickAdd() {
      this.$router.push({path:'/shop/addAddress'});
    },
    onClickEdit(id) {
      this.$router.push({path:'/shop/editAddress',query:{id:id}});
    },
  },
  mounted(){
    handleLogin();
      getAdressList().then(res=>{
        this.addressList = res.data.data;
        if(this.addressList.length){
          this.hasAddress = true;
          let defaultIndex =  this.getObjListIndex(this.addressList,"isDefault","true");
          if(defaultIndex===0||defaultIndex){
            this.addressId = this.addressList[defaultIndex].id;
            this.address = this.addressList[defaultIndex].district+this.addressList[defaultIndex].specificAddress;
          }else{
            this.addressId = '';
            this.address = '';
          }
          console.log(this.addressId);
          this.location = [];
          getSearchList(this.address).then(res2=>{
            if(res2.data.data.addressVos.length){
              this.location[0] = Number(res2.data.data.addressVos[0].location.split(',')[0]);
              this.location[1] = Number(res2.data.data.addressVos[0].location.split(',')[1]);
              this.addMarker();
            }else{
              // console.log(this.location);
              this.location = [113.27,23.135];
              this.addMarker();
            }
          })
        }else{
          this.hasAddress = false;
          this.location = [113.27,23.135];
          this.addMarker();
        }
      })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#shop-address{
  height: 100%;
  position: relative;
  margin-top: 2.586667rem;
  //box-sizing: border-box;
  /*padding-bottom: 1.306667rem;*/
  .progress-container{
    width: 100%;
    box-sizing: border-box;
    z-index: 9999;
    background-color: #fff;
    padding: 0.533333rem 0.533333rem;
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
  #map-container{
    width: 100%;
    height: 5.88rem;
    position: relative;
  }
  .address-container{
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 1.333333rem;
    p.title{
      font-size: 0.4rem;
      font-weight: bold;
      color: #202020;
      line-height: 1.28rem;
      padding-left: 0.4rem;
      border-bottom: 1px solid #e5e5e5;
      span{
        width: 2.0rem;
        text-align: right;
        float: right;
        display: inline-block;
        padding-right: 0.4rem;
        font-weight: normal;
        font-size: 0.373333rem;
        color: #666;
        position: relative;
        &:before{
          content: '';
          width: 0.373333rem;
          height: 0.373333rem;
          position: absolute;
          display: block;
          background: url(./../../img/新增地址@2x.png) no-repeat;
          -webkit-background-size: 0.373333rem 0.373333rem;
          background-size: 0.373333rem 0.373333rem;
          left: 0;
          top: 50%;
          margin-top: -0.186667rem;
        }
      }
    }
    .address-list{
      padding-left: 1.12rem;
      .address-item{
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        &:last-child{
          border-bottom: 0;
        }
        i.icon-checkbox{
          width: 0.453333rem;
          height: 0.453333rem;
          background: url(./../../img/配送选择地址二@2x.png) no-repeat;
          -webkit-background-size: 0.453333rem 0.453333rem;
          background-size: 0.453333rem 0.453333rem;
          display: block;
          position: absolute;
          top: 0.533333rem;
          left: -0.72rem;
        }
        &.checked{
          i.icon-checkbox{
            background: url(./../../img/配送选择地址@2x.png) no-repeat;
            -webkit-background-size: 0.453333rem 0.453333rem;
            background-size: 0.453333rem 0.453333rem;
          }
        }
        p.phone{
          padding: 0.453333rem 0 0.266667rem 0;
          font-size: 0.4rem;
          font-weight: bold;
          color: #202020;
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
        p.address{
          font-size: 0.373333rem;
          color: #666;
          padding-bottom: 0.48rem;
          padding-right: 1.333333rem;
          position: relative;
          i.icon-edit{
            width: 0.4rem;
            height: 0.4rem;
            display: block;
            background: url(./../../img/编辑地址@2x.png) no-repeat;
            -webkit-background-size: 0.4rem 0.4rem;
            background-size: 0.4rem 0.4rem;
            position: absolute;
            top: 0.106667rem;
            right: 0.4rem;
          }
        }
      }
    }
  }
  .noAddress-container{
    text-align: center;
    img{
      width: 2.72rem;
      height: 1.52rem;
      margin-top: 1.52rem;
    }
    p.tips{
      font-size: 0.32rem;
      color: #b8b8b8;
      padding-top: 0.4rem;
      padding-bottom: 0.48rem;
    }
    .btn-add{
      width: 4.773333rem;
      height: 1.146667rem;
      display: block;
      border-radius: 1.146667rem;
      color: #fff;
      background-color: #e70012;
      font-size: 0.4rem;
      margin: auto;
      line-height: 1.146667rem;
    }
  }
  .btn-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9999;
    button.van-button {
      height: 1.306667rem;
      width: 100%;
      font-size: 0.4rem;
      margin: 0;
      display: block;
      padding: 0;
      border: none;
      border-radius: unset;
      color: #fff;
      background-color: #e70012;
    }
  }

}
</style>
