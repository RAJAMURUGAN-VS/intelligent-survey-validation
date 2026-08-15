interface SeverityBadgeProps {
  severity: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md';
}

const severityConfig = {
  low: { label: 'LOW', className: 'badge-teal' },
  medium: { label: 'MED', className: 'badge-amber' },
  high: { label: 'HIGH', className: 'badge-danger' },
};

export function SeverityBadge({ severity, size = 'md' }: SeverityBadgeProps) {
  const config = severityConfig[severity];
  const sizeClass = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2.5 py-1';
  return (
    <span className={`inline-flex items-center font-mono font-semibold rounded-full ${sizeClass} ${config.className}`}>
      {config.label}
    </span>
  );
}
