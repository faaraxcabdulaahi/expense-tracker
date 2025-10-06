import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext';
import { Login } from './pages/auth/Login';
import { ProtectedRoute } from './routes/ProtectRoute';
import { MainLayout } from './layout/MainLayout';
import { Dashboard } from './pages/dashboard/Dashboard';
import { TransactionList } from './components/transactions/TransactionList';
import { Register } from './pages/auth/Register';


function App() {
  return (
    <Router>
      <AuthProvider>
        <TransactionProvider>
          <div className="App">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/transactions" element={
                <ProtectedRoute>
                  <MainLayout>
                    <TransactionList />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </TransactionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;