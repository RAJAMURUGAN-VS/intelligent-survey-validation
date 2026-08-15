export interface ModelConfig {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  lastTrained: string;
  status: 'active' | 'draft' | 'deprecated';
  description: string;
  contamination?: number;
  threshold?: number;
  scoreDistribution: number[];
  aucRoc: number;
}

export const models: ModelConfig[] = [
  {
    id: 'iso-forest-v3',
    name: 'Isolation Forest',
    type: 'Unsupervised',
    accuracy: 94.2,
    precision: 91.8,
    recall: 88.5,
    f1: 90.1,
    lastTrained: '2025-01-10T08:00:00Z',
    status: 'active',
    description: 'Tree-based ensemble method that isolates anomalies by randomly partitioning feature space. Optimized for high-dimensional PLFS survey features.',
    contamination: 0.05,
    threshold: 0.65,
    scoreDistribution: [12, 28, 45, 62, 71, 58, 42, 31, 24, 18, 14, 22, 38, 48, 41, 32, 21, 15, 8, 5],
    aucRoc: 0.963,
  },
  {
    id: 'zscore-v2',
    name: 'Z-Score Outlier',
    type: 'Statistical',
    accuracy: 91.5,
    precision: 87.2,
    recall: 92.4,
    f1: 89.7,
    lastTrained: '2025-01-08T14:30:00Z',
    status: 'active',
    description: 'Univariate statistical outlier detection using z-score normalization. Applied to continuous fields like wage, weekly hours, and household income.',
    contamination: 0.03,
    threshold: 2.5,
    scoreDistribution: [8, 18, 35, 55, 72, 68, 55, 40, 30, 22, 16, 25, 42, 52, 45, 35, 22, 12, 6, 3],
    aucRoc: 0.941,
  },
  {
    id: 'bayes-v1',
    name: 'Bayesian Anomaly Detector',
    type: 'Probabilistic',
    accuracy: 93.1,
    precision: 90.4,
    recall: 91.2,
    f1: 90.8,
    lastTrained: '2025-01-09T11:00:00Z',
    status: 'active',
    description: 'Probabilistic model using Bayesian inference to estimate the likelihood of observed values under a learned prior distribution of PLFS responses.',
    contamination: 0.04,
    threshold: 0.70,
    scoreDistribution: [10, 22, 40, 58, 70, 65, 52, 38, 28, 20, 15, 24, 40, 50, 43, 33, 20, 11, 5, 2],
    aucRoc: 0.955,
  },
  {
    id: 'lstm-v2',
    name: 'LSTM Temporal Drift',
    type: 'Deep Learning',
    accuracy: 95.8,
    precision: 93.5,
    recall: 90.1,
    f1: 91.8,
    lastTrained: '2025-01-11T06:00:00Z',
    status: 'active',
    description: 'Long Short-Term Memory network trained on sequential survey visit data to detect temporal drift and inconsistencies between Visit 1 and Visit 2 responses.',
    contamination: 0.04,
    threshold: 0.72,
    scoreDistribution: [6, 14, 28, 48, 65, 72, 62, 48, 35, 25, 18, 28, 45, 55, 48, 38, 25, 14, 7, 3],
    aucRoc: 0.978,
  },
  {
    id: 'dbscan-v1',
    name: 'DBSCAN Clustering',
    type: 'Density-based',
    accuracy: 88.9,
    precision: 84.6,
    recall: 89.3,
    f1: 86.9,
    lastTrained: '2025-01-07T16:00:00Z',
    status: 'active',
    description: 'Density-based spatial clustering for anomaly detection, identifying enumerator-level and geographic clustering patterns in flagged record distributions.',
    contamination: 0.06,
    threshold: 0.60,
    scoreDistribution: [15, 32, 50, 65, 70, 62, 50, 38, 28, 20, 14, 20, 35, 45, 38, 28, 18, 10, 5, 2],
    aucRoc: 0.921,
  },
];

export const rocCurveData = [
  { fpr: 0, tpr: 0 }, { fpr: 0.02, tpr: 0.18 }, { fpr: 0.05, tpr: 0.42 },
  { fpr: 0.08, tpr: 0.62 }, { fpr: 0.12, tpr: 0.78 }, { fpr: 0.18, tpr: 0.88 },
  { fpr: 0.25, tpr: 0.93 }, { fpr: 0.35, tpr: 0.96 }, { fpr: 0.50, tpr: 0.98 },
  { fpr: 0.70, tpr: 0.99 }, { fpr: 1.0, tpr: 1.0 },
];
