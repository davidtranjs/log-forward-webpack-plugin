# WebpackLogForwardPlugin Usage Guide

## Quick Start

1. **Install the plugin:**
   ```bash
   pnpm add webpack-log-forward-plugin --save-dev
   ```

2. **Add to your webpack config:**
   ```javascript
   const WebpackLogForwardPlugin = require('webpack-log-forward-plugin');

   module.exports = {
     mode: 'development',
     devServer: {
       // your dev server config
     },
     plugins: [
       new WebpackLogForwardPlugin()
     ]
   };
   ```

3. **Start your dev server:**
   ```bash
   webpack serve
   ```

4. **Open your browser and use console methods:**
   ```javascript
   console.log('Hello from browser!');
   console.error('This error will appear in terminal');
   ```

## Configuration Examples

### Forward Only Errors and Warnings

```javascript
new WebpackLogForwardPlugin({
  logTypes: ['error', 'warn'],
  prefix: '[App Errors]'
})
```

### Custom Styling

```javascript
new WebpackLogForwardPlugin({
  prefix: '🚀 [Frontend]',
  includeTimestamp: false
})
```

### Production-Safe Configuration

```javascript
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  plugins: [
    ...(isDevelopment ? [
      new WebpackLogForwardPlugin({
        logTypes: ['error', 'warn', 'info'],
        prefix: '[MyApp]'
      })
    ] : [])
  ]
};
```

### Advanced Configuration

```javascript
new WebpackLogForwardPlugin({
  // Only forward specific log types
  logTypes: ['error', 'warn', 'info'],
  
  // Custom prefix
  prefix: '[MyApp Browser]',
  
  // Include timestamps
  includeTimestamp: true,
  
  // Enable/disable plugin
  enabled: true
})
```

## What You'll See

### Terminal Output
When you use `console.log('Hello World')` in your browser, you'll see:

```
[Browser] LOG: 2024-01-15T10:30:45.123Z Hello World
```

### Different Log Types
- **LOG** (cyan): `console.log()`
- **INFO** (green): `console.info()`
- **WARN** (yellow): `console.warn()`
- **ERROR** (red): `console.error()`
- **DEBUG** (magenta): `console.debug()`

## Testing the Plugin

1. **Navigate to the example directory:**
   ```bash
   cd example
   pnpm install
   pnpm start
   ```

2. **Open your browser to `http://localhost:3000`**

3. **Click the test buttons or open browser console and run:**
   ```javascript
   console.log('Test message');
   console.error('Test error');
   console.warn('Test warning');
   ```

4. **Check your terminal for the forwarded logs**

## Troubleshooting

### Plugin Not Working?

1. **Check webpack mode:**
   ```javascript
   // Must be development mode
   mode: 'development'
   ```

2. **Check dev server configuration:**
   ```javascript
   // Must have devServer config
   devServer: {
     // your config
   }
   ```

3. **Check plugin is enabled:**
   ```javascript
   new WebpackLogForwardPlugin({
     enabled: true // default is true
   })
   ```

### No Logs Appearing?

1. **Check browser console for errors**
2. **Verify the script is injected** (check Network tab for `log-forward.js`)
3. **Check terminal for middleware errors**

### Performance Issues?

1. **Limit log types:**
   ```javascript
   logTypes: ['error', 'warn'] // Only forward errors and warnings
   ```

2. **Disable timestamps:**
   ```javascript
   includeTimestamp: false
   ```

## Integration Examples

### With Create React App

```javascript
// webpack.config.js (eject or use react-app-rewired)
const WebpackLogForwardPlugin = require('webpack-log-forward-plugin');

module.exports = function override(config, env) {
  if (env === 'development') {
    config.plugins.push(
      new WebpackLogForwardPlugin({
        logTypes: ['error', 'warn', 'info'],
        prefix: '[React App]'
      })
    );
  }
  return config;
};
```

### With Vue CLI

```javascript
// vue.config.js
const WebpackLogForwardPlugin = require('webpack-log-forward-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new WebpackLogForwardPlugin({
        logTypes: ['error', 'warn'],
        prefix: '[Vue App]'
      })
    ]
  }
};
```

### With Next.js

```javascript
// next.config.js
const WebpackLogForwardPlugin = require('webpack-log-forward-plugin');

module.exports = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.plugins.push(
        new WebpackLogForwardPlugin({
          logTypes: ['error', 'warn', 'info'],
          prefix: '[Next.js]'
        })
      );
    }
    return config;
  },
};
``` 