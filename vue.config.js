module.exports = {
  transpileDependencies: [
    'vuetify'
  ] , 
  devServer: {
    proxy: 'https://unipass.customs.go.kr:38010/'
  }
}
