import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { LineChart as LineChartIcon } from 'lucide-react';
import type { ChartData } from '../../types/analytics';

interface IncomeExpenseChartProps {
  data: ChartData[];
  isLoading: boolean;
}

export function IncomeExpenseChart({ data, isLoading }: IncomeExpenseChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChartIcon className="h-5 w-5 text-green-600" />
          Income vs Expenses Trend
        </CardTitle>
        <CardDescription>
          Compare your income and expenses over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
              labelFormatter={(label) => `Period: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="income" 
              name="Income" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#10b981' }}
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              name="Expenses" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#ef4444' }}
            />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Summary Statistics */}
        {data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ${Math.max(...data.map(d => d.income)).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Highest Income</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                ${Math.max(...data.map(d => d.expenses)).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Highest Expense</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                ${Math.max(...data.map(d => d.savings)).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Highest Savings</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}