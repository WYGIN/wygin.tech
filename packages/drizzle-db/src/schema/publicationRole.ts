import { mysqlTable, uniqueIndex, varchar, index } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { roles, zodRoles } from './role';
import { publications } from './publication';
import { users } from './user';

export const publication_roles = mysqlTable('publication_roles', {
  publication_id: varchar('publication_id', { length: 12 }).notNull(),
  user_id: varchar('user_id', { length: 12 }).notNull(),
  role: roles,
}, (table) => {
  return {
    unique__publication_id__user_id: uniqueIndex('unique__publication_id__user_id').on(table.publication_id, table.user_id),
    index__user_id: index('index__user_id').on(table.user_id),
    index__publication_id: index('index__publication_id').on(table.publication_id),
  }
});

export const publication_role__relations = relations(publication_roles, ({ one }) => ({
  publication: one(publications, {
    fields: [publication_roles.publication_id],
    references: [publications.id]
  }),
  user: one(users, {
    fields: [publication_roles.user_id],
    references: [users.id]
  })
}))

export const insert__publication_roles = createInsertSchema(publication_roles, {
  publication_id: z.string().length(12),
  user_id: z.string().length(12),
  role: zodRoles,
});

export const select__publication_roles = createSelectSchema(publication_roles);