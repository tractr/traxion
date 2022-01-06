// @filename ./apps/myapp/webpack.config.cjs
const nodeExternals = require('webpack-node-externals');
module.exports = (config, context) => {
  return {
    ...config,
    externalsPresets: {
      node: true
    },
    output: {
      ...config.output,
      module: true,
      libraryTarget: 'module',
      chunkFormat: 'module',
      library: {
        type: 'module'
      },
      environment: {
        module: true
      }
    },
    experiments: {
      outputModule: true,
    },
    externals: nodeExternals({
      importType: 'module'
    })
  }
}