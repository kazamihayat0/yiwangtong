import Vue from 'vue';
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router/router';
import './permission'; // 权限
import './error'; // 日志
import './cache'; //页面缓存
import store from './store';
import {
  loadStyle
} from './util/util'
import * as urls from '@/config/env';
import Element from 'element-ui';
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env';
import i18n from './lang'; // Internationalization
import './styles/common.scss';
import basicBlock from './components/basic-block/main';
import basicContainer from './components/basic-container/main';
import thirdRegister from './components/third-register/main';
import avueUeditor from 'avue-plugin-ueditor';
import website from '@/config/website';
import dataV from '@jiaminghi/data-view'
import Vant from 'vant';
import 'vant/lib/index.css';
import crudCommon from '@/mixins/crud';
// 注册全局crud驱动
window.$crudCommon = crudCommon;

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts';

Vue.prototype.$echarts = echarts

// 加载Vue拓展
Vue.use(router);
Vue.use(VueAxios, axios);
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(window.AVUE, {
  size: 'small',
  tableSize: 'small',
  calcHeight: 65,
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(dataV)
Vue.use(Vant);
// 注册全局容器
Vue.component('basicContainer', basicContainer);
Vue.component('basicBlock', basicBlock);
Vue.component('thirdRegister', thirdRegister);
Vue.component('avueUeditor', avueUeditor);
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
});
// 加载website
Vue.prototype.website = website;
Vue.prototype.mapData1 = [];
Vue.prototype.mapData2 = [];
Vue.config.devtools = true
// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele));
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');