import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json, decimal, boolean } from "drizzle-orm/pg-core";
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

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id), // Link to user
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  pickupAddress: text("pickup_address").notNull(),
  pickupCoordinates: json("pickup_coordinates").$type<{lat: number, lng: number}>(),
  deliveryAddress: text("delivery_address"),
  deliveryCoordinates: json("delivery_coordinates").$type<{lat: number, lng: number}>(),
  serviceType: text("service_type").notNull(),
  preferredPickupDate: text("preferred_pickup_date"),
  preferredPickupTime: text("preferred_pickup_time"),
  useWeightPricing: boolean("use_weight_pricing").notNull().default(false),
  totalKg: decimal("total_kg", { precision: 10, scale: 2 }),
  items: json("items").$type<Record<string, number>>(),
  estimatedPrice: decimal("estimated_price", { precision: 10, scale: 2 }),
  finalPrice: decimal("final_price", { precision: 10, scale: 2 }),
  paymentStatus: text("payment_status").notNull().default("pending"), // pending, paid, failed
  status: text("status").notNull().default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  customerEmail: z.string().email().optional().or(z.literal("")),
  pickupAddress: z.string().min(5, "Pickup address is required"),
  serviceType: z.string().min(1, "Service type is required"),
  useWeightPricing: z.boolean(),
  totalKg: z.string().optional(),
  items: z.record(z.number()).optional(),
  status: z.enum(["pending", "confirmed", "picked_up", "in_progress", "ready", "delivered", "cancelled"]).default("pending"),
  paymentStatus: z.enum(["pending", "paid", "failed"]).default("pending"),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
