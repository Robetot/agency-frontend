import type { Metadata } from "next";
import { LegalNav } from "@/components/LegalNav";
import { BRAND_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Privacy Policy, Terms of Service, AI Disclosure, and compliance information for the {{BRAND_NAME}} messaging service.",
  alternates: { canonical: "/legal" },
  openGraph: {
    title: `Legal · ${BRAND_NAME}`,
    description:
      "Privacy Policy, Terms of Service, AI Disclosure, and compliance disclaimers.",
  },
};

const sections = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms of Service" },
  { id: "ai-disclosure", label: "AI Disclosure" },
  { id: "compliance", label: "Compliance Disclaimers" },
];

const lastUpdated = "June 9, 2026";

export default function LegalPage() {
  return (
    <section className="pt-32 sm:pt-40">
      <div className="container-px pb-24">
        <header className="mx-auto max-w-3xl">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-5 font-heading text-4xl font-semibold sm:text-5xl">
            Legal &amp; Compliance
          </h1>
          <p className="mt-4 text-text-secondary">
            Last updated: {lastUpdated}. This page covers our Privacy Policy, Terms of
            Service, AI Disclosure, and compliance disclaimers.
          </p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <LegalNav sections={sections} />
          </aside>

          <div className="max-w-3xl">
            {/* ---------- PRIVACY ---------- */}
            <LegalSection id="privacy" title="Privacy Policy">
              <p>{`{{PASTE_PRIVACY_POLICY_FROM_TERMLY}}`}</p>

              <h3 className="mt-8 font-heading text-xl font-semibold text-text">
                Mobile Information Sharing
              </h3>
              <p>
                No mobile information will be shared with third parties/affiliates for
                marketing/promotional purposes. All the above categories exclude text
                messaging originator opt-in data and consent; this information will not be
                shared with any third parties.
              </p>
            </LegalSection>

            {/* ---------- TERMS ---------- */}
            <LegalSection id="terms" title="Terms of Service">
              <p>{`{{PASTE_TERMS_FROM_TERMLY}}`}</p>

              <h3 className="mt-8 font-heading text-xl font-semibold text-text">
                SMS Messaging Program
              </h3>
              <p>
                By opting in, you agree to receive recurring automated text messages from{" "}
                {BRAND_NAME} related to your inquiry, appointment, and account. Message
                frequency varies based on your interactions with our service.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  Reply <strong className="text-text">STOP</strong> at any time to opt out
                  and stop receiving messages.
                </li>
                <li>
                  Reply <strong className="text-text">HELP</strong> for help, or contact
                  us using the details provided in your messages.
                </li>
                <li>Message &amp; data rates may apply.</li>
                <li>
                  Carriers are not liable for delayed or undelivered messages.
                </li>
              </ul>
            </LegalSection>

            {/* ---------- AI DISCLOSURE ---------- */}
            <LegalSection id="ai-disclosure" title="AI Disclosure">
              <p>
                The assistant that responds to your calls and messages is automated
                artificial intelligence — not a human. It identifies itself as an
                automated assistant and is designed to help answer questions, qualify
                your request, and schedule appointments.
              </p>
              <p className="mt-4">
                When a conversation requires human judgment, or when you ask to speak with
                a person, the assistant escalates the conversation to a member of the team
                and notifies them so a human can follow up.
              </p>
            </LegalSection>

            {/* ---------- COMPLIANCE ---------- */}
            <LegalSection id="compliance" title="Compliance Disclaimers">
              <ul className="space-y-4">
                <li className="rounded-xl border border-danger/30 bg-danger/[0.05] p-4">
                  <strong className="text-text">Not for emergencies.</strong> This service
                  is not a replacement for 911 or emergency services. If you are
                  experiencing a life-threatening emergency, call 911 immediately.
                </li>
                <li className="rounded-xl border border-line bg-bg-secondary p-4">
                  <strong className="text-text">No protected health information.</strong>{" "}
                  This service does not collect, process, or store HIPAA-protected health
                  information. Please do not send protected health information through it.
                </li>
                <li className="rounded-xl border border-line bg-bg-secondary p-4">
                  <strong className="text-text">No payment data via SMS.</strong> This
                  service does not accept credit card or PCI cardholder data via text
                  message. Never send payment card information over SMS.
                </li>
              </ul>
            </LegalSection>
          </div>
        </div>
      </div>
    </section>
  );
}

function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 border-t border-line py-12 first:border-t-0 first:pt-0"
      >
      <h2
        id={`${id}-heading`}
        className="font-heading text-2xl font-bold sm:text-3xl"
      >
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-text-secondary sm:text-base">
        {children}
      </div>
    </section>
  );
}
