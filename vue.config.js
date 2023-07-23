const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,  //关闭语法检查
})
module.exports = {
  lintOnSave:false,  //关闭语法检查
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/api',
        changeOrigin: true,
        // withCredentials: true,
        pathRewrite: {
            '^/api': ''
        },
        ws: false,
      },
    }
  }
}