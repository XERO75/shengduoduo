// import axios from "axios";
import axios from "./../request.js";
var baseUrl = process.env.BASE_API;
const urls = {
  icon: '/app/common/menu.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 底部导航图标
export const getMenu = () => {
  return axios({
    url: apis.icon,
    method: 'get',
    params: axios.getData({})
  });
};
