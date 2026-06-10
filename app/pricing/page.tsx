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
      <section className="relative overflow-hidden pt-32 sm:pt-40">
        <div className="container-px relative">
          <Reveal>
            <div className="max-w-2xl">
              <span className="eyebrow">Pricing</span>
              <h1 className="mt-5 font-heading text-4xl font-semibold leading-[1.05] sm:text-6xl">
                Plans that pay for themselves
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">
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
                    "relative flex h-full flex-col rounded-2xl p-8 shadow-soft transition-all",
                    tier.comingSoon
                      ? "border border-line bg-bg-primary opacity-80"
                      : "border border-accent-primary bg-bg-card shadow-soft",
                  )}
                  aria-label={tier.comingSoon ? `${tier.name} plan — coming soon` : undefined}
                >
                  {tier.comingSoon ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-secondary px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-[#1C1A17]">
                      Coming Soon
                    </span>
                  ) : (
                    tier.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-primary px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-[#FAF8F5]">
                        Most Popular
                      </span>
                    )
                  )}
                  <h2 className="font-heading text-xl font-semibold">{tier.name}</h2>
                  <p className="mt-1.5 min-h-[2.5rem] text-sm text-text-secondary">
                    {tier.tagline}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-heading text-5xl font-semibold">
                      ${tier.price}
                    </span>
                    <span className="text-text-secondary">/mo</span>
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">
                    + ${tier.setup} one-time setup
                  </p>

                  {tier.comingSoon ? (
                    <Button
                      href="/contact"
                      size="lg"
                      variant="secondary"
                      className="mt-6 w-full cursor-not-allowed border-line bg-bg-card text-text-secondary opacity-70 hover:border-line hover:bg-bg-card hover:text-text-secondary"
                    >
                      <LockIcon />
                      Join Waitlist
                    </Button>
                  ) : (
                    <Button
                      href="/contact"
                      size="lg"
                      variant="primary"
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
                          <span className="text-text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {tier.note && (
                      <p className="mt-5 rounded-lg border border-warning/30 bg-warning/[0.08] px-3 py-2 text-xs leading-relaxed text-[#B45309]">
                        {tier.note}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-text-secondary">
              Carrier and usage fees (phone number, messaging, voice minutes) billed as
              pass-through.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-28 sm:py-36">
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
      <section className="pb-28 sm:pb-36">
        <div className="container-px">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-card px-6 py-16 text-center shadow-soft sm:py-20">
              <div className="relative mx-auto max-w-2xl">
                <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
                  Not sure which plan fits?
                </h2>
                <p className="mt-4 text-lg text-text-secondary">
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
