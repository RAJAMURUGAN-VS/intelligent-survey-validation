export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  frequency: string;
  lastGenerated: string;
  pageCount: number;
  tags: string[];
}

export const reportTemplates: ReportTemplate[] = [
  {
    id: 'monthly-anomaly',
    name: 'Monthly Anomaly Bulletin',
    description: 'Comprehensive monthly report of all detected anomalies, resolution status, and model performance metrics across all surveyed states.',
    icon: 'file-text',
    frequency: 'Monthly',
    lastGenerated: '2025-01-01T09:00:00Z',
    pageCount: 24,
    tags: ['Anomalies', 'Monthly', 'All States'],
  },
  {
    id: 'enumerator-bias',
    name: 'Enumerator Bias Summary',
    description: 'Field-level enumerator performance analysis identifying systematic biases, clustering patterns, and outlier enumerators requiring retraining.',
    icon: 'users',
    frequency: 'Quarterly',
    lastGenerated: '2024-12-15T09:00:00Z',
    pageCount: 18,
    tags: ['Enumerators', 'Bias', 'Field'],
  },
  {
    id: 'model-performance',
    name: 'Model Performance Report',
    description: 'Technical report covering precision, recall, F1 scores, ROC-AUC metrics, and comparative analysis of all deployed ML models.',
    icon: 'cpu',
    frequency: 'Monthly',
    lastGenerated: '2025-01-05T09:00:00Z',
    pageCount: 32,
    tags: ['ML Models', 'Performance', 'Technical'],
  },
  {
    id: 'integrity-audit',
    name: 'Integrity Rule Audit Log',
    description: 'Full audit trail of all integrity rule evaluations, trigger counts, false positive rates, and rule effectiveness analysis.',
    icon: 'shield-check',
    frequency: 'Weekly',
    lastGenerated: '2025-01-13T09:00:00Z',
    pageCount: 12,
    tags: ['Rules', 'Audit', 'Weekly'],
  },
  {
    id: 'custom-query',
    name: 'Custom Query Export',
    description: 'Ad-hoc filtered data export with custom field selection, date ranges, and state/enumerator filters for downstream analysis.',
    icon: 'database',
    frequency: 'On Demand',
    lastGenerated: '2025-01-14T07:30:00Z',
    pageCount: 8,
    tags: ['Custom', 'Export', 'Ad-hoc'],
  },
];

export interface ExportHistoryEntry {
  id: string;
  reportName: string;
  format: string;
  generatedAt: string;
  size: string;
  requestedBy: string;
}

export const exportHistory: ExportHistoryEntry[] = [
  { id: 'EXP-001', reportName: 'Monthly Anomaly Bulletin', format: 'PDF', generatedAt: '2025-01-14T09:15:00Z', size: '2.4 MB', requestedBy: 'HSD Admin' },
  { id: 'EXP-002', reportName: 'Enumerator Bias Summary', format: 'Excel', generatedAt: '2025-01-13T16:30:00Z', size: '1.1 MB', requestedBy: 'Data Supervisor' },
  { id: 'EXP-003', reportName: 'Model Performance Report', format: 'PDF', generatedAt: '2025-01-12T11:00:00Z', size: '3.8 MB', requestedBy: 'HSD Admin' },
  { id: 'EXP-004', reportName: 'Custom Query Export', format: 'CSV', generatedAt: '2025-01-12T08:45:00Z', size: '0.8 MB', requestedBy: 'Field Supervisor' },
  { id: 'EXP-005', reportName: 'Integrity Rule Audit Log', format: 'Excel', generatedAt: '2025-01-10T14:20:00Z', size: '1.5 MB', requestedBy: 'Data Supervisor' },
  { id: 'EXP-006', reportName: 'Monthly Anomaly Bulletin', format: 'JSON', generatedAt: '2025-01-08T09:00:00Z', size: '5.2 MB', requestedBy: 'HSD Admin' },
];
