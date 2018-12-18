// import axios from "axios";
import axios from "./../request.js";
var baseUrl = process.env.BASE_API;
const urls = {
  info: '/app/collage/product.htm',
  configure: '/app/collage/collageNow.htm',
  order: '/app/collage/initCollageOrder.htm',
  createOrder: '/app/collage/createCollageOrder.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 拼团详情
export const getInfo = (id) => {
  return axios({
    url: apis.info,
    method: 'get',
    params: axios.getData({productId:id})
  });
};
// 获取拼团配置
export const getPintuanConfigure = (param) => {
  return axios({
    url: apis.configure,
    method: 'post',
    params: axios.getData({}),
    data: param
  });
};
// 获取拼团订单信息
export const getOrderInfo = (param) => {
  return axios({
    url: apis.order,
    method: 'post',
    params: axios.getData({}),
    data: param
  });
};
// 生成订单
export const createOrder = (param) => {
  return axios({
    url: apis.createOrder,
    method: 'post',
    params: axios.getData({}),
    data: param
  });
};