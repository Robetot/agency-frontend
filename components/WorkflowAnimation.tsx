"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Stage = {
  key: string;
  label: string;
  detail: string;
  icon: React.ReactNode;
  tone: "muted" | "danger" | "accent" | "cyan" | "success";
};

const stages: Stage[] = [
  {
    key: "incoming",
    label: "Incoming Call",
    detail: "(555) 014-2278 calling…",
    tone: "accent",
    icon: <PhoneIcon />,
  },
  {
    key: "missed",
    label: "Call Missed",
    detail: "You were on a job — no voicemail left",
    tone: "danger",
    icon: <MissedIcon />,
  },
  {
    key: "text",
    label: "AI Texts Back",
    detail: "Reply sent in under 10 seconds",
    tone: "cyan",
    icon: <ChatIcon />,
  },
  {
    key: "qualify",
    label: "Lead Qualified",
    detail: "Job type, location & urgency captured",
    tone: "accent",
    icon: <CheckShieldIcon />,
  },
  {
    key: "book",
    label: "Appointment Booked",
    detail: "Tomorrow, 9:00 AM — you're alerted",
    tone: "success",
    icon: <CalendarIcon />,
  },
];

const toneRing: Record<Stage["tone"], string> = {
  muted: "border-white/15 text-text-muted",
  danger: "border-danger/60 text-danger",
  accent: "border-accent-primary/70 text-accent-primary",
  cyan: "border-accent-secondary/70 text-accent-secondary",
  success: "border-success/70 text-success",
};

const toneGlow: Record<Stage["tone"], string> = {
  muted: "",
  danger: "shadow-[0_0_30px_-8px_rgba(239,68,68,0.6)]",
  accent: "shadow-glow",
  cyan: "shadow-glow-cyan",
  success: "shadow-[0_0_30px_-8px_rgba(16,185,129,0.6)]",
};

export function WorkflowAnimation() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % stages.length);
    }, 1900);
    return () => clearInterval(timer);
  }, [reduce]);

  return (
    <div
      className="glass-strong relative w-full overflow-hidden rounded-3xl p-6 sm:p-8"
      role="img"
      aria-label="Animated workflow: an incoming call is missed, the AI texts the caller back, qualifies the lead, and books an appointment."
    >
      <div className="pointer-events-none absolute inset-0 bg-radial-accent opacity-70" />
      <div className="relative flex flex-col gap-3">
        {stages.map((stage, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <div key={stage.key} className="flex items-stretch gap-4">
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    opacity: isActive || isPast ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.4 }}
                  className={[
                    "grid h-12 w-12 shrink-0 place-items-center rounded-2xl border bg-bg-primary/70",
                    isActive ? toneRing[stage.tone] : "border-white/15 text-text-muted",
                    isActive ? toneGlow[stage.tone] : "",
                  ].join(" ")}
                >
                  {stage.icon}
                </motion.div>
                {i < stages.length - 1 && (
                  <div className="relative my-1 w-px flex-1 bg-white/10">
                    <motion.div
                      className="absolute inset-x-0 top-0 w-px bg-accent-secondary"
                      initial={false}
                      animate={{ height: isPast ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
              <motion.div
                animate={{ opacity: isActive || isPast ? 1 : 0.5 }}
                transition={{ duration: 0.4 }}
                className="flex-1 pb-3 pt-1.5"
              >
                <div className="flex items-center gap-2">
                  <p className="font-heading text-base font-semibold text-text">
                    {stage.label}
                  </p>
                  {isActive && (
                    <motion.span
                      layoutId="workflow-pulse"
                      className={[
                        "h-2 w-2 rounded-full",
                        stage.tone === "danger"
                          ? "bg-danger"
                          : stage.tone === "success"
                            ? "bg-success"
                            : "bg-accent-secondary",
                      ].join(" ")}
                    />
                  )}
                </div>
                <AnimatePresence mode="wait">
                  {(isActive || isPast) && (
                    <motion.p
                      key={`${stage.key}-detail`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-0.5 text-sm text-text-muted"
                    >
                      {stage.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8a13 13 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.4 1 1 0 0 1-.25 1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MissedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8a13 13 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.4 1 1 0 0 1-.25 1Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="m15 3 6 6m0-6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 4v-4H6a2 2 0 0 1-2-2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="m8.5 12 2.2 2.2L15.5 9.5"
        stroke="#07111F"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" fill="currentColor" opacity="0.9" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="#07111F" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="m9 14 2 2 4-4"
        stroke="#07111F"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
