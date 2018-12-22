import axios from 'axios';
var baseUrl = process.env.BASE_API;
const urls = {
  initOrders: '/app/orders/initOrders',
  myOrders: '/app/member/myOrders'
};
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url];
    return acc;
  }, {});

// 立即支付（预览订单）
export const initOrders = () => {
  return axios({
    url: apis.initOrders,
    method: 'get'
  });
};

// 我的订单
export const myOrders = (pageNum, pageSize) => {
  return axios({
    url: apis.myOrders,
    method: 'get',
    params: { pageNum: 1, pageSize: 10 }
  });
};
