import {
  mysqlTable,
  uniqueIndex,
  varchar,
  int,
  text,
  index,
  datetime,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { users } from "./user";
import { categories } from "./category";
import { headers } from "./header";
import { footers } from "./footer";
import { publications } from "./publication";
import { status, zodStatus } from "./status";
import { comments } from "./comment";
import { tags } from "./tag";
import { bookmarks } from "./bookmark";

export const posts = mysqlTable(
  "posts",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    vc_id: varchar("vc_id", { length: 12 }).notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description").notNull(),
    slug: varchar("slug", { length: 191 }).notNull(),
    featured_image: text("featured_image").notNull(),
    status: status,
    author_id: varchar("author_id", { length: 12 }).notNull(),
    contributor_id: varchar("contributor_id", { length: 12 }),
    created_on: datetime("created_on", { mode: "date", fsp: 3 }).notNull(),
    schema: text("schema").notNull(),
    updated_on: datetime("updated_on", { mode: "date", fsp: 3 }).notNull(),
    category_id: varchar("category_id", { length: 12 }).notNull(),
    body: text("body").notNull(),
    header_id: varchar("header_id", { length: 12 }).notNull(),
    footer_id: varchar("footer_id", { length: 12 }).notNull(),
    likes: int("likes").notNull(),
    disLikes: int("disLikes").notNull(),
    publication_id: varchar("publication_id", { length: 12 }).notNull(),
  },
  (table) => {
    return {
      unique__slug__category_id: uniqueIndex("unique__slug__category_id").on(
        table.slug,
        table.category_id
      ),
      unique_title: uniqueIndex("unique_title").on(table.title),
      //  unique_description: uniqueIndex('unique_description').on(table.description),
      index__id: index("index__id").on(table.id),
      index__title: index("index__title").on(table.title),
      index__slug__category_id: index("index__slug__category_id").on(
        table.slug,
        table.category_id
      ),
    };
  }
);

export const post__relations = relations(posts, ({ many, one }) => ({
  contributors: many(users),
  tags: many(tags),
  comments: many(comments),
  author: one(users, {
    fields: [posts.author_id],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [posts.category_id],
    references: [categories.id],
  }),
  header: one(headers, {
    fields: [posts.header_id],
    references: [headers.id],
  }),
  footer: one(footers, {
    fields: [posts.footer_id],
    references: [footers.id],
  }),
  publication: one(publications, {
    fields: [posts.publication_id],
    references: [publications.id],
  }),
  bookmarks: many(bookmarks),
}));

export const insert__posts = createInsertSchema(posts, {
  id: z.string().length(12),
  vc_id: z.string().length(12),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  featured_image: z.string().url(),
  status: zodStatus,
  author_id: z.string().length(12),
  contributor_id: z.string().length(12),
  created_on: z.date(),
  schema: z.string(),
  updated_on: z.date(),
  category_id: z.string().length(12),
  body: z.string(),
  header_id: z.string().length(12),
  footer_id: z.string().length(12),
  likes: z.number(),
  disLikes: z.number(),
  publication_id: z.string().length(12),
});

export const select__posts = createSelectSchema(posts);
