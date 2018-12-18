<template>
  <div id="points-address">
    <div class="add-address">
      <p class="text-right" @click="onClickAdd">+ 新增地址</p>
    </div>
    <div class="address-container">
      <div class="info">
        <p class="address">广东省广州市天河区天河路珠江新城星汇国际大品牌教育中心，科华路12号21房</p>
        <p class="phone">李先生 13555555555</p>
      </div>
      <div class="icon-container">
        <p>
          <span class="icon-edit" @click="onClickEdit"></span>
        </p>
      </div>
    </div>
    <div class="address-container">
      <div class="info">
        <p class="address">广东省广州市天河区天河路珠江新城星汇国际大品牌教育中心，科华路12号21房</p>
        <p class="phone">李先生 13555555555</p>
      </div>
      <div class="icon-container">
        <p>
          <span class="icon-edit" @click="onClickEdit"></span>
        </p>
      </div>
    </div>
    <van-popup v-model="show">
      <p class="text-center">是否确定删除该地址？</p>
      <div class="popup-btn-container">
        <van-row gutter="10">
          <van-col span="12">
            <van-button class="submit-btn" style="background-color:#ffd100">确定</van-button>
          </van-col>
          <van-col span="12">
            <van-button class="cancel-btn" @click="show=false" style="background-color:#f2f2f2;" type="default">取消</van-button>   
          </van-col>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast, Popup, Button, Row, Col } from 'vant';
// import { articleList } from "@/api/article"
export default {
  components: {
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  data(){
    return{
      show: false,
    }
  },
  methods: {
    onClickAdd() {
      this.$router.push({path:'/address/add'});
    },
    onClickEdit() {
      this.$router.push({path:'/address/edit'});
    },
  },
  mounted(){

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#points-address{
  .add-address{
    p{
      padding: 25px 15px 15px 0;
      font-size: 16px;
    }
  }
  .address-container{
    position: relative;
    margin-bottom: 20px;
    .info {
      border: 1px solid #ccc;
      padding: 5px 15px;
      padding-right: 60px;
      margin: 0 20px;
      .address{
        font-weight: bold;
      }
    }
    .icon-container{
      position: absolute;
      width: 105px;
      height: 100%;
      top: 0;
      right: 0;
      p{
        line-height: 73px;
        text-align: center;
        .icon-edit{
          background: url(./../../pic/edit.png) no-repeat;
          background-size: 20px 20px;
          display: inline-block;
          width: 20px;
          height:20px;
          margin-right: 10px;
        }
        .icon-delete{
          background: url(./../../pic/delete.png) no-repeat;
          background-size: 20px 20px;
          display: inline-block;
          width: 20px;
          height:20px;
        }
      }
    }
  }
  .van-popup{
    top: 40%;
    width: 80%;
    height: 150px;
    border-radius: 4px;
    border: 0.5px solid #888;
    p{
      margin: 25px 0 40px 20px;
    }
    .popup-btn-container {
      margin: 20px 10px;
      button{
        width: 100%;    
        border-radius: 5px;
      }
    }
  }
}
</style>
