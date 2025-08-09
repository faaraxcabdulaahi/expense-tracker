import type {Request, Response} from "express";
import { Transaction } from "@/model/transactionModel.js";
import { createTransactionSchema, updateTransactionSchema } from "@/validations/transactionValidation.js";

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

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const { category, startDate, endDate, page = "1", limit = "10" } = req.query;

    const filters: any = { owner: userId };

    if (category) filters.category = category;

    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.$gte = new Date(startDate as string);
      if (endDate) filters.date.$lte = new Date(endDate as string);
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const transactions = await Transaction.find(filters)
      .sort({ date: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const total = await Transaction.countDocuments(filters);

    res.status(200).json({
      data: transactions,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = updateTransactionSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ errors: parsed.error.issues });

    const transaction = await Transaction.findOne({ _id: id, owner: req.user?._id });
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    Object.assign(transaction, parsed.data);
    if (parsed.data.date) transaction.date = new Date(parsed.data.date);

    await transaction.save();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndDelete({ _id: id, owner: req.user?._id });
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMonthlySummary = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const summary = await Transaction.aggregate([
      { $match: { owner: userId } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            category: "$category",
            type: "$type",
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month",
          },
          categories: {
            $push: {
              category: "$_id.category",
              type: "$_id.type",
              totalAmount: "$totalAmount",
            },
          },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 12 },
    ]);

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
