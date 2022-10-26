const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

// To tell webpack to get only the modules from our node_modules and not the
// the @nrwl/web/node_modules we need to force it here
module.exports = (config) => {
  nrwlConfig(config);

  // eslint-disable-next-line no-param-reassign
  config.resolve.modules = ['node_modules'];

  return config;
};
