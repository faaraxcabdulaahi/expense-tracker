import { z } from 'zod';
import { categories } from './constants';

export const createTransactionSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  amount: z.number().positive('Amount must be positive'),
  type: z.enum(['income', 'expense'], {
    required_error: 'Type is required',
  }),
  category: z.enum([...(categories as [string, ...string[]])], {
    required_error: 'Category is required',
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionFormData = z.infer<typeof updateTransactionSchema>;