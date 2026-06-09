"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

type CountUpProps = {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
};

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.4,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(to);
      return;
    }
    const controls = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, reduce, to, duration, mv]);

  useMotionValueEvent(mv, "change", (latest) => setDisplay(latest));

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
