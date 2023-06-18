import {
  mysqlTable,
  uniqueIndex,
  varchar,
  datetime,
  text,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const verification_tokens = mysqlTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 767 }).notNull(),
    token: varchar("token", { length: 767 }).notNull(),
    expires: datetime("expires", { mode: "date", fsp: 3 }),
  },
  (table) => {
    return {
      unique__token: uniqueIndex("unique__token").on(table.token),
    };
  }
);

export const insert__verification_tokens = createInsertSchema(
  verification_tokens,
  {
    identifier: z.string(),
    token: z.string(),
    expires: z.date(),
  }
);

export const selectUsers = createSelectSchema(verification_tokens);
