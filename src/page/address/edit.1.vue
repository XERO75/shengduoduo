<template>
  <div id="address-edit">
    <div class="input-container">
      <van-cell-group>
        <van-field
          v-model="info.contact"
          label="收货人:"
          placeholder=""
        />
        <van-field
          v-model="info.phone"
          label="联系电话:"
          placeholder=""
        />
        <van-cell :value="info.district" title="选择地区" is-link @click="showArea=true"></van-cell>
          <!-- @input="getSearchList" -->
        <van-field
          v-if="!isEdit"
          v-model="inputAddress"
          label="详细地址:"
          placeholder="街道、门牌号等"
          @click="showAddress=true"
        />
        <van-field
          v-if="isEdit"
          v-model="inputAddress"
          label="详细地址:"
          placeholder=""
          @click="showAddress=true"
        />
        <div class="chooseItem" v-if="isChoosed">
          <p class="top">{{addr1}}</p>
          <p class="bottom">{{addr2}}</p>
          <i class="icon-addrDele" @click="deleteAddress"></i>
        </div>
      </van-cell-group>
    </div>
    <div class="switch-container">
      设置默认地址
      <van-switch v-model="isDefault"/>
    </div>
    <div class="btn-container">
      <van-button v-if="!isEdit" round @click="saveAddress">保存地址</van-button>
      <van-button v-else round @click="updataAddress">更新地址</van-button>
    </div>
    <van-actionsheet v-model="showArea">
      <van-area :area-list="areaList" @confirm="onAreaConfirm" @cancel="onreaCancel"/>
    </van-actionsheet>
    <van-popup v-model="showAddress">
      <div class="address-box">
        <p class="title"><span>具体地址</span><input type="text" v-model="inputAddress" placeholder="请输入具体配送地址"><span class="btn-search" @click="getSearchList">搜索</span></p>
        <div class="address-list">
          <div class="loading-box" v-if="loading"><van-loading /></div>
          <div v-if="searchList.length&&!loading" class="address-item" :class="{'active':i==0}" v-for="(n,i) in searchList" :key="i" @click="chooseAddress(i)">
            <p class="top">{{n.name}}</p>
            <p class="bottom">{{n.pname+n.cityname+n.adname+n.address}}</p>
          </div>
          <div v-if="!searchList.length&&!isNull&&!loading" class="nodata">
            <p>请输入正确的地址</p>
          </div>
          <div v-if="!searchList.length&&isNull&&!loading" class="nodata">
            <p style="color:#e70012">该地址不在配送范围内</p>
          </div>
        </div>
      </div>
    </van-popup>
    <div id="container"></div>
    <div id="result"></div>
  </div>
</template>
<!-- 高德地图 -->
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.10&key=fa88b622064b112e8caefeb05f40b790"></script>
<script type="text/javascript" src="https://cache.amap.com/lbs/static/addToolbar.js"></script>
<script>
import { Toast, Cell, CellGroup, Field, Switch, Button, Actionsheet, Area, Popup, Loading } from 'vant';
import { areaList } from './../../common/areaList.js'
export default {
  components: {
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Actionsheet.name]: Actionsheet,
    [Area.name]: Area,
    [Switch.name]: Switch,
    [Popup.name]: Popup,
    [Loading.name]: Loading,
  },
  data(){
    return{
      isEdit: false,
      showArea: false,
      showAddress: false,
      // showList: false,
      areaList,
      data: {
        province: '',
        city: '',
        county: '',
      },
      isDefault: false,
      info: {
        contact: "",
        district: "",
        gaodeAddress: "",
        room: "",
        id: "",
        isDefault: "",
        phone: "",
        specificAddress: "",
      },
      inputAddress: '',
      // distributors: [], // 所有的配送员
      // isInArea: false,
      // resultList: [],
      searchList: [],
      addr1: '',
      addr2: '',
      isChoosed: false,
      isNull: false, //判断是否无数据 还是未搜索前
      loading: false,
    }
  },
  computed:{

  },
  methods: {
    isPhoneNum(str) {
      return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
    },
    onreaCancel() {
      this.showArea = false;
    },
    onAreaConfirm(values) {
      this.showArea = false;
      this.assignAreaValues(values);
    },
    chooseAddress(index){
      this.inputAddress = ''; //暂时确定为选择地址后就清空input框
      this.addr1 = this.searchList[index].name;
      this.addr2 = this.searchList[index].pname+this.searchList[index].cityname+this.searchList[index].adname+this.searchList[index].address;
      this.info.gaodeAddress = this.searchList[index].address;
      this.info.specificAddress = this.searchList[index].name;
      this.info.district = this.searchList[index].pname+this.searchList[index].cityname+this.searchList[index].adname;
      // console.log(this.info.specificAddress);
      document.querySelectorAll('.address-item.active')[0].classList.remove('active');
      document.querySelectorAll('.address-item')[index].classList.add('active');
      this.showAddress = false;
      this.isChoosed = true;
    },
    deleteAddress(){
      this.isChoosed = false;
      this.addr1 = '';
      this.addr2 = '';
      this.info.gaodeAddress = '';
      this.info.specificAddress = '';
      this.info.district = '';
    },
    assignAreaValues(values) {
      Object.assign(this.data, {
        province: values[0] ? values[0].name : '',
        city: values[1] ? values[1].name : '',
        county: values[2] ? values[2].name : ''
      });
      this.area = this.data.province +" "+ this.data.city +" "+ this.data.county;
      this.info.district = this.data.county;
    },
    saveAddress(){
      if(this.info.room&&this.info.contact&&this.info.phone){
        if(this.info.specificAddress){
          if(this.isPhoneNum(this.info.phone)){
            let formdata1 = new FormData();
            formdata1.append('contact',this.info.contact);
            formdata1.append('district',this.info.district);
            formdata1.append('isDefault',this.isDefault);
            formdata1.append('phone',this.info.phone);
            formdata1.append('room',this.info.room);
            formdata1.append('specificAddress',this.info.specificAddress);
            formdata1.append('gaodeAddress',this.info.gaodeAddress);
            addAddress(formdata1).then(res=>{
              // console.log(res);
              if(this.$route.name=="addressAdd"){
                this.$router.push({path:'/address'});
              }else if(this.$route.name=="shopAddAddress"){
                this.$router.push({path:'/shop/address'});
              }else if(this.$route.name=="pintuanAddAddress"){
                this.$router.push({path:'/pintuan/address'});
              }
            })
          }else{
            Toast('请填写正确的手机号码');
          }
        }else{
          Toast('请搜索并选择配送地址');
        }
      }else{
        Toast('请填写完整的信息');
      }
    },
    updataAddress(){
      console.log(this.resultList);
      // this.checkArea();
      if(this.info.room&&this.info.contact&&this.info.phone){
        if(this.info.specificAddress){
          if(this.isPhoneNum(this.info.phone)){
            let formdata2 = new FormData();
            formdata2.append('id',this.info.id);
            formdata2.append('contact',this.info.contact);
            formdata2.append('district',this.info.district);
            formdata2.append('isDefault',this.isDefault);
            formdata2.append('phone',this.info.phone);
            formdata2.append('room',this.info.room);
            formdata2.append('specificAddress',this.info.specificAddress);
            formdata2.append('gaodeAddress',this.info.gaodeAddress);
            editAddress(formdata2).then(res=>{
              // console.log(res);
              if(this.$route.name=="addressEdit"){
                this.$router.push({path:'/address'});
              }else if(this.$route.name=="shopEditAddress"){
                this.$router.push({path:'/shop/address'});
              }else if(this.$route.name=="pintuanEditAddress"){
                this.$router.push({path:'/pintuan/address'});
              }
            })
          }else{
            Toast('请填写正确的手机号码');
          }
        }else{
          Toast('请搜索并选择配送地址');
        }
      }else{
        Toast('请填写完整的信息');
      }
    },
    /* 获取搜索列表 */
    getSearchList(){
      this.loading = true;
      this.isNull = false;
      getSearchList(this.inputAddress).then(res=>{
        console.log(res);
        this.searchList = res.data.data.addressVos;
        if(!this.searchList.length){
          this.isNull = true;
        }
        this.showAddress = true;
        this.loading = false;
      })
    },
    /* 判断地址是是否在所有多边形区域内 (弃) */  
    // checkArea(){
    //   if(this.info.specificAddress){
    //     this.resultList = [];
    //     let map = new AMap.Map("container", {
    //       resizeEnable: true
    //     });
    //     let that = this;
    //     AMap.service(["AMap.PlaceSearch"], function() {
    //       let placeSearch = new AMap.PlaceSearch({ //构造地点查询类
    //         pageSize: 5, // 单页显示结果条数
    //         pageIndex: 1, // 页码
    //         city: "020", // 兴趣点城市
    //         citylimit: true,  //是否强制限制在设置的城市内搜索
    //         map: map, // 展现结果的地图实例
    //         // panel: "result", // 结果列表将在此容器中进行展示。
    //         autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    //       });
    //       for(let i=0;i<that.distributors.length;i++) {
    //         let polygon = new AMap.Polygon({
    //           path: that.distributors[i],//设置多边形边界路径
    //           // path: polygonArr,//设置多边形边界路径
    //           strokeColor: "#FF33FF", //线颜色
    //           strokeOpacity: 0.2, //线透明度
    //           strokeWeight: 3,    //线宽
    //           fillColor: "#1791fc", //填充色
    //           fillOpacity: 0.35,//填充透明度
    //           hidden: true
    //         });
    //         placeSearch.searchInBounds(that.info.specificAddress);
    //       }
    //     });
    //   }
    // }
  },
  mounted(){
    // handleLogin();
    //   if(this.$route.name=="addressAdd"||this.$route.name=="shopAddAddress"||this.$route.name=="pintuanAddAddress"){
    //     this.isEdit = false;
    //   }else if(this.$route.name=="addressEdit"||this.$route.name=="shopEditAddress"||this.$route.name=="pintuanEditAddress"){
    //     this.isEdit = true;
    //     getEditInfo(this.$route.query.id).then(res=>{
    //       this.info = res.data.data;
    //       this.isChoosed = true;
    //       this.addr1 = this.info.specificAddress;
    //       if(this.info.gaodeAddress){
    //         this.addr2 = this.info.district + this.info.gaodeAddress;
    //       }else{
    //         this.addr2 = this.info.district;
    //       }
    //       if(this.info.isDefault == 'true'){
    //         this.isDefault = true;
    //       }else{
    //         this.isDefault = false;
    //       }
    //     })
    //   }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#address-edit{
  min-height: 100%;
  box-sizing: border-box;
  background-color: #f6f6f6;
  position: relative;
  [class*=van-hairline]::after {
    border: 0!important;
  }
  .van-loading{
    margin: auto!important;
  }
  .input-container{
    .chooseItem{    
      background-color: #fff3ec;
      border: 1px solid #e16531;
      margin: 0.213333rem 0.266667rem 0.213333rem 2.666667rem;
      border-radius: 0.16rem;
      padding: 0.266667rem 1.066667rem;
      position: relative;
      &:before{
        content: '';
        width: 0.533333rem;
        height: 0.533333rem;
        display: block;
        background: url(./../../image/MORE@2x.png) no-repeat;
        -webkit-background-size: 0.533333rem 0.533333rem;
        background-size: 0.533333rem 0.533333rem;
        position: absolute;
        top: 50%;
        margin-top: -0.266667rem;
        left: 0.25rem;
      }
      i.icon-addrDele{
        width: 0.533333rem;
        height: 0.533333rem;
        display: block;
        background: url(./../../image/MORE@2x.png) no-repeat;
        -webkit-background-size: 0.533333rem 0.533333rem;
        background-size: 0.533333rem 0.533333rem;
        position: absolute;
        top: 50%;
        margin-top: -0.266667rem;
        right: 0.25rem;
      }
      p.top{
        font-size: 0.373333rem;
      }
      p.bottom{
        font-size: 0.3rem;
        color: #666;
      }
    }
  }
  .van-cell{
    height: 1.333333rem;
    line-height: 1.333333rem;
    padding: 0 0.4rem;
  }
  .switch-container{
    font-size: 0.373333rem;
    padding: 0 0.4rem;
    margin-top: 0.266667rem;
    line-height: 1.333333rem;
    background-color: #fff;
    .van-switch{
      float: right;
      margin-top: 9px;
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
      background-color: #e64a19;
      border-radius: 0.586667rem;
      line-height: 1.173333rem;
      text-align: center;
      color: #fff;
      font-size: 0.4rem;
    }
  }
  .van-popup{
    width: 100%;
    //margin-top: 5.68rem;//有区域选择框
    margin-top: 0.266667rem;//无区域选择框
    top: 0;
    left: 0;
    max-height: none;
    transition: unset;
    transform: none;
    p.title{
      height: 1.333333rem;
      line-height: 1.333333rem;
      font-size: 0.373333rem;
      color: #666;
      padding-left: 0.4rem;
      padding-right: 0.64rem;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      span{
        display: inline-block;
        width: 2.4rem;
      }
      input{
        width: 5.733333rem;
        border: 0;
        font-size: 0.373333rem;
        color: #999;
        line-height: 1.333333rem;
        //padding-left: 0.906667rem;
      }
      span.btn-search{
        position: absolute;
        color: #fff;
        border: 1px solid #e70012;
        background-color: #e70012;
        width: 1.066667rem;
        line-height: 0.533333rem;
        height: 0.533333rem;
        display: block;
        text-align: center;
        border-radius: 0.106667rem;
        top: 50%;
        margin-top: -0.266667rem;
        right: 0.266667rem;
      }
    }
    div.address-list{
      padding: 0 0.4rem;
      max-height: 10.666667rem;
      overflow: scroll;
      .loading-box{
        padding: 0.266667rem 0;
      }
      .address-item{
        padding: 0.266667rem 0;
        // height: 1.333333rem;
        //line-height: 1.333333rem;
        padding-left: 0.56rem;
        color: #666;
        //font-size: 0.4rem;
        font-size: 0.373333rem;
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        &:before{
          content: '';
          width: 0.373333rem;
          height: 0.44rem;
          display: block;
          background: url('./../../image/添加地址@2x.png') no-repeat;
          -webkit-background-size: 0.373333rem 0.44rem;
          background-size: 0.373333rem 0.44rem;
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -0.213333rem;
        }
        p.top{

        }
        p.bottom{
          color: #666!important;
        }
      }
      .address-item.active{
        color: #e70012;
        &:before{
          background: url('./../../image/添加地址@2x.png') no-repeat;
          -webkit-background-size: 0.373333rem 0.44rem;
          background-size: 0.373333rem 0.44rem;
        }
      }
      .nodata p{
        color: #666;
        font-size: 0.373333rem;
        padding: 0.266667rem 0;
      }
    }
  }
  .van-switch{
    border: 2px solid #e64a19;
  }
}
</style>
