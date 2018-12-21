import axios from 'axios';
var baseUrl = process.env.BASE_API;
const urls = {
  myRefund: '/app/member/myRefund',
  refundDetail: '/app/orderRefund/refundDetail'
};

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url];
    return acc;
  }, {});

// 获取退款售后
export const getRefundLists = (pageNum, pageSize) => {
  return axios({
    url: apis.myRefund,
    method: 'get',
    params: { pageNum, pageSize }
  });
};

// 获取售后详情
export const getRefundDetails = (paidCode) => {
  return axios({
    url: apis.refundDetail,
    method: 'get',
    params: { paidCode }
  });
};
