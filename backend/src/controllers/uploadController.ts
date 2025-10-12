import type{ Request, Response } from "express";
import cloudinary from "../config/cloudinary.js";
import { User } from "../model/userModel.js";

export const uploadProfilePicture = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ message: "No file provided" });

  try {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "profile_pics" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: "Upload failed", error });

        const user = (req as any).user;

        if (user) {
          user.profilePicture = result?.secure_url || "";
          await user.save();
        }

        res.status(200).json({
          message: "Profile picture uploaded successfully",
          url: result?.secure_url,
        });
      }
    );

    stream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const removeProfilePicture = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    
    // Update user to remove profile picture
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: "" },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile picture removed successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error('Remove profile picture error:', error);
    res.status(500).json({ message: "Failed to remove profile picture" });
  }
};