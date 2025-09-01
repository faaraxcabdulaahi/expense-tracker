import { getAdminOverview } from "@/middleware/adminController.js";
import { protect } from "@/middleware/authMiddlware.js";
import { isAdmin } from "@/middleware/roleMiddleware.js";
import  { Router } from "express";


const router = Router();

router.get("/overview", protect, isAdmin, getAdminOverview);

export default router;