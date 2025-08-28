import { Router } from "express";
import { categories } from "@/constants/categories";


const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ categories });
});

export default router;