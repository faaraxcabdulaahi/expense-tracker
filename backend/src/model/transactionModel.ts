import mongoose from "mongoose";
import type { Schema, Document } from "mongoose";


interface ITransaction extends Document {
    title : string,
    amount:number,
    type: "income" | "expense",
    category:string,
    date:Date,
    owner:mongoose.Types.ObjectId
}