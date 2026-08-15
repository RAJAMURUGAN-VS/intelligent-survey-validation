import { useEffect, useRef, useState } from 'react';

export function useCountUp(target: number, duration = 1500, startOnMount = true) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnMount || started.current) return;
    started.current = true;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, startOnMount]);

  return count;
}

interface KpiCardProps {
  label: string;
  value: number;
  change?: number;
  trend?: 'up' | 'down' | 'flat';
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  color?: 'teal' | 'amber' | 'violet' | 'danger' | 'success';
  decimals?: number;
}

const colorMap = {
  teal: { accent: '#2DD4BF', bg: 'rgba(45,212,191,0.08)', border: 'rgba(45,212,191,0.2)' },
  amber: { accent: '#F5A524', bg: 'rgba(245,165,36,0.08)', border: 'rgba(245,165,36,0.2)' },
  violet: { accent: '#8B7FE8', bg: 'rgba(139,127,232,0.08)', border: 'rgba(139,127,232,0.2)' },
  danger: { accent: '#F04438', bg: 'rgba(240,68,56,0.08)', border: 'rgba(240,68,56,0.2)' },
  success: { accent: '#2ED47A', bg: 'rgba(46,212,122,0.08)', border: 'rgba(46,212,122,0.2)' },
};

export function KpiCard({ label, value, change, trend, prefix = '', suffix = '', icon, color = 'teal', decimals = 0 }: KpiCardProps) {
  const animatedValue = useCountUp(value * Math.pow(10, decimals));
  const displayValue = decimals > 0 ? (animatedValue / Math.pow(10, decimals)).toFixed(decimals) : animatedValue.toLocaleString();
  const c = colorMap[color];

  const trendColor = trend === 'up' ? '#2ED47A' : trend === 'down' ? '#F04438' : '#8B95AB';
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <div
      className="glass-card glass-card-interactive p-5 flex flex-col gap-3"
      style={{ borderColor: c.border }}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: '#8B95AB' }}>{label}</span>
        {icon && (
          <div className="p-2 rounded-lg" style={{ background: c.bg }}>
            <span style={{ color: c.accent }}>{icon}</span>
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="font-mono text-3xl font-bold" style={{ color: c.accent }}>
          {prefix}{displayValue}{suffix}
        </span>
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold" style={{ color: trendColor }}>
            {trendIcon} {Math.abs(change)}%
          </span>
          <span className="text-xs" style={{ color: '#8B95AB' }}>vs last week</span>
        </div>
      )}
    </div>
  );
}
