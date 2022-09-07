module.exports = {
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
      },
    },
  }
}
