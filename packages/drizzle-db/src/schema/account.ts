import { mysqlTable, uniqueIndex, index, varchar, int, text } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { users } from './user';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const accounts = mysqlTable('accounts', {
  id: varchar('id', { length: 12 }).primaryKey().notNull(),
  user_id: varchar('user_id', { length: 256 }).notNull(),
  type: text('type').notNull(),
  provider: varchar('provider', { length: 256 }).notNull(),
  provider_account_id: varchar('provider_account_id', { length: 256 }).notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: int('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state')
}, (table) => {
  return {
    unique__provider__provider_account_id: uniqueIndex('unique__provider__provider_account_id').on(table.provider, table.provider_account_id),
    index__user_id: index('index__user_id').on(table.user_id),
  }
});

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.user_id],
    references: [users.id],
  })
}));

export const insertAccounts = createInsertSchema(accounts, {
  id: z.string().length(12),
  user_id: z.string().length(12),
  type: z.string(),
  provider: z.string(),
  provider_account_id: z.string(),
  refresh_token: z.string(),
  access_token: z.string(),
  expires_at: z.number(),
  token_type: z.string(),
  scope: z.string(),
  id_token: z.string(),
  session_state: z.string(),
});

export const selectAccounts = createSelectSchema(accounts);