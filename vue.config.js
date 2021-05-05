module.exports = {
  outputDir:  __dirname + "/../public",
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
