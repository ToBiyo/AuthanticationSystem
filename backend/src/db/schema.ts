import { pgTable, uuid, varchar, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("Users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  isVerified: boolean("is_verified").default(false),
});
