import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

interface ijwt {
    id:string,
    [key:string]:any
}

export const signJwt = (payload:ijwt):string => {
    return jwt.sign(payload, env.JWT_SECRET, {expiresIn:"7d"})
}