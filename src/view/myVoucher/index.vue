<template>
  <div id="myVoucher">
    <van-tabs v-model="active">
      <van-tab title="全部">
        <div class="card-container" v-if="allVouchers.length" @click="onClickDetail(i,0)" v-for="(n,i) in allVouchers" :key="i">
          <div class="card-box">
            <img :src="n.secondLevelImage">
            <p class="money">&yen;&nbsp;<span>{{n.value.replace('.00','')}}</span></p>
            <div class="bottom-bar" :class="{'give': n.status=='WaitToGive'}">
              <span class="fl">{{n.giftCardName}}</span>
              <span class="fr">{{n.statusText}}</span>
            </div>
          </div>
        </div>
        <div class="nodata" v-if="!allVouchers.length">
          <img src="./../../img/优惠券-空@2x.png">
          <p>您没有已领取的优鲜卡</p>
          <span class="btn-exchange" @click="onClickPoints">去兑换</span>
        </div>
      </van-tab>
      <van-tab title="我购买的">
        <div class="card-container" v-if="buyedVouchers.length" @click="onClickDetail(i,1)" v-for="n in buyedVouchers" :key="n.id">
          <div class="card-box">
            <img :src="n.secondLevelImage">
            <p class="money">&yen;&nbsp;<span>{{n.value.replace('.00','')}}</span></p>
            <div class="bottom-bar" :class="{'give': n.status=='WaitToGive'}">
              <span class="fl">{{n.giftCardName}}</span>
              <span class="fr">{{n.statusText}}</span>
            </div>
          </div>
        </div>
        <div class="nodata" v-if="!buyedVouchers.length">
          <img src="./../../img/优惠券-空@2x.png">
          <p>您没有已领取的优鲜卡</p>
          <span class="btn-exchange" @click="onClickPoints">去兑换</span>
        </div>
      </van-tab>
      <van-tab title="已领取">
        <div class="card-container" v-if="gotVouchers.length" @click="onClickDetail(i,2)" v-for="n in gotVouchers" :key="n.id">
          <div class="card-box">
            <img :src="n.secondLevelImage">
            <p class="money">&yen;&nbsp;<span>{{n.value.replace('.00','')}}</span></p>
            <div class="bottom-bar" :class="{'give': n.status=='WaitToGive'}">
              <span class="fl">{{n.giftCardName}}</span>
              <span class="fr">{{n.statusText}}</span>
            </div>
          </div>
        </div>
        <div class="nodata" v-if="!gotVouchers.length">
          <img src="./../../img/优惠券-空@2x.png">
          <p>您没有已领取的优鲜卡</p>
          <span class="btn-exchange" @click="onClickPoints">去兑换</span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import { getMyVoucher } from "@/api/myVoucher"
import { handleLogin } from "@/api/login"
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  data(){
    return{
      active: 0,
      hasVoucher: false,
      allVouchers: [],
      buyedVouchers: [],
      gotVouchers: [],
    }
  },
  methods: {
    onClickPoints() {
      this.$router.push({path:'/points/voucher'});
    },
    onClickDetail(i,n) {
      let code = '';
      if(n==0){
        code = this.allVouchers[i].code;
      }else if(n==1){
        code = this.buyedVouchers[i].code;
      }else if(n==2){
        code = this.gotVouchers[i].code;
      }
      this.$router.push({path:'/myVoucher/detail',query:{code:code}});
    },
  },
  mounted(){
    handleLogin();
      getMyVoucher().then(res=>{
        console.log(res);
        this.gotVouchers = [];
        this.buyedVouchers = [];
        this.allVouchers = res.data.data;
        for(var i=0;i<this.allVouchers.length;i++) {
          if(this.allVouchers[i].status=="WaitToGive"){
            this.allVouchers[i].statusText = "赠送好友";
          }else if(this.allVouchers[i].status=="Giving"){
            this.allVouchers[i].statusText = "赠送中";
          }else if(this.allVouchers[i].status=="Given"){
            this.allVouchers[i].statusText = "已被领取";
          }else if(this.allVouchers[i].status=="WaitToUse"){
            this.allVouchers[i].statusText = "待使用";
          }else{
            this.allVouchers[i].statusText = "已使用";
          }
          if(this.allVouchers[i].status=="WaitToUse"||this.allVouchers[i].status=="Used"){
            this.gotVouchers.push(this.allVouchers[i]);
          }else{
            this.buyedVouchers.push(this.allVouchers[i]);
          }
        }
      });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#myVoucher{
  min-height: 100%;
  padding-bottom: 1.066667rem;
  box-sizing: border-box;
  background-color: #f6f6f6;
  .card-container{
    height: 3.2rem;
    padding: 0.4rem 0.4rem 0 0.4rem;
    .card-box{
      width: 100%;
      height: 100%;
      //background: url(./../../img/优鲜卡@2x.png) no-repeat;
      background-size: 100%;
      padding: 0.266667rem;
      box-sizing: border-box;
      position: relative;
      border-radius: 0.106667rem;
      overflow: hidden;
      img{
        position: absolute;
        width: 100%; 
        height: 100%;
        top: 0;
        left: 0;
      }
      p.money{    
        font-size: 0.64rem;
        color: rgba(255,255,255,.9);
        position: absolute;
        span{
          font-size: 0.96rem;
        }
      }
      div.bottom-bar{
        width: 100%;
        height: 0.88rem;
        position: absolute;
        bottom: 0;
        left: 0;
        color: #fff;
        font-size: 0.346667rem;
        line-height: 0.88rem;
        padding: 0 0.266667rem;
        box-sizing: border-box;
        background-color: rgba(20, 20, 20, .4);
      }
      div.bottom-bar.give{
        padding: 0 0.533333rem 0 0.266667rem;
      }
      div.bottom-bar.give:after{
        content: '>';
        width: 0.32rem;
        height: 0.83333rem;
        display: block;
        position: absolute;
        right: 0.16rem;
        bottom: 0.026666rem;
        font-size: 0.52222rem;
        color: #fff;
      }
    }
  }
  .nodata{
    width: 100%;
    position: absolute;
    text-align: center;
    img{
      width: 3.746667rem;
      height: 2.0rem;
      margin-top: 2.773333rem;
    }
    p{
      padding: 0.88rem 0 0.453333rem 0;
      font-size: 0.346667rem;
      color: #999;
    }
    span{
      width: 2.986667rem;
      height: 0.88rem;
      display: block;
      color: #666;
      font-size: 0.426667rem;
      border: 1px solid #b5b5b5;
      border-radius: 0.44rem;
      line-height: 0.88rem;
      margin: 0 auto;
    }
  }
}
</style>
