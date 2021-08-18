const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  //路径前缀
  publicPath: "/",
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
      'BMap': 'BMap',
      'BMAP_STATUS_SUCCESS': 'BMAP_STATUS_SUCCESS'
    });
    const entry = config.entry('app');
    entry.add('babel-polyfill').end();
    entry.add('classlist-polyfill').end();
    entry.add('@/mock').end();

    config.module
      .rule('svg')
      .exclude.add(resolve('src/styles/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/styles/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  css: {
    extract: {
      ignoreOrder: true
    }
  },
  //开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    port: 1888,
    proxy: {
      '/api': {
        //本地服务接口地址
        //  target: 'http://localhost:8021',
        target: 'http://116.62.8.251:8021',
        // target: 'http://113.215.61.59:8021',
        // target: 'http://30.40.15.33:8021',
        // target: 'http://30.40.58.127:8021',
        // bypass: function (req, res, proxyOptions) {
        //   console.log(req);
        //   console.log(res);
        //   console.log(proxyOptions);
        // },
        //远程演示服务地址,可用于直接启动项目
        // target: 'https://saber.bladex.vip/api',
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
  }
};
