export const categories = [
  "Food",
  "Travel",
  "Bills",
  "Shopping",
  "Health",
  "Entertainment",
  "Salary",
  "Other",
] as const;

export const transactionTypes = [
  { value: "income", label: "Income", color: "text-green-600" },
  { value: "expense", label: "Expense", color: "text-red-600" },
] as const;

export const categoryColors: Record<string, string> = {
  Food: "bg-orange-100 text-orange-800",
  Travel: "bg-blue-100 text-blue-800",
  Bills: "bg-purple-100 text-purple-800",
  Shopping: "bg-pink-100 text-pink-800",
  Health: "bg-red-100 text-red-800",
  Entertainment: "bg-yellow-100 text-yellow-800",
  Salary: "bg-green-100 text-green-800",
  Other: "bg-gray-100 text-gray-800",
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};