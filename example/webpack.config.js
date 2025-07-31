const path = require('path');
const { WebpackLogForwardPlugin } = require('../dist/index.js');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3001,
    hot: true,
  },
  plugins: [
    new WebpackLogForwardPlugin({
      // Forward all log types for testing
      logTypes: ['log', 'info', 'warn', 'error', 'debug'],
      prefix: '[Example App]',
      includeTimestamp: true,
    }),
  ],
}; 