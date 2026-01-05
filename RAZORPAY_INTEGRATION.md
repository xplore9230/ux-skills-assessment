# Razorpay Integration Guide

This document explains how Razorpay payment integration works in the UX Skills Assessment application.

## Overview

The application uses Razorpay for processing premium payments. When a user wants to unlock premium features, they go through a Razorpay checkout flow.

## Environment Variables

Add these to your `.env` file:

```bash
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_live_RmlkjzjvO4xRPe
RAZORPAY_KEY_SECRET=zxhupRQjWS6ch4fwfwSmyS3a

# Optional: Customize amount (default: ₹999 = 99900 paise)
RAZORPAY_AMOUNT=999

# Optional: Customize currency (default: INR)
RAZORPAY_CURRENCY=INR
```

**Note**: For testing, use Razorpay test keys from your Razorpay dashboard.

## Payment Flow

1. **User clicks "Unlock Premium"**
   - Frontend calls `POST /api/premium/payments/create-order`
   - Backend creates a Razorpay order and returns order details

2. **Razorpay Checkout Opens**
   - Frontend opens Razorpay checkout modal with order details
   - User completes payment in Razorpay modal

3. **Payment Success Handler**
   - Razorpay calls the handler function with payment details
   - Frontend verifies payment with backend: `POST /api/premium/payments/verify`
   - Backend verifies payment signature and marks device as premium

4. **Redirect to Success Page**
   - User is redirected to `/premium/payment-success`
   - Success page confirms payment and unlocks premium features

## API Endpoints

### Create Order
```
POST /api/premium/payments/create-order
Body: {
  deviceId: string,
  redirectTo?: string,
  resultId?: string
}
Response: {
  orderId: string,
  amount: number,
  currency: string,
  keyId: string,
  callbackUrl: string,
  cancelUrl: string
}
```

### Verify Payment
```
POST /api/premium/payments/verify
Body: {
  orderId: string,
  paymentId: string,
  signature: string,
  deviceId: string,
  resultId?: string
}
Response: {
  success: boolean,
  premiumUnlocked: boolean,
  attemptCount: number,
  resultsUrl?: string
}
```

## Security

- Payment signatures are verified server-side using HMAC SHA256
- Device ID is validated to prevent unauthorized access
- Payment status is verified with Razorpay API before unlocking premium

## Testing

### Test Cards (Razorpay Test Mode)

Use these test card numbers in Razorpay test mode:

- **Success**: `4111 1111 1111 1111`
- **Failure**: `4000 0000 0000 0002`
- **3D Secure**: `4012 0010 3714 1112`

Any CVV and expiry date in the future will work.

### Test Mode Setup

1. Get test keys from Razorpay Dashboard → Settings → API Keys
2. Use test key ID and secret in `.env`
3. Test the payment flow with test cards

## Files Modified

- `server/lib/razorpay.ts` - Razorpay configuration and utilities
- `server/routes.ts` - Payment API endpoints
- `client/src/context/PremiumAccessContext.tsx` - Frontend payment flow
- `client/src/pages/premium/payment-success.tsx` - Payment success page
- `client/index.html` - Razorpay checkout script
- `client/src/types/razorpay.d.ts` - TypeScript definitions

## Migration from Stripe

The application previously used Stripe. The following changes were made:

- Replaced Stripe SDK with Razorpay SDK
- Changed payment endpoints from `/create-checkout-session` to `/create-order`
- Changed verification from GET with query params to POST with body
- Updated frontend to use Razorpay checkout modal instead of redirect

## Troubleshooting

### "Payment system not configured"
- Check that `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set in `.env`

### "Invalid payment signature"
- Ensure you're using the correct key secret
- Check that order ID and payment ID match what Razorpay sent

### Payment succeeds but premium not unlocked
- Check server logs for verification errors
- Verify device ID matches between order creation and verification
- Check that payment status is "captured" or "authorized"

## Production Checklist

- [ ] Switch to live Razorpay keys
- [ ] Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in production environment
- [ ] Test complete payment flow with real payment
- [ ] Set up Razorpay webhooks (optional, for additional verification)
- [ ] Monitor Razorpay dashboard for payments

## Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Checkout Integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/)
- [Razorpay Test Cards](https://razorpay.com/docs/payments/test-cards/)

