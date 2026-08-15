import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { SegmentedControl } from '../components/SegmentedControl';
import { useToast } from '../components/Toast';
import { timeSeriesDatasets, funnelData, resolutionBreakdown, modelComparisonBars } from '../data/analyticsData';
import { heatmapData, enumeratorIds_, weeks_ } from '../data/enumeratorHeatmap';
import { Download } from 'lucide-react';

const DATE_RANGES = ['7D', '30D', 'Quarter'];

function EnumeratorHeatmap() {
  const [hovered, setHovered] = useState<{ enumId: string; week: string; flagRate: number; flagCount: number } | null>(null);

  const getFlagRate = (enumId: string, week: string) => {
    const cell = heatmapData.find(c => c.enumeratorId === enumId && c.week === week);
    return cell?.flagRate ?? 0;
  };

  const getColor = (rate: number) => {
    if (rate < 10) return `rgba(45, 212, 191, ${0.1 + (rate / 10) * 0.5})`;
    if (rate < 30) return `rgba(245, 165, 36, ${0.3 + ((rate - 10) / 20) * 0.5})`;
    return `rgba(240, 68, 56, ${0.4 + Math.min((rate - 30) / 50, 0.5)})`;
  };

  return (
    <GlassCard className="p-5">
      <h2 className="text-sm font-semibold text-[#E6EAF2] mb-4">Enumerator Performance Heatmap</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-[10px] text-[#8B95AB] font-medium">Enumerator</th>
              {weeks_.map(w => (
                <th key={w} className="px-2 py-2 text-center text-[10px] text-[#8B95AB] font-medium">{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enumeratorIds_.map(enumId => (
              <tr key={enumId}>
                <td className="px-3 py-1 font-mono text-[10px] text-[#8B95AB] whitespace-nowrap">{enumId}</td>
                {weeks_.map(week => {
                  const rate = getFlagRate(enumId, week);
                  const cell = heatmapData.find(c => c.enumeratorId === enumId && c.week === week);
                  return (
                    <td key={week} className="px-1 py-1">
                      <div
                        className="w-10 h-8 rounded-lg flex items-center justify-center text-[9px] font-mono cursor-pointer transition-all"
                        style={{
                          background: getColor(rate),
                          border: hovered?.enumId === enumId && hovered?.week === week
                            ? '1px solid rgba(245,165,36,0.8)' : '1px solid transparent',
                          transform: hovered?.enumId === enumId && hovered?.week === week ? 'scale(1.15)' : 'scale(1)',
                        }}
                        onMouseEnter={() => setHovered({ enumId, week, flagRate: rate, flagCount: cell?.flagCount ?? 0 })}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <span className="text-[#E6EAF2] opacity-80">{rate}%</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hovered && (
        <div className="mt-3 p-3 rounded-xl text-xs" style={{ background: 'rgba(20,28,46,0.8)', border: '1px solid rgba(245,165,36,0.2)' }}>
          <span className="font-mono text-[#F5A524]">{hovered.enumId}</span>
          <span className="text-[#8B95AB]"> · {hovered.week} · Flag Rate: </span>
          <span className="font-mono text-[#F5A524]">{hovered.flagRate}%</span>
          <span className="text-[#8B95AB]"> · Flags: </span>
          <span className="font-mono text-[#E6EAF2]">{hovered.flagCount}</span>
        </div>
      )}
      {/* Legend */}
      <div className="flex items-center gap-4 mt-3">
        <span className="text-[10px] text-[#8B95AB]">Flag Rate:</span>
        {[
          { label: '< 10%', color: 'rgba(45,212,191,0.5)' },
          { label: '10-30%', color: 'rgba(245,165,36,0.5)' },
          { label: '> 30%', color: 'rgba(240,68,56,0.6)' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded" style={{ background: l.color }} />
            <span className="text-[10px] text-[#8B95AB]">{l.label}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function FunnelChart() {
  return (
    <GlassCard className="p-5">
      <h2 className="text-sm font-semibold text-[#E6EAF2] mb-4">Validation Funnel</h2>
      <div className="flex flex-col gap-2">
        {funnelData.map((stage, i) => {
          const width = 100 - i * 12;
          return (
            <div key={stage.stage} className="flex items-center gap-3">
              <span className="text-xs text-[#8B95AB] w-24 text-right">{stage.stage}</span>
              <div className="flex-1 flex justify-center">
                <div
                  className="h-9 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    width: `${width}%`,
                    background: i === 0 ? 'rgba(45,212,191,0.15)' : i === 2 ? 'rgba(245,165,36,0.15)' : 'rgba(45,212,191,0.1)',
                    border: `1px solid rgba(45,212,191,${0.3 - i * 0.03})`,
                    boxShadow: `0 0 16px rgba(45,212,191,${0.06 - i * 0.01})`,
                  }}
                >
                  <span className="font-mono text-xs text-[#2DD4BF]">{stage.count.toLocaleString()}</span>
                  {i > 0 && <span className="text-[10px] text-[#8B95AB] ml-2">({stage.pct}%)</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30D');
  const { showToast } = useToast();

  const dataset = timeSeriesDatasets[dateRange];

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#E6EAF2]">Analytics & Performance</h1>
          <p className="text-sm text-[#8B95AB]">Model metrics, enumerator performance, and system analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <SegmentedControl options={DATE_RANGES} value={dateRange} onChange={setDateRange} size="sm" />
          <button
            onClick={() => showToast('Report exported (mock) — PDF generated', 'success')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
            style={{ background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.2)', color: '#2DD4BF' }}
          >
            <Download size={13} /> Export Report
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Precision / Recall / F1 multi-line */}
        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold text-[#E6EAF2] mb-3">Precision / Recall / F1 Over Time</h2>
          <AnimatePresence mode="wait">
            <motion.div key={dateRange} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={dataset} margin={{ top: 10, right: 20, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" tick={{ fill: '#8B95AB', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[80, 100]} tick={{ fill: '#8B95AB', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(20,28,46,0.95)', border: '1px solid rgba(45,212,191,0.2)', borderRadius: 8, fontFamily: 'Space Grotesk' }}
                    formatter={(v: number) => [`${v.toFixed(1)}%`]}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, color: '#8B95AB' }} />
                  <Line type="monotone" dataKey="precision" stroke="#2DD4BF" strokeWidth={2} dot={false} name="Precision" />
                  <Line type="monotone" dataKey="recall" stroke="#8B7FE8" strokeWidth={2} dot={false} name="Recall" />
                  <Line type="monotone" dataKey="f1" stroke="#2ED47A" strokeWidth={2} dot={false} name="F1 Score" />
                  <Line type="monotone" dataKey="upper" stroke="rgba(45,212,191,0.2)" strokeWidth={1} dot={false} strokeDasharray="3 3" name="Upper CI" />
                  <Line type="monotone" dataKey="lower" stroke="rgba(45,212,191,0.2)" strokeWidth={1} dot={false} strokeDasharray="3 3" name="Lower CI" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatePresence>
        </GlassCard>

        <div className="grid grid-cols-3 gap-4">
          {/* Model comparison */}
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold text-[#E6EAF2] mb-4">Model F1 Comparison</h2>
            {modelComparisonBars.map(m => (
              <div key={m.model} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#8B95AB]">{m.model}</span>
                  <span className="font-mono" style={{ color: m.fill }}>{m.f1}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'rgba(45,212,191,0.1)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${m.f1}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ background: m.fill }}
                  />
                </div>
              </div>
            ))}
          </GlassCard>

          {/* Resolution breakdown donut */}
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold text-[#E6EAF2] mb-3">Anomaly Resolution</h2>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={resolutionBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                  {resolutionBreakdown.map((d, i) => <Cell key={i} fill={d.fill} fillOpacity={0.85} />)}
                </Pie>
                <Tooltip formatter={(v) => [v.toLocaleString(), '']} contentStyle={{ background: 'rgba(20,28,46,0.95)', border: '1px solid rgba(45,212,191,0.2)', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-1 mt-1">
              {resolutionBreakdown.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
                  <span className="text-[10px] text-[#8B95AB]">{d.name}</span>
                  <span className="ml-auto font-mono text-[10px] text-[#E6EAF2]">{d.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* System gauges */}
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold text-[#E6EAF2] mb-4">System Performance</h2>
            {[
              { label: 'System Uptime', value: 99.7, color: '#2ED47A' },
              { label: 'API Throughput', value: 87.3, color: '#2DD4BF' },
              { label: 'DB Query Latency', value: 23, max: 100, color: '#8B7FE8', suffix: 'ms', invert: true },
              { label: 'Validation Queue', value: 12, max: 100, color: '#F5A524', suffix: '%' },
            ].map(g => (
              <div key={g.label} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#8B95AB]">{g.label}</span>
                  <span className="font-mono" style={{ color: g.color }}>{g.value}{g.suffix ?? '%'}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'rgba(45,212,191,0.08)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${g.invert ? 100 - g.value : g.value}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ background: g.color }}
                  />
                </div>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* Heatmap */}
        <EnumeratorHeatmap />

        {/* Funnel */}
        <FunnelChart />
      </div>
    </div>
  );
}
