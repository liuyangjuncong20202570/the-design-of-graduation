const ConfigRoutes = [
  {
    path: '/index',
    component: () => import('@/components/Home/Home.vue')
  },
  {
    path: '/center',
    component: () => import('@/components/Center/Center.vue')
  },
  {
    path: '/news-manage/newslist',
    component: () => import('@/components/NewsManage/NewsList/NewsList.vue')
  },
  {
    path: '/news-manage/newsadd',
    component: () => import('@/components/NewsManage/NewsAdd/NewsAdd.vue')
  },
  {
    path: '/news-manage/newsedit/:id',
    component: () => import('@/components/NewsManage/NewsEdit/NewsEdit.vue')
  },
  {
    path: '/product-manage/productlist',
    component: () => import('@/components/ProductManage/ProductList.vue')
  },
  {
    path: '/product-manage/productadd',
    component: () => import('@/components/ProductManage/ProductAdd.vue')
  },
  {
    path: '/product-manage/productedit/:id',
    component: () => import('@/components/ProductManage/ProductManagecpns/ProductEditTemplate.vue')
  },
  {
    path: '/user-manage/useradd',
    component: () => import('@/components/UserManage/UserAdd/UserAdd.vue'),
    requireAdmin: true
  },
  {
    path: '/user-manage/userlist',
    component: () => import('@/components/UserManage/UserList/UserList.vue'),
    requireAdmin: true
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/components/NotFound/NotFound.vue')
  }
];

export default ConfigRoutes;
