import axios from 'axios';
// import axios from "./../request.js";
var baseUrl = process.env.BASE_API;
const urls = {
  product: '/app/index/findProductIsShow',
  bannerAdList: '/app/index/bannerAdList',
  positionAdList: '/app/index/positionAdList',
  productAdList: '/app/index/productAdList',
  positionAdParallelList: '/app/index/positionAdParallelList',
  positionAdVerticalList: '/app/index/positionAdVerticalList'
};
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url];
    return acc;
  }, {});
// 首页推荐商品
export const getProductList = () => {
  return axios({
    url: apis.product,
    method: 'get'
  });
};

// 首页banner图片
export const bannerAdList = () => {
  return axios({
    url: apis.bannerAdList,
    method: 'get'
  });
};

// 首页占位广告 (横排)
export const positionAdParallelList = () => {
  return axios({
    url: apis.positionAdParallelList,
    method: 'get'
  });
};

// 首页占位广告 (竖排)
export const positionAdVerticalList = () => {
  return axios({
    url: apis.positionAdVerticalList,
    method: 'get'
  });
};

// 首页商品广告
export const productAdList = () => {
  return axios({
    url: apis.productAdList,
    method: 'get',
    params: { number: 2 }
  });
};
