#!/usr/bin/env bash
echo "Checking Ollama server..."
if curl -s http://127.0.0.1:11434/api/tags >/dev/null; then
  echo "Ollama is reachable at http://127.0.0.1:11434"
else
  echo "Cannot reach Ollama at http://127.0.0.1:11434. Start Ollama with: ollama serve"
fi
echo "If you get a memory error when loading a model, pull a smaller model with e.g.:"
echo "  ollama pull llama3:8b"
echo "Then update VITE_OLLAMA_MODEL in .env or .env.local"
