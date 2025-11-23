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
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("Missing JWT_SECRET environment variable");
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ message: "Login successful", token, user });
  });

  // -----------------------------------------
  // POST /api/bookings → Create a booking
  // -----------------------------------------
  app.post("/api/bookings", async (req: Request, res: Response) => {
    try {
      const {
        customerName,
        customerPhone,
        customerEmail,
        pickupAddress,
        serviceType,
        preferredPickupDate,
        preferredPickupTime,
        notes,
        userId,                   // frontend passes this
      } = req.body;

      // 1. Basic validation
      if (!customerName || !customerPhone || !pickupAddress || !serviceType) {
        return res.status(400).json({
          message: "Missing required booking fields",
        });
      }

      let finalUserId = userId;

      // 2. If userId is missing OR invalid → create a guest user
      if (!userId || !(await storage.getUser(userId))) {
        const guest = await storage.createUser({
          username: customerPhone,       // or random uuid
          password: null,                // guest has no password
          isGuest: true,
          email: customerEmail || null,
        });

        finalUserId = guest.id;
      }

      // 3. Create the booking with a guaranteed valid userId
      const booking = await storage.createBooking({
        customerName,
        customerPhone,
        customerEmail,
        pickupAddress,
        serviceType,
        preferredPickupDate,
        preferredPickupTime,
        notes: notes || "",
        status: "pending",
        paymentStatus: "pending",
        userId: finalUserId,            // <-- IMPORTANT
      });

      return res.json({
        message: "Booking created",
        booking,
      });

    } catch (error) {
      console.error("Booking creation error:", error);
      return res.status(500).json({
        message: "Failed to create booking",
      });
    }
  });

  // -----------------------------------------
  // GET /api/bookings/user/:userId → Get user bookings
  // -----------------------------------------
  app.get("/api/bookings/user/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }
    const bookings = await storage.getBookingsByUserId(userId);
    return res.json(bookings);
  });

  // -----------------------------------------
  // GET /api/bookings/:id → Get single booking
  // -----------------------------------------
  app.get("/api/bookings/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const booking = await storage.getBooking(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.json(booking);
  });

  // -----------------------------------------
  // GET /api/bookings → Get all bookings (Admin)
  // -----------------------------------------
  app.get("/api/bookings", async (_req: Request, res: Response) => {
    const bookings = await storage.getAllBookings();
    return res.json(bookings);
  });

  // -----------------------------------------
  // PATCH /api/bookings/:id/status → Update booking status
  // -----------------------------------------
  app.patch("/api/bookings/:id/status", async (req: Request, res: Response) => {
    const id = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updated = await storage.updateBookingStatus(id, status);
    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.json(updated);
  });

  return httpServer;
}
