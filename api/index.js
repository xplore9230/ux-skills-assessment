// Vercel serverless entry point
// We resolve the path to the bundled Express app in a robust way so it works
// both locally and in Vercel's /var/task deployment environment.
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the bundled server file relative to this file
const handlerPath = path.join(__dirname, "..", "dist", "index-vercel.js");

let handlerPromise = import(handlerPath).then((mod) => mod.default);

export default async function vercelHandler(req, res) {
  try {
    const handler = await handlerPromise;
    // The bundled export is the Express app, which is also a request handler
    return handler(req, res);
  } catch (err) {
    console.error("Failed to load Vercel handler from dist/index-vercel.js", err);
    // Basic 500 response so we get a clear error instead of a crash
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Internal server error - failed to load server bundle",
      }),
    );
  }
}


