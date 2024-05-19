import { randomUUID } from "crypto";
import { sql } from "drizzle-orm";
import { sqliteTable,text,integer  } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
  id: text('id',{ length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  title: text('title'),
  done: integer('done', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});