import type {Request, Response} from "express";
import { Transaction } from "@/model/transactionModel";
import { createTransactionSchema, updateTransactionSchema } from "@/validations/transactionValidation";

const parseDate = (dateStr:string): Date => new Date(dateStr);

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const parsed = createTransactionSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ errors: parsed.error.issues });

    const { title, amount, type, category, date } = parsed.data;

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      date: parseDate(date),
      owner: req.user?._id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};