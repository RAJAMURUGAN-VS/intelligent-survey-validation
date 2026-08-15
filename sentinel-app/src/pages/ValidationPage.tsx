import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { PulseDot } from '../components/PulseDot';
import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { useToast } from '../components/Toast';

const MOCK_RECORDS = [
  'PLFS-KA-00214', 'PLFS-MH-00891', 'PLFS-UP-02341', 'PLFS-TN-00567',
  'PLFS-BR-01129', 'PLFS-RJ-00782', 'PLFS-WB-01055', 'PLFS-GJ-00334',
  'PLFS-AP-00945', 'PLFS-HR-00218', 'PLFS-MP-00673', 'PLFS-OD-00412',
  'PLFS-KL-00891', 'PLFS-PB-00345', 'PLFS-AS-00567',
];

const VALIDATION_CHECKS = [
  { field: 'Household ID Format', type: 'check' as const },
  { field: 'Age Bounds (0-120)', type: 'check' as const },
  { field: 'State Code Validity', type: 'check' as const },
  { field: 'Employment Status Enum', type: 'check' as const },
  { field: 'Wage Field Numeric', type: 'check' as const },
  { field: 'Age-Education Compatibility', type: 'warn' as const },
  { field: 'Wage-Employment Consistency', type: 'fail' as const },
  { field: 'Weekly Hours Plausibility', type: 'check' as const },
  { field: 'Principal Activity Code', type: 'warn' as const },
  { field: 'Industry Code Reference', type: 'check' as const },
  { field: 'Household Income Range', type: 'check' as const },
  { field: 'Temporal Consistency V1-V2', type: 'check' as const },
  { field: 'Enumerator Assignment Valid', type: 'check' as const },
  { field: 'PSU-District Linkage', type: 'check' as const },
  { field: 'Cross-Survey Industry Match', type: 'warn' as const },
];

const LOG_TEMPLATES = [
  (id: string) => `[INFO] Validating record ${id} against 15 active rules`,
  (id: string) => `[INFO] Rule RI-001: HH Member link — PASS`,
  (id: string) => `[WARN] Rule RB-003: Age-Education mismatch detected for ${id}`,
  (id: string) => `[INFO] Rule EI-001: Wage-Employment check — FAIL (score: 0.89)`,
  (id: string) => `[INFO] Rule TC-001: Temporal consistency — PASS`,
  (id: string) => `[INFO] Isolation Forest score: 0.${Math.floor(Math.random() * 90 + 5)}`,
  (id: string) => `[INFO] Bayesian prior probability: 0.${Math.floor(Math.random() * 40 + 10)}`,
  (id: string) => `[DONE] Validation complete for ${id} — 12 PASS | 2 WARN | 1 FAIL`,
];

function InteractiveModePanel() {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checks, setChecks] = useState<{ field: string; type: 'check' | 'warn' | 'fail'; resolved: boolean }[]>([]);
  const [validating, setValidating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [ruleTraceOpen, setRuleTraceOpen] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const filteredRecords = MOCK_RECORDS.filter(id => id.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setChecks([]);
    setLogs([]);
    setValidating(true);
    VALIDATION_CHECKS.forEach((check, i) => {
      setTimeout(() => {
        setChecks(prev => [...prev, { ...check, resolved: true }]);
        const logFn = LOG_TEMPLATES[i % LOG_TEMPLATES.length];
        const line = `[${new Date().toLocaleTimeString('en-IN', { hour12: false })}] ${logFn(id)}`;
        setLogs(prev => [...prev, line]);
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
        if (i === VALIDATION_CHECKS.length - 1) setValidating(false);
      }, i * 150);
    });
  };

  const passCount = checks.filter(c => c.type === 'check').length;
  const warnCount = checks.filter(c => c.type === 'warn').length;
  const failCount = checks.filter(c => c.type === 'fail').length;

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Record picker */}
      <div className="col-span-3">
        <GlassCard className="p-4 h-full">
          <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">Select Record</h3>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search record ID..."
            className="w-full px-3 py-2 text-xs mb-3"
            style={{ borderRadius: 8 }}
          />
          <div className="flex flex-col gap-1">
            {filteredRecords.map(id => (
              <button
                key={id}
                onClick={() => handleSelect(id)}
                className="text-left px-3 py-2 rounded-lg text-xs font-mono transition-all"
                style={{
                  background: selectedId === id ? 'rgba(45,212,191,0.1)' : 'transparent',
                  border: selectedId === id ? '1px solid rgba(45,212,191,0.3)' : '1px solid transparent',
                  color: selectedId === id ? '#2DD4BF' : '#8B95AB',
                }}
              >
                {id}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Validation checks */}
      <div className="col-span-5">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#E6EAF2]">
              {selectedId ? `Validating ${selectedId}` : 'Select a record'}
            </h3>
            {validating && <PulseDot color="teal" size="sm" />}
          </div>
          <div className="flex flex-col gap-2">
            {VALIDATION_CHECKS.map((check, i) => {
              const resolved = checks.find(c => c.field === check.field);
              return (
                <motion.div
                  key={check.field}
                  initial={{ opacity: 0.3, x: -8 }}
                  animate={{ opacity: resolved ? 1 : 0.3, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 py-2 px-3 rounded-xl"
                  style={{ background: 'rgba(20,28,46,0.5)', border: '1px solid rgba(45,212,191,0.06)' }}
                >
                  {resolved ? (
                    check.type === 'check' ? <CheckCircle size={14} className="text-[#2ED47A] flex-shrink-0" /> :
                    check.type === 'warn' ? <AlertTriangle size={14} className="text-[#F5A524] flex-shrink-0" /> :
                    <XCircle size={14} className="text-[#F04438] flex-shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-[rgba(45,212,191,0.2)] flex-shrink-0" />
                  )}
                  <span className={`text-xs ${resolved ? 'text-[#E6EAF2]' : 'text-[#8B95AB]'}`}>{check.field}</span>
                  {resolved && (
                    <span className={`ml-auto text-[10px] font-mono ${
                      check.type === 'check' ? 'text-[#2ED47A]' : check.type === 'warn' ? 'text-[#F5A524]' : 'text-[#F04438]'
                    }`}>
                      {check.type === 'check' ? 'PASS' : check.type === 'warn' ? 'WARN' : 'FAIL'}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
          {checks.length === VALIDATION_CHECKS.length && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl flex gap-4"
              style={{ background: 'rgba(20,28,46,0.8)', border: '1px solid rgba(45,212,191,0.15)' }}
            >
              <div className="text-center">
                <p className="font-mono text-lg font-bold text-[#2ED47A]">{passCount}</p>
                <p className="text-[10px] text-[#8B95AB]">PASS</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-lg font-bold text-[#F5A524]">{warnCount}</p>
                <p className="text-[10px] text-[#8B95AB]">WARN</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-lg font-bold text-[#F04438]">{failCount}</p>
                <p className="text-[10px] text-[#8B95AB]">FAIL</p>
              </div>
              {/* Rule trace */}
              <button
                onClick={() => setRuleTraceOpen(o => !o)}
                className="ml-auto flex items-center gap-1 text-xs text-[#8B95AB] hover:text-[#2DD4BF] transition-colors"
              >
                Rule Trace {ruleTraceOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
            </motion.div>
          )}
          <AnimatePresence>
            {ruleTraceOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 p-3 rounded-xl" style={{ background: 'rgba(8,12,22,0.9)', border: '1px solid rgba(45,212,191,0.08)' }}>
                  {['RI-001 → PASS', 'EI-001 → FAIL (score: 0.89)', 'RB-003 → WARN (age-edu mismatch)', 'TC-001 → PASS', 'CS-001 → PASS'].map(r => (
                    <p key={r} className={`text-[10px] font-mono py-0.5 ${
                      r.includes('FAIL') ? 'text-[#F04438]' : r.includes('WARN') ? 'text-[#F5A524]' : 'text-[#2DD4BF]'
                    }`}>{r}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>

      {/* Terminal log */}
      <div className="col-span-4">
        <GlassCard className="p-4 h-full flex flex-col">
          <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">Console Log</h3>
          <div ref={logRef} className="terminal-panel flex-1" style={{ minHeight: 300 }}>
            {logs.map((line, i) => (
              <div key={i} className={`py-0.5 text-[10px] leading-relaxed ${
                line.includes('[WARN]') ? 'text-[#F5A524]' :
                line.includes('[INFO]') && line.includes('FAIL') ? 'text-[#F04438]' :
                line.includes('[DONE]') ? 'text-[#2ED47A]' : 'text-[#2DD4BF]'
              }`}>{line}</div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function BatchModePanel() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [passCount, setPassCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    setRunning(true);
    const start = Date.now();
    const total = 2914;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / 4000) * 100, 100);
      const processed = Math.round((p / 100) * total);
      setProgress(Math.round(p));
      setPassCount(Math.round(processed * 0.962));
      setFailCount(Math.round(processed * 0.038));
      const line = `[${new Date().toLocaleTimeString('en-IN', { hour12: false })}] Processed ${processed}/${total} records — Pass: ${Math.round(processed * 0.962)}, Flag: ${Math.round(processed * 0.038)}`;
      setLogs(prev => [...prev.slice(-20), line]);
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
      if (p >= 100) {
        clearInterval(interval);
        setRunning(false);
        showToast('Batch PLFS_Batch_0847.csv validated successfully', 'success');
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const eta = running ? Math.max(0, Math.round((4000 - ((Date.now() % 4000))) / 1000)) : 0;

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 flex flex-col gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[#E6EAF2]">PLFS_Batch_0847.csv</h3>
              <p className="text-xs text-[#8B95AB]">2,914 records · 4.2 MB · Batch validation</p>
            </div>
            <div className="flex items-center gap-2">
              {running && <PulseDot color="teal" />}
              <span className="text-xs font-mono text-[#2DD4BF]">{progress}%</span>
            </div>
          </div>
          {/* Circular progress */}
          <div className="flex items-center gap-6">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(45,212,191,0.1)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke="#2DD4BF" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 0.2s ease' }}
              />
              <text x="50" y="50" textAnchor="middle" dy="4" fill="#2DD4BF" fontSize="14" fontFamily="JetBrains Mono" fontWeight="700">{progress}%</text>
            </svg>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <p className="font-mono text-2xl font-bold text-[#2ED47A]">{passCount.toLocaleString()}</p>
                  <p className="text-xs text-[#8B95AB]">Passed</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-2xl font-bold text-[#F04438]">{failCount.toLocaleString()}</p>
                  <p className="text-xs text-[#8B95AB]">Flagged</p>
                </div>
              </div>
              {running && <p className="text-xs text-[#8B95AB] text-center mt-2">ETA: ~{eta}s</p>}
              {!running && <p className="text-xs text-[#2ED47A] text-center mt-2 font-semibold">✓ Validation Complete</p>}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">Batch Console</h3>
          <div ref={logRef} className="terminal-panel" style={{ minHeight: 180 }}>
            {logs.map((line, i) => (
              <div key={i} className="py-0.5 text-[10px] text-[#2DD4BF] leading-relaxed">{line}</div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="col-span-4 flex flex-col gap-4">
        <GlassCard className="p-4">
          <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">Batch Queue</h3>
          {['PLFS_Batch_0847.csv', 'PLFS_Batch_0848.csv', 'PLFS_Batch_0849.csv'].map((f, i) => (
            <div key={f} className="flex items-center gap-3 py-2">
              <span className={`w-2 h-2 rounded-full ${
                i === 0 ? 'bg-[#2DD4BF] animate-pulse-teal' : i === 1 ? 'bg-[#F5A524]' : 'bg-[#8B95AB]'
              }`} />
              <span className="text-xs font-mono text-[#E6EAF2] flex-1 truncate">{f}</span>
              <span className={`text-[10px] ${
                i === 0 ? 'text-[#2DD4BF]' : i === 1 ? 'text-[#F5A524]' : 'text-[#8B95AB]'
              }`}>{i === 0 ? 'Running' : i === 1 ? 'Queued' : 'Waiting'}</span>
            </div>
          ))}
        </GlassCard>
        <GlassCard className="p-4">
          <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">Validation Rules Active</h3>
          {[
            { name: 'Referential Integrity', count: 3 },
            { name: 'Existential Integrity', count: 3 },
            { name: 'Range & Bounds', count: 4 },
            { name: 'Temporal Consistency', count: 3 },
          ].map(r => (
            <div key={r.name} className="flex items-center justify-between py-1.5">
              <span className="text-xs text-[#8B95AB]">{r.name}</span>
              <span className="font-mono text-xs text-[#2DD4BF]">{r.count} rules</span>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}

export default function ValidationPage() {
  const [mode, setMode] = useState<'interactive' | 'batch'>('interactive');

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#E6EAF2]">Validation Console</h1>
          <p className="text-sm text-[#8B95AB]">Run interactive or batch validation against active rules</p>
        </div>
        <div
          className="flex gap-1 p-1 rounded-xl"
          style={{ background: 'rgba(20,28,46,0.8)', border: '1px solid rgba(45,212,191,0.12)' }}
        >
          {(['interactive', 'batch'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="relative px-4 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize"
              style={{ color: mode === m ? '#0B1220' : '#8B95AB' }}
            >
              {mode === m && (
                <motion.div layoutId="val-mode" className="absolute inset-0 rounded-lg" style={{ background: '#2DD4BF' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
              )}
              <span className="relative">{m}</span>
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={mode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
          {mode === 'interactive' ? <InteractiveModePanel /> : <BatchModePanel />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
