import mongoose from "mongoose";
import { Schema, type Document } from "mongoose";


interface ITransaction extends Document {
    title : string,
    amount:number,
    type: "income" | "expense",
    category:string,
    date:Date,
    owner:mongoose.Types.ObjectId
}

const transactionSchema = new Schema <ITransaction> ({
    title:{type:String, required:true},
    amount:{type:Number, required:true},
    type:{type:String, enum:["income", "expense"], required:true},
    category:{type:String, required:true},
    date:{type:Date, required:true},
    owner:{type:Schema.Types.ObjectId, ref:"User", required:true}

},{
    timestamps:true
})

export const Transaction =  mongoose.model<ITransaction>("Transaction", transactionSchema)