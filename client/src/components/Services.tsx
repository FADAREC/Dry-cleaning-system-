import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { businessConfig } from "../../../config/business";
import { 
  Sparkles, 
  Shirt, 
  Zap, 
  Droplet, 
  Package, 
  Scissors,
  WashingMachine
} from "lucide-react";

const iconMap: Record<string, any> = {
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
    return <IconComponent className="w-14 h-14 text-primary" />;
  };
  
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="py-20 md:py-28 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-3">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-testid="text-services-title">
            Everything Your Fabrics Need
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed" data-testid="text-services-description">
            From everyday laundry to special garments, we handle it all with premium care
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="group h-full bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-500"
                data-testid={`card-service-${service.id}`}
              >
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                    {getIcon(service.icon)}
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-gray-900" data-testid={`text-service-name-${service.id}`}>
                    {service.name}
                  </CardTitle>
                  
                  {service.price && service.id !== 'express' && (
                    <CardDescription className="text-primary font-semibold text-base" data-testid={`text-service-price-${service.id}`}>
                      {service.price}
                    </CardDescription>
                  )}
                  
                  {service.id === 'express' && (
                    <CardDescription className="text-gray-500 font-medium text-sm" data-testid={`text-service-price-${service.id}`}>
                      Contact us for express pricing
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 leading-relaxed" data-testid={`text-service-description-${service.id}`}>
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600 mb-4 text-lg">
            Not sure which service you need?
          </p>
          <button 
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 text-lg"
          >
            Talk to our team
            <span className="text-xl">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
