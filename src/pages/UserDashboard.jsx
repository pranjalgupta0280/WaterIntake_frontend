import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import HydrationRing from '../components/HydrationRing';
import QuickAddModal from '../components/QuickAddModal';
import IntakeHistory from '../components/IntakeHistory';
import GoalModal from '../components/GoalModal';
import api from '../services/api';
import { Target, RefreshCw } from 'lucide-react';

const UserDashboard = () => {
  const { user, updateUserGoal } = useContext(AuthContext);
  const [todayData, setTodayData] = useState({
    totalIntakeMl: 0,
    dailyGoal: user?.dailyGoal || 2000,
    percentage: 0,
    remainingMl: user?.dailyGoal || 2000,
    logs: []
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGoalModal, setShowGoalModal] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [todayRes, historyRes] = await Promise.all([
        api.get('/intake/today'),
        api.get('/intake/history')
      ]);

      setTodayData(todayRes.data);
      setHistory(historyRes.data.history || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddIntake = async (amountMl, note) => {
    await api.post('/intake', { amountMl, note });
    await fetchDashboardData();
  };

  const handleDeleteLog = async (logId) => {
    await api.delete(`/intake/${logId}`);
    await fetchDashboardData();
  };

  const handleUpdateGoal = async (newGoal) => {
    await api.put(`/users/${user.id}/goal`, { dailyGoal: newGoal });
    updateUserGoal(newGoal);
    await fetchDashboardData();
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px 20px' }}>
      
      {/* Top Banner Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Daily Hydration Overview</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Track your logs, view goals, and monitor daily progress
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={fetchDashboardData} title="Refresh Data">
            <RefreshCw size={16} /> Refresh
          </button>
          <button className="btn btn-primary" onClick={() => setShowGoalModal(true)}>
            <Target size={16} /> Change Goal ({todayData.dailyGoal} ml)
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          Loading your hydration dashboard...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '28px' }}>
          
          {/* Left Column: Progress Ring & Quick Add Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <HydrationRing
              totalIntakeMl={todayData.totalIntakeMl}
              dailyGoal={todayData.dailyGoal}
              percentage={todayData.percentage}
              remainingMl={todayData.remainingMl}
            />

            <QuickAddModal onAddIntake={handleAddIntake} />
          </div>

          {/* Right Column: Intake Logs & History */}
          <div>
            <IntakeHistory
              todayLogs={todayData.logs}
              history={history}
              onDeleteLog={handleDeleteLog}
            />
          </div>

        </div>
      )}

      {showGoalModal && (
        <GoalModal
          currentGoal={todayData.dailyGoal}
          onClose={() => setShowGoalModal(false)}
          onUpdateGoal={handleUpdateGoal}
        />
      )}
    </div>
  );
};

export default UserDashboard;
