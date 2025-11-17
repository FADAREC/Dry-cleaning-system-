# Business Website Template - Customization Guide

This template is designed to be easily customizable for any service-based business. Follow this guide to rebrand it for your specific use case.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Business Configuration](#business-configuration)
3. [Theme Customization](#theme-customization)
4. [Sections Management](#sections-management)
5. [Adding Custom Sections](#adding-custom-sections)
6. [Deployment](#deployment)

---

## Quick Start

To customize this template for a new business, you need to modify **3 main files**:

1. **`config/business.ts`** - All business data (name, services, contact info, etc.)
2. **`config/theme.ts`** - Visual styling (colors, fonts, spacing)
3. **`config/sections.ts`** - Which sections appear and in what order

That's it! No need to touch component files.

---

## Business Configuration

### File: `config/business.ts`

This file contains all business-specific data. Update the `businessConfig` object:

```typescript
export const businessConfig: BusinessConfig = {
  // Core Information
  name: "Your Business Name",
  tagline: "Your catchy tagline",
  description: "Brief description of your business",
  industry: "Your Industry",
  
  // Contact Details
  primaryPhone: "+234 XXX XXX XXXX",
  phones: ["+234 XXX XXX XXXX", "+234 XXX XXX XXXX"], // Optional: multiple phones
  email: "hello@yourbusiness.com",
  whatsapp: "+234XXXXXXXXXX", // Optional: WhatsApp number
  
  // Location(s)
  locations: [
    {
      name: "Main Branch",
      address: "123 Your Street",
      city: "Your City",
      state: "Your State",
      country: "Your Country",
      coordinates: { lat: 0.0, lng: 0.0 }, // Optional: for maps
      phone: "+234 XXX XXX XXXX" // Optional: location-specific phone
    }
  ],
  
  // Operating Hours
  hours: [
    { days: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { days: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { days: "Sunday", hours: "Closed" }
  ],
  
  // Services
  services: [
    {
      id: "service-1",
      name: "Service Name",
      description: "Service description",
      icon: "sparkles", // Icon name from lucide-react
      price: "From $99", // Optional
      category: "Category" // Optional
    }
    // Add more services...
  ],
  
  // Pricing Tiers (Optional)
  pricing: [
    {
      id: "basic",
      name: "Basic Plan",
      price: "$99",
      period: "/month",
      description: "For individuals",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      highlighted: false,
      ctaText: "Get Started"
    }
    // Add more tiers...
  ],
  
  // Primary Call-to-Action
  primaryCTA: {
    text: "Get Started",
    action: "form", // Options: 'form', 'phone', 'whatsapp', 'link'
    value: "" // Optional: URL for 'link' action
  }
};
```

### Available Icon Names

For the `icon` field in services, use any icon from [Lucide React](https://lucide.dev/icons):
- `sparkles`, `shirt`, `zap`, `droplet`, `package`, `scissors`, `washing-machine`
- `calendar`, `truck`, `phone`, `mail`, `map-pin`, `clock`
- And many more...

---

## Theme Customization

### File: `config/theme.ts`

Customize colors, fonts, and spacing:

```typescript
export const themeConfig: ThemeConfig = {
  colors: {
    // HSL format: "Hue Saturation% Lightness%"
    primary: "210 95% 42%",           // Main brand color
    primaryForeground: "210 95% 98%", // Text on primary color
    accent: "210 12% 91%",            // Secondary accent color
    accentForeground: "210 12% 12%",  // Text on accent color
  },
  
  fonts: {
    heading: "Inter",     // Font for headings
    body: "Inter",        // Font for body text
    mono: "Menlo, monospace" // Font for code
  },
  
  spacing: {
    section: {
      mobile: "py-16",
      desktop: "md:py-20 lg:py-24"
    },
    container: "max-w-7xl mx-auto px-4 md:px-6",
    cardPadding: "p-6 md:p-8"
  }
};
```

### Color Presets for Different Industries

**Restaurant (Warm, inviting):**
```typescript
primary: "25 75% 50%",  // Orange
```

**Law Firm (Professional, trustworthy):**
```typescript
primary: "220 65% 30%",  // Dark Blue
```

**Spa/Wellness (Calm, natural):**
```typescript
primary: "160 40% 45%",  // Teal/Green
```

**Tech Startup (Modern, innovative):**
```typescript
primary: "260 60% 55%",  // Purple
```

Use [HSL Color Picker](https://hslpicker.com/) to find your brand colors.

---

## Sections Management

### File: `config/sections.ts`

Control which sections appear on your website and in what order:

```typescript
export const sectionsConfig: SectionConfig[] = [
  {
    id: 'hero',
    type: 'hero',
    enabled: true,  // Set to false to hide
    order: 1,       // Lower numbers appear first
    settings: {
      height: '85vh',
      overlay: true
    }
  },
  {
    id: 'services',
    type: 'services',
    enabled: true,
    order: 2,
    settings: {
      columns: 3,
      showPrices: true
    }
  }
  // More sections...
];
```

### Available Sections

1. **hero** - Main hero section with CTA
2. **services** - Service cards grid
3. **how-it-works** - Process steps
4. **pricing** - Pricing tiers
5. **testimonials** - Customer reviews
6. **about** - About the business
7. **faq** - Frequently asked questions
8. **contact** - Contact form and info
9. **footer** - Footer with links
10. **team** - Team members (optional)
11. **gallery** - Image gallery (optional)
12. **promo-banner** - Promotional banner (optional)

### Example Configurations

**Restaurant Website:**
```typescript
// Enable: hero, services (menu), gallery, testimonials, contact
// Disable: pricing, team, how-it-works

sectionsConfig = [
  { id: 'hero', type: 'hero', enabled: true, order: 1 },
  { id: 'services', type: 'services', enabled: true, order: 2 },
  { id: 'gallery', type: 'gallery', enabled: true, order: 3 },
  { id: 'testimonials', type: 'testimonials', enabled: true, order: 4 },
  { id: 'contact', type: 'contact', enabled: true, order: 5 },
  { id: 'footer', type: 'footer', enabled: true, order: 6 },
  { id: 'pricing', type: 'pricing', enabled: false, order: 100 },
  { id: 'team', type: 'team', enabled: false, order: 101 },
  { id: 'how-it-works', type: 'how-it-works', enabled: false, order: 102 }
];
```

**Professional Services (Law, Consulting):**
```typescript
// Enable: hero, services, team, about, testimonials, faq, contact
// Disable: pricing, gallery, how-it-works

sectionsConfig = [
  { id: 'hero', type: 'hero', enabled: true, order: 1 },
  { id: 'services', type: 'services', enabled: true, order: 2 },
  { id: 'team', type: 'team', enabled: true, order: 3 },
  { id: 'about', type: 'about', enabled: true, order: 4 },
  { id: 'testimonials', type: 'testimonials', enabled: true, order: 5 },
  { id: 'faq', type: 'faq', enabled: true, order: 6 },
  { id: 'contact', type: 'contact', enabled: true, order: 7 },
  { id: 'footer', type: 'footer', enabled: true, order: 8 }
];
```

---

## Adding Custom Sections

To add a completely new section type:

### 1. Create the Section Component

Create `client/src/components/YourSection.tsx`:

```typescript
import { businessConfig } from "../../../config/business";

export default function YourSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Your Section Title
        </h2>
        {/* Your content */}
      </div>
    </section>
  );
}
```

### 2. Update Section Types

In `config/sections.ts`, add your section type:

```typescript
export type SectionType =
  | 'hero'
  | 'services'
  // ... existing types
  | 'your-section'; // Add this
```

### 3. Register in Sections Config

```typescript
export const sectionsConfig: SectionConfig[] = [
  // ... existing sections
  {
    id: 'your-section',
    type: 'your-section',
    enabled: true,
    order: 5,
    settings: {
      // Custom settings for your section
    }
  }
];
```

### 4. Add to Home Page

In `client/src/pages/Home.tsx`:

```typescript
import YourSection from "@/components/YourSection";

const sectionComponents: Record<string, React.ComponentType> = {
  // ... existing sections
  'your-section': YourSection,
};
```

---

## Deployment

### Update SEO

Edit `client/index.html`:

```html
<title>Your Business Name - Your Tagline</title>
<meta name="description" content="Your business description for search engines." />
```

### Environment Variables

For production, set these in your deployment platform:
- `NODE_ENV=production`

### Build Command

```bash
npm run build
```

### Deploy

The template works with any hosting platform:
- Vercel
- Netlify
- Replit Deployments
- AWS Amplify
- And more...

---

## Support

For questions or issues:
1. Check the inline comments in config files
2. Review the design guidelines in `design_guidelines.md`
3. Refer to component examples in `client/src/components/examples/`

---

## Architecture Overview

```
config/
  ├── business.ts      # All business data
  ├── theme.ts         # Visual styling
  └── sections.ts      # Section configuration

client/src/
  ├── components/      # Reusable UI components
  │   ├── Hero.tsx
  │   ├── Services.tsx
  │   └── ...
  ├── pages/
  │   └── Home.tsx     # Main page assembly
  └── App.tsx          # App entry point
```

The template uses a **configuration-driven architecture**:
- Change config files → Entire site updates automatically
- No need to modify component code
- Perfect for multi-tenant use cases

---

## Example: Converting to a Gym Website

1. **Update business.ts:**
```typescript
name: "FitZone Gym",
tagline: "Transform Your Body, Transform Your Life",
services: [
  {
    id: "personal-training",
    name: "Personal Training",
    description: "One-on-one sessions with certified trainers",
    icon: "dumbbell",
    price: "From $50/session"
  },
  // More gym services...
]
```

2. **Update theme.ts:**
```typescript
colors: {
  primary: "0 85% 50%",  // Energetic red
}
```

3. **Update sections.ts:**
```typescript
// Enable: hero, services, pricing, team, testimonials, contact
// Disable: how-it-works, faq
```

Done! Your gym website is ready.

---

**Happy customizing! 🚀**
