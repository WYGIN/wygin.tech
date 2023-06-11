import { mysqlTable, uniqueIndex, varchar, datetime, text } from 'drizzle-orm/mysql-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const verificationTokens = mysqlTable('verificationTokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: datetime('expires', { mode: 'date', fsp: 3 }),
}, (table) => {
  return {
    unique__identifier__token: uniqueIndex('unique__identifier__token').on(table.identifier, table.token),
  }
});

export const insertVerificationTokens = createInsertSchema(verificationTokens, {
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
});

export const selectUsers = createSelectSchema(verificationTokens);