import React, { useState } from 'react';
import { Terminal, Copy, Check, Minimize2, Maximize2 } from 'lucide-react';

export default function DevToolsPage() {
  const [activeTab, setActiveTab] = useState('json');
  const [copied, setCopied] = useState(false);

  // States
  const [jsonInput, setJsonInput] = useState('{\n  "project": "RomiNova",\n  "status": "operational"\n}');
  const [jsonError, setJsonError] = useState('');

  const [b64Input, setB64Input] = useState('Build. Explore. Simplify.');
  const [b64Output, setB64Output] = useState('');

  const [urlInput, setUrlInput] = useState('https://rominova.app/search?query=react components&type=standard');
  const [urlOutput, setUrlOutput] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // JSON Handlers
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setJsonError('');
    } catch (err) {
      setJsonError(`Invalid JSON: ${err.message}`);
    }
  };

  const handleMinifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed));
      setJsonError('');
    } catch (err) {
      setJsonError(`Invalid JSON: ${err.message}`);
    }
  };

  // Base64 Handlers
  const handleEncodeB64 = () => {
    try {
      setB64Output(btoa(b64Input));
    } catch (err) {
      setB64Output(`Encoding Error: ${err.message}`);
    }
  };

  const handleDecodeB64 = () => {
    try {
      setB64Output(atob(b64Input));
    } catch (err) {
      setB64Output(`Decoding Error: Invalid Base64 sequence`);
    }
  };

  // URL Handlers
  const handleEncodeUrl = () => {
    try {
      setUrlOutput(encodeURIComponent(urlInput));
    } catch (err) {
      setUrlOutput(`Error: ${err.message}`);
    }
  };

  const handleDecodeUrl = () => {
    try {
      setUrlOutput(decodeURIComponent(urlInput));
    } catch (err) {
      setUrlOutput(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">
          <Terminal size={26} color="#2dd4bf" /> Developer Utility Kit
        </h1>
        <p className="page-subtitle">Standard string manipulations, encoder algorithms, and JSON formatting</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {[
          { id: 'json', label: 'JSON Formatter' },
          { id: 'base64', label: 'Base64 Codec' },
          { id: 'url', label: 'URL Codec' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: '8px',
              border: activeTab === tab.id ? '1px solid #14b8a6' : '1px solid var(--border-subtle)',
              background: activeTab === tab.id ? 'rgba(20, 184, 166, 0.15)' : 'rgba(255,255,255,0.03)',
              color: activeTab === tab.id ? '#2dd4bf' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'json' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={handleFormatJson} className="btn-secondary" style={{ fontSize: '0.82rem' }}>
                <Maximize2 size={14} /> Prettify
              </button>
              <button onClick={handleMinifyJson} className="btn-secondary" style={{ fontSize: '0.82rem' }}>
                <Minimize2 size={14} /> Minify
              </button>
            </div>
            <button onClick={() => copyToClipboard(jsonInput)} className="btn-secondary" style={{ fontSize: '0.82rem' }}>
              {copied ? <Check size={14} color="#2dd4bf" /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <textarea
            rows={14}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="textarea-field"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}
          />

          {jsonError && (
            <div style={{ marginTop: '0.75rem', padding: '0.6rem', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', fontSize: '0.82rem' }}>
              {jsonError}
            </div>
          )}
        </div>
      )}

      {activeTab === 'base64' && (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Source String</label>
            <textarea
              rows={5}
              value={b64Input}
              onChange={(e) => setB64Input(e.target.value)}
              className="textarea-field"
              style={{ fontFamily: 'var(--font-mono)' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button onClick={handleEncodeB64} className="btn-primary">Encode Base64</button>
            <button onClick={handleDecodeB64} className="btn-secondary">Decode Base64</button>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Encoded / Decoded Result</label>
              {b64Output && (
                <button onClick={() => copyToClipboard(b64Output)} className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}>
                  {copied ? <Check size={12} color="#2dd4bf" /> : <Copy size={12} />} Copy
                </button>
              )}
            </div>
            <textarea
              readOnly
              rows={5}
              value={b64Output}
              placeholder="Output will appear here..."
              className="textarea-field"
              style={{ fontFamily: 'var(--font-mono)', background: '#050c18' }}
            />
          </div>
        </div>
      )}

      {activeTab === 'url' && (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Source URL or Query String</label>
            <textarea
              rows={4}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="textarea-field"
              style={{ fontFamily: 'var(--font-mono)' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button onClick={handleEncodeUrl} className="btn-primary">URL Encode</button>
            <button onClick={handleDecodeUrl} className="btn-secondary">URL Decode</button>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Encoded / Decoded Result</label>
              {urlOutput && (
                <button onClick={() => copyToClipboard(urlOutput)} className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}>
                  {copied ? <Check size={12} color="#2dd4bf" /> : <Copy size={12} />} Copy
                </button>
              )}
            </div>
            <textarea
              readOnly
              rows={4}
              value={urlOutput}
              placeholder="Output will appear here..."
              className="textarea-field"
              style={{ fontFamily: 'var(--font-mono)', background: '#050c18' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
