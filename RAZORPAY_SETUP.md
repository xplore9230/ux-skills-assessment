# Razorpay Integration Setup Guide

This guide will help you configure Razorpay payment gateway for the premium features.

## 🔑 Environment Variables

Add the following environment variables to your `.env` file in the project root:

```env
# Razorpay API Keys (from your Razorpay dashboard)
RAZORPAY_KEY_ID=rzp_live_RmlkjzjvO4xRPe
RAZORPAY_KEY_SECRET=zxhupRQjWS6ch4fwfwSmyS3a

# Payment Amount (in rupees, will be converted to paise automatically)
# Default: 999 (₹999)
RAZORPAY_AMOUNT=999

# Currency (default: INR)
RAZORPAY_CURRENCY=INR
```

## 📝 Steps to Configure

### 1. Create `.env` file

If you don't have a `.env` file, create one in the project root:

```bash
touch .env
```

### 2. Add Razorpay Keys

Open `.env` and add your Razorpay keys:

```env
RAZORPAY_KEY_ID=rzp_live_RmlkjzjvO4xRPe
RAZORPAY_KEY_SECRET=zxhupRQjWS6ch4fwfwSmyS3a
RAZORPAY_AMOUNT=999
RAZORPAY_CURRENCY=INR
```

### 3. Restart the Server

After adding the environment variables, restart your development server:

```bash
npm run dev
```

## 🔍 How It Works

### Backend Flow

1. **Order Creation** (`POST /api/premium/payments/create-order`):
   - Creates a Razorpay order with the specified amount
   - Returns order details including `orderId` and `keyId`

2. **Payment Verification** (`POST /api/premium/payments/verify`):
   - Verifies the payment signature
   - Confirms payment status with Razorpay
   - Unlocks premium access for the device

### Frontend Flow

1. User clicks "Unlock now" in the paywall modal
2. Frontend calls `/api/premium/payments/create-order`
3. Razorpay checkout modal opens with order details
4. User completes payment
5. Razorpay redirects to `/premium/payment-success`
6. Frontend verifies payment with backend
7. Premium access is unlocked

## 🧪 Testing

### Test Mode

For testing, you can use Razorpay's test mode keys:

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to Settings → API Keys
3. Generate test keys
4. Update `.env` with test keys

### Test Cards

Razorpay provides test cards for different scenarios:
- **Success**: Use any card with CVV and future expiry date
- **Failure**: Use specific failure codes

Check [Razorpay Testing Documentation](https://razorpay.com/docs/payments/payments/test-card-details/) for details.

## ✅ Verification

To verify Razorpay is configured correctly:

1. Check server logs on startup - you should NOT see:
   ```
   ⚠️  RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not configured
   ```

2. Test the payment flow:
   - Navigate to results page
   - Click on any "Unlock" button
   - Razorpay checkout modal should open

3. Check Razorpay Dashboard:
   - Go to Payments section
   - Verify orders are being created
   - Check payment status

## 🚨 Troubleshooting

### Payment modal not opening

- Check browser console for errors
- Verify Razorpay script is loaded (check `index.html`)
- Ensure `RAZORPAY_KEY_ID` is set correctly

### Payment verification fails

- Check that `RAZORPAY_KEY_SECRET` matches your key ID
- Verify signature verification logic in `server/lib/razorpay.ts`
- Check server logs for detailed error messages

### Amount mismatch

- Verify `RAZORPAY_AMOUNT` is set correctly (in rupees)
- Amount is automatically converted to paise (×100)

## 📚 Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Node.js SDK](https://github.com/razorpay/razorpay-node)
- [Razorpay Dashboard](https://dashboard.razorpay.com/)

## 🔐 Security Notes

1. **Never commit `.env` file** to version control
2. **Use different keys** for development and production
3. **Keep keys secure** - rotate them if exposed
4. **Verify signatures** on backend (already implemented)

## 🎯 Current Configuration

Based on your provided keys:
- **Key ID**: `rzp_live_RmlkjzjvO4xRPe` (Live mode)
- **Amount**: ₹999 (default, configurable via `RAZORPAY_AMOUNT`)
- **Currency**: INR

The integration is production-ready with live keys!



