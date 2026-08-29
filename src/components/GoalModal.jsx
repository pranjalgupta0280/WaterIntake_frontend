import React, { useState } from 'react';
import { Target, X, Check } from 'lucide-react';

const GoalModal = ({ currentGoal = 2000, onClose, onUpdateGoal }) => {
  const [goal, setGoal] = useState(currentGoal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const val = Number(goal);
    if (isNaN(val) || val < 100) {
      setError('Daily goal must be a valid number of at least 100 ml.');
      return;
    }

    setLoading(true);
    try {
      await onUpdateGoal(val);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update daily goal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '28px', background: '#0e1834' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-cyan)' }}>
            <Target size={20} /> Update Daily Water Goal
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Daily Water Goal (ml):
            </label>
            <input
              type="number"
              className="input-field"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              step="50"
              min="100"
              required
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Approximately {Math.round(goal / 250)} standard glasses (250ml each).
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Check size={16} /> Save Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;
