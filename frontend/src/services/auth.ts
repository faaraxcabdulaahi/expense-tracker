import { apiCall } from './api';
import type { LoginCredentials, RegisterCredentials, AuthResponse, User, ApiResponse } from "../types/types";

// Authentication service functions
export const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiCall<AuthResponse>('post', '/auth/login', credentials);
  },

  // Register new user
  async register(credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiCall<AuthResponse>('post', '/auth/register', credentials);
  },

  // Get current user profile
  async getProfile(): Promise<ApiResponse<User>> {
    return apiCall<User>('get', '/auth/profile');
  },

  // Update user profile
  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return apiCall<User>('put', '/auth/profile', userData);
  },
};

// Token management utilities
export const tokenService = {
  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  },

  removeToken(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Check if token exists and is valid (basic check)
  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Basic JWT expiration check (you might want to use a library like jwt-decode)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },
};