# Netlify Redeploy Checklist - 404 Fix

## Issue Summary
The site was returning a 404 on the home page despite successful build and the presence of the `remix-server` function.

## Root Cause
The redirect rule in `netlify.toml` was missing `force = true`, which caused Netlify to prioritize looking for static files over the redirect to the serverless function.

## The Fix Applied
Added `force = true` to the redirect configuration:

```toml
[[redirects]]
from = "/*"
to = "/.netlify/functions/remix-server"
status = 200
force = true  # ← This was the missing piece
```

## Pre-Deployment Checklist

### 1. Verify netlify.toml Configuration
- [ ] Confirm `force = true` is present in the redirect rule
- [ ] Verify functions directory is set to `.netlify/functions-internal`
- [ ] Check that `included_files` contains `["build/server/**"]`

### 2. Build Verification
- [ ] Run `npm run build` locally
- [ ] Confirm `.netlify/functions-internal/remix-server.mjs` is created
- [ ] Verify `build/server/server.js` exists
- [ ] Check `build/client/` contains static assets

### 3. Environment Variables
- [ ] Ensure all required env vars are set in Netlify dashboard:
  - `SANITY_PROJECT_ID`
  - `SANITY_DATASET`

### 4. Deployment Steps
1. Commit the updated `netlify.toml`:
   ```bash
   git add netlify.toml
   git commit -m "Fix: Add force=true to redirect for proper routing"
   git push
   ```

2. Monitor the Netlify build logs for any errors

3. After deployment, verify:
   - [ ] Functions tab shows `remix-server`
   - [ ] Home page loads correctly
   - [ ] API routes work (test `/api/sanity`)

## Post-Deployment Verification

### Test URLs
- [ ] Home page: `https://[your-site].netlify.app/`
- [ ] API endpoint: `https://[your-site].netlify.app/api/sanity`
- [ ] Direct function: `https://[your-site].netlify.app/.netlify/functions/remix-server`

### Debug Tools
- Add `?__netlify-debug` to any URL to see Netlify's routing decisions
- Check function logs in Netlify dashboard under Functions > remix-server > Logs

## Why This Works
The `force = true` parameter tells Netlify to:
1. Always use this redirect rule
2. Skip checking for matching static files
3. Route all requests through the Remix server function

This ensures that Remix handles all routing internally, which is required for dynamic SSR applications.

## Common Pitfalls to Avoid
- ❌ Don't remove the `force = true` parameter
- ❌ Don't change the function name from `remix-server`
- ❌ Don't modify the `.netlify/functions-internal` directory
- ❌ Don't add an `index.html` to the public folder

## Template Reference
This configuration matches the working template used across multiple successful projects. The only difference was the missing `force = true` parameter.
