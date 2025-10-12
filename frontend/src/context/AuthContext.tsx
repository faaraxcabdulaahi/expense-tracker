import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type {
  AuthState,
  AuthAction,
  User,
  LoginCredentials,
  RegisterCredentials,
} from "../types/types";
import { authService, tokenService } from "../services/auth";

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
};

// Auth context type
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>; // Fixed this line
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Reducer function for state management
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}

// Auth Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const token = tokenService.getToken();
      
      if (token && tokenService.hasValidToken()) {
        try {
          // Verify token is still valid by fetching user profile
          const response = await authService.getProfile();
          
          if (response.success && response.data) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user: response.data,
                token: token,
              },
            });
          } else {
            // Token is invalid
            tokenService.removeToken();
            dispatch({ type: 'LOGIN_FAILURE' });
          }
        } catch (error) {
          console.error('❌ Token validation failed:', error);
          tokenService.removeToken();
          dispatch({ type: 'LOGIN_FAILURE' });
        }
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await authService.login(credentials);

      if (response.success && response.data) {
        const { user, token } = response.data;
        
        // Store token and user data
        tokenService.setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token },
        });
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  // Register function
  const register = async (credentials: RegisterCredentials): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await authService.register(credentials);

      if (response.success && response.data) {
        const { user, token } = response.data;
        
        // Store token and user data
        tokenService.setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token },
        });
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  // Logout function
  const logout = (): void => {
    tokenService.removeToken();
    dispatch({ type: 'LOGOUT' });
  };

  // Update user function - FIXED VERSION
  const updateUser = async (userData: Partial<User>): Promise<void> => {
    try {
      // Get current user from state
      const currentUser = state.user;
      if (!currentUser) {
        throw new Error('No user is currently authenticated');
      }

      // Merge current user data with new data
      const updatedUser: User = {
        ...currentUser,
        ...userData,
      };

      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update state
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });

      // Optional: If you want to persist to backend, uncomment this:
      // const response = await authService.updateProfile(userData);
      // if (!response.success) throw new Error(response.error);

    } catch (error: any) {
      console.error('Failed to update user:', error);
      throw new Error(error.message || 'Failed to update user profile');
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}