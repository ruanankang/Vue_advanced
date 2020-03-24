module.exports = {
  publicPath: "./",
  outputDir: "vuex-demo",
  assetsDir: "assets",
  indexPath: "index.html",
  filenameHashing: true,
  pages: undefined,
  lintOnSave: true,
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  crossorigin: undefined,
  integrity: false,

  devServer: {
    port: 8080,
    proxy: 'http://192.168.1.3:8080'
  }
}