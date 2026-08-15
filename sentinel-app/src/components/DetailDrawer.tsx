import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface DetailDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
}

export function DetailDrawer({ open, onClose, title, children, width = 'w-[480px]' }: DetailDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[rgba(11,18,32,0.7)] backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className={`fixed right-0 top-0 bottom-0 z-50 ${width} glass-card rounded-l-2xl rounded-r-none border-r-0 flex flex-col overflow-hidden`}
            style={{ borderRadius: '16px 0 0 16px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[rgba(45,212,191,0.12)]">
              <h3 className="text-base font-semibold text-[#E6EAF2]">{title}</h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-[rgba(45,212,191,0.08)] transition-colors text-[#8B95AB] hover:text-[#E6EAF2]"
              >
                <X size={18} />
              </button>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
