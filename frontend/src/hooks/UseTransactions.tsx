import { useTransactions as useTransactionContext } from '../context/TransactionContext';
import { useCallback, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function useTransactions() {
  const context = useTransactionContext();
  const { isAuthenticated } = useAuth();

  // Auto-fetch transactions when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      context.getTransactions();
    }
  }, [isAuthenticated, context.filters]);

  // Memoized filter function
  const applyFilters = useCallback((filters: any) => {
    context.setFilters(filters);
  }, [context]);

  // Memoized transaction actions
  const handleCreateTransaction = useCallback(async (data: any) => {
    await context.createTransaction(data);
  }, [context]);

  const handleUpdateTransaction = useCallback(async (id: string, data: any) => {
    await context.updateTransaction(id, data);
  }, [context]);

  const handleDeleteTransaction = useCallback(async (id: string) => {
    await context.deleteTransaction(id);
  }, [context]);

  return {
    ...context,
    applyFilters,
    handleCreateTransaction,
    handleUpdateTransaction,
    handleDeleteTransaction,
  };
}