export interface StateData {
  name: string;
  code: string;
  flagCount: number;
  totalRecords: number;
  flagRate: number;
  region: string;
}

export const statesData: StateData[] = [
  { name: 'Uttar Pradesh', code: 'UP', flagCount: 842, totalRecords: 18420, flagRate: 4.57, region: 'North' },
  { name: 'Maharashtra', code: 'MH', flagCount: 621, totalRecords: 15230, flagRate: 4.08, region: 'West' },
  { name: 'Bihar', code: 'BR', flagCount: 734, totalRecords: 14890, flagRate: 4.93, region: 'East' },
  { name: 'West Bengal', code: 'WB', flagCount: 498, totalRecords: 12450, flagRate: 4.00, region: 'East' },
  { name: 'Madhya Pradesh', code: 'MP', flagCount: 412, totalRecords: 10980, flagRate: 3.75, region: 'Central' },
  { name: 'Rajasthan', code: 'RJ', flagCount: 389, totalRecords: 11200, flagRate: 3.47, region: 'North' },
  { name: 'Tamil Nadu', code: 'TN', flagCount: 334, totalRecords: 10450, flagRate: 3.20, region: 'South' },
  { name: 'Karnataka', code: 'KA', flagCount: 298, totalRecords: 9870, flagRate: 3.02, region: 'South' },
  { name: 'Gujarat', code: 'GJ', flagCount: 267, totalRecords: 9120, flagRate: 2.93, region: 'West' },
  { name: 'Andhra Pradesh', code: 'AP', flagCount: 231, totalRecords: 8340, flagRate: 2.77, region: 'South' },
  { name: 'Odisha', code: 'OD', flagCount: 198, totalRecords: 7650, flagRate: 2.59, region: 'East' },
  { name: 'Telangana', code: 'TG', flagCount: 187, totalRecords: 7120, flagRate: 2.63, region: 'South' },
  { name: 'Punjab', code: 'PB', flagCount: 156, totalRecords: 6890, flagRate: 2.26, region: 'North' },
  { name: 'Haryana', code: 'HR', flagCount: 143, totalRecords: 6420, flagRate: 2.23, region: 'North' },
  { name: 'Kerala', code: 'KL', flagCount: 121, totalRecords: 6180, flagRate: 1.96, region: 'South' },
  { name: 'Assam', code: 'AS', flagCount: 134, totalRecords: 5920, flagRate: 2.26, region: 'Northeast' },
  { name: 'Jharkhand', code: 'JH', flagCount: 118, totalRecords: 5640, flagRate: 2.09, region: 'East' },
  { name: 'Chhattisgarh', code: 'CG', flagCount: 109, totalRecords: 5380, flagRate: 2.03, region: 'Central' },
  { name: 'Uttarakhand', code: 'UK', flagCount: 87, totalRecords: 4920, flagRate: 1.77, region: 'North' },
  { name: 'Himachal Pradesh', code: 'HP', flagCount: 64, totalRecords: 4120, flagRate: 1.55, region: 'North' },
  { name: 'Goa', code: 'GA', flagCount: 28, totalRecords: 2840, flagRate: 0.99, region: 'West' },
  { name: 'Tripura', code: 'TR', flagCount: 42, totalRecords: 3210, flagRate: 1.31, region: 'Northeast' },
  { name: 'Meghalaya', code: 'ML', flagCount: 38, totalRecords: 2980, flagRate: 1.27, region: 'Northeast' },
  { name: 'Manipur', code: 'MN', flagCount: 34, totalRecords: 2760, flagRate: 1.23, region: 'Northeast' },
];
