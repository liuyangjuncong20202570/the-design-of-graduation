import { createRouter, createWebHistory } from 'vue-router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import useMain from '@/stores/modules/mainData';
import { storeToRefs } from 'pinia';
import piniaIndex from '../stores/piniaIndex';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home/home.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/News/news.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('@/views/Product/product.vue')
    },
    {
      path: '/news/:id',
      name: 'newsSingle',
      component: () => import('@/views/News/NewsCpns/NewsSingle.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/Login/Login.vue'),
      children: [
        {
          path: 'login',
          component: () => import('@/views/Login/LoginCpns/Loginpart.vue')
        },
        {
          path: 'sign',
          component: () => import('@/views/Login/LoginCpns/Signuppart.vue')
        }
      ]
    },
    {
      path: '/gestmenu',
      name: 'gestmenu',
      component: () => import('@/views/Menu/Menu.vue'),
      children: [
        {
          path: 'main',
          component: () => import('@/views/Menu/MenuCpns/MenuItem.vue')
        },
        {
          path: 'order',
          component: () => import('@/views/Order/Order.vue')
        }
      ]
    },
    {
      path: '/products/:id',
      name: 'productsSingle',
      component: () => import('@/views/Product/ProductCpns/SingleProducts.vue')
    }
  ]
});

const mainStore = useMain(piniaIndex);
const { isAuthorized } = storeToRefs(mainStore);

// router.beforeEach((to, from, next) => {
//   nProgress.start();
//   next();
// });

router.beforeEach((to, from, next) => {
  nProgress.start();
  // next();
  // console.log(to.fullPath);
  const authorization = localStorage.getItem('Token');
  if (authorization && to.fullPath === '/main/login') {
    next({ path: 'gestmenu/main' });
  } else if (!authorization && to.fullPath !== '/main/login') {
    // 如果用户未登录且尝试访问非登录页面，则导航到登录页面
    //TODO:如果跳转路径为访问具体商品，需要进行跳转至登陆页面
    next();
    // next({ fullPath: '/main/login' });
  } else if (!authorization && to.fullPath === 'gestmenu/main') {
    next({ path: 'main/login' });
  } else {
    next();
  }
  // if (to.name === 'main/login') {
  //   next();
  // } else {
  //   // 如果本地存储中没有token说明从未登录过
  //   // 需跳转至login页面
  //   // 如果授权，放行
  //   // 未授权， 重定向至login
  //   // if (!localStorage.getItem('Token')) {
  //   //   next({
  //   //     path: 'main/login'
  //   //   });
  //   // } else {
  //   //   // 此处需判断是否此次为第一次进行鉴权放行
  //   //   // 是： 则设定子路由（变量存储至pinia中）
  //   //   // 否： 则直接放行以免递归报错
  //   //   if (!isAuthorized.value) {
  //   //     // configRouter();
  //   //     next({
  //   //       path: to.fullPath
  //   //     });
  //   //   } else {
  //   //     next();
  //   //   }
  //   // }
  // }
});

router.afterEach((to, from, next) => {
  nProgress.done();
});

export default router;
