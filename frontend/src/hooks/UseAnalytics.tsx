import { useState, useEffect } from 'react';
import type { CategoryData, ChartData, MonthlySummary } from '../types/analytics';
import { categoryColors } from '../types/constant';
import { analyticsService } from '../services/analytics';


export function useAnalytics() {
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Process monthly data for charts
  const processMonthlyData = (data: MonthlySummary[]): ChartData[] => {
    return data.map(month => {
      const income = month.categories
        .filter(cat => cat.type === 'income')
        .reduce((sum, cat) => sum + cat.totalAmount, 0);
      
      const expenses = month.categories
        .filter(cat => cat.type === 'expense')
        .reduce((sum, cat) => sum + cat.totalAmount, 0);
      
      const savings = income - expenses;

      return {
        name: `${month._id.year}-${month._id.month.toString().padStart(2, '0')}`,
        income,
        expenses,
        savings
      };
    });
  };

  // Process category data for pie chart
  const processCategoryData = (data: MonthlySummary[]): CategoryData[] => {
    const categoryMap = new Map<string, number>();
    
    data.forEach(month => {
      month.categories.forEach(cat => {
        if (cat.type === 'expense') {
          const current = categoryMap.get(cat.category) || 0;
          categoryMap.set(cat.category, current + cat.totalAmount);
        }
      });
    });

    return Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value,
      color: categoryColors[name] || categoryColors.Other
    }));
  };

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await analyticsService.getMonthlySummary();
      setMonthlySummary(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const monthlyData = processMonthlyData(monthlySummary);
  const categoryData = processCategoryData(monthlySummary);
  const incomeExpenseData = monthlyData;

  return {
    monthlyData,
    categoryData,
    incomeExpenseData,
    isLoading,
    error,
    refetch: fetchAnalytics
  };
}