import { mysqlTable, uniqueIndex, varchar, index, datetime, text } from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { posts } from './post';

export const categories = mysqlTable('categories', {
  id: varchar('id', { length: 12 }).primaryKey().notNull(),
  category1: varchar('category1', { length: 15 }).notNull(),
  category2: varchar('category2', { length: 15 }).notNull(),
  logo: text('logo').notNull(),
  created_on: datetime('created_on', { mode: 'date', fsp: 3 }).notNull(),
  updated_on: datetime('updated_on', { mode: 'date', fsp: 3 }).notNull(),
}, (table) => {
  return {
    unique__category: uniqueIndex('unique__category').on(table.category1, table.category2),
    index_category1: index('index_category1').on(table.category1),
    index_category2: index('index_category2').on(table.category2)
  }
});

export const category__relations = relations(categories, ({ many }) => ({
  posts: many(posts),
}))

export const insert__categories = createInsertSchema(categories, {
  id: z.string().length(12),
  category1: z.string().max(15),
  category2: z.string().max(15),
  logo: z.string().url(),
  created_on: z.date(),
  updated_on: z.date(),
});

export const select__categories = createSelectSchema(categories);