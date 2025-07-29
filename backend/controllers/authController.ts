import { Response, Request } from "express";
import { registerSchema } from "../validations/authValidation";
import { User } from "../model/userModel";

export const register = async(req:Request, res:Response) => {
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({errors:parsed.error.issues});

        const {email, password} = parsed.data;

        const emailExistence = await User.findOne({email});
        if(emailExistence) return res.status(409).json({message:"Email already exist"})

        const newUser = User.create({name, email, password});
        return res.status(201).json({message:"user successfully created", user:newUser});

    } catch (error) {
        res.status(500).json({message:"server error occurred"})
    }
}