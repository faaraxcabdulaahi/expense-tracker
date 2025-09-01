import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../model/userModel.js";

interface IJWT {
  id: string;
}

// Protects routes: checks JWT and attaches user to req.user
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ Check Bearer token exists
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2️⃣ Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET) as IJWT;

    // 3️⃣ Find user in DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // 4️⃣ Attach user to request
    req.user = user;

    // 5️⃣ Proceed to next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
