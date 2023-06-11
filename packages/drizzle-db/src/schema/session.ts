import { mysqlTable, uniqueIndex, varchar, text, index, datetime } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { users } from './user';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const sessions = mysqlTable('sessions', {
  id: varchar('id', { length: 12 }).primaryKey().notNull(),
  session_token: text('session_token').notNull(),
  user_id: text('user_id').notNull(),
  expires: datetime('expires', { mode: 'date', fsp: 3 }).notNull(),
}, (table) => {
  return {
    unique__session_token: uniqueIndex('unique__session_token').on(table.session_token),
    index__id: index('index__id').on(table.id),
    index__user_id: index('index__user_id').on(table.user_id),
  }
});

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.user_id],
    references: [users.id],
  }),
}));

export const insertSessions = createInsertSchema(sessions, {
  id: z.string().length(12),
  session_token: z.string(),
  user_id: z.string().length(12),
  expires: z.date(),
});

export const selectSessions = createSelectSchema(sessions);