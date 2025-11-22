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

// Register API routes
await registerRoutes(app);

// Serve index.html for all other routes (SPA fallback)
app.use("*", (_req, res) => {
  const indexPath = path.resolve(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Not found");
  }
});

// Export for Vercel serverless
export default app;

