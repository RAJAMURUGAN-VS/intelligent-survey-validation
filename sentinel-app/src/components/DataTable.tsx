import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  maxHeight?: string;
  searchable?: boolean;
  searchKeys?: (keyof T)[];
}

export function DataTable<T extends Record<string, unknown>>({
  data, columns, onRowClick, maxHeight = '400px', searchable = false, searchKeys = [],
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return data;
    return data.filter(row =>
      searchKeys.some(k => String(row[k]).toLowerCase().includes(search.toLowerCase()))
    );
  }, [data, search, searchKeys]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey as keyof T];
      const bv = b[sortKey as keyof T];
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  return (
    <div className="flex flex-col gap-3">
      {searchable && (
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search records..."
          className="w-full px-3 py-2 text-sm"
          style={{ background: 'rgba(20,28,46,0.8)', border: '1px solid rgba(45,212,191,0.15)', borderRadius: 8, color: '#E6EAF2' }}
        />
      )}
      <div className="overflow-auto rounded-xl" style={{ maxHeight, border: '1px solid rgba(45,212,191,0.12)' }}>
        <table className="w-full border-collapse" style={{ borderSpacing: 0 }}>
          <thead>
            <tr style={{ background: 'rgba(20,28,46,0.95)', position: 'sticky', top: 0, zIndex: 2 }}>
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider select-none ${col.sortable !== false ? 'cursor-pointer' : ''}`}
                  style={{ color: '#8B95AB', borderBottom: '1px solid rgba(45,212,191,0.12)', width: col.width }}
                  onClick={() => col.sortable !== false && handleSort(String(col.key))}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable !== false && (
                      sortKey === String(col.key)
                        ? sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                        : <ChevronsUpDown size={12} className="opacity-40" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row)}
                className={`transition-colors duration-100 ${onRowClick ? 'cursor-pointer' : ''}`}
                style={{
                  background: i % 2 === 0 ? 'rgba(20,28,46,0.6)' : 'rgba(20,28,46,0.3)',
                  borderBottom: '1px solid rgba(45,212,191,0.06)',
                }}
                onMouseEnter={e => { if (onRowClick) (e.currentTarget as HTMLElement).style.background = 'rgba(45,212,191,0.06)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? 'rgba(20,28,46,0.6)' : 'rgba(20,28,46,0.3)'; }}
              >
                {columns.map(col => (
                  <td key={String(col.key)} className="px-4 py-3 text-sm" style={{ color: '#E6EAF2' }}>
                    {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {sorted.length === 0 && (
          <div className="py-12 text-center text-[#8B95AB] text-sm">No records found</div>
        )}
      </div>
    </div>
  );
}
