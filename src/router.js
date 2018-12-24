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
    component: resolve => require(['./page/home/index'], resolve),
    // component: () => import('./page/home/index'),
    meta: {
      title: '米多多'
    },
    redirect: {
      name: 'index'
    }
  },
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['./page/home/index'], resolve),
    // component: () => import('./page/home/index'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/home/list',
    name: 'homeList',
    component: resolve => require(['./page/home/list'], resolve),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/sort',
    name: 'sort',
    component: resolve => require(['./page/sort'], resolve),
    // component: () => import('./page/sort'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: resolve => require(['./page/cart'], resolve),
    // component: () => import('./page/cart'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/sort/second',
    name: 'sortSecond',
    component: resolve => require(['./page/sort/second'], resolve),
    // component: () => import('./page/sort/second'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/sort/detail',
    name: 'sortDetail',
    component: resolve => require(['./page/sort/detail'], resolve),
    // component: () => import('./page/sort/detail'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/sort/comment',
    name: 'sortComment',
    component: resolve => require(['./page/sort/comment'], resolve),
    // component: () => import('./page/sort/comment'),
    meta: {
      title: '全部评价'
    }
  },
  {
    path: '/store',
    name: 'sortStore',
    component: resolve => require(['./page/store/store'], resolve),
    // component: () => import('./page/sort/store'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/store/store',
    name: 'sortStoreIndex',
    component: resolve => require(['./page/store/store'], resolve),
    // component: () => import('./page/sort/store'),
    meta: {
      title: '米多多'
    },
    redirect: {
      name: 'sortStore'
    }
  },
  {
    path: '/order/detail',
    name: 'orderDetail',
    component: resolve => require(['./page/order/detail'], resolve),
    // component: () => import('./page/order/detail'),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/order/list',
    name: 'orderList',
    component: resolve => require(['./page/order/list'], resolve),
    // component: () => import('./page/order/list'),
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/order/info',
    name: 'orderInfo',
    component: resolve => require(['./page/order/info'], resolve),
    // component: () => import('./page/order/info'),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: resolve => require(['./page/mine'], resolve),
    // component: () => import('./page/mine'),
    meta: {
      title: '我'
    }
  },
  {
    path: '/address',
    name: 'address',
    component: resolve => require(['./page/address'], resolve),
    // component: () => import('./page/address'),
    meta: {
      title: '收货地址'
    }
  },
  {
    path: '/address/add',
    name: 'addressAdd',
    component: resolve => require(['./page/address/edit'], resolve),
    // component: () => import('./page/address/edit'),
    meta: {
      title: '添加收货地址'
    }
  },
  {
    path: '/address/edit',
    name: 'addressEdit',
    component: resolve => require(['./page/address/edit'], resolve),
    // component: () => import('./page/address/edit'),
    meta: {
      title: '编辑收货地址'
    }
  },
  {
    path: '/return',
    name: 'return',
    component: resolve => require(['./page/return'], resolve),
    // component: () => import('./page/return'),
    meta: {
      title: '退换'
    }
  },
  {
    path: '/return/refund',
    name: 'refund',
    component: resolve => require(['./page/return/refund'], resolve),
    // component: () => import('./page/return/refund'),
    meta: {
      title: '申请退款'
    }
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: resolve => require(['./page/coupon/index.vue'], resolve),
    // component: () => import('./page/coupon/index.vue'),
    meta: {
      title: '我的优惠券'
    }
  },
  {
    path: '/coupon/center',
    name: 'couponCenter',
    component: resolve => require(['./page/coupon/center'], resolve),
    // component: () => import('./page/coupon/center'),
    meta: {
      title: '领券中心'
    }
  },
  {
    path: '/collect',
    name: 'collect',
    component: resolve => require(['./page/collect'], resolve),
    // component: () => import('./page/collect'),
    meta: {
      title: '商品收藏'
    }
  },
  {
    path: '/collect/store',
    name: 'collectStore',
    component: resolve => require(['./page/collect/store'], resolve),
    // component: () => import('./page/collect/store'),
    meta: {
      title: '商品收藏'
    }
  },
  {
    path: '/history',
    name: 'history',
    component: resolve => require(['./page/history'], resolve),
    // component: () => import('./page/history'),
    meta: {
      title: '历史浏览'
    }
  },
  {
    path: '/afterSale',
    name: 'afterSale',
    component: resolve => require(['./page/afterSale'], resolve),
    // component: () => import('./page/afterSale'),
    meta: {
      title: '退款 / 售后'
    }
  },
  {
    path: '/afterSale/detail',
    name: 'afterSaleDetail',
    component: resolve => require(['./page/afterSale/detail'], resolve),
    // component: () => import('./page/afterSale/detail'),
    meta: {
      title: '退款 / 售后'
    }
  },
  {
    path: '/comments',
    name: 'comments',
    component: resolve => require(['./page/comments/index.vue'], resolve),
    // component: () => import('./page/comments/index.vue'),
    meta: {
      title: '我的评价'
    }
  },
  {
    path: '/bargain',
    name: 'bargain',
    component: resolve => require(['./page/bargain/index.vue'], resolve),
    // component: () => import('./page/bargain/index.vue'),
    meta: {
      title: '砍价免费拿'
    }
  },
  {
    path: '/treasure',
    name: 'treasure',
    component: resolve => require(['./page/treasure/index.vue'], resolve),
    // component: () => import('./page/treasure/index.vue'),
    meta: {
      title: '夺宝'
    }
  },
  {
    path: '/redPacket',
    name: 'redPacket',
    component: resolve => require(['./page/redPacket/index.vue'], resolve),
    // component: () => import('./page/redPacket/index.vue'),
    meta: {
      title: '红包'
    }
  },
  {
    path: '/oreYard',
    name: 'oreYard',
    component: resolve => require(['./page/oreYard/index.vue'], resolve),
    // component: () => import('./page/oreYard/index.vue'),
    meta: {
      title: '矿场'
    }
  },
  {
    path: '/customerService',
    name: 'customerService',
    component: resolve => require(['./page/customerService/index.vue'], resolve),
    // component: () => import('./page/customerService/index.vue'),
    meta: {
      title: '客服'
    }
  },
  {
    path: '/help',
    name: 'help',
    component: resolve => require(['./page/help/index.vue'], resolve),
    // component: () => import('./page/help/index.vue'),
    meta: {
      title: '帮助'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['./page/login/login.vue'], resolve),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/sign',
    name: 'sign',
    component: resolve => require(['./page/sign/sign.vue'], resolve),
    meta: {
      title: '注册'
    }
  }
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
