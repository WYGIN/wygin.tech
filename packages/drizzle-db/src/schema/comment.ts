import { mysqlTable, varchar, index, text } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { posts } from "./post";
import { users } from "./user";

export const comments = mysqlTable(
  "comments",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    user_id: varchar("user_id", { length: 12 }).notNull(),
    comment: text("comment").notNull(),
    replied_to: varchar("replied_to", { length: 12 }),
    post_id: varchar("post_id", { length: 12 }).notNull(),
  },
  (table) => {
    return {
      index__id: index("index__id").on(table.id),
      index__user_id: index("index__user_id").on(table.user_id),
    };
  }
);

export const comment__relations = relations(comments, ({ one }) => ({
  posts: one(posts, {
    fields: [comments.post_id],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [comments.user_id],
    references: [users.id],
  }),
  commentRepliedTo: one(comments, {
    fields: [comments.replied_to],
    references: [comments.id],
  }),
}));

export const insert__comments = createInsertSchema(comments, {
  id: z.string().length(12),
  user_id: z.string().length(12),
  comment: z.string(),
  replied_to: z.string().length(12),
  post_id: z.string().length(12),
});

export const select__comments = createSelectSchema(comments);
