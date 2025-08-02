import express from "express";
import { login, register } from "../controllers/authController";
import { protect } from "../middleware/authMiddlware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, (req, res) => {
  res.status(200).json(req.user);
});



export default router;