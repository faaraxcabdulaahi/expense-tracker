import mongoose from "mongoose";
import { Express } from "express";
import chalk from "chalk";

const connectToDb = async (app: Express, port: number): Promise<void> => {
  const mongoDb = process.env.MONGO_URI;

  if (!mongoDb) {
    console.error(chalk.red("❌ MONGO_URI is not defined in environment variables"));
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoDb);
    console.log(`✅ Database is successfully ${chalk.green.bold("running")}`);

    app.listen(port, () => {
      console.log(`${chalk.green.bold("✅ Server")} listening on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};




export default connectToDb;
