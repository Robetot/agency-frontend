"use client";

import { useEffect, useMemo, useState } from "react";
import { animate, useMotionValue, useMotionValueEvent } from "framer-motion";
import { Slider } from "@/components/ui/Slider";
import { formatCurrency } from "@/lib/utils";

/**
 * Conservative assumption: not every missed caller re-engages with a text.
 * We model a recapture rate so the headline figure stays defensible.
 */
const RECAPTURE_RATE = 0.35;

export function RoiCalculator() {
  const [missedCalls, setMissedCalls] = useState(40);
  const [jobValue, setJobValue] = useState(650);
  const [closeRate, setCloseRate] = useState(35);

  const recovered = useMemo(() => {
    const reEngaged = missedCalls * RECAPTURE_RATE;
    const jobsWon = reEngaged * (closeRate / 100);
    return jobsWon * jobValue;
  }, [missedCalls, jobValue, closeRate]);

  const jobsWon = useMemo(
    () => missedCalls * RECAPTURE_RATE * (closeRate / 100),
    [missedCalls, closeRate],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
      {/* Inputs */}
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-8">
          <Slider
            label="Missed calls / month"
            min={5}
            max={200}
            step={5}
            value={missedCalls}
            onChange={setMissedCalls}
          />
          <Slider
            label="Average job value"
            min={200}
            max={5000}
            step={50}
            value={jobValue}
            onChange={setJobValue}
            format={(v) => formatCurrency(v)}
          />
          <Slider
            label="Close rate"
            min={5}
            max={90}
            step={1}
            value={closeRate}
            onChange={setCloseRate}
            format={(v) => `${v}%`}
          />
        </div>
        <p className="mt-8 text-xs leading-relaxed text-text-muted">
          Estimate assumes ~{Math.round(RECAPTURE_RATE * 100)}% of missed callers
          re-engage when they receive an instant text back. Your results will vary by
          market, trade, and response time. This is an illustration, not a guarantee.
        </p>
      </div>

      {/* Output */}
      <div className="glass-strong relative flex flex-col justify-center overflow-hidden rounded-2xl p-6 text-center sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-radial-accent" />
        <div className="relative">
          <p className="text-sm font-medium uppercase tracking-wide text-text-muted">
            Potential monthly revenue recovered
          </p>
          <p className="mt-3 font-heading text-5xl font-bold text-gradient-accent sm:text-6xl">
            <AnimatedNumber value={recovered} format={formatCurrency} />
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Stat
              label="Jobs recovered / mo"
              value={<AnimatedNumber value={jobsWon} format={(v) => Math.round(v).toString()} />}
            />
            <Stat
              label="Annualized"
              value={<AnimatedNumber value={recovered * 12} format={formatCurrency} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="font-heading text-2xl font-semibold text-text tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-text-muted">{label}</p>
    </div>
  );
}

function AnimatedNumber({
  value,
  format,
}: {
  value: number;
  format: (value: number) => string;
}) {
  const mv = useMotionValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [value, mv]);

  useMotionValueEvent(mv, "change", (latest) => setDisplay(latest));

  return <span aria-live="polite">{format(display)}</span>;
}
