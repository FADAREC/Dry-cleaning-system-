import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { businessConfig } from "../../../config/business";

export default function FAQ() {
  const { faqs } = businessConfig;

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-muted/30" id="faq">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-faq-description">
              Find answers to common questions about our services
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} data-testid={`accordion-faq-${faq.id}`}>
                <AccordionTrigger className="text-left" data-testid={`button-faq-question-${faq.id}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground" data-testid={`text-faq-answer-${faq.id}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
