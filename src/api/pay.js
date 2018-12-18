// import axios from "axios";
import axios from "./../request.js";
var baseUrl = process.env.BASE_API;
const urls = {
  pay: '/wechat/payment/jsapipay/pay.htm',
  free: '/app/order/payWay.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 调起微信支付
export const WXPay = (param) => {
  return axios({
    url: apis.pay,
    method: 'post',
    data: param,
    params: axios.getData({})
  });
};
// 0元支付
export const payFree = (param) => {
  return axios({
    url: apis.free,
    method: 'post',
    data: param,
    params: axios.getData({})
  });
};


