import {
  mysqlTable,
  uniqueIndex,
  varchar,
  index,
  text,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { headers } from "./header";
import { footers } from "./footer";

export const nav_items = mysqlTable(
  "nav_items",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    icon: text("name").notNull(),
    href: varchar("href", { length: 500 }).notNull(),
    label: text("label").notNull(),
    parent_nav: varchar("parent_nav", { length: 12 }),
  },
  (table) => {
    return {
      unique__href: uniqueIndex("unique__href").on(table.href),
      index__id: index("index__id").on(table.id),
    };
  }
);

export const nav_item__relations = relations(nav_items, ({ many, one }) => ({
  headers: many(headers),
  footers: many(footers),
  nav_items: many(nav_items, { relationName: "nav_items" }),
  parent_nav_item: one(nav_items, {
    fields: [nav_items.parent_nav],
    references: [nav_items.id],
  }),
}));

export const insert__nav_items = createInsertSchema(nav_items, {
  id: z.string().length(12),
  icon: z.string(),
  href: z.string().url(),
  label: z.string(),
});

export const select__nav_items = createSelectSchema(nav_items);
