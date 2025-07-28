import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUSER extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  comparePassword(enteredPassword: string): Promise<boolean>;
}
