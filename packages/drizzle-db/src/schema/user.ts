import { mysqlTable, uniqueIndex, varchar, boolean, index, text } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { accounts } from './account';
import { roles, zodRoles } from './role'
import { sessions } from './session';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 12 }).primaryKey().notNull(),
  name: varchar('name', { length: 256 }),
  email: text('email'),
  email_verified: boolean('email_verified').default(false),
  image: text('image'),
  role: roles,
}, (table) => {
  return {
    unique__email: uniqueIndex('unique__email').on(table.email),
    index__id: index('index__id').on(table.id),
    index__name: index('index__name').on(table.name),
  }
});

export const user__relations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions)
}))

export const insert__users = createInsertSchema(users, {
  id: z.string().length(12),
  name: z.string().min(3),
  email: z.string().email(),
  email_verified: z.boolean(),
  image: z.string().url({ message: 'invalid image url' }),
  role: zodRoles,
});

export const select__users = createSelectSchema(users);