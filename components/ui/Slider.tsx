"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type SliderProps = {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  /** Formats the value shown next to the label, e.g. currency or %. */
  format?: (value: number) => string;
  className?: string;
};

export function Slider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  format,
  className,
}: SliderProps) {
  const id = useId();
  const percent = ((value - min) / (max - min)) * 100;
  const display = format ? format(value) : String(value);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
        </label>
        <span className="font-heading text-lg font-semibold text-accent-secondary tabular-nums">
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={display}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-accent-secondary [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-secondary [&::-webkit-slider-thumb]:shadow-glow-cyan"
        style={{
          background: `linear-gradient(to right, #3B82F6 0%, #22D3EE ${percent}%, rgba(255,255,255,0.1) ${percent}%, rgba(255,255,255,0.1) 100%)`,
        }}
      />
    </div>
  );
}
