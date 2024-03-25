const path = require('path');

module.exports = (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    // For that beautiful UI:
    '@shared': path.resolve(__dirname, 'shared/src'),
    // Continue as your project grows...
  };
  return config;
};