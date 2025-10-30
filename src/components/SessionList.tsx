import React from 'react';

type SessionMeta = {
  id: string;
  title: string;
  createdAt: string;
};

export default function SessionList({
  sessions,
  selectedId,
  onSelect,
  onNew,
  onDelete
}: {
  sessions: SessionMeta[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div style={{ width: 280, borderRight: '1px solid #eee', padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <strong>Sessions</strong>
        <button onClick={onNew}>New</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {sessions.map(s => (
          <li
            key={s.id}
            onClick={() => onSelect(s.id)}
            style={{
              padding: '8px 6px',
              marginBottom: 6,
              cursor: 'pointer',
              background: s.id === selectedId ? '#f0f8ff' : 'transparent',
              borderRadius: 6
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{s.title || 'Untitled'}</div>
                <small style={{ color: '#666' }}>{new Date(s.createdAt).toLocaleString()}</small>
              </div>
              <div>
                <button onClick={(e) => { e.stopPropagation(); onDelete(s.id); }} aria-label="delete">🗑</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}