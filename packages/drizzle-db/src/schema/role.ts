import { mysqlEnum } from "drizzle-orm/mysql-core";
import { z } from 'zod';

export const roles = mysqlEnum('role', ['user', 'editor', 'contributor', 'sponser', 'admin', 'owner']).notNull().default('user');
export const zodRoles = z.enum(['user', 'editor', 'contributor', 'sponser', 'admin', 'owner']);