````markdown
# Ollama Chat Integration (local)

This document explains how to run Ollama locally, run the proxy server included in `server/`, and run the client app (the client side expects the proxy to be reachable at /api/ollama/generate).

## Requirements
- Node.js 18+ (or a Node version that provides global fetch) — server uses node-fetch to be safer.
- Ollama installed locally and a model pulled.
  - macOS: `brew install ollama` or follow instructions at https://ollama.com
  - Linux/Windows: see Ollama docs
- A model available locally, e.g. `ollama pull <model-name>`

## Start Ollama
1. Pull a model: `ollama pull <model-name>`
2. Ensure Ollama daemon is running and the HTTP API is reachable (default `http://localhost:11434`).
   - Example check: `curl http://localhost:11434/` (API root may vary with Ollama versions)

## Start the proxy server
1. cd server
2. npm install
3. Edit `server/src/index.ts` if you use a different Ollama base URL, or set `OLLAMA_URL` env var.
4. npm run dev
   - This starts a small Express proxy on port 3001 by default. It exposes POST `/api/ollama/generate`.

## Start the client
- The client code expects the proxy path at `/api/ollama/generate`. If your client runs on a different port (e.g., Vite default 5173), set up a dev proxy in Vite or use a reverse proxy so client -> server works.
- Example Vite config snippet (vite.config.ts):
```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false
    }
  }
}
```

## Quick test
1. Create a new session in the UI and send a message.
2. The client will POST to `/api/ollama/generate` which forwards to your local Ollama instance.

## Security notes
- Keep Ollama bound to localhost and only access via the server proxy.
- Protect the proxy endpoint if you expose it externally (auth, network rules).
- Review model licenses and local resource usage (RAM/CPU).

## Troubleshooting
- Connection refused: make sure Ollama daemon is running.
- Model not loaded: ensure the model was pulled with `ollama pull`.
- Unexpected response: check the local Ollama API docs for model-specific payloads (some models accept messages arrays rather than a single prompt).
````