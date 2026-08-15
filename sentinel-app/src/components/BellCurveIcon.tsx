interface BellCurveIconProps {
  width?: number;
  height?: number;
  color?: string;
  animated?: boolean;
  className?: string;
}

export function BellCurveIcon({ width = 120, height = 60, color = '#2DD4BF', animated = false, className = '' }: BellCurveIconProps) {
  // Bell curve approximated as a cubic bezier path
  const path = `M ${0.02 * width} ${0.95 * height} 
    C ${0.1 * width} ${0.95 * height} ${0.15 * width} ${0.8 * height} ${0.25 * width} ${0.5 * height}
    C ${0.32 * width} ${0.28 * height} ${0.38 * width} ${0.05 * height} ${0.5 * width} ${0.05 * height}
    C ${0.62 * width} ${0.05 * height} ${0.68 * width} ${0.28 * height} ${0.75 * width} ${0.5 * height}
    C ${0.85 * width} ${0.8 * height} ${0.9 * width} ${0.95 * height} ${0.98 * width} ${0.95 * height}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Glow filter */}
      <defs>
        <filter id="bell-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="bell-grad" x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <path
        d={`${path} L ${0.98 * width} ${0.95 * height} L ${0.02 * width} ${0.95 * height} Z`}
        fill={color}
        fillOpacity="0.08"
      />
      {/* Main curve */}
      <path
        d={path}
        stroke="url(#bell-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#bell-glow)"
        style={animated ? { animation: 'dash-flow 2s linear infinite', strokeDasharray: '8 4' } : undefined}
      />
      {/* Baseline */}
      <line x1={0.02 * width} y1={0.95 * height} x2={0.98 * width} y2={0.95 * height} stroke={color} strokeOpacity="0.3" strokeWidth="1" />
      {/* Mean line */}
      <line x1={0.5 * width} y1={0.1 * height} x2={0.5 * width} y2={0.95 * height} stroke={color} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  );
}
