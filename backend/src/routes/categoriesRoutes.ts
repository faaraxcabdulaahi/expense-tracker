import { Router } from "express";
import { categories } from "../constants/categories.js";

const router = Router();

router.get("/", (req, res) => {
  console.log("✅ /api/categories hit");
  res.status(200).json({ categories });
});

export default router;
