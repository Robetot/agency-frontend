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
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      <div className="container-px relative pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            Book a Demo
          </span>
          <h1 className="mt-5 font-heading text-4xl font-semibold sm:text-5xl">
            See {BRAND_NAME} answer your missed calls
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Tell us a little about your business and we&apos;ll show you exactly how the
            AI qualifies and books your leads, usually within one business day.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-start">
          <ContactForm />

          {/* Calendly scheduler embed */}
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold">Prefer to pick a time?</h2>
            <p className="mt-2 text-sm text-text-secondary">
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
              className="mt-6 grid min-h-[420px] place-items-center rounded-xl border border-dashed border-line bg-bg-secondary p-6 text-center"
            >
              <div>
                <p className="text-sm font-medium text-text">Calendly embed goes here</p>
                <p className="mt-1 text-xs text-text-secondary">
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
