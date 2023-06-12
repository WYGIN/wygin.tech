import { mysqlTable, uniqueIndex, varchar, datetime, text } from 'drizzle-orm/mysql-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const verificationTokens = mysqlTable('verificationTokens', {
  identifier: varchar('identifier', { length: 767 }).notNull(),
  token: varchar('token', { length: 767 }).notNull(),
  expires: datetime('expires', { mode: 'date', fsp: 3 }),
}, (table) => {
  return {
    unique__token: uniqueIndex('unique__token').on(table.token),
  }
});

export const insertVerificationTokens = createInsertSchema(verificationTokens, {
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
});

export const selectUsers = createSelectSchema(verificationTokens);