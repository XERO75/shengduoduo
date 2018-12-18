// import axios from "axios";
import axios from "./../request.js";
var baseUrl = process.env.BASE_API;
const urls = {
  list: '/app/member/myCoupon.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 优惠券列表
export const getCouponList = () => {
  return axios({
    url: apis.list,
    method: 'get',
    params: axios.getData({})
  });
};
