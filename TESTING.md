# Testing WebpackLogForwardPlugin

## 🧪 How to Test the Plugin

### Method 1: Using the Example Project (Recommended)

1. **Start the example server:**
   ```bash
   cd example
   pnpm start
   ```

2. **Open your browser to `http://localhost:3001`**

3. **Open browser console (F12) and run these commands:**
   ```javascript
   console.log('Hello from browser!');
   console.error('This is an error message');
   console.warn('This is a warning message');
   console.info('This is an info message');
   console.debug('This is a debug message');
   ```

4. **Check your terminal** - you should see colored log messages like:
   ```
   [Browser] LOG: 2024-01-15T10:30:45.123Z Hello from browser!
   [Browser] ERROR: 2024-01-15T10:30:45.124Z This is an error message
   [Browser] WARN: 2024-01-15T10:30:45.125Z This is a warning message
   ```

### Method 2: Using the Test Buttons

1. **Start the example server:**
   ```bash
   cd example
   pnpm start
   ```

2. **Open `http://localhost:3001` in your browser**

3. **Click the test buttons:**
   - **"Test Console Logs"** - Tests all console methods
   - **"Test Errors"** - Tests unhandled errors and promise rejections
   - **"Test Objects"** - Tests logging objects and arrays

### Method 3: Manual Testing

1. **Create a simple HTML file:**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Test Plugin</title>
   </head>
   <body>
       <h1>Test WebpackLogForwardPlugin</h1>
       <script>
           console.log('Page loaded!');
           console.error('Test error');
           console.warn('Test warning');
       </script>
   </body>
   </html>
   ```

2. **Add the plugin to your webpack config:**
   ```javascript
   const { WebpackLogForwardPlugin } = require('webpack-log-forward-plugin');
   
   module.exports = {
     mode: 'development',
     devServer: {
       static: './public',
       port: 3000
     },
     plugins: [
       new WebpackLogForwardPlugin({
         logTypes: ['log', 'error', 'warn'],
         prefix: '[MyApp]'
       })
     ]
   };
   ```

3. **Start your dev server and test**

## 🎯 What to Look For

### ✅ Success Indicators

1. **Terminal shows colored logs:**
   - Cyan for `console.log()`
   - Green for `console.info()`
   - Yellow for `console.warn()`
   - Red for `console.error()`
   - Magenta for `console.debug()`

2. **Log format:**
   ```
   [Browser] LOG: 2024-01-15T10:30:45.123Z Your message here
   ```

3. **Script injection:**
   - Check browser Network tab for `log-forward.js`
   - Check page source for `<script src="/log-forward.js"></script>`

### ❌ Common Issues

1. **No logs appearing in terminal:**
   - Check if webpack is in development mode
   - Check if dev server is configured
   - Check browser console for errors

2. **Script not injected:**
   - Check if `log-forward.js` is being served
   - Check if HTML contains the script tag

3. **Plugin not working:**
   - Ensure you're using the correct import: `const { WebpackLogForwardPlugin } = require('webpack-log-forward-plugin')`
   - Check that the plugin is built: `pnpm run build`

## 🔧 Debugging

### Check Plugin Status

1. **Verify plugin is loaded:**
   ```javascript
   // In your webpack config
   console.log('Plugin loaded:', WebpackLogForwardPlugin);
   ```

2. **Check dev server configuration:**
   ```javascript
   // In your webpack config
   console.log('Dev server config:', devServer);
   ```

3. **Test middleware endpoint:**
   ```bash
   curl -X POST http://localhost:3001/__webpack_log_forward__ \
     -H "Content-Type: application/json" \
     -d '{"type":"log","message":"test","timestamp":"","prefix":"[Test]"}'
   ```

### Browser Console Testing

```javascript
// Test basic logging
console.log('Test message');
console.error('Test error');
console.warn('Test warning');

// Test objects
console.log('Object:', { name: 'John', age: 30 });
console.info('Array:', [1, 2, 3, 4, 5]);

// Test errors
setTimeout(() => {
  throw new Error('Test unhandled error');
}, 1000);

// Test promise rejections
setTimeout(() => {
  Promise.reject(new Error('Test promise rejection'));
}, 2000);
```

## 📊 Expected Output

When you run the tests, you should see output like this in your terminal:

```
[Browser] LOG: 2024-01-15T10:30:45.123Z Page loaded!
[Browser] ERROR: 2024-01-15T10:30:45.124Z Test error
[Browser] WARN: 2024-01-15T10:30:45.125Z Test warning
[Browser] LOG: 2024-01-15T10:30:45.126Z Object: {"name":"John","age":30}
[Browser] INFO: 2024-01-15T10:30:45.127Z Array: [1,2,3,4,5]
[Browser] ERROR: 2024-01-15T10:30:46.128Z Test unhandled error
[Browser] ERROR: 2024-01-15T10:30:47.129Z Test promise rejection
```

## 🚀 Quick Test Commands

```bash
# Build the plugin
pnpm run build

# Run tests
pnpm test

# Start example server
cd example && pnpm start

# Test in browser
open http://localhost:3001
```

## 🎯 Configuration Testing

Test different configurations:

```javascript
// Test only errors and warnings
new WebpackLogForwardPlugin({
  logTypes: ['error', 'warn'],
  prefix: '[Errors Only]'
})

// Test without timestamps
new WebpackLogForwardPlugin({
  includeTimestamp: false,
  prefix: '[No Timestamp]'
})

// Test custom prefix
new WebpackLogForwardPlugin({
  prefix: '🚀 [MyApp]'
})
``` 