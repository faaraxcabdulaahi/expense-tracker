import mongoose from "mongoose";
import { Express } from "express";
import chalk from "chalk";
import { env } from "./env.js";

const connectToDb = async (app: Express): Promise<void> => {
  const mongoDb: string = process.env.MONGO_URI!;
  if (!mongoDb) {
    console.error(chalk.red("❌ MONGO_URI is not defined in environment variables"));
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`✅ Database is successfully ${chalk.green.bold(conn.connect.name)}`);

    app.listen(env.PORT, () => {
      console.log(`${chalk.green.bold("✅ Server")} listening on port ${env.PORT}`);
    });
  } catch (error) {
    console.error(chalk.red("❌ DB connection failed:"), error);
    process.exit(1);
  }
};

export default connectToDb;
