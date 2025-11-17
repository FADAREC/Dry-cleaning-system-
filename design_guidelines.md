# Design Guidelines: Grant Laundry & Dry Cleaning Template

## Design Approach
**Hybrid System**: Material Design foundation with service industry best practices from Taskrabbit and Thumbtack. Prioritize trust, clarity, and mobile conversion while maintaining flexibility for diverse business types.

## Typography System
- **Headings**: Inter (700) for section titles, (600) for subsections
  - H1: text-4xl md:text-5xl lg:text-6xl
  - H2: text-3xl md:text-4xl
  - H3: text-xl md:text-2xl
- **Body**: Inter (400) for body text, (500) for emphasis
  - Base: text-base md:text-lg
  - Small: text-sm

## Layout & Spacing
**Spacing System**: Use Tailwind units 4, 6, 8, 12, 16, 20
- Section padding: py-16 md:py-20 lg:py-24
- Container: max-w-7xl mx-auto px-4 md:px-6
- Component gaps: gap-8 md:gap-12
- Card padding: p-6 md:p-8

## Hero Section
- **Layout**: Full-width background with centered content overlay, 85vh height
- **Image**: Large hero image showing clean, professional laundry facility or happy customers receiving service
- **Content**: Centered text with blurred-background CTA buttons (primary + secondary action like "View Services")
- **Elements**: Business name, compelling tagline, trust indicator (e.g., "Serving Lagos for 10+ Years"), dual CTAs

## Core Sections Architecture

**Services Section**
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Card design: Border with subtle shadow on hover, icon at top, title, description, optional price tag
- Include service icons from Heroicons (Sparkles, Shirt, Clock, etc.)

**Pricing Section**
- Three-tier card layout with featured/popular tier elevated
- Include: Service name, price, features list, CTA button per tier
- Visual hierarchy through card size and subtle scaling

**How It Works**
- Horizontal step cards on desktop (4 steps), vertical stack on mobile
- Numbered steps with icons, brief descriptions
- Visual connection: Subtle line/arrow connecting steps on desktop

**Testimonials**
- Carousel or grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Include: Customer photo placeholder, quote, name, service used
- Star ratings with visual stars (not just text)

**Optional Sections** (configurable via sections.ts):
- **Gallery**: Masonry grid (2-3 columns) showing facility, equipment, before/after
- **FAQ**: Accordion pattern, single column, max-w-3xl centered
- **About/Story**: Two-column split (image left, text right), max-w-5xl
- **Team**: Grid of team member cards with photos, names, roles
- **Promo Banner**: Sticky top banner (dismissible) with limited-time offer

## Booking/Contact Form
- Two-column layout on desktop: Form left (60%), Contact info right (40%)
- Form fields: Name, Phone, Email, Service dropdown, Pickup date/time, Special instructions
- WhatsApp quick action button with recognizable icon
- Contact info includes: Phone with click-to-call, WhatsApp, Hours, Location with map placeholder

## Footer
- Multi-column layout: Brand/Tagline (30%), Quick Links (25%), Services (25%), Contact (20%)
- Social media icon row
- Bottom bar: Copyright, Privacy Policy, Terms
- Map embed placeholder or location image

## Component Patterns
- **Buttons**: Rounded (rounded-lg), primary filled, secondary outlined, all with consistent padding (px-6 py-3)
- **Cards**: Subtle borders (border), rounded (rounded-xl), shadow on hover (hover:shadow-lg transition)
- **Icons**: Heroicons via CDN, consistent sizing (w-6 h-6 for inline, w-12 h-12 for feature icons)
- **Forms**: Clean inputs with labels, rounded-md, border-2 on focus, error states in red

## Animation Principles
- **Entrance animations**: Fade-in with slight Y translation (Framer Motion) on scroll
- **Hover states**: Subtle scale (scale-105) and shadow changes
- **Transitions**: Use duration-300 for consistency
- **Minimize**: No distracting continuous animations

## Images Strategy
- **Hero**: Professional service delivery or facility shot
- **Gallery section**: Before/after, facility photos, team at work
- **Testimonials**: Customer headshot placeholders (use service like UI Faces)
- **About section**: Team or founder image
- Use optimized Next.js Image component throughout

## Mobile-First Considerations
- Stack all multi-column layouts to single column on mobile
- Touch-friendly button sizes (min 44px height)
- Collapsible navigation menu with hamburger icon
- Contact actions (WhatsApp, Phone) prominent and easily tappable
- Simplified hero on mobile (less text, single CTA)

## Trust Elements
- Display business hours prominently
- Include location/service area clearly
- Add trust badges if applicable (licenses, certifications)
- Use real testimonials with photos when available
- Show process transparency (How It Works section)

This design prioritizes conversion, trust, and flexibility while maintaining a clean, professional aesthetic suitable for service-based businesses across industries.