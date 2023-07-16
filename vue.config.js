const path = require('path');
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // outputDir: path.resolve(__dirname,'../back-end/public'),
  outputDir: path.resolve(__dirname,'./dist'),
  devServer: {
    port: 8081,
  },

  transpileDependencies: true,
  lintOnSave: false,

  chainWebpack: (config) => {
    config.performance.maxEntrypointSize(4000000).maxAssetSize(4000000);
  },
});
