import {  pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  userName: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
});

export const passwordTable= pgTable('password',{
    id: uuid('user_id').references(()=>usersTable.id,{onDelete: 'cascade'}),
    password: text('password').notNull(),
})

export const profileTable = pgTable('profile',{
    id: uuid('user_id').references(()=>usersTable.id,{onDelete: 'cascade'}),
    bio: text('bio'),
    location: text('location'),
    website: text('website'),
    socialMedia: text('social_media'),
})