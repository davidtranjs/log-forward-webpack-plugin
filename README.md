# WebpackLogForwardPlugin

A webpack plugin that forwards browser console logs to the terminal during development. This plugin only works with webpack dev server and helps developers see browser console output directly in their terminal.

## Features

- ✅ Only works with webpack dev server (development mode)
- ✅ Forwards all types of console logs (log, info, warn, error, debug)
- ✅ Configurable log types to forward
- ✅ Colored output in terminal for different log types
- ✅ Timestamp support
- ✅ Custom prefix support
- ✅ Handles unhandled errors and promise rejections
- ✅ Non-intrusive - doesn't break existing console functionality

## Installation

```bash
pnpm add webpack-log-forward-plugin --save-dev
```

## Usage

### Basic Usage

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

### Advanced Usage with Configuration

```javascript
const WebpackLogForwardPlugin = require('webpack-log-forward-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    // your dev server config
  },
  plugins: [
    new WebpackLogForwardPlugin({
      // Only forward specific log types
      logTypes: ['error', 'warn'],
      
      // Custom prefix for forwarded logs
      prefix: '[MyApp]',
      
      // Include timestamps (default: true)
      includeTimestamp: true,
      
      // Enable/disable the plugin (default: true)
      enabled: true
    })
  ]
};
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `logTypes` | `string[]` | `['log', 'info', 'warn', 'error', 'debug']` | Array of log types to forward |
| `prefix` | `string` | `'[Browser]'` | Custom prefix for forwarded logs |
| `includeTimestamp` | `boolean` | `true` | Whether to include timestamp in forwarded logs |
| `enabled` | `boolean` | `true` | Whether to enable the plugin |

## Log Types

The plugin supports forwarding these console log types:

- `log` - console.log()
- `info` - console.info()
- `warn` - console.warn()
- `error` - console.error()
- `debug` - console.debug()

## Examples

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

### Disable Plugin

```javascript
new WebpackLogForwardPlugin({
  enabled: false
})
```

## How It Works

1. **Development Mode Only**: The plugin only activates when webpack is in development mode
2. **Dev Server Required**: Only works when webpack dev server is configured
3. **Script Injection**: Injects a JavaScript file that overrides console methods
4. **Middleware Setup**: Creates a middleware endpoint to receive log data from browser
5. **Terminal Output**: Forwards received logs to terminal with colored output

## Browser Console Output

When you use `console.log('Hello World')` in your browser, you'll see:

```
[Browser] LOG: 2024-01-15T10:30:45.123Z Hello World
```

## Error Handling

The plugin also captures:
- Unhandled JavaScript errors
- Unhandled promise rejections
- Runtime errors

## Requirements

- Webpack 5.x
- Webpack Dev Server
- Development mode enabled

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 