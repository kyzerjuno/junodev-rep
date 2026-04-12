import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const projects = [
  { title: "NovaTech SaaS", category: "Web App", gradient: "from-primary/40 to-neon-blue/40" },
  { title: "Stellar Commerce", category: "E-Commerce", gradient: "from-neon-pink/40 to-primary/40" },
  { title: "Orbit Finance", category: "Fintech", gradient: "from-neon-blue/40 to-neon-pink/40" },
  { title: "Cosmos Health", category: "Healthcare", gradient: "from-primary/40 to-neon-violet/40" },
  { title: "Nebula Travel", category: "Travel", gradient: "from-neon-violet/40 to-neon-blue/40" },
  { title: "Galaxy Eats", category: "Food & Delivery", gradient: "from-neon-pink/40 to-neon-violet/40" },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">Our Work</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore the digital experiences we've launched into the world
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass-card-glow overflow-hidden group cursor-pointer"
              >
                <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}>
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors duration-300" />
                  <span className="font-heading text-2xl font-bold text-foreground/80 relative z-10">{project.title}</span>
                </div>
                <div className="p-6">
                  <span className="text-xs text-primary font-medium uppercase tracking-wider">{project.category}</span>
                  <h3 className="font-heading text-lg font-semibold mt-1">{project.title}</h3>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
