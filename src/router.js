import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  // {
  //   path: '*',
  //   redirect: '/shop'
  // },
  {
    path: '/',
    name: 'index',
    component: () => import('./page/home/index'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('./page/home/index'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/sort',
    name: 'sort',
    component: () => import('./page/sort'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('./page/cart'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/sort/second',
    name: 'sortSecond',
    component: () => import('./page/sort/second'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/sort/detail',
    name: 'sortDetail',
    component: () => import('./page/sort/detail'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/sort/comment',
    name: 'sortComment',
    component: () => import('./page/sort/comment'),
    meta: {
      title: '全部评价'
    }
  },
  {
    path: '/sort/store',
    name: 'sortStore',
    component: () => import('./page/sort/store'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/order/detail',
    name: 'orderDetail',
    component: () => import('./page/order/detail'),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/order/list',
    name: 'orderList',
    component: () => import('./page/order/list'),
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/order/info',
    name: 'orderInfo',
    component: () => import('./page/order/info'),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('./page/mine'),
    meta: {
      title: '我'
    }
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('./page/address'),
    meta: {
      title: '收货地址'
    }
  },
  {
    path: '/address/add',
    name: 'addressAdd',
    component: () => import('./page/address/edit'),
    meta: {
      title: '添加收货地址'
    }
  },
  {
    path: '/address/edit',
    name: 'addressEdit',
    component: () => import('./page/address/edit'),
    meta: {
      title: '编辑收货地址'
    }
  },
  {
    path: '/return',
    name: 'return',
    component: () => import('./page/return'),
    meta: {
      title: '退换'
    }
  },
  {
    path: '/return/refund',
    name: 'refund',
    component: () => import('./page/return/refund'),
    meta: {
      title: '申请退款'
    }
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: () => import('./page/coupon/index.vue'),
    meta: {
      title: '我的优惠券'
    }
  },
  {
    path: '/coupon/center',
    name: 'couponCenter',
    component: () => import('./page/coupon/center'),
    meta: {
      title: '领券中心'
    }
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import('./page/collect'),
    meta: {
      title: '商品收藏'
    }
  },
  {
    path: '/collect/store',
    name: 'collectStore',
    component: () => import('./page/collect/store'),
    meta: {
      title: '商品收藏'
    }
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('./page/history'),
    meta: {
      title: '历史浏览'
    }
  },
  {
    path: '/afterSale',
    name: 'afterSale',
    component: () => import('./page/afterSale'),
    meta: {
      title: '退款 / 售后'
    }
  },
  {
    path: '/afterSale/detail',
    name: 'afterSaleDetail',
    component: () => import('./page/afterSale/detail'),
    meta: {
      title: '退款 / 售后'
    }
  },
  {
    path: '/comments',
    name: 'comments',
    component: () => import('./page/comments/index.vue'),
    meta: {
      title: '我的评价'
    }
  },
  {
    path: '/bargain',
    name: 'bargain',
    component: () => import('./page/bargain/index.vue'),
    meta: {
      title: '砍价免费拿'
    }
  },
  {
    path: '/treasure',
    name: 'treasure',
    component: () => import('./page/treasure/index.vue'),
    meta: {
      title: '夺宝'
    }
  },
  {
    path: '/redPacket',
    name: 'redPacket',
    component: () => import('./page/redPacket/index.vue'),
    meta: {
      title: '红包'
    }
  },
  {
    path: '/oreYard',
    name: 'oreYard',
    component: () => import('./page/oreYard/index.vue'),
    meta: {
      title: '矿场'
    }
  },
  {
    path: '/customerService',
    name: 'customerService',
    component: () => import('./page/customerService/index.vue'),
    meta: {
      title: '客服'
    }
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('./page/help/index.vue'),
    meta: {
      title: '帮助'
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
