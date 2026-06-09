import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { WorkflowAnimation } from "@/components/WorkflowAnimation";
import { faqs, faqJsonLd, features, steps } from "@/lib/content";
import { BRAND_NAME } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Heavy, below-the-fold interactive components are code-split into their own
// chunks and streamed in with a lightweight placeholder.
const ConversationSim = dynamic(
  () => import("@/components/ConversationSim").then((m) => m.ConversationSim),
  { loading: () => <DemoSkeleton label="Loading live demo…" /> },
);

const RoiCalculator = dynamic(
  () => import("@/components/RoiCalculator").then((m) => m.RoiCalculator),
  { loading: () => <DemoSkeleton label="Loading calculator…" /> },
);

const toneClasses: Record<string, string> = {
  accent: "text-accent-primary",
  cyan: "text-accent-secondary",
  danger: "text-danger",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden pt-32 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-[#E2E8F0] opacity-70 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-20 h-[30rem] w-[30rem] rounded-full bg-[#E2E8F0] opacity-60 blur-3xl"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-radial-accent" />
        <div className="container-px relative grid items-center gap-14 pb-24 lg:grid-cols-2 lg:gap-12 lg:pb-36">
          <div>
            <Reveal from="up">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-card px-3.5 py-1.5 text-xs font-medium text-text-secondary shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                AI missed-call text-back for home services
              </span>
            </Reveal>
            <Reveal from="up" delay={0.06}>
              <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Never Miss
                <br />
                <span className="text-gradient-accent">Another Lead</span>
              </h1>
            </Reveal>
            <Reveal from="up" delay={0.12}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary">
                When you can&apos;t pick up, {BRAND_NAME} instantly texts the caller
                back, qualifies the job, and books the appointment — so the call you
                missed doesn&apos;t become the customer you lost.
              </p>
            </Reveal>
            <Reveal from="up" delay={0.18}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="lg">
                  Book a Demo
                </Button>
                <Button href="#how-it-works" size="lg" variant="secondary">
                  See How It Works
                </Button>
              </div>
            </Reveal>
            <Reveal from="up" delay={0.24}>
              <p className="mt-6 text-sm text-text-secondary">
                Replies in seconds · Bilingual · A2P compliant
              </p>
            </Reveal>
          </div>

          <Reveal from="left" delay={0.15}>
            <WorkflowAnimation />
          </Reveal>
        </div>
      </section>

      {/* ---------- PROBLEM ---------- */}
      <section className="border-t border-line bg-bg-secondary py-28 sm:py-36">
        <div className="container-px">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionEyebrow>The hidden leak in your pipeline</SectionEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                Half of calls to home services go unanswered
              </h2>
              <p className="mt-6 text-lg text-text-secondary">
                And most callers don&apos;t leave a voicemail — they just call the next
                company on the list. Every missed call is a job handed to a competitor.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-3">
            {[
              {
                value: <CountUp to={50} suffix="%" />,
                label: "of inbound calls to home-services businesses go unanswered",
              },
              {
                value: <CountUp to={85} suffix="%" />,
                label: "of callers who reach voicemail hang up without leaving one",
              },
              {
                value: (
                  <>
                    &lt;<CountUp to={10} suffix="s" />
                  </>
                ),
                label: "is all it takes for a missed caller to dial your competitor",
              },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08} from="up">
                <Card className="h-full text-center">
                  <p className="font-heading text-5xl font-bold text-gradient-accent">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {stat.label}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 text-center text-xs text-text-secondary">
              Figures are illustrative industry estimates, not a performance guarantee.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section id="how-it-works" className="py-28 sm:py-36">
        <div className="container-px">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionEyebrow>How it works</SectionEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                From missed call to booked job in three steps
              </h2>
            </div>
          </Reveal>

          <ol className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} from="up" as="li">
                <Card interactive className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary font-heading text-lg font-bold text-white">
                      {i + 1}
                    </span>
                    {i < steps.length - 1 && (
                      <span className="h-px flex-1 bg-gradient-to-r from-slate-300 to-transparent" />
                    )}
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                    {step.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- INTERACTIVE DEMO 1: CONVERSATION ---------- */}
      <section
        id="conversation-demo"
        className="border-y border-line bg-bg-secondary py-28 sm:py-36"
      >
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="right">
            <div>
              <SectionEyebrow>See it in action</SectionEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                Watch a real lead get qualified — by text
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                A homeowner with a leaking water heater calls and you can&apos;t pick
                up. Here&apos;s exactly how the assistant turns that missed call into a
                booked, priority appointment — captured area, urgency, and time slot
                included.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  "Replies instantly, before they call the next company",
                  "Verifies the service area by ZIP automatically",
                  "Detects urgency and flags emergencies as priority",
                  "Books a real time slot and alerts your team",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-text-secondary">
                    <CheckIcon />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal from="left" delay={0.1}>
            <ConversationSim />
          </Reveal>
        </div>
      </section>

      {/* ---------- INTERACTIVE DEMO 2: ROI ---------- */}
      <section id="roi-calculator" className="py-28 sm:py-36">
        <div className="container-px">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionEyebrow>ROI calculator</SectionEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                What are missed calls costing you?
              </h2>
              <p className="mt-6 text-lg text-text-secondary">
                Drag the sliders to see how much revenue you could recover every month
                by answering the calls you currently miss.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <RoiCalculator />
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="border-t border-line bg-bg-secondary py-28 sm:py-36">
        <div className="container-px">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionEyebrow>Built for the trades</SectionEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                Everything you need to capture and convert
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const isEmergency = feature.tone === "danger";
              return (
                <Reveal key={feature.title} delay={(i % 3) * 0.08} from="up">
                  <Card
                    interactive
                    className={
                      isEmergency
                        ? "h-full border-danger/30 bg-danger/[0.04]"
                        : "h-full"
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-secondary ${
                          toneClasses[feature.tone] ?? "text-accent-primary"
                        } ${isEmergency ? "animate-pulse-ring" : ""}`}
                      >
                        <FeatureIcon tone={feature.tone} />
                      </span>
                      {isEmergency && (
                        <span className="rounded-full bg-danger/15 px-2.5 py-1 text-xs font-semibold text-danger">
                          Priority alert
                        </span>
                      )}
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-semibold">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {feature.body}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="py-28 sm:py-36">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal from="right">
              <div className="lg:sticky lg:top-28">
                <SectionEyebrow>FAQ</SectionEyebrow>
                <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                  Questions, answered
                </h2>
                <p className="mt-4 text-text-secondary">
                  Still curious? <a className="text-accent-primary underline-offset-4 hover:underline" href="/contact">Talk to us</a> and we&apos;ll walk you through a live demo.
                </p>
              </div>
            </Reveal>
            <Reveal from="left" delay={0.1}>
              <Accordion items={[...faqs]} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="pb-28 sm:pb-36">
        <div className="container-px">
          <Reveal>
            <div className="glass-strong relative overflow-hidden rounded-3xl px-6 py-20 text-center sm:px-12 sm:py-24">
              <div className="pointer-events-none absolute inset-0 bg-radial-accent" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="font-heading text-3xl font-bold sm:text-5xl">
                  Stop losing jobs to voicemail
                </h2>
                <p className="mt-8 text-lg text-text-secondary">
                  See how {BRAND_NAME} answers, qualifies, and books your missed calls —
                  live, on a quick demo built around your business.
                </p>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button href="/contact" size="lg">
                    Book a Demo
                  </Button>
                  <Button href="/pricing" size="lg" variant="secondary">
                    View Pricing
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-semibold uppercase tracking-wider text-accent-primary">
      {children}
    </span>
  );
}

function DemoSkeleton({ label }: { label: string }) {
  return (
    <div
      className="glass flex min-h-[20rem] items-center justify-center rounded-2xl text-sm text-text-secondary"
      role="status"
      aria-live="polite"
    >
      {label}
    </div>
  );
}

function CheckIcon() {
  return (
    <span
      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success"
      aria-hidden="true"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="m5 12 4.5 4.5L19 7"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function FeatureIcon({ tone }: { tone: string }) {
  if (tone === "danger") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3 2 20h20L12 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M12 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
