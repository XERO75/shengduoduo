<template>
  <div id="shop-configure">
    <div class="progress-container">
      <van-row type="flex" justify="space-between">
        <van-col span="8">
          <div @click="clickProductIcon">
            <img src="./../../img/选择商品@2x.png">
            <p class="active">选择商品</p>
          </div>
        </van-col>
        <van-col span="8">
          <div>
            <img src="./../../img/送奶配置-红@2x.png">
            <p class="active">送奶配置</p>
          </div>
        </van-col>
        <van-col span="8">
          <div>
            <img src="./../../img/填写地址-灰@2x.png">
            <p>填写地址</p>
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
    <div class="many section">
      <p class="section-title" v-if="mutipleItems.length&&singleItems.length">多次配送</p>
      <div class="cycle-container">
        <p class="title">配送周期</p>
        <span class="tag everyday" :class="{'active':DeliverType=='EveryDay'}" @click="handleChooseWeek">周一到周日</span><span class="tag weekday" :class="{'active':DeliverType=='WorkingDay'}" @click="handleChooseWeek">周一到周五</span>
      </div>
      <div class="time-container">
        <p class="title">配送时间段</p>
        <span class="tag morning" :class="{'active':HalfDateType=='Morning'}"  @click="handleChooseTime">上午 6:00-8:00</span><span class="tag afternoon" :class="{'active':HalfDateType=='Afternoon'}" @click="handleChooseTime">下午 16:00-18:00</span>
      </div>
      <div class="date-container">
        <p class="title">配送时间段(时间必须在{{after}}天后{{before}}天内选择)</p>
        <p class="choose_date" v-model="date" @click="show=true">{{date}}</p>
      </div>
    </div>
    <div class="single section" v-if="mutipleItems.length&&singleItems.length">
      <p class="section-title">单次配送</p>
      <div class="product-container">
        <p class="title">订单中存在单次配送的商品</p>
        <p class="name" v-for="n in singleItems">{{n}}</p>
      </div>
      <div class="date-container">
        <p class="title">配送时间为</p>
        <p class="date">{{date2}}</p>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-datetime-picker
        @confirm="handleChooseDate"
        @cancel="show=false"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
    </van-popup>
    <div class="btn-container">
      <van-button @click="onClickNext">下一步</van-button>
    </div>
  </div>
</template>

<script>
import { Toast, Row, Col, Button, DatetimePicker, Popup } from 'vant';
import { getConfigure, getBuyNowConfigure } from "@/api/shop";
import { handleLogin } from "@/api/login";
export default {
  components: {
    [Toast.name]: Toast,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
  },
  data(){
    return{
      show: false,
      currentDate: '',
      after: '',
      before: '',
      mutipleItems: [],
      singleItems: [],

      DeliverType: 'EveryDay',
      HalfDateType: 'Morning',
    }
  },
  methods: {
    handleChooseDate(value){
      this.currentDate = value;
      // console.log(value);
      // console.log(this.currentDate);
      // console.log(this.date);
      // console.log(this.date2);
      // console.log(this.beginDate);
      this.show = false;
    },
    clickProductIcon(){
      // this.$router.go(-1);
      this.$router.push({path:'/shop/sort'});
    },
    handleChooseWeek(event){
      let tags =  event.currentTarget.parentNode.getElementsByClassName("tag");
      for(var i=0;i<tags.length;i++) {
        tags[i].classList.remove("active");
      }
      event.currentTarget.classList.add("active");
      let current = event.currentTarget;
      if(current.classList.contains('weekday')){
        this.DeliverType = 'WorkingDay';
      }else if(current.classList.contains('everyday')){
        this.DeliverType = 'EveryDay';
      }
    },
    handleChooseTime(event){
      let tags =  event.currentTarget.parentNode.getElementsByClassName("tag");
      for(var i=0;i<tags.length;i++) {
        tags[i].classList.remove("active");
      }
      event.currentTarget.classList.add("active");
      let current = event.currentTarget;
      if(current.classList.contains('morning')){
        this.HalfDateType = 'Morning';
      }else if(current.classList.contains('afternoon')){
        this.HalfDateType = 'Afternoon';
      }
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value;
    },
    getDateYMD(n) { 
      let today = new Date(); 
      today.setDate(today.getDate()+n);//获取 n天后 的日期  
      let dateObj = {};
      dateObj.y = today.getFullYear(); 
      dateObj.m = today.getMonth();//获取当前月份的日期 
      dateObj.d = today.getDate(); 
      return dateObj; 
    },
    onClickNext() {
      this.$store.state.DeliverType = this.DeliverType;
      this.$store.state.HalfDateType = this.HalfDateType;
      if(this.beginDate){
        this.$store.state.beginDate = this.beginDate;
        this.$router.push({path:'/shop/address',query:{type:this.$route.query.type}});
      }else{
        Toast('请选择配送时间段');
      }
    },
  },
  computed: {
    date(){
      if(this.currentDate){
        let cd = new Date(this.currentDate);
        return cd.getFullYear()+'年'+(cd.getMonth()+1)+'月'+cd.getDate()+'日'; 
      }else{
        return "请选择";
      }
    },
    date2(){
      let o = this.getDateYMD(this.after);
      let min = new Date(o.y,o.m,o.d);
      return min.getFullYear()+'-'+(min.getMonth()+1)+'-'+min.getDate(); 
    },
    /* 多次配送选择的时间 */
    beginDate(){
      if(this.currentDate){
        let cd = new Date(this.currentDate);
        // return Date.parse(cd); 
        return cd.getFullYear()+'-'+(cd.getMonth()+1)+'-'+cd.getDate(); 
      }else{
        return '';
      }
    },
    minDate(){
      // return new Date(this.minY,this.minM,this.minD);
      let o = this.getDateYMD(this.after);
      return new Date(o.y,o.m,o.d);
    },
    maxDate(){
      // return new Date(this.y,this.m,this.d);
      let o = this.getDateYMD(this.before);
      return new Date(o.y,o.m,o.d);
    }
  },
  mounted(){
    handleLogin();
      if(this.$route.query.type == 'cart'){
        getConfigure().then(res=>{
          this.after = res.data.data.after;
          this.before = res.data.data.before;
          this.mutipleItems = res.data.data.mutipleItems;
          this.singleItems = res.data.data.singleItems;
        })
      }else if(this.$route.query.type == 'buyNow'){
        let formdata = new FormData();
        formdata.append('count',this.$store.state.buyNow.count);
        formdata.append('deliveryMethod',this.$store.state.buyNow.deliveryMethod);
        formdata.append('number',this.$store.state.buyNow.number);
        formdata.append('produtId',this.$store.state.buyNow.produtId);
        getBuyNowConfigure(formdata).then(res=>{
          this.after = res.data.data.after;
          this.before = res.data.data.before;
          this.mutipleItems = res.data.data.mutipleItems;
          this.singleItems = res.data.data.singleItems;
        })
      }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#shop-configure{
  min-height: 100%;
  position: relative;
  box-sizing: border-box;
  //padding-top: 2.613333rem;
  padding-bottom: 1.306667rem;
  .van-popup{
    z-index: 10000!important;
  }
  .progress-container{
    width: 100%;
    box-sizing: border-box;
    z-index: 9999;
    background-color: #fff;
    padding: 0.533333rem 0.533333rem;
    //position: fixed;
    //top: 0;    
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
  .section{
    border-top: 0.266667rem solid #f6f6f6;
    padding: 0 0.4rem;
    .section-title{
      font-size: 0.4rem;
      font-weight: bold;
      color: #202020;
      height: 1.2rem;
      line-height: 1.2rem;
      border-bottom: 1px solid #e5e5e5;
    }
    .title{
      font-size: 0.346667rem;
      color: #999;
      padding: 0.346667rem 0 0.213333rem 0;
    }
    span.tag{
      width: 4.506667rem;
      height: 1.066667rem;
      box-sizing: border-box;
      display: inline-block;
      color: #666;
      border: 1px solid #999;
      border-radius: 0.053333rem;
      font-size: 0.373333rem;
      //font-weight: bold;
      line-height: 1.066667rem;
      text-align: center;
      margin-bottom: 0.16rem;
      &:last-child{
        float: right;
      }
      &.active{
        color: #e70012;
        border-color: #e70012;
      }
    }
  }
  .many{
    padding-bottom: 0.48rem;
    .date-container{
      p.choose_date{
        border: 1px solid #999;
        box-sizing: border-box;
        padding-left: 0.213333rem;
        height: 1.066667rem;
        line-height: 1.066667rem;
        color: #666;
        border-radius: 0.053333rem;
        font-size: 0.373333rem;
        position: relative;
        &:after{
          content: '';
          width: 0.48rem;
          height: 0.48rem;
          display: block;
          background: url(./../../img/right.png) no-repeat;
          -webkit-background-size: 0.48rem 0.48rem;
          background-size: 0.48rem 0.48rem;
          position: absolute;
          right: 0.08rem;
          top: 50%;
          margin-top: -0.24rem;
        }
      }
    }
  }
  .single{
    .product-container{
      p.name{
        font-size: 0.373333rem;
        color: #202020;
        &:last-child{
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 0.4rem;
        }
      }
    }
    .date-container{
      p.date{
        font-size: 0.373333rem;
        color: #202020;
        padding-bottom: 0.4rem;
      }
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
