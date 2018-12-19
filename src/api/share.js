import axios from "axios";
var baseUrl = process.env.BASE_API;
const urls = {
  configure: '/wechat/payment/jsapipay/jssdk-config.htm',
  name: '/app/member/getCurrentName.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 首页
export const getWXConfigure = (url) => {
  return axios({
    url: apis.configure,
    method: 'get',
    params: axios.getData({
      url: url
    })
  });
};
// 获得用户昵称
export const getUseName = () => {
  return axios({
    url: apis.name,
    method: 'get',
    params: axios.getData({})
  });
};