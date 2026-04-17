import ScrollReveal from "./ScrollReveal";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NOTIFICATION_EMAIL = "kyzerborja5@gmail.com";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      const submissionId = crypto.randomUUID();
      const submittedAt = new Date().toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      });

      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          recipientEmail: NOTIFICATION_EMAIL,
          idempotencyKey: `contact-notify-${submissionId}`,
          templateData: {
            name: form.name,
            email: form.email,
            message: form.message,
            submittedAt,
          },
        },
      });

      if (error) throw error;

      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Couldn't send your message. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">Contact</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-4">
            Let's Build Something{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a project in mind? Send us a message and we'll get back to you.
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
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-medium glow-button transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;
