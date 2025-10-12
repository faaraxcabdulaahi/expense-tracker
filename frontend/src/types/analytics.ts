export interface MonthlySummary {
  _id: {
    year: number;
    month: number;
  };
  categories: Array<{
    category: string;
    type: 'income' | 'expense';
    totalAmount: number;
  }>;
}

export interface ChartData {
  name: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface AnalyticsState {
  monthlySummary: MonthlySummary[];
  categoryData: CategoryData[];
  incomeExpenseData: ChartData[];
  isLoading: boolean;
  error: string | null;
}