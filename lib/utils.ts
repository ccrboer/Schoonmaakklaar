import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 *
 * @example cn("px-2", isActive && "bg-blue-500", "px-4") // -> "bg-blue-500 px-4"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Euro currency using Belgian (Flemish) conventions.
 *
 * @example formatCurrency(1250) // -> "€ 1.250,00"
 */
export function formatCurrency(
  amount: number,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    ...options,
  }).format(amount);
}

/**
 * Build an absolute URL from a path and the site's base URL.
 */
export function absoluteUrl(path: string, baseUrl: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl.replace(/\/$/, "")}${normalizedPath}`;
}
