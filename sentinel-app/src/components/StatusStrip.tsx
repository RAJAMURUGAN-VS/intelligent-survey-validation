import { useEffect, useState } from 'react';
import { PulseDot } from './PulseDot';

export function StatusStrip() {
  const [seconds, setSeconds] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s >= 60) return 0;
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    return `${m}m ${s % 60}s ago`;
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 h-8 flex items-center justify-between px-5"
      style={{
        background: 'rgba(11,18,32,0.95)',
        borderTop: '1px solid rgba(45,212,191,0.10)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex items-center gap-2">
        <PulseDot color="success" size="sm" />
        <span className="text-xs font-mono text-[#8B95AB]">
          System Status:{' '}
          <span className="text-[#2ED47A]">All Validation Engines Online</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-[#8B95AB]">
          PLFS 2024–25 · Q3 Survey
        </span>
        <span className="text-xs font-mono" style={{ color: '#2DD4BF' }}>
          eSigma Synced {formatTime(seconds)}
        </span>
      </div>
    </div>
  );
}
