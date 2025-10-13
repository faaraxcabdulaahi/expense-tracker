// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ErrorBoundary } from './components/error/ErrorBoundary';
// import { AuthProvider } from './context/AuthContext';
// import { TransactionProvider } from './context/TransactionContext';
// import { ProtectedRoute } from './routes/ProtectRoute';
// import { MainLayout } from './layout/MainLayout';
// import { Dashboard } from './pages/dashboard/Dashboard';
// import { TransactionList } from './components/transactions/TransactionList';
// import { Analytics } from './pages/analytics/Analytics';
// import { AdminDashboard } from './pages/admin/AdminDashboard';
// import { Profile } from './pages/profile/Profile';
// import { Login } from './pages/auth/Login';
// import { Register } from './pages/auth/Register';

// function App() {
//   return (
//     <ErrorBoundary>
//       <Router>
//         <AuthProvider>
//           <TransactionProvider>
//             <div className="App">
//               <Routes>
//                 {/* Public routes */}
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />

//                 {/* Protected routes */}
//                 <Route path="/" element={
//                   <ProtectedRoute>
//                     <MainLayout>
//                       <Dashboard />
//                     </MainLayout>
//                   </ProtectedRoute>
//                 } />

//                 <Route path="/transactions" element={
//                   <ProtectedRoute>
//                     <MainLayout>
//                       <TransactionList />
//                     </MainLayout>
//                   </ProtectedRoute>
//                 } />

//                 <Route path="/analytics" element={
//                   <ProtectedRoute>
//                     <MainLayout>
//                       <Analytics />
//                     </MainLayout>
//                   </ProtectedRoute>
//                 } />

//                 <Route path="/admin" element={
//                   <ProtectedRoute requiredRole="admin">
//                     <MainLayout>
//                       <AdminDashboard />
//                     </MainLayout>
//                   </ProtectedRoute>
//                 } />

//                 <Route path="/profile" element={
//                   <ProtectedRoute>
//                     <MainLayout>
//                       <Profile />
//                     </MainLayout>
//                   </ProtectedRoute>
//                 } />

//                 {/* Fallback route */}
//                 <Route path="*" element={<Navigate to="/" replace />} />
//               </Routes>
//             </div>
//           </TransactionProvider>
//         </AuthProvider>
//       </Router>
//     </ErrorBoundary>
//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ErrorBoundary } from "./components/error/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";
import { ProtectedRoute } from "./routes/ProtectRoute";
import { MainLayout } from "./layout/MainLayout";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { TransactionList } from "./components/transactions/TransactionList";
import { Analytics } from "./pages/analytics/Analytics";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { Profile } from "./pages/profile/Profile";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <TransactionProvider>
            <div className="App">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected routes with MainLayout wrapper */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* These will render in MainLayout's Outlet */}
                  <Route index element={<Dashboard />} />
                  <Route path="transactions" element={<TransactionList />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route
                    path="admin"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="profile" element={<Profile />} />
                </Route>

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </TransactionProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
