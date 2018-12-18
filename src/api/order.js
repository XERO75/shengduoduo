// import axios from "axios";
import axios from "./../request.js";
var baseUrl = process.env.BASE_API;
const urls = {
  list: '/app/member/myOrders.htm',
  detail: '/app/order/orderDetail.htm',
  cancel: '/app/order/refundOrder.htm',
  getComment: '/app/order/comment.htm',
  comment: '/app/order/commitComment.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 列表
export const getList = (status) => {
  return axios({
    url: apis.list,
    method: 'get',
    params: axios.getData({status:status})
  });
};
// 详情
export const getDetail = (sn) => {
  return axios({
    url: apis.detail,
    method: 'get',
    params: axios.getData({sn:sn})
  });
};
// 取消订单
export const cancelOrder = (param) => {
  return axios({
    url: apis.cancel,
    method: 'post',
    data: param,
    params: axios.getData({})
  });
};
// 获得评价标签
export const getComment = () => {
  return axios({
    url: apis.getComment,
    method: 'get',
    params: axios.getData({})
  });
};
// 评价
export const handleCommit = (param) => {
  return axios({
    url: apis.comment,
    method: 'post',
    data: param,
    params: axios.getData({})
  });
};