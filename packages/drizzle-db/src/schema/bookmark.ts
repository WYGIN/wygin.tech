import {
  mysqlTable,
  uniqueIndex,
  varchar,
  index,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { users } from "./user";
import { posts } from "./post";
import { blogs } from "./blog";

export const bookmarks = mysqlTable(
  "bookmarks",
  {
    post_id: varchar("post_id", { length: 12 }),
    blog_id: varchar("blog_id", { length: 12 }),
    user_id: varchar("user_id", { length: 12 }).notNull(),
  },
  (table) => {
    return {
      unique__post_id__blog_id__user_id: uniqueIndex(
        "unique__post_id__blog_id__user_id"
      ).on(table.post_id, table.blog_id, table.user_id),
      index__user_id: index("index__user_id").on(table.user_id),
    };
  }
);

export const bookmark__relations = relations(bookmarks, ({ one, many }) => ({
  post: one(posts, {
    fields: [bookmarks.post_id],
    references: [posts.id],
  }),
  blog: one(blogs, {
    fields: [bookmarks.blog_id],
    references: [blogs.id],
  }),
  user: one(users, {
    fields: [bookmarks.user_id],
    references: [users.id],
  }),
  followers: many(users, { relationName: "followers" }),
}));

export const insert__bookmarks = createInsertSchema(bookmarks, {
  post_id: z.string().length(12),
  blog_id: z.string().length(12),
  user_id: z.string().length(12),
});

export const select__bookmarks = createSelectSchema(bookmarks);
