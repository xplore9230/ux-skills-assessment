#!/usr/bin/env node
import { readdirSync, copyFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

const src = join(rootDir, "server_py", "pregenerated_data");
const dest = join(rootDir, "api", "pregenerated_data");

if (!existsSync(src)) {
  console.warn("Source pregenerated_data not found:", src);
  process.exit(0);
}

if (!existsSync(dest)) {
  mkdirSync(dest, { recursive: true });
}

const files = readdirSync(src).filter((f) => f.endsWith(".json"));
let copied = 0;

for (const file of files) {
  try {
    copyFileSync(join(src, file), join(dest, file));
    copied++;
  } catch (error) {
    console.error(`Error copying ${file}:`, error);
  }
}

console.log(`Copied ${copied} pregenerated JSON files to api/pregenerated_data`);

// Also copy the bundled Vercel server file to api/ directory for serverless function
const vercelServerSrc = join(rootDir, "dist", "index-vercel.js");
const vercelServerDest = join(rootDir, "api", "index-vercel.js");

if (existsSync(vercelServerSrc)) {
  try {
    copyFileSync(vercelServerSrc, vercelServerDest);
    console.log("Copied dist/index-vercel.js to api/index-vercel.js");
  } catch (error) {
    console.error("Error copying index-vercel.js:", error);
  }
} else {
  console.warn("dist/index-vercel.js not found - make sure build completed successfully");
}

