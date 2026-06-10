"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Stylized, realistic SMS mockup for the hero - a real product moment showing
 * missed call -> instant text-back -> qualify -> booked. Warm cream/teal bubbles,
 * gentle staggered entrance (not a loop). Decorative, so marked aria-hidden with a
 * descriptive label on the frame.
 */

type Line =
  | { kind: "ai"; text: string }
  | { kind: "lead"; text: string }
  | { kind: "booked"; text: string };

const lines: Line[] = [
  { kind: "ai", text: `Hi, it's the team at Rapid Plumbing, sorry we missed your call! What's going on?` },
  { kind: "lead", text: "Water heater's leaking in the garage 😬" },
  { kind: "ai", text: "On it. What ZIP are you in, and is it actively flooding?" },
  { kind: "lead", text: "80238, yeah it's getting worse" },
  { kind: "booked", text: "Booked: today 4:00 PM · licensed tech · you've been alerted" },
];

export function HeroConversation() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* Soft warm halo behind the phone for gentle depth (no hard blob) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-accent-primary/5"
      />
      <div
        className="card-surface overflow-hidden rounded-[24px] p-3"
        role="img"
        aria-label="A missed call is answered by an instant text: the assistant qualifies a leaking water-heater lead, confirms the service area, and books a same-day appointment."
      >
        {/* Header: business identity + missed-call notice */}
        <div className="rounded-2xl bg-bg-secondary px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-primary text-sm font-bold text-[#FAF8F5]">
              RP
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-text">Rapid Plumbing</p>
              <p className="flex items-center gap-1.5 text-xs text-accent-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" aria-hidden="true" />
                Auto-reply active
              </p>
            </div>
            <span className="ml-auto text-xs text-text-muted">SMS</span>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl border border-accent-secondary/30 bg-accent-secondary/10 px-3 py-2">
            <PhoneMissedIcon />
            <p className="text-xs font-medium text-text">
              Missed call · 2:14 PM - replied in 8 seconds
            </p>
          </div>
        </div>

        {/* Conversation */}
        <div className="flex flex-col gap-2.5 px-1 py-4">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={
                line.kind === "lead" ? "flex justify-end" : "flex justify-start"
              }
            >
              {line.kind === "booked" ? (
                <div className="flex w-full items-start gap-2.5 rounded-2xl border border-accent-primary/25 bg-accent-primary/[0.06] px-3.5 py-3">
                  <CalendarIcon />
                  <p className="text-sm font-medium leading-relaxed text-accent-primary">
                    {line.text}
                  </p>
                </div>
              ) : (
                <div
                  className={
                    line.kind === "ai"
                      ? "max-w-[82%] rounded-2xl rounded-bl-md bg-accent-primary px-3.5 py-2.5 text-sm leading-relaxed text-[#FAF8F5]"
                      : "max-w-[82%] rounded-2xl rounded-br-md border border-line bg-bg-secondary px-3.5 py-2.5 text-sm leading-relaxed text-text"
                  }
                >
                  {line.text}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneMissedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-accent-secondary">
      <path
        d="M6.6 10.8a13 13 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.4 1 1 0 0 1-.25 1Z"
        fill="currentColor"
      />
      <path d="m15 3 6 6m0-6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-accent-primary">
      <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m8.5 14 2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
