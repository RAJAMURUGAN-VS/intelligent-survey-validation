import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
  glowColor?: 'teal' | 'amber' | 'violet' | 'danger';
}

const glowMap = {
  teal: 'hover:border-[rgba(45,212,191,0.4)] hover:shadow-[0_0_40px_rgba(45,212,191,0.14)]',
  amber: 'hover:border-[rgba(245,165,36,0.4)] hover:shadow-[0_0_40px_rgba(245,165,36,0.14)]',
  violet: 'hover:border-[rgba(139,127,232,0.4)] hover:shadow-[0_0_40px_rgba(139,127,232,0.14)]',
  danger: 'hover:border-[rgba(240,68,56,0.4)] hover:shadow-[0_0_40px_rgba(240,68,56,0.14)]',
};

export function GlassCard({ children, className = '', interactive = false, onClick, glowColor = 'teal' }: GlassCardProps) {
  const interactiveClass = interactive ? `cursor-pointer ${glowMap[glowColor]}` : '';

  return (
    <motion.div
      className={`glass-card p-4 ${interactiveClass} ${className}`}
      whileHover={interactive ? { y: -2 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
