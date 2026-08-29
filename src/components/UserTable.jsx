import React from 'react';
import { Shield, Eye, Edit3, Trash2, UserCheck, AlertTriangle } from 'lucide-react';

const UserTable = ({ users = [], currentAdminId, onViewHistory, onEditGoal, onDeleteUser }) => {
  return (
    <div className="glass-panel" style={{ padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserCheck size={22} color="var(--primary-cyan)" /> Registered Users ({users.length})
        </h3>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 16px' }}>User Name</th>
              <th style={{ padding: '12px 16px' }}>Email Address</th>
              <th style={{ padding: '12px 16px' }}>Role</th>
              <th style={{ padding: '12px 16px' }}>Daily Goal</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isSelf = u._id === currentAdminId;

              return (
                <tr
                  key={u._id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <td style={{ padding: '14px 16px', fontWeight: 600 }}>
                    {u.name} {isSelf && <span style={{ fontSize: '0.7rem', color: 'var(--primary-cyan)', marginLeft: '6px' }}>(You)</span>}
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>{u.email}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      background: u.role === 'admin' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0, 180, 216, 0.2)',
                      color: u.role === 'admin' ? '#ef4444' : '#00b4d8',
                      border: `1px solid ${u.role === 'admin' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(0, 180, 216, 0.4)'}`
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--primary-cyan)' }}>
                    {u.dailyGoal || 2000} ml
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                        onClick={() => onViewHistory(u)}
                        title="View Water History"
                      >
                        <Eye size={14} /> History
                      </button>

                      <button
                        className="btn btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                        onClick={() => onEditGoal(u)}
                        title="Set Recommended Goal"
                      >
                        <Edit3 size={14} /> Set Goal
                      </button>

                      {/* Delete button with Edge Case Self-Delete protection */}
                      <button
                        className="btn btn-danger"
                        style={{
                          padding: '6px 12px',
                          fontSize: '0.75rem',
                          opacity: isSelf ? 0.4 : 1,
                          cursor: isSelf ? 'not-allowed' : 'pointer'
                        }}
                        onClick={() => !isSelf && onDeleteUser(u._id, u.name)}
                        disabled={isSelf}
                        title={isSelf ? "Admins cannot delete their own account" : "Delete User Account"}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
