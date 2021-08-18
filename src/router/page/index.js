import Layout from '@/page/index/'

export default [{
    path: '/login',
    name: '登录页',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/login/index'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/lock',
    name: '锁屏页',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/lock/index'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/404',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/components/error-page/404'),
    name: '404',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }

  },
  {
    path: '/101',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/components/error-page/101'),
    name: '101',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }

  },
  {
    path: '/403',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/components/error-page/403'),
    name: '403',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/500',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/components/error-page/500'),
    name: '500',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/bigIndex',
    name: '主页',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/core/homePage/index'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: true
    }
  },
  {
    path: '/cityIndex',
    name: '市主页',

    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/core/homePage/cityIndex'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: true
    }
  },
  {
    path: '/villageIndex',
    name: '村主页',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/core/homePage/villageIndex'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: true
    }
  },
  {
    path: '/city',
    name: '主页',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/core/homePage/cityIndex1'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },

  {
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    children: [{
      path: ":routerPath",
      name: 'iframe',
      component: () =>
        import( /* webpackChunkName: "page" */ '@/components/iframe/main'),
      props: true
    }]

  },
  {
    path: '/',
    name: '主页',
    redirect: '/bigIndex',
  },
  {
    path: '*',
    redirect: '/404'
  }
]
