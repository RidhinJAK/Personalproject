import React, { useEffect, useMemo, useState } from 'react';
import SessionList from './SessionList';
import ChatWindow from './ChatWindow';
import type { Message } from '../api/ollama';
import { v4 as uuidv4 } from 'uuid';

type Session = {
  id: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
};

const STORAGE_KEY = 'ollama_sessions_v1';

function loadSessions(): Session[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Session[];
  } catch {
    return [];
  }
}

function saveSessions(sessions: Session[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export default function ChatApp() {
  const [sessions, setSessions] = useState<Session[]>(() => loadSessions());
  const [selectedId, setSelectedId] = useState<string | undefined>(() => sessions[0]?.id);

  useEffect(() => {
    saveSessions(sessions);
    if (!selectedId && sessions.length) {
      setSelectedId(sessions[0].id);
    }
  }, [sessions]);

  const selected = useMemo(() => sessions.find(s => s.id === selectedId), [sessions, selectedId]);

  function createSession() {
    const s: Session = {
      id: uuidv4(),
      title: 'New Chat',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }]
    };
    setSessions(prev => [s, ...prev]);
    setSelectedId(s.id);
  }

  function deleteSession(id: string) {
    setSessions(prev => prev.filter(p => p.id !== id));
    if (selectedId === id) {
      setSelectedId((prev) => {
        const remaining = sessions.filter(s => s.id !== id);
        return remaining[0]?.id;
      });
    }
  }

  function appendMessageToSession(sessionId: string, message: Message) {
    setSessions(prev => {
      return prev.map(s => {
        if (s.id !== sessionId) return s;
        const updated = { ...s, messages: [...s.messages, message], updatedAt: new Date().toISOString() };
        return updated;
      });
    });
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SessionList
        sessions={sessions.map(s => ({ id: s.id, title: s.title || 'Untitled', createdAt: s.createdAt }))}
        selectedId={selectedId}
        onSelect={(id) => setSelectedId(id)}
        onNew={createSession}
        onDelete={deleteSession}
      />
      {selected ? (
        <ChatWindow
          session={selected}
          onAppendMessage={(m) => appendMessageToSession(selected.id, m)}
        />
      ) : (
        <div style={{ flex: 1, padding: 24 }}>No session selected</div>
      )}
    </div>
  );
}