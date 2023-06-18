// drizzle.config.ts
import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./src/schema",
  out: "./drizzle",
  connectionString: process.env.DATABASE_URL,
} satisfies Config;
