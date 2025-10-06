import React from "react";

import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { 
  Transaction, 
  TransactionState, 
  TransactionAction, 
  CreateTransactionData, 
  UpdateTransactionData,
  TransactionFilters 
} from '../types/transaction';
import { transactionService } from '../services/transaction';
import { useAuth } from './AuthContext';

// Initial state
const initialState: TransactionState = {
  transactions: [],
  currentTransaction: null,
  filters: {
    page: 1,
    limit: 10,
  },
  isLoading: false,
  error: null,
  summary: {
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  },
};

// Reducer function
function transactionReducer(state: TransactionState, action: TransactionAction): TransactionState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };

    case 'SET_TRANSACTIONS':
      return { 
        ...state, 
        transactions: action.payload.data,
        isLoading: false,
        error: null,
      };

    case 'ADD_TRANSACTION':
      return { 
        ...state, 
        transactions: [action.payload, ...state.transactions],
        currentTransaction: null,
      };

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction._id === action.payload._id ? action.payload : transaction
        ),
        currentTransaction: null,
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction._id !== action.payload
        ),
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case 'SET_SUMMARY':
      return {
        ...state,
        summary: action.payload,
      };

    case 'SET_CURRENT_TRANSACTION':
      return {
        ...state,
        currentTransaction: action.payload,
      };

    default:
      return state;
  }
}

// Context type
interface TransactionContextType extends TransactionState {
  // CRUD Operations
  createTransaction: (data: CreateTransactionData) => Promise<void>;
  getTransactions: (filters?: TransactionFilters) => Promise<void>;
  updateTransaction: (id: string, data: UpdateTransactionData) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  
  // Utility functions
  setFilters: (filters: Partial<TransactionFilters>) => void;
  setCurrentTransaction: (transaction: Transaction | null) => void;
  clearError: () => void;
  calculateSummary: () => void;
}

// Create context
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Provider component
interface TransactionProviderProps {
  children: ReactNode;
}

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [state, dispatch] = useReducer(transactionReducer, initialState);
  const { isAuthenticated } = useAuth();

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const setFilters = (filters: Partial<TransactionFilters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const setCurrentTransaction = (transaction: Transaction | null) => {
    dispatch({ type: 'SET_CURRENT_TRANSACTION', payload: transaction });
  };

  // Calculate summary from current transactions
  const calculateSummary = () => {
    const totalIncome = state.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = state.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    dispatch({ 
      type: 'SET_SUMMARY', 
      payload: { totalIncome, totalExpenses, balance } 
    });
  };

  // Create transaction
  const createTransaction = async (data: CreateTransactionData): Promise<void> => {
    if (!isAuthenticated) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      const newTransaction = await transactionService.createTransaction(data);
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
      calculateSummary();
    } catch (error: any) {
      setError(error.message || 'Failed to create transaction');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get transactions with filters
  const getTransactions = async (filters: TransactionFilters = {}): Promise<void> => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const response = await transactionService.getTransactions({
        ...state.filters,
        ...filters,
      });
      dispatch({ type: 'SET_TRANSACTIONS', payload: response });
      calculateSummary();
    } catch (error: any) {
      setError(error.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  // Update transaction
  const updateTransaction = async (id: string, data: UpdateTransactionData): Promise<void> => {
    if (!isAuthenticated) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      const updatedTransaction = await transactionService.updateTransaction(id, data);
      dispatch({ type: 'UPDATE_TRANSACTION', payload: updatedTransaction });
      calculateSummary();
    } catch (error: any) {
      setError(error.message || 'Failed to update transaction');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id: string): Promise<void> => {
    if (!isAuthenticated) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      await transactionService.deleteTransaction(id);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
      calculateSummary();
    } catch (error: any) {
      setError(error.message || 'Failed to delete transaction');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: TransactionContextType = {
    ...state,
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    setFilters,
    setCurrentTransaction,
    clearError,
    calculateSummary,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

// Custom hook
export function useTransactions(): TransactionContextType {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}