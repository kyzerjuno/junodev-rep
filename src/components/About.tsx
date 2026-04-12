import ScrollReveal from "./ScrollReveal";

const About = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <span className="text-primary text-sm font-medium uppercase tracking-widest">About Us</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-6">
              We're <span className="gradient-text">JunoDev</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Born from a passion for space exploration and cutting-edge technology, JunoDev is a web development agency that helps businesses launch their digital presence into the stratosphere.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We combine AI-powered innovation with stunning design to create websites that don't just look amazing — they convert, engage, and grow your business. Every pixel is purposeful. Every line of code is crafted with care.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="font-heading text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground mt-1">Projects Launched</div>
              </div>
              <div>
                <div className="font-heading text-3xl font-bold gradient-text">98%</div>
                <div className="text-sm text-muted-foreground mt-1">Client Satisfaction</div>
              </div>
              <div>
                <div className="font-heading text-3xl font-bold gradient-text">3x</div>
                <div className="text-sm text-muted-foreground mt-1">Avg. Growth</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="glass-card-glow p-8 relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/20 blur-[40px]" />
              <div className="space-y-6">
                {["Innovation First", "Results Driven", "Client Focused"].map((item, i) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-sm">
                      0{i + 1}
                    </div>
                    <span className="font-heading font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
