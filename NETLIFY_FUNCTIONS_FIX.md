# Netlify Functions Fix for Remix + Netlify Adapter

## Root Cause
The issue was that the `netlify.toml` configuration was incomplete for the Remix + Netlify adapter setup. In this architecture, Remix routes themselves become serverless functions through the adapter, rather than having separate function files.

## What Was Fixed

### 1. Updated `netlify.toml`
Added the following critical configurations:
- Specified the functions directory: `.netlify/functions-internal`
- Added included files for the server build
- Added a redirect rule to route all requests through the Remix server function

### 2. Key Understanding
- The `@netlify/remix-adapter` creates a single serverless function (`remix-server`) that handles all routes
- This function is automatically generated in `.netlify/functions-internal/` during build
- The function imports from `build/server/server.js`

## Current Configuration

```toml
[build]
command = "npm run build"
publish = "build/client"

[dev]
command = "npm run dev"

[functions]
directory = ".netlify/functions-internal"
node_bundler = "esbuild"
included_files = ["build/server/**"]

[[redirects]]
from = "/*"
to = "/.netlify/functions/remix-server"
status = 200
```

## Deployment Checklist

1. **Ensure environment variables are set in Netlify:**
   - `SANITY_PROJECT_ID`
   - `SANITY_DATASET`

2. **Build command verification:**
   - The build should create:
     - `build/client/` (static assets)
     - `build/server/` (server-side code)
     - `.netlify/functions-internal/remix-server.mjs` (serverless function)

3. **Deploy to Netlify:**
   ```bash
   git add netlify.toml
   git commit -m "Fix Netlify serverless functions configuration"
   git push
   ```

4. **In Netlify Dashboard, after deployment:**
   - Check Functions tab - you should see `remix-server` listed
   - Check the function logs for any errors
   - Test API routes like `/api/sanity`

## How It Works

1. When a request comes to Netlify, it checks static files first (from `build/client`)
2. If no static file matches, the redirect rule sends the request to `/.netlify/functions/remix-server`
3. The Remix server function handles all dynamic routes, including API routes
4. Your `app/routes/api.sanity.tsx` becomes accessible at `/api/sanity`

## Troubleshooting

If functions still don't appear:
1. Clear build cache in Netlify dashboard
2. Check build logs for any errors during the build process
3. Ensure `@netlify/remix-adapter` is properly installed
4. Verify that `vite.config.ts` includes the `netlifyPlugin()`

## Testing Locally

To test the Netlify functions locally:
```bash
# Install Netlify CLI if not already installed
npm install -g netlify-cli

# Run Netlify dev server
netlify dev
```

This will simulate the Netlify environment locally and properly handle the serverless functions.
