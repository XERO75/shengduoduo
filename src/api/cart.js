import axios from "axios";
var baseUrl = process.env.BASE_API;
const urls = {
  list: '/app/member/myCart',
  delete: '/app/cartItem/removeFromCart',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 快速登录
export const getCartList = () => {
  return axios({
    url: apis.list,
    method: 'get'
  });
};
// 删除购物车
export const deleteCart = (id) => {
  return axios({
    url: apis.delete,
    method: 'get',
    params: { cartItemId: id }
  });
};