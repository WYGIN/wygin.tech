import { mysqlEnum } from "drizzle-orm/mysql-core";
import { z } from "zod";

export const status = mysqlEnum("status", [
  "published",
  "draft",
  "scheduled",
  "archived",
])
  .default("published")
  .notNull()
  .default("published");
export const zodStatus = z.enum([
  "published",
  "draft",
  "scheduled",
  "archived",
]);
