import mongoose from "mongoose";
import type { Express } from "express";
import chalk from "chalk";
import { env } from "./env.js";

const connectToDb = async (app: Express): Promise<void> => {
  try {
    const connDb = await mongoose.connect(env.MONGO_URI);
    console.log(`✅ Database is successfully ${chalk.green.bold(connDb.connection.name)}`);

    app.listen(env.PORT, () => {
      console.log(`${chalk.green.bold("✅ Server")} listening on port ${env.PORT}`);
    });
  } catch (error) {
    console.error(chalk.red("❌ DB connection failed:"), error);
    process.exit(1);
  }
};

export default connectToDb;
