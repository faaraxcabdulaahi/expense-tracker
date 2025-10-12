import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { TrendingUp } from "lucide-react";
import type { ChartData } from "../../types/analytics";

interface MonthlyChartProps {
  data: ChartData[];
  isLoading: boolean;
}

export function MonthlyChart({ data, isLoading }: MonthlyChartProps) {
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
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Monthly Financial Overview
        </CardTitle>
        <CardDescription>
          Track your income, expenses, and savings over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
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
              formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]}
              labelFormatter={(label) => `Period: ${label}`}
            />
            <Legend />
            <Bar
              dataKey="income"
              name="Income"
              fill="#10b981"
              radius={[2, 2, 0, 0]}
              className="hover:opacity-80"
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#ef4444"
              radius={[2, 2, 0, 0]}
              className="hover:opacity-80"
            />
            <Bar
              dataKey="savings"
              name="Savings"
              fill="#3b82f6"
              radius={[2, 2, 0, 0]}
              className="hover:opacity-80"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
