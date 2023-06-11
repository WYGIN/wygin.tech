import { mysqlTable, uniqueIndex, varchar, index } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { tags } from './tag';
import { users } from './user';

export const tag_followers = mysqlTable('tag_followers', {
  tag_id: varchar('tag_id', { length: 12 }),
  user_id: varchar('user_id', { length: 12 }),
}, (table) => {
  return {
    unique__tag_id__user_id: uniqueIndex('unique__publication_id__user_id').on(table.tag_id, table.user_id),
    index__tag_id: index('index__tag_id').on(table.tag_id),
    index__user_id: index('index__user_id').on(table.user_id),
  }
});

export const tag_follower__relations = relations(tag_followers, ({ one }) => ({
  tag: one(tags, {
    fields: [tag_followers.tag_id],
    references: [tags.id]
  }),
  user: one(users, {
    fields: [tag_followers.user_id],
    references: [users.id]
  }),
}))

export const insert__tag_followers = createInsertSchema(tag_followers, {
  tag_id: z.string().length(12),
  user_id: z.string().length(12),
});

export const select__tag_followers = createSelectSchema(tag_followers);