import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserTable from '../components/UserTable';
import UserHistoryModal from '../components/UserHistoryModal';
import GoalModal from '../components/GoalModal';
import api from '../services/api';
import { Users, Droplets, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

const AdminDashboard = () => {
  const { user: currentAdmin } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [selectedUserForHistory, setSelectedUserForHistory] = useState(null);
  const [selectedUserForGoal, setSelectedUserForGoal] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/users');
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Error fetching admin user list:', err);
      // EDGE CASE: User accesses admin-only route -> 403 Forbidden
      if (err.response?.status === 403) {
        setError('403 Forbidden: You do not have admin permissions to access this page.');
      } else {
        setError(err.response?.data?.message || 'Failed to load registered users list');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateUserGoal = async (newGoal) => {
    if (selectedUserForGoal) {
      await api.put(`/users/${selectedUserForGoal._id}/goal`, { dailyGoal: newGoal });
      await fetchUsers();
      setSelectedUserForGoal(null);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    // EDGE CASE: Admin tries to delete their own account -> rejected!
    if (userId === currentAdmin?.id || userId === currentAdmin?._id) {
      alert('Action Rejected: Admin cannot delete their own account.');
      return;
    }

    if (window.confirm(`Are you sure you want to permanently delete user account '${userName}' and all their intake logs?`)) {
      try {
        await api.delete(`/users/${userId}`);
        await fetchUsers();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete user account');
      }
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px 20px' }}>
      
      {/* Admin Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={24} color="#ef4444" /> Admin Control Panel
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage registered accounts, inspect user water intake history, and set intake recommendations
          </p>
        </div>

        <button className="btn btn-secondary" onClick={fetchUsers} title="Refresh User List">
          <RefreshCw size={16} /> Refresh Users
        </button>
      </div>

      {error ? (
        <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
          <AlertCircle size={32} style={{ marginBottom: '12px' }} />
          <h3>{error}</h3>
        </div>
      ) : loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          Loading user records...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Stat Overview Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Users</p>
                  <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-cyan)', marginTop: '4px' }}>
                    {users.length}
                  </h4>
                </div>
                <Users size={28} color="var(--primary-cyan)" />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Admins</p>
                  <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ef4444', marginTop: '4px' }}>
                    {users.filter(u => u.role === 'admin').length}
                  </h4>
                </div>
                <ShieldCheck size={28} color="#ef4444" />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>System Status</p>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--success)', marginTop: '8px' }}>
                    Healthy & Active
                  </h4>
                </div>
                <Droplets size={28} color="var(--accent-teal)" />
              </div>
            </div>
          </div>

          {/* User Management Table */}
          <UserTable
            users={users}
            currentAdminId={currentAdmin?.id || currentAdmin?._id}
            onViewHistory={(u) => setSelectedUserForHistory(u)}
            onEditGoal={(u) => setSelectedUserForGoal(u)}
            onDeleteUser={handleDeleteUser}
          />

        </div>
      )}

      {/* Modals */}
      {selectedUserForHistory && (
        <UserHistoryModal
          user={selectedUserForHistory}
          onClose={() => setSelectedUserForHistory(null)}
        />
      )}

      {selectedUserForGoal && (
        <GoalModal
          currentGoal={selectedUserForGoal.dailyGoal || 2000}
          onClose={() => setSelectedUserForGoal(null)}
          onUpdateGoal={handleUpdateUserGoal}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
