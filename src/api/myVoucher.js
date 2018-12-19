import axios from "axios";
var baseUrl = process.env.BASE_API;
const urls = {
  card: '/app/member/myGiftCard.htm',
  detail: '/app/gift_card/cardDetail.htm',
  returnDetail: '/app/gift_card/refundInfo.htm',
  return: '/app/gift_card/refundCard.htm',
  share: '/app/gift_card/sendGiftCard.htm',
  receiveDetail: '/app/gift_card/receiveCardDetail.htm',
  receive: '/app/gift_card/reciveCard.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 优鲜卡列表
export const getMyVoucher = () => {
  return axios({
    url: apis.card,
    method: 'get',
    params: axios.getData({})
  });
};
// 优鲜卡详情
export const getDetail = (code) => {
  return axios({
    url: apis.detail,
    method: 'get',
    params: axios.getData({code:code})
  });
};
// 优鲜卡退卡详情
export const getReturnDetail = (params) => {
  return axios({
    url: apis.returnDetail,
    method: 'post',
    params: axios.getData({}),
    data: params
  });
};
// 退卡
export const returnCard = (params) => {
  return axios({
    url: apis.return,
    method: 'post',
    params: axios.getData({}),
    data: params
  });
};
// 赠卡
export const shareCard = (params) => {
  return axios({
    url: apis.share,
    method: 'post',
    params: axios.getData({}),
    data: params
  });
};
// 领卡
export const receiveCard = (params) => {
  return axios({
    url: apis.receive,
    method: 'post',
    params: axios.getData({}),
    data: params
  });
};
// 优鲜卡退卡详情
export const getReceiveDetail = (code) => {
  return axios({
    url: apis.receiveDetail,
    method: 'get',
    params: axios.getData({code:code}),
  });
};