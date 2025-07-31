# Biome.js Setup

This project uses [Biome.js](https://biomejs.dev/) for linting, formatting, and code quality enforcement.

## What is Biome.js?

Biome is a fast formatter and linter written in Rust that can replace ESLint and Prettier. It provides:

- **Fast performance** - Written in Rust for speed
- **Zero configuration** - Works out of the box
- **TypeScript support** - Native TypeScript linting
- **Import sorting** - Automatic import organization
- **Git integration** - Respects `.gitignore` files

## Configuration

The Biome configuration is in `biome.json`:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.1.3/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedVariables": "error"
      },
      "suspicious": {
        "noExplicitAny": "warn"
      },
      "style": {
        "useConst": "error"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "always",
      "trailingCommas": "none"
    }
  },
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}
```

## Key Features

### Formatting Rules
- **Indentation**: 2 spaces
- **Line width**: 100 characters
- **Quotes**: Single quotes
- **Semicolons**: Always required
- **Trailing commas**: None

### Linting Rules
- **Recommended rules**: All Biome recommended rules enabled
- **Unused variables**: Error (prevents dead code)
- **Explicit any**: Warning (encourages proper typing)
- **Const usage**: Error (enforces immutable declarations)

### Git Integration
- Respects `.gitignore` files
- Only processes files tracked by Git
- Integrates with Git hooks

## Available Commands

```bash
# Check code quality (lint + format)
pnpm run lint

# Fix auto-fixable issues
pnpm run lint:fix

# Format code only
pnpm run format

# Check formatting without fixing
pnpm run format:check
```

## Editor Integration

For the best development experience, install the Biome extension for your editor:

- **VS Code**: [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
- **IntelliJ**: [Biome plugin](https://plugins.jetbrains.com/plugin/22736-biome)
- **Zed**: [Biome extension](https://zed.dev/extensions/biomejs)

### VS Code Settings

Add to your `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

## Migration from ESLint/Prettier

This project migrated from ESLint and Prettier to Biome. The benefits include:

- **Faster performance** - Biome is significantly faster
- **Simpler configuration** - Single config file instead of multiple
- **Better TypeScript support** - Native TypeScript linting
- **Import organization** - Automatic import sorting
- **Git integration** - Respects `.gitignore` automatically

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors**: Run `pnpm install` to ensure Biome is installed
2. **Formatting conflicts**: Make sure you're using the Biome formatter in your editor
3. **Git integration issues**: Ensure you're in a Git repository with a `.gitignore` file

### Performance Tips

- Biome is very fast, but for large projects you can use `--max-diagnostics` to limit output
- Use `--verbose` for detailed debugging information
- The `--staged` flag only checks staged files for faster feedback

## Resources

- [Biome Documentation](https://biomejs.dev/)
- [Biome Rules Reference](https://biomejs.dev/linter/rules/)
- [Biome Configuration](https://biomejs.dev/reference/configuration/)
- [Biome CLI Reference](https://biomejs.dev/reference/cli/) 