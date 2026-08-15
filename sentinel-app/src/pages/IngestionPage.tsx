import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { PulseDot } from '../components/PulseDot';
import { DataTable, type Column } from '../components/DataTable';
import { SeverityBadge } from '../components/SeverityBadge';
import { useToast } from '../components/Toast';
import { ingestionHistory, liveLogPool, type IngestionRun } from '../data/ingestionHistory';
import { ingestionVolumeBySource } from '../data/dashboardMetrics';
import { Upload, CheckCircle, Activity } from 'lucide-react';

const columns: Column<IngestionRun>[] = [
  { key: 'id', label: 'Batch ID', render: r => <span className="font-mono text-xs text-[#2DD4BF]">{r.id}</span> },
  { key: 'filename', label: 'Filename', render: r => <span className="text-xs">{r.filename}</span> },
  { key: 'source', label: 'Source', render: r => <span className="text-xs badge-violet px-2 py-0.5 rounded-full">{r.source}</span> },
  { key: 'records', label: 'Records', render: r => <span className="font-mono text-xs">{r.records.toLocaleString()}</span> },
  { key: 'flagged', label: 'Flagged', render: r => <span className="font-mono text-xs text-[#F5A524]">{r.flagged}</span> },
  {
    key: 'status', label: 'Status', render: r => {
      const cfg: Record<string, { cls: string; label: string }> = {
        success: { cls: 'badge-success', label: 'Success' },
        partial: { cls: 'badge-amber', label: 'Partial' },
        failed: { cls: 'badge-danger', label: 'Failed' },
        processing: { cls: 'badge-teal', label: 'Processing' },
      };
      const c = cfg[r.status];
      return <span className={`text-xs ${c.cls} px-2 py-0.5 rounded-full`}>{c.label}</span>;
    }
  },
  { key: 'timestamp', label: 'Timestamp', render: r => <span className="font-mono text-xs text-[#8B95AB]">{new Date(r.timestamp).toLocaleString('en-IN', { hour12: false })}</span> },
  { key: 'duration', label: 'Duration', render: r => <span className="font-mono text-xs">{r.duration}</span> },
];

function LiveModePanel() {
  const [rps, setRps] = useState(142);
  const [logs, setLogs] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rpsInterval = setInterval(() => {
      setRps(r => Math.max(100, Math.min(200, r + Math.floor((Math.random() - 0.5) * 20))));
    }, 800);
    return () => clearInterval(rpsInterval);
  }, []);

  useEffect(() => {
    let idx = 0;
    const logInterval = setInterval(() => {
      const line = `[${new Date().toISOString()}] ${liveLogPool[idx % liveLogPool.length]}`;
      setLogs(prev => [...prev.slice(-29), line]);
      idx++;
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, 2200);
    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4 flex flex-col gap-4">
        <GlassCard className="p-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <PulseDot color="teal" />
            <span className="text-xs text-[#8B95AB]">Live Stream Active</span>
          </div>
          <div className="font-mono text-4xl font-bold text-[#2DD4BF] my-3">
            {rps}
          </div>
          <p className="text-xs text-[#8B95AB]">Records / Second</p>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">Connection Status</h3>
          <div className="flex flex-col gap-2">
            {[
              { label: 'eSigma Gateway', status: 'Connected' },
              { label: 'CAPI Relay', status: 'Connected' },
              { label: 'Validation Engine', status: 'Running' },
              { label: 'Schema Validator', status: 'Active' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs text-[#8B95AB]">{item.label}</span>
                <div className="flex items-center gap-1.5">
                  <PulseDot color="success" size="sm" />
                  <span className="text-xs text-[#2ED47A]">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">Schema Validator</h3>
          {[
            'Household ID format', 'Age range (0-120)', 'State code validity',
            'Employment status enum', 'Wage field numeric', 'Required fields present',
          ].map(check => (
            <div key={check} className="flex items-center gap-2 py-1">
              <CheckCircle size={12} className="text-[#2ED47A]" />
              <span className="text-xs text-[#8B95AB]">{check}</span>
            </div>
          ))}
        </GlassCard>
      </div>

      <div className="col-span-8">
        <GlassCard className="p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={14} className="text-[#2DD4BF]" />
            <h3 className="text-sm font-semibold text-[#E6EAF2]">Live Ingestion Log</h3>
            <span className="ml-auto text-[10px] font-mono badge-teal px-2 py-0.5 rounded-full">
              {logs.length} lines
            </span>
          </div>
          <div
            ref={logRef}
            className="terminal-panel flex-1 min-h-[300px]"
            style={{ minHeight: 320, overflowY: 'auto' }}
          >
            {logs.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`py-0.5 leading-relaxed ${line.includes('FLAGGED') ? 'text-[#F5A524]' : 'text-[#2DD4BF]'}`}
              >
                {line}
              </motion.div>
            ))}
            {logs.length === 0 && (
              <div className="text-[#8B95AB] opacity-50">Waiting for records...</div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function BatchModePanel() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState(ingestionHistory);
  const [isDragOver, setIsDragOver] = useState(false);
  const { showToast } = useToast();

  const handleUpload = () => {
    if (uploading) return;
    setUploading(true);
    setProgress(0);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / 3000) * 100, 100);
      setProgress(Math.round(p));
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploading(false);
          setProgress(0);
          showToast('PLFS_Batch_0848.csv ingested successfully — 2,914 records processed', 'success');
          setHistory(prev => [{
            id: `ING-2025-0114-${String(prev.length + 1).padStart(3, '0')}`,
            filename: 'PLFS_Batch_0848.csv',
            source: 'Manual Upload',
            records: 2914,
            flagged: 98,
            status: 'success' as const,
            timestamp: new Date().toISOString(),
            duration: '2m 31s',
            size: '4.4 MB',
          }, ...prev]);
        }, 300);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Drop zone */}
        <GlassCard
          className={`p-8 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${
            isDragOver ? 'border-[#2DD4BF] shadow-[0_0_30px_rgba(45,212,191,0.2)]' : ''
          }`}
          onClick={handleUpload}
          interactive
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.2)' }}
          >
            <Upload size={28} className="text-[#2DD4BF]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#E6EAF2]">Drop CSV / Excel / JSON</p>
            <p className="text-xs text-[#8B95AB] mt-1">or click to browse files</p>
          </div>
          {uploading && (
            <div className="w-full">
              <div className="flex justify-between text-xs text-[#8B95AB] mb-1">
                <span>Uploading PLFS_Batch_0848.csv</span>
                <span className="font-mono text-[#2DD4BF]">{progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(45,212,191,0.15)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #2DD4BF, #2ED47A)', boxShadow: '0 0 8px rgba(45,212,191,0.4)' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          )}
        </GlassCard>

        {/* Schema validator */}
        <GlassCard className="p-5">
          <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-4">Schema Validation Checklist</h3>
          {[
            { label: 'File format recognized', ok: true },
            { label: 'Column headers validated', ok: true },
            { label: 'Required fields present', ok: true },
            { label: 'Encoding UTF-8 verified', ok: true },
            { label: 'Row count within limits', ok: true },
            { label: 'Duplicate ID check passed', ok: true },
            { label: 'Date format YYYY-MM-DD', ok: true },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 py-1.5">
              <CheckCircle size={14} className="text-[#2ED47A]" />
              <span className="text-sm text-[#8B95AB]">{item.label}</span>
            </div>
          ))}
        </GlassCard>
      </div>

      {/* Ingestion history table */}
      <GlassCard className="p-5">
        <h3 className="text-sm font-semibold text-[#E6EAF2] mb-4">Ingestion Pipeline History</h3>
        <DataTable data={history as Record<string, unknown>[]} columns={columns as Column<Record<string, unknown>>[]} />
      </GlassCard>
    </div>
  );
}

export default function IngestionPage() {
  const [mode, setMode] = useState<'live' | 'batch'>('live');

  return (
    <div className="p-5 pb-12">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#E6EAF2]">Data Ingestion Hub</h1>
          <p className="text-sm text-[#8B95AB]">Monitor and manage survey data pipelines</p>
        </div>
        <div
          className="flex gap-1 p-1 rounded-xl"
          style={{ background: 'rgba(20,28,46,0.8)', border: '1px solid rgba(45,212,191,0.12)' }}
        >
          {(['live', 'batch'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="relative px-5 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{ color: mode === m ? '#0B1220' : '#8B95AB' }}
            >
              {mode === m && (
                <motion.div
                  layoutId="mode-bg"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: '#2DD4BF' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative capitalize">{m === 'live' ? '● Live Mode' : '⏫ Batch Mode'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Ingestion volume chart */}
      <GlassCard className="p-5 mb-4">
        <h3 className="text-sm font-semibold text-[#E6EAF2] mb-3">Volume by Source</h3>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={ingestionVolumeBySource} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 80 }}>
            <XAxis type="number" tick={{ fill: '#8B95AB', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="source" tick={{ fill: '#8B95AB', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
            <Tooltip formatter={(v) => [`${v.toLocaleString()} records`, '']} contentStyle={{ background: 'rgba(20,28,46,0.95)', border: '1px solid rgba(45,212,191,0.2)', borderRadius: 8, fontFamily: 'Space Grotesk' }} />
            <Bar dataKey="volume" radius={[0, 6, 6, 0]}>
              {ingestionVolumeBySource.map((e, i) => <Cell key={i} fill={e.fill} fillOpacity={0.85} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {mode === 'live' ? <LiveModePanel /> : <BatchModePanel />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
