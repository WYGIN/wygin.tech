import {
  mysqlTable,
  uniqueIndex,
  varchar,
  index,
  text,
  boolean,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { posts } from "./post";
import { blogs } from "./blog";
import { pages } from "./page";
import { nav_items } from "./navItem";

export const footers = mysqlTable(
  "footers",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    logo: text("logo").notNull().default("https://wygin.tech/wygin.svg"),
    show_social_icons: boolean("show_social_icons").notNull().default(true),
  },
  (table) => {
    return {
      // unique__logo__show_social_icons: uniqueIndex('unique__logo__show_social_icons').on(table.logo, table.show_social_icons),
      index__id: index("index__id").on(table.id),
    };
  }
);

export const footer__relations = relations(footers, ({ many }) => ({
  posts: many(posts),
  blogs: many(blogs),
  pages: many(pages),
  nav_items: many(nav_items),
}));

export const insert__footers = createInsertSchema(footers, {
  id: z.string().length(12),
  logo: z.string().url(),
  show_social_icons: z.boolean(),
});

export const select__footers = createSelectSchema(footers);
