import { useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AlertCircle, Check, Loader2, Send } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackEvent } from "@/lib/analytics";
import { ENQUIRY_EMAIL, submitEnquiry } from "@/lib/submitEnquiry";

export interface ProjectFormValues {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  stakeholder: string;
  services: string[];
  details: string;
  challenge: string;
  stage: string;
  budget: string;
  timeline: string;
  referral: string;
  notes: string;
}

const emptyForm: ProjectFormValues = {
  fullName: "",
  email: "",
  company: "",
  phone: "",
  stakeholder: "",
  services: [],
  details: "",
  challenge: "",
  stage: "",
  budget: "",
  timeline: "",
  referral: "",
  notes: "",
};

const serviceOptions = [
  "Website",
  "Application",
  "SaaS",
  "AI Product",
  "Business System",
  "Automation",
  "Mobile App",
  "Other",
];

const stakeholderOptions = [
  "Founder / Co-founder",
  "Startup",
  "Business Owner",
  "Enterprise",
  "Company / Organization",
  "Individual",
  "Other",
];

const stageOptions = [
  "Just an idea",
  "Prototype",
  "Existing product",
  "Scaling",
];

const timelineOptions = [
  "ASAP",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Flexible / Not decided",
];

const budgetOptions = [
  "Under ₹50K",
  "₹50K – ₹1L",
  "₹1L – ₹3L",
  "₹3L – ₹5L",
  "₹5L+",
  "Not sure yet",
];

export default function ProjectForm() {
  const [form, setForm] = useState<ProjectFormValues>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentVia, setSentVia] = useState<"endpoint" | "email">("endpoint");
  const [error, setError] = useState("");
  const startTracked = useRef(false);

  const update = <K extends keyof ProjectFormValues>(
    key: K,
    value: ProjectFormValues[K],
  ) => {
    if (!startTracked.current) {
      startTracked.current = true;
      trackEvent("form_start");
    }
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const toggleService = (service: string) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
    setError("");
  };

  const canSubmit = useMemo(
    () =>
      form.fullName.trim().length > 1 &&
      form.email.includes("@") &&
      form.phone.trim().length > 1 &&
      form.company.trim().length > 1 &&
      form.stakeholder.trim().length > 0 &&
      form.services.length > 0 &&
      form.details.trim().length > 10 &&
      form.stage.trim().length > 0 &&
      form.timeline.trim().length > 0 &&
      form.budget.trim().length > 0,
    [form],
  );

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError("Please complete all required fields before submitting.");
      return;
    }

    setSending(true);
    setError("");

    try {
      const result = await submitEnquiry(form);

      setSending(false);

      if (!result.ok) {
        setError(result.error);
        return;
      }

      trackEvent("form_submit", { via: result.via });
      setSentVia(result.via);
      setSubmitted(true);
    } catch {
      setSending(false);
      setError(
        "Something went wrong while sending your project brief. Please try again.",
      );
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[520px] flex-col items-center justify-center border border-[#ff5500]/30 bg-[#ff5500]/[0.05] px-6 text-center"
        data-testid="project-form-success"
      >
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff5500] text-[#0a0a0b]">
          <Check className="h-6 w-6" />
        </div>

        <p
          className="mb-3 text-[11px] font-mono uppercase tracking-[0.25em] text-[#ff5500]"
          data-testid="project-form-success-label"
        >
          Request received.
        </p>

        <h3
          className="max-w-lg text-3xl font-semibold tracking-tight text-zinc-100"
          data-testid="project-form-success-title"
        >
          Your project brief is with us.
        </h3>

        <p
          className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400"
          data-testid="project-form-success-copy"
        >
          {sentVia === "email"
            ? `Your brief is open in your mail app — press send and it reaches us at ${ENQUIRY_EMAIL}.`
            : "Thanks for sharing the details. The ESTROC team will review your brief and get back to you within two working days."}
        </p>

        <Button
          type="button"
          variant="outline"
          className="mt-8"
          onClick={() => {
            setSubmitted(false);
            setForm(emptyForm);
            setError("");
          }}
          data-testid="project-form-start-over-button"
        >
          Start another enquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <div
      className="border border-white/10 bg-[#111113]"
      data-testid="project-form"
    >
      {/* HEADER */}
      <div className="border-b border-white/10 px-5 py-6 sm:px-8">
        <p
          className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#ff5500]"
          data-testid="project-form-step-label"
        >
          Project intake
        </p>

        <h3
          className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl"
          data-testid="project-form-step-title"
        >
          Tell us what you're building.
        </h3>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
          Give us enough context to understand the problem, the product and
          what you need next.
        </p>
      </div>

      {/* ABOUT YOU */}
      <FormSection
        number="01"
        title="About you"
        description="Tell us who we're speaking with."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" htmlFor="full-name" required>
            <Input
              id="full-name"
              value={form.fullName}
              onChange={(event) => update("fullName", event.target.value)}
              placeholder="Your name"
              data-testid="enquiry-full-name-input"
            />
          </Field>

          <Field label="Work email" htmlFor="work-email" required>
            <Input
              id="work-email"
              type="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              placeholder="you@company.com"
              data-testid="enquiry-work-email-input"
            />
          </Field>

          <Field
            label="Company / organization"
            htmlFor="company"
            required
          >
            <Input
              id="company"
              value={form.company}
              onChange={(event) => update("company", event.target.value)}
              placeholder="Company name"
              data-testid="enquiry-company-input"
            />
          </Field>

          <Field label="Phone number" htmlFor="phone" required>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(event) => update("phone", event.target.value)}
              placeholder="+91 XXXXX XXXXX"
              data-testid="enquiry-phone-input"
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="You are a" htmlFor="stakeholder" required>
              <select
                id="stakeholder"
                value={form.stakeholder}
                onChange={(event) =>
                  update("stakeholder", event.target.value)
                }
                className="flex h-10 w-full rounded-md border border-white/10 bg-[#18181a] px-3 py-2 text-sm text-zinc-200 outline-none transition-colors focus:border-[#ff5500]/60 focus:ring-1 focus:ring-[#ff5500]/30"
                data-testid="enquiry-stakeholder-select"
              >
                <option value="" disabled>
                  Select your role / organization type
                </option>

                {stakeholderOptions.map((option) => (
                  <option key={option} value={option} className="bg-[#18181a]">
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>
      </FormSection>

      {/* WHAT ARE YOU BUILDING */}
      <FormSection
        number="02"
        title="What are you building?"
        description="Select everything that applies."
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {serviceOptions.map((service) => {
            const selected = form.services.includes(service);

            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`flex min-h-12 items-center justify-between border px-4 text-left text-sm transition-all ${
                  selected
                    ? "border-[#ff5500]/70 bg-[#ff5500]/10 text-zinc-100"
                    : "border-white/10 bg-[#18181a] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                }`}
                data-testid={`service-option-${service
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <span>{service}</span>

                <span
                  className={`flex h-4 w-4 items-center justify-center border ${
                    selected
                      ? "border-[#ff5500] bg-[#ff5500] text-[#0a0a0b]"
                      : "border-zinc-600"
                  }`}
                >
                  {selected && <Check className="h-3 w-3" />}
                </span>
              </button>
            );
          })}
        </div>
      </FormSection>

      {/* PROJECT DETAILS */}
      <FormSection
        number="03"
        title="Tell us about your project"
        description="The more context you give us, the better we can understand it."
      >
        <div className="grid gap-5">
          <Field
            label="What are you trying to build?"
            htmlFor="project-details"
            required
          >
            <textarea
              id="project-details"
              value={form.details}
              onChange={(event) => update("details", event.target.value)}
              placeholder="Tell us about the product, idea or system you have in mind..."
              rows={5}
              className="flex w-full resize-y rounded-md border border-white/10 bg-[#18181a] px-3 py-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 transition-colors focus:border-[#ff5500]/60 focus:ring-1 focus:ring-[#ff5500]/30"
              data-testid="enquiry-project-details-input"
            />
          </Field>

          <Field
            label="What's the challenge you're trying to solve?"
            htmlFor="challenge"
          >
            <textarea
              id="challenge"
              value={form.challenge}
              onChange={(event) => update("challenge", event.target.value)}
              placeholder="What problem, friction or opportunity led you here?"
              rows={4}
              className="flex w-full resize-y rounded-md border border-white/10 bg-[#18181a] px-3 py-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 transition-colors focus:border-[#ff5500]/60 focus:ring-1 focus:ring-[#ff5500]/30"
              data-testid="enquiry-challenge-input"
            />
          </Field>

          <Field
            label="Existing website / product link"
            htmlFor="referral"
          >
            <Input
              id="referral"
              type="url"
              value={form.referral}
              onChange={(event) => update("referral", event.target.value)}
              placeholder="https://..."
              data-testid="enquiry-existing-link-input"
            />
          </Field>
        </div>
      </FormSection>

      {/* STAGE */}
      <FormSection
        number="04"
        title="Where are you right now?"
        description="This helps us understand what kind of support you need."
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {stageOptions.map((stage) => {
            const selected = form.stage === stage;

            return (
              <button
                key={stage}
                type="button"
                onClick={() => update("stage", stage)}
                className={`min-h-12 border px-4 text-left text-sm transition-all ${
                  selected
                    ? "border-[#ff5500]/70 bg-[#ff5500]/10 text-zinc-100"
                    : "border-white/10 bg-[#18181a] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                }`}
                data-testid={`stage-option-${stage
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {stage}
              </button>
            );
          })}
        </div>
      </FormSection>

      {/* TIMELINE + BUDGET */}
      <FormSection
        number="05"
        title="Timeline & budget"
        description="No pressure — an estimate is enough if you haven't decided yet."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="When do you need it?" htmlFor="timeline" required>
            <select
              id="timeline"
              value={form.timeline}
              onChange={(event) => update("timeline", event.target.value)}
              className="flex h-10 w-full rounded-md border border-white/10 bg-[#18181a] px-3 py-2 text-sm text-zinc-200 outline-none transition-colors focus:border-[#ff5500]/60 focus:ring-1 focus:ring-[#ff5500]/30"
              data-testid="enquiry-timeline-select"
            >
              <option value="" disabled>
                Select timeline
              </option>

              {timelineOptions.map((option) => (
                <option key={option} value={option} className="bg-[#18181a]">
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Estimated budget" htmlFor="budget" required>
            <select
              id="budget"
              value={form.budget}
              onChange={(event) => update("budget", event.target.value)}
              className="flex h-10 w-full rounded-md border border-white/10 bg-[#18181a] px-3 py-2 text-sm text-zinc-200 outline-none transition-colors focus:border-[#ff5500]/60 focus:ring-1 focus:ring-[#ff5500]/30"
              data-testid="enquiry-budget-select"
            >
              <option value="" disabled>
                Select budget range
              </option>

              {budgetOptions.map((option) => (
                <option key={option} value={option} className="bg-[#18181a]">
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </FormSection>

      {/* ADDITIONAL */}
      <FormSection
        number="06"
        title="Anything else?"
        description="Optional context, links, requirements or anything we should know."
      >
        <Field label="Additional notes" htmlFor="notes">
          <textarea
            id="notes"
            value={form.notes}
            onChange={(event) => update("notes", event.target.value)}
            placeholder="Anything else you'd like us to know..."
            rows={4}
            className="flex w-full resize-y rounded-md border border-white/10 bg-[#18181a] px-3 py-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 transition-colors focus:border-[#ff5500]/60 focus:ring-1 focus:ring-[#ff5500]/30"
            data-testid="enquiry-notes-input"
          />
        </Field>
      </FormSection>

      {/* ERROR */}
      {error && (
        <p
          className="flex items-start gap-2 border-t border-[#ff5500]/25 bg-[#ff5500]/[0.06] px-5 py-4 text-sm text-[#ff9a6b] sm:px-8"
          role="alert"
          data-testid="enquiry-submit-error"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

          <span>
            {error} You can also email us directly at{" "}
            <a
              href={`mailto:${ENQUIRY_EMAIL}`}
              className="underline underline-offset-2"
            >
              {ENQUIRY_EMAIL}
            </a>
            .
          </span>
        </p>
      )}

      {/* SUBMIT */}
      <div className="border-t border-white/10 px-5 py-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-xs leading-relaxed text-zinc-600">
            Fields marked with * are required. Your information is used only
            to understand your project and get back to you.
          </p>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || sending}
            className="shrink-0"
            data-testid="enquiry-submit-button"
          >
            {sending ? (
              <>
                Sending
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Send to ESTROC
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-white/10 px-5 py-7 sm:px-8 sm:py-8">
      <div className="mb-6 flex gap-4">
        <span className="pt-1 text-[10px] font-mono tracking-[0.2em] text-[#ff5500]">
          {number}
        </span>

        <div>
          <h4 className="text-lg font-semibold tracking-tight text-zinc-100">
            {title}
          </h4>

          <p className="mt-1 text-xs leading-relaxed text-zinc-600">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label
        htmlFor={htmlFor}
        className="text-xs font-mono uppercase tracking-wider text-zinc-500"
        data-testid={`label-${htmlFor}`}
      >
        {label}
        {required && <span className="ml-1 text-[#ff5500]">*</span>}
      </Label>

      {children}
    </div>
  );
}