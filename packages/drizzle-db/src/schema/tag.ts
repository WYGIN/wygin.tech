import {
  mysqlTable,
  uniqueIndex,
  varchar,
  index,
  datetime,
  text,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { posts } from "./post";

export const tags = mysqlTable(
  "tags",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    tag: varchar("category1", { length: 15 }).notNull(),
    logo: text("logo").notNull(),
    created_on: datetime("created_on", { mode: "date", fsp: 3 }).notNull(),
    updated_on: datetime("updated_on", { mode: "date", fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      unique__tag: uniqueIndex("unique__tag").on(table.tag),
      index_tag: index("index_tag").on(table.tag),
    };
  }
);

export const tag__relations = relations(tags, ({ many }) => ({
  posts: many(posts),
}));

export const insert__tags = createInsertSchema(tags, {
  id: z.string().length(12),
  tag: z.string().max(15),
  logo: z.string().url(),
  created_on: z.date(),
  updated_on: z.date(),
});

export const select__tags = createSelectSchema(tags);
