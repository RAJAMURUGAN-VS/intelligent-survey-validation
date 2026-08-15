import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, BarChart, Bar, Cell, ReferenceLine,
} from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { KpiCard } from '../components/KpiCard';
import { SeverityBadge } from '../components/SeverityBadge';
import { PulseDot } from '../components/PulseDot';
import {
  anomalyRateTimeSeries, kpiMetrics, enumeratorScatterData,
  recentFlagsPool, dataHealthScore, ingestionVolumeBySource,
} from '../data/dashboardMetrics';
import { statesData } from '../data/states';
import { AlertTriangle, Database, Cpu, CheckCircle } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.35 } }),
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-xs">
      <p className="font-semibold text-[#2DD4BF] mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toFixed(2) : p.value}
        </p>
      ))}
    </div>
  );
};

function RadialGauge({ value }: { value: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - value / 100);
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        <svg width="130" height="130" viewBox="0 0 130 130">
          <defs>
            <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#2ED47A" />
            </linearGradient>
            <filter id="gauge-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Background ring */}
          <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(45,212,191,0.08)" strokeWidth="12" />
          {/* Foreground arc */}
          <circle
            cx="65" cy="65" r={radius}
            fill="none"
            stroke="url(#gauge-grad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 65 65)"
            filter="url(#gauge-glow)"
            style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)' }}
          />
          {/* Center text */}
          <text x="65" y="60" textAnchor="middle" fill="#2DD4BF" fontSize="22" fontFamily="JetBrains Mono" fontWeight="700">
            {value}%
          </text>
          <text x="65" y="76" textAnchor="middle" fill="#8B95AB" fontSize="9" fontFamily="Space Grotesk">
            DATA HEALTH
          </text>
        </svg>
      </div>
      <p className="text-xs text-[#8B95AB] text-center">Composite validation score<br/>across all active rules</p>
    </div>
  );
}

export default function DashboardPage() {
  const [flags, setFlags] = useState(recentFlagsPool.slice(0, 6));
  const [selectedState, setSelectedState] = useState<typeof statesData[0] | null>(null);
  const [hoveredEnum, setHoveredEnum] = useState<{ id: string; bias: number } | null>(null);

  // Live activity feed cycling
  useEffect(() => {
    let idx = 6;
    const interval = setInterval(() => {
      const newFlag = recentFlagsPool[idx % recentFlagsPool.length];
      setFlags(prev => [{ ...newFlag, time: 'just now' }, ...prev.slice(0, 5)]);
      idx++;
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const topStates = [...statesData].sort((a, b) => b.flagCount - a.flagCount).slice(0, 12);

  return (
    <div className="p-5 pb-10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#E6EAF2]">Command Center</h1>
          <p className="text-sm text-[#8B95AB]">PLFS 2024–25 · Live validation dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <PulseDot color="teal" size="sm" />
          <span className="text-xs font-mono text-[#2DD4BF]">LIVE</span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        {[
          { label: 'Records Ingested Today', ...kpiMetrics.recordsIngested, color: 'teal' as const, icon: <Database size={16} /> },
          { label: 'Flagged for Review', ...kpiMetrics.flaggedForReview, color: 'amber' as const, icon: <AlertTriangle size={16} /> },
          { label: 'Auto-Resolved', ...kpiMetrics.autoResolved, color: 'success' as const, icon: <CheckCircle size={16} /> },
          { label: 'Active ML Models', ...kpiMetrics.activeModels, color: 'violet' as const, icon: <Cpu size={16} /> },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} custom={i} variants={cardVariants} initial="hidden" animate="visible">
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Anomaly Rate Chart - spans 8 cols */}
        <motion.div custom={4} variants={cardVariants} initial="hidden" animate="visible" className="col-span-8">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-[#E6EAF2]">Anomaly Detection Rate Over Time</h2>
                <p className="text-xs text-[#8B95AB]">12-week rolling window with 95% confidence band</p>
              </div>
              <span className="badge-teal text-xs font-mono px-2 py-1 rounded-lg">4.3% avg</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={anomalyRateTimeSeries} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="band-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{ fill: '#8B95AB', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8B95AB', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                {/* Confidence band */}
                <Line type="monotone" dataKey="upper" stroke="rgba(45,212,191,0.2)" strokeWidth={1} dot={false} strokeDasharray="4 4" name="Upper" />
                <Line type="monotone" dataKey="lower" stroke="rgba(45,212,191,0.2)" strokeWidth={1} dot={false} strokeDasharray="4 4" name="Lower" />
                {/* Main line */}
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#2DD4BF"
                  strokeWidth={2.5}
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    if (payload.spike) return <circle key={cx} cx={cx} cy={cy} r={5} fill="#F5A524" stroke="rgba(245,165,36,0.4)" strokeWidth={3} />;
                    return <circle key={cx} cx={cx} cy={cy} r={3} fill="#2DD4BF" />;
                  }}
                  activeDot={{ r: 6, fill: '#2DD4BF', stroke: 'rgba(45,212,191,0.4)', strokeWidth: 3 }}
                  name="Anomaly Rate"
                />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Data Health Gauge - 4 cols */}
        <motion.div custom={5} variants={cardVariants} initial="hidden" animate="visible" className="col-span-4">
          <GlassCard className="p-5 h-full flex flex-col justify-center">
            <h2 className="text-sm font-semibold text-[#E6EAF2] mb-4">Data Health Score</h2>
            <RadialGauge value={dataHealthScore} />
          </GlassCard>
        </motion.div>

        {/* Enumerator Scatter - 6 cols */}
        <motion.div custom={6} variants={cardVariants} initial="hidden" animate="visible" className="col-span-6">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-[#E6EAF2]">Enumerator Bias Detection</h2>
                <p className="text-xs text-[#8B95AB]">Outliers shown in amber · hover for details</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <ScatterChart margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" name="Records" tick={{ fill: '#8B95AB', fontSize: 10 }} label={{ value: 'Avg Records', position: 'insideBottom', fill: '#8B95AB', fontSize: 10 }} />
                <YAxis dataKey="y" name="Bias Score" tick={{ fill: '#8B95AB', fontSize: 10 }} />
                <Tooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0]?.payload;
                    return (
                      <div className="glass-card p-3 text-xs">
                        <p className="font-mono text-[#2DD4BF] font-semibold">{d.id}</p>
                        <p className="text-[#8B95AB]">Bias Score: <span className="text-[#F5A524] font-mono">{d.bias.toFixed(2)}</span></p>
                        <p className="text-[#8B95AB]">Avg Records: <span className="text-[#E6EAF2] font-mono">{d.x}</span></p>
                      </div>
                    );
                  }}
                />
                <Scatter
                  data={enumeratorScatterData.filter(d => !d.outlier)}
                  fill="#2DD4BF"
                  fillOpacity={0.7}
                  r={4}
                />
                <Scatter
                  data={enumeratorScatterData.filter(d => d.outlier)}
                  fill="#F5A524"
                  fillOpacity={0.9}
                  r={6}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* State tiles - 6 cols */}
        <motion.div custom={7} variants={cardVariants} initial="hidden" animate="visible" className="col-span-6">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#E6EAF2]">Anomaly Distribution by State</h2>
              <div className="flex items-center gap-2 text-[10px] text-[#8B95AB]">
                <span className="inline-block w-3 h-3 rounded" style={{ background: 'rgba(45,212,191,0.2)' }} /> Low
                <span className="inline-block w-3 h-3 rounded" style={{ background: 'rgba(45,212,191,0.6)' }} /> High
              </div>
            </div>
            <div className="grid grid-cols-6 gap-1.5 mb-2">
              {topStates.map(state => {
                const intensity = Math.min(state.flagCount / 900, 1);
                const bg = `rgba(45, 212, 191, ${0.1 + intensity * 0.7})`;
                return (
                  <button
                    key={state.code}
                    onClick={() => setSelectedState(s => s?.code === state.code ? null : state)}
                    className="aspect-square rounded-lg flex flex-col items-center justify-center text-[10px] font-bold transition-all duration-200"
                    style={{
                      background: selectedState?.code === state.code ? '#2DD4BF' : bg,
                      color: selectedState?.code === state.code ? '#0B1220' : '#E6EAF2',
                      border: selectedState?.code === state.code ? '2px solid #2DD4BF' : '1px solid rgba(45,212,191,0.15)',
                    }}
                    title={state.name}
                  >
                    {state.code}
                  </button>
                );
              })}
            </div>
            {selectedState && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 p-3 rounded-xl"
                style={{ background: 'rgba(45,212,191,0.06)', border: '1px solid rgba(45,212,191,0.15)' }}
              >
                <p className="font-semibold text-[#2DD4BF] text-sm">{selectedState.name}</p>
                <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                  <div><span className="text-[#8B95AB]">Flags</span><br /><span className="font-mono text-[#E6EAF2]">{selectedState.flagCount.toLocaleString()}</span></div>
                  <div><span className="text-[#8B95AB]">Total</span><br /><span className="font-mono text-[#E6EAF2]">{selectedState.totalRecords.toLocaleString()}</span></div>
                  <div><span className="text-[#8B95AB]">Flag Rate</span><br /><span className="font-mono text-[#F5A524]">{selectedState.flagRate}%</span></div>
                </div>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>

        {/* Activity Feed - 5 cols */}
        <motion.div custom={8} variants={cardVariants} initial="hidden" animate="visible" className="col-span-5">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#E6EAF2]">Recent Flags</h2>
              <div className="flex items-center gap-1.5">
                <PulseDot color="amber" size="sm" />
                <span className="text-xs text-[#8B95AB]">Live feed</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {flags.map((flag, i) => (
                <motion.div
                  key={`${flag.id}-${i}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background: 'rgba(20,28,46,0.5)', border: '1px solid rgba(45,212,191,0.07)' }}
                >
                  <SeverityBadge severity={flag.severity} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] text-[#2DD4BF]">{flag.id}</p>
                    <p className="text-xs text-[#8B95AB] leading-tight truncate">{flag.desc}</p>
                  </div>
                  <span className="text-[10px] font-mono text-[#8B95AB] whitespace-nowrap">{flag.time}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Ingestion volume bar - 7 cols */}
        <motion.div custom={9} variants={cardVariants} initial="hidden" animate="visible" className="col-span-7">
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold text-[#E6EAF2] mb-3">Ingestion Volume by Source</h2>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={ingestionVolumeBySource} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" tick={{ fill: '#8B95AB', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8B95AB', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="volume" radius={[6, 6, 0, 0]}>
                  {ingestionVolumeBySource.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
