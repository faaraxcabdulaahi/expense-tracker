export interface PlatformStats {
  totalUsers: number;
  totalIncome: number;
  totalExpenses: number;
  totalTransactions: number;
  activeUsers: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  profilePicture?: string;
  createdAt: string;
  transactionCount: number;
  lastActive: string;
}