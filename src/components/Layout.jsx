import React from 'react';
import { 
  Sparkles, 
  Calculator, 
  Calendar, 
  StickyNote, 
  ArrowLeftRight, 
  Terminal,
  Grid 
} from 'lucide-react';

const navItems = [
  { path: '#/', label: 'Apps', icon: Grid },
  { path: '#/calculator', label: 'Calculator', icon: Calculator },
  { path: '#/calendar', label: 'Calendar', icon: Calendar },
  { path: '#/notes', label: 'Notes', icon: StickyNote },
  { path: '#/converter', label: 'Converter', icon: ArrowLeftRight },
  { path: '#/dev-tools', label: 'Dev Tools', icon: Terminal },
];

export default function Layout({ currentRoute, children }) {
  return (
    <div className="layout-shell">
      <header className="navbar">
        <div className="nav-container">
          <a href="#/" className="brand-link">
            <div className="brand-icon">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="brand-title">RomiNova</span>
            </div>
          </a>

          <nav className="nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.path || (item.path === '#/' && currentRoute === '');
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <p>RomiNova &bull; Build. Explore. Simplify. &bull; Engineered for high productivity.</p>
      </footer>
    </div>
  );
}
