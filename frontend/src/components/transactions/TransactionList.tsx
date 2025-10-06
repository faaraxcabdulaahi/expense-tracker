import React, { useState } from "react";
import { useTransactions } from "../../hooks/UseTransactions";
import type { Transaction } from "../../types/transaction";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { AlertCircle, Plus } from "lucide-react";
import { TransactionFilters } from "./TranasactionFilter";
import { TransactionCard } from "./TransactionCard";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { TransactionForm } from "./TransactionForm";


export function TransactionList() {
  const {
    transactions,
    isLoading,
    error,
    filters,
    applyFilters,
    handleCreateTransaction,
    handleUpdateTransaction,
    handleDeleteTransaction,
    setCurrentTransaction,
    currentTransaction,
    clearError,
  } = useTransactions();

  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  // Filter handlers
  const handleFilterChange = (newFilters: any) => {
    applyFilters(newFilters);
  };

  const handleClearFilters = () => {
    applyFilters({
      category: undefined,
      type: undefined,
      startDate: undefined,
      endDate: undefined,
    });
  };

  // Form handlers
  const handleAddTransaction = () => {
    console.log("🎯 Add button clicked!");
    setEditingTransaction(null);
    setShowForm(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTransaction(null);
    setCurrentTransaction(null);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingTransaction) {
        await handleUpdateTransaction(editingTransaction._id, data);
      } else {
        await handleCreateTransaction(data);
      }
      handleCloseForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await handleDeleteTransaction(id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Loading skeleton
  if (isLoading && transactions.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">
            Manage your income and expenses
          </p>
        </div>
        <Button onClick={handleAddTransaction} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-800">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearError}
            className="ml-auto"
          >
            Dismiss
          </Button>
        </div>
      )}

      {/* Filters */}
      <TransactionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Transactions Grid */}
      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            {Object.values(filters).some((f) => f !== undefined && f !== "")
              ? "No transactions match your filters"
              : "No transactions yet"}
          </div>
          <Button
            onClick={handleAddTransaction}
            variant="outline"
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Transaction
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction._id}
              transaction={transaction}
              onEdit={handleEditTransaction}
              onDelete={handleDelete}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}

      {/* Transaction Form Dialog - FIXED ACCESSIBILITY */}
      {showForm && (
        <Dialog open={showForm} onOpenChange={handleCloseForm}>
          <DialogContent 
            onClose={handleCloseForm}
            aria-describedby="transaction-form-description"
          >
            <DialogTitle className="sr-only">
              {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
            </DialogTitle>
            <div id="transaction-form-description" className="sr-only">
              {editingTransaction 
                ? 'Edit your transaction details including title, amount, type, category, and date' 
                : 'Add a new income or expense transaction by filling out the form with title, amount, type, category, and date'
              }
            </div>
            <TransactionForm
              transaction={editingTransaction}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseForm}
              isLoading={isLoading}
              isEditing={!!editingTransaction}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}