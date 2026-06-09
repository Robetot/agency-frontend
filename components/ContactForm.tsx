"use client";

import { useState } from "react";
import Link from "next/link";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BRAND_NAME } from "@/lib/site";

export function ContactForm() {
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    // No backend wired up yet — connect this to your CRM/endpoint.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="glass flex flex-col items-center rounded-2xl p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m5 12 4.5 4.5L19 7"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="mt-5 font-heading text-2xl font-semibold">Thanks — you&apos;re in!</h2>
        <p className="mt-2 max-w-sm text-text-muted">
          We&apos;ll reach out shortly to schedule your demo. Prefer to grab a time now?
          Use the scheduler below.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass rounded-2xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Full name" name="name" autoComplete="name" required />
        <Input
          label="Business name"
          name="business"
          autoComplete="organization"
          required
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(555) 000-0000"
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
        />
      </div>

      <div className="mt-5">
        <Select label="Monthly call volume" name="volume" defaultValue="" required>
          <option value="" disabled>
            Select a range…
          </option>
          <option value="<50">Fewer than 50 calls</option>
          <option value="50-150">50–150 calls</option>
          <option value="150-300">150–300 calls</option>
          <option value="300-600">300–600 calls</option>
          <option value="600+">600+ calls</option>
        </Select>
      </div>

      {/* MANDATORY consent — submit stays disabled until checked */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <input
          id="sms-consent"
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 bg-bg-secondary text-accent-primary accent-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
          aria-describedby="consent-text"
        />
        <label id="consent-text" htmlFor="sms-consent" className="text-sm leading-relaxed text-text-muted">
          By providing your phone number, you agree to receive text messages from{" "}
          {BRAND_NAME} for business updates. Message and data rates may apply. Reply STOP
          to opt out at any time. View our{" "}
          <Link href="/legal#privacy" className="text-accent-secondary underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/legal#terms" className="text-accent-secondary underline underline-offset-2">
            Terms
          </Link>
          .
        </label>
      </div>

      <Button type="submit" size="lg" disabled={!consent} className="mt-6 w-full">
        Request my demo
      </Button>
      <p className="mt-3 text-center text-xs text-text-muted" aria-live="polite">
        {consent
          ? "Thanks — you can submit your request now."
          : "Please agree to the messaging terms above to continue."}
      </p>
    </form>
  );
}
