import { motion } from "framer-motion";
import logo from "@/assets/logo.jpg";

const Hero = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-pink/15 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-neon-blue/10 blur-[80px] animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={logo} alt="JunoDev mascot" className="w-24 h-24 rounded-full object-cover mx-auto mb-6 ring-2 ring-primary/30 shadow-lg shadow-primary/20" />
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm font-medium mb-8 backdrop-blur-sm">
            🚀 Web Development Agency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          Launch Your Business{" "}
          <span className="gradient-text">Into Orbit</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          We build high-converting websites for modern businesses
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo("#contact")}
            className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium glow-button transition-all duration-300 hover:scale-105"
          >
            Get Started
          </button>
          <button
            onClick={() => scrollTo("#portfolio")}
            className="px-8 py-3.5 rounded-full border border-primary/30 text-foreground font-medium backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:scale-105"
          >
            View Our Work
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
