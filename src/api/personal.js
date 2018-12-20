import axios from 'axios';
var baseUrl = process.env.BASE_API;
const urls = {
  center: '/app/member/center'
};
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url];
    return acc;
  }, {});
// 个人中心
export const center = () => {
  return axios({
    url: apis.center,
    method: 'get'
  });
};
