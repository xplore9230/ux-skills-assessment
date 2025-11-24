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

// Initialize routes asynchronously
let routesInitialized = false;
let routesInitPromise: Promise<void> | null = null;

const initRoutes = async (): Promise<void> => {
  if (!routesInitialized) {
    if (!routesInitPromise) {
      routesInitPromise = registerRoutes(app).then(() => {
        routesInitialized = true;
      }).catch((err) => {
        console.error("Failed to initialize routes:", err);
        routesInitialized = false;
        routesInitPromise = null;
        throw err;
      });
    }
    await routesInitPromise;
  }
};

// Serve index.html for all other routes (SPA fallback)
app.use("*", async (_req, res) => {
  try {
    // Ensure routes are initialized before handling requests
    await initRoutes();
    
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error("Error in catch-all route:", error);
    res.status(500).send("Internal server error");
  }
});

// Start initialization immediately (non-blocking)
initRoutes().catch((err) => {
  console.error("Initial route initialization failed:", err);
});

// Export for Vercel serverless
export default app;

