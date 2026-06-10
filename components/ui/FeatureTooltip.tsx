"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Info } from "lucide-react";

type FeatureTooltipProps = {
  label: string;
  tooltip: string;
};

/**
 * A feature label with a subtle info icon. Tooltip opens on hover (desktop)
 * or tap (mobile), closes on tap-outside / Escape, and flips above the icon
 * when there isn't enough room below so it never runs off-screen on mobile.
 * No external tooltip library. Uses only useState + useEffect.
 */
export function FeatureTooltip({ label, tooltip }: FeatureTooltipProps) {
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const tipId = useId();

  // Close on outside tap/click or Escape while open.
  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Decide whether to flip the tooltip above the icon (near viewport bottom).
  function updatePlacement() {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setAbove(spaceBelow < 180);
  }

  function showFromHover(pointerType: string) {
    // Only react to real mouse hover; touch is handled via click/tap toggle.
    if (pointerType !== "mouse") return;
    updatePlacement();
    setOpen(true);
  }

  function hideFromHover(pointerType: string) {
    if (pointerType !== "mouse") return;
    setOpen(false);
  }

  function toggle() {
    setOpen((prev) => {
      const next = !prev;
      if (next) updatePlacement();
      return next;
    });
  }

  return (
    <span
      ref={wrapRef}
      className="relative inline"
      onPointerEnter={(e) => showFromHover(e.pointerType)}
      onPointerLeave={(e) => hideFromHover(e.pointerType)}
    >
      <span className="text-text-secondary">{label}</span>
      <button
        ref={btnRef}
        type="button"
        aria-label={`More information about ${label}`}
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
        onFocus={() => {
          updatePlacement();
          setOpen(true);
        }}
        onBlur={() => setOpen(false)}
        className="ml-1 inline-flex translate-y-[2px] rounded text-text-muted transition-colors hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-1 focus-visible:ring-offset-bg-card"
      >
        <Info size={14} aria-hidden="true" />
      </button>

      {open && (
        <span
          id={tipId}
          role="tooltip"
          className={`absolute left-0 z-50 w-max max-w-[260px] rounded-xl border border-line bg-bg-card px-3 py-2 text-sm leading-relaxed text-text-secondary shadow-soft ${
            above ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {tooltip}
        </span>
      )}
    </span>
  );
}
