import { protect } from "../middleware/authMiddlware.js";
import { Router } from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { uploadProfilePicture, removeProfilePicture } from "../controllers/uploadController.js";

const router = Router();

router.post("/profile-picture", protect, upload.single("image"), uploadProfilePicture);
router.delete("/profile-picture", protect, removeProfilePicture); // ADD THIS ROUTE

export default router;