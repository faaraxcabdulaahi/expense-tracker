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

userSchema.pre("save", async function(next){
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.methods.comparePassword = async function(enteredPassword:string) {
    return bcrypt.compare(enteredPassword, this.password)
}