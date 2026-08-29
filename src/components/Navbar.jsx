import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Droplet, LogOut, Shield, User, Target } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout, isAdmin } = useContext(AuthContext);

  return (
    <header className="glass-panel" style={{ borderRadius: '0 0 20px 20px', marginBottom: '30px', padding: '16px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00b4d8, #0077b6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,180,216,0.3)'
          }}>
            <Droplet size={24} color="#ffffff" fill="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, background: 'linear-gradient(90deg, #ffffff, #90e0ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AquaTrack
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hydration & Wellness</p>
          </div>
        </div>

        {/* Navigation Tabs (If Admin) */}
        {isAdmin && (
          <div style={{ display: 'flex', background: 'rgba(10, 18, 38, 0.6)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <button
              className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 16px', fontSize: '0.85rem', borderRadius: '8px' }}
              onClick={() => setActiveTab('dashboard')}
            >
              <User size={16} /> My Dashboard
            </button>
            <button
              className={`btn ${activeTab === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 16px', fontSize: '0.85rem', borderRadius: '8px' }}
              onClick={() => setActiveTab('admin')}
            >
              <Shield size={16} /> Admin Panel
            </button>
          </div>
        )}

        {/* User Info & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    background: user.role === 'admin' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0, 180, 216, 0.2)',
                    color: user.role === 'admin' ? '#ef4444' : '#00b4d8',
                    border: `1px solid ${user.role === 'admin' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(0, 180, 216, 0.4)'}`
                  }}>
                    {user.role}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Goal: {user.dailyGoal || 2000} ml
                  </span>
                </div>
              </div>
            </div>
          )}

          <button
            className="btn btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            onClick={logout}
            title="Logout"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
