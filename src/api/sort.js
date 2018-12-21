import axios from 'axios';
var baseUrl = process.env.BASE_API;
const urls = {
  list: '/app/memberProductCategory/list',
  findProductByCategoryId: '/app/product/findProductByCategoryId',
  detail: '/app/product/productInfo',
  comment: '/app/productComment/list',
  info: '/app/product/specificationInfo',
};
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url];
    return acc;
  }, {});

// 获取分类下的商品
export const list = () => {
  return axios({
    url: apis.list,
    method: 'get'
  });
};

// 根据分类id获取分类信息
export const findProductByCategoryId = (id) => {
  return axios({
    url: apis.findProductByCategoryId,
    method: 'get',
    params: { memberProductCategoryId: id }
  });
};

// 商品详情
export const getProductDetail = (id) => {
  return axios({
    url: apis.detail,
    method: 'get',
    params: { productId: id }
  });
};

// 获取评价列表
export const getCommentList = (pageNum,pageSize,productId) => {
  return axios({
    url: apis.comment,
    method: 'get',
    params: { 
      pageNum: pageNum, 
      pageSize: pageSize,
      productId: productId 
    }
  });
};

// 获取商品规格信息
export const getProductInfo = (productId) => {
  return axios({
    url: apis.info,
    method: 'get',
    params: { productId: productId }
  });
};
