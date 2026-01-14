// app/dashboard/layout.js
'use client';

import { AuthProvider } from '../../context/AuthContext';
import ProtectedRoute from '../Component/ProtectedRoute.jsx';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </ProtectedRoute>
  );
}