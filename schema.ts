import { pgTable, uuid, varchar, text, boolean, timestamp, integer } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id:              uuid('id').primaryKey().defaultRandom(),
  slug:            varchar('slug', { length: 120 }).notNull().unique(),
  title:           varchar('title', { length: 200 }).notNull(),
  description:     varchar('description', { length: 160 }).notNull(),
  longDescription: text('long_description').notNull().default(''),
  tags:            text('tags').array().notNull().default([]),
  imageUrl:        varchar('image_url', { length: 500 }),
  liveUrl:         varchar('live_url', { length: 500 }),
  githubUrl:       varchar('github_url', { length: 500 }),
  featured:        boolean('featured').notNull().default(false),
  createdAt:       timestamp('created_at').notNull().defaultNow(),
});

export const contactSubmissions = pgTable('contact_submissions', {
  id:        uuid('id').primaryKey().defaultRandom(),
  name:      varchar('name', { length: 100 }).notNull(),
  email:     varchar('email', { length: 255 }).notNull(),
  subject:   varchar('subject', { length: 200 }).notNull(),
  message:   text('message').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const resumeStats = pgTable('resume_stats', {
  id:        integer('id').primaryKey().default(1),
  count:     integer('count').notNull().default(0),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Project           = typeof projects.$inferSelect;
export type NewProject        = typeof projects.$inferInsert;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
