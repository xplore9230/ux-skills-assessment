# Vercel Module Error Fix - Testing Guide

## What Was Fixed

The error `Cannot find module '/var/task/dist/index-vercel.js'` was caused by the compiled server bundle not being included in the Vercel serverless function deployment.

## Changes Made

### Updated `vercel.json`
Added a `functions` configuration block to ensure the server bundle is included:

```json
"functions": {
  "api/index.js": {
    "includeFiles": "dist/index-vercel.js"
  }
}
```

This tells Vercel to include the `dist/index-vercel.js` file when bundling the `api/index.js` serverless function.

## Deployment Steps

1. **Commit the changes:**
   ```bash
   git add vercel.json
   git commit -m "fix: include dist/index-vercel.js in Vercel serverless function"
   git push origin main
   ```

2. **Wait for Vercel to auto-deploy** (if auto-deploy is enabled)
   - Or manually deploy via Vercel CLI: `vercel --prod`

## Testing the Fix

### 1. Check Vercel Deployment Logs

After deployment, check the Vercel logs:
- Go to Vercel Dashboard → Your Project → Deployments
- Click on the latest deployment
- Check the build logs for any errors
- The build should succeed and show `dist/index-vercel.js` was created

### 2. Test API Endpoints

Test these endpoints that were previously failing with 500 errors:

```bash
# Replace YOUR_DOMAIN with your actual Vercel domain
DOMAIN="https://your-app.vercel.app"

# Test improvement plan endpoint
curl "$DOMAIN/api/v2/improvement-plan" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"answers":{"q1":"a","q2":"b"},"score":70}'

# Test deep insights endpoint
curl "$DOMAIN/api/v2/deep-insights" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"answers":{"q1":"a","q2":"b"},"score":70}'

# Test resources endpoint
curl "$DOMAIN/api/v2/resources" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"answers":{"q1":"a","q2":"b"},"score":70}'

# Test skill analysis endpoint
curl "$DOMAIN/api/v2/skill-analysis" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"answers":{"q1":"a","q2":"b"},"score":70}'

# Test meaning endpoint
curl "$DOMAIN/api/v2/meaning" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"answers":{"q1":"a","q2":"b"},"score":70}'
```

### 3. Check Function Logs

In Vercel Dashboard → Your Project → Functions:
- Click on any function to see its logs
- Verify there are no "Cannot find module" errors
- Check that requests are being processed successfully

### 4. Test via Browser

1. Visit your Vercel deployment URL
2. Complete the quiz
3. View the results page
4. Check that all sections load properly:
   - Skill Analysis
   - Improvement Plan
   - Deep Insights
   - Curated Resources

5. Open browser DevTools (F12) → Network tab
   - Verify all API calls return 200 status codes
   - Check that no 500 errors occur

### 5. Check Console for Errors

In browser DevTools → Console tab:
- There should be no error messages about failed API calls
- All dynamic content should load successfully

## Expected Results

✅ **Before the fix:**
- 500 Internal Server Error on all `/api/v2/*` endpoints
- Error message: "Cannot find module '/var/task/dist/index-vercel.js'"
- Results page sections fail to load dynamic content

✅ **After the fix:**
- All API endpoints return 200 status codes
- Dynamic content loads successfully
- No module resolution errors in logs

## Troubleshooting

### If endpoints still fail:

1. **Check that the file was included:**
   - In Vercel Dashboard, check the function size
   - It should be larger than before (indicating the bundle was included)

2. **Verify the build command ran:**
   - Check build logs for: `dist/index-vercel.js  81.2kb`
   - This confirms the file was created during build

3. **Clear Vercel cache and redeploy:**
   ```bash
   vercel --prod --force
   ```

4. **Check Node.js version:**
   - Ensure Vercel is using Node.js 18 or higher
   - Set in Vercel Dashboard → Project Settings → General → Node.js Version

### If the issue persists:

The alternative approach would be to restructure the deployment to use Vercel's native Express support instead of the `api/` folder pattern. Let me know if you need help with that approach.

## Success Criteria

The fix is successful when:
- ✅ No 500 errors on `/api/v2/*` endpoints
- ✅ No "Cannot find module" errors in Vercel logs
- ✅ All dynamic content loads on the results page
- ✅ Quiz completion flow works end-to-end

## Additional Notes

- The `includeFiles` configuration is the recommended approach for including external files in Vercel serverless functions
- This fix doesn't change any application logic, only deployment configuration
- All local development should continue to work as before

