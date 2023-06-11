import { varchar, mysqlTable, uniqueIndex, index } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { users } from './user';

export const user_follows = mysqlTable('user_follows', {
  follower_id: varchar('follower_id', { length: 12 }).notNull(),
  following_id: varchar('following_id', { length: 12 }).notNull(),
}, (table) => {
  return {
    unique__follower_id__following_id: uniqueIndex('unique__follower_id__following_id').on(table.follower_id, table.following_id),
    index__follower_id: index('index__follower_id').on(table.follower_id),
    index__following_id: index('index__following_id').on(table.following_id),
  }
});

const user_follows__relations = relations(user_follows, ({ one }) => ({
  follower: one(users, {
    fields: [user_follows.follower_id],
    references: [users.id]
  }),
  following: one(users, {
    fields: [user_follows.following_id],
    references: [users.id],
  })
}));

export const insert__user_follows = createInsertSchema(user_follows, {
  follower_id: z.string().length(12),
  following_id: z.string().length(12),
});

export const select__userfollows = createSelectSchema(user_follows);