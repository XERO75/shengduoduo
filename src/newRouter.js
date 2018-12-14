import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  // {
  //   path: '*',
  //   redirect: '/shop'
  // },
  {
    path: '/index',
    name: 'index',
    component: () => import('./page/home/index'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('./page/home/home'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/home/sort',
    name: 'homeSort',
    component: () => import('./page/home/sort'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/home/second',
    name: 'homeSecond',
    component: () => import('./page/home/second'),
    meta: {
      title: '米多多'
    }
  },
  {
    path: '/home/detail',
    name: 'homecomment',
    component: () => import('./page/home/detail'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/home/comment',
    name: 'homeComment',
    component: () => import('./page/home/comment'),
    meta: {
      title: '全部评价'
    }
  },
  {
    path: '/home/store',
    name: 'homeStore',
    component: () => import('./page/home/store'),
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
