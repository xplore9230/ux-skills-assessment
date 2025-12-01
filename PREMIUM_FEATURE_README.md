# Premium Monetization Feature

## Overview

This feature adds a premium monetization layer to the UX Skills Quiz application. Users get **2 free quiz attempts per device**, after which they must pay a one-time fee to unlock:

- **Unlimited quiz attempts**
- **Full curated articles and resources** (free users see only 2)
- **All deep insights** (free users see only 1)
- **All podcast recommendations** (free users see only 1)
- **Complete skill analysis checklists** (free users see only 2 items per category)

## Architecture

### Backend Components

#### 1. Database Schema (`shared/schema.ts`)
- **`deviceAccess` table**: Tracks device-level access
  - `deviceId`: Unique device identifier (UUID)
  - `attemptCount`: Number of quiz attempts
  - `premiumUnlocked`: Boolean flag for premium status
  - `createdAt`, `updatedAt`: Timestamps

#### 2. Storage Layer (`server/storage.ts`)
- Extended `IStorage` interface with device access methods
- `MemStorage` implementation for in-memory storage
- Methods:
  - `getDeviceAccess(deviceId)`
  - `createDeviceAccess(deviceAccess)`
  - `updateDeviceAccess(deviceId, updates)`

#### 3. API Endpoints (`server/routes.ts`)

**Access Tracking:**
- `GET /api/premium/access/status?deviceId=...`
  - Returns `{ attemptCount, premiumUnlocked }`
- `POST /api/premium/access/increment`
  - Body: `{ deviceId }`
  - Increments attempt count (only if not premium)
- `POST /api/premium/access/set-premium`
  - Body: `{ deviceId, premiumUnlocked }`
  - Marks device as premium (internal use)

**Payment Processing:**
- `POST /api/premium/payments/create-checkout-session`
  - Body: `{ deviceId, redirectTo? }`
  - Creates Stripe Checkout session
  - Returns `{ url }` for redirect
- `GET /api/premium/payments/confirm?session_id=...&deviceId=...`
  - Confirms payment and unlocks premium
  - Returns `{ success, premiumUnlocked, attemptCount }`

#### 4. Stripe Integration (`server/lib/stripe.ts`)
- Initializes Stripe SDK with `STRIPE_SECRET_KEY`
- Exports `stripe` client, `isStripeConfigured()`, and `getStripePriceId()`

### Frontend Components

#### 1. Premium Access Context (`client/src/context/PremiumAccessContext.tsx`)
- Manages premium state across the app
- Generates and stores `deviceId` in localStorage
- Provides `usePremiumAccess()` hook with:
  - `deviceId`, `attemptCount`, `premiumUnlocked`
  - `canTakePremiumQuiz`, `requirePayment`
  - `refreshStatus()`, `incrementAttempts()`, `startCheckout()`

#### 2. Premium Paywall Component (`client/src/components/PremiumPaywall.tsx`)
- Reusable paywall UI with 3 variants:
  - `full`: Full-page paywall (default)
  - `inline`: Inline banner for content sections
  - `modal`: Modal-style centered paywall
- Integrates with `usePremiumAccess()` for checkout flow

#### 3. Premium Quiz Page (`client/src/pages/premium/quiz-premium.tsx`)
- Wraps existing `QuizPage` component
- Checks `canTakePremiumQuiz` before allowing quiz start
- Shows paywall if `requirePayment` is true
- Increments attempt count on quiz completion

#### 4. Premium Results Page (`client/src/pages/premium/results-premium.tsx`)
- Wraps existing `ResultsPage` component
- Gates content based on `premiumUnlocked`:
  - **Curated Resources**: Shows 2 free, rest locked
  - **Deep Insights**: Shows 1 free, rest locked
  - **Podcasts**: Shows 1 free, rest locked
  - **Skill Checklists**: Shows 2 items free, rest locked
- Displays inline paywalls for locked content

#### 5. Payment Success Page (`client/src/pages/premium/payment-success.tsx`)
- Handles Stripe redirect after payment
- Confirms payment with backend
- Updates premium status in context
- Redirects to results or quiz

## Setup Instructions

### 1. Environment Variables

Add to your `.env` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...  # Your Stripe secret key
STRIPE_PRICE_ID=price_...       # Your Stripe price ID for the premium bundle
```

### 2. Create Stripe Product

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create a new Product (e.g., "UX Quiz Premium Access")
3. Add a one-time payment Price (e.g., $19)
4. Copy the Price ID and set it as `STRIPE_PRICE_ID`

### 3. Install Dependencies

Dependencies are already installed:
- `stripe` - Stripe SDK
- `uuid` - Device ID generation
- `@types/stripe`, `@types/uuid` - TypeScript types

### 4. Database Migration (if using PostgreSQL)

If you're using a real database instead of in-memory storage, run:

```bash
npm run db:push
```

This will create the `device_access` table.

## Usage

### For Development

1. **Test with Stripe Test Mode:**
   - Use test keys from Stripe Dashboard
   - Use test card: `4242 4242 4242 4242`

2. **Access Premium Routes:**
   - Quiz: `/premium/quiz`
   - Results: `/premium/results`
   - Payment Success: `/premium/payment-success`

3. **Test Flow:**
   - Take quiz twice (free attempts)
   - Third attempt shows paywall
   - Click "Unlock Premium"
   - Complete Stripe checkout
   - Verify premium access

### For Production

1. **Switch to Live Stripe Keys:**
   - Update `STRIPE_SECRET_KEY` with live key
   - Update `STRIPE_PRICE_ID` with live price ID

2. **Configure Webhooks (Optional but Recommended):**
   - Set up webhook endpoint: `/api/premium/payments/webhook`
   - Listen for `checkout.session.completed` events
   - Provides more reliable payment confirmation

## Testing Checklist

### Backend Tests
- [ ] `/api/premium/access/status` creates device on first call
- [ ] `/api/premium/access/increment` increments count correctly
- [ ] `/api/premium/access/increment` doesn't increment for premium devices
- [ ] `/api/premium/access/set-premium` marks device as premium
- [ ] `/api/premium/payments/create-checkout-session` returns valid Stripe URL
- [ ] `/api/premium/payments/confirm` verifies payment and unlocks premium

### Frontend Tests
- [ ] Device ID is generated and persisted in localStorage
- [ ] Premium context loads access status on mount
- [ ] Quiz allows 2 free attempts
- [ ] Quiz shows paywall on 3rd attempt
- [ ] Paywall redirects to Stripe Checkout
- [ ] Payment success page confirms payment
- [ ] Results page shows partial content for free users
- [ ] Results page shows full content for premium users
- [ ] Existing non-premium routes still work unchanged

### Integration Tests
- [ ] Complete end-to-end payment flow
- [ ] Verify premium status persists across page refreshes
- [ ] Test with multiple devices (different browser/incognito)
- [ ] Verify attempt count resets don't affect premium users

## Security Considerations

1. **Device ID Storage:**
   - Stored in localStorage (client-side)
   - Not cryptographically secure (can be cleared)
   - Suitable for soft enforcement, not critical security

2. **Payment Verification:**
   - Always verify payment status server-side
   - Check session metadata matches deviceId
   - Use webhooks for production reliability

3. **API Endpoints:**
   - `/api/premium/access/set-premium` should be internal-only
   - Consider adding authentication for production
   - Rate limit payment endpoints

## Future Enhancements

1. **User Accounts:**
   - Link premium access to user accounts instead of devices
   - Allow premium transfer between devices

2. **Subscription Model:**
   - Switch from one-time to recurring payments
   - Add subscription management

3. **Analytics:**
   - Track conversion rates
   - Monitor paywall interactions
   - A/B test pricing and messaging

4. **Webhook Integration:**
   - Implement `/api/premium/payments/webhook`
   - Handle refunds and disputes

## Troubleshooting

### "Payment system not configured" error
- Check that `STRIPE_SECRET_KEY` is set in environment
- Verify the key starts with `sk_test_` or `sk_live_`

### "Payment pricing not configured" error
- Check that `STRIPE_PRICE_ID` is set in environment
- Verify the price ID starts with `price_`

### Device ID keeps resetting
- Check localStorage is enabled in browser
- Verify no extensions are clearing storage
- Check for incognito/private browsing mode

### Payment succeeds but premium not unlocked
- Check backend logs for confirmation errors
- Verify deviceId matches in session metadata
- Try refreshing the page to reload premium status

## File Structure

```
server/
├── lib/
│   └── stripe.ts              # Stripe SDK initialization
├── routes.ts                  # Premium API endpoints
├── storage.ts                 # Device access storage
└── ...

shared/
└── schema.ts                  # Database schema with deviceAccess table

client/src/
├── context/
│   └── PremiumAccessContext.tsx   # Premium state management
├── components/
│   └── PremiumPaywall.tsx         # Reusable paywall UI
└── pages/
    └── premium/
        ├── quiz-premium.tsx       # Premium quiz wrapper
        ├── results-premium.tsx    # Premium results wrapper
        └── payment-success.tsx    # Payment confirmation page
```

## Support

For issues or questions:
1. Check this README
2. Review backend logs for API errors
3. Check browser console for frontend errors
4. Verify Stripe Dashboard for payment status

