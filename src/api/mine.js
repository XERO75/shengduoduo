// import axios from "axios";
import axios from "./../request.js";
var baseUrl = process.env.BASE_API;
const urls = {
  info: '/app/member/index.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 首页信息
export const getUserInfo = () => {
  return axios({
    url: apis.info,
    method: 'get',
    params: axios.getData({})
  });
};
