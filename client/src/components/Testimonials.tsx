import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { businessConfig } from "../../../config/business";
import { Star } from "lucide-react";
import testimonial1 from "@assets/generated_images/Customer_testimonial_portrait_1_74ff0336.png";
import testimonial2 from "@assets/generated_images/Customer_testimonial_portrait_2_03047e6a.png";
import testimonial3 from "@assets/generated_images/Customer_testimonial_portrait_3_9ae8ff58.png";

const testimonialImages: Record<string, string> = {
  '1': testimonial1,
  '2': testimonial2,
  '3': testimonial3,
};

export default function Testimonials() {
  const { testimonials } = businessConfig;

  if (!testimonials || testimonials.length === 0) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-testimonials-title">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-testimonials-description">
            Don't just take our word for it
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover-elevate transition-all duration-300" data-testid={`card-testimonial-${testimonial.id}`}>
              <CardContent className="pt-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4" data-testid={`rating-${testimonial.id}`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'fill-primary text-primary' : 'text-muted'}`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-muted-foreground mb-6 italic" data-testid={`text-testimonial-content-${testimonial.id}`}>
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonialImages[testimonial.id]} alt={testimonial.name} />
                    <AvatarFallback>{getInitials(testimonial.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold" data-testid={`text-testimonial-name-${testimonial.id}`}>
                      {testimonial.name}
                    </div>
                    {testimonial.role && (
                      <div className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${testimonial.id}`}>
                        {testimonial.role}
                      </div>
                    )}
                    {testimonial.service && (
                      <div className="text-xs text-primary" data-testid={`text-testimonial-service-${testimonial.id}`}>
                        {testimonial.service}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
