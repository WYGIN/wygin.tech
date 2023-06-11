import { mysqlTable, uniqueIndex, varchar, index, text, boolean } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { posts } from './post';
import { blogs } from './blog';
import { pages } from './page';
import { nav_items } from './navItems'; 

export const headers = mysqlTable('headers', {
  id: varchar('id', { length: 12 }).primaryKey().notNull(),
  logo: text('logo').notNull().default('https://wygin.tech/wygin.svg'),
  show_theme_toggle: boolean('show_theme_toggle').notNull().default(true),
  show_search_icon: boolean('show_search_icon').default(true).notNull(),
}, (table) => {
  return {
    unique__logo__show_theme_toggle__show_search_icon: uniqueIndex('unique__logo__show_theme_toggle__show_search_icon').on(table.logo, table.show_theme_toggle, table.show_search_icon),
    index__id: index('index__id').on(table.id),
  }
});

export const header__relations = relations(headers, ({ many }) => ({
  posts: many(posts),
  blogs: many(blogs),
  pages: many(pages),
  nav_items: many(nav_items),
}))

export const insert__headers = createInsertSchema(headers, {
  id: z.string().length(12),
  logo: z.string().url(),
  show_theme_toggle: z.boolean(),
  show_search_icon: z.boolean(),
});

export const select__headers = createSelectSchema(headers);