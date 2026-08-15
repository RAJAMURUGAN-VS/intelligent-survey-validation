import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  BarChart, Bar, Cell,
} from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { SeverityBadge } from '../components/SeverityBadge';
import { SegmentedControl } from '../components/SegmentedControl';
import { DataTable, type Column } from '../components/DataTable';
import { useToast } from '../components/Toast';
import { anomalyRecords, type AnomalyRecord } from '../data/anomalyRecords';
import { CheckCircle, XCircle, Filter } from 'lucide-react';

const SEVERITY_OPTIONS = ['All', 'High', 'Medium', 'Low'];
const MODEL_OPTIONS = ['All Models', 'Isolation Forest', 'Z-Score Outlier', 'Bayesian Anomaly Detector', 'LSTM Temporal Drift', 'DBSCAN Clustering'];

const recordColumns: Column<AnomalyRecord>[] = [
  { key: 'id', label: 'Record ID', render: r => <span className="font-mono text-xs text-[#2DD4BF]">{r.id}</span> },
  { key: 'state', label: 'State', render: r => <span className="text-xs">{r.state}</span> },
  { key: 'enumeratorId', label: 'Enumerator', render: r => <span className="font-mono text-xs">{r.enumeratorId}</span> },
  { key: 'severity', label: 'Severity', render: r => <SeverityBadge severity={r.severity} size="sm" /> },
  { key: 'score', label: 'Score', render: r => <span className="font-mono text-xs text-[#F5A524]">{r.score.toFixed(3)}</span> },
  { key: 'model', label: 'Model', render: r => <span className="text-xs text-[#8B95AB]">{r.model}</span> },
  { key: 'status', label: 'Status', render: r => (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
      r.status === 'genuine' ? 'badge-danger' : r.status === 'false_positive' ? 'badge-success' : 'badge-amber'
    }`}>
      {r.status === 'genuine' ? 'Genuine' : r.status === 'false_positive' ? 'False +' : 'Pending'}
    </span>
  )},
];

export default function AnomaliesPage() {
  const [tab, setTab] = useState('Cluster Level');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [modelFilter, setModelFilter] = useState('All Models');
  const [selectedRecord, setSelectedRecord] = useState<AnomalyRecord | null>(null);
  const [recordStatuses, setRecordStatuses] = useState<Record<string, AnomalyRecord['status']>>({});
  const { showToast } = useToast();

  const filtered = useMemo(() => {
    return anomalyRecords.filter(r => {
      if (severityFilter !== 'All' && r.severity !== severityFilter.toLowerCase()) return false;
      if (modelFilter !== 'All Models' && r.model !== modelFilter) return false;
      return true;
    });
  }, [severityFilter, modelFilter]);

  const handleMarkGenuine = (record: AnomalyRecord) => {
    setRecordStatuses(s => ({ ...s, [record.id]: 'genuine' }));
    showToast(`${record.id} marked as Genuine Anomaly`, 'warning');
  };

  const handleMarkFalse = (record: AnomalyRecord) => {
    setRecordStatuses(s => ({ ...s, [record.id]: 'false_positive' }));
    showToast(`${record.id} marked as False Positive`, 'success');
  };

  const getStatus = (r: AnomalyRecord) => recordStatuses[r.id] ?? r.status;

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#E6EAF2]">Anomaly Explorer</h1>
          <p className="text-sm text-[#8B95AB]">{filtered.length} anomalies found across {new Set(filtered.map(r => r.state)).size} states</p>
        </div>
        <SegmentedControl
          options={['Cluster Level', 'Record Level', 'Aggregate Level']}
          value={tab}
          onChange={setTab}
          size="sm"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <span className="flex items-center gap-1.5 text-xs text-[#8B95AB]"><Filter size={12} /> Filters:</span>
        {SEVERITY_OPTIONS.map(s => (
          <button
            key={s}
            onClick={() => setSeverityFilter(s)}
            className="px-3 py-1 rounded-full text-xs font-medium transition-all"
            style={{
              background: severityFilter === s ? 'rgba(45,212,191,0.15)' : 'rgba(20,28,46,0.6)',
              border: severityFilter === s ? '1px solid rgba(45,212,191,0.4)' : '1px solid rgba(45,212,191,0.12)',
              color: severityFilter === s ? '#2DD4BF' : '#8B95AB',
            }}
          >{s}</button>
        ))}
        <select
          value={modelFilter}
          onChange={e => setModelFilter(e.target.value)}
          className="px-3 py-1 rounded-full text-xs"
          style={{ background: 'rgba(20,28,46,0.6)', border: '1px solid rgba(45,212,191,0.12)', color: '#8B95AB' }}
        >
          {MODEL_OPTIONS.map(m => <option key={m} style={{ background: '#141C2E' }}>{m}</option>)}
        </select>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {tab === 'Cluster Level' && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8">
                <GlassCard className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-[#E6EAF2]">Anomaly Cluster Map</h2>
                    <p className="text-xs text-[#8B95AB]">Click any point to inspect</p>
                  </div>
                  <ResponsiveContainer width="100%" height={320}>
                    <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" name="Anomaly Score" tick={{ fill: '#8B95AB', fontSize: 10 }}
                        label={{ value: 'Isolation Score', position: 'insideBottom', fill: '#8B95AB', fontSize: 10, dy: 10 }} />
                      <YAxis dataKey="y" name="Confidence" tick={{ fill: '#8B95AB', fontSize: 10 }}
                        label={{ value: 'Confidence', angle: -90, position: 'insideLeft', fill: '#8B95AB', fontSize: 10 }} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0]?.payload as AnomalyRecord;
                          return (
                            <div className="glass-card p-3 text-xs">
                              <p className="font-mono text-[#2DD4BF] font-semibold">{d.id}</p>
                              <p className="text-[#8B95AB]">State: {d.state}</p>
                              <p className="text-[#8B95AB]">Score: <span className="text-[#F5A524] font-mono">{d.score.toFixed(3)}</span></p>
                              <p className="text-[#8B95AB]">Severity: {d.severity}</p>
                            </div>
                          );
                        }}
                      />
                      <Scatter
                        data={filtered.filter(d => d.severity !== 'high')}
                        fill="#2DD4BF" fillOpacity={0.7} r={5}
                        onClick={(d: AnomalyRecord) => setSelectedRecord(d)}
                        cursor="pointer"
                      />
                      <Scatter
                        data={filtered.filter(d => d.severity === 'high')}
                        fill="#F04438" fillOpacity={0.85} r={7}
                        onClick={(d: AnomalyRecord) => setSelectedRecord(d)}
                        cursor="pointer"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                  {/* Severity bar */}
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {(['high', 'medium', 'low'] as const).map(sev => {
                      const count = filtered.filter(r => r.severity === sev).length;
                      const total = filtered.length;
                      return (
                        <div key={sev}>
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="uppercase text-[#8B95AB]">{sev}</span>
                            <span className="font-mono" style={{ color: sev === 'high' ? '#F04438' : sev === 'medium' ? '#F5A524' : '#2DD4BF' }}>{count}</span>
                          </div>
                          <div className="h-1.5 rounded-full" style={{ background: 'rgba(45,212,191,0.1)' }}>
                            <div className="h-full rounded-full" style={{
                              width: `${(count / total) * 100}%`,
                              background: sev === 'high' ? '#F04438' : sev === 'medium' ? '#F5A524' : '#2DD4BF',
                            }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>
              </div>

              {/* Right detail panel */}
              <div className="col-span-4">
                <GlassCard className="p-4 h-full">
                  {selectedRecord ? (
                    <div className="flex flex-col gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs text-[#2DD4BF] font-semibold">{selectedRecord.id}</span>
                          <SeverityBadge severity={selectedRecord.severity} size="sm" />
                        </div>
                        <p className="text-xs text-[#8B95AB]">{selectedRecord.state} · {selectedRecord.district}</p>
                        <p className="text-xs text-[#8B95AB]">{selectedRecord.enumeratorId} · {selectedRecord.model}</p>
                      </div>

                      {/* Confidence bar */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#8B95AB]">Anomaly Score</span>
                          <span className="font-mono text-[#F5A524]">{selectedRecord.score.toFixed(3)}</span>
                        </div>
                        <div className="h-2 rounded-full" style={{ background: 'rgba(45,212,191,0.1)' }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${selectedRecord.score * 100}%`,
                              background: selectedRecord.score > 0.8 ? '#F04438' : selectedRecord.score > 0.6 ? '#F5A524' : '#2DD4BF',
                            }}
                          />
                        </div>
                      </div>

                      {/* Radar chart */}
                      <ResponsiveContainer width="100%" height={160}>
                        <RadarChart data={selectedRecord.radarData}>
                          <PolarGrid stroke="rgba(45,212,191,0.15)" />
                          <PolarAngleAxis dataKey="field" tick={{ fill: '#8B95AB', fontSize: 9 }} />
                          <Radar name="Actual" dataKey="actual" stroke="#F04438" fill="#F04438" fillOpacity={0.15} strokeWidth={1.5} />
                          <Radar name="Expected" dataKey="expected" stroke="#2DD4BF" fill="#2DD4BF" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 3" />
                        </RadarChart>
                      </ResponsiveContainer>

                      {/* Fields */}
                      <div className="text-xs">
                        <p className="text-[#8B95AB] mb-1">Flagged Fields:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedRecord.flaggedFields.map(f => (
                            <span key={f} className="badge-amber text-[10px] px-2 py-0.5 rounded-full">{f}</span>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleMarkGenuine(selectedRecord)}
                          disabled={getStatus(selectedRecord) !== 'pending'}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                          style={{
                            background: getStatus(selectedRecord) === 'genuine' ? 'rgba(240,68,56,0.2)' : 'rgba(240,68,56,0.1)',
                            border: '1px solid rgba(240,68,56,0.3)', color: '#F04438',
                            opacity: getStatus(selectedRecord) === 'false_positive' ? 0.4 : 1,
                          }}
                        >
                          <XCircle size={12} /> Genuine
                        </button>
                        <button
                          onClick={() => handleMarkFalse(selectedRecord)}
                          disabled={getStatus(selectedRecord) !== 'pending'}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                          style={{
                            background: getStatus(selectedRecord) === 'false_positive' ? 'rgba(46,212,122,0.2)' : 'rgba(46,212,122,0.1)',
                            border: '1px solid rgba(46,212,122,0.3)', color: '#2ED47A',
                            opacity: getStatus(selectedRecord) === 'genuine' ? 0.4 : 1,
                          }}
                        >
                          <CheckCircle size={12} /> False +
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(45,212,191,0.08)' }}>
                        <Filter size={20} className="text-[#2DD4BF] opacity-50" />
                      </div>
                      <p className="text-sm text-[#8B95AB]">Select a point on the scatter chart to inspect the record</p>
                    </div>
                  )}
                </GlassCard>
              </div>
            </div>
          )}

          {tab === 'Record Level' && (
            <GlassCard className="p-5">
              <h2 className="text-sm font-semibold text-[#E6EAF2] mb-4">Flagged Record Table</h2>
              <DataTable
                data={filtered as unknown as Record<string, unknown>[]}
                columns={recordColumns as Column<Record<string, unknown>>[]}
                onRowClick={(row) => setSelectedRecord(row as unknown as AnomalyRecord)}
                maxHeight="500px"
                searchable
                searchKeys={['id', 'state', 'enumeratorId'] as any}
              />
            </GlassCard>
          )}

          {tab === 'Aggregate Level' && (
            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="p-5">
                <h2 className="text-sm font-semibold text-[#E6EAF2] mb-3">Anomalies by State</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={anomalyRecords.reduce((acc: Record<string, number>, r) => {
                      acc[r.state] = (acc[r.state] ?? 0) + 1;
                      return acc;
                    }, {}) as any}
                    layout="vertical"
                    margin={{ top: 0, right: 20, bottom: 0, left: 100 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fill: '#8B95AB', fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#8B95AB', fontSize: 10 }} width={100} />
                    <Tooltip contentStyle={{ background: 'rgba(20,28,46,0.95)', border: '1px solid rgba(45,212,191,0.2)', borderRadius: 8 }} />
                    <Bar dataKey="value" fill="#2DD4BF" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>
              <GlassCard className="p-5">
                <h2 className="text-sm font-semibold text-[#E6EAF2] mb-3">Anomalies by Model</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={['Isolation Forest', 'Z-Score Outlier', 'Bayesian Anomaly Detector', 'LSTM Temporal Drift', 'DBSCAN Clustering'].map(m => ({
                      model: m.split(' ')[0],
                      count: anomalyRecords.filter(r => r.model === m).length,
                    }))}
                    margin={{ top: 5, right: 10, bottom: 5, left: -10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="model" tick={{ fill: '#8B95AB', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#8B95AB', fontSize: 10 }} />
                    <Tooltip contentStyle={{ background: 'rgba(20,28,46,0.95)', border: '1px solid rgba(45,212,191,0.2)', borderRadius: 8 }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {['#2DD4BF', '#8B7FE8', '#F5A524', '#2ED47A', '#F04438'].map((fill, i) => (
                        <Cell key={i} fill={fill} fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
