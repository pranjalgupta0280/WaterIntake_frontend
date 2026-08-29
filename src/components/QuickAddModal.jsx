import React, { useState } from 'react';
import { Plus, GlassWater, AlertTriangle } from 'lucide-react';

const QuickAddModal = ({ onAddIntake }) => {
  const [customAmount, setCustomAmount] = useState('');
  const [note, setNote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePreset = async (amount) => {
    setErrorMessage('');
    setLoading(true);
    try {
      await onAddIntake(amount, `${amount}ml Quick Log`);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to log intake');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCustom = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const amount = Number(customAmount);

    // Frontend Edge Case Validation: <= 0 should be rejected!
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Water intake amount must be a positive number greater than 0 ml.');
      return;
    }

    setLoading(true);
    try {
      await onAddIntake(amount, note || 'Custom Log');
      setCustomAmount('');
      setNote('');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to log intake');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '28px' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <GlassWater size={20} color="var(--primary-cyan)" /> Log Water Intake
      </h3>

      {/* Edge Case Validation Error Message Banner */}
      {errorMessage && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          borderRadius: '10px',
          padding: '12px 16px',
          marginBottom: '20px',
          color: '#ef4444',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertTriangle size={18} shrink={0} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Preset Buttons */}
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Quick Presets:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
        <button
          className="btn btn-secondary"
          style={{ flexDirection: 'column', padding: '14px', borderRadius: '14px' }}
          onClick={() => handlePreset(250)}
          disabled={loading}
        >
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-cyan)' }}>+250 ml</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1 Glass</span>
        </button>

        <button
          className="btn btn-secondary"
          style={{ flexDirection: 'column', padding: '14px', borderRadius: '14px' }}
          onClick={() => handlePreset(500)}
          disabled={loading}
        >
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-cyan)' }}>+500 ml</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1 Bottle</span>
        </button>

        <button
          className="btn btn-secondary"
          style={{ flexDirection: 'column', padding: '14px', borderRadius: '14px' }}
          onClick={() => handlePreset(750)}
          disabled={loading}
        >
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-cyan)' }}>+750 ml</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Large Flask</span>
        </button>
      </div>

      {/* Custom Amount Form */}
      <form onSubmit={handleSubmitCustom} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Or enter custom amount:</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="number"
            placeholder="Amount in ml (e.g. 350)"
            className="input-field"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ whiteSpace: 'nowrap' }}>
            <Plus size={18} /> Log Intake
          </button>
        </div>
        <input
          type="text"
          placeholder="Note (optional e.g., Green Tea, Post-workout)"
          className="input-field"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default QuickAddModal;
