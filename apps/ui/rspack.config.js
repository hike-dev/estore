const { composePlugins, withNx, withReact } = require('@nx/rspack');

module.exports = composePlugins(withNx(), withReact(), config => {
  config.devServer.historyApiFallback = true;
  return config;
});
