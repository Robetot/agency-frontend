import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { HeroConversation } from "@/components/HeroConversation";
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden pt-32 sm:pt-40">
        <div className="container-px relative grid items-center gap-14 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-36">
          <div>
            <Reveal from="up">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-card px-4 py-1.5 text-xs font-medium text-text-secondary shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" aria-hidden="true" />
                AI missed-call text-back for home services
              </span>
            </Reveal>
            <Reveal from="up" delay={0.06}>
              <h1 className="mt-7 font-heading text-5xl font-semibold leading-[1.02] text-text sm:text-6xl lg:text-[4.75rem]">
                Never Miss Another{" "}
                <span className="relative whitespace-nowrap">
                  Lead
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 220 20"
                    preserveAspectRatio="none"
                    className="absolute -bottom-2 left-0 h-3 w-full text-accent-secondary"
                  >
                    <path
                      d="M3 13 C 45 5, 95 5, 140 10 S 200 15, 217 7"
                      stroke="currentColor"
                      strokeWidth="4.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
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
              <p className="mt-6 text-sm text-text-muted">
                Replies in seconds · Bilingual · A2P compliant
              </p>
            </Reveal>
          </div>

          <Reveal from="left" delay={0.15}>
            <HeroConversation />
          </Reveal>
        </div>
      </section>

      {/* ---------- PROBLEM ---------- */}
      <section className="border-t border-line bg-bg-secondary py-28 sm:py-36">
        <div className="container-px">
          <Reveal>
            <div className="max-w-2xl">
              <SectionEyebrow>The hidden leak in your pipeline</SectionEyebrow>
              <h2 className="mt-5 font-heading text-3xl font-semibold sm:text-[2.75rem] sm:leading-[1.08]">
                Half of calls to home services go unanswered
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">
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
                <Card className="h-full">
                  <p className="font-heading text-5xl font-semibold text-accent-primary">
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
            <p className="mt-6 text-xs text-text-muted">
              Figures are illustrative industry estimates, not a performance guarantee.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section id="how-it-works" className="py-28 sm:py-36">
        <div className="container-px">
          <Reveal>
            <div className="max-w-2xl">
              <SectionEyebrow>How it works</SectionEyebrow>
              <h2 className="mt-5 font-heading text-3xl font-semibold sm:text-[2.75rem] sm:leading-[1.08]">
                From missed call to booked job in three steps
              </h2>
            </div>
          </Reveal>

          <ol className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} from="up" as="li">
                <Card interactive className="h-full">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-primary font-heading text-lg font-semibold text-[#FAF8F5]">
                      {i + 1}
                    </span>
                    <span className="text-accent-primary/80" aria-hidden="true">
                      <StepIcon index={i} />
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-semibold">
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
        <div className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal from="right">
            <div>
              <SectionEyebrow>See it in action</SectionEyebrow>
              <h2 className="mt-5 font-heading text-3xl font-semibold sm:text-[2.75rem] sm:leading-[1.08]">
                Watch a real lead get qualified — by text
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                A homeowner with a leaking water heater calls and you can&apos;t pick
                up. Here&apos;s exactly how the assistant turns that missed call into a
                booked, priority appointment — captured area, urgency, and time slot
                included.
              </p>
              <ul className="mt-8 space-y-3.5">
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
            <div className="max-w-2xl">
              <SectionEyebrow>ROI calculator</SectionEyebrow>
              <h2 className="mt-5 font-heading text-3xl font-semibold sm:text-[2.75rem] sm:leading-[1.08]">
                What are missed calls costing you?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                Drag the sliders to see how much revenue you could recover every month
                by answering the calls you currently miss.
              </p>
            </div>
          </Reveal>
          <div className="mt-14">
            <RoiCalculator />
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="border-t border-line bg-bg-secondary py-28 sm:py-36">
        <div className="container-px">
          <Reveal>
            <div className="max-w-2xl">
              <SectionEyebrow>Built for the trades</SectionEyebrow>
              <h2 className="mt-5 font-heading text-3xl font-semibold sm:text-[2.75rem] sm:leading-[1.08]">
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
                        ? "h-full border-accent-secondary/40 bg-accent-secondary/[0.06]"
                        : "h-full"
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-xl border ${
                          isEmergency
                            ? "animate-pulse-ring border-accent-secondary/40 bg-accent-secondary/10 text-accent-secondary"
                            : "border-line bg-bg-secondary text-accent-primary"
                        }`}
                      >
                        <FeatureIcon tone={feature.tone} />
                      </span>
                      {isEmergency && (
                        <span className="rounded-full bg-accent-secondary/15 px-2.5 py-1 text-xs font-semibold text-accent-secondaryHover">
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

      {/* ---------- TESTIMONIAL (placeholder — no fabricated quotes) ---------- */}
      <section className="py-28 sm:py-36">
        <div className="container-px">
          <Reveal>
            <SectionEyebrow>From the field</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <figure className="mt-7 max-w-4xl">
              <span aria-hidden="true" className="font-heading text-6xl leading-none text-accent-primary/30">
                &ldquo;
              </span>
              <blockquote className="-mt-4 font-heading text-2xl font-medium leading-snug text-text sm:text-3xl sm:leading-snug">
                {`{{ CUSTOMER_QUOTE }}`} — replace this with a real customer&apos;s own
                words once you have their written permission to publish them.
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm text-text-muted">
                <span className="h-10 w-10 rounded-full border border-line bg-bg-secondary" aria-hidden="true" />
                <span>
                  Placeholder — add customer name, role &amp; trade
                  <span className="block text-xs">No testimonial is shown until a real, permission-based quote is added.</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="border-t border-line bg-bg-secondary py-28 sm:py-36">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal from="right">
              <div className="lg:sticky lg:top-28">
                <SectionEyebrow>FAQ</SectionEyebrow>
                <h2 className="mt-5 font-heading text-3xl font-semibold sm:text-[2.75rem] sm:leading-[1.08]">
                  Questions, answered
                </h2>
                <p className="mt-5 text-text-secondary">
                  Still curious?{" "}
                  <a
                    className="text-accent-primary underline underline-offset-4 hover:text-accent-primaryHover"
                    href="/contact"
                  >
                    Talk to us
                  </a>{" "}
                  and we&apos;ll walk you through a live demo.
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
      <section className="py-28 sm:py-36">
        <div className="container-px">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-accent-primary px-6 py-20 sm:px-14 sm:py-24">
              <div className="relative max-w-2xl">
                <h2 className="font-heading text-3xl font-semibold leading-[1.05] text-[#FAF8F5] sm:text-5xl">
                  Stop losing jobs to voicemail
                </h2>
                <p className="mt-7 text-lg leading-relaxed text-[#FAF8F5]/85">
                  See how {BRAND_NAME} answers, qualifies, and books your missed calls —
                  live, on a quick demo built around your business.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href="/contact"
                    size="lg"
                    className="bg-accent-secondary text-[#1C1A17] hover:bg-accent-secondaryHover"
                  >
                    Book a Demo
                  </Button>
                  <Button
                    href="/pricing"
                    size="lg"
                    variant="secondary"
                    className="border-[#FAF8F5]/40 bg-transparent text-[#FAF8F5] hover:border-[#FAF8F5] hover:bg-white/10"
                  >
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
  return <span className="eyebrow">{children}</span>;
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
      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-primary/12 text-accent-primary"
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

/** Simple, consistent trade-flavored icons: phone, chat, calendar. */
function StepIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.6 10.8a13 13 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.4 1 1 0 0 1-.25 1Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4v-4H6a2 2 0 0 1-2-2Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
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
