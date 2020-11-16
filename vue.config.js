const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  /* 放置生成的静态文件目录（js css img） */
  assetsDir: "static",
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://sherrykeeper.vip:8888/',
        ws: true,  //开启跨域
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'));
  }
};