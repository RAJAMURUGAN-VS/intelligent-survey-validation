export type RuleStatus = 'active' | 'draft' | 'disabled';

export interface IntegrityRule {
  id: string;
  name: string;
  category: string;
  status: RuleStatus;
  triggered: number;
  description: string;
  condition: string;
  severity: 'low' | 'medium' | 'high';
}

export interface RuleCategory {
  id: string;
  name: string;
  icon: string;
  rules: IntegrityRule[];
}

export const ruleCategories: RuleCategory[] = [
  {
    id: 'referential',
    name: 'Referential Integrity',
    icon: 'link',
    rules: [
      { id: 'RI-001', name: 'HH Member-Employment Link', category: 'Referential Integrity', status: 'active', triggered: 1842, description: 'Every employed HH member must have a valid employment record', condition: 'IF employment_status = Employed THEN employment_record EXISTS', severity: 'high' },
      { id: 'RI-002', name: 'Industry-Occupation Code Match', category: 'Referential Integrity', status: 'active', triggered: 921, description: 'Industry code and occupation code must be consistent', condition: 'IF industry_code EXISTS THEN occupation_code MUST be compatible', severity: 'medium' },
      { id: 'RI-003', name: 'Household ID Uniqueness', category: 'Referential Integrity', status: 'active', triggered: 234, description: 'Household ID must be unique within a district', condition: 'IF household_id THEN household_id MUST BE unique PER district', severity: 'high' },
      { id: 'RI-004', name: 'Enumerator-PSU Linkage', category: 'Referential Integrity', status: 'draft', triggered: 0, description: 'Each record must link to a valid enumerator assigned to that PSU', condition: 'IF record EXISTS THEN enumerator_id MUST match PSU assignment', severity: 'medium' },
    ],
  },
  {
    id: 'existential',
    name: 'Existential Integrity',
    icon: 'check-circle',
    rules: [
      { id: 'EI-001', name: 'Wage-Employment Consistency', category: 'Existential Integrity', status: 'active', triggered: 2341, description: 'Non-zero wage must exist for employed persons', condition: 'IF employment_status = Employed AND wage_daily = 0 THEN FLAG', severity: 'high' },
      { id: 'EI-002', name: 'Activity Status Completeness', category: 'Existential Integrity', status: 'active', triggered: 1102, description: 'Principal activity status must be populated for persons aged 5+', condition: 'IF age >= 5 THEN principal_activity_code MUST NOT BE NULL', severity: 'medium' },
      { id: 'EI-003', name: 'Education Field Presence', category: 'Existential Integrity', status: 'active', triggered: 678, description: 'Education level must be present for persons aged 6+', condition: 'IF age >= 6 THEN education_level MUST NOT BE NULL', severity: 'low' },
    ],
  },
  {
    id: 'range',
    name: 'Range & Bounds',
    icon: 'sliders',
    rules: [
      { id: 'RB-001', name: 'Daily Wage Plausibility', category: 'Range & Bounds', status: 'active', triggered: 1567, description: 'Daily wage should be within plausible range for the reported state', condition: 'IF wage_daily EXISTS THEN wage_daily MUST BE between 100 AND 10000', severity: 'high' },
      { id: 'RB-002', name: 'Weekly Hours Plausibility', category: 'Range & Bounds', status: 'active', triggered: 892, description: 'Weekly hours cannot exceed 84 hours', condition: 'IF weekly_hours EXISTS THEN weekly_hours MUST BE <= 84', severity: 'medium' },
      { id: 'RB-003', name: 'Age-Education Compatibility', category: 'Range & Bounds', status: 'active', triggered: 445, description: 'Education level must be plausible given reported age', condition: 'IF education_level = Graduate THEN age MUST BE >= 20', severity: 'medium' },
      { id: 'RB-004', name: 'Household Size Bounds', category: 'Range & Bounds', status: 'draft', triggered: 0, description: 'Household size should not exceed 20 members', condition: 'IF household_size EXISTS THEN household_size MUST BE <= 20', severity: 'low' },
    ],
  },
  {
    id: 'cross-survey',
    name: 'Cross-Survey Consistency',
    icon: 'git-compare',
    rules: [
      { id: 'CS-001', name: 'PLFS-NSSO Industry Match', category: 'Cross-Survey Consistency', status: 'active', triggered: 334, description: 'Industry codes should be consistent with NSSO enterprise survey classification', condition: 'IF industry_code EXISTS THEN industry_code MUST match NSSO classification', severity: 'medium' },
      { id: 'CS-002', name: 'Census Population Ratio', category: 'Cross-Survey Consistency', status: 'disabled', triggered: 0, description: 'State-level employment rates should not deviate >20% from Census 2021 estimates', condition: 'IF state_employment_rate EXISTS THEN deviation from Census MUST BE < 20%', severity: 'low' },
    ],
  },
  {
    id: 'temporal',
    name: 'Temporal Consistency',
    icon: 'clock',
    rules: [
      { id: 'TC-001', name: 'Visit 1 vs Visit 2 Status Change', category: 'Temporal Consistency', status: 'active', triggered: 2187, description: 'Employment status change between visits should be accompanied by corresponding wage/hours changes', condition: 'IF employment_status_v1 != employment_status_v2 THEN wage_v2 MUST reflect the change', severity: 'high' },
      { id: 'TC-002', name: 'Age Consistency Across Visits', category: 'Temporal Consistency', status: 'active', triggered: 89, description: 'Age reported in Visit 2 should be Visit 1 age + ~6 months', condition: 'IF age_v1 AND age_v2 THEN age_v2 MUST equal age_v1 OR age_v1+1', severity: 'medium' },
      { id: 'TC-003', name: 'Seasonal Activity Plausibility', category: 'Temporal Consistency', status: 'active', triggered: 567, description: 'Agricultural activity codes should correspond to relevant crop seasons', condition: 'IF industry_code MATCHES agriculture AND visit_quarter EXISTS THEN crop_season MUST match', severity: 'low' },
    ],
  },
];
