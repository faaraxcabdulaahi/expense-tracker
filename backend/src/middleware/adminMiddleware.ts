import type { Request, Response } from "express";
import { User } from "@/model/userModel.js";
import { Transaction } from "@/model/transactionModel.js";

// Fetches overview: total users, income, expenses
export const getAdminOverview = async (req: Request, res: Response) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();

    // Total income
    const totalIncomeAgg = await Transaction.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalIncome = totalIncomeAgg[0]?.total || 0;

    // Total expense
    const totalExpenseAgg = await Transaction.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpense = totalExpenseAgg[0]?.total || 0;

    // Return JSON overview
    res.status(200).json({ totalUsers, totalIncome, totalExpense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch overview" });
  }
};
