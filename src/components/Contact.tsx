import ScrollReveal from "./ScrollReveal";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", form);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">Contact</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-4">
            Let's Build Something{" "}
            <span className="gradient-text">Out of This World</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to launch? Drop us a message and let's make it happen.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form onSubmit={handleSubmit} className="glass-card-glow p-8 md:p-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  maxLength={255}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                maxLength={1000}
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-medium glow-button transition-all duration-300 hover:scale-[1.02]"
            >
              Send Message 🚀
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;
