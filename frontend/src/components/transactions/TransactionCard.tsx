import React from 'react';
import { Edit2, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import type { Transaction } from '../../types/transaction';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { categoryColors, formatCurrency, formatDate } from '../../utils/constants';
import { Button } from '../ui/button';


interface TransactionCardProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export function TransactionCard({ 
  transaction, 
  onEdit, 
  onDelete, 
  isLoading = false 
}: TransactionCardProps) {
  const isIncome = transaction.type === 'income';
  const amountColor = isIncome ? 'text-green-600' : 'text-red-600';
  const amountPrefix = isIncome ? '+' : '-';
  const Icon = isIncome ? TrendingUp : TrendingDown;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100' : 'bg-red-100'}`}>
            <Icon className={`h-4 w-4 ${isIncome ? 'text-green-600' : 'text-red-600'}`} />
          </div>
          <div>
            <CardTitle className="text-base font-medium">
              {transaction.title}
            </CardTitle>
            <CardDescription>
              {formatDate(transaction.date)}
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(transaction)}
            disabled={isLoading}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(transaction._id)}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[transaction.category]}`}>
              {transaction.category}
            </span>
          </div>
          <div className={`text-lg font-semibold ${amountColor}`}>
            {amountPrefix}{formatCurrency(Math.abs(transaction.amount))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}