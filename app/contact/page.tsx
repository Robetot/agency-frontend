import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { BRAND_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Book a demo of {{BRAND_NAME}}'s AI missed-call text-back. Tell us about your business and we'll show you how to recover lost leads.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Book a Demo · ${BRAND_NAME}`,
    description:
      "See how AI missed-call text-back recovers lost leads for your home-services business.",
  },
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-radial-accent" />
      <div className="container-px relative pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent-secondary">
            Book a Demo
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">
            See {BRAND_NAME} answer your missed calls
          </h1>
          <p className="mt-4 text-lg text-text-muted">
            Tell us a little about your business and we&apos;ll show you exactly how the
            AI qualifies and books your leads — usually within one business day.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-start">
          <ContactForm />

          {/* Calendly scheduler embed */}
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold">Prefer to pick a time?</h2>
            <p className="mt-2 text-sm text-text-muted">
              Grab a slot on our calendar and we&apos;ll call you then.
            </p>

            {/*
              CALENDLY EMBED
              Paste your Calendly inline-embed snippet inside the div below.
              Example:
                <div
                  class="calendly-inline-widget"
                  data-url="https://calendly.com/your-handle/intro-call"
                  style="min-width:320px;height:640px;"
                ></div>
                <script
                  type="text/javascript"
                  src="https://assets.calendly.com/assets/external/widget.js"
                  async
                ></script>
            */}
            <div
              id="calendly-embed"
              className="mt-6 grid min-h-[420px] place-items-center rounded-xl border border-dashed border-white/15 bg-bg-secondary/40 p-6 text-center"
            >
              <div>
                <p className="text-sm font-medium text-text">Calendly embed goes here</p>
                <p className="mt-1 text-xs text-text-muted">
                  Replace this placeholder with your Calendly inline-widget snippet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
