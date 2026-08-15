import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { StatusStrip } from './StatusStrip';

const statusStripPages = ['/dashboard', '/ingestion'];

export function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const showStatusStrip = statusStripPages.includes(location.pathname);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative" style={{ paddingBottom: showStatusStrip ? '32px' : '0' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      {showStatusStrip && <StatusStrip />}
    </div>
  );
}
