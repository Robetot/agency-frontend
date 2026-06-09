/** Tiny className combiner — avoids a clsx dependency for this small surface. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number): string {
  return currency.format(Math.max(0, Math.round(value)));
}
