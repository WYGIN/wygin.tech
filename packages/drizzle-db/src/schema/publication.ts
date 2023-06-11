import { mysqlTable, uniqueIndex, varchar, index, text, datetime } from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { posts } from './post';
import { pages } from './page';
import { blogs } from './blog';
import { users } from './user';

export const publications = mysqlTable('publications', {
  id: varchar('id', { length: 12 }).primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description'),
  owner_id: varchar('owner_id', { length: 12 }).notNull(),
  logo: text('logo').notNull(),
  created_on: datetime('created_on', { mode: 'date', fsp: 3 }).default(sql`CURRENT_DATE()`).notNull(),
  updated_on: datetime('updated_on', { mode: 'date', fsp: 3 }).notNull().default(sql`NOW()`),
}, (table) => {
  return {
    unique__name: uniqueIndex('unique__name').on(table.name),
    index__id: index('index__id').on(table.id),
    index__name: index('index__name').on(table.name),
  }
});

export const user__relations = relations(publications, ({ many, one }) => ({
  posts: many(posts),
  pages: many(pages),
  blogs: many(blogs),
  owner: one(users, {
    fields: [publications.owner_id],
    references: [users.id]
  })
}))

export const insert__publications = createInsertSchema(publications, {
  id: z.string().length(12),
  name: z.string().min(3),
  description: z.string(),
  owner_id: z.string().length(12),
  logo: z.string().url({ message: 'invalid logo url' }),
  created_on: z.date(),
  updated_on: z.date(),
});

export const select__publications = createSelectSchema(publications);