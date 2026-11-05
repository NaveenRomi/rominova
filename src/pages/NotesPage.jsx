import React, { useState, useEffect } from 'react';
import { StickyNote, Plus, Trash2, Calendar, Search } from 'lucide-react';

const STORAGE_KEY = 'rominova_notes_data';

export default function NotesPage() {
  const [notes, setNotes] = useState(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    const newNote = {
      id: Date.now().toString(),
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      createdAt: new Date().toLocaleString([], { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setContent('');
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const filteredNotes = notes.filter((n) => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">
          <StickyNote size={26} color="#2dd4bf" /> Notes Workspace
        </h1>
        <p className="page-subtitle">Instant thought capture backed by persistent local storage</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
        {/* Creator Form */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>Compose Note</h2>
          <form onSubmit={handleAddNote} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <input
              type="text"
              placeholder="Note Headline..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
            />
            <textarea
              rows={5}
              placeholder="Enter note contents or checklist items..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea-field"
              required
            />
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              <Plus size={16} /> Save Note
            </button>
          </form>
        </div>

        {/* Notes Directory */}
        <div>
          <div style={{ marginBottom: '1rem', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '2.4rem' }}
            />
          </div>

          {filteredNotes.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
              No notes match your criteria.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {filteredNotes.map((note) => (
                <div key={note.id} className="glass-card" style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{note.title}</h3>
                    <button onClick={() => handleDelete(note.id)} className="btn-danger" title="Delete Note">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: '0.65rem 0', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                    {note.content}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' }}>
                    <Calendar size={12} /> {note.createdAt}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
