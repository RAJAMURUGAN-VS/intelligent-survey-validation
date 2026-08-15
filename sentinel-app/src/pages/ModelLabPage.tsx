import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Legend,
} from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { models, rocCurveData, type ModelConfig } from '../data/models';
import { Cpu, Play, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '../components/Toast';

const trainingSteps = [
  'Loading historical PLFS data...',
  'Extracting survey features...',
  'Normalizing field distributions...',
  'Fitting model parameters...',
  'Evaluating on holdout set...',
  'Model trained successfully!',
];

function ModelFlowDiagram({ selectedModel }: { selectedModel: ModelConfig }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-4">
      {[
        { label: 'Historical PLFS Data 2024', color: '#2DD4BF', icon: '🗄️' },
        { label: 'Feature Engineering', color: '#8B7FE8', icon: '⚙️' },
        { label: selectedModel.name, color: '#2DD4BF', icon: '🤖' },
        { label: 'Anomaly Score Output', color: '#2ED47A', icon: '📊' },
      ].map((node, i, arr) => (
        <div key={node.label} className="flex items-center gap-2 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="px-4 py-3 rounded-xl text-center min-w-[140px]"
              style={{
                background: 'rgba(20,28,46,0.9)',
                border: `1px solid ${node.color}40`,
                boxShadow: `0 0 16px ${node.color}12`,
              }}
            >
              <div className="text-xl mb-1">{node.icon}</div>
              <p className="text-xs font-semibold" style={{ color: node.color }}>{node.label}</p>
              <p className="text-[10px] text-[#8B95AB] mt-0.5">
                {i === 0 ? '214,820 records' : i === 1 ? '28 features' : i === 2 ? selectedModel.type : 'Score [0,1]'}
              </p>
            </div>
          </motion.div>
          {i < arr.length - 1 && (
            <svg width="40" height="20" className="flex-shrink-0">
              <defs>
                <linearGradient id={`flow-grad-${i}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={node.color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={arr[i + 1].color} stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <line x1="0" y1="10" x2="36" y2="10" stroke={`url(#flow-grad-${i})`} strokeWidth="1.5" strokeDasharray="4 3" className="animate-dash-flow" />
              <polygon points="34,7 40,10 34,13" fill={arr[i + 1].color} opacity="0.8" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ModelLabPage() {
  const [selectedModel, setSelectedModel] = useState<ModelConfig>(models[0]);
  const [contamination, setContamination] = useState(selectedModel.contamination ?? 0.05);
  const [threshold, setThreshold] = useState(0.65);
  const [training, setTraining] = useState(false);
  const [trainingStep, setTrainingStep] = useState(0);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainedMetrics, setTrainedMetrics] = useState({ precision: selectedModel.precision, recall: selectedModel.recall, f1: selectedModel.f1 });
  const { showToast } = useToast();

  const handleTrain = () => {
    if (training) return;
    setTraining(true);
    setTrainingStep(0);
    setTrainingProgress(0);
    let step = 0;
    const stepInterval = setInterval(() => {
      step++;
      setTrainingStep(step);
      setTrainingProgress(Math.round((step / trainingSteps.length) * 100));
      if (step >= trainingSteps.length) {
        clearInterval(stepInterval);
        setTimeout(() => {
          setTraining(false);
          const delta = (Math.random() - 0.4) * 1.5;
          setTrainedMetrics(m => ({
            precision: Math.min(99, Math.max(80, m.precision + delta)),
            recall: Math.min(99, Math.max(80, m.recall + delta * 0.8)),
            f1: Math.min(99, Math.max(80, m.f1 + delta * 0.9)),
          }));
          showToast(`${selectedModel.name} retrained successfully`, 'success');
        }, 400);
      }
    }, 320);
  };

  const handleSelectModel = (m: ModelConfig) => {
    setSelectedModel(m);
    setContamination(m.contamination ?? 0.05);
    setThreshold(m.threshold ?? 0.65);
    setTrainedMetrics({ precision: m.precision, recall: m.recall, f1: m.f1 });
  };

  const radialData = [
    { name: 'Precision', value: Math.round(trainedMetrics.precision), fill: '#2DD4BF' },
    { name: 'Recall', value: Math.round(trainedMetrics.recall), fill: '#8B7FE8' },
    { name: 'F1 Score', value: Math.round(trainedMetrics.f1), fill: '#2ED47A' },
  ];

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#E6EAF2]">Model Lab</h1>
        <p className="text-sm text-[#8B95AB]">Configure, train and evaluate anomaly detection models</p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Left: Model list */}
        <div className="col-span-3 flex flex-col gap-2">
          {models.map(m => (
            <button
              key={m.id}
              onClick={() => handleSelectModel(m)}
              className="w-full text-left p-4 rounded-xl transition-all duration-200"
              style={{
                background: selectedModel.id === m.id ? 'rgba(139,127,232,0.12)' : 'rgba(20,28,46,0.6)',
                border: selectedModel.id === m.id ? '1px solid rgba(139,127,232,0.4)' : '1px solid rgba(45,212,191,0.1)',
                boxShadow: selectedModel.id === m.id ? '0 0 20px rgba(139,127,232,0.1)' : 'none',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Cpu size={14} style={{ color: selectedModel.id === m.id ? '#8B7FE8' : '#8B95AB' }} />
                <span className="text-xs font-semibold" style={{ color: selectedModel.id === m.id ? '#8B7FE8' : '#E6EAF2' }}>
                  {m.name}
                </span>
              </div>
              <span className="text-[10px] badge-violet px-2 py-0.5 rounded-full">{m.type}</span>
              <div className="mt-2 flex items-center gap-1">
                <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(45,212,191,0.15)' }}>
                  <div className="h-full rounded-full" style={{ width: `${m.accuracy}%`, background: '#2DD4BF' }} />
                </div>
                <span className="text-[10px] font-mono text-[#2DD4BF]">{m.accuracy}%</span>
              </div>
            </button>
          ))}
        </div>

        {/* Center: Flow diagram + controls */}
        <div className="col-span-6 flex flex-col gap-4">
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold text-[#E6EAF2] mb-2">Model Pipeline</h2>
            <ModelFlowDiagram selectedModel={selectedModel} />
            <p className="text-xs text-[#8B95AB] mt-2 leading-relaxed">{selectedModel.description}</p>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold text-[#E6EAF2] mb-4">Hyperparameters</h2>
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-[#8B95AB]">Contamination Rate</label>
                  <span className="font-mono text-xs text-[#2DD4BF]">{contamination.toFixed(3)}</span>
                </div>
                <input type="range" min="0.01" max="0.15" step="0.001" value={contamination}
                  onChange={e => setContamination(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-[#8B95AB]">Confidence Threshold</label>
                  <span className="font-mono text-xs text-[#2DD4BF]">{threshold.toFixed(2)}</span>
                </div>
                <input type="range" min="0.3" max="0.95" step="0.01" value={threshold}
                  onChange={e => setThreshold(Number(e.target.value))} className="w-full" />
              </div>
            </div>

            {training && (
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#8B95AB]">{trainingSteps[Math.min(trainingStep, trainingSteps.length - 1)]}</span>
                  <span className="font-mono text-[#2DD4BF]">{trainingProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(139,127,232,0.15)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #8B7FE8, #2DD4BF)' }}
                    animate={{ width: `${trainingProgress}%` }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleTrain}
              disabled={training}
              className="mt-4 w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                background: training ? 'rgba(139,127,232,0.2)' : 'rgba(139,127,232,0.15)',
                border: '1px solid rgba(139,127,232,0.4)',
                color: '#8B7FE8',
                opacity: training ? 0.7 : 1,
              }}
            >
              <Play size={14} />
              {training ? 'Training...' : 'Train Model'}
            </button>
          </GlassCard>
        </div>

        {/* Right: Metrics */}
        <div className="col-span-3 flex flex-col gap-4">
          <GlassCard className="p-4">
            <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">ROC Curve</h3>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={rocCurveData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fpr" tick={{ fill: '#8B95AB', fontSize: 9 }} tickFormatter={v => v.toFixed(1)} />
                <YAxis dataKey="tpr" tick={{ fill: '#8B95AB', fontSize: 9 }} tickFormatter={v => v.toFixed(1)} />
                <Line type="monotone" dataKey="tpr" stroke="#2DD4BF" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="fpr" stroke="rgba(139,127,232,0.3)" strokeWidth={1} strokeDasharray="3 3" dot={false} name="Random" />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-center font-mono text-[#2DD4BF] mt-1">AUC-ROC: {selectedModel.aucRoc.toFixed(3)}</p>
          </GlassCard>

          <GlassCard className="p-4">
            <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">Performance Metrics</h3>
            <div className="flex flex-col gap-2">
              {radialData.map(d => (
                <div key={d.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-[#8B95AB]">{d.name}</span>
                    <span className="font-mono text-xs" style={{ color: d.fill }}>{d.value.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(45,212,191,0.1)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      animate={{ width: `${d.value}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      style={{ background: d.fill }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <h3 className="text-xs font-semibold text-[#8B95AB] uppercase tracking-wider mb-3">Model Info</h3>
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8B95AB]">Last Trained</span>
                <span className="font-mono text-[#E6EAF2]">{new Date(selectedModel.lastTrained).toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B95AB]">Status</span>
                <span className="badge-success px-2 py-0.5 rounded-full capitalize">{selectedModel.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B95AB]">Accuracy</span>
                <span className="font-mono text-[#2DD4BF]">{selectedModel.accuracy}%</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
