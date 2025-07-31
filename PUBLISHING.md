# Publishing Guide

This guide explains how to publish the `@davidtranjs/webpack-log-forward-plugin` package to npm using GitHub Actions.

## Overview

The package uses GitHub Actions for automated publishing. When you push changes to the main branch, it automatically:
1. Builds the TypeScript code
2. Publishes to npm

## Prerequisites

### 1. NPM Account and Token

1. Create an npm account at [npmjs.com](https://www.npmjs.com) if you don't have one
2. Generate an access token:
   - Go to [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)
   - Click "Generate New Token"
   - Select "Automation" token type
   - Copy the token (you won't see it again)

### 2. GitHub Repository Setup

1. **Add NPM Token to GitHub Secrets**:
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your npm access token from step 1

2. **Update Repository URLs**:
   Update the following fields in `package.json`:
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

## Publishing Process

### Publishing Process

1. **Update version in package.json**:
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. **Build the package**:
   ```bash
   pnpm run build
   ```

3. **Commit and push to main**:
   ```bash
   git add package.json
   git commit -m "chore: bump version to 1.0.1"
   git push origin main
   ```

## GitHub Actions Workflows

### Publish Workflow (`.github/workflows/publish.yml`)
- Runs when changes are pushed to main branch
- Builds the package
- Publishes to npm

## Troubleshooting

### Common Issues

1. **NPM Token Error**:
   - Ensure `NPM_TOKEN` secret is set in GitHub repository
   - Verify the token has publish permissions

2. **Build Failures**:
   - Ensure TypeScript compilation succeeds

3. **Version Conflicts**:
   - Make sure the version in `package.json` is unique
   - Check npm registry for existing versions

### Manual Publishing (Fallback)

If GitHub Actions fails, you can publish manually:

```bash
# Login to npm
npm login

# Build the package
pnpm run build

# Publish
pnpm publish
```

## Version Management

### Semantic Versioning

- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features (backward compatible)
- **Major** (1.0.0 → 2.0.0): Breaking changes



## Security Considerations

1. **NPM Token**: Keep your npm token secure and never commit it to the repository
2. **GitHub Secrets**: Use GitHub secrets for sensitive information
3. **Package Scope**: Consider using a scoped package name (e.g., `@your-org/webpack-log-forward-plugin`) for better organization

## Best Practices

1. **Always build locally** before releasing
2. **Write meaningful release notes** for each version
3. **Use semantic versioning** consistently
4. **Keep dependencies updated** regularly
5. **Monitor the published package** for issues

## Support

If you encounter issues with the publishing process:

1. Check the GitHub Actions logs for error details
2. Verify all prerequisites are met
3. Test the build process locally
4. Contact the maintainers if problems persist 