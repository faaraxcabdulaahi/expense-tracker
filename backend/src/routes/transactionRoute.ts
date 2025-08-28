import { createTransaction, deleteTransaction, getMonthlySummary, getTransactions, updateTransaction } from "@/controllers/transactionController.js";
import { protect } from "@/middleware/authMiddlware.js";
import express from "express";

const router = express.Router();

router.use(protect);

router.post("/", createTransaction);
router.get("/", getTransactions);
router.get("/monthly-summary", getMonthlySummary);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
