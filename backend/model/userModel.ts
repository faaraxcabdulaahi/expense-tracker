import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUSER extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUSER>({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true, lowercase:true},
    password:{type:String, required:true},
    role:{type:String, enum:["user", "admin"], default:"user"}
},{
    timestamps:true
});
