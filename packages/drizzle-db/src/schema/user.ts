import { mysqlTable, uniqueIndex, varchar, boolean, index, text } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { accounts } from './account';
import { roles, zodRoles } from './role'
import { sessions } from './session';
import { user_follows } from './userFollower';
import { tag_followers } from './tagFollower';
import { publications } from './publication';
import { bookmarks } from './bookmark';
import { categories } from './category';
import { comments } from './comment';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 12 }).primaryKey().notNull(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 512 }),
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
  sessions: many(sessions),
  following_users: many(user_follows, { relationName: 'following_tags' }),
  follower_user: many(user_follows, { relationName: 'follower_users' }),
  following_tags: many(tag_followers),
  following_publications: many(publications),
  bookmarks: many(bookmarks),
  comments: many(comments),
  following_categories: many(categories),
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