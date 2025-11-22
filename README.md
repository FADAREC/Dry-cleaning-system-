# Dry Cleaning Platform MVP

## 1. Technology Stack (Modern, Fast, and Production-Ready)

### Frontend
*   **React + Vite** for a fast, app-like experience.
*   **TailwindCSS** for a clean, responsive UI.
*   **Shadcn UI** for premium components (cards, forms, timelines).
*   **React Query** for caching + real-time smart updates.

### Backend
*   **Node.js + Express** — lightweight, fast, perfect for MVP APIs.
*   **Drizzle ORM** — type-safe SQL for reliability and stability.
*   **PostgreSQL (Neon Serverless)** — scalable, low-latency database.

### Deployment
*   **Full-stack deployed on Render** (Backend serves both API + static frontend).
*   Everything stays low cost, simple to maintain, and easy to extend later.

---

## 2. Customer Experience (The Public Flow)

### 🌐 Landing Page (`/`)
A professional, modern brochure page containing:
*   Hero section with headline + call to action
*   Why-choose-us section
*   Services overview
*   Pricing preview
*   Testimonials
*   "Schedule a Pickup" form (The main CTA for driving conversions)

### 🧺 Booking Engine (The Core Feature)
When the visitor fills out the pickup form:
1.  They enter: Name, Phone, Service type, Pickup address, Pickup date/time.
2.  The frontend sends this to `POST /api/bookings`.
3.  The backend:
    *   Validates input.
    *   Creates the booking record in PostgreSQL.
    *   Auto-generates a lightweight “guest account” (no login required).
4.  User is redirected to `/tracking/:bookingId`.

### 📦 Order Tracking Page (`/tracking/:id`)
A real-time order tracking page showing:
*   **Order Placed → Confirmed → Pickup → Cleaning → Ready → Delivered**
*   Updates automatically via React Query.
*   No refresh needed.
*   Feels like a premium logistics app.

### 👤 Customer Dashboard (`/dashboard`)
If the customer returns later:
*   They see all active orders.
*   History of old orders.
*   Status updates in real time.

---

## 3. Admin Experience (Internal Workflow)

### 🔑 Admin Entry
*   Visible as “Admin” link in footer.

### 📊 Admin Dashboard (`/admin`)
This is the command center showing all bookings in a paginated list/card view with:
*   Customer name & Phone
*   Service type
*   Address
*   Current status

### ⚙ Operations Panel
Each order contains a **Status dropdown**. When admin updates a status, the customer sees the update instantly.

---

## 4. Data Flow Summary

### Frontend → Backend
Frontend sends JSON to the backend via REST.

### Backend → Database
Drizzle ORM writes/reads from PostgreSQL with strict types.

### Frontend Auto-Refresh
React Query revalidates every few seconds (or via invalidation on status update). You get “live updates” behavior with zero complexity.

---

## 🌟 Optional MVP Add-ons
*   WhatsApp “Chat Now” floating button
*   Automated SMS/Email after booking
*   Basic login for customers
*   Receipt PDF
*   Admin export (CSV)
