import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple monthly pricing for AI missed-call text-back and lead qualification. Starter, Growth, and Pro plans for home-services businesses.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: `Pricing · ${BRAND_NAME}`,
    description:
      "Starter, Growth, and Pro plans for AI missed-call text-back and lead qualification.",
  },
};

type Tier = {
  name: string;
  price: number;
  setup: number;
  tagline: string;
  featured?: boolean;
  /** Locked/waitlist tier — desaturated, "Coming Soon", Join Waitlist CTA. */
  comingSoon?: boolean;
  inherits?: string;
  features: string[];
  note?: string;
};

const tiers: Tier[] = [
  {
    name: "Starter",
    price: 300,
    setup: 500,
    tagline: "Everything you need to stop losing missed calls.",
    features: [
      "Missed-call text-back",
      "AI lead qualification",
      "ZIP-code service-area gating",
      "Emergency escalation",
      "Real-time calendar booking",
      "Owner alerts",
      "Bilingual — English + Spanish (auto-detects)",
      "A2P 10DLC compliance",
    ],
  },
  {
    name: "Growth",
    price: 500,
    setup: 750,
    tagline: "Capture leads across every channel your customers use.",
    featured: true,
    comingSoon: true,
    inherits: "Starter",
    features: [
      "WhatsApp messaging",
      "Facebook Messenger",
      "Website chat widget",
      "Review automation",
      "All languages supported (auto-detected)",
    ],
  },
  {
    name: "Pro",
    price: 800,
    setup: 1000,
    tagline: "Add an AI voice agent and a full client dashboard.",
    comingSoon: true,
    inherits: "Growth",
    features: [
      "AI voice agent",
      "Client dashboard",
      "Estimate follow-ups",
      "Instagram DM",
      "All languages supported (auto-detected)",
      "Priority support",
    ],
    note: "Includes 750 voice minutes / mo. Overage billed separately.",
  },
];

const pricingFaqs = [
  {
    question: "What's included in the one-time setup fee?",
    answer:
      "Setup covers number/messaging configuration, A2P 10DLC brand and campaign registration, building your AI qualification flow around your services and service area, calendar integration, and testing before you go live.",
  },
  {
    question: "What are pass-through carrier and usage fees?",
    answer:
      "Phone number rental, per-message SMS/MMS fees, and voice minutes are billed by the underlying carrier/telecom providers. We pass these through at cost rather than marking them up inside the plan price.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes — you can upgrade or downgrade as your needs change. Setup fees only apply to net-new configuration work, not to plan changes.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-radial-accent" />
        <div className="container-px relative">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-accent-secondary">
                Pricing
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold sm:text-6xl">
                Plans that pay for themselves
              </h1>
              <p className="mt-5 text-lg text-text-muted">
                One recovered job often covers the month. Choose the plan that matches
                how your customers reach you — every tier includes the core missed-call
                text-back engine.
              </p>
            </div>
          </Reveal>

          {/* Pricing grid */}
          <div className="mt-16 grid items-start gap-6 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.08} from="up">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border p-7 shadow-card transition-all",
                    tier.comingSoon
                      ? "border-white/10 bg-bg-secondary/40 opacity-75 saturate-[.4]"
                      : tier.featured
                        ? "border-accent-primary/50 bg-bg-secondary/70 shadow-glow"
                        : "glass",
                  )}
                  aria-label={tier.comingSoon ? `${tier.name} plan — coming soon` : undefined}
                >
                  {tier.comingSoon ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-warning px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-bg-primary shadow-glow">
                      Coming Soon
                    </span>
                  ) : (
                    tier.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-bg-primary">
                        Most Popular
                      </span>
                    )
                  )}
                  <h2 className="font-heading text-xl font-semibold">{tier.name}</h2>
                  <p className="mt-1.5 min-h-[2.5rem] text-sm text-text-muted">
                    {tier.tagline}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-heading text-5xl font-bold">
                      ${tier.price}
                    </span>
                    <span className="text-text-muted">/mo</span>
                  </div>
                  <p className="mt-2 text-sm text-text-muted">
                    + ${tier.setup} one-time setup
                  </p>

                  {tier.comingSoon ? (
                    <Button
                      href="/contact"
                      size="lg"
                      variant="secondary"
                      className="mt-6 w-full cursor-not-allowed border-white/10 bg-white/[0.02] text-text-muted opacity-60 hover:border-white/10 hover:bg-white/[0.02] hover:text-text-muted"
                    >
                      <LockIcon />
                      Join Waitlist
                    </Button>
                  ) : (
                    <Button
                      href="/contact"
                      size="lg"
                      variant={tier.featured ? "primary" : "secondary"}
                      className="mt-6 w-full"
                    >
                      Get started
                    </Button>
                  )}

                  <div className="mt-7 flex-1">
                    {tier.inherits && (
                      <p className="mb-4 text-sm font-semibold text-text">
                        Everything in {tier.inherits}, plus:
                      </p>
                    )}
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <CheckIcon featured={tier.featured && !tier.comingSoon} />
                          <span className="text-text-muted">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {tier.note && (
                      <p className="mt-5 rounded-lg border border-warning/30 bg-warning/[0.06] px-3 py-2 text-xs leading-relaxed text-warning">
                        {tier.note}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-text-muted">
              Carrier and usage fees (phone number, messaging, voice minutes) billed as
              pass-through.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-20 sm:py-28">
        <div className="container-px">
          <Reveal>
            <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
              Pricing questions
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mx-auto mt-10 max-w-3xl">
              <Accordion items={pricingFaqs} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 sm:pb-32">
        <div className="container-px">
          <Reveal>
            <div className="glass-strong relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:py-16">
              <div className="pointer-events-none absolute inset-0 bg-radial-accent" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                  Not sure which plan fits?
                </h2>
                <p className="mt-4 text-lg text-text-muted">
                  Book a quick demo and we&apos;ll recommend the right tier for your call
                  volume and channels.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button href="/contact" size="lg">
                    Book a Demo
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

function CheckIcon({ featured }: { featured?: boolean }) {
  return (
    <span
      className={cn(
        "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
        featured ? "bg-accent-secondary/20 text-accent-secondary" : "bg-success/15 text-success",
      )}
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

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" fill="currentColor" />
      <path
        d="M8 11V8a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
