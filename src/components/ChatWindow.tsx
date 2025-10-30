import React, { useState } from 'react';
import { generateWithOllama, Message } from '../api/ollama';

export default function ChatWindow({
  session,
  onAppendMessage,
}: {
  session: { id: string; messages: Message[]; title?: string };
  onAppendMessage: (m: Message) => void;
}) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { role: 'user', content: text };
    onAppendMessage(userMsg);
    setInput('');
    setLoading(true);
    try {
      const resp: any = await generateWithOllama([...session.messages, userMsg]);
      let assistantText = '';
      if (typeof resp === 'string') {
        assistantText = resp;
      } else if (resp?.output) {
        assistantText = Array.isArray(resp.output) ? resp.output.join('\n') : String(resp.output);
      } else if (resp?.choices?.[0]?.message?.content) {
        assistantText = resp.choices[0].message.content;
      } else {
        assistantText = JSON.stringify(resp);
      }

      const assistantMsg: Message = { role: 'assistant', content: assistantText };
      onAppendMessage(assistantMsg);
    } catch (err: any) {
      onAppendMessage({ role: 'assistant', content: `Error: ${err?.message ?? 'unknown'}` });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 12 }}>
      <div style={{ flex: 1, overflow: 'auto', marginBottom: 8 }}>
        {session.messages.map((m, i) => (
          <div key={i} style={{ margin: '6px 0' }}>
            <div style={{ fontSize: 12, color: '#333', fontWeight: 600 }}>{m.role}</div>
            <div style={{ whiteSpace: 'pre-wrap', marginTop: 4 }}>{m.content}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          style={{ flex: 1, padding: 8 }}
          placeholder="Type a message..."
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button onClick={handleSend} disabled={loading} style={{ marginBottom: 6 }}>
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}