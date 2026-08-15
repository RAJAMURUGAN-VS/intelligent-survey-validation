interface PulseDotProps {
  color?: 'teal' | 'amber' | 'danger' | 'success' | 'violet';
  size?: 'sm' | 'md' | 'lg';
}

const colorMap = {
  teal: { dot: 'bg-[#2DD4BF]', ring: 'bg-[#2DD4BF]', shadow: 'shadow-[0_0_8px_rgba(45,212,191,0.6)]' },
  amber: { dot: 'bg-[#F5A524]', ring: 'bg-[#F5A524]', shadow: 'shadow-[0_0_8px_rgba(245,165,36,0.6)]' },
  danger: { dot: 'bg-[#F04438]', ring: 'bg-[#F04438]', shadow: 'shadow-[0_0_8px_rgba(240,68,56,0.6)]' },
  success: { dot: 'bg-[#2ED47A]', ring: 'bg-[#2ED47A]', shadow: 'shadow-[0_0_8px_rgba(46,212,122,0.6)]' },
  violet: { dot: 'bg-[#8B7FE8]', ring: 'bg-[#8B7FE8]', shadow: 'shadow-[0_0_8px_rgba(139,127,232,0.6)]' },
};

const sizeMap = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2.5 h-2.5',
  lg: 'w-3.5 h-3.5',
};

export function PulseDot({ color = 'teal', size = 'md' }: PulseDotProps) {
  const c = colorMap[color];
  return (
    <span className={`relative inline-flex ${sizeMap[size]}`}>
      <span className={`absolute inset-0 rounded-full ${c.ring} opacity-60 pulse-dot-ring`} />
      <span className={`relative rounded-full ${sizeMap[size]} ${c.dot} ${c.shadow}`} />
    </span>
  );
}
