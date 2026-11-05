import React, { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';

export default function CalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [freshInput, setFreshInput] = useState(true);

  const handleDigit = (digit) => {
    if (freshInput || display === '0') {
      setDisplay(digit);
      setFreshInput(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleDecimal = () => {
    if (freshInput) {
      setDisplay('0.');
      setFreshInput(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (op) => {
    setEquation(`${display} ${op} `);
    setFreshInput(true);
  };

  const handlePercentage = () => {
    const val = parseFloat(display);
    if (isNaN(val)) return;
    const computed = (val / 100).toString();
    setDisplay(computed);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setFreshInput(true);
  };

  const handleBackspace = () => {
    if (freshInput) return;
    if (display.length <= 1) {
      setDisplay('0');
      setFreshInput(true);
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleCalculate = () => {
    if (!equation) return;
    try {
      const sanitized = (equation + display)
        .replace(/×/g, '*')
        .replace(/÷/g, '/');
      
      if (!/^[\d\s+\-*/.]+$/.test(sanitized)) {
        throw new Error('Invalid Expression');
      }
      
      // Safe evaluation of standard 4-function arithmetic
      const result = Function(`'use strict'; return (${sanitized})`)();
      
      if (!isFinite(result) || isNaN(result)) {
        setDisplay('Error');
      } else {
        const rounded = Math.round(result * 100000000) / 100000000;
        setDisplay(rounded.toString());
      }
      setEquation('');
      setFreshInput(true);
    } catch (e) {
      setDisplay('Error');
      setEquation('');
      setFreshInput(true);
    }
  };

  const keypad = [
    { label: 'C', action: handleClear, type: 'action' },
    { label: '⌫', action: handleBackspace, type: 'action' },
    { label: '%', action: handlePercentage, type: 'action' },
    { label: '÷', action: () => handleOperator('÷'), type: 'operator' },

    { label: '7', action: () => handleDigit('7'), type: 'number' },
    { label: '8', action: () => handleDigit('8'), type: 'number' },
    { label: '9', action: () => handleDigit('9'), type: 'number' },
    { label: '×', action: () => handleOperator('×'), type: 'operator' },

    { label: '4', action: () => handleDigit('4'), type: 'number' },
    { label: '5', action: () => handleDigit('5'), type: 'number' },
    { label: '6', action: () => handleDigit('6'), type: 'number' },
    { label: '-', action: () => handleOperator('-'), type: 'operator' },

    { label: '1', action: () => handleDigit('1'), type: 'number' },
    { label: '2', action: () => handleDigit('2'), type: 'number' },
    { label: '3', action: () => handleDigit('3'), type: 'number' },
    { label: '+', action: () => handleOperator('+'), type: 'operator' },

    { label: '0', action: () => handleDigit('0'), type: 'number', span: 2 },
    { label: '.', action: handleDecimal, type: 'number' },
    { label: '=', action: handleCalculate, type: 'equals' },
  ];

  return (
    <div style={{ maxWidth: '420px', margin: '0 auto' }}>
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h1 className="page-title" style={{ justifyContent: 'center' }}>
          <CalcIcon size={26} color="#2dd4bf" /> Calculator
        </h1>
        <p className="page-subtitle">Arithmetic calculations with precision logic</p>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', background: '#0b1626' }}>
        <div style={{
          background: '#050a12',
          border: '1px solid rgba(45, 212, 191, 0.15)',
          borderRadius: '12px',
          padding: '1.25rem 1rem',
          marginBottom: '1.25rem',
          textAlign: 'right',
          minHeight: '84px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden'
        }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', minHeight: '1.2rem', fontFamily: 'var(--font-mono)' }}>
            {equation}
          </div>
          <div style={{
            color: '#fff',
            fontSize: display.length > 10 ? '1.5rem' : '2.1rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-mono)',
            wordBreak: 'break-all'
          }}>
            {display}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.65rem'
        }}>
          {keypad.map((k, index) => {
            let bg = 'rgba(255, 255, 255, 0.05)';
            let color = '#fff';
            let border = 'rgba(255, 255, 255, 0.05)';

            if (k.type === 'operator') {
              bg = 'rgba(6, 182, 212, 0.15)';
              color = '#22d3ee';
              border = 'rgba(6, 182, 212, 0.3)';
            } else if (k.type === 'action') {
              bg = 'rgba(255, 255, 255, 0.08)';
              color = '#94a3b8';
            } else if (k.type === 'equals') {
              bg = 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)';
              color = '#070d18';
              border = 'none';
            }

            return (
              <button
                key={index}
                onClick={k.action}
                style={{
                  gridColumn: k.span ? `span ${k.span}` : 'span 1',
                  background: bg,
                  color: color,
                  border: `1px solid ${border}`,
                  padding: '1rem',
                  fontSize: '1.15rem',
                  fontWeight: k.type === 'equals' ? 800 : 600,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'filter 0.15s ease, transform 0.1s ease',
                  outline: 'none',
                  fontFamily: 'var(--font-mono)'
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
                onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
              >
                {k.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
