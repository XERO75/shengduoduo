import axios from 'axios';
var baseUrl = process.env.BASE_API;
const urls = {
  list: '/app/memberProductCategory/list',
  findProductByCategoryId: '/app/product/findProductByCategoryId'
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
