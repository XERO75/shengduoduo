import axios from "axios";
var baseUrl = process.env.BASE_API;
const urls = {
  index: '/app/pointsMall/index.htm',
  isSign: '/app/sign_id/ifSign.htm',
  sign: '/app/sign_id/sign.htm',
  coupon: '/app/pointsMall/exchangeCoupon.htm',
  exchangeCoupon: '/app/pointsMall/exchange.htm',
  product: '/app/pointsMall/productList.htm',
  detail: '/app/pointsMall/productInfo.htm',
  order: '/app/pointsMall/exchangeProductConfirm.htm',
  exchangeProduct: '/app/pointsMall/exchangeProduct.htm',
  couponHistory: '/app/pointsMall/couponHistory.htm',
  productHistory: '/app/pointsMall/exchangeProductHistory.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 首页
export const getPointsIndex = () => {
  return axios({
    url: apis.index,
    method: 'get',
    params: axios.getData({})
  });
};
// 判断是否已签到
export const isSign = () => {
  return axios({
    url: apis.isSign,
    method: 'get',
    params: axios.getData({})
  });
};
// 签到
export const Sign = () => {
  return axios({
    url: apis.sign,
    method: 'get',
    params: axios.getData({})
  });
};
// 兑换优惠券页面
export const getCouponList = () => {
  return axios({
    url: apis.coupon,
    method: 'get',
    params: axios.getData({})
  });
};
// 兑换优惠券
export const exchangeCoupon = (params) => {
  return axios({
    url: apis.exchangeCoupon,
    method: 'post',
    params: axios.getData({}),
    data: params
  });
};
// 奖品列表
export const getProductList = () => {
  return axios({
    url: apis.product,
    method: 'get',
    params: axios.getData({})
  });
};
// 奖品详情
export const getDetail = (id) => {
  return axios({
    url: apis.detail,
    method: 'get',
    params: axios.getData({id:id})
  });
};
// 兑换奖品订单详情
export const getOrderInfo = (id,count) => {
  return axios({
    url: apis.order,
    method: 'get',
    params: axios.getData({id:id,count:count})
  });
};
// 兑换奖品
export const exchangeProduct = (productId,count,memberAddressId) => {
  return axios({
    url: apis.exchangeProduct,
    method: 'get',
    params: axios.getData({
      productId : productId,
      count : count,
      memberAddressId : memberAddressId
    })
  });
};
// 优惠券兑换历史
export const getCouponHistory = () => {
  return axios({
    url: apis.couponHistory,
    method: 'get',
    params: axios.getData({})
  });
};
// 奖品兑换历史
export const getProductHistory = () => {
  return axios({
    url: apis.productHistory,
    method: 'get',
    params: axios.getData({})
  });
};