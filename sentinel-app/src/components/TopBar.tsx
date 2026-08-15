import { useState } from 'react';
import { Bell, ChevronDown, Search, User, Settings, LogOut } from 'lucide-react';
import { PulseDot } from './PulseDot';
import { AnimatePresence, motion } from 'framer-motion';

export function TopBar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [surveyMenuOpen, setSurveyMenuOpen] = useState(false);

  return (
    <header
      className="h-14 flex items-center justify-between px-5 z-20 relative"
      style={{
        background: 'rgba(11,18,32,0.9)',
        borderBottom: '1px solid rgba(45,212,191,0.10)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Left: Logo + Survey Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[#2DD4BF] text-lg font-bold">◆</span>
          <span className="text-[#E6EAF2] font-bold text-base tracking-tight">Sentinel</span>
        </div>

        {/* Survey Selector */}
        <div className="relative">
          <button
            onClick={() => setSurveyMenuOpen(v => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            style={{ background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.2)', color: '#2DD4BF' }}
          >
            PLFS 2024–25
            <ChevronDown size={14} />
          </button>
          <AnimatePresence>
            {surveyMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-full left-0 mt-1 w-52 glass-card p-1 z-50"
              >
                <div className="px-3 py-2 rounded-lg text-sm font-medium text-[#2DD4BF]" style={{ background: 'rgba(45,212,191,0.08)' }}>
                  ✓ PLFS 2024–25
                </div>
                {['PLFS 2023–24', 'PLFS 2022–23', 'EUS 2023–24'].map(s => (
                  <div key={s} className="px-3 py-2 rounded-lg text-sm text-[#8B95AB] flex justify-between items-center">
                    {s}
                    <span className="text-[10px] badge-amber rounded px-1.5 py-0.5">Soon</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-sm mx-8">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
          style={{ background: 'rgba(20,28,46,0.8)', border: '1px solid rgba(45,212,191,0.12)', cursor: 'text' }}
        >
          <Search size={14} className="text-[#8B95AB]" />
          <span className="text-[#8B95AB] text-xs font-mono">⌘K Search records, clusters, rules…</span>
        </div>
      </div>

      {/* Right: Notifications, Sync, User */}
      <div className="flex items-center gap-4">
        {/* eSigma Sync */}
        <div className="flex items-center gap-1.5">
          <PulseDot color="teal" size="sm" />
          <span className="text-xs text-[#8B95AB]">eSigma Sync: <span className="text-[#2DD4BF]">Live</span></span>
        </div>

        {/* Notification bell */}
        <button className="relative p-2 rounded-lg hover:bg-[rgba(45,212,191,0.08)] transition-colors">
          <Bell size={18} className="text-[#8B95AB]" />
          <span
            className="absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
            style={{ background: '#F5A524', color: '#0B1220' }}
          >
            5
          </span>
        </button>

        {/* User Avatar */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(v => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[rgba(45,212,191,0.06)] transition-colors"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #2DD4BF, #8B7FE8)', color: '#0B1220' }}
            >
              HM
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs font-semibold text-[#E6EAF2] leading-tight">HSD Admin</span>
            </div>
            <ChevronDown size={12} className="text-[#8B95AB]" />
          </button>
          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-full right-0 mt-1 w-44 glass-card p-1 z-50"
              >
                {[
                  { icon: <User size={14} />, label: 'Profile' },
                  { icon: <Settings size={14} />, label: 'Settings' },
                  { icon: <LogOut size={14} />, label: 'Sign out' },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#8B95AB] hover:text-[#E6EAF2] hover:bg-[rgba(45,212,191,0.06)] transition-colors"
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
