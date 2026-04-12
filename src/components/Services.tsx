import ScrollReveal from "./ScrollReveal";
import { Globe, Sparkles, Search, Zap } from "lucide-react";

const services = [
  { icon: Globe, title: "Website Design", description: "Stunning, responsive websites crafted to captivate your audience and elevate your brand.", color: "from-primary to-neon-pink" },
  { icon: Sparkles, title: "AI-Powered Websites", description: "Intelligent websites that learn, adapt, and deliver personalized experiences at scale.", color: "from-neon-blue to-primary" },
  { icon: Search, title: "SEO Optimization", description: "Dominate search rankings with data-driven strategies that put you ahead of the competition.", color: "from-neon-pink to-neon-violet" },
  { icon: Zap, title: "Automation & Integrations", description: "Streamline your workflows with seamless automations that save time and boost productivity.", color: "from-primary to-neon-blue" },
];

const Services = () => {
  return (
    <section id="services" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">What We Do</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything your business needs to thrive in the digital universe
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <div className="glass-card-glow p-8 h-full group cursor-pointer">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
