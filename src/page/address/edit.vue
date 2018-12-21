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
          oninput="if(value.length>11)value=value.slice(0,11)"
          placeholder=""
        />
        <van-cell :value="info.district" title="选择地区" is-link @click="showArea=true"></van-cell>
          <!-- @input="getSearchList" -->
        <van-field
          v-if="!isEdit"
          v-model="info.inputAddress"
          label="详细地址:"
          placeholder="街道、门牌号等"
        />
        <van-field
          v-if="isEdit"
          v-model="info.inputAddress"
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
    <div id="container"></div>
    <div id="result"></div>
  </div>
</template>
<script>
import { Toast, Cell, CellGroup, Field, Switch, Button, Actionsheet, Area, Popup, Loading } from 'vant';
import { areaList } from './../../common/areaList.js'
import { handleAdd, handleEdit, handleUpdate } from '@/api/address.js'
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
      isDefault: false,
      areaList,
      data: {
        province: '',
        city: '',
        county: '',
      },
      info: {
        contact: "",
        district: "",
        id: "",
        isDefault: "",
        phone: "",
        inputAddress: '',
      },
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
    saveAddress(){
      if(this.info.contact && this.info.phone && this.info.district && this.info.inputAddress){
        if (this.isPhoneNum(this.info.phone)) {
          let formdata = new FormData();
          formdata.append('contact',this.info.contact);
          formdata.append('area',this.info.district);
          formdata.append('phone',this.info.phone);
          formdata.append('specificAddress',this.info.inputAddress);
          formdata.append('isDefault',this.isDefault);
          handleAdd(formdata).then(res => {
            if (res.data.code === 0) {
              Toast.success('添加成功')
              setTimeout(() => {
                this.$router.go(-1)
              }, 1500);
            } else Toast.fail(res.data.errmsg)
          })
        } else {
          Toast('请填写正确的手机号码');
        }
      } else {
        Toast('请填写完整的信息');
      }
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
    updataAddress(){
      if(this.info.contact && this.info.phone && this.info.district && this.info.inputAddress){
        if (this.isPhoneNum(this.info.phone)) {
          let formdata = new FormData();
          formdata.append('contact',this.info.contact);
          formdata.append('area',this.info.district);
          formdata.append('phone',this.info.phone);
          formdata.append('specificAddress',this.info.inputAddress);
          formdata.append('isDefault',this.isDefault);
          handleUpdate(formdata).then(res => {
            if (res.data.code === 0) {
              Toast.success('更新成功')
              setTimeout(() => {
                this.$router.go(-1)
              }, 1500);
            } else Toast.fail(res.data.errmsg)
          })
        } else {
          Toast('请填写正确的手机号码');
        }
      } else {
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
  },
  mounted(){
    if (this.$route.name === 'addressEdit') {
      this.isEdit = true
      handleEdit(this.$route.query.addressId).then(res => {
        console.log(res);
        if (res.data.code === 0) {
          this.info.contact = res.data.data.contact
          this.info.district = res.data.data.area
          this.info.phone = res.data.data.phone
          this.info.inputAddress = res.data.data.specificAddress
          this.isDefault = res.data.data.isDefault
        } else {
          Toast('res.data.errmsg')
        }
      })
    }
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
