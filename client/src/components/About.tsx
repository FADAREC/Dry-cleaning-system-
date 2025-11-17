import { Card } from "@/components/ui/card";
import { businessConfig } from "../../../config/business";

export default function About() {
  const { about } = businessConfig;

  if (!about) return null;

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background" id="about">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-about-title">
              {about.title}
            </h2>
          </div>

          {/* Content */}
          <div className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto" data-testid="text-about-content">
              {about.content}
            </p>
          </div>

          {/* Stats */}
          {about.stats && about.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {about.stats.map((stat: { value: string; label: string }, index: number) => (
                <Card key={index} className="p-6 text-center" data-testid={`card-stat-${index}`}>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2" data-testid={`text-stat-value-${index}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
