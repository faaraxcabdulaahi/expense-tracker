import { protect } from "@/middleware/authMiddlware";
import { Router } from "express";
import {upLoad} from "../middleware/uploadMiddleware.js";
import { uploadProfilePicture } from "../controllers/upload.controller.js";

const router = Router();

router.post("/profile-picture", protect, upLoad.single("image"), uploadProfilePicture)

export default router;
