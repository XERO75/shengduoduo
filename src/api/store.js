import axios from 'axios';
var baseUrl = process.env.BASE_API;
const urls = {
  shopInfo: '/app/shop/shopInfo',
  shopCollage: '/app/collage/shopCollage',
  shopCouponList: '/app/member/shopCouponList',
  takeShopCoupon: '/app/member/takeShopCoupon',
  findProductByShopId: '/app/product/findProductByShopId',
  myFavoriteShop: '/app/member/myFavoriteShop',
  addFavorite: '/app/shop/addFavorite',
  removeFavorite: '/app/shop/removeFavorite'
};

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url];
    return acc;
  }, {});

// 传商铺code获取商铺详情
export const shopInfo = (code) => {
  return axios({
    url: apis.shopInfo,
    method: 'get',
    params: { code }
  });
};

// 传商铺code当前店铺正在拼团的信息 number为可选参数，即显示条数
export const shopCollage = (code, number) => {
  return axios({
    url: apis.shopCollage,
    method: 'get',
    params: { code, number }
  });
};

// 传商铺code获取当前店铺用户已经领取的优惠券
export const shopCouponList = (code) => {
  return axios({
    url: apis.shopCouponList,
    method: 'get',
    params: { code }
  });
};

// 传商铺code获取当前店铺用户已经领取的优惠券
export const takeShopCoupon = (couponId) => {
  return axios({
    url: apis.takeShopCoupon,
    method: 'get',
    params: { couponId }
  });
};

// 店铺的全部商品
export const findProductByShopId = (parms) => {
  return axios({
    url: apis.findProductByShopId,
    method: 'get',
    params: {
      number: parms.number, // 可选参数，不传为全部, 0为新品排序，1为销量排序，2为价格降序，3为价格升序
      pageNum: parms.pageNum,
      pageSize: parms.pageSize,
      shopId: parms.shopId
    }
  });
};

// 个人中心店铺收藏
export const myFavoriteShop = () => {
  return axios({
    url: apis.myFavoriteShop,
    method: 'get'
  });
};

// 收藏店铺
export const addFavorite = (parms) => {
  return axios({
    url: apis.addFavorite,
    method: 'post',
    data: parms
  });
};

// 取消收藏店铺
export const removeFavorite = (parms) => {
  return axios({
    url: apis.removeFavorite,
    method: 'post',
    data: parms
  });
};
