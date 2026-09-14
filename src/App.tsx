import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { ToastProvider } from './components/ui/Toast';
import { DataStateProvider, type DataState } from './contexts/DataStateContext';
import { AuthProvider } from './contexts/AuthContext';
import { StoreProvider } from './contexts/StoreContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Trips } from './pages/Trips';
import { TripDetails } from './pages/TripDetails';
import { Drivers } from './pages/Drivers';
import { DriverProfile } from './pages/DriverProfile';
import { Customers } from './pages/Customers';
import { CustomerProfile } from './pages/CustomerProfile';
import { Disputes } from './pages/Disputes';
import { DisputeDetails } from './pages/DisputeDetails';
import { Payments } from './pages/Payments';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { DesignSystem } from './pages/DesignSystem';

interface AppProps {
  /** حالة البيانات في الجداول واللوحات: جاهزة / تحميل / فارغة / خطأ */
  dataState?: DataState;
}

export function App({ dataState = 'ready' }: AppProps) {
  return (
    <ToastProvider>
      <AuthProvider>
        <StoreProvider>
          <DataStateProvider value={dataState}>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/trips" element={<Trips />} />
                    <Route path="/trips/:tripId" element={<TripDetails />} />
                    <Route path="/drivers" element={<Drivers />} />
                    <Route path="/drivers/:driverId" element={<DriverProfile />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/customers/:customerId" element={<CustomerProfile />} />
                    <Route path="/disputes" element={<Disputes />} />
                    <Route path="/disputes/:disputeId" element={<DisputeDetails />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/design-system" element={<DesignSystem />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </DataStateProvider>
        </StoreProvider>
      </AuthProvider>
    </ToastProvider>
  );
}