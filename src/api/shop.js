import axios from "axios";
var baseUrl = process.env.BASE_API;
const urls = {
  home: '/app/common/index.htm',
  h5: '/app/common/getH5.htm',
  sort: '/app/product_info/index.htm',
  detail: '/app/product_info/productDetail.htm',
  addCart: '/app/product_info/addItem.htm',
  deleteCart: '/app/product_info/deleteItem.htm',
  clearCart: '/app/product_info/cleanCart.htm',
  cart: '/app/product_info/myCart.htm',
  getEditProduct: '/app/product_info/edit.htm',
  editProduct: '/app/product_info/update.htm',
  configure: '/app/product_info/next.htm',
  order: '/app/product_info/initOrder.htm',
  createOrder: '/app/order/createOrder.htm',
  buyNow: '/app/product_info/buyNow.htm',
  comment: '/app/product_info/selectComment.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 首页信息
export const getHomeInfo = () => {
  return axios({
    url: apis.home,
    method: 'get',
    params: axios.getData({})
  });
};
// h5
export const getH5 = (id,type) => {
  return axios({
    url: apis.h5,
    method: 'get',
    params: axios.getData({id:id,type:type})
  });
};
// 订奶服务
export const getProductList = () => {
  return axios({
    url: apis.sort,
    method: 'get',
    params: axios.getData({})
  });
};
// 商品详情
export const getProductDetail = (id) => {
  return axios({
    url: apis.detail,
    method: 'get',
    params: axios.getData({ id: id })
  });
};
// 添加购物车
export const addCart = (param) => {
  return axios({
    url: apis.addCart,
    method: 'post',
    data: param,
    params: axios.getData({})
  });
};
// 删除购物车
export const deleteCart = (param) => {
  return axios({
    url: apis.deleteCart,
    method: 'post',
    data: param,
    params: axios.getData({})
  });
};
// 清空购物车
export const clearCart = () => {
  return axios({
    url: apis.clearCart,
    method: 'get',
    params: axios.getData({})
  });
};
// 获取编辑购物车商品信息
export const getEditProduct = (id) => {
  return axios({
    url: apis.getEditProduct,
    method: 'get',
    params: axios.getData({ id: id })
  });
};
// 购物车商品
export const getCart = () => {
  return axios({
    url: apis.cart,
    method: 'get',
    params: axios.getData({})
  });
};
// 编辑购物车商品
export const editProduct = (param) => {
  return axios({
    url: apis.editProduct,
    method: 'post',
    data: param,
    params: axios.getData({})
  });
};
// 送奶配置
export const getConfigure = () => {
  return axios({
    url: apis.configure,
    method: 'get',
    params: axios.getData({})
  });
};
// 提交订单
export const submitOrder = (param) => {
  return axios({
    url: apis.order,
    method: 'post',
    data: param,
    params: axios.getData({})
  });
};
// 生成订单
export const createOrder = (param) => {
  return axios({
    url: apis.createOrder,
    method: 'post',
    data: param,
    params: axios.getData({})
  });
};
// 立即购买
export const getBuyNowConfigure = (param) => {
  return axios({
    url: apis.buyNow,
    method: 'post',
    data: param,
    params: axios.getData({})
  });
};
// 点击评论标签查看评论
export const getCommentsByTag = (param) => {
  return axios({
    url: apis.comment,
    method: 'post',
    data: param,
    params: axios.getData({})
  });
};


