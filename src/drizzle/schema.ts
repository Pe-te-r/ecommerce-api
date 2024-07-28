import { relations } from 'drizzle-orm';
import {  pgTable,integer,serial,boolean,varchar, text, uuid } from 'drizzle-orm/pg-core';

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

export const codesTable = pgTable('codes',{
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

export const reviewsTable = pgTable('reviews',{
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


// relationships
export const locationsRelationship = relations(locationsTable,({many})=>({
  users: many(usersTable),
  products: many(productTable),
}))

export const usersRelationship = relations(usersTable,({one,many})=>({
  codes: many(codesTable),
  password: one(passwordTable,{
    fields: [usersTable.id],
    references:[passwordTable.id]
  }) ,
  profile: one(profileTable,{
    fields: [usersTable.id],
    references:[profileTable.id]
  }),
  orders: many(orderTable),
  location:one(locationsTable,{
    fields: [usersTable.location_id],
    references:[locationsTable.id]
  }),
  products: many(productTable),
  reviews: many(reviewsTable),
  payments: many(paymentTable),
}))

export const codesRelationship = relations(codesTable,({one})=>({
  users: one(usersTable,{
    fields: [codesTable.user_id],
    references:[usersTable.id]
  }),
}))

export const passwordRelationship = relations(passwordTable,({one})=>({
  users: one(usersTable),
}))

export const profileRelationship = relations(profileTable,({one})=>({
  users: one(usersTable),
}))

export const categoryRelationship = relations(categoryTable,({many})=>({
  products: many(productTable),
}))

export const productRelationship = relations(productTable,({one, many})=>({
  category: one(categoryTable,{
    fields: [productTable.category_id],
    references:[categoryTable.id]
  }),
  location: one(locationsTable,{
    fields: [productTable.location_id],
    references:[locationsTable.id]
  }),
  orders: many(orderTable),
  reviews: many(reviewsTable),
}))

export const orderRelationship = relations(orderTable,({one, many})=>({
  user: one(usersTable,{
    fields: [orderTable.user_id],
    references:[usersTable.id]
  }),
  product: one(productTable,{
    fields: [orderTable.product_id],
    references:[productTable.id]
  }),
  payments: many(paymentTable),
}))

export const reviewsRelationship = relations(reviewsTable,({one})=>({
  user: one(usersTable,{
    fields: [reviewsTable.user_id],
    references:[usersTable.id]
  }),
  product: one(productTable,{
    fields: [reviewsTable.product_id],
    references:[productTable.id]
  }),
}))

export const paymentRelationship = relations(paymentTable,({one})=>({
  user: one(usersTable,{
    fields: [paymentTable.user_id],
    references:[usersTable.id]
  }),
  order: one(orderTable,{
    fields: [paymentTable.order_id],
    references:[orderTable.id]
  }),
}))

// types
export type locationInsertT = typeof locationsTable.$inferInsert
export type locationSelectT = typeof locationsTable.$inferSelect

export type usersInsertT = typeof usersTable.$inferInsert
export type usersSelectT = typeof usersTable.$inferSelect

export type codesInsertT = typeof codesTable.$inferInsert
export type codesSelectT = typeof codesTable.$inferSelect

export type passwordInsertT = typeof passwordTable.$inferInsert
export type passwordSelectT = typeof passwordTable.$inferSelect

export type profileInsertT = typeof profileTable.$inferInsert
export type profileSelectT = typeof profileTable.$inferSelect

export type categoryInsertT = typeof categoryTable.$inferInsert
export type categorySelectT = typeof categoryTable.$inferSelect

export type productInsertT = typeof productTable.$inferInsert
export type productSelectT = typeof productTable.$inferSelect

export type orderInsertT = typeof orderTable.$inferInsert
export type orderSelectT = typeof orderTable.$inferSelect

export type reviewsInsertT = typeof reviewsTable.$inferInsert
export type reviewsSelectT = typeof reviewsTable.$inferSelect

export type paymentInsertT = typeof paymentTable.$inferInsert
export type paymentSelectT = typeof paymentTable.$inferSelect