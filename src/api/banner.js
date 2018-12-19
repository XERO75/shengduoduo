import axios from "axios";
var baseUrl = process.env.BASE_API;
const urls = {
  code: '/app/order/payEventKeyCode.htm',
  detail: '/app/event/event_index.htm',
  revice: '/app/event/reciveCoupon.htm',
  pointsDetail: '/app/points/detail.htm',
  pointsRevice: '/app/points/receive.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
/* 获取活动唯一code */
export const getBannerKeyCode = () => {
  return axios({
    url: apis.code,
    method: 'get',
    params: axios.getData({})
  });
};
/* 获得活动页面详情 */
export const getBannerDetail = (keyCode) => {
  return axios({
    url: apis.detail,
    method: 'get',
    params: axios.getData({keyCode:keyCode})
  });
};
// 购买
export const reviceCoupon = (params) => {
  return axios({
    url: apis.revice,
    method: 'post',
    params: axios.getData({}),
    data: params
  });
};
/* 获得领取积分活动页面详情 */
export const getPointsDetail = (keyCode) => {
  return axios({
    url: apis.pointsDetail,
    method: 'get',
    params: axios.getData({keyCode:keyCode})
  });
};
// 领取积分
export const revicePoints = (params) => {
  return axios({
    url: apis.pointsRevice,
    method: 'post',
    params: axios.getData({}),
    data: params
  });
};