// import axios from "axios";
import axios from "./../request.js";
var baseUrl = process.env.BASE_API;
const urls = {
  list: '/app/gift_card/list.htm',
  detail: '/app/gift_card/add.htm',
  buy: '/app/gift_card/buy.htm',
  wx: '/wechat/payment/jsapipay/gfPay.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 优鲜卡首页
export const getVoucher = () => {
  return axios({
    url: apis.list,
    method: 'get',
    params: axios.getData({})
  });
};
// 优鲜卡详情
export const getDetail = (id) => {
  return axios({
    url: apis.detail,
    method: 'get',
    params: axios.getData({
      id: id
    })
  });
};
// 购买
export const buyCard = (params) => {
  return axios({
    url: apis.buy,
    method: 'post',
    params: axios.getData({}),
    data: params
  });
};
// 优鲜卡微信支付
export const WXPay = (params) => {
  return axios({
    url: apis.wx,
    method: 'post',
    data: params,
    params: axios.getData({})
  });
};
