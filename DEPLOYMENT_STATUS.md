# Deployment readiness (Railway)

The backend now deploys to Railway via the provided Dockerfile so the full AI stack (Ollama + Llama) ships with the service:

- **Builder**: Railway uses the root `Dockerfile` to install Ollama inside the container. The image preloads the `llama3.2` model during build, then the entrypoint starts `ollama serve`, verifies the model, and launches FastAPI.
- **Start / port binding**: The entrypoint runs `uvicorn main:app` from `server_py`, binding to `0.0.0.0` on the platform-provided `$PORT` (default 8000 locally). The Railway `startCommand` is pinned to the entrypoint so the platform does not try to execute shell snippets like `cd` directly.
- **Health check**: `/health` from `server_py/main.py` is exposed for Railway health monitoring.

## What to verify before deploying
- Railway instances need enough memory/CPU for Ollama and the Llama model. Use a plan that can handle `ollama serve` + `llama3.2` (consider smaller models if resources are tight).
- Because `llama3.2` is baked into the image, ensure the image size is acceptable for your plan and registry limits. If a lighter footprint is required, switch to a smaller model or pull at runtime.
- If you plan to use the RAG features, confirm that required vector store dependencies are available (installed via `requirements.txt`) and that any necessary data initialization has run.
