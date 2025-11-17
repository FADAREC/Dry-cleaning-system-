import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { businessConfig } from "../../../config/business";
import { 
  Sparkles, 
  Shirt, 
  Zap, 
  Droplet, 
  Package, 
  Scissors,
  WashingMachine,
  LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  'washing-machine': WashingMachine,
  'shirt': Shirt,
  'iron': Package,
  'droplet': Droplet,
  'zap': Zap,
  'scissors': Scissors,
  'sparkles': Sparkles,
};

export default function Services() {
  const { services } = businessConfig;

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Sparkles;
    return <IconComponent className="w-12 h-12 text-primary" />;
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background" id="services">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-services-title">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-description">
            Professional garment care services tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="hover-elevate transition-all duration-300"
              data-testid={`card-service-${service.id}`}
            >
              <CardHeader>
                <div className="mb-4">
                  {getIcon(service.icon)}
                </div>
                <CardTitle className="text-xl md:text-2xl" data-testid={`text-service-name-${service.id}`}>
                  {service.name}
                </CardTitle>
                {service.price && (
                  <CardDescription className="text-primary font-semibold text-base" data-testid={`text-service-price-${service.id}`}>
                    {service.price}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground" data-testid={`text-service-description-${service.id}`}>
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
