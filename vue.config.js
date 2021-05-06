module.exports = {
  outputDir:  __dirname + "/html",
  publicPath: '/',
  indexPath: 'index.html',
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './server'
    }
  },

  transpileDependencies: [
    'vuetify'
  ]
}
