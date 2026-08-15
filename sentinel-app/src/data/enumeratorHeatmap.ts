export interface HeatmapCell {
  enumeratorId: string;
  week: string;
  flagRate: number;
  flagCount: number;
  totalRecords: number;
}

const enumeratorIds = [
  'ENUM-1847', 'ENUM-3391', 'ENUM-5512', 'ENUM-7784', 'ENUM-2847',
  'ENUM-4418', 'ENUM-1773', 'ENUM-3102', 'ENUM-6891', 'ENUM-2991',
  'ENUM-9045', 'ENUM-8102',
];

const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];

const rawData: Record<string, Record<string, [number, number]>> = {
  'ENUM-1847': { W1: [18, 48], W2: [22, 51], W3: [31, 54], W4: [28, 50], W5: [42, 52], W6: [38, 49], W7: [45, 53], W8: [40, 51] },
  'ENUM-3391': { W1: [8, 45], W2: [12, 48], W3: [15, 50], W4: [19, 47], W5: [24, 49], W6: [21, 46], W7: [18, 48], W8: [22, 50] },
  'ENUM-5512': { W1: [5, 42], W2: [7, 44], W3: [9, 46], W4: [11, 43], W5: [32, 45], W6: [14, 44], W7: [10, 46], W8: [8, 43] },
  'ENUM-7784': { W1: [22, 38], W2: [28, 40], W3: [33, 42], W4: [29, 39], W5: [38, 41], W6: [35, 40], W7: [31, 42], W8: [27, 38] },
  'ENUM-2847': { W1: [4, 52], W2: [6, 55], W3: [5, 53], W4: [7, 51], W5: [8, 54], W6: [6, 52], W7: [5, 53], W8: [7, 54] },
  'ENUM-4418': { W1: [3, 48], W2: [4, 50], W3: [6, 49], W4: [5, 47], W5: [7, 51], W6: [4, 48], W7: [6, 50], W8: [5, 49] },
  'ENUM-1773': { W1: [2, 44], W2: [3, 46], W3: [4, 45], W4: [3, 43], W5: [5, 47], W6: [4, 44], W7: [3, 46], W8: [4, 45] },
  'ENUM-3102': { W1: [6, 40], W2: [8, 42], W3: [7, 41], W4: [9, 39], W5: [11, 43], W6: [8, 40], W7: [10, 42], W8: [7, 41] },
  'ENUM-6891': { W1: [3, 38], W2: [4, 40], W3: [5, 39], W4: [4, 37], W5: [6, 41], W6: [4, 38], W7: [5, 40], W8: [3, 39] },
  'ENUM-2991': { W1: [5, 46], W2: [7, 48], W3: [6, 47], W4: [8, 45], W5: [10, 49], W6: [7, 46], W7: [9, 48], W8: [6, 47] },
  'ENUM-9045': { W1: [4, 42], W2: [5, 44], W3: [7, 43], W4: [6, 41], W5: [9, 45], W6: [6, 42], W7: [8, 44], W8: [5, 43] },
  'ENUM-8102': { W1: [8, 50], W2: [11, 52], W3: [14, 51], W4: [12, 49], W5: [18, 53], W6: [15, 50], W7: [13, 52], W8: [10, 51] },
};

export const heatmapData: HeatmapCell[] = enumeratorIds.flatMap(enumId =>
  weeks.map(week => {
    const [flagCount, totalRecords] = rawData[enumId][week];
    return {
      enumeratorId: enumId,
      week,
      flagRate: parseFloat(((flagCount / totalRecords) * 100).toFixed(1)),
      flagCount,
      totalRecords,
    };
  })
);

export const enumeratorIds_ = enumeratorIds;
export const weeks_ = weeks;
