import fs from "node:fs";
import path from "node:path";
import express from "express";
import { app } from "./app";
import { registerRoutes } from "./routes";

const distPath = path.resolve(process.cwd(), "dist/public");

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

// Serve static files - allow fallthrough for non-existent files
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { 
    index: false, // Don't auto-serve index.html
    fallthrough: true // Continue to next middleware if file not found
  }));
}

// Serve index.html for all non-API routes (SPA fallback)
app.use("*", async (_req, res) => {
  // Handle API routes
  if (_req.path.startsWith("/api/")) {
    // Let the API routes handle it (they're already registered)
    return;
  }
  
  // Wait for routes to be ready
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
      res.setHeader("Content-Type", "text/html");
      res.sendFile(indexPath);
    } else {
      console.error("index.html not found at:", indexPath);
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error("Error serving file:", error);
    res.status(500).send("Internal server error");
  }
});

// Export for Vercel serverless
export default app;

