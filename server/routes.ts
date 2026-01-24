import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { emailService } from "./email";


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
      password: hashed,
      role: "customer",
      isGuest: false,
      isVerified: false
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
// GET /api/auth/verify → Verify JWT token
// -----------------------------------------
app.get("/api/auth/verify", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      const user = await storage.getUser(payload.userId);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      return res.json({
        message: "Token valid",
        user,
      });
    } catch (e) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.error("[Auth Verify Error]", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------------------
// POST /api/logout → Logout user
// -----------------------------------------
app.post("/api/logout", (req: Request, res: Response) => {
  // JWT is stateless, so logout just clears client-side
  return res.json({ message: "Logout successful" });
});

// -----------------------------------------
// POST /api/bookings → Create a booking
// -----------------------------------------
app.post("/api/bookings", async (req: Request, res: Response) => {
  console.log("[Booking Request] Received payload:", JSON.stringify(req.body, null, 2));
  
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      pickupAddress,
      serviceType,
      isExpress,
      preferredPickupDate,
      preferredPickupTime,
      notes,
      userId,
      termsAccepted,
    } = req.body;

    // Validate required fields
    if (!customerName || !customerPhone || !customerEmail || !pickupAddress || !serviceType) {
      return res.status(400).json({
        message: "Missing required booking fields",
      });
    }

    if (!termsAccepted) {
      return res.status(400).json({
        message: "You must accept the terms and conditions",
      });
    }

    // Create the booking (storage handles user creation/lookup)
    const booking = await storage.createBooking({
      customerName,
      customerPhone,
      customerEmail,
      pickupAddress,
      serviceType,
      isExpress: !!isExpress,
      preferredPickupDate,
      preferredPickupTime,
      notes: notes || "",
      status: "pending",
      paymentStatus: "pending",
      termsAccepted: true,
      userId: userId || null, // Pass null if not logged in
    } as any);

    console.log("[Booking Success] Created booking:", booking.id);

    // Send confirmation email
    try {
      await emailService.sendBookingConfirmation(booking);
      console.log("[Booking Email] Confirmation sent to:", customerEmail);
    } catch (emailErr) {
      console.error("[Booking Email Error]", emailErr);
      // Don't fail the request if email fails
    }

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    console.error("[Booking Error]", error);
    return res.status(500).json({
      message: "Failed to create booking",
      error: process.env.NODE_ENV === "development" ? error : undefined,
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
  app.get("/api/bookings", async (req: Request, res: Response) => {
    // Basic Admin Check (Middleware-like)
    // In a real app, use a proper middleware function
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate Token & Role
    try {
      const token = authHeader.split(" ")[1];
      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) throw new Error("No Secret");

      const payload = jwt.verify(token, JWT_SECRET) as any;
      const user = await storage.getUser(payload.userId);

      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Admins only" });
      }
    } catch (e) {
      return res.status(403).json({ message: "Invalid token" });
    }

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
