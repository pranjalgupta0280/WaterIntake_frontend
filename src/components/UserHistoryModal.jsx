import React, { useState, useEffect } from 'react';
import { X, Calendar, Droplet, Clock } from 'lucide-react';
import api from '../services/api';

const UserHistoryModal = ({ user, onClose }) => {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const res = await api.get(`/intake/user/${user._id}`);
        setHistoryData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user intake history');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserHistory();
    }
  }, [user]);

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
      <div className="glass-panel" style={{ width: '100%', maxWidth: '650px', maxHeight: '85vh', overflowY: 'auto', padding: '28px', background: '#0e1834' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Droplet size={20} /> Water Intake History
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>User: {user.name} ({user.email})</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>Loading history logs...</p>
        ) : error ? (
          <div style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', padding: '12px', borderRadius: '8px', fontSize: '0.85rem' }}>
            {error}
          </div>
        ) : historyData?.history?.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>No intake records logged for this user.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {historyData.history.map((day) => (
              <div key={day.date} style={{ background: 'rgba(10, 18, 38, 0.6)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={16} color="var(--primary-cyan)" /> {day.date}
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--accent-teal)' }}>
                    Total: {day.totalIntakeMl} ml ({day.percentage}% of {day.dailyGoal}ml goal)
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {day.entries.map((entry) => (
                    <div key={entry._id} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                      <span>+{entry.amountMl} ml {entry.note && `(${entry.note})`}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHistoryModal;
