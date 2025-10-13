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
    origin: [
      "http://localhost:5173", 
      "https://expense-tracker-1-c27k.onrender.com"
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: 'Expense Tracker API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      transactions: '/api/v1/transaction',
      categories: '/api/v1/categories',
      upload: '/api/v1/upload',
      admin: '/api/v1/admin',
      documentation: '/docs'
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'Expense Tracker API',
    version: '1.0.0'
  });
});


app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectToDb(app);
