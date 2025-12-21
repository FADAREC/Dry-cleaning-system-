import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ===================================
// USERS TABLE (Enhanced with Roles)
// ===================================
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  phone: text("phone"),
  role: text("role").notNull().default("customer"), // 'customer', 'admin', 'guest'
  isGuest: boolean("is_guest").notNull().default(false),
  isVerified: boolean("is_verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  lastLogin: timestamp("last_login"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  lastLogin: true,
}).extend({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  role: z.enum(["customer", "admin", "guest"]).default("customer"),
  isGuest: z.boolean().default(false),
  isVerified: z.boolean().default(false),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ===================================
// BOOKINGS/ORDERS TABLE
// ===================================
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  orderNumber: varchar("order_number").notNull().unique(), // e.g., "CB-2024-0001"
  
  // Customer Info
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  
  // Address Details
  pickupAddress: text("pickup_address").notNull(),
  pickupCoordinates: json("pickup_coordinates").$type<{ lat: number, lng: number }>(),
  deliveryAddress: text("delivery_address"),
  deliveryCoordinates: json("delivery_coordinates").$type<{ lat: number, lng: number }>(),
  
  // Service Details
  serviceType: text("service_type").notNull(), // 'laundry', 'dry-cleaning', 'express', etc.
  isExpress: boolean("is_express").notNull().default(false),
  preferredPickupDate: text("preferred_pickup_date"),
  preferredPickupTime: text("preferred_pickup_time"),
  
  // Items & Pricing
  items: json("items").$type<Array<{
    garmentType: string;
    quantity: number;
    pricePerItem: number;
  }>>(),
  totalItems: decimal("total_items", { precision: 10, scale: 0 }),
  estimatedPrice: decimal("estimated_price", { precision: 10, scale: 2 }),
  finalPrice: decimal("final_price", { precision: 10, scale: 2 }),
  
  // Payment
  paymentStatus: text("payment_status").notNull().default("pending"), // 'pending', 'paid', 'failed'
  paymentMethod: text("payment_method"), // 'transfer', 'card', 'cash'
  
  // Order Status
  status: text("status").notNull().default("pending"), // See status enum below
  
  // Additional Info
  notes: text("notes"),
  termsAccepted: boolean("terms_accepted").notNull().default(false),
  
  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  pickedUpAt: timestamp("picked_up_at"),
  completedAt: timestamp("completed_at"),
  deliveredAt: timestamp("delivered_at"),
});

/**
 * Order Status Flow:
 * 1. pending        → Order placed, awaiting confirmation
 * 2. confirmed      → Order confirmed, awaiting pickup
 * 3. picked_up      → Items collected from customer
 * 4. in_progress    → Currently being cleaned
 * 5. ready          → Cleaning complete, ready for delivery
 * 6. out_for_delivery → On the way to customer
 * 7. delivered      → Order completed
 * 8. cancelled      → Order cancelled
 */

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  orderNumber: true,
  createdAt: true,
  updatedAt: true,
  pickedUpAt: true,
  completedAt: true,
  deliveredAt: true,
}).extend({
  customerName: z.string().min(2, "Name is required"),
  customerPhone: z.string().min(10, "Valid phone number required"),
  customerEmail: z.string().email().optional().or(z.literal("")),
  pickupAddress: z.string().min(5, "Pickup address is required"),
  serviceType: z.string().min(1, "Service type is required"),
  isExpress: z.boolean().default(false),
  status: z.enum([
    "pending",
    "confirmed", 
    "picked_up",
    "in_progress",
    "ready",
    "out_for_delivery",
    "delivered",
    "cancelled"
  ]).default("pending"),
  paymentStatus: z.enum(["pending", "paid", "failed"]).default("pending"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// ===================================
// GARMENT PRICING TABLE (For reference)
// ===================================
export const garmentPricing = pgTable("garment_pricing", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  garmentType: text("garment_type").notNull().unique(), // 'shirt', 'trouser', 'agbada', etc.
  category: text("category").notNull(), // 'standard', 'premium', 'special'
  laundryPrice: decimal("laundry_price", { precision: 10, scale: 2 }),
  dryCleanPrice: decimal("dry_clean_price", { precision: 10, scale: 2 }),
  ironingPrice: decimal("ironing_price", { precision: 10, scale: 2 }),
  expressMultiplier: decimal("express_multiplier", { precision: 3, scale: 1 }).default("4.0"), // 4x for express
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type GarmentPricing = typeof garmentPricing.$inferSelect;
