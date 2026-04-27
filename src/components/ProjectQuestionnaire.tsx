import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Loader2, Rocket } from "lucide-react";

const NOTIFICATION_EMAIL = "kyzerborja5@gmail.com";

interface ProjectQuestionnaireProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormState {
  // Step 1 — Contact
  name: string;
  email: string;
  company: string;
  // Step 2 — Vision
  vision: string;
  // Step 3 — Project type & features
  projectType: string;
  features: string;
  // Step 4 — Design
  designStyle: string;
  inspiration: string;
  brandAssets: string;
  // Step 5 — Budget & timeline
  budget: string;
  timeline: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  company: "",
  vision: "",
  projectType: "",
  features: "",
  designStyle: "",
  inspiration: "",
  brandAssets: "",
  budget: "",
  timeline: "",
};

const PROJECT_TYPES = [
  "Landing page",
  "Marketing website (multi-page)",
  "E-commerce store",
  "Web app / SaaS",
  "Portfolio",
  "Other / not sure yet",
];

const DESIGN_STYLES = [
  "Minimal & clean",
  "Bold & editorial",
  "Playful & vibrant",
  "Futuristic / tech",
  "Luxury / elegant",
  "Not sure — I trust your judgment",
];

const TIMELINES = [
  "ASAP (under 1 month)",
  "1 – 2 months",
  "2 – 3 months",
  "3+ months",
  "Flexible",
];

const STEP_TITLES = [
  "About you",
  "Your vision",
  "Project & features",
  "Design direction",
  "Budget & timeline",
];

const TOTAL_STEPS = STEP_TITLES.length;

const ProjectQuestionnaire = ({ open, onOpenChange }: ProjectQuestionnaireProps) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const reset = () => {
    setStep(0);
    setForm(INITIAL_STATE);
    setSubmitted(false);
    setSubmitting(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next && submitted) reset();
    if (!next && !submitting) onOpenChange(false);
    else if (next) onOpenChange(true);
  };

  const isStepValid = (): boolean => {
    switch (step) {
      case 0:
        return form.name.trim().length > 0 && /^\S+@\S+\.\S+$/.test(form.email.trim());
      case 1:
        return form.vision.trim().length >= 10;
      case 2:
        return form.projectType.trim().length > 0;
      case 3:
        return form.designStyle.trim().length > 0;
      case 4:
        return form.budget.trim().length > 0 && form.timeline.trim().length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) {
      toast.error("Please complete the required fields before continuing.");
      return;
    }
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!isStepValid() || submitting) return;
    setSubmitting(true);
    try {
      const submissionId = crypto.randomUUID();
      const submittedAt = new Date().toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      });

      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "project-questionnaire",
          recipientEmail: NOTIFICATION_EMAIL,
          idempotencyKey: `project-questionnaire-${submissionId}`,
          templateData: {
            ...form,
            submittedAt,
          },
        },
      });

      if (error) throw error;

      setSubmitted(true);
      toast.success("Questionnaire sent! We'll be in touch within 24 hours.");
    } catch (err) {
      console.error("Questionnaire submit error:", err);
      toast.error("Couldn't send your questionnaire. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border/60 p-0 overflow-hidden max-h-[90vh] flex flex-col">
        {submitted ? (
          <div className="p-10 text-center space-y-5">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <DialogHeader>
              <DialogTitle className="font-heading text-3xl text-center">
                Liftoff in <span className="gradient-text">3, 2, 1...</span>
              </DialogTitle>
              <DialogDescription className="text-center text-base text-muted-foreground pt-2">
                Thanks {form.name.split(" ")[0] || "there"}! We've received your project brief and will get back to you within 24 hours with next steps.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
              className="mt-2"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            {/* Header with progress */}
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-border/40">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-medium mb-2">
                <Rocket className="w-3.5 h-3.5" />
                Step {step + 1} of {TOTAL_STEPS}
              </div>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl md:text-3xl">
                  {STEP_TITLES[step]}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Project questionnaire — step {step + 1} of {TOTAL_STEPS}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 h-1 w-full rounded-full bg-muted/60 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Step content */}
            <div className="px-6 md:px-8 py-6 overflow-y-auto flex-1">
              {step === 0 && (
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="q-name">Your name *</Label>
                      <Input
                        id="q-name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        maxLength={100}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="q-email">Email *</Label>
                      <Input
                        id="q-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        maxLength={255}
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="q-company">Company / brand</Label>
                    <Input
                      id="q-company"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      maxLength={150}
                      placeholder="Acme Inc. (optional)"
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-2">
                  <Label htmlFor="q-vision">
                    Describe your vision for the website *
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    What's the goal? Who's it for? What feeling should it create? Don't worry about polish — just brain-dump.
                  </p>
                  <Textarea
                    id="q-vision"
                    value={form.vision}
                    onChange={(e) => update("vision", e.target.value)}
                    maxLength={2000}
                    rows={8}
                    placeholder="We're launching a sustainable coffee brand and want a site that feels warm and editorial, with a story-first homepage and a clean shop..."
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {form.vision.length} / 2000
                  </p>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="space-y-3">
                    <Label>What kind of project is this? *</Label>
                    <RadioGroup
                      value={form.projectType}
                      onValueChange={(v) => update("projectType", v)}
                      className="grid sm:grid-cols-2 gap-2"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <label
                          key={type}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                            form.projectType === type
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50 hover:bg-muted/40"
                          }`}
                        >
                          <RadioGroupItem value={type} id={`pt-${type}`} />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="q-features">
                      Any specific features or integrations you need?
                    </Label>
                    <Textarea
                      id="q-features"
                      value={form.features}
                      onChange={(e) => update("features", e.target.value)}
                      maxLength={1000}
                      rows={4}
                      placeholder="Stripe checkout, blog/CMS, newsletter, multi-language, booking system, AI chatbot..."
                      className="resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div className="space-y-3">
                    <Label>Design direction *</Label>
                    <RadioGroup
                      value={form.designStyle}
                      onValueChange={(v) => update("designStyle", v)}
                      className="grid sm:grid-cols-2 gap-2"
                    >
                      {DESIGN_STYLES.map((style) => (
                        <label
                          key={style}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                            form.designStyle === style
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50 hover:bg-muted/40"
                          }`}
                        >
                          <RadioGroupItem value={style} id={`ds-${style}`} />
                          <span className="text-sm">{style}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="q-inspiration">Inspiration links</Label>
                    <Textarea
                      id="q-inspiration"
                      value={form.inspiration}
                      onChange={(e) => update("inspiration", e.target.value)}
                      maxLength={1000}
                      rows={3}
                      placeholder="Drop URLs of sites/brands you love (one per line)"
                      className="resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="q-brand">Brand assets</Label>
                    <Textarea
                      id="q-brand"
                      value={form.brandAssets}
                      onChange={(e) => update("brandAssets", e.target.value)}
                      maxLength={500}
                      rows={2}
                      placeholder="Do you have a logo, brand guidelines, or photography ready? Or do you need help with branding too?"
                      className="resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="q-budget">Budget *</Label>
                    <p className="text-sm text-muted-foreground">
                      A rough range is fine — it helps us scope the right solution for you.
                    </p>
                    <Input
                      id="q-budget"
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>Timeline *</Label>
                    <RadioGroup
                      value={form.timeline}
                      onValueChange={(v) => update("timeline", v)}
                      className="grid sm:grid-cols-2 gap-2"
                    >
                      {TIMELINES.map((t) => (
                        <label
                          key={t}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                            form.timeline === t
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50 hover:bg-muted/40"
                          }`}
                        >
                          <RadioGroupItem value={t} id={`t-${t}`} />
                          <span className="text-sm">{t}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / nav */}
            <div className="px-6 md:px-8 py-4 border-t border-border/40 flex items-center justify-between gap-3 bg-muted/20">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 0 || submitting}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              {step < TOTAL_STEPS - 1 ? (
                <Button onClick={handleNext} className="gap-2 glow-button">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting || !isStepValid()}
                  className="gap-2 glow-button"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Launching...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4" />
                      Launch project brief
                    </>
                  )}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectQuestionnaire;
