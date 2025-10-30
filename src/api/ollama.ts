// client-side API wrapper for the local proxy
export type Message = { id?: string; role: 'user' | 'assistant' | 'system'; content: string };

export async function generateWithOllama(messages: Message[], model = 'llama2') {
  const resp = await fetch('/api/ollama/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages })
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Generation failed: ${text}`);
  }

  try {
    return await resp.json();
  } catch {
    return await resp.text();
  }
}