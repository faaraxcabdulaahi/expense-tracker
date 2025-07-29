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

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(chalk.red("❌ Invalid environment variables:\n"), result.error.format());
  process.exit(1);
}

export const env = {
  MONGO_URI : result.data.MONGO_URI,
  PORT: Number(result.data.PORT)|| 5001
}