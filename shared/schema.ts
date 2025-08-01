import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  photoURL: text("photo_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quranProgress = pgTable("quran_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  surah: integer("surah").notNull(),
  ayah: integer("ayah").notNull(),
  hizb: integer("hizb").notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const hadithProgress = pgTable("hadith_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  hadithId: varchar("hadith_id").notNull(),
  hadithText: text("hadith_text").notNull(),
  source: text("source").notNull(),
  markedAsRead: boolean("marked_as_read").default(false),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const friendships = pgTable("friendships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  followerId: varchar("follower_id").notNull().references(() => users.id),
  followingId: varchar("following_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull().references(() => users.id),
  receiverId: varchar("receiver_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  readAt: timestamp("read_at"),
});

export const userActivity = pgTable("user_activity", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  activityType: text("activity_type").notNull(), // 'quran_read', 'hadith_read'
  date: timestamp("date").defaultNow(),
  metadata: jsonb("metadata"), // Additional activity data
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertQuranProgressSchema = createInsertSchema(quranProgress).omit({
  id: true,
  completedAt: true,
});

export const insertHadithProgressSchema = createInsertSchema(hadithProgress).omit({
  id: true,
  createdAt: true,
});

export const insertFriendshipSchema = createInsertSchema(friendships).omit({
  id: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const insertUserActivitySchema = createInsertSchema(userActivity).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertQuranProgress = z.infer<typeof insertQuranProgressSchema>;
export type QuranProgress = typeof quranProgress.$inferSelect;
export type InsertHadithProgress = z.infer<typeof insertHadithProgressSchema>;
export type HadithProgress = typeof hadithProgress.$inferSelect;
export type InsertFriendship = z.infer<typeof insertFriendshipSchema>;
export type Friendship = typeof friendships.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertUserActivity = z.infer<typeof insertUserActivitySchema>;
export type UserActivity = typeof userActivity.$inferSelect;
