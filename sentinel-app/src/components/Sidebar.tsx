import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Upload, FlaskConical, Shield, AlertTriangle,
  CheckSquare, BarChart3, FileText, ChevronLeft, ChevronRight,
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { path: '/ingestion', label: 'Data Ingestion', icon: <Upload size={18} /> },
  { path: '/model-lab', label: 'Model Lab', icon: <FlaskConical size={18} /> },
  { path: '/rules', label: 'Integrity Rules', icon: <Shield size={18} /> },
  { path: '/anomalies', label: 'Anomaly Explorer', icon: <AlertTriangle size={18} /> },
  { path: '/validation', label: 'Validation Console', icon: <CheckSquare size={18} /> },
  { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  { path: '/reports', label: 'Reports', icon: <FileText size={18} /> },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-full overflow-hidden"
      style={{
        background: 'rgba(11,18,32,0.95)',
        borderRight: '1px solid rgba(45,212,191,0.10)',
        backdropFilter: 'blur(12px)',
        flexShrink: 0,
      }}
    >
      {/* Nav items */}
      <nav className="flex-1 py-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative group flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-colors duration-150"
              style={{
                color: active ? '#2DD4BF' : '#8B95AB',
                background: active ? 'rgba(45,212,191,0.08)' : 'transparent',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(45,212,191,0.04)';
              }}
              onMouseLeave={e => {
                if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                  style={{ background: '#2DD4BF', boxShadow: '0 0 8px rgba(45,212,191,0.6)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="flex-shrink-0">{item.icon}</span>
              <motion.span
                animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                {item.label}
              </motion.span>
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-[rgba(45,212,191,0.08)]">
        <button
          onClick={() => setCollapsed(c => !c)}
          className="flex items-center justify-center w-full py-2 rounded-xl text-[#8B95AB] hover:text-[#2DD4BF] hover:bg-[rgba(45,212,191,0.08)] transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : (
            <>
              <ChevronLeft size={16} />
              <motion.span
                animate={{ opacity: collapsed ? 0 : 1 }}
                className="ml-2 text-xs"
              >
                Collapse
              </motion.span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
