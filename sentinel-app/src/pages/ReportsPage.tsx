import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { useToast } from '../components/Toast';
import { reportTemplates, type ReportTemplate, exportHistory } from '../data/reportTemplates';
import { FileText, Users, Cpu, Shield, Database, Download, X } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'file-text': <FileText size={20} />,
  'users': <Users size={20} />,
  'cpu': <Cpu size={20} />,
  'shield-check': <Shield size={20} />,
  'database': <Database size={20} />,
};

const FORMATS = ['PDF', 'Excel', 'CSV', 'JSON'];

const formatColors: Record<string, string> = {
  PDF: '#F04438', Excel: '#2ED47A', CSV: '#2DD4BF', JSON: '#8B7FE8',
};

function ReportPreview({ template }: { template: ReportTemplate }) {
  const chartBars = [42, 67, 34, 78, 55, 89, 62];
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4"
      style={{
        background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
        border: '1px solid rgba(0,0,0,0.08)',
        minHeight: 420,
        color: '#1a1a2e',
      }}
    >
      {/* Report header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-[#0B1220]">◆ Sentinel</span>
              <span className="text-[10px] bg-[#E0F2F1] text-[#0B8D7A] px-2 py-0.5 rounded-full font-semibold">NSO Official</span>
            </div>
            <h2 className="text-base font-bold text-gray-800">{template.name}</h2>
            <p className="text-xs text-gray-500">PLFS 2024–25 · Survey Period: Q3 (Oct–Dec 2024)</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Generated: {new Date().toLocaleDateString('en-IN')}</p>
            <p className="text-xs text-gray-400">Pages: {template.pageCount}</p>
            <p className="text-xs text-gray-400">Classification: Restricted</p>
          </div>
        </div>
      </div>

      {/* Executive summary */}
      <div>
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Executive Summary</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          This report presents the anomaly detection results for PLFS Q3 2024 across 28 states and UTs.
          A total of 8,941 records were flagged out of 214,820 ingested (flag rate: 4.16%), with
          ML models achieving an average AUC-ROC of 0.952 across all active detectors.
        </p>
      </div>

      {/* Mini chart */}
      <div>
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Flag Rate Trend</h3>
        <div className="flex items-end gap-1 h-16">
          {chartBars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t"
              style={{ height: `${h}%`, background: i === chartBars.length - 1 ? '#0B8D7A' : '#B2DFDB', transition: 'height 0.3s' }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-gray-400 mt-1">
          {['Oct W1', 'Oct W2', 'Nov W1', 'Nov W2', 'Dec W1', 'Dec W2', 'Jan W1'].map(l => <span key={l}>{l}</span>)}
        </div>
      </div>

      {/* Data table snippet */}
      <div>
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Top Flagged States</h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-200">
              {['State', 'Records', 'Flagged', 'Flag Rate'].map(h => (
                <th key={h} className="py-1.5 text-left font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { state: 'Uttar Pradesh', records: '18,420', flagged: '842', rate: '4.57%' },
              { state: 'Bihar', records: '14,890', flagged: '734', rate: '4.93%' },
              { state: 'Maharashtra', records: '15,230', flagged: '621', rate: '4.08%' },
            ].map(row => (
              <tr key={row.state} className="border-b border-gray-100">
                <td className="py-1.5 text-gray-700">{row.state}</td>
                <td className="py-1.5 text-gray-600 font-mono">{row.records}</td>
                <td className="py-1.5 text-gray-600 font-mono">{row.flagged}</td>
                <td className="py-1.5 font-mono" style={{ color: '#0B8D7A' }}>{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-gray-100 pt-3 flex justify-between items-center">
        <p className="text-[9px] text-gray-400">Ministry of Statistics &amp; Programme Implementation, Government of India</p>
        <p className="text-[9px] text-gray-400">Page 1 of {template.pageCount}</p>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate>(reportTemplates[0]);
  const [selectedFormat, setSelectedFormat] = useState('PDF');
  const [selectedSections, setSelectedSections] = useState<Set<string>>(new Set(['summary', 'charts', 'tables', 'rules']));
  const [schedule, setSchedule] = useState('Monthly');
  const [generating, setGenerating] = useState(false);
  const [history, setHistory] = useState(exportHistory);
  const { showToast } = useToast();

  const toggleSection = (s: string) => {
    setSelectedSections(prev => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  };

  const handleExport = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      showToast(`${selectedTemplate.name} exported as ${selectedFormat} (mock)`, 'success');
      setHistory(prev => [{
        id: `EXP-${String(prev.length + 1).padStart(3, '0')}`,
        reportName: selectedTemplate.name,
        format: selectedFormat,
        generatedAt: new Date().toISOString(),
        size: `${(Math.random() * 4 + 0.5).toFixed(1)} MB`,
        requestedBy: 'HSD Admin',
      }, ...prev]);
    }, 1500);
  };

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#E6EAF2]">Reports & Export Center</h1>
        <p className="text-sm text-[#8B95AB]">Generate, preview and export validated survey reports</p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Left: Templates */}
        <div className="col-span-3 flex flex-col gap-2">
          {reportTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className="w-full text-left p-4 rounded-xl transition-all duration-200"
              style={{
                background: selectedTemplate.id === template.id ? 'rgba(45,212,191,0.1)' : 'rgba(20,28,46,0.6)',
                border: selectedTemplate.id === template.id ? '1px solid rgba(45,212,191,0.35)' : '1px solid rgba(45,212,191,0.1)',
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span style={{ color: selectedTemplate.id === template.id ? '#2DD4BF' : '#8B95AB' }}>
                  {iconMap[template.icon]}
                </span>
                <span className="text-xs font-semibold" style={{ color: selectedTemplate.id === template.id ? '#E6EAF2' : '#8B95AB' }}>
                  {template.name}
                </span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {template.tags.map(tag => (
                  <span key={tag} className="text-[9px] badge-teal px-1.5 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
              <p className="text-[10px] text-[#8B95AB] mt-1">{template.frequency} · {template.pageCount}pp</p>
            </button>
          ))}
        </div>

        {/* Center: Preview */}
        <div className="col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTemplate.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ReportPreview template={selectedTemplate} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Export options */}
        <div className="col-span-3 flex flex-col gap-4">
          <GlassCard className="p-4">
            <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">Export Format</h3>
            <div className="grid grid-cols-2 gap-2">
              {FORMATS.map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className="py-2 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: selectedFormat === fmt ? `${formatColors[fmt]}20` : 'rgba(20,28,46,0.8)',
                    border: `1px solid ${selectedFormat === fmt ? formatColors[fmt] + '60' : 'rgba(45,212,191,0.12)'}`,
                    color: selectedFormat === fmt ? formatColors[fmt] : '#8B95AB',
                  }}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">Include Sections</h3>
            {[
              { id: 'summary', label: 'Executive Summary' },
              { id: 'charts', label: 'Charts & Visuals' },
              { id: 'tables', label: 'Data Tables' },
              { id: 'rules', label: 'Rule Audit Log' },
              { id: 'models', label: 'Model Metrics' },
            ].map(section => (
              <div key={section.id} className="flex items-center justify-between py-2">
                <span className="text-xs text-[#8B95AB]">{section.label}</span>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-9 h-5 rounded-full transition-all relative"
                  style={{
                    background: selectedSections.has(section.id) ? '#2DD4BF' : 'rgba(45,212,191,0.15)',
                  }}
                >
                  <span
                    className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
                    style={{
                      background: 'white',
                      left: selectedSections.has(section.id) ? '18px' : '2px',
                    }}
                  />
                </button>
              </div>
            ))}
          </GlassCard>

          <GlassCard className="p-4">
            <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">Schedule</h3>
            <div className="flex flex-col gap-2">
              {['Weekly', 'Monthly', 'On Demand'].map(s => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <span
                    className="w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0"
                    style={{
                      border: schedule === s ? '1px solid #2DD4BF' : '1px solid rgba(45,212,191,0.2)',
                      background: schedule === s ? '#2DD4BF' : 'transparent',
                    }}
                    onClick={() => setSchedule(s)}
                  >
                    {schedule === s && <span className="w-1.5 h-1.5 rounded-full bg-[#0B1220]" />}
                  </span>
                  <span className="text-xs text-[#8B95AB]">{s}</span>
                </label>
              ))}
            </div>
          </GlassCard>

          <button
            onClick={handleExport}
            disabled={generating}
            className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
            style={{ opacity: generating ? 0.7 : 1 }}
          >
            {generating ? (
              <svg className="animate-spin-slow" width="16" height="16" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6" stroke="rgba(11,18,32,0.3)" strokeWidth="2" fill="none" />
                <path d="M8 2 A6 6 0 0 1 14 8" stroke="#0B1220" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            ) : <Download size={15} />}
            {generating ? 'Generating...' : 'Export Now'}
          </button>
        </div>
      </div>

      {/* Export history */}
      <GlassCard className="mt-4 p-5">
        <h3 className="text-sm font-semibold text-[#E6EAF2] mb-4">Export History</h3>
        <div className="overflow-auto rounded-xl" style={{ border: '1px solid rgba(45,212,191,0.1)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: 'rgba(20,28,46,0.9)' }}>
                {['Export ID', 'Report', 'Format', 'Generated', 'Size', 'By', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#8B95AB]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map((entry, i) => (
                <tr key={entry.id} style={{ background: i % 2 === 0 ? 'rgba(20,28,46,0.5)' : 'rgba(20,28,46,0.2)', borderTop: '1px solid rgba(45,212,191,0.05)' }}>
                  <td className="px-4 py-3 font-mono text-xs text-[#2DD4BF]">{entry.id}</td>
                  <td className="px-4 py-3 text-xs text-[#E6EAF2]">{entry.reportName}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{
                      background: `${formatColors[entry.format]}20`,
                      color: formatColors[entry.format],
                      border: `1px solid ${formatColors[entry.format]}40`,
                    }}>{entry.format}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[#8B95AB]">{new Date(entry.generatedAt).toLocaleString('en-IN', { hour12: false })}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#8B95AB]">{entry.size}</td>
                  <td className="px-4 py-3 text-xs text-[#8B95AB]">{entry.requestedBy}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => showToast(`Downloading ${entry.reportName} (mock)`, 'info')}
                      className="p-1.5 rounded-lg hover:bg-[rgba(45,212,191,0.08)] transition-colors"
                    >
                      <Download size={13} className="text-[#8B95AB] hover:text-[#2DD4BF]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
