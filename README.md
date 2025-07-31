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
pnpm add @davidtranjs/webpack-log-forward-plugin --save-dev
```

## Usage

### Basic Usage

```javascript
const WebpackLogForwardPlugin = require('@davidtranjs/webpack-log-forward-plugin');

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
const WebpackLogForwardPlugin = require('@davidtranjs/webpack-log-forward-plugin');

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

## Publishing

This package is automatically published to npm when changes are pushed to the main branch. The publishing process is handled by GitHub Actions.

### Prerequisites

1. **NPM Token**: You need to add an NPM authentication token to your GitHub repository secrets:
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add a new secret named `NPM_TOKEN`
   - Get your NPM token from [npmjs.com](https://www.npmjs.com/settings/tokens)

2. **Repository Configuration**: Update the repository URLs in `package.json`:
   ```json
   {
     "repository": {
       "type": "git",
       "url": "https://github.com/davidtranjs/webpack-log-forward-plugin.git"
     },
     "bugs": {
       "url": "https://github.com/davidtranjs/webpack-log-forward-plugin/issues"
     },
     "homepage": "https://github.com/davidtranjs/webpack-log-forward-plugin#readme"
   }
   ```

### Publishing Process

1. **Update Version**: Update the version in `package.json`
2. **Push to Main**: Push your changes to the main branch
3. **Automatic Publishing**: The GitHub Action will automatically:
   - Build the TypeScript code
   - Publish to npm

### Manual Publishing

If you need to publish manually:

```bash
# Build the package
pnpm run build

# Publish to npm
pnpm publish
``` 