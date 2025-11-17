import { Button } from "@/components/ui/button";
import { businessConfig } from "../../../config/business";
import heroImage from "@assets/generated_images/Laundry_facility_hero_image_25c6c2da.png";
import { MessageCircle } from "lucide-react";

export default function Hero() {
  const { name, tagline, primaryCTA, whatsapp, primaryPhone } = businessConfig;

  const handleCTA = () => {
    if (primaryCTA.action === 'form') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (primaryCTA.action === 'whatsapp' && whatsapp) {
      window.open(`https://wa.me/${whatsapp.replace(/\D/g, '')}`, '_blank');
    } else if (primaryCTA.action === 'phone' && primaryPhone) {
      window.location.href = `tel:${primaryPhone}`;
    }
  };

  const handleWhatsApp = () => {
    if (whatsapp) {
      window.open(`https://wa.me/${whatsapp.replace(/\D/g, '')}`, '_blank');
    }
  };

  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional laundry service"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6" data-testid="text-hero-title">
          {name}
        </h1>
        
        {tagline && (
          <p className="text-xl md:text-2xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto" data-testid="text-hero-tagline">
            {tagline}
          </p>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            className="bg-primary/90 hover:bg-primary text-primary-foreground border border-primary-foreground/20 backdrop-blur-sm min-w-[200px]"
            onClick={handleCTA}
            data-testid="button-primary-cta"
          >
            {primaryCTA.text}
          </Button>
          
          {whatsapp && (
            <Button 
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm min-w-[200px]"
              onClick={handleWhatsApp}
              data-testid="button-whatsapp"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us
            </Button>
          )}
        </div>

        {/* Trust Indicator */}
        {businessConfig.about?.stats && (
          <div className="mt-12 md:mt-16 flex flex-wrap gap-8 justify-center text-white/90">
            {businessConfig.about.stats.slice(0, 3).map((stat: { value: string; label: string }, index: number) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm md:text-base text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
