import { categories } from "@/constants/categories";
import { z } from "zod";

export const createTransactionSchema = z.object({
    title:z.string().min(1, "Title is required"),
    amount:z.number(),
    type:z.enum(["income", "expense"]),
    category: z.enum([...(categories as [string, ...string[]])]), 
    date:z.string().refine((val)=> !isNaN(Date.parse(val)), {message:"invalid date"})
});

export const updateTransactionSchema = createTransactionSchema.partial();