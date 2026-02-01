import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

import { storage } from "./storage";
import { emailService, initializeEmailService } from "./email";
import { authenticate } from "./auth.middleware";
import { authorize } from "./authorize.middleware";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  initializeEmailService();

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: "Too many login attempts, try later" },
  });

  // ---------------- 
  //REGISTERATION ENDPOINT
  //-----------------
  app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;

    const existing = await storage.getUserByUsername(username);
    if (existing) return res.status(409).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await storage.createUser({
      username,
      password: hashed,
      role: "customer",
      isGuest: false,
      isVerified: false,
    });

    res.json(user);
  });

  // ---------------- LOGIN ----------------
  app.post("/api/login", loginLimiter, async (req, res) => {
    const { username, password } = req.body;

    const user = await storage.getUserByUsername(username);
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  });

  // ---------------- VERIFY TOKEN ----------------
  app.get("/api/auth/verify", authenticate, (req, res) => {
    res.json({ user: (req as any).user });
  });

  // ---------------- CREATE BOOKING ----------------
  app.post("/api/bookings", async (req, res) => {
    const booking = await storage.createBooking(req.body);
    await emailService.sendBookingConfirmation(booking);
    res.status(201).json(booking);
  });

  // ---------------- GET USER BOOKINGS ----------------
  app.get(
    "/api/bookings/user/:userId",
    authenticate,
    async (req, res) => {
      const bookings = await storage.getBookingsByUserId(req.params.userId);
      res.json(bookings);
    }
  );

  // ---------------- ADMIN: GET ALL BOOKINGS ----------------
  app.get(
    "/api/bookings",
    authenticate,
    authorize("admin"),
    async (req, res) => {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    }
  );

  // ---------------- ADMIN: UPDATE BOOKING STATUS ----------------
  app.patch(
    "/api/bookings/:id/status",
    authenticate,
    authorize("admin"),
    async (req, res) => {
      const updated = await storage.updateBookingStatus(
        req.params.id,
        req.body.status
      );

      await emailService.sendStatusUpdate(updated, "");
      res.json(updated);
    }
  );

  // ---------------- SUPER ADMIN: CREATE ADMIN ----------------
  app.post(
    "/api/admin/register",
    authenticate,
    authorize("super_admin"),
    async (req, res) => {
      const { username, password, email } = req.body;

      const hashed = await bcrypt.hash(password, 10);

      const admin = await storage.createUser({
        username,
        password: hashed,
        email,
        role: "admin",
        isGuest: false,
        isVerified: true,
      });

      res.json(admin);
    }
  );

  return httpServer;
}
