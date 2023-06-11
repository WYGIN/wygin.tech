import { mysqlTable, uniqueIndex, varchar, index } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { categories } from './category';
import { users } from './user';

export const category_followers = mysqlTable('category_followers', {
  category_id: varchar('category_id', { length: 12 }),
  user_id: varchar('user_id', { length: 12 }),
}, (table) => {
  return {
    unique__category_id__user_id: uniqueIndex('unique__publication_id__user_id').on(table.category_id, table.user_id),
    index__category_id: index('index__category_id').on(table.category_id),
    index__user_id: index('index__user_id').on(table.user_id),
  }
});

export const category_follower__relations = relations(category_followers, ({ one }) => ({
  category: one(categories, {
    fields: [category_followers.category_id],
    references: [categories.id]
  }),
  user: one(users, {
    fields: [category_followers.user_id],
    references: [users.id]
  }),
}))

export const insert__category_followers = createInsertSchema(category_followers, {
  category_id: z.string().length(12),
  user_id: z.string().length(12),
});

export const select__category_followers = createSelectSchema(category_followers);