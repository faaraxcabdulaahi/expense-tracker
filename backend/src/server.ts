import express from "express";
import cors from "cors";
import type { Express } from "express";
import connectToDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import transactionRoutes from "./routes/transactionRoute.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your Vite frontend
    credentials: true, // allow cookies/auth headers
  })
);

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectToDb(app);
