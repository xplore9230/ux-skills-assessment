# 🎬 Premium Feature Demo Guide

## Quick Start Demo (No Stripe Required)

You can demo the feature locally **without Stripe setup** to see:
- ✅ 2-attempt limit enforcement
- ✅ Paywall UI
- ✅ Content gating on results page
- ⚠️ Payment flow (will show error without Stripe keys, but you can see the UI)

## Step 1: Start the Server

```bash
npm run dev
```

Wait for: `serving on port 3001`

## Step 2: Test Backend API (Optional)

In a new terminal:

```bash
node test-premium-endpoints.js
```

Should show: ✅ All Core Tests Passed!

## Step 3: Demo the Premium Quiz Flow

### Open Premium Quiz:
**http://localhost:3001/premium/quiz**

### What to Test:

1. **First Attempt** ✅
   - Take the quiz normally
   - Complete it
   - See results page
   - Notice: You'll see partial content (2 articles, 1 insight, 1 podcast, limited checklists)

2. **Second Attempt** ✅
   - Go back to: http://localhost:3001/premium/quiz
   - Take quiz again
   - Complete it
   - See results with partial content again

3. **Third Attempt (Paywall)** 🔒
   - Go back to: http://localhost:3001/premium/quiz
   - **You'll see the paywall!** 
   - Try clicking "Unlock Premium"
   - Without Stripe keys, you'll see an error message (expected)
   - With Stripe keys, you'd see the payment screen

## Step 4: See Content Gating

### Visit Premium Results:
**http://localhost:3001/premium/results/[any-result-id]**

Or complete a premium quiz to see the results automatically.

### What's Gated:

1. **Curated Articles**
   - ✅ **Free users**: See 2 articles
   - 🔒 **Locked**: Rest show paywall below

2. **Deep Insights**
   - ✅ **Free users**: See 1 insight
   - 🔒 **Locked**: Rest show paywall below

3. **Podcasts**
   - ✅ **Free users**: See 1 podcast
   - 🔒 **Locked**: Rest show paywall below

4. **Skill Checklists**
   - ✅ **Free users**: See 2 items per category
   - 🔒 **Locked**: Full checklists show paywall

## Step 5: Test with Stripe (Optional)

If you want to test the full payment flow:

1. **Get Stripe Test Keys:**
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy your test secret key (starts with `sk_test_`)
   - Create a product and get price ID (starts with `price_`)

2. **Add to `.env` file:**
   ```bash
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_PRICE_ID=price_your_price_here
   ```

3. **Restart server:**
   ```bash
   # Stop server (Ctrl+C) and restart
   npm run dev
   ```

4. **Test Payment:**
   - Go to premium quiz
   - After 2 attempts, click "Unlock Premium"
   - Use test card: `4242 4242 4242 4242`
   - Any future date, any CVC
   - Complete payment
   - See premium unlocked!

## Demo Checklist

- [ ] Server running on port 3001
- [ ] Backend tests pass
- [ ] Can access `/premium/quiz`
- [ ] First attempt works ✅
- [ ] Second attempt works ✅
- [ ] Third attempt shows paywall 🔒
- [ ] Results page shows partial content
- [ ] Paywall UI appears on locked content
- [ ] Original routes still work (`/quiz`, `/results`)

## URLs to Test

| URL | What It Does |
|-----|-------------|
| http://localhost:3001/ | Home page (unchanged) |
| http://localhost:3001/quiz | Regular quiz (unchanged, no limits) |
| http://localhost:3001/results | Regular results (unchanged, full content) |
| **http://localhost:3001/premium/quiz** | **Premium quiz (2-attempt limit)** |
| **http://localhost:3001/premium/results** | **Premium results (gated content)** |
| http://localhost:3001/premium/payment-success | Payment confirmation page |

## Troubleshooting

### "Cannot GET /premium/quiz"
- Make sure server is running
- Check that routes are added to `App.tsx`
- Restart the dev server

### Paywall shows but clicking does nothing
- Check browser console for errors
- Without Stripe keys, this is expected - you'll see an error message
- Add Stripe keys to `.env` for full functionality

### Results page shows all content
- Make sure you're on `/premium/results` (not `/results`)
- Check that `PremiumResultsPage` is being used
- Clear localStorage and try again: `localStorage.clear()`

### Device ID keeps resetting
- Check browser allows localStorage
- Don't use incognito/private mode
- Clear browser cache and try again

## Quick Demo Script

Run these commands in order:

```bash
# 1. Start server
npm run dev

# 2. In another terminal, test backend
node test-premium-endpoints.js

# 3. Open browser to:
# http://localhost:3001/premium/quiz

# 4. Complete quiz 2 times
# 5. Try third time - see paywall!
# 6. Check results page - see gated content!
```

## What You Should See

### Before Payment (Free User):
- ✅ 2 quiz attempts
- ✅ Results page with:
  - 2 curated articles
  - 1 deep insight
  - 1 podcast
  - Limited checklists (2 items per category)
- 🔒 Paywall sections for locked content

### After Payment (Premium User):
- ✅ Unlimited quiz attempts
- ✅ Results page with:
  - ALL curated articles
  - ALL deep insights
  - ALL podcasts
  - FULL checklists
- ✅ No paywalls

## Success Indicators

✅ Server starts without errors  
✅ Backend tests pass  
✅ Can navigate to premium routes  
✅ Paywall appears after 2 attempts  
✅ Content is gated on results page  
✅ Original routes still work  

---

**Ready to demo?** Start with: `npm run dev` then visit http://localhost:3001/premium/quiz

