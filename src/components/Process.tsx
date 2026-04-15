import ScrollReveal from "./ScrollReveal";
import { Rocket, Palette, Code, Sparkles } from "lucide-react";

const steps = [
  { icon: Rocket, title: "Plan", description: "We define your goals, audience, and strategy to chart the perfect course.", num: "01" },
  { icon: Palette, title: "Design", description: "Stunning visuals and intuitive UX that capture your brand's essence.", num: "02" },
  { icon: Code, title: "Build", description: "Clean, performant code powered by modern technologies and best practices.", num: "03" },
  { icon: Sparkles, title: "Launch", description: "Liftoff! Your site goes live with full support and ongoing optimization.", num: "04" },
];

const Process = () => {
  return (
    <section id="process" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">How We Work</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-4">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From ignition to orbit — a seamless launch sequence
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.12}>
                <div className="glass-card-glow p-8 text-center group relative">
                  <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-primary/25 group-hover:scale-110">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-xs text-primary font-mono mb-2">{step.num}</div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
