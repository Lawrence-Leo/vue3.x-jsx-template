const { defineConfig } = require('@vue/cli-service');
const apiMocker = require('mocker-api');
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    onBeforeSetupMiddleware({ app }) {
      apiMocker(app, path.resolve('./mock'));
    },
  },
});
