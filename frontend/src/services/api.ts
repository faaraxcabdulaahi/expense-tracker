import axios from "axios"

import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type { ApiResponse } from "../types/types";

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach auth token to every request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle common response patterns and errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ Response received from: ${response.config.url}`, response.data);
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ Response interceptor error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });

    // Handle common HTTP errors
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;

      switch (status) {
        case 401:
          // Token expired or invalid
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          console.warn('⛔ Access forbidden');
          break;
        case 404:
          console.warn('🔍 Resource not found');
          break;
        case 500:
          console.error('💥 Server error occurred');
          break;
      }

      // Return a consistent error format
      return Promise.reject({
        success: false,
        error: data?.message || `HTTP Error: ${status}`,
        status
      });
    }

    return Promise.reject({
      success: false,
      error: 'Network error. Please check your connection.'
    });
  }
);

// Generic API call function with proper typing
export const apiCall = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await api({
      method,
      url,
      data,
    });

    return {
      data: response.data,
      success: true,
    };
  } catch (error: any) {
    return {
      error: error.error || 'An unexpected error occurred',
      success: false,
    };
  }
};

export default api;