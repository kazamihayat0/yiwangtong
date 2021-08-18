import Layout from '@/page/index/'

export default [{
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [{
      path: 'index',
      name: '首页',
      meta: {
        i18n: 'dashboard'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/wel/index')
    }, {
      path: 'dashboard',
      name: '控制台',
      meta: {
        i18n: 'dashboard',
        menu: false,
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/wel/dashboard')
    }]
  }, {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    children: [{
      path: 'index',
      name: '测试页',
      meta: {
        i18n: 'test'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/util/test')
    }]
  }, {
    path: '/dict-horizontal',
    component: Layout,
    redirect: '/dict-horizontal/index',
    children: [{
      path: 'index',
      name: '字典管理',
      meta: {
        i18n: 'dict'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/util/demo/dict-horizontal')
    }]
  }, {
    path: '/dict-vertical',
    component: Layout,
    redirect: '/dict-vertical/index',
    children: [{
      path: 'index',
      name: '字典管理',
      meta: {
        i18n: 'dict'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/util/demo/dict-vertical')
    }]
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [{
      path: 'index',
      name: '个人信息',
      meta: {
        i18n: 'info'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/system/userinfo')
    }]
  },
  {
    path: '/work/process/leave',
    component: Layout,
    redirect: '/work/process/leave/form',
    children: [{
      path: 'form/:processDefinitionId',
      name: '请假流程',
      meta: {
        i18n: 'work'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/work/process/leave/form')
    }, {
      path: 'handle/:taskId/:processInstanceId/:businessId',
      name: '处理请假流程',
      meta: {
        i18n: 'work'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/work/process/leave/handle')
    }, {
      path: 'detail/:processInstanceId/:businessId',
      name: '请假流程详情',
      meta: {
        i18n: 'work'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/work/process/leave/detail')
    }]
  },
  {
    path: '/core',
    component: Layout,
    children: [{
        path: 'dailyOffice/meeting/addMeeting',
        name: '新增会议',
        meta: {
          keepAlive: false,
        },
        component: () =>
          import('@/views/core/dailyOffice/meeting/addMeeting')
      }, {
        path: 'dailyOffice/meeting/editMeeting',
        name: '上传会议纪要',
        meta: {
          keepAlive: false,
        },
        component: () =>
          import('@/views/core/dailyOffice/meeting/addMeeting')
      },
      {
        path: 'dailyOffice/meeting/checkMeeting',
        name: '会议纪要确认',
        meta: {
          keepAlive: false,
        },
        component: () =>
          import('@/views/core/dailyOffice/meeting/addMeeting')
      },
    ]
  },
  {
    path: '/village',
    component: Layout,
    children: [{
      path: 'addUser',
      name: '新增村干部信息',
      component: () =>
        import('@/views/villagecadre/addUserInfo')
    }, {
      path: 'editUser',
      name: '编辑村干部信息',
      component: () =>
        import('@/views/villagecadre/addUserInfo')
    }, {
      path: 'user',
      name: '查看全部档案',
      component: () =>
        import('@/views/villagecadre/addUserInfo')
    },{
      path: 'addManager',
      name: '新增管理员',
      component: () =>
        import('@/views/villagecadre/addManager')
    },]
  },
  {
    path: '/cdreM',
    component: Layout,
    children: [{
      path: 'addUnqCadre',
      name: '新增不合格村干部',
      component: () =>
        import('@/views/core/cdreManagement/csdre/addUnqualifiedCadre')
    }, {
      path: 'editUnqCadre',
      name: '编辑不合格村干部',
      component: () =>
        import('@/views/core/cdreManagement/csdre/addUnqualifiedCadre')
    },
      {
        path: 'unqCadre',
        name: '查看不合格村干部信息',
        component: () =>
          import('@/views/core/cdreManagement/csdre/lookUnqualifiedCadre')
      },
    ]
  },
  {
    path: '/five',
    component: Layout,
    children: [{
        path: 'addYear',
        name: '新增五年规划',
        component: () =>
          import('@/views/core/villageManagement/fiveYearPlan/addFiveYearPlan')
      }, {
        path: 'editYear',
        name: '编辑五年规划',
        component: () =>
          import('@/views/core/villageManagement/fiveYearPlan/addFiveYearPlan')
      },
      , {
        path: 'lookYear',
        name: '查看五年规划',
        component: () =>
          import('@/views/core/villageManagement/fiveYearPlan/lookFiveYearPlan')
      },
      {
        path: 'statReport',
        name: '统计报表',
        component: () =>
          import('@/views/core/villageManagement/fiveYearPlan/statisticalReport')
      }
    ]
  },
  {
    path: '/performance',
    component: Layout,
    children: [{
      path: 'addScore',
      name: '新增上级研判',
      component: () =>
        import('@/views/core/villageManagement/performanceScore/addPerformanceScore')
    }, {
      path: 'editScore',
      name: '编辑上级研判',
      component: () =>
        import('@/views/core/villageManagement/performanceScore/addPerformanceScore')
    },{
      path: 'addJudge',
      name: '村书记评价',
      component: () =>
        import('@/views/core/villageManagement/performanceScore/addJudge')
    }, {
        path: 'addPartJudge',
        name: '党委评价',
        component: () =>
          import('@/views/core/villageManagement/performanceScore/addPartJudge')
      },{
         path:'judgeLook',
         name: '查看',
        component: () =>
        import('@/views/core/villageManagement/performanceScore/judgeLook')
    },{
      path: 'addVillJudge',
      name: '村级研判',
      component: () =>
        import('@/views/core/villageManagement/performanceScore/addVillJudge')
    },{
      path: 'villageJudgeLook',
      name: '查看',
      component: () =>
        import('@/views/core/villageManagement/performanceScore/villageJudgeLook')
    }
    ]
  },
  {
    path: '/village',
    component: Layout,
    children: [{
      path: 'addVillage',
      name: '新增村级研判',
      component: () =>
        import('@/views/core/villageManagement/villageJudge/addVillageJudge')
    }, {
      path: 'editVillage',
      name: '编辑村级研判',
      component: () =>
        import('@/views/core/villageManagement/villageJudge/addVillageJudge')
    }, {
      path: 'addVillageInfo',
      name: '新增村社基本信息',
      component: () =>
        import('@/views/core/villageInfo/addVillageInfo')
    }
    ]
  },
  {
    path: '/Comprehensive',
    component: Layout,
    children: [{
        path: 'addCompr',
        name: '新增综合榜',
        component: () =>
          import('@/views/core/villageManagement/achievementsList/addComprehensiveList')
      },
      {
        path: 'editCompr',
        name: '编辑综合榜',
        component: () =>
          import('@/views/core/villageManagement/achievementsList/addComprehensiveList')
      }
    ]
  },
  {
    path: '/single',
    component: Layout,
    children: [{
        path: 'addSingle',
        name: '新增单项榜',
        component: () =>
          import('@/views/core/villageManagement/achievementsList/addSingleList')
      },
      {
        path: 'editSingle',
        name: '编辑单项榜',
        component: () =>
          import('@/views/core/villageManagement/achievementsList/addSingleList')
      }
    ]
  },
  {
    path: '/part',
    component: Layout,
    children: [{
      path: 'addMeeting',
      name: '新增党组织会议',
      component: () =>
        import('@/views/core/dailyOffice/partyMeeting/addPartMeeting')
    }]
  },
  {
    path: '/warn',
    component: Layout,
    children: [{
      path: 'warning',
      name: '预警消息',
      component: () =>
        import('@/views/core/warn/warning')
    }]
  },
]
