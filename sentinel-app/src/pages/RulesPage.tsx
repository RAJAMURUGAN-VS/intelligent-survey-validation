import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { SeverityBadge } from '../components/SeverityBadge';
import { useToast } from '../components/Toast';
import { ruleCategories, type IntegrityRule } from '../data/rules';
import { ChevronDown, ChevronRight, Plus, Play, Shield, X } from 'lucide-react';

const CONDITION_PARTS = {
  field: ['Household Income', 'Employment Status', 'Wage Field', 'Age', 'Education Level', 'Weekly Hours', 'Industry Code'],
  op: ['EXISTS', 'IS NOT NULL', '> 0', '<= 84', '= Employed', '= Graduate'],
  connector: ['AND', 'OR', 'THEN'],
  field2: ['Wage Field', 'Employment Record', 'Principal Activity', 'Industry Code'],
  constraint: ['MUST NOT BE NULL', 'MUST EXIST', 'MUST BE > 0', 'MUST BE plausible'],
};

const mockTestData = [
  { id: 'PLFS-KA-00214', wage: 1450, status: 'Unemployed', age: 28, edu: 'Graduate' },
  { id: 'PLFS-MH-00891', wage: 320, status: 'Employed', age: 14, edu: 'Graduate' },
  { id: 'PLFS-UP-02341', wage: 4200, status: 'Self-employed', age: 35, edu: 'Higher Secondary' },
  { id: 'PLFS-TN-00567', wage: 580, status: 'Employed', age: 32, edu: 'Secondary' },
  { id: 'PLFS-BR-01129', wage: 0, status: 'Unemployed', age: 42, edu: 'Primary' },
];

export default function RulesPage() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['referential']));
  const [selectedRule, setSelectedRule] = useState<IntegrityRule | null>(ruleCategories[0].rules[0]);
  const [testResults, setTestResults] = useState<Record<string, 'pass' | 'fail'>>({});
  const [testing, setTesting] = useState(false);
  const [selectedParts, setSelectedParts] = useState({ field: 0, op: 0, connector: 0, field2: 0, constraint: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [extraRules, setExtraRules] = useState<IntegrityRule[]>([]);
  const { showToast } = useToast();

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const runTest = () => {
    setTesting(true);
    setTestResults({});
    mockTestData.forEach((row, i) => {
      setTimeout(() => {
        const pass = Math.random() > 0.35;
        setTestResults(prev => ({ ...prev, [row.id]: pass ? 'pass' : 'fail' }));
      }, i * 200);
    });
    setTimeout(() => setTesting(false), mockTestData.length * 200 + 200);
  };

  const donutData = [
    { name: 'Pass', value: 78, fill: '#2ED47A' },
    { name: 'Flagged', value: 14, fill: '#F5A524' },
    { name: 'Fail', value: 8, fill: '#F04438' },
  ];

  const mostTriggered = [
    { id: 'EI-001', name: 'Wage-Employment Consistency', count: 2341 },
    { id: 'TC-001', name: 'Visit 1 vs Visit 2 Status Change', count: 2187 },
    { id: 'RI-001', name: 'HH Member-Employment Link', count: 1842 },
    { id: 'RB-001', name: 'Daily Wage Plausibility', count: 1567 },
    { id: 'EI-002', name: 'Activity Status Completeness', count: 1102 },
  ];

  const allRules = [...ruleCategories.flatMap(c => c.rules), ...extraRules];

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#E6EAF2]">Integrity Rules Engine</h1>
          <p className="text-sm text-[#8B95AB]">Configure and test validation rules</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
        >
          <Plus size={15} /> New Rule
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Left: Rule tree */}
        <div className="col-span-3">
          <GlassCard className="p-3">
            <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider px-2 mb-2">Rule Library</h3>
            {ruleCategories.map(cat => (
              <div key={cat.id}>
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[rgba(45,212,191,0.04)] transition-colors"
                >
                  {expandedCategories.has(cat.id) ? <ChevronDown size={14} className="text-[#2DD4BF]" /> : <ChevronRight size={14} className="text-[#8B95AB]" />}
                  <span className="text-xs font-medium text-[#E6EAF2]">{cat.name}</span>
                  <span className="ml-auto text-[10px] font-mono text-[#8B95AB]">{cat.rules.length}</span>
                </button>
                <AnimatePresence>
                  {expandedCategories.has(cat.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4"
                    >
                      {cat.rules.map(rule => (
                        <button
                          key={rule.id}
                          onClick={() => setSelectedRule(rule)}
                          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors"
                          style={{
                            background: selectedRule?.id === rule.id ? 'rgba(45,212,191,0.08)' : 'transparent',
                          }}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            rule.status === 'active' ? 'bg-[#2ED47A]' : rule.status === 'draft' ? 'bg-[#F5A524]' : 'bg-[#8B95AB]'
                          }`} />
                          <span className="text-xs text-[#8B95AB] truncate">{rule.name}</span>
                        </button>
                      ))}
                      {extraRules.filter(r => r.category === cat.name).map(rule => (
                        <button key={rule.id} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#F5A524]" />
                          <span className="text-xs text-[#8B95AB] truncate">{rule.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* Center: Rule builder */}
        <div className="col-span-6 flex flex-col gap-4">
          {selectedRule && (
            <GlassCard className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <Shield size={16} className="text-[#2DD4BF]" />
                <h2 className="text-sm font-semibold text-[#E6EAF2]">{selectedRule.name}</h2>
                <SeverityBadge severity={selectedRule.severity} size="sm" />
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                  selectedRule.status === 'active' ? 'badge-success' : selectedRule.status === 'draft' ? 'badge-amber' : 'badge-teal'
                }`}>{selectedRule.status}</span>
              </div>
              <p className="text-xs text-[#8B95AB] mb-4">{selectedRule.description}</p>

              {/* Sentence builder */}
              <div className="p-4 rounded-xl mb-4" style={{ background: 'rgba(20,28,46,0.8)', border: '1px solid rgba(45,212,191,0.1)' }}>
                <p className="text-xs text-[#8B95AB] uppercase tracking-wider mb-2">Rule Condition</p>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs text-[#8B95AB]">IF</span>
                  {(['field', 'op', 'connector', 'field2', 'constraint'] as const).map((part, pi) => (
                    <div key={part} className="relative group">
                      <select
                        value={selectedParts[part]}
                        onChange={e => setSelectedParts(p => ({ ...p, [part]: Number(e.target.value) }))}
                        className="text-xs px-2 py-1 rounded-lg cursor-pointer appearance-none pr-5"
                        style={{
                          background: pi === 2 ? 'rgba(139,127,232,0.15)' : 'rgba(45,212,191,0.1)',
                          border: pi === 2 ? '1px solid rgba(139,127,232,0.3)' : '1px solid rgba(45,212,191,0.2)',
                          color: pi === 2 ? '#8B7FE8' : '#2DD4BF',
                        }}
                      >
                        {CONDITION_PARTS[part].map((opt, i) => (
                          <option key={i} value={i} style={{ background: '#141C2E', color: '#E6EAF2' }}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Test section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider">Test Against Sample Data</h3>
                  <button
                    onClick={runTest}
                    disabled={testing}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{ background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.2)', color: '#2DD4BF' }}
                  >
                    <Play size={11} /> Run Test
                  </button>
                </div>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(45,212,191,0.08)' }}>
                  <table className="w-full">
                    <thead>
                      <tr style={{ background: 'rgba(20,28,46,0.9)' }}>
                        {['Record ID', 'Wage', 'Status', 'Age', 'Result'].map(h => (
                          <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-[#8B95AB]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockTestData.map((row, i) => (
                        <tr key={row.id} style={{ background: i % 2 === 0 ? 'rgba(20,28,46,0.5)' : 'rgba(20,28,46,0.2)', borderTop: '1px solid rgba(45,212,191,0.05)' }}>
                          <td className="px-3 py-2 font-mono text-[10px] text-[#2DD4BF]">{row.id}</td>
                          <td className="px-3 py-2 font-mono text-xs">{row.wage.toLocaleString()}</td>
                          <td className="px-3 py-2 text-xs text-[#8B95AB]">{row.status}</td>
                          <td className="px-3 py-2 font-mono text-xs">{row.age}</td>
                          <td className="px-3 py-2">
                            {testing && !testResults[row.id] ? (
                              <div className="w-12 h-4 rounded animate-shimmer" />
                            ) : testResults[row.id] ? (
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                testResults[row.id] === 'pass' ? 'badge-success' : 'badge-danger'
                              }`}>
                                {testResults[row.id] === 'pass' ? '✓ Pass' : '✗ Fail'}
                              </span>
                            ) : (
                              <span className="text-[10px] text-[#8B95AB]">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </GlassCard>
          )}
        </div>

        {/* Right: Charts */}
        <div className="col-span-3 flex flex-col gap-4">
          <GlassCard className="p-4">
            <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-2">Rule Evaluation</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                  {donutData.map((d, i) => <Cell key={i} fill={d.fill} fillOpacity={0.85} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ background: 'rgba(20,28,46,0.95)', border: '1px solid rgba(45,212,191,0.2)', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4">
              {donutData.map(d => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
                  <span className="text-[10px] text-[#8B95AB]">{d.name} {d.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">Most Triggered</h3>
            {mostTriggered.map((r, i) => (
              <div key={r.id} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#8B95AB]">{r.id}</span>
                </div>
                <span className="font-mono text-xs text-[#F5A524]">{r.count.toLocaleString()}</span>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>

      {/* New Rule Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[rgba(11,18,32,0.8)] backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              style={{ pointerEvents: 'none' }}
            >
              <div className="glass-card p-6 w-full max-w-lg" style={{ pointerEvents: 'all' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-[#E6EAF2]">Create New Rule</h3>
                  <button onClick={() => setModalOpen(false)} className="text-[#8B95AB] hover:text-[#E6EAF2]"><X size={18} /></button>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs text-[#8B95AB] mb-1 block">Rule Name</label>
                    <input type="text" placeholder="e.g. Household Member Age Validation" className="w-full px-3 py-2 text-sm" style={{ borderRadius: 8 }} />
                  </div>
                  <div>
                    <label className="text-xs text-[#8B95AB] mb-1 block">Category</label>
                    <select className="w-full px-3 py-2 text-sm" style={{ borderRadius: 8 }}>
                      {ruleCategories.map(c => <option key={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#8B95AB] mb-2 block">Condition Builder</label>
                    <div className="flex flex-wrap gap-2 p-3 rounded-xl" style={{ background: 'rgba(20,28,46,0.8)', border: '1px solid rgba(45,212,191,0.1)' }}>
                      {['IF', '[Field]', 'EXISTS', 'AND', '[Field2]', 'MUST NOT BE NULL'].map((t, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-lg" style={{
                          background: i % 2 === 0 ? 'rgba(45,212,191,0.1)' : 'rgba(139,127,232,0.1)',
                          border: '1px solid rgba(45,212,191,0.15)', color: '#2DD4BF',
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setModalOpen(false)} className="btn-ghost flex-1 py-2 text-sm">Cancel</button>
                    <button
                      onClick={() => {
                        setModalOpen(false);
                        showToast('New rule saved to Draft', 'success');
                        setExtraRules(prev => [...prev, {
                          id: `CUSTOM-${Date.now()}`, name: 'Custom Validation Rule',
                          category: 'Referential Integrity', status: 'draft', triggered: 0,
                          description: 'User-defined rule', condition: 'IF [Field] EXISTS AND [Field2] MUST NOT BE NULL',
                          severity: 'medium',
                        }]);
                      }}
                      className="btn-primary flex-1 py-2 text-sm"
                    >
                      Save Rule
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
