import React from 'react';
import { 
  Calculator, 
  Calendar, 
  StickyNote, 
  ArrowLeftRight, 
  Terminal, 
  ArrowUpRight, 
  Zap, 
  Shield, 
  Layers 
} from 'lucide-react';

const apps = [
  {
    title: 'Calculator',
    desc: 'Standard arithmetic calculations with memory-grade precision, percent handling, and backspace correction.',
    path: '#/calculator',
    icon: Calculator,
    tag: 'Utility'
  },
  {
    title: 'Calendar',
    desc: 'Interactive monthly matrix with event tracking, active date selections, and offline persistent storage.',
    path: '#/calendar',
    icon: Calendar,
    tag: 'Productivity'
  },
  {
    title: 'Notes',
    desc: 'Organized card-based note taking with instant creation timestamps and persistent browser retention.',
    path: '#/notes',
    icon: StickyNote,
    tag: 'Workspace'
  },
  {
    title: 'Converter',
    desc: 'Multi-category metric & imperial transformation engine for length, mass, and temperature systems.',
    path: '#/converter',
    icon: ArrowLeftRight,
    tag: 'Computation'
  },
  {
    title: 'Dev Tools',
    desc: 'Essential developer utilities: JSON formatter/minifier, Base64 encoder/decoder, and URL string codec.',
    path: '#/dev-tools',
    icon: Terminal,
    tag: 'Engineering'
  }
];

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <section style={{ textAlign: 'center', padding: '2.5rem 0 1.5rem 0' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.9rem',
          borderRadius: '9999px',
          background: 'rgba(20, 184, 166, 0.1)',
          border: '1px solid rgba(45, 212, 191, 0.25)',
          color: '#2dd4bf',
          fontSize: '0.8rem',
          fontWeight: 600,
          marginBottom: '1rem'
        }}>
          <Zap size={14} /> Personal Productivity Suite
        </div>
        <h1 style={{ 
          fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', 
          fontWeight: 800, 
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: '0.8rem' 
        }}>
          Build. Explore. Simplify.
        </h1>
        <p style={{ 
          color: 'var(--text-muted)', 
          maxWidth: '580px', 
          margin: '0 auto', 
          fontSize: '1.05rem' 
        }}>
          A curated ecosystem of client-side developer and productivity micro-apps engineered for speed, clean UX, and zero server overhead.
        </p>
      </section>

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.25rem'
      }}>
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <a
              key={app.title}
              href={app.path}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
              }}
              className="glass-card app-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.4)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(6, 182, 212, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.35)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(20, 184, 166, 0.12)',
                    border: '1px solid rgba(45, 212, 191, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2dd4bf'
                  }}>
                    <Icon size={22} />
                  </div>
                  <span style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-muted)'
                  }}>
                    {app.tag}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {app.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  {app.desc}
                </p>
              </div>

              <div style={{ 
                marginTop: '1.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.35rem', 
                color: '#2dd4bf', 
                fontSize: '0.85rem', 
                fontWeight: 600 
              }}>
                Launch Tool <ArrowUpRight size={16} />
              </div>
            </a>
          );
        })}
      </section>

      <section className="glass-card" style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
          <Shield size={20} color="#2dd4bf" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>100% Client-Side Privacy</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Data never leaves your browser. State is backed entirely by local storage mechanisms.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
          <Layers size={20} color="#06b6d4" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Unified Dark Architecture</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Consistent cyan & navy design system optimized for long sessions and low eye fatigue.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
