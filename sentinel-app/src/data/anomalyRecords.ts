export type Severity = 'low' | 'medium' | 'high';
export type AnomalyStatus = 'pending' | 'genuine' | 'false_positive';

export interface AnomalyRecord {
  id: string;
  state: string;
  district: string;
  enumeratorId: string;
  severity: Severity;
  score: number;
  timestamp: string;
  flaggedFields: string[];
  model: string;
  employmentStatus: string;
  wage: number;
  weeklyHours: number;
  industryCode: string;
  ageYears: number;
  educationLevel: string;
  status: AnomalyStatus;
  cluster: number;
  x: number;
  y: number;
  radarData: { field: string; actual: number; expected: number }[];
}

export const anomalyRecords: AnomalyRecord[] = [
  {
    id: 'PLFS-KA-00214', state: 'Karnataka', district: 'Bengaluru Urban', enumeratorId: 'ENUM-1847',
    severity: 'high', score: 0.92, timestamp: '2025-01-14T08:22:11Z', flaggedFields: ['wage_daily', 'employment_status'],
    model: 'Isolation Forest', employmentStatus: 'Unemployed', wage: 1450, weeklyHours: 0,
    industryCode: '9810', ageYears: 28, educationLevel: 'Graduate', status: 'pending',
    cluster: 1, x: 58, y: 0.92,
    radarData: [
      { field: 'Wage', actual: 85, expected: 20 }, { field: 'Hours', actual: 5, expected: 70 },
      { field: 'Age Match', actual: 90, expected: 85 }, { field: 'Edu Match', actual: 80, expected: 80 },
      { field: 'Industry', actual: 60, expected: 75 }, { field: 'Status', actual: 15, expected: 80 },
    ],
  },
  {
    id: 'PLFS-MH-00891', state: 'Maharashtra', district: 'Pune', enumeratorId: 'ENUM-3391',
    severity: 'medium', score: 0.74, timestamp: '2025-01-14T09:11:03Z', flaggedFields: ['age', 'education_level'],
    model: 'Z-Score Outlier', employmentStatus: 'Employed', wage: 320, weeklyHours: 42,
    industryCode: '8521', ageYears: 14, educationLevel: 'Graduate', status: 'pending',
    cluster: 2, x: 35, y: 0.74,
    radarData: [
      { field: 'Wage', actual: 40, expected: 35 }, { field: 'Hours', actual: 55, expected: 60 },
      { field: 'Age Match', actual: 15, expected: 85 }, { field: 'Edu Match', actual: 10, expected: 80 },
      { field: 'Industry', actual: 70, expected: 75 }, { field: 'Status', actual: 75, expected: 80 },
    ],
  },
  {
    id: 'PLFS-UP-02341', state: 'Uttar Pradesh', district: 'Lucknow', enumeratorId: 'ENUM-5512',
    severity: 'high', score: 0.88, timestamp: '2025-01-14T07:55:42Z', flaggedFields: ['weekly_hours', 'wage_daily'],
    model: 'LSTM Temporal Drift', employmentStatus: 'Self-employed', wage: 4200, weeklyHours: 98,
    industryCode: '4711', ageYears: 35, educationLevel: 'Higher Secondary', status: 'pending',
    cluster: 1, x: 62, y: 0.88,
    radarData: [
      { field: 'Wage', actual: 95, expected: 45 }, { field: 'Hours', actual: 90, expected: 55 },
      { field: 'Age Match', actual: 82, expected: 80 }, { field: 'Edu Match', actual: 72, expected: 70 },
      { field: 'Industry', actual: 78, expected: 75 }, { field: 'Status', actual: 80, expected: 75 },
    ],
  },
  {
    id: 'PLFS-TN-00567', state: 'Tamil Nadu', district: 'Chennai', enumeratorId: 'ENUM-2847',
    severity: 'low', score: 0.41, timestamp: '2025-01-14T10:04:18Z', flaggedFields: ['principal_activity_code'],
    model: 'Bayesian Anomaly Detector', employmentStatus: 'Employed', wage: 580, weeklyHours: 44,
    industryCode: '', ageYears: 32, educationLevel: 'Secondary', status: 'false_positive',
    cluster: 3, x: 28, y: 0.41,
    radarData: [
      { field: 'Wage', actual: 55, expected: 50 }, { field: 'Hours', actual: 60, expected: 60 },
      { field: 'Age Match', actual: 80, expected: 80 }, { field: 'Edu Match', actual: 65, expected: 70 },
      { field: 'Industry', actual: 10, expected: 75 }, { field: 'Status', actual: 75, expected: 80 },
    ],
  },
  {
    id: 'PLFS-BR-01129', state: 'Bihar', district: 'Patna', enumeratorId: 'ENUM-7784',
    severity: 'medium', score: 0.67, timestamp: '2025-01-14T06:38:55Z', flaggedFields: ['household_income', 'employment_count'],
    model: 'DBSCAN Clustering', employmentStatus: 'Unemployed', wage: 0, weeklyHours: 0,
    industryCode: '0111', ageYears: 42, educationLevel: 'Primary', status: 'pending',
    cluster: 2, x: 31, y: 0.67,
    radarData: [
      { field: 'Wage', actual: 5, expected: 30 }, { field: 'Hours', actual: 5, expected: 45 },
      { field: 'Age Match', actual: 85, expected: 80 }, { field: 'Edu Match', actual: 50, expected: 60 },
      { field: 'Industry', actual: 40, expected: 60 }, { field: 'Status', actual: 20, expected: 65 },
    ],
  },
  {
    id: 'PLFS-RJ-00782', state: 'Rajasthan', district: 'Jaipur', enumeratorId: 'ENUM-3102',
    severity: 'low', score: 0.35, timestamp: '2025-01-13T16:22:07Z', flaggedFields: ['industry_code_v2'],
    model: 'Isolation Forest', employmentStatus: 'Employed', wage: 420, weeklyHours: 48,
    industryCode: '7420', ageYears: 29, educationLevel: 'Graduate', status: 'false_positive',
    cluster: 3, x: 22, y: 0.35,
    radarData: [
      { field: 'Wage', actual: 45, expected: 48 }, { field: 'Hours', actual: 65, expected: 60 },
      { field: 'Age Match', actual: 82, expected: 80 }, { field: 'Edu Match', actual: 88, expected: 85 },
      { field: 'Industry', actual: 40, expected: 75 }, { field: 'Status', actual: 80, expected: 80 },
    ],
  },
  {
    id: 'PLFS-WB-01055', state: 'West Bengal', district: 'Kolkata', enumeratorId: 'ENUM-1847',
    severity: 'high', score: 0.89, timestamp: '2025-01-13T14:08:33Z', flaggedFields: ['enumerator_bias_score'],
    model: 'Bayesian Anomaly Detector', employmentStatus: 'Employed', wage: 710, weeklyHours: 45,
    industryCode: '6201', ageYears: 26, educationLevel: 'Post-Graduate', status: 'genuine',
    cluster: 1, x: 55, y: 0.89,
    radarData: [
      { field: 'Wage', actual: 65, expected: 60 }, { field: 'Hours', actual: 62, expected: 58 },
      { field: 'Age Match', actual: 88, expected: 85 }, { field: 'Edu Match', actual: 90, expected: 85 },
      { field: 'Industry', actual: 80, expected: 78 }, { field: 'Status', actual: 90, expected: 60 },
    ],
  },
  {
    id: 'PLFS-GJ-00334', state: 'Gujarat', district: 'Ahmedabad', enumeratorId: 'ENUM-4418',
    severity: 'medium', score: 0.61, timestamp: '2025-01-13T11:45:19Z', flaggedFields: ['wage_daily', 'profit_loss'],
    model: 'Z-Score Outlier', employmentStatus: 'Self-employed', wage: 890, weeklyHours: 55,
    industryCode: '2811', ageYears: 38, educationLevel: 'Higher Secondary', status: 'pending',
    cluster: 2, x: 38, y: 0.61,
    radarData: [
      { field: 'Wage', actual: 78, expected: 50 }, { field: 'Hours', actual: 72, expected: 60 },
      { field: 'Age Match', actual: 82, expected: 80 }, { field: 'Edu Match', actual: 68, expected: 70 },
      { field: 'Industry', actual: 70, expected: 75 }, { field: 'Status', actual: 75, expected: 70 },
    ],
  },
  {
    id: 'PLFS-AP-00945', state: 'Andhra Pradesh', district: 'Visakhapatnam', enumeratorId: 'ENUM-2991',
    severity: 'low', score: 0.38, timestamp: '2025-01-13T09:17:44Z', flaggedFields: ['principal_status_code'],
    model: 'Isolation Forest', employmentStatus: 'Non-working', wage: 0, weeklyHours: 0,
    industryCode: '', ageYears: 4, educationLevel: 'None', status: 'genuine',
    cluster: 3, x: 18, y: 0.38,
    radarData: [
      { field: 'Wage', actual: 5, expected: 5 }, { field: 'Hours', actual: 5, expected: 5 },
      { field: 'Age Match', actual: 10, expected: 80 }, { field: 'Edu Match', actual: 5, expected: 20 },
      { field: 'Industry', actual: 5, expected: 10 }, { field: 'Status', actual: 15, expected: 75 },
    ],
  },
  {
    id: 'PLFS-HR-00218', state: 'Haryana', district: 'Gurugram', enumeratorId: 'ENUM-1773',
    severity: 'high', score: 0.95, timestamp: '2025-01-12T15:30:22Z', flaggedFields: ['wage_daily'],
    model: 'Z-Score Outlier', employmentStatus: 'Casual Labour', wage: 18500, weeklyHours: 52,
    industryCode: '6820', ageYears: 31, educationLevel: 'Graduate', status: 'pending',
    cluster: 1, x: 72, y: 0.95,
    radarData: [
      { field: 'Wage', actual: 98, expected: 45 }, { field: 'Hours', actual: 70, expected: 55 },
      { field: 'Age Match', actual: 85, expected: 80 }, { field: 'Edu Match', actual: 88, expected: 85 },
      { field: 'Industry', actual: 72, expected: 75 }, { field: 'Status', actual: 60, expected: 65 },
    ],
  },
  {
    id: 'PLFS-MP-00673', state: 'Madhya Pradesh', district: 'Bhopal', enumeratorId: 'ENUM-5523',
    severity: 'medium', score: 0.58, timestamp: '2025-01-12T12:11:09Z', flaggedFields: ['household_size', 'income_per_capita'],
    model: 'DBSCAN Clustering', employmentStatus: 'Employed', wage: 280, weeklyHours: 60,
    industryCode: '0121', ageYears: 45, educationLevel: 'Primary', status: 'pending',
    cluster: 2, x: 33, y: 0.58,
    radarData: [
      { field: 'Wage', actual: 35, expected: 40 }, { field: 'Hours', actual: 78, expected: 55 },
      { field: 'Age Match', actual: 80, expected: 80 }, { field: 'Edu Match', actual: 42, expected: 55 },
      { field: 'Industry', actual: 65, expected: 70 }, { field: 'Status', actual: 72, expected: 75 },
    ],
  },
  {
    id: 'PLFS-OD-00412', state: 'Odisha', district: 'Bhubaneswar', enumeratorId: 'ENUM-6891',
    severity: 'low', score: 0.44, timestamp: '2025-01-12T08:45:33Z', flaggedFields: ['travel_distance'],
    model: 'Bayesian Anomaly Detector', employmentStatus: 'Employed', wage: 450, weeklyHours: 46,
    industryCode: '7111', ageYears: 27, educationLevel: 'Higher Secondary', status: 'false_positive',
    cluster: 3, x: 25, y: 0.44,
    radarData: [
      { field: 'Wage', actual: 50, expected: 48 }, { field: 'Hours', actual: 62, expected: 58 },
      { field: 'Age Match', actual: 82, expected: 82 }, { field: 'Edu Match', actual: 72, expected: 70 },
      { field: 'Industry', actual: 70, expected: 72 }, { field: 'Status', actual: 78, expected: 78 },
    ],
  },
  {
    id: 'PLFS-KL-00891', state: 'Kerala', district: 'Thiruvananthapuram', enumeratorId: 'ENUM-7234',
    severity: 'medium', score: 0.69, timestamp: '2025-01-11T16:28:11Z', flaggedFields: ['employment_status', 'migration_status'],
    model: 'LSTM Temporal Drift', employmentStatus: 'Employed', wage: 820, weeklyHours: 40,
    industryCode: '8510', ageYears: 33, educationLevel: 'Post-Graduate', status: 'pending',
    cluster: 2, x: 40, y: 0.69,
    radarData: [
      { field: 'Wage', actual: 72, expected: 65 }, { field: 'Hours', actual: 55, expected: 58 },
      { field: 'Age Match', actual: 85, expected: 82 }, { field: 'Edu Match', actual: 92, expected: 88 },
      { field: 'Industry', actual: 82, expected: 78 }, { field: 'Status', actual: 60, expected: 80 },
    ],
  },
  {
    id: 'PLFS-PB-00345', state: 'Punjab', district: 'Ludhiana', enumeratorId: 'ENUM-8102',
    severity: 'high', score: 0.83, timestamp: '2025-01-11T11:14:02Z', flaggedFields: ['wage_daily', 'working_days'],
    model: 'Isolation Forest', employmentStatus: 'Regular Wage', wage: 6800, weeklyHours: 30,
    industryCode: '1310', ageYears: 40, educationLevel: 'Higher Secondary', status: 'genuine',
    cluster: 1, x: 50, y: 0.83,
    radarData: [
      { field: 'Wage', actual: 90, expected: 55 }, { field: 'Hours', actual: 42, expected: 60 },
      { field: 'Age Match', actual: 82, expected: 80 }, { field: 'Edu Match', actual: 70, expected: 72 },
      { field: 'Industry', actual: 72, expected: 75 }, { field: 'Status', actual: 75, expected: 70 },
    ],
  },
  {
    id: 'PLFS-AS-00567', state: 'Assam', district: 'Guwahati', enumeratorId: 'ENUM-9045',
    severity: 'medium', score: 0.55, timestamp: '2025-01-11T08:55:38Z', flaggedFields: ['seasonal_activity'],
    model: 'LSTM Temporal Drift', employmentStatus: 'Self-employed', wage: 380, weeklyHours: 50,
    industryCode: '0111', ageYears: 36, educationLevel: 'Secondary', status: 'pending',
    cluster: 2, x: 32, y: 0.55,
    radarData: [
      { field: 'Wage', actual: 42, expected: 45 }, { field: 'Hours', actual: 68, expected: 58 },
      { field: 'Age Match', actual: 80, expected: 80 }, { field: 'Edu Match', actual: 62, expected: 65 },
      { field: 'Industry', actual: 60, expected: 68 }, { field: 'Status', actual: 72, expected: 75 },
    ],
  },
];
