# Premium Feature - Quick Reference Card

## 🚀 Quick Start

### 1. Add to `.env`
```bash
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PRICE_ID=price_your_price_here
```

### 2. Test Backend
```bash
node test-premium-endpoints.js
```

### 3. Test Frontend
Visit: http://localhost:3001/premium/quiz

---

## 📋 Routes

| Route | Purpose |
|-------|---------|
| `/premium/quiz` | Quiz with 2-attempt limit |
| `/premium/results` | Results with gated content |
| `/premium/payment-success` | Payment confirmation |

---

## 🔌 API Endpoints

### Access Tracking
```bash
GET  /api/premium/access/status?deviceId=xxx
POST /api/premium/access/increment
POST /api/premium/access/set-premium
```

### Payments
```bash
POST /api/premium/payments/create-checkout-session
GET  /api/premium/payments/confirm?session_id=xxx&deviceId=xxx
```

---

## 💳 Stripe Test Cards

| Card | Result |
|------|--------|
| `4242 4242 4242 4242` | ✅ Success |
| `4000 0000 0000 0002` | ❌ Declined |
| `4000 0025 0000 3155` | 🔐 3D Secure |

*Use any future date, any CVC, any ZIP*

---

## 🎯 What's Gated

| Content | Free | Premium |
|---------|------|---------|
| Quiz Attempts | 2 | ∞ |
| Curated Articles | 2 | All |
| Deep Insights | 1 | All |
| Podcasts | 1 | All |
| Skill Checklists | 2 items | All items |

---

## 📁 Key Files

### Backend
- `server/lib/stripe.ts` - Stripe config
- `server/routes.ts` - Premium endpoints
- `server/storage.ts` - Device tracking

### Frontend
- `client/src/context/PremiumAccessContext.tsx` - State
- `client/src/components/PremiumPaywall.tsx` - UI
- `client/src/pages/premium/` - Premium pages

### Docs
- `PREMIUM_SETUP_GUIDE.md` - Setup steps
- `PREMIUM_FEATURE_README.md` - Full docs
- `test-premium-endpoints.js` - Tests

---

## 🔧 Troubleshooting

### "Payment system not configured"
→ Add `STRIPE_SECRET_KEY` to `.env`

### "Payment pricing not configured"
→ Add `STRIPE_PRICE_ID` to `.env`

### Device ID resets
→ Check localStorage is enabled

### Payment succeeds but not unlocked
→ Check backend logs, refresh page

---

## ✅ Testing Checklist

- [ ] Backend tests pass
- [ ] Can take quiz twice
- [ ] Third attempt shows paywall
- [ ] Payment flow works
- [ ] Premium unlocks all content
- [ ] Original routes unchanged

---

## 🎨 Usage Example

```typescript
// In any component
import { usePremiumAccess } from '@/context/PremiumAccessContext';

function MyComponent() {
  const { 
    premiumUnlocked, 
    attemptCount, 
    canTakePremiumQuiz,
    startCheckout 
  } = usePremiumAccess();
  
  if (!premiumUnlocked) {
    return <PremiumPaywall />;
  }
  
  return <PremiumContent />;
}
```

---

## 📊 Environment Setup

### Development
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
```

### Production
```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...  # Optional
```

---

## 🎯 Implementation Status

✅ Backend API (6 endpoints)  
✅ Frontend Context & Hooks  
✅ Premium Paywall UI  
✅ Quiz Wrapper (2-attempt limit)  
✅ Results Wrapper (content gating)  
✅ Payment Success Page  
✅ Stripe Integration  
✅ Documentation  
✅ Test Scripts  

**Status**: 🟢 Production Ready

---

## 📞 Quick Links

- [Setup Guide](PREMIUM_SETUP_GUIDE.md)
- [Full Documentation](PREMIUM_FEATURE_README.md)
- [Implementation Summary](PREMIUM_IMPLEMENTATION_SUMMARY.md)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [Stripe Docs](https://stripe.com/docs)

---

**Need Help?** Check the setup guide or run the test script first!

