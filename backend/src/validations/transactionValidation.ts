// import { categories } from "../constants/categories.js";
// import { z } from "zod";

// export const createTransactionSchema = z.object({
//     title:z.string().min(1, "Title is required"),
//     amount:z.number(),
//     type:z.enum(["income", "expense"]),
//     category: z.enum([...(categories as [string, ...string[]])]), 
//     date:z.string().refine((val)=> !isNaN(Date.parse(val)), {message:"invalid date"})
// });

// export const updateTransactionSchema = createTransactionSchema.partial();


import { categories } from "../constants/categories.js";
import { z } from "zod";

export const createTransactionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number(),
  type: z.enum(["income", "expense"]),
  category: z.string().refine((val) => categories.includes(val), {
    message: "Invalid category",
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionFormData = z.infer<typeof updateTransactionSchema>;
