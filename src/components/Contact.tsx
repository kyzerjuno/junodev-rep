import ScrollReveal from "./ScrollReveal";
import { useState } from "react";
import { Rocket, Sparkles, Mail, Send, Loader2 } from "lucide-react";
import ProjectQuestionnaire from "./ProjectQuestionnaire";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const id = crypto.randomUUID();
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          idempotencyKey: `contact-${id}`,
          templateData: {
            name: form.name,
            email: form.email,
            message: form.message,
            submittedAt: new Date().toLocaleString("en-US", {
              dateStyle: "long",
              timeStyle: "short",
            }),
          },
        },
      });
      if (error) throw error;
      toast({ title: "Message sent! 🚀", description: "We'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

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

        <ScrollReveal delay={0.2} className="mt-10">
          <div className="glass-card p-8 md:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl md:text-2xl font-semibold">
                  Just a quick question?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Drop us a message — we'll reply by email.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={submitting}
                  required
                />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={submitting}
                  required
                />
              </div>
              <Textarea
                placeholder="What's on your mind?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                disabled={submitting}
                rows={4}
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium glow-button transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send message
                  </>
                )}
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>

      <ProjectQuestionnaire open={open} onOpenChange={setOpen} />
    </section>
  );
};

export default Contact;
