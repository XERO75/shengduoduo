import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  // {
  //   path: '*',
  //   redirect: '/shop'
  // },
  {
    path: '/pintuan',
    name: 'pintuan',
    component: () => import('./view/pintuan'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/pintuan/configure',
    name: 'pintuanConfigure',
    component: () => import('./view/pintuan/configure'),
    meta: {
      title: '配送设置'
    }
  },
  {
    path: '/pintuan/address',
    name: 'pintuanAddress',
    component: () => import('./view/pintuan/address'),
    meta: {
      title: '填写地址'
    }
  },
  {
    path: '/pintuan/order',
    name: 'pintuanOrder',
    component: () => import('./view/pintuan/order'),
    meta: {
      title: '提交订单'
    }
  },
  {
    path: '/pintuan/success',
    name: 'pintuanSuccess',
    component: () => import('./view/pintuan/success'),
    meta: {
      title: '拼团成功'
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('./view/test'),
    meta: {
      title: '测试页面'
    }
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('./view/shop'),
    meta: {
      title: '燕塘优鲜达'
    }
  },
  {
    path: '/shop/h5',
    name: 'h5',
    component: () => import('./view/shop/h5'),
    meta: {
      title: '燕塘优鲜达'
    }
  },
  {
    path: '/shop/sort',
    name: 'shopSort',
    component: () => import('./view/shop/sort'),
    meta: {
      title: '订奶服务'
    }
  },
  {
    path: '/shop/detail',
    name: 'shopDetail',
    component: () => import('./view/shop/detail'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/shop/configure',
    name: 'shopConfigure',
    component: () => import('./view/shop/configure'),
    meta: {
      title: '配送设置'
    }
  },
  {
    path: '/shop/address',
    name: 'shopAddress',
    component: () => import('./view/shop/address'),
    meta: {
      title: '填写地址'
    }
  },
  {
    path: '/shop/addAddress',
    name: 'shopAddAddress',
    component: () => import('./view/address/edit'),
    meta: {
      title: '新增地址'
    }
  },
  {
    path: '/shop/editAddress',
    name: 'shopEditAddress',
    component: () => import('./view/address/edit'),
    meta: {
      title: '编辑地址'
    }
  },
  {
    path: '/pintuan/addAddress',
    name: 'pintuanAddAddress',
    component: () => import('./view/address/edit'),
    meta: {
      title: '新增地址'
    }
  },
  {
    path: '/pintuan/editAddress',
    name: 'pintuanEditAddress',
    component: () => import('./view/address/edit'),
    meta: {
      title: '编辑地址'
    }
  },
  {
    path: '/shop/order',
    name: 'shopOrder',
    component: () => import('./view/shop/order'),
    meta: {
      title: '提交订单'
    }
  },
  // {
  //   path: '/shop/coupon',
  //   name: 'shopCoupon',
  //   component: () => import('./view/shop/coupon'),
  //   meta: {
  //     title: '选择优惠券'
  //   }
  // },
  // {
  //   path: '/shop/voucher',
  //   name: 'shopVoucher',
  //   component: () => import('./view/shop/voucher'),
  //   meta: {
  //     title: '选择优鲜卡'
  //   }
  // },
  {
    path: '/banner',
    name: 'banner',
    component: () => import('./view/banner'),
    meta: {
      title: '燕塘优鲜达'
    }
  },  {
    path: '/banner/getPoints',
    name: 'getPoints',
    component: () => import('./view/banner/getPoints'),
    meta: {
      title: '燕塘优鲜达'
    }
  },
  {
    path: '/voucher',
    name: 'voucher',
    component: () => import('./view/voucher'),
    meta: {
      title: '优鲜卡'
    }
  },
  {
    path: '/voucher/detail',
    name: 'voucherDetail',
    component: () => import('./view/voucher/detail'),
    meta: {
      title: '优鲜卡详情'
    }
  },
  {
    path: '/voucher/success',
    name: 'voucherSuccess',
    component: () => import('./view/voucher/success'),
    meta: {
      title: '购买成功'
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('./view/mine'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: () => import('./view/mine/agreement'),
    meta: {
      title: '用户使用协议'
    }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('./view/order'),
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/order/detail',
    name: 'orderDetail',
    component: () => import('./view/order/detail'),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/order/success',
    name: 'orderSuccess',
    component: () => import('./view/order/success'),
    meta: {
      title: '支付完成'
    }
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: () => import('./view/coupon'),
    meta: {
      title: '我的优惠券'
    }
  },
  {
    path: '/myVoucher',
    name: 'myVoucher',
    component: () => import('./view/myVoucher'),
    meta: {
      title: '我的优鲜卡'
    }
  },
  {
    path: '/myVoucher/detail',
    name: 'myVoucherDetail',
    component: () => import('./view/myVoucher/detail'),
    meta: {
      title: '优鲜卡详情'
    }
  },
  {
    path: '/myVoucher/success',
    name: 'myVoucherSuccess',
    component: () => import('./view/myVoucher/success'),
    meta: {
      title: '退卡'
    }
  },
  {
    path: '/myVoucher/return',
    name: 'myVoucherReturn',
    component: () => import('./view/myVoucher/return'),
    meta: {
      title: '我要退卡'
    }
  },
  {
    path: '/myVoucher/receive',
    name: 'myVoucherReceive',
    component: () => import('./view/myVoucher/receive'),
    meta: {
      title: '燕塘优鲜达'
    }
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('./view/address'),
    meta: {
      title: '收货地址'
    }
  },
  {
    path: '/address/add',
    name: 'addressAdd',
    component: () => import('./view/address/edit'),
    meta: {
      title: '新增地址'
    }
  },
  {
    path: '/address/edit',
    name: 'addressEdit',
    component: () => import('./view/address/edit'),
    meta: {
      title: '编辑'
    }
  },
  {
    path: '/points',
    name: 'points',
    component: () => import('./view/points'),
    meta: {
      title: '积分商城'
    }
  },
  {
    path: '/points/detail',
    name: 'pointsDetail',
    component: () => import('./view/points/detail'),
    meta: {
      title: '兑换奖品'
    }
  },
  {
    path: '/points/order',
    name: 'pointsOrder',
    component: () => import('./view/points/order'),
    meta: {
      title: '兑换奖品'
    }
  },
  {
    path: '/points/address',
    name: 'pointsAddress',
    component: () => import('./view/points/address'),
    meta: {
      title: '收货地址'
    }
  },
  {
    path: '/points/success',
    name: 'pointsSuccess',
    component: () => import('./view/points/success'),
    meta: {
      title: '兑换奖品'
    }
  },
  {
    path: '/points/coupon',
    name: 'pointsCoupon',
    component: () => import('./view/points/coupon'),
    meta: {
      title: '兑换优惠券'
    }
  },
  {
    path: '/points/history',
    name: 'pointsHistory',
    component: () => import('./view/points/history'),
    meta: {
      title: '历史兑换'
    }
  },
  {
    path: '/points/sort',
    name: 'pointsSort',
    component: () => import('./view/points/sort'),
    meta: {
      title: '兑换奖品'
    }
  },
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
