export const anomalyRateTimeSeries = [
  { week: 'W1', rate: 3.2, upper: 4.1, lower: 2.3 },
  { week: 'W2', rate: 3.8, upper: 4.7, lower: 2.9 },
  { week: 'W3', rate: 4.1, upper: 5.0, lower: 3.2 },
  { week: 'W4', rate: 3.5, upper: 4.4, lower: 2.6 },
  { week: 'W5', rate: 5.2, upper: 6.1, lower: 4.3, spike: true },
  { week: 'W6', rate: 4.8, upper: 5.7, lower: 3.9 },
  { week: 'W7', rate: 4.2, upper: 5.1, lower: 3.3 },
  { week: 'W8', rate: 3.9, upper: 4.8, lower: 3.0 },
  { week: 'W9', rate: 6.1, upper: 7.0, lower: 5.2, spike: true },
  { week: 'W10', rate: 5.4, upper: 6.3, lower: 4.5 },
  { week: 'W11', rate: 4.7, upper: 5.6, lower: 3.8 },
  { week: 'W12', rate: 4.3, upper: 5.2, lower: 3.4 },
];

export const kpiMetrics = {
  recordsIngested: { value: 8214, change: 4.2, trend: 'up' as const },
  flaggedForReview: { value: 312, change: -1.1, trend: 'down' as const },
  autoResolved: { value: 1088, change: 2.8, trend: 'up' as const },
  activeModels: { value: 6, change: 0, trend: 'flat' as const },
};

export const enumeratorScatterData = [
  { x: 42, y: 0.12, id: 'ENUM-2847', bias: 0.12 },
  { x: 38, y: 0.09, id: 'ENUM-3102', bias: 0.09 },
  { x: 45, y: 0.11, id: 'ENUM-2991', bias: 0.11 },
  { x: 40, y: 0.10, id: 'ENUM-4418', bias: 0.10 },
  { x: 43, y: 0.08, id: 'ENUM-1773', bias: 0.08 },
  { x: 37, y: 0.13, id: 'ENUM-5523', bias: 0.13 },
  { x: 41, y: 0.07, id: 'ENUM-6891', bias: 0.07 },
  { x: 44, y: 0.14, id: 'ENUM-7234', bias: 0.14 },
  { x: 39, y: 0.09, id: 'ENUM-8102', bias: 0.09 },
  { x: 42, y: 0.11, id: 'ENUM-9045', bias: 0.11 },
  { x: 36, y: 0.10, id: 'ENUM-0217', bias: 0.10 },
  { x: 43, y: 0.08, id: 'ENUM-1089', bias: 0.08 },
  { x: 40, y: 0.12, id: 'ENUM-2345', bias: 0.12 },
  { x: 38, y: 0.09, id: 'ENUM-3678', bias: 0.09 },
  { x: 44, y: 0.07, id: 'ENUM-4912', bias: 0.07 },
  { x: 41, y: 0.11, id: 'ENUM-5567', bias: 0.11 },
  { x: 39, y: 0.13, id: 'ENUM-6023', bias: 0.13 },
  { x: 42, y: 0.10, id: 'ENUM-7891', bias: 0.10 },
  { x: 37, y: 0.08, id: 'ENUM-8456', bias: 0.08 },
  { x: 43, y: 0.12, id: 'ENUM-9234', bias: 0.12 },
  // Normal cluster
  { x: 41, y: 0.09, id: 'ENUM-1122', bias: 0.09 },
  { x: 40, y: 0.10, id: 'ENUM-2233', bias: 0.10 },
  { x: 42, y: 0.08, id: 'ENUM-3344', bias: 0.08 },
  { x: 39, y: 0.11, id: 'ENUM-4455', bias: 0.11 },
  { x: 43, y: 0.09, id: 'ENUM-5566', bias: 0.09 },
  { x: 41, y: 0.10, id: 'ENUM-6677', bias: 0.10 },
  { x: 38, y: 0.12, id: 'ENUM-7788', bias: 0.12 },
  { x: 44, y: 0.08, id: 'ENUM-8899', bias: 0.08 },
  { x: 40, y: 0.09, id: 'ENUM-9900', bias: 0.09 },
  { x: 42, y: 0.11, id: 'ENUM-0011', bias: 0.11 },
  // More cluster
  { x: 41, y: 0.10, id: 'ENUM-1234', bias: 0.10 },
  { x: 39, y: 0.08, id: 'ENUM-2345', bias: 0.08 },
  { x: 43, y: 0.12, id: 'ENUM-3456', bias: 0.12 },
  { x: 40, y: 0.09, id: 'ENUM-4567', bias: 0.09 },
  { x: 42, y: 0.11, id: 'ENUM-5678', bias: 0.11 },
  { x: 38, y: 0.10, id: 'ENUM-6789', bias: 0.10 },
  { x: 44, y: 0.07, id: 'ENUM-7890', bias: 0.07 },
  { x: 41, y: 0.13, id: 'ENUM-8901', bias: 0.13 },
  { x: 39, y: 0.09, id: 'ENUM-9012', bias: 0.09 },
  { x: 43, y: 0.10, id: 'ENUM-0123', bias: 0.10 },
  // Outliers (amber)
  { x: 58, y: 0.31, id: 'ENUM-1847', bias: 0.31, outlier: true },
  { x: 22, y: 0.28, id: 'ENUM-3391', bias: 0.28, outlier: true },
  { x: 61, y: 0.24, id: 'ENUM-5512', bias: 0.24, outlier: true },
  { x: 19, y: 0.35, id: 'ENUM-7784', bias: 0.35, outlier: true },
];

export const recentFlagsPool = [
  { id: 'PLFS-KA-00214', severity: 'high' as const, desc: 'Employment status inconsistency: Unemployed + non-zero wage reported', time: '4m ago', state: 'Karnataka' },
  { id: 'PLFS-MH-00891', severity: 'medium' as const, desc: 'Age-education mismatch: 14yr old with graduate degree', time: '11m ago', state: 'Maharashtra' },
  { id: 'PLFS-UP-02341', severity: 'high' as const, desc: 'DBSCAN temporal outlier: 3σ deviation in weekly hours', time: '18m ago', state: 'Uttar Pradesh' },
  { id: 'PLFS-TN-00567', severity: 'low' as const, desc: 'Missing principal activity code — imputation applied', time: '23m ago', state: 'Tamil Nadu' },
  { id: 'PLFS-BR-01129', severity: 'medium' as const, desc: 'Household income below subsistence threshold with 0 members flagged employed', time: '31m ago', state: 'Bihar' },
  { id: 'PLFS-RJ-00782', severity: 'low' as const, desc: 'Visit 2 response contradicts Visit 1 on industry code', time: '45m ago', state: 'Rajasthan' },
  { id: 'PLFS-WB-01055', severity: 'high' as const, desc: 'Enumerator ENUM-1847 bias score exceeded 0.30 threshold', time: '52m ago', state: 'West Bengal' },
  { id: 'PLFS-GJ-00334', severity: 'medium' as const, desc: 'Wage field populated for self-employed with zero profit', time: '1h ago', state: 'Gujarat' },
  { id: 'PLFS-AP-00945', severity: 'low' as const, desc: 'Principal status 91 reported for individual below 5 years', time: '1h ago', state: 'Andhra Pradesh' },
  { id: 'PLFS-HR-00218', severity: 'high' as const, desc: 'Z-score outlier: daily wage 8.4σ above state mean', time: '2h ago', state: 'Haryana' },
];

export const dataHealthScore = 94;

export const ingestionVolumeBySource = [
  { source: 'CAPI Tool', volume: 4821, fill: '#2DD4BF' },
  { source: 'Manual Upload', volume: 1892, fill: '#8B7FE8' },
  { source: 'Legacy DB', volume: 987, fill: '#F5A524' },
  { source: 'API Partners', volume: 514, fill: '#2ED47A' },
];
