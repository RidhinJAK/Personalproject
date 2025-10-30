import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://localhost:11434';

function buildPrompt(messages: Array<any>): string {
  const system = messages.filter(m => m.role === 'system').map(m => m.content).join('\n');
  const body = messages
    .filter(m => m.role !== 'system')
    .map(m => `${m.role.toUpperCase()}: ${m.content}`)
    .join('\n\n');
  return (system ? `SYSTEM:\n${system}\n\n` : '') + body;
}

app.post('/api/ollama/generate', async (req, res) => {
  try {
    const { model = 'llama2', messages = [], parameters = {} } = req.body;

    const payload: any = {
      model,
      prompt: buildPrompt(messages),
      ...parameters
    };

    const resp = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const text = await resp.text();

    try {
      const json = JSON.parse(text);
      res.json(json);
    } catch {
      res.status(resp.status).send(text);
    }
  } catch (err: any) {
    console.error('Ollama proxy error:', err);
    res.status(500).json({ error: err?.message ?? 'unknown' });
  }
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Ollama proxy server listening on http://localhost:${PORT}`);
});
