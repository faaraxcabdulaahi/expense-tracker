import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { RegisterCredentials } from '../../types/types';
import { AuthForm } from '../../components/forms/AuthForm';


export function Register() {
  const { register, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  // Redirect if already authenticated
  const from = (location.state as any)?.from?.pathname || '/';
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleRegister = async (credentials: RegisterCredentials) => {
    await register(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Get Started</h1>
          <p className="mt-2 text-muted-foreground">
            Create your account to start tracking expenses
          </p>
        </div>
        
        <AuthForm 
          type="register" 
          onSubmit={handleRegister}
          isLoading={isLoading}
        />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}