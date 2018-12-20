import axios from 'axios';
var baseUrl = process.env.BASE_API;
const urls = {
  list: '/app/member/myCart',
  delete: '/app/cartItem/removeFromCart',
  add: '/app/cartItem/addProduct',
  checkProduct: '/app/cartItem/changeSelected',
  checkStore: '/app/cartItem/shopSelected',
  checkAll: '/app/cartItem/selectAll',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url];
    return acc;
  }, {});
// 快速登录
export const getCartList = () => {
  return axios({
    url: apis.list,
    method: 'get'
  });
};
// 添加购物车
export const addCart = (query) => {
  return axios({
    url: apis.add,
    method: 'post',
    data: query
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
// 勾选&取消购物车商品
export const checkProduct = (query) => {
  return axios({
    url: apis.checkProduct,
    method: 'post',
    data: query
  });
};
// 勾选&取消购物车店铺商品
export const checkStore = (query) => {
  return axios({
    url: apis.checkStore,
    method: 'post',
    data: query
  });
};
// 勾选&取消购物车全部商品
export const checkAll = (query) => {
  return axios({
    url: apis.checkAll,
    method: 'post',
    data: query
  });
};
