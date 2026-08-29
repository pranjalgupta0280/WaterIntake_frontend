import React from 'react';
import { Droplet, Award, AlertCircle } from 'lucide-react';

const HydrationRing = ({ totalIntakeMl = 0, dailyGoal = 2000, percentage = 0, remainingMl = 2000 }) => {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let statusMessage = "Let's start hydrating today!";
  let statusColor = "var(--primary-cyan)";
  if (percentage >= 100) {
    statusMessage = "🎉 Hydration goal achieved! Excellent work!";
    statusColor = "var(--success)";
  } else if (percentage >= 50) {
    statusMessage = "Halfway there! Keep drinking water.";
    statusColor = "var(--accent-teal)";
  } else if (percentage > 0) {
    statusMessage = "Good start! Keep logging your intake.";
    statusColor = "var(--primary-cyan)";
  }

  return (
    <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', position: 'relative' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--text-accent)' }}>
        Today's Hydration Goal
      </h3>

      <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 24px auto' }}>
        <svg width="220" height="220" viewBox="0 0 200 200">
          {/* Background Ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="16"
          />
          {/* Progress Ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#waterGradient)"
            strokeWidth="16"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s ease-in-out', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
          <defs>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#48cae4" />
              <stop offset="100%" stopColor="#0077b6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text Info */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Droplet size={28} color="var(--primary-cyan)" style={{ marginBottom: '4px' }} />
          <span style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            {percentage}%
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {totalIntakeMl} / {dailyGoal} ml
          </span>
        </div>
      </div>

      {/* Summary Footer Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
        <div style={{ background: 'rgba(10, 18, 38, 0.5)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Remaining Goal</p>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: remainingMl === 0 ? 'var(--success)' : 'var(--text-main)' }}>
            {remainingMl} ml
          </p>
        </div>

        <div style={{ background: 'rgba(10, 18, 38, 0.5)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Glasses Consumed</p>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-cyan)' }}>
            {Math.round(totalIntakeMl / 250)} / {Math.round(dailyGoal / 250)}
          </p>
        </div>
      </div>

      <p style={{ marginTop: '20px', fontSize: '0.85rem', color: statusColor, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        {percentage >= 100 ? <Award size={16} /> : <AlertCircle size={16} />}
        {statusMessage}
      </p>
    </div>
  );
};

export default HydrationRing;
