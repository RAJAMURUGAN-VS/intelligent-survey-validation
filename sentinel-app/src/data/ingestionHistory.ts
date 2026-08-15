export type IngestionStatus = 'success' | 'partial' | 'failed' | 'processing';

export interface IngestionRun {
  id: string;
  filename: string;
  source: string;
  records: number;
  flagged: number;
  status: IngestionStatus;
  timestamp: string;
  duration: string;
  size: string;
}

export const ingestionHistory: IngestionRun[] = [
  { id: 'ING-2025-0114-001', filename: 'PLFS_Batch_0847.csv', source: 'CAPI Tool', records: 2841, flagged: 127, status: 'success', timestamp: '2025-01-14T08:30:00Z', duration: '2m 14s', size: '4.2 MB' },
  { id: 'ING-2025-0114-002', filename: 'PLFS_Manual_KA_0112.xlsx', source: 'Manual Upload', records: 512, flagged: 38, status: 'success', timestamp: '2025-01-14T06:15:00Z', duration: '0m 48s', size: '1.1 MB' },
  { id: 'ING-2025-0113-001', filename: 'PLFS_Legacy_Q3_Export.dat', source: 'Legacy DB', records: 8921, flagged: 0, status: 'failed', timestamp: '2025-01-13T22:10:00Z', duration: '0m 12s', size: '18.4 MB' },
  { id: 'ING-2025-0113-002', filename: 'PLFS_API_MH_0113.json', source: 'API Partners', records: 1284, flagged: 56, status: 'success', timestamp: '2025-01-13T18:45:00Z', duration: '1m 02s', size: '2.8 MB' },
  { id: 'ING-2025-0113-003', filename: 'PLFS_Batch_0846.csv', source: 'CAPI Tool', records: 3102, flagged: 89, status: 'partial', timestamp: '2025-01-13T14:20:00Z', duration: '2m 41s', size: '4.8 MB' },
  { id: 'ING-2025-0112-001', filename: 'PLFS_Manual_UP_0111.xlsx', source: 'Manual Upload', records: 678, flagged: 72, status: 'success', timestamp: '2025-01-12T11:30:00Z', duration: '1m 08s', size: '1.4 MB' },
  { id: 'ING-2025-0112-002', filename: 'PLFS_Batch_0845.csv', source: 'CAPI Tool', records: 2945, flagged: 95, status: 'success', timestamp: '2025-01-12T07:15:00Z', duration: '2m 28s', size: '4.5 MB' },
  { id: 'ING-2025-0111-001', filename: 'PLFS_API_TN_0111.json', source: 'API Partners', records: 892, flagged: 31, status: 'success', timestamp: '2025-01-11T16:00:00Z', duration: '0m 55s', size: '1.9 MB' },
];

export const liveLogPool = [
  '{ "id": "PLFS-KA-09218", "state": "KA", "enum_id": "ENUM-2847", "status": "VALID", "score": 0.08 }',
  '{ "id": "PLFS-MH-14521", "state": "MH", "enum_id": "ENUM-3391", "status": "FLAGGED", "score": 0.74 }',
  '{ "id": "PLFS-UP-22114", "state": "UP", "enum_id": "ENUM-5512", "status": "VALID", "score": 0.12 }',
  '{ "id": "PLFS-TN-08891", "state": "TN", "enum_id": "ENUM-2991", "status": "VALID", "score": 0.09 }',
  '{ "id": "PLFS-BR-31129", "state": "BR", "enum_id": "ENUM-7784", "status": "FLAGGED", "score": 0.67 }',
  '{ "id": "PLFS-GJ-00782", "state": "GJ", "enum_id": "ENUM-4418", "status": "VALID", "score": 0.11 }',
  '{ "id": "PLFS-WB-11055", "state": "WB", "enum_id": "ENUM-1847", "status": "FLAGGED", "score": 0.89 }',
  '{ "id": "PLFS-HR-00218", "state": "HR", "enum_id": "ENUM-1773", "status": "FLAGGED", "score": 0.95 }',
  '{ "id": "PLFS-AP-00945", "state": "AP", "enum_id": "ENUM-6891", "status": "VALID", "score": 0.07 }',
  '{ "id": "PLFS-KL-00891", "state": "KL", "enum_id": "ENUM-7234", "status": "VALID", "score": 0.15 }',
  '{ "id": "PLFS-OD-00412", "state": "OD", "enum_id": "ENUM-9045", "status": "VALID", "score": 0.06 }',
  '{ "id": "PLFS-RJ-01782", "state": "RJ", "enum_id": "ENUM-3102", "status": "VALID", "score": 0.10 }',
  '{ "id": "PLFS-MP-00673", "state": "MP", "enum_id": "ENUM-5523", "status": "FLAGGED", "score": 0.58 }',
  '{ "id": "PLFS-PB-00345", "state": "PB", "enum_id": "ENUM-8102", "status": "FLAGGED", "score": 0.83 }',
  '{ "id": "PLFS-AS-00567", "state": "AS", "enum_id": "ENUM-0217", "status": "VALID", "score": 0.13 }',
];
