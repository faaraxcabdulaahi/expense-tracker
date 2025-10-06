import { apiCall } from './api';
import type { 
  Transaction, 
  CreateTransactionData, 
  UpdateTransactionData, 
  TransactionsResponse,
  TransactionFilters 
} from '../types/transaction';

export const transactionService = {
  // Create new transaction
  async createTransaction(data: CreateTransactionData): Promise<Transaction> {
    const response = await apiCall<Transaction>('post', '/transaction', data);
    if (!response.success) throw new Error(response.error);
    return response.data!;
  },

  // Get transactions with filters
  async getTransactions(filters: TransactionFilters = {}): Promise<TransactionsResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const url = `/transaction?${queryParams.toString()}`;
    const response = await apiCall<TransactionsResponse>('get', url);
    
    if (!response.success) throw new Error(response.error);
    return response.data!;
  },

  // Update transaction
  async updateTransaction(id: string, data: UpdateTransactionData): Promise<Transaction> {
    const response = await apiCall<Transaction>('put', `/transaction/${id}`, data);
    if (!response.success) throw new Error(response.error);
    return response.data!;
  },

  // Delete transaction
  async deleteTransaction(id: string): Promise<void> {
    const response = await apiCall('delete', `/transaction/${id}`);
    if (!response.success) throw new Error(response.error);
  },

  // Get monthly summary
  async getMonthlySummary(): Promise<any> {
    const response = await apiCall('get', '/transaction/monthly-summary');
    if (!response.success) throw new Error(response.error);
    return response.data!;
  },
};