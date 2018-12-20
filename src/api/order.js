import axios from 'axios';
var baseUrl = process.env.BASE_API;
const urls = {
  initOrders: '/app/orders/initOrders'
};
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url];
    return acc;
  }, {});
// 快速登录
export const initOrders = () => {
  return axios({
    url: apis.initOrders,
    method: 'get'
  });
};
