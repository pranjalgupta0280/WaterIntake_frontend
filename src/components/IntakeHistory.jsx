import React from 'react';
import { History, Trash2, Calendar, Clock } from 'lucide-react';

const IntakeHistory = ({ todayLogs = [], history = [], onDeleteLog }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Today's Logged Entries */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={20} color="var(--primary-cyan)" /> Today's Logged Entries
        </h3>

        {todayLogs.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic', textAlign: 'center', padding: '20px 0' }}>
            No water logged yet today. Use the Quick Add panel above to start tracking!
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {todayLogs.map((log) => (
              <div
                key={log._id}
                style={{
                  background: 'rgba(10, 18, 38, 0.5)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.2s ease'
                }}
              >
                <div>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-cyan)', marginRight: '12px' }}>
                    +{log.amountMl} ml
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                    {log.note || 'Water Intake'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <button
                  onClick={() => onDeleteLog(log._id)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    padding: '8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  title="Delete Entry"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past History (Daily Totals) */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={20} color="var(--primary-cyan)" /> Past Intake History
        </h3>

        {history.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic', textAlign: 'center', padding: '20px 0' }}>
            No past history records found.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {history.map((day) => (
              <div
                key={day.date}
                style={{
                  background: 'rgba(10, 18, 38, 0.5)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '14px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem', display: 'block' }}>{day.date}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {day.entriesCount} logs recorded
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: day.percentage >= 100 ? 'var(--success)' : 'var(--accent-teal)' }}>
                    {day.totalIntakeMl} ml
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                    {day.percentage}% of {day.dailyGoal} ml goal
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default IntakeHistory;
