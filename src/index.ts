import { Compiler, WebpackPluginInstance } from 'webpack';

export interface LogForwardOptions {
  /**
   * Array of log types to forward. Defaults to all types: ['log', 'info', 'warn', 'error', 'debug']
   */
  logTypes?: string[];
  /**
   * Whether to enable the plugin. Defaults to true.
   */
  enabled?: boolean;
  /**
   * Custom prefix for forwarded logs. Defaults to '[Browser]'.
   */
  prefix?: string;
  /**
   * Whether to include timestamp in forwarded logs. Defaults to true.
   */
  includeTimestamp?: boolean;
}

export class WebpackLogForwardPlugin implements WebpackPluginInstance {
  private options: Required<LogForwardOptions>;

  constructor(options: LogForwardOptions = {}) {
    this.options = {
      logTypes: options.logTypes || ['log', 'info', 'warn', 'error', 'debug'],
      enabled: options.enabled !== false,
      prefix: options.prefix || '[Browser]',
      includeTimestamp: options.includeTimestamp !== false,
    };
  }

  apply(compiler: Compiler): void {
    // Only apply in development mode
    if (compiler.options.mode !== 'development') {
      return;
    }

    // Only apply when dev server is running
    if (!compiler.options.devServer) {
      return;
    }

    if (!this.options.enabled) {
      return;
    }

    // Hook into the compilation process
    compiler.hooks.afterCompile.tap('WebpackLogForwardPlugin', (compilation) => {
      // Inject the log forwarding script into the bundle
      this.injectLogForwardScript(compilation);
    });

    // Hook into the dev server setup
    compiler.hooks.afterEnvironment.tap('WebpackLogForwardPlugin', () => {
      this.setupDevServerMiddleware(compiler);
    });
  }

  private injectLogForwardScript(compilation: any): void {
    const logForwardScript = this.generateLogForwardScript();
    
    // Add the script to the compilation
    compilation.hooks.additionalAssets.tap('WebpackLogForwardPlugin', () => {
      compilation.assets['log-forward.js'] = {
        source: () => logForwardScript,
        size: () => logForwardScript.length,
      };
    });
  }

  private generateLogForwardScript(): string {
    const { logTypes, prefix, includeTimestamp } = this.options;
    
    return `
(function() {
  'use strict';
  
  const logTypes = ${JSON.stringify(logTypes)};
  const prefix = ${JSON.stringify(prefix)};
  const includeTimestamp = ${JSON.stringify(includeTimestamp)};
  
  function getTimestamp() {
    return includeTimestamp ? new Date().toISOString() + ' ' : '';
  }
  
  function forwardLog(type, args) {
    if (!logTypes.includes(type)) return;
    
    const timestamp = getTimestamp();
    const message = Array.from(args).map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
    
    // Send to server via fetch
    fetch('/__webpack_log_forward__', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
        message: message,
        timestamp: timestamp,
        prefix: prefix
      })
    }).catch(() => {
      // Silently fail if server is not available
    });
  }
  
  // Override console methods
  const originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
    debug: console.debug
  };
  
  console.log = function(...args) {
    originalConsole.log.apply(console, args);
    forwardLog('log', args);
  };
  
  console.info = function(...args) {
    originalConsole.info.apply(console, args);
    forwardLog('info', args);
  };
  
  console.warn = function(...args) {
    originalConsole.warn.apply(console, args);
    forwardLog('warn', args);
  };
  
  console.error = function(...args) {
    originalConsole.error.apply(console, args);
    forwardLog('error', args);
  };
  
  console.debug = function(...args) {
    originalConsole.debug.apply(console, args);
    forwardLog('debug', args);
  };
  
  // Also handle unhandled errors
  window.addEventListener('error', function(event) {
    forwardLog('error', [event.error || event.message]);
  });
  
  window.addEventListener('unhandledrejection', function(event) {
    forwardLog('error', [event.reason]);
  });
})();
`;
  }

  private setupDevServerMiddleware(compiler: Compiler): void {
    const devServer = compiler.options.devServer;
    
    if (!devServer) return;

    // Add middleware to handle log forwarding and HTML injection
    const originalSetupMiddlewares = devServer.setupMiddlewares;
    
    devServer.setupMiddlewares = (middlewares: any, devServer: any) => {
      // Add our custom middleware for log forwarding
      middlewares.unshift({
        name: 'log-forward-endpoint',
        path: '/__webpack_log_forward__',
        middleware: (req: any, res: any, next: any) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk: Buffer) => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const logData = JSON.parse(body);
                this.forwardLogToTerminal(logData);
                res.status(200).json({ success: true });
              } catch (error) {
                res.status(400).json({ error: 'Invalid JSON' });
              }
            });
          } else {
            next();
          }
        }
      });

      // Add our custom middleware for HTML injection
      middlewares.unshift({
        name: 'log-forward-html-injection',
        path: '*',
        middleware: (req: any, res: any, next: any) => {
          if (req.path.endsWith('.html') || req.path === '/') {
            const originalSend = res.send;
            res.send = function(body: string) {
              if (typeof body === 'string' && body.includes('</head>')) {
                const scriptTag = '<script src="/log-forward.js"></script>';
                body = body.replace('</head>', `${scriptTag}\n</head>`);
              }
              return originalSend.call(this, body);
            };
          }
          next();
        }
      });

      if (originalSetupMiddlewares) {
        return originalSetupMiddlewares(middlewares, devServer);
      }
      
      return middlewares;
    };
  }

  private forwardLogToTerminal(logData: any): void {
    const { type, message, timestamp, prefix } = logData;
    
    // Color codes for different log types
    const colors = {
      log: '\x1b[36m',    // Cyan
      info: '\x1b[32m',   // Green
      warn: '\x1b[33m',   // Yellow
      error: '\x1b[31m',  // Red
      debug: '\x1b[35m',  // Magenta
    };
    
    const reset = '\x1b[0m';
    const color = colors[type as keyof typeof colors] || colors.log;
    
    const timestampStr = timestamp || '';
    const logMessage = `${color}${prefix} ${type.toUpperCase()}:${reset} ${timestampStr}${message}`;
    
    // Use console methods to maintain proper formatting
    switch (type) {
      case 'error':
        console.error(logMessage);
        break;
      case 'warn':
        console.warn(logMessage);
        break;
      case 'info':
        console.info(logMessage);
        break;
      case 'debug':
        console.debug(logMessage);
        break;
      default:
        console.log(logMessage);
    }
  }
}

export default WebpackLogForwardPlugin; 