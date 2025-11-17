import { businessConfig } from "../../../config/business";
import { Calendar, Package, Sparkles, Truck, ArrowRight, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  'calendar': Calendar,
  'package': Package,
  'sparkles': Sparkles,
  'truck': Truck,
};

export default function HowItWorks() {
  const steps = businessConfig.howItWorks || [];

  if (steps.length === 0) return null;

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Package;
    return IconComponent;
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-how-it-works-title">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-how-it-works-description">
            Getting your laundry done is simple and convenient
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = getIcon(step.icon);
            return (
              <div key={step.id} className="relative" data-testid={`step-${step.id}`}>
                {/* Connector Arrow - Desktop Only */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(100%+1rem)] z-0">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}

                {/* Step Card */}
                <div className="text-center relative z-10">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-xl mb-4" data-testid={`text-step-number-${step.id}`}>
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 text-primary">
                      <Icon className="w-full h-full" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2" data-testid={`text-step-title-${step.id}`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-step-description-${step.id}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
