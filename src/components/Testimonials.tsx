import ScrollReveal from "./ScrollReveal";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah Chen", role: "CEO, NovaTech", text: "JunoDev transformed our online presence completely. Our conversions increased by 200% within the first month of launch.", rating: 5 },
  { name: "Marcus Johnson", role: "Founder, Stellar Commerce", text: "The AI-powered features they built into our site are incredible. Our customers love the personalized experience.", rating: 5 },
  { name: "Elena Rodriguez", role: "CMO, Orbit Finance", text: "Professional, creative, and incredibly fast. JunoDev delivered a website that exceeded all our expectations.", rating: 5 },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">Testimonials</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="glass-card-glow p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">"{t.text}"</p>
                <div>
                  <div className="font-heading font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
