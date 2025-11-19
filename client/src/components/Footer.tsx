import { businessConfig } from "../../../config/business";
import { Facebook, Instagram, Twitter, LucideIcon } from "lucide-react";

const socialIconMap: Record<string, LucideIcon> = {
  'facebook': Facebook,
  'instagram': Instagram,
  'twitter': Twitter,
};

export default function Footer() {
  const { name, services, locations, primaryPhone, email, socialMedia } = businessConfig;
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (iconName: string) => {
    const IconComponent = socialIconMap[iconName.toLowerCase()] || Facebook;
    return IconComponent;
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4" data-testid="text-footer-brand">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Professional laundry and dry cleaning services in Lagos.
            </p>
            {socialMedia && socialMedia.length > 0 && (
              <div className="flex gap-3">
                {socialMedia.map((social) => {
                  const Icon = getSocialIcon(social.icon);
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-md bg-background hover-elevate active-elevate-2 flex items-center justify-center transition-colors"
                      aria-label={social.platform}
                      data-testid={`link-social-${social.platform.toLowerCase()}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-services">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-about">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <span className="text-muted-foreground" data-testid={`text-footer-service-${service.id}`}>
                    {service.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${primaryPhone}`} className="text-muted-foreground hover:text-foreground transition-colors" data-testid="text-footer-phone">
                  {primaryPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="text-muted-foreground hover:text-foreground transition-colors" data-testid="text-footer-email">
                  {email}
                </a>
              </li>
              {locations[0] && (
                <li className="text-muted-foreground" data-testid="text-footer-address">
                  {locations[0].address}<br />
                  {locations[0].city}, {locations[0].state}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p data-testid="text-copyright">
            © {currentYear} {name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">
              Terms of Service
            </a>
            <a href="/admin" className="hover:text-foreground transition-colors" data-testid="link-admin">
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
