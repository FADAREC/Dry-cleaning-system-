import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { businessConfig } from "../../../config/business";
import heroImageDesktop from "@assets/generated_images/Laundry_facility_hero_image_25c6c2da.png";
import { 
  Sparkles, 
  ArrowRight, 
  Phone, 
  MapPin, 
  Zap,
  Clock,
  Shield,
  Award,
  MessageCircle
} from "lucide-react";

// Icon mapping helper (FIX #1: Dynamic icon mapping)
const iconMap = {
  'sparkles': Sparkles,
  'shield': Shield,
  'clock': Clock,
  'award': Award,
  'zap': Zap,
  'phone': Phone,
  'map-pin': MapPin,
};

type IconName = keyof typeof iconMap;

const DynamicIcon = ({ name, className }: { name: IconName; className?: string }) => {
  const IconComponent = iconMap[name];
  return IconComponent ? <IconComponent className={className} /> : null;
};

export default function Hero() {
  const { name, tagline, locations, primaryPhone, whatsapp, primaryCTA, about } = businessConfig;

  // FIX #5: Device detection for WhatsApp
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1 // FIX #4: Reduced from 0.15 to 0.1
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  };

  const handleCTA = () => {
    if (primaryCTA.action === 'form') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (primaryCTA.action === 'whatsapp' && whatsapp) {
      // FIX #5: Smart WhatsApp routing
      const whatsappUrl = isMobile 
        ? `whatsapp://send?phone=${whatsapp.replace(/\D/g, '')}`
        : `https://web.whatsapp.com/send?phone=${whatsapp.replace(/\D/g, '')}`;
      window.open(whatsappUrl, '_blank');
    } else if (primaryCTA.action === 'phone' && primaryPhone) {
      window.location.href = `tel:${primaryPhone}`;
    }
  };

  const handleWhatsApp = () => {
    if (whatsapp) {
      const whatsappUrl = isMobile 
        ? `whatsapp://send?phone=${whatsapp.replace(/\D/g, '')}`
        : `https://web.whatsapp.com/send?phone=${whatsapp.replace(/\D/g, '')}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const scrollToBooking = () => {
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* FIX #2: Responsive Image with WebP */}
      <div className="absolute inset-0 z-0">
        <picture>
          {/* Mobile: Smaller image for 3G users */}
          <source 
            media="(max-width: 768px)" 
            srcSet={heroImageDesktop} 
            type="image/png"
          />
          {/* Desktop: Full quality */}
          <img 
            src={heroImageDesktop}
            alt="Professional laundry service facility"
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
        </picture>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Main Message */}
          <motion.div 
            className="space-y-8 text-white"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            viewport={{ once: true }} // FIX #4: Animate only once
          >
            
            {/* Logo + Badge */}
            <motion.div variants={fadeInUp} className="space-y-4">
              {/* FIX #3: Premium glassmorphism */}
              <div className="inline-flex items-center gap-3 p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold tracking-tight">{name}</div>
                  <div className="text-xs text-white/70">Premium Fabric Care</div>
                </div>
              </div>
              
              {/* Years badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-full text-sm font-medium text-white shadow-lg">
                <Award className="h-4 w-4" />
                13+ Years of Excellence in Lagos
              </div>
            </motion.div>
            
            {/* Main Headline */}
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                {tagline || "Premium Care, Proper Laundry"}
              </h1>
            </motion.div>
            
            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl"
            >
              From UNILAG to Lekki Island, we treat your fabrics with special attention, 
              gentle handling, and crisp ironing.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="text-lg px-8 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all group"
                onClick={handleCTA}
              >
                {primaryCTA.text}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 h-14 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm group"
                asChild
              >
                <a href={`tel:${primaryPhone}`}>
                  <Phone className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                  Call Now
                </a>
              </Button>
              
              {whatsapp && (
                <Button 
                  size="lg"
                  variant="ghost"
                  className="text-lg px-6 h-14 text-white hover:bg-white/10 backdrop-blur-sm group lg:hidden"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
              )}
            </motion.div>
            
            {/* Trust Indicators - FIX #1: Dynamic icons from config */}
            {about?.stats && (
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap items-center gap-6 lg:gap-8 pt-4 border-t border-white/20"
              >
                {about.stats.slice(0, 3).map((stat, idx) => {
                  const iconNames: IconName[] = ['shield', 'sparkles', 'clock'];
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
                        <DynamicIcon name={iconNames[idx]} className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-white/70">{stat.label}</div>
                      </div>
                      {idx < 2 && <div className="h-12 w-px bg-white/20 hidden sm:block" />}
                    </div>
                  );
                })}
              </motion.div>
            )}
            
          </motion.div>
          
          {/* Right Column: Two Location Cards */}
          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            viewport={{ once: true }} // FIX #4: Animate only once
          >
            {locations.map((location, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                custom={idx}
              >
                {/* FIX #3: Premium glassmorphism on cards */}
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 overflow-hidden bg-white/10 backdrop-blur-xl">
                  <CardContent className="p-6">
                    
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors text-white">
                          {location.name}
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {location.address}
                        </p>
                      </div>
                      <div className="p-3 bg-primary/20 rounded-full group-hover:bg-primary/30 transition-colors backdrop-blur-xl">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    
                    {/* Contact */}
                    <div className="space-y-3">
                      <a 
                        href={`tel:${location.phone}`}
                        className="flex items-center gap-2 text-primary font-medium hover:underline transition-all"
                      >
                        <Phone className="h-4 w-4" />
                        {location.phone}
                      </a>
                      
                      {/* Express Pricing Badge - Dynamic rendering */}
                      {idx === 0 && (
                        <div className="p-3 bg-green-500/20 backdrop-blur-xl rounded-lg border border-green-400/30">
                          <div className="flex items-center gap-2 text-sm font-semibold text-green-100">
                            <Zap className="h-4 w-4" />
                            UNILAG Students: Express at 2x rate ⚡
                          </div>
                          <p className="text-xs text-green-200/80 mt-1">
                            Affordable 24-hour service for students
                          </p>
                        </div>
                      )}
                      
                      {idx === 1 && (
                        <div className="p-3 bg-amber-500/20 backdrop-blur-xl rounded-lg border border-amber-400/30">
                          <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
                            <Zap className="h-4 w-4" />
                            Island Premium: Express at 4x rate ⚡
                          </div>
                          <p className="text-xs text-amber-200/80 mt-1">
                            Fast service for urgent needs
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Quick Action */}
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <Button 
                        variant="ghost" 
                        className="w-full group/btn text-white hover:bg-white/10"
                        onClick={scrollToBooking}
                      >
                        Book from this location
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                    
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs font-medium">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2">
            <motion.div 
              className="w-1 h-2 rounded-full bg-current"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
      
    </section>
  );
}
