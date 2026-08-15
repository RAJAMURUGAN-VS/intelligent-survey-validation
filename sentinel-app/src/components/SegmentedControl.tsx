import { motion } from 'framer-motion';

interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
}

export function SegmentedControl({ options, value, onChange, size = 'md' }: SegmentedControlProps) {
  const padding = size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm';
  return (
    <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(20,28,46,0.8)', border: '1px solid rgba(45,212,191,0.12)' }}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`relative ${padding} font-medium rounded-lg transition-colors duration-150 z-10`}
          style={{ color: value === opt ? '#0B1220' : '#8B95AB', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {value === opt && (
            <motion.div
              layoutId="segmented-control-bg"
              className="absolute inset-0 rounded-lg"
              style={{ background: '#2DD4BF', zIndex: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {opt}
        </button>
      ))}
    </div>
  );
}
