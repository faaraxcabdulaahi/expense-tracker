import { z } from "zod";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const envSchema = z.object({
  MONGO_URI: z.string().url({
    message: chalk.red.bold("❌ MONG_URI must be a valid url"),
  }),
  PORT: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(chalk.red("❌ Invalid environment variables:\n"), parsedEnv.error.format);
  process.exit(1);
}

export const env = {
  MONGO_URI : parsedEnv.data.MONGO_URI,
  PORT: Number(parsedEnv.data.PORT)|| 5001
}