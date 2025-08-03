import express from "express";
import type {Express} from "express";
import connectToDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js"

const app:Express = express();

app.use(express.json());

app.use("/api/auth", authRoutes);


connectToDb(app);