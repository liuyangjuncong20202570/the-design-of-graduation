import { createRouter, createWebHistory } from 'vue-router';
import ConfigRoutes from './config';
import useMain from '../stores/modules/mainData.js';
import piniaIndex from '../stores/piniaIndex';
import { storeToRefs } from 'pinia';
import useUser from '@/stores/modules/useUser';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: () => import('@/views/Login/Login.vue')
    },
    // MainBox嵌套路由后面动态添加
    {
      path: '/MainBox',
      name: 'MainBox',
      component: () => import('@/views/MainBox/MainBox.vue')
    }
  ]
});

// 获得全局变量
const mainStore = useMain(piniaIndex);
const UserStore = useUser(piniaIndex);
const { isAuthorized } = storeToRefs(mainStore);
const { userInfo } = storeToRefs(UserStore);

const configRouter = () => {
  ConfigRoutes.map(item => {
    checkPermission(item) && router.addRoute('MainBox', item);
  });
  // 更改isAuthorized的权限
  isAuthorized.value = true;
};

const checkPermission = async item => {
  if (item.requireAdmin) {
    return userInfo.role === 1;
  }
  return true;
};

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    next();
  } else {
    // 如果本地存储中没有token说明从未登录过
    // 需跳转至login页面
    // 如果授权，放行
    // 未授权， 重定向至login
    if (!localStorage.getItem('Token')) {
      next({
        path: '/Login'
      });
    } else {
      // 此处需判断是否此次为第一次进行鉴权放行
      // 是： 则设定子路由（变量存储至pinia中）
      // 否： 则直接放行以免递归报错
      if (!isAuthorized.value) {
        configRouter();
        next({
          path: to.fullPath
        });
      } else {
        next();
      }
    }
  }
});

export default router;
