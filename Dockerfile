# Use Python 3.11 base image
FROM python:3.11-bullseye

# Install system dependencies and Ollama
RUN apt-get update && \
    apt-get install -y curl bash && \
    curl -fsSL https://ollama.com/install.sh | sh && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /code

# Copy Python requirements and install
COPY server_py/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire server_py directory
COPY server_py/ .

# Create an entrypoint script
RUN printf '#!/bin/bash\n\
set -m\n\
echo "Starting Ollama server..."\n\
ollama serve &\n\
echo "Waiting for Ollama to initialize..."\n\
sleep 5\n\
for i in {1..20}; do\n\
  if curl -s http://localhost:11434/api/tags >/dev/null 2>&1; then\n\
    echo "Ollama is ready"\n\
    break\n\
  fi\n\
  echo "Waiting for Ollama... ($i/20)"\n\
  sleep 2\n\
done\n\
echo "Pulling llama3.2 model (background)..."\n\
nohup ollama pull llama3.2 > /tmp/ollama-pull.log 2>&1 &\n\
echo "Starting FastAPI application..."\n\
exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}\n\
' > /code/entrypoint.sh && chmod +x /code/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/code/entrypoint.sh"]
