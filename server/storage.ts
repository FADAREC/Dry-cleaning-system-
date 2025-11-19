import { type User, type InsertUser, type Booking, type InsertBooking, bookings } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: string): Promise<Booking | undefined>;
  getAllBookings(): Promise<Booking[]>;
  getBookingsByUserId(userId: string): Promise<Booking[]>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const users = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });
    return users;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username),
    });
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { users } = await import("@shared/schema");
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(insertBooking as any).returning();
    return booking;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const booking = await db.query.bookings.findFirst({
      where: (bookings, { eq }) => eq(bookings.id, id),
    });
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    const allBookings = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
    return allBookings;
  }

  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    const userBookings = await db.query.bookings.findMany({
      where: (bookings, { eq }) => eq(bookings.userId, userId),
      orderBy: (bookings, { desc }) => [desc(bookings.createdAt)],
    });
    return userBookings;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const [updated] = await db
      .update(bookings)
      .set({ status, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DbStorage();
