import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Premium Device Access Schema
export const deviceAccess = pgTable("device_access", {
  deviceId: varchar("device_id", { length: 255 }).primaryKey(),
  attemptCount: integer("attempt_count").default(0).notNull(),
  premiumUnlocked: boolean("premium_unlocked").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertDeviceAccessSchema = z.object({
  deviceId: z.string(),
  attemptCount: z.number().default(0),
  premiumUnlocked: z.boolean().default(false),
});

export type InsertDeviceAccess = z.infer<typeof insertDeviceAccessSchema>;
export type DeviceAccess = typeof deviceAccess.$inferSelect;
