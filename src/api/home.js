import axios from "axios";
// import axios from "./../request.js";
var baseUrl = process.env.BASE_API;
const urls = {
  product: '/app/index/findProductIsShow',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 首页推荐商品
export const getProductList = () => {
  return axios({
    url: apis.product,
    method: 'get'
  });
};