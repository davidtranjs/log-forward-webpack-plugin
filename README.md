# Webpack Log Forward Plugin

A webpack plugin that forwards browser console logs to terminal during development.

## Features

- Forwards browser console logs (log, info, warn, error, debug) to terminal
- Configurable log types, prefix, and timestamp options
- Works with webpack-dev-server
- Non-intrusive - preserves original console behavior
- TypeScript support

## Installation

```bash
npm install @davidtranjs/webpack-log-forward-plugin
```

## Usage

```javascript
const { WebpackLogForwardPlugin } = require('@davidtranjs/webpack-log-forward-plugin');

module.exports = {
  // ... other webpack config
  plugins: [
    new WebpackLogForwardPlugin({
      logTypes: ['log', 'info', 'warn', 'error', 'debug'], // optional
      prefix: '[Browser]', // optional
      includeTimestamp: true, // optional
      enabled: true // optional
    })
  ]
};
```

## Development

This project uses Biome.js for linting and formatting. To work on this project:

### Prerequisites

- Node.js 18+
- pnpm (enforced via `preinstall` script)

### Setup

```bash
pnpm install
```

### Available Scripts

- `pnpm build` - Build the TypeScript source
- `pnpm dev` - Watch mode for development
- `pnpm test` - Run tests
- `pnpm lint` - Check code with Biome
- `pnpm lint:fix` - Fix auto-fixable issues
- `pnpm format` - Format code with Biome
- `pnpm format:check` - Check formatting without fixing

### Code Quality

This project uses [Biome.js](https://biomejs.dev/) for:
- **Linting**: Catches potential errors and enforces code quality rules
- **Formatting**: Consistent code formatting across the project
- **Import organization**: Automatically sorts and organizes imports

The Biome configuration is in `biome.json` and includes:
- Single quotes for strings
- 2-space indentation
- 100 character line width
- Strict TypeScript rules
- Git integration with `.gitignore` support

## License

MIT 