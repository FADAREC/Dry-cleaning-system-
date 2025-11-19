import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // -----------------------------------------
  // POST /api/register  →  Create new user
  // -----------------------------------------
  app.post("/api/register", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing username or password" });
    }

    // check if user exists
    const existing = await storage.getUserByUsername(username);
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // create user
    const user = await storage.createUser({
      username,
      password: hashed
    });

    return res.json({
      message: "User registered successfully",
      user
    });
  });

  // -----------------------------------------
  // POST /api/login → Authenticate user
  // -----------------------------------------
  app.post("/api/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await storage.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // sign a JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.json({ message: "Login successful", token, user });
  });

  // -----------------------------------------
  // POST /api/bookings → Create a booking
  // -----------------------------------------
  app.post("/api/bookings", async (req: Request, res: Response) => {
    const { userId, serviceType, pickupAddress, pickupTime } = req.body;

    if (!userId || !serviceType || !pickupAddress || !pickupTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const booking = await storage.createBooking({
      userId,
      serviceType,
      pickupAddress,
      pickupTime: new Date(pickupTime),
      status: "pending"
    });

    res.json({
      message: "Booking created",
      booking
    });
  });

  // -----------------------------------------
  // GET /api/bookings → Get all bookings
  // -----------------------------------------
  app.get("/api/bookings", async (_req: Request, res: Response) => {
    const bookings = await storage.getAllBookings();
    return res.json(bookings);
  });

  return httpServer;
}
