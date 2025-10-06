import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { LoginCredentials } from '../../types/types';
import { AuthForm } from '../../components/forms/AuthForm';


export function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  // Redirect if already authenticated
  const from = (location.state as any)?.from?.pathname || '/';
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleLogin = async (credentials: LoginCredentials) => {
    await login(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Expense Tracker</h1>
          <p className="mt-2 text-muted-foreground">
            Take control of your finances
          </p>
        </div>
        
        <AuthForm 
          type="login" 
          onSubmit={handleLogin}
          isLoading={isLoading}
        />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}