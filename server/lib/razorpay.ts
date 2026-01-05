import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay with keys from environment variables
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

if (!razorpayKeyId || !razorpayKeySecret) {
  console.warn("⚠️  RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not configured. Premium payment features will not work.");
}

// Create and export the Razorpay client
export const razorpay = razorpayKeyId && razorpayKeySecret
  ? new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    })
  : null;

// Helper to check if Razorpay is configured
export function isRazorpayConfigured(): boolean {
  return razorpay !== null && razorpayKeyId !== undefined && razorpayKeySecret !== undefined;
}

// Get the amount in paise (Razorpay uses smallest currency unit)
// Default amount: ₹999 = 99900 paise
export function getRazorpayAmount(): number {
  const amountStr = process.env.RAZORPAY_AMOUNT;
  if (amountStr) {
    const amount = parseFloat(amountStr);
    return Math.round(amount * 100); // Convert to paise
  }
  return 99900; // Default ₹999
}

// Get currency (default: INR)
export function getRazorpayCurrency(): string {
  return process.env.RAZORPAY_CURRENCY || "INR";
}

// Verify payment signature
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!razorpayKeySecret) {
    return false;
  }

  const payload = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", razorpayKeySecret)
    .update(payload)
    .digest("hex");

  return expectedSignature === signature;
}

