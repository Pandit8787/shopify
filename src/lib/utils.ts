import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { currencySymbols, useUIStore } from "@/stores/ui";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = useUIStore.getState().currency) {
  const symbol = currencySymbols[currency] ?? "$";
  return `${symbol}${value.toLocaleString("en-US", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

export function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(s: string, n = 120) {
  if (s.length <= n) return s;
  return s.slice(0, n - 1) + "…";
}

export function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function isImage(url: string) {
  return /\.(jpe?g|png|gif|webp|svg|avif)(\?|$)/i.test(url) || url.startsWith("data:image") || url.startsWith("https://images.unsplash.com");
}
