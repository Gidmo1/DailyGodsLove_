import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  isPublished: boolean("is_published").default(true),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bibleVerses = pgTable("bible_verses", {
  id: serial("id").primaryKey(),
  book: text("book").notNull(),
  chapter: text("chapter").notNull(),
  verse: text("verse").notNull(),
  text: text("text").notNull(),
  teaching: text("teaching").notNull(),
  dayOfYear: text("day_of_year").notNull().unique(), // e.g. "2026-01-27"
});

export const insertPostSchema = createInsertSchema(posts).omit({ 
  id: true,
  publishedAt: true 
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  createdAt: true
});

export const insertBibleVerseSchema = createInsertSchema(bibleVerses).omit({
  id: true,
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type BibleVerse = typeof bibleVerses.$inferSelect;
export type InsertBibleVerse = z.infer<typeof insertBibleVerseSchema>;
