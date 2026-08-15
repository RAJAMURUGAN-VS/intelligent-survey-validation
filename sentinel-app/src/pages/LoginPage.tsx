import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BellCurveIcon } from '../components/BellCurveIcon';
import { useCountUp } from '../components/KpiCard';
import { PulseDot } from '../components/PulseDot';

type Role = 'field' | 'data' | 'hsd';

function StatChip({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  const count = useCountUp(value, 2000);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card px-4 py-3 flex flex-col gap-1"
    >
      <span className="font-mono text-2xl font-bold text-[#2DD4BF]">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-xs text-[#8B95AB]">{label}</span>
    </motion.div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('hsd');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const canLogin = userId.length > 0 && password.length > 0;

  const handleLogin = () => {
    if (!canLogin) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 900);
  };

  const roles: { id: Role; label: string }[] = [
    { id: 'field', label: 'Field Supervisor' },
    { id: 'data', label: 'Data Supervisor' },
    { id: 'hsd', label: 'HSD Admin' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Hero Panel */}
      <div
        className="flex-1 relative flex flex-col items-center justify-center p-12 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0B1220 0%, #0D1A2E 60%, #0B1220 100%)' }}
      >
        {/* Faint India map outline - decorative */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          viewBox="0 0 400 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M180 40 L220 35 L260 50 L290 80 L310 120 L320 160 L300 200 L310 240 L290 280 L270 320 L240 360 L210 400 L200 440 L190 400 L160 360 L140 320 L120 280 L100 240 L110 200 L90 160 L100 120 L120 80 L150 55 Z"
            stroke="#2DD4BF"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        {/* Bell curve hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-10"
        >
          <BellCurveIcon width={280} height={140} animated />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-bold text-center leading-tight mb-3"
          style={{ color: '#E6EAF2' }}
        >
          Where Data Meets{' '}
          <span className="gradient-text">Certainty</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-[#8B95AB] text-center max-w-sm mb-12 text-sm leading-relaxed"
        >
          Intelligent anomaly detection and validation for PLFS survey data. Powered by probabilistic ML for India's National Statistical Office.
        </motion.p>

        {/* Stat chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <StatChip label="Records Validated" value={12400} suffix="+" />
          <StatChip label="Model Accuracy" value={982} suffix="%" />
          <StatChip label="Active Survey" value={2024} suffix="–25" />
        </motion.div>

        {/* Bottom status */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
          <PulseDot color="success" size="sm" />
          <span className="text-xs font-mono text-[#8B95AB]">System Status: All Validation Engines Online</span>
        </div>
      </div>

      {/* Right Login Panel */}
      <div
        className="w-[440px] flex flex-col items-center justify-center p-10"
        style={{ background: 'rgba(18,26,43,0.98)', borderLeft: '1px solid rgba(45,212,191,0.12)' }}
      >
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className="w-full glass-card p-8 flex flex-col gap-6"
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#2DD4BF] text-2xl font-bold">◆</span>
            <span className="text-[#E6EAF2] font-bold text-xl tracking-tight">Sentinel</span>
            <span className="ml-auto text-[10px] font-mono badge-teal px-2 py-0.5 rounded-full">PLFS 2024–25</span>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#E6EAF2] mb-1">Access Gateway</h2>
            <p className="text-xs text-[#8B95AB]">Authorized personnel only — NSO Secure Access</p>
          </div>

          {/* Role selector */}
          <div>
            <label className="text-xs font-medium text-[#8B95AB] uppercase tracking-wider block mb-2">Access Role</label>
            <div className="flex gap-2">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className="flex-1 py-2 px-2 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    background: role === r.id ? 'rgba(45,212,191,0.15)' : 'rgba(20,28,46,0.8)',
                    border: role === r.id ? '1px solid rgba(45,212,191,0.5)' : '1px solid rgba(45,212,191,0.12)',
                    color: role === r.id ? '#2DD4BF' : '#8B95AB',
                    boxShadow: role === r.id ? '0 0 12px rgba(45,212,191,0.2)' : 'none',
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* User ID */}
          <div>
            <label className="text-xs font-medium text-[#8B95AB] uppercase tracking-wider block mb-2">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={e => setUserId(e.target.value)}
              placeholder="e.g. HSD-2024-ADM-001"
              className="w-full px-4 py-2.5 text-sm"
              style={{ borderRadius: 10 }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-medium text-[#8B95AB] uppercase tracking-wider block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-sm"
              style={{ borderRadius: 10 }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            disabled={!canLogin || loading}
            className="btn-primary w-full py-3 text-sm relative overflow-hidden"
            style={{ opacity: canLogin ? 1 : 0.4 }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <svg className="animate-spin-slow" width="16" height="16" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="6" stroke="rgba(11,18,32,0.3)" strokeWidth="2" fill="none" />
                    <path d="M8 2 A6 6 0 0 1 14 8" stroke="#0B1220" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                  Authenticating…
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Access Dashboard →
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <p className="text-[10px] text-center text-[#8B95AB]">
            Ministry of Statistics & Programme Implementation · NSO Secure Access
          </p>
        </motion.div>
      </div>
    </div>
  );
}
