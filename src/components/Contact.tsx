import ScrollReveal from "./ScrollReveal";
import { useState } from "react";
import { Rocket, Sparkles } from "lucide-react";
import ProjectQuestionnaire from "./ProjectQuestionnaire";

const Contact = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-10">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">Start a project</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-4">
            Let's Build Something{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tell us about your vision in our short questionnaire. We'll get back to you within 24 hours with a tailored plan.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card-glow p-8 md:p-12 text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-3">
              <h3 className="font-heading text-2xl md:text-3xl font-semibold">
                Share your vision
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                A guided 5-step brief covering your goals, design direction, features, and timeline. Takes about 3 minutes.
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium glow-button transition-all duration-300 hover:scale-[1.02]"
            >
              <Rocket className="w-5 h-5" />
              Start the questionnaire
            </button>

            <p className="text-xs text-muted-foreground">
              Free, no commitment. Goes straight to our inbox.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <ProjectQuestionnaire open={open} onOpenChange={setOpen} />
    </section>
  );
};

export default Contact;
