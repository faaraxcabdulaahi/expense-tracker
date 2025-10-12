import React from 'react';
import { useAnalytics } from '../../hooks/UseAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { AlertCircle, BarChart3, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { MonthlyChart } from '../../components/analytics/MonthlyChart';
import { CategoryChart } from '../../components/analytics/CategoryChart';
import { IncomeExpenseChart } from '../../components/analytics/IncomeExpenseChart';


export function Analytics() {
  const { monthlyData, categoryData, incomeExpenseData, isLoading, error, refetch } = useAnalytics();

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Detailed insights into your financial patterns
            </p>
          </div>
        </div>
        
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-red-800">
              <AlertCircle className="h-5 w-5" />
              <div>
                <div className="font-semibold">Error Loading Analytics</div>
                <div>{error}</div>
              </div>
              <Button variant="outline" size="sm" onClick={refetch} className="ml-auto">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights into your financial patterns
          </p>
        </div>
        <Button 
          onClick={refetch} 
          variant="outline" 
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* Quick Stats */}
      {!isLoading && monthlyData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Periods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyData.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${Math.round(monthlyData.reduce((sum, d) => sum + d.income, 0) / monthlyData.length).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ${Math.round(monthlyData.reduce((sum, d) => sum + d.expenses, 0) / monthlyData.length).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ${Math.round(monthlyData.reduce((sum, d) => sum + d.savings, 0) / monthlyData.length).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid gap-6">
        <MonthlyChart data={monthlyData} isLoading={isLoading} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryChart data={categoryData} isLoading={isLoading} />
          <IncomeExpenseChart data={incomeExpenseData} isLoading={isLoading} />
        </div>
      </div>

      {/* Data Not Available State */}
      {!isLoading && monthlyData.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Analytics Data Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start adding transactions to see detailed analytics and insights about your spending patterns.
              </p>
              <Button asChild>
                <a href="/transactions">Add Your First Transaction</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}