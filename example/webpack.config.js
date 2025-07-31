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
      // Example: Only forward errors and warnings
      logTypes: ['error', 'warn', 'info'],
      prefix: '[Example App]',
      includeTimestamp: true,
    }),
  ],
}; 