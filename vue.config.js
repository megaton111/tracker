module.exports = {
  runtimeCompiler: true ,
  transpileDependencies: [
    'vuetify'
  ] , 
  devServer: {
    proxy: {
      '/ext': { 
        target: 'https://unipass.customs.go.kr:38010/',
        changeOrigin: true,
      },
      '/site': {
        target: 'https://www.koreaexim.go.kr/',
        changeOrigin: true,
        compress: true,
        disableHostCheck: true
      },
      '/FER1101M.web': {
        target: 'http://fx.kebhana.com/',
        changeOrigin: true,
        compress: true,
        disableHostCheck: true
      },
      '/v1': {
        target: 'https://openapi.naver.com/',
        changeOrigin: true,
        compress: true,
        disableHostCheck: true
      },
      '/keywordstool': {
        target: 'https://api.naver.com/',
        changeOrigin: true,
        compress: true,
        disableHostCheck: true
      },
    },
  } ,
}
