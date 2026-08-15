export interface PrecisionRecallPoint {
  week: string;
  precision: number;
  recall: number;
  f1: number;
  upper: number;
  lower: number;
}

export const timeSeriesDatasets: Record<string, PrecisionRecallPoint[]> = {
  '7D': [
    { week: 'Mon', precision: 91.2, recall: 88.4, f1: 89.8, upper: 93.0, lower: 89.4 },
    { week: 'Tue', precision: 92.1, recall: 89.2, f1: 90.6, upper: 93.9, lower: 90.3 },
    { week: 'Wed', precision: 90.8, recall: 87.9, f1: 89.3, upper: 92.6, lower: 89.0 },
    { week: 'Thu', precision: 93.4, recall: 90.8, f1: 92.1, upper: 95.2, lower: 91.6 },
    { week: 'Fri', precision: 92.8, recall: 91.2, f1: 92.0, upper: 94.6, lower: 91.0 },
    { week: 'Sat', precision: 91.5, recall: 89.7, f1: 90.6, upper: 93.3, lower: 89.7 },
    { week: 'Sun', precision: 93.1, recall: 90.5, f1: 91.8, upper: 94.9, lower: 91.3 },
  ],
  '30D': [
    { week: 'W1', precision: 88.4, recall: 85.2, f1: 86.8, upper: 90.2, lower: 86.6 },
    { week: 'W2', precision: 90.1, recall: 87.4, f1: 88.7, upper: 91.9, lower: 88.3 },
    { week: 'W3', precision: 89.7, recall: 86.9, f1: 88.3, upper: 91.5, lower: 87.9 },
    { week: 'W4', precision: 91.5, recall: 89.1, f1: 90.3, upper: 93.3, lower: 89.7 },
    { week: 'W5', precision: 92.4, recall: 90.2, f1: 91.3, upper: 94.2, lower: 90.6 },
    { week: 'W6', precision: 91.8, recall: 89.5, f1: 90.6, upper: 93.6, lower: 89.8 },
    { week: 'W7', precision: 93.2, recall: 91.4, f1: 92.3, upper: 95.0, lower: 91.4 },
    { week: 'W8', precision: 92.6, recall: 90.8, f1: 91.7, upper: 94.4, lower: 91.0 },
  ],
  'Quarter': [
    { week: 'Oct W1', precision: 85.2, recall: 82.1, f1: 83.6, upper: 87.0, lower: 83.4 },
    { week: 'Oct W2', precision: 86.8, recall: 83.9, f1: 85.3, upper: 88.6, lower: 85.0 },
    { week: 'Oct W3', precision: 88.1, recall: 85.4, f1: 86.7, upper: 89.9, lower: 86.3 },
    { week: 'Oct W4', precision: 87.5, recall: 84.8, f1: 86.1, upper: 89.3, lower: 85.7 },
    { week: 'Nov W1', precision: 89.2, recall: 86.5, f1: 87.8, upper: 91.0, lower: 87.4 },
    { week: 'Nov W2', precision: 90.4, recall: 87.8, f1: 89.1, upper: 92.2, lower: 88.6 },
    { week: 'Nov W3', precision: 91.1, recall: 88.6, f1: 89.8, upper: 92.9, lower: 89.3 },
    { week: 'Nov W4', precision: 90.8, recall: 88.2, f1: 89.5, upper: 92.6, lower: 89.0 },
    { week: 'Dec W1', precision: 92.0, recall: 89.5, f1: 90.7, upper: 93.8, lower: 90.2 },
    { week: 'Dec W2', precision: 91.5, recall: 89.1, f1: 90.3, upper: 93.3, lower: 89.7 },
    { week: 'Dec W3', precision: 93.1, recall: 90.8, f1: 91.9, upper: 94.9, lower: 91.3 },
    { week: 'Dec W4', precision: 92.8, recall: 90.4, f1: 91.6, upper: 94.6, lower: 91.0 },
  ],
};

export const funnelData = [
  { stage: 'Ingested', count: 214820, pct: 100 },
  { stage: 'Auto-Checked', count: 214820, pct: 100 },
  { stage: 'Flagged', count: 8941, pct: 4.16 },
  { stage: 'Reviewed', count: 6234, pct: 69.7 },
  { stage: 'Resolved', count: 5891, pct: 94.5 },
];

export const resolutionBreakdown = [
  { name: 'Auto-Resolved', value: 4212, fill: '#2DD4BF' },
  { name: 'Supervisor-Reviewed', value: 1428, fill: '#8B7FE8' },
  { name: 'Escalated', value: 251, fill: '#F5A524' },
];

export const modelComparisonBars = [
  { model: 'LSTM Temporal Drift', f1: 91.8, fill: '#2DD4BF' },
  { model: 'Isolation Forest', f1: 90.1, fill: '#8B7FE8' },
  { model: 'Bayesian Detector', f1: 90.8, fill: '#2ED47A' },
];
