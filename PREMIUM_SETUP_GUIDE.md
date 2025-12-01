# Premium Feature Setup Guide

## Quick Start

### 1. Configure Stripe

Add these environment variables to your `.env` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PRICE_ID=price_your_stripe_price_id_here
```

**How to get these values:**

1. Create a Stripe account at https://stripe.com
2. Go to **Developers > API Keys**
3. Copy your **Secret Key** (starts with `sk_test_` for test mode)
4. Go to **Products** section
5. Create a new Product (e.g., "UX Quiz Premium Access")
6. Add a **one-time payment Price** (e.g., $19)
7. Copy the **Price ID** (starts with `price_`)

### 2. Test the Backend

Start your server:

```bash
npm run dev
```

In another terminal, run the test script:

```bash
node test-premium-endpoints.js
```

Expected output:
```
✅ All Core Tests Passed!

Summary:
- Device access tracking: ✅
- Attempt count increment: ✅
- Premium unlock: ✅
- Premium blocks increments: ✅
- Stripe integration: ✅
```

### 3. Test the Frontend

#### Access Premium Routes

1. **Premium Quiz**: http://localhost:3001/premium/quiz
2. **Premium Results**: http://localhost:3001/premium/results
3. **Payment Success**: http://localhost:3001/premium/payment-success

#### Test Flow

1. Open http://localhost:3001/premium/quiz
2. Complete the quiz (first attempt)
3. Complete the quiz again (second attempt)
4. Try to start a third time → You should see the paywall
5. Click "Unlock Premium"
6. You'll be redirected to Stripe Checkout
7. Use test card: `4242 4242 4242 4242` (any future date, any CVC)
8. Complete payment
9. You'll be redirected back with premium unlocked
10. Verify unlimited quiz access and full results content

### 4. Verify Existing Routes Still Work

**Important**: Make sure the original (non-premium) routes are unchanged:

- http://localhost:3001/ (home page)
- http://localhost:3001/quiz (regular quiz - should work as before)
- http://localhost:3001/results (regular results - should work as before)

These routes should function exactly as they did before the premium feature was added.

## Testing Checklist

### Backend API Tests

- [ ] `GET /api/premium/access/status` creates new device
- [ ] `POST /api/premium/access/increment` increments count
- [ ] Premium devices don't increment
- [ ] `POST /api/premium/access/set-premium` unlocks premium
- [ ] `POST /api/premium/payments/create-checkout-session` returns Stripe URL
- [ ] `GET /api/premium/payments/confirm` verifies payment

### Frontend Tests

- [ ] Device ID persists in localStorage
- [ ] Can take quiz twice for free
- [ ] Third attempt shows paywall
- [ ] Paywall redirects to Stripe
- [ ] Payment success page confirms and redirects
- [ ] Premium results show full content
- [ ] Free results show partial content with paywalls

### Regression Tests

- [ ] Original `/quiz` route works unchanged
- [ ] Original `/results` route works unchanged
- [ ] Home page works unchanged
- [ ] No errors in console for existing flows

## Stripe Test Cards

Use these cards in Stripe test mode:

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Card declined |
| 4000 0025 0000 3155 | Requires authentication (3D Secure) |

Use any:
- Future expiration date
- Any 3-digit CVC
- Any billing ZIP code

## Troubleshooting

### "Payment system not configured"

**Problem**: Stripe keys not set in environment

**Solution**:
1. Check `.env` file has `STRIPE_SECRET_KEY`
2. Restart the server after adding keys
3. Verify key starts with `sk_test_` or `sk_live_`

### "Payment pricing not configured"

**Problem**: Stripe price ID not set

**Solution**:
1. Check `.env` file has `STRIPE_PRICE_ID`
2. Verify price ID starts with `price_`
3. Ensure the price exists in your Stripe dashboard

### Device ID keeps resetting

**Problem**: localStorage being cleared

**Solution**:
1. Check browser settings allow localStorage
2. Disable extensions that clear storage
3. Don't use incognito/private mode for testing

### Payment succeeds but premium not unlocked

**Problem**: Payment confirmation failed

**Solution**:
1. Check backend logs for errors
2. Verify `deviceId` in URL matches localStorage
3. Try manually refreshing the page
4. Check Stripe Dashboard to confirm payment status

### Tests fail with "Connection refused"

**Problem**: Server not running

**Solution**:
1. Start the server: `npm run dev`
2. Wait for "serving on port 3001" message
3. Run tests again

## Production Deployment

### 1. Switch to Live Mode

Update `.env` with live keys:

```bash
STRIPE_SECRET_KEY=sk_live_your_live_key_here
STRIPE_PRICE_ID=price_your_live_price_here
```

### 2. Set Up Webhooks (Recommended)

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/premium/payments/webhook`
3. Select event: `checkout.session.completed`
4. Copy webhook signing secret
5. Add to `.env`: `STRIPE_WEBHOOK_SECRET=whsec_...`

### 3. Test in Production

1. Use real credit card (will charge real money!)
2. Verify payment appears in Stripe Dashboard
3. Verify premium access is granted
4. Test refund flow if needed

### 4. Monitor

- Check Stripe Dashboard for payment activity
- Monitor server logs for errors
- Track conversion rates
- Watch for failed payments

## Next Steps

1. ✅ Configure Stripe keys
2. ✅ Run backend tests
3. ✅ Test frontend flows
4. ✅ Verify existing routes work
5. ✅ Test with Stripe test cards
6. 🚀 Deploy to production
7. 📊 Monitor and optimize

## Support

For issues:
1. Check this guide
2. Review `PREMIUM_FEATURE_README.md`
3. Check backend logs
4. Check browser console
5. Verify Stripe Dashboard

## File Reference

- **Backend**: `server/routes.ts`, `server/lib/stripe.ts`, `server/storage.ts`
- **Frontend**: `client/src/context/PremiumAccessContext.tsx`, `client/src/components/PremiumPaywall.tsx`
- **Pages**: `client/src/pages/premium/`
- **Tests**: `test-premium-endpoints.js`
- **Docs**: `PREMIUM_FEATURE_README.md`

