import { integer } from 'drizzle-orm/pg-core';
import {  pgTable,boolean,varchar, text, uuid } from 'drizzle-orm/pg-core';

export const locationsTable = pgTable('locations',{
  id:uuid('id').defaultRandom().primaryKey(),
  name:varchar('name',{length:100}).notNull(),
  plot: text('plot').notNull(),
})
export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  userName: text('username').notNull().unique(),
  phone:varchar('phone').notNull(),
  email: text('email').notNull().unique(),
  verified:boolean('verified').default(false),
  location_id:uuid('location_id').references(()=> locationsTable.id,{onDelete:'cascade'})
});

export const codes = pgTable('codes',{
  id: uuid('id').defaultRandom().primaryKey(),
  code: text('code').unique().notNull(),
  user_id: uuid('user_id').references(()=>usersTable.id),
  used: boolean('used').default(false),
})

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


export const categoryTable = pgTable('category',{
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name',{length:50}).notNull(),
}
)

export const productTable = pgTable('product',{
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name',{length:100}).notNull(),
  description: text('description'),
  price: varchar('price').notNull(),
  quantity: varchar('quantity'),
  category_id: uuid('category_id').references(()=>categoryTable.id),
  location_id: uuid('location_id').references(()=>locationsTable.id),
})

export const orderTable = pgTable('order',{
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id').references(()=>usersTable.id),
  product_id: uuid('product_id').references(()=>productTable.id),
  quantity: varchar('quantity'),
  total_price: varchar('total_price').notNull(),
  status: varchar('status').default('pending'),
})

export const reviesTable = pgTable('reviews',{
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id').references(()=>usersTable.id),
  product_id: uuid('product_id').references(()=>productTable.id),
  rating: integer('rating').default(0),
  comment: text('comment'),
})

export const paymentTable = pgTable('payment',{
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id').references(()=>usersTable.id),
  order_id: uuid('order_id').references(()=>orderTable.id),
  payment_method: varchar('payment_method').default('cash'),
  payment_status: varchar('payment_status').default('pending'),
  amount: varchar('amount').default('0'),
  transaction_id: varchar('transaction_id'),
})
