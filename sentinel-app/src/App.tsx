import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { ToastProvider } from './components/Toast';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import IngestionPage from './pages/IngestionPage';
import ModelLabPage from './pages/ModelLabPage';
import RulesPage from './pages/RulesPage';
import AnomaliesPage from './pages/AnomaliesPage';
import ValidationPage from './pages/ValidationPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <AppLayout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/ingestion" element={<IngestionPage />} />
                <Route path="/model-lab" element={<ModelLabPage />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/anomalies" element={<AnomaliesPage />} />
                <Route path="/validation" element={<ValidationPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
              </Routes>
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ToastProvider>
  );
}
