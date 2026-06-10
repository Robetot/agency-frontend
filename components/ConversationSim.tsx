"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { BRAND_NAME } from "@/lib/site";

type Sender = "ai" | "lead";
type Message = {
  from: Sender;
  text: string;
  /** Optional badge rendered above the bubble (e.g. urgency flag). */
  tag?: { label: string; tone: "priority" | "info" };
};

const thread: Message[] = [
  {
    from: "ai",
    text: `Hi, this is the ${BRAND_NAME} assistant for Rapid Plumbing. Sorry we missed your call! How can we help?`,
  },
  { from: "lead", text: "My water heater is leaking all over the garage floor 😩" },
  {
    from: "ai",
    text: "Oh no — let's get someone out fast. What ZIP code is the property in?",
  },
  { from: "lead", text: "80238" },
  {
    from: "ai",
    text: "You're inside our service area. Is water actively flooding right now, or can it wait for a scheduled visit?",
    tag: { label: "ZIP verified", tone: "info" },
  },
  { from: "lead", text: "Still leaking, it's getting worse" },
  {
    from: "ai",
    text: "Got it — flagging this as priority. I have two openings: Today 4:00 PM or Tomorrow 9:00 AM. Which works better?",
    tag: { label: "Priority lead", tone: "priority" },
  },
  { from: "lead", text: "Today at 4 please" },
  {
    from: "ai",
    text: "Booked for today at 4:00 PM ✅ A licensed tech will text before arrival, and we've alerted the on-call team. You're all set!",
  },
];

const TYPING_MS = 1100;
const READ_MS = 750;

export function ConversationSim() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();

  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    setCount(0);
    setTyping(false);
    setDone(false);

    let delay = 400;
    let shown = 0;

    const scheduleNext = () => {
      if (shown >= thread.length) {
        timers.current.push(setTimeout(() => setDone(true), 300));
        return;
      }
      const msg = thread[shown];
      if (msg.from === "ai") {
        timers.current.push(
          setTimeout(() => setTyping(true), delay),
        );
        delay += TYPING_MS;
        timers.current.push(
          setTimeout(() => {
            setTyping(false);
            setCount((c) => c + 1);
            shown += 1;
            scheduleNext();
          }, delay),
        );
        delay = 0;
      } else {
        timers.current.push(
          setTimeout(() => {
            setCount((c) => c + 1);
            shown += 1;
            scheduleNext();
          }, delay + READ_MS),
        );
        delay = 0;
      }
    };
    scheduleNext();
  }, [clearTimers]);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(thread.length);
      setDone(true);
      return;
    }
    play();
    return clearTimers;
  }, [inView, reduce, play, clearTimers]);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-sm">
      <div className="glass-strong relative overflow-hidden rounded-[24px] border-line p-3 shadow-soft">
        {/* Phone header */}
        <div className="flex items-center justify-between rounded-2xl bg-bg-secondary px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-accent-primary text-sm font-bold text-[#FAF8F5]">
              RP
            </div>
            <div>
              <p className="text-sm font-semibold text-text">Rapid Plumbing</p>
              <p className="text-xs text-success">● Auto-reply active</p>
            </div>
          </div>
          <span className="text-xs text-text-muted">SMS</span>
        </div>

        {/* Thread */}
        <div
          className="flex h-[26rem] flex-col gap-2.5 overflow-hidden px-1 py-4"
          aria-live="polite"
          aria-label="Simulated text conversation between an AI assistant and a plumbing customer"
        >
          <AnimatePresence initial={false}>
            {thread.slice(0, count).map((msg, i) => (
              <Bubble key={i} msg={msg} />
            ))}
          </AnimatePresence>
          {typing && <TypingIndicator />}
          <div className="mt-auto" />
        </div>

        {done && !reduce && (
          <div className="px-2 pb-2">
            <button
              type="button"
              onClick={play}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-bg-secondary py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-line hover:text-text"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 12a8 8 0 1 1 2.3 5.6M4 12V7m0 5h5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Replay conversation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Message }) {
  const isAi = msg.from === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${isAi ? "items-start" : "items-end"}`}
    >
      {msg.tag && (
        <span
          className={`mb-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            msg.tag.tone === "priority"
              ? "animate-pulse-ring bg-danger/15 text-danger"
              : "bg-accent-primary/10 text-accent-primary"
          }`}
        >
          {msg.tag.tone === "priority" && (
            <span className="h-1.5 w-1.5 rounded-full bg-danger" aria-hidden="true" />
          )}
          {msg.tag.label}
        </span>
      )}
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isAi
            ? "rounded-bl-md bg-accent-primary text-[#FAF8F5]"
            : "rounded-br-md border border-line bg-bg-secondary text-text"
        }`}
      >
        {msg.text}
      </div>
      <span className="mt-1 px-1 text-[10px] uppercase tracking-wide text-text-muted">
        {isAi ? "AI assistant" : "Caller"}
      </span>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-accent-primary/15 px-4 py-3"
      style={{ width: "fit-content" }}
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-accent-primary"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </motion.div>
  );
}
