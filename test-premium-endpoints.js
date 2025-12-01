/**
 * Simple test script for premium API endpoints
 * Run with: node test-premium-endpoints.js
 * 
 * Make sure the server is running on http://localhost:3001
 */

const BASE_URL = "http://localhost:3001";
const TEST_DEVICE_ID = `test-device-${Date.now()}`;

async function testEndpoint(name, method, url, body = null) {
  console.log(`\n🧪 Testing: ${name}`);
  console.log(`   ${method} ${url}`);
  
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    
    if (body) {
      options.body = JSON.stringify(body);
      console.log(`   Body: ${JSON.stringify(body, null, 2)}`);
    }
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`   ✅ Success (${response.status})`);
      console.log(`   Response:`, JSON.stringify(data, null, 2));
      return { success: true, data };
    } else {
      console.log(`   ❌ Failed (${response.status})`);
      console.log(`   Error:`, JSON.stringify(data, null, 2));
      return { success: false, data };
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log("=".repeat(60));
  console.log("Premium API Endpoints Test Suite");
  console.log("=".repeat(60));
  console.log(`Test Device ID: ${TEST_DEVICE_ID}`);
  
  // Test 1: Get initial access status (should create device with 0 attempts)
  const test1 = await testEndpoint(
    "Get Access Status (Initial)",
    "GET",
    `${BASE_URL}/api/premium/access/status?deviceId=${TEST_DEVICE_ID}`
  );
  
  if (!test1.success || test1.data.attemptCount !== 0 || test1.data.premiumUnlocked !== false) {
    console.log("\n❌ Test 1 Failed: Expected attemptCount=0, premiumUnlocked=false");
    return;
  }
  
  // Test 2: Increment attempt count
  const test2 = await testEndpoint(
    "Increment Attempt Count",
    "POST",
    `${BASE_URL}/api/premium/access/increment`,
    { deviceId: TEST_DEVICE_ID }
  );
  
  if (!test2.success || test2.data.attemptCount !== 1) {
    console.log("\n❌ Test 2 Failed: Expected attemptCount=1");
    return;
  }
  
  // Test 3: Increment again
  const test3 = await testEndpoint(
    "Increment Attempt Count Again",
    "POST",
    `${BASE_URL}/api/premium/access/increment`,
    { deviceId: TEST_DEVICE_ID }
  );
  
  if (!test3.success || test3.data.attemptCount !== 2) {
    console.log("\n❌ Test 3 Failed: Expected attemptCount=2");
    return;
  }
  
  // Test 4: Verify status reflects increments
  const test4 = await testEndpoint(
    "Get Access Status (After Increments)",
    "GET",
    `${BASE_URL}/api/premium/access/status?deviceId=${TEST_DEVICE_ID}`
  );
  
  if (!test4.success || test4.data.attemptCount !== 2 || test4.data.premiumUnlocked !== false) {
    console.log("\n❌ Test 4 Failed: Expected attemptCount=2, premiumUnlocked=false");
    return;
  }
  
  // Test 5: Set device to premium
  const test5 = await testEndpoint(
    "Set Premium Status",
    "POST",
    `${BASE_URL}/api/premium/access/set-premium`,
    { deviceId: TEST_DEVICE_ID, premiumUnlocked: true }
  );
  
  if (!test5.success || test5.data.premiumUnlocked !== true) {
    console.log("\n❌ Test 5 Failed: Expected premiumUnlocked=true");
    return;
  }
  
  // Test 6: Try to increment after premium (should not increment)
  const test6 = await testEndpoint(
    "Increment After Premium (Should Not Increment)",
    "POST",
    `${BASE_URL}/api/premium/access/increment`,
    { deviceId: TEST_DEVICE_ID }
  );
  
  if (!test6.success || test6.data.attemptCount !== 2) {
    console.log("\n❌ Test 6 Failed: Expected attemptCount to stay at 2 (not increment)");
    return;
  }
  
  // Test 7: Verify final status
  const test7 = await testEndpoint(
    "Get Access Status (Final)",
    "GET",
    `${BASE_URL}/api/premium/access/status?deviceId=${TEST_DEVICE_ID}`
  );
  
  if (!test7.success || test7.data.attemptCount !== 2 || test7.data.premiumUnlocked !== true) {
    console.log("\n❌ Test 7 Failed: Expected attemptCount=2, premiumUnlocked=true");
    return;
  }
  
  // Test 8: Test Stripe checkout session creation (will fail if Stripe not configured)
  console.log("\n⚠️  Note: The following test requires Stripe to be configured");
  const test8 = await testEndpoint(
    "Create Checkout Session",
    "POST",
    `${BASE_URL}/api/premium/payments/create-checkout-session`,
    { deviceId: TEST_DEVICE_ID, redirectTo: "/premium/results" }
  );
  
  if (test8.success) {
    console.log("   ✅ Stripe is configured and checkout session created");
  } else {
    console.log("   ⚠️  Stripe not configured (expected in development)");
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("✅ All Core Tests Passed!");
  console.log("=".repeat(60));
  console.log("\nSummary:");
  console.log("- Device access tracking: ✅");
  console.log("- Attempt count increment: ✅");
  console.log("- Premium unlock: ✅");
  console.log("- Premium blocks increments: ✅");
  console.log(`- Stripe integration: ${test8.success ? '✅' : '⚠️  (not configured)'}`);
  console.log("\nNext Steps:");
  console.log("1. Configure Stripe keys in .env");
  console.log("2. Test frontend premium routes");
  console.log("3. Test complete payment flow with Stripe test cards");
}

// Run tests
runTests().catch(error => {
  console.error("\n❌ Test suite failed:", error);
  process.exit(1);
});

