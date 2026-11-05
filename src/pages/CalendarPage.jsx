import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Clock, 
  Tag 
} from 'lucide-react';

const STORAGE_KEY = 'rominova_calendar_events';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateKey, setSelectedDateKey] = useState(formatDateKey(new Date()));
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventCategory, setNewEventCategory] = useState('Personal');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  function formatDateKey(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const resetToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDateKey(formatDateKey(today));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const newEvent = {
      id: Date.now().toString(),
      title: newEventTitle.trim(),
      time: newEventTime || 'All Day',
      category: newEventCategory,
    };

    setEvents((prev) => {
      const dayList = prev[selectedDateKey] || [];
      return {
        ...prev,
        [selectedDateKey]: [...dayList, newEvent]
      };
    });

    setNewEventTitle('');
    setNewEventTime('');
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prev) => {
      const dayList = prev[selectedDateKey] || [];
      const updated = dayList.filter((item) => item.id !== eventId);
      if (updated.length === 0) {
        const copy = { ...prev };
        delete copy[selectedDateKey];
        return copy;
      }
      return {
        ...prev,
        [selectedDateKey]: updated
      };
    });
  };

  const selectedDateEvents = events[selectedDateKey] || [];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">
          <CalIcon size={26} color="#2dd4bf" /> Interactive Calendar
        </h1>
        <p className="page-subtitle">Monthly schedule grid and custom agenda management</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Calendar Matrix Section */}
        <div className="glass-card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                {monthNames[month]} <span style={{ color: '#2dd4bf' }}>{year}</span>
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <button onClick={resetToToday} className="btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}>
                Today
              </button>
              <button onClick={prevMonth} className="btn-secondary" style={{ padding: '0.4rem' }}>
                <ChevronLeft size={16} />
              </button>
              <button onClick={nextMonth} className="btn-secondary" style={{ padding: '0.4rem' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '0.4rem',
            textAlign: 'center',
            marginBottom: '0.5rem'
          }}>
            {daysOfWeek.map((d) => (
              <span key={d} style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                {d}
              </span>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '0.4rem'
          }}>
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} style={{ opacity: 0.2, minHeight: '44px' }} />
            ))}

            {Array.from({ length: totalDaysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = selectedDateKey === dateKey;
              const hasEvents = events[dateKey] && events[dateKey].length > 0;
              const isToday = formatDateKey(new Date()) === dateKey;

              return (
                <button
                  key={dateKey}
                  onClick={() => setSelectedDateKey(dateKey)}
                  style={{
                    minHeight: '44px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isSelected 
                      ? 'rgba(20, 184, 166, 0.2)' 
                      : (isToday ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 27, 48, 0.5)'),
                    border: isSelected 
                      ? '1px solid #14b8a6' 
                      : (isToday ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(45, 212, 191, 0.08)'),
                    borderRadius: '8px',
                    color: isSelected ? '#2dd4bf' : '#fff',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '0.88rem', fontWeight: isSelected || isToday ? 700 : 500 }}>
                    {day}
                  </span>
                  {hasEvents && (
                    <span style={{
                      position: 'absolute',
                      bottom: '5px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#06b6d4',
                      boxShadow: '0 0 6px #06b6d4'
                    }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Agenda & Form */}
        <div className="glass-card">
          <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Schedule for
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {selectedDateKey}
            </h3>
          </div>

          <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="Event Title..."
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              className="input-field"
              required
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Time (e.g. 10:00 AM)"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                className="input-field"
              />
              <select
                value={newEventCategory}
                onChange={(e) => setNewEventCategory(e.target.value)}
                className="select-field"
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Urgent">Urgent</option>
                <option value="Health">Health</option>
              </select>
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '0.25rem' }}>
              <Plus size={16} /> Add Event
            </button>
          </form>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Entries ({selectedDateEvents.length})
            </h4>
            {selectedDateEvents.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                border: '1px dashed rgba(45, 212, 191, 0.15)',
                borderRadius: '8px',
                color: 'var(--text-muted)',
                fontSize: '0.85rem'
              }}>
                No events recorded for this date.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedDateEvents.map((evt) => (
                  <div
                    key={evt.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(45, 212, 191, 0.12)',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{evt.title}</div>
                      <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={12} /> {evt.time}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#2dd4bf' }}>
                          <Tag size={12} /> {evt.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(evt.id)}
                      className="btn-danger"
                      title="Delete event"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
