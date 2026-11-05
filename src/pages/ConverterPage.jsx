import React, { useState } from 'react';
import { ArrowLeftRight, Scale, Ruler, Thermometer } from 'lucide-react';

const unitsConfig = {
  length: {
    label: 'Length',
    icon: Ruler,
    units: ['meter', 'km', 'cm', 'mile', 'foot'],
    toBase: {
      meter: 1,
      km: 1000,
      cm: 0.01,
      mile: 1609.344,
      foot: 0.3048
    }
  },
  weight: {
    label: 'Weight',
    icon: Scale,
    units: ['kg', 'gram', 'pound'],
    toBase: {
      kg: 1,
      gram: 0.001,
      pound: 0.45359237
    }
  },
  temperature: {
    label: 'Temperature',
    icon: Thermometer,
    units: ['Celsius', 'Fahrenheit', 'Kelvin']
  }
};

export default function ConverterPage() {
  const [category, setCategory] = useState('length');
  const [val, setVal] = useState('1');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('km');

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    const available = unitsConfig[newCat].units;
    setFromUnit(available[0]);
    setToUnit(available[1] || available[0]);
  };

  const convertTemperature = (value, from, to) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '';

    let inCelsius;
    if (from === 'Celsius') inCelsius = num;
    else if (from === 'Fahrenheit') inCelsius = (num - 32) * (5 / 9);
    else if (from === 'Kelvin') inCelsius = num - 273.15;

    let res;
    if (to === 'Celsius') res = inCelsius;
    else if (to === 'Fahrenheit') res = inCelsius * (9 / 5) + 32;
    else if (to === 'Kelvin') res = inCelsius + 273.15;

    return Math.round(res * 100000) / 100000;
  };

  const calculateResult = () => {
    const num = parseFloat(val);
    if (isNaN(num)) return '-';

    if (category === 'temperature') {
      return convertTemperature(num, fromUnit, toUnit);
    }

    const { toBase } = unitsConfig[category];
    const baseValue = num * toBase[fromUnit];
    const converted = baseValue / toBase[toUnit];
    return Math.round(converted * 100000) / 100000;
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h1 className="page-title" style={{ justifyContent: 'center' }}>
          <ArrowLeftRight size={26} color="#2dd4bf" /> Unit Converter
        </h1>
        <p className="page-subtitle">Metric and Imperial conversion across physical dimensions</p>
      </div>

      <div className="glass-card">
        {/* Category Selector Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          {Object.entries(unitsConfig).map(([key, config]) => {
            const Icon = config.icon;
            const isCurrent = category === key;
            return (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  background: isCurrent ? 'rgba(20, 184, 166, 0.15)' : 'rgba(255,255,255,0.03)',
                  border: isCurrent ? '1px solid #14b8a6' : '1px solid transparent',
                  color: isCurrent ? '#2dd4bf' : 'var(--text-muted)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <Icon size={16} /> {config.label}
              </button>
            );
          })}
        </div>

        {/* Input & Convert Interface */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Value to Convert
            </label>
            <input
              type="number"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="input-field"
              placeholder="Enter amount..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="select-field"
              >
                {unitsConfig[category].units.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwap}
              className="btn-secondary"
              style={{ marginTop: '1.2rem', padding: '0.6rem' }}
              title="Swap Units"
            >
              <ArrowLeftRight size={16} />
            </button>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="select-field"
              >
                {unitsConfig[category].units.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{
            marginTop: '1rem',
            background: '#070f1e',
            border: '1px solid rgba(45, 212, 191, 0.2)',
            borderRadius: '12px',
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Calculated Value
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#2dd4bf', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
              {calculateResult()} <span style={{ fontSize: '1rem', color: '#fff', fontWeight: 500 }}>{toUnit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
