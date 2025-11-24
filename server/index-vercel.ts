import fs from "node:fs";
import path from "node:path";
import express from "express";
import { app } from "./app";
import { registerRoutes } from "./routes";

// Serve static files
const distPath = path.resolve(process.cwd(), "dist/public");

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Initialize routes - use IIFE to handle async initialization
let routesReady = false;
let routesError: Error | null = null;

(async () => {
  try {
    await registerRoutes(app);
    routesReady = true;
  } catch (err) {
    console.error("Failed to initialize routes:", err);
    routesError = err instanceof Error ? err : new Error(String(err));
  }
})();

// Serve index.html for all other routes (SPA fallback)
app.use("*", async (_req, res) => {
  // Wait for routes to be ready (max 5 seconds)
  let attempts = 0;
  while (!routesReady && !routesError && attempts < 500) {
    await new Promise(resolve => setTimeout(resolve, 10));
    attempts++;
  }
  
  if (routesError) {
    console.error("Routes initialization error:", routesError);
    return res.status(500).send("Internal server error");
  }
  
  if (!routesReady) {
    return res.status(503).send("Service initializing, please try again");
  }
  
  try {
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error("Error serving file:", error);
    res.status(500).send("Internal server error");
  }
});

// Export for Vercel serverless
export default app;

