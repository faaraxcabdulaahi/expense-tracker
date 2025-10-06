import { categories } from '@/utils/constants';

export interface Transaction {
  _id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  owner: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTransactionData {
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface UpdateTransactionData extends Partial<CreateTransactionData> {}

export interface TransactionFilters {
  category?: string;
  type?: 'income' | 'expense';
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface TransactionsResponse {
  data: Transaction[];
  total: number;
  page: number;
  pages: number;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  recentTransactions: Transaction[];
}

export interface TransactionState {
  transactions: Transaction[];
  currentTransaction: Transaction | null;
  filters: TransactionFilters;
  isLoading: boolean;
  error: string | null;
  summary: {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
  };
}

export type TransactionAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TRANSACTIONS'; payload: TransactionsResponse }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<TransactionFilters> }
  | { type: 'SET_SUMMARY'; payload: Pick<TransactionSummary, 'totalIncome' | 'totalExpenses' | 'balance'> }
  | { type: 'SET_CURRENT_TRANSACTION'; payload: Transaction | null };