const path = require('path')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: './build',
  publicPath: './',
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('views', '@/views')
      .set('components', '@/components')
  }
})
