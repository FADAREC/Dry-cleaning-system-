/**
 * Theme Configuration
 * 
 * Customize the visual appearance of the website here.
 * Colors, fonts, spacing, and other design tokens.
 * 
 * To rebrand for a different business:
 * 1. Update the color values
 * 2. Change font families if needed
 * 3. Adjust spacing/sizing preferences
 * 4. Update the logo
 */

export interface ThemeConfig {
  // Brand Colors (HSL format: "H S% L%")
  colors: {
    primary: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
  };
  
  // Typography
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  
  // Spacing Scale (Tailwind units)
  spacing: {
    section: {
      mobile: string;
      desktop: string;
    };
    container: string;
    cardPadding: string;
  };
  
  // Border Radius
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
  
  // Animations
  animations: {
    duration: string;
    easing: string;
  };
}

export const themeConfig: ThemeConfig = {
  colors: {
    // Primary brand color - Blue for trust and professionalism
    primary: "210 95% 42%",
    primaryForeground: "210 95% 98%",
    
    // Accent color - Subtle blue-gray for secondary elements
    accent: "210 12% 91%",
    accentForeground: "210 12% 12%",
  },
  
  fonts: {
    heading: "Inter",
    body: "Inter",
    mono: "Menlo, monospace"
  },
  
  spacing: {
    section: {
      mobile: "py-16",
      desktop: "md:py-20 lg:py-24"
    },
    container: "max-w-7xl mx-auto px-4 md:px-6",
    cardPadding: "p-6 md:p-8"
  },
  
  borderRadius: {
    small: "rounded-md",
    medium: "rounded-lg",
    large: "rounded-xl"
  },
  
  animations: {
    duration: "duration-300",
    easing: "ease-in-out"
  }
};

/**
 * CUSTOMIZATION GUIDE
 * 
 * To customize for a new business:
 * 
 * 1. COLORS
 *    Update the HSL values in the colors object
 *    Use a color picker to get HSL values (e.g., https://hslpicker.com)
 *    Format: "Hue Saturation% Lightness%"
 * 
 * 2. FONTS
 *    Change font families to match your brand
 *    Make sure to add the font imports to index.html
 * 
 * 3. SPACING
 *    Adjust if you want tighter/looser layouts
 *    Use Tailwind spacing scale (4, 6, 8, 12, 16, 20, 24, etc.)
 * 
 * 4. BORDER RADIUS
 *    Adjust for sharper (smaller values) or rounder (larger values) corners
 * 
 * Examples:
 * 
 * Restaurant (Warm, inviting):
 * primary: "25 75% 50%" (Orange)
 * 
 * Law Firm (Professional, trustworthy):
 * primary: "220 65% 30%" (Dark Blue)
 * 
 * Spa/Wellness (Calm, natural):
 * primary: "160 40% 45%" (Teal/Green)
 * 
 * Tech Startup (Modern, innovative):
 * primary: "260 60% 55%" (Purple)
 */
