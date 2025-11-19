/**
 * Business Configuration Schema
 * 
 * This file contains all business-specific data for the website.
 * To customize for a new business, simply update the values in this file.
 * 
 * Future-proof schema supports:
 * - Multiple locations
 * - Multiple phone numbers and social media
 * - Service categories
 * - Gallery images
 * - Team members
 * - Special offers
 */

export interface BusinessLocation {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  phone?: string;
  hours?: BusinessHours[];
}

export interface BusinessHours {
  days: string;
  hours: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price?: string;
  category?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
  image?: string;
  service?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category?: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  code?: string;
  validUntil?: string;
  discount?: string;
}

export interface BusinessConfig {
  // Core Business Info
  name: string;
  tagline?: string;
  description?: string;
  industry: string;
  logo?: string;
  
  // Contact Information
  primaryPhone: string;
  phones?: string[];
  email: string;
  whatsapp?: string;
  
  // Locations
  locations: BusinessLocation[];
  
  // Operating Hours (default for all locations)
  hours: BusinessHours[];
  
  // Social Media
  socialMedia?: SocialMedia[];
  
  // Services
  services: Service[];
  serviceCategories?: string[];
  
  // Pricing
  pricing?: PricingTier[];
  
  // Testimonials
  testimonials?: Testimonial[];
  
  // Team
  team?: TeamMember[];
  
  // FAQ
  faqs?: FAQ[];
  
  // Gallery
  gallery?: GalleryImage[];
  
  // Special Offers
  offers?: SpecialOffer[];
  
  // Primary CTA
  primaryCTA: {
    text: string;
    action: 'form' | 'phone' | 'whatsapp' | 'link';
    value?: string;
  };
  
  // About Section
  about?: {
    title: string;
    content: string;
    image?: string;
    stats?: {
      label: string;
      value: string;
    }[];
  };
  
  // How It Works Steps
  howItWorks?: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
}

// ===================================
// Caperberry Fabric Care Config
// ===================================

export const businessConfig: BusinessConfig = {
  name: "Caperberry Fabric Care",
  tagline: "Where Fabric Meets Exceptional Care",
  description: "Lagos' premier fabric care service with free pickup and delivery. We treat your garments with the care they deserve.",
  industry: "Laundry & Dry Cleaning Services",
  
  primaryPhone: "+234 803 205 7261",
  phones: ["+234 803 205 7261", "+234 802 345 6789"],
  email: "hello@caperberryfabriccare.ng",
  whatsapp: "+2348032057261",
  
  locations: [
    {
      name: "Main Branch",
      address: "123 Admiralty Way",
      city: "Lekki",
      state: "Lagos",
      country: "Nigeria",
      coordinates: {
        lat: 6.4474,
        lng: 3.4700
      },
      phone: "+234 803 205 7261"
    }
  ],
  
  hours: [
    {
      days: "Monday - Saturday",
      hours: "8:00 AM - 7:00 PM"
    },
    {
      days: "Sunday",
      hours: "12:00 PM - 5:00 PM"
    }
  ],
  
  socialMedia: [
    {
      platform: "Facebook",
      url: "https://facebook.com/caperberryfabriccare",
      icon: "facebook"
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/caperberryfabriccare",
      icon: "instagram"
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/caperberryfabriccare",
      icon: "twitter"
    }
  ],
  
  services: [
    {
      id: "laundry",
      name: "Laundry",
      description: "Professional wash and fold service for all your everyday garments",
      icon: "washing-machine",
      price: "From ₦1,500/kg"
    },
    {
      id: "dry-cleaning",
      name: "Dry Cleaning",
      description: "Expert dry cleaning for delicate fabrics and special garments",
      icon: "shirt",
      price: "From ₦2,000/item"
    },
    {
      id: "ironing",
      name: "Ironing & Pressing",
      description: "Crisp, professional ironing for a polished look",
      icon: "iron",
      price: "From ₦500/item"
    },
    {
      id: "stain-removal",
      name: "Stain Removal",
      description: "Advanced stain treatment for tough marks and spills",
      icon: "droplet",
      price: "From ₦1,000"
    },
    {
      id: "express",
      name: "Express Service",
      description: "Same-day service for urgent cleaning needs",
      icon: "zap",
      price: "+50% surcharge"
    },
    {
      id: "alterations",
      name: "Alterations",
      description: "Professional tailoring and garment alterations",
      icon: "scissors",
      price: "From ₦1,500"
    }
  ],
  
  pricing: [
    {
      id: "basic",
      name: "Basic",
      price: "₦5,000",
      period: "/month",
      description: "Perfect for individuals",
      features: [
        "Up to 5kg per week",
        "Standard turnaround (3 days)",
        "Free pickup & delivery",
        "Basic stain treatment",
        "Folded & packaged"
      ],
      ctaText: "Get Started"
    },
    {
      id: "premium",
      name: "Premium",
      price: "₦12,000",
      period: "/month",
      description: "Best for families",
      features: [
        "Up to 15kg per week",
        "Fast turnaround (2 days)",
        "Free pickup & delivery",
        "Advanced stain treatment",
        "Hangers available",
        "Priority support"
      ],
      highlighted: true,
      ctaText: "Most Popular"
    },
    {
      id: "business",
      name: "Business",
      price: "Custom",
      period: "",
      description: "For businesses & bulk needs",
      features: [
        "Unlimited volume",
        "Same-day service available",
        "Dedicated account manager",
        "Custom packaging",
        "Invoice billing",
        "Volume discounts"
      ],
      ctaText: "Contact Us"
    }
  ],
  
  testimonials: [
    {
      id: "1",
      name: "Chioma Adeleke",
      role: "Business Executive",
      content: "Caperberry Fabric Care has been a lifesaver! Their pickup service is always on time, and my clothes come back looking brand new.",
      rating: 5,
      service: "Premium Plan"
    },
    {
      id: "2",
      name: "Tunde Okonkwo",
      role: "Entrepreneur",
      content: "I've tried several laundry services in Lagos, but none compare to Caperberry's attention to detail. Highly recommended!",
      rating: 5,
      service: "Dry Cleaning"
    },
    {
      id: "3",
      name: "Amina Bello",
      role: "Marketing Manager",
      content: "The express service saved me before an important meeting. Professional, fast, and affordable. They're now my go-to!",
      rating: 5,
      service: "Express Service"
    }
  ],
  
  faqs: [
    {
      id: "1",
      question: "What areas do you cover in Lagos?",
      answer: "We currently serve Lekki, Victoria Island, Ikoyi, Ikeja, and surrounding areas. Contact us to confirm if we deliver to your location.",
      category: "Service Area"
    },
    {
      id: "2",
      question: "How does the pickup and delivery work?",
      answer: "Simply schedule a pickup through our website or WhatsApp. We'll collect your items at your preferred time and deliver them back cleaned and pressed within 2-3 days (or same-day for express service).",
      category: "Process"
    },
    {
      id: "3",
      question: "What payment methods do you accept?",
      answer: "We accept cash, bank transfer, card payments, and mobile money. Payment can be made on delivery or in advance.",
      category: "Payment"
    },
    {
      id: "4",
      question: "Do you handle delicate fabrics?",
      answer: "Yes! We have specialized equipment and expertise for handling delicate fabrics including silk, wool, linen, and designer garments.",
      category: "Services"
    },
    {
      id: "5",
      question: "What if I'm not satisfied with the service?",
      answer: "Customer satisfaction is our priority. If you're not happy with our service, we'll re-clean your items at no extra charge or provide a full refund.",
      category: "Guarantee"
    },
    {
      id: "6",
      question: "Is there a minimum order?",
      answer: "Our minimum order is 3kg for regular service. However, we're flexible for dry cleaning and express services.",
      category: "Pricing"
    }
  ],
  
  howItWorks: [
    {
      id: "1",
      title: "Schedule Pickup",
      description: "Book online or via WhatsApp. Choose your preferred pickup time.",
      icon: "calendar"
    },
    {
      id: "2",
      title: "We Collect",
      description: "Our team arrives at your doorstep to collect your laundry.",
      icon: "package"
    },
    {
      id: "3",
      title: "We Clean",
      description: "Expert cleaning with premium products and care.",
      icon: "sparkles"
    },
    {
      id: "4",
      title: "We Deliver",
      description: "Fresh, clean clothes delivered back to you.",
      icon: "truck"
    }
  ],
  
  about: {
    title: "About Caperberry Fabric Care",
    content: "Founded in 2012, Caperberry Fabric Care has grown to become one of Lagos' most trusted garment care services. We combine traditional craftsmanship with modern technology to deliver exceptional results. Our team of experienced professionals treats every garment with the utmost care, ensuring your clothes look their best. With free pickup and delivery across Lagos, we make professional fabric care convenient and accessible.",
    stats: [
      {
        label: "Happy Customers",
        value: "5,000+"
      },
      {
        label: "Items Cleaned",
        value: "100,000+"
      },
      {
        label: "Years of Service",
        value: "13+"
      },
      {
        label: "Service Rating",
        value: "4.9/5"
      }
    ]
  },
  
  primaryCTA: {
    text: "Schedule a Pickup",
    action: "form"
  }
};
