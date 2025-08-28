import express from "express";
import type {Express} from "express";
import connectToDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import transactionRoutes from "./routes/transactionRoute.js";
import categoriesRoutes from "./routes/categoriesRoutes.js"

const app:Express = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/categories", categoriesRoutes)


connectToDb(app);