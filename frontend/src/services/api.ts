// import axios from "axios"
// import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
// import type { ApiResponse } from "../types/types";

// // ✅ CORRECT: Use your actual backend URL
// const api: AxiosInstance = axios.create({
//   baseURL: 'https://expense-tracker-7ltl.onrender.com/api/v1',
//   timeout: 10000,
// });

// // Request Interceptor
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     // Safe localStorage access
//     let token: string | null = null;
//     try {
//       token = localStorage.getItem('authToken');
//     } catch (error) {
//       console.warn('localStorage not available');
//     }

//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     if (config.data instanceof FormData) {
//       delete config.headers['Content-Type'];
//     } else if (!config.headers['Content-Type']) {
//       config.headers['Content-Type'] = 'application/json';
//     }

//     console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
//     return config;
//   },
//   (error: AxiosError) => {
//     console.error('❌ Request interceptor error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor
// api.interceptors.response.use(
//   (response: AxiosResponse) => {
//     console.log(`✅ Response received from: ${response.config.url}`, response.data);
//     return response;
//   },
//   (error: AxiosError) => {
//     console.error('❌ Response interceptor error:', {
//       url: error.config?.url,
//       status: error.response?.status,
//       data: error.response?.data
//     });

//     if (error.response) {
//       const status = error.response.status;
//       const data = error.response.data as any;

//       switch (status) {
//         case 401:
//           try {
//             localStorage.removeItem('authToken');
//             localStorage.removeItem('user');
//             window.location.href = '/login';
//           } catch (e) {
//             console.warn('Could not access localStorage');
//           }
//           break;
//         case 403:
//           console.warn('⛔ Access forbidden');
//           break;
//         case 404:
//           console.warn('🔍 Resource not found');
//           break;
//         case 500:
//           console.error('💥 Server error occurred');
//           break;
//       }

//       return Promise.reject({
//         success: false,
//         error: data?.message || `HTTP Error: ${status}`,
//         status
//       });
//     }

//     return Promise.reject({
//       success: false,
//       error: 'Network error. Please check your connection.'
//     });
//   }
// );

// // Generic API call function
// export const apiCall = async <T>(
//   method: 'get' | 'post' | 'put' | 'delete',
//   url: string,
//   data?: any,
//   config?: any
// ): Promise<ApiResponse<T>> => {
//   try {
//     const requestConfig = {
//       method,
//       url,
//       ...config
//     };

//     if (method !== 'get' && method !== 'delete' && data !== undefined) {
//       requestConfig.data = data;
//     } else if (method === 'get' && data) {
//       requestConfig.params = data;
//     }

//     const response = await api(requestConfig);

//     return {
//       data: response.data,
//       success: true,
//     };
//   } catch (error: any) {
//     return {
//       error: error.error || error.message || 'An unexpected error occurred',
//       success: false,
//     };
//   }
// };

// export default api;

import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import type { ApiResponse } from "../types/types";

// ✅ FIXED: Use environment variable with fallback
// This is the ideal setup for your api.ts
const api: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://expense-tracker-149m.onrender.com/api/v1",
  timeout: 15000,
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Safe localStorage access
    let token: string | null = null;
    try {
      token = localStorage.getItem("authToken");
    } catch (error) {
      console.warn("localStorage not available",error);
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    console.log(
      `🚀 Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${
        config.url
      }`
    );
    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(
      `✅ Response received from: ${response.config.url}`,
      response.status,
      response.data
    );
    return response;
  },
  (error: AxiosError) => {
    console.error("❌ Response interceptor error:", {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;

      switch (status) {
        case 401:
          try {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            window.location.href = "/login";
          } catch (e) {
            console.warn("Could not access localStorage");
          }
          break;
        case 403:
          console.warn("⛔ Access forbidden");
          break;
        case 404:
          console.warn("🔍 Resource not found");
          break;
        case 500:
          console.error("💥 Server error occurred");
          break;
      }

      return Promise.reject({
        success: false,
        error: data?.message || `HTTP Error: ${status}`,
        status,
      });
    }

    // Network error - show more specific message
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        success: false,
        error: "Request timeout. Please try again.",
      });
    }

    return Promise.reject({
      success: false,
      error: `Network error: ${error.message}. Please check your connection and try again.`,
    });
  }
);

// Generic API call function
export const apiCall = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
  config?: any
): Promise<ApiResponse<T>> => {
  try {
    const requestConfig = {
      method,
      url,
      ...config,
    };

    if (method !== "get" && method !== "delete" && data !== undefined) {
      requestConfig.data = data;
    } else if (method === "get" && data) {
      requestConfig.params = data;
    }

    const response = await api(requestConfig);

    return {
      data: response.data,
      success: true,
    };
  } catch (error: any) {
    return {
      error: error.error || error.message || "An unexpected error occurred",
      success: false,
    };
  }
};

export default api;
