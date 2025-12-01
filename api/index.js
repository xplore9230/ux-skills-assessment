// Vercel serverless entry point
// Import the bundled Express app from the same directory (copied during build)
// This ensures it's available in Vercel's /var/task/api/ environment
import handler from "./index-vercel.js";

// Export the Express app directly - Vercel will use it as the serverless handler
export default handler;


