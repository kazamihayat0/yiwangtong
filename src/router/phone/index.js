import Layout from '@/page/index/layout'
import addmeeting from '@/views/phone/meeting/addMeeting'
import peopleList from '@/views/phone/meeting/peopleList'

export default [{
    path: '/phone',
    component: Layout,
    children: [{
        path: 'addmeeting',
        name: 'addmeeting',
        component: addmeeting,
        // component: () => import( /* webpackChunkName: "phone" */ '@/views/phone/meeting/addMeeting'),
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
        }
      }, {
        path: 'peopleList',
        name: 'peopleList',
        component: peopleList,
        // component: () => import( /* webpackChunkName: "phone" */ '@/views/phone/meeting/peopleList'),
        meta: {
          isTab: false,
        }
      },
      {
        path: 'meetingList',
        name: 'meetingList',
        component: () => import( /* webpackChunkName: "phone" */ '@/views/phone/meeting/meetingList'),
        meta: {
          isTab: false,
        }
      },
      {
        path: 'attendance',
        name: 'attendance',
        component: () => import( /* webpackChunkName: "phone" */ '@/views/phone/meeting/meetingSign'),
        meta: {
          isTab: false,
        }
      },
      {
        path: 'meetingDetail',
        name: 'meetingDetail',
        component: () => import( /* webpackChunkName: "phone" */ '@/views/phone/meeting/meetingDetail'),
        meta: {
          isTab: false,
        }
      }, {
        path: 'checkMeeting',
        name: 'checkMeeting',
        component: () => import( /* webpackChunkName: "phone" */ '@/views/phone/meeting/meetingDetail'),
        meta: {
          isTab: false,
        }
      }, {
        path: 'baiduMap',
        name: 'baiduMap',
        component: () => import( /* webpackChunkName: "phone" */ '@/views/phone/meeting/baiduMap'),
        meta: {
          isTab: false,
        }
      }, {
        path: 'cadrePerform',
        name: 'cadrePerform',
        component: () => import( /* webpackChunkName: "phone" */ '@/views/phone/meeting/cadrePerform'),
        meta: {
          isTab: false,
        }
      }, {
        path: 'villageOperation',
        name: 'villageOperation',
        component: () => import( /* webpackChunkName: "phone" */ '@/views/phone/meeting/villageOperation'),
        meta: {
          isTab: false,
        }
      }, {
        path: 'satisfaction',
        name: 'satisfaction',
        component: () => import( /* webpackChunkName: "phone" */ '@/views/phone/meeting/satisfactionList'),
        meta: {
          isTab: false,
        }
      },
      {
        path: 'addSatisfaction',
        name: 'addSatisfaction',
        component: () => import( /* webpackChunkName: "phone" */ '@/views/phone/meeting/addSatisfaction'),
        meta: {
          isTab: false,
        }
      },
      {
        path: 'choose',
        name: 'choose',
        component: () => import( /* webpackChunkName: "phone" */ '@/views/phone/meeting/choose'),
        meta: {
          isTab: false,
        }
      },
      {
        path: 'satisfactionDetail',
        name: 'satisfactionDetail',
        component: () => import( /* webpackChunkName: "phone" */ '@/views/phone/meeting/satisfactionDetail'),
        meta: {
          isTab: false,
        }
      }
    ]
  },
  {
    path: '/meeting',
    redirect: "/phone/meetingList"
  },
  {
    path: '/villageOperation',
    redirect: "/phone/villageOperation"
  },
  {
    path: '/cadrePerform',
    redirect: "/phone/cadrePerform"
  },
  {
    path: '/attendance',
    redirect: "/phone/attendance"
  },
  {
    path: '/satisfaction',
    redirect: "/phone/satisfaction"
  },
]
