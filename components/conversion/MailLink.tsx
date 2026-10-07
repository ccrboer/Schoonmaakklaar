"use client";

import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface MailLinkProps {
  /** Zichtbaar label. Valt terug op het e-mailadres zelf. */
  label?: string;
  /** Toon het envelop-icoon. */
  withIcon?: boolean;
  className?: string;
}

/** E-maillink met het adres uit de siteconfig, inclusief event-tracking. */
export function MailLink({
  label,
  withIcon = true,
  className,
}: MailLinkProps) {
  const { email } = siteConfig.contact;

  // Zonder e-mailadres verschijnt er geen mailto-link.
  if (!email) return null;

  return (
    <a
      href={`mailto:${email}`}
      onClick={() => trackEvent("email_click")}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {withIcon && <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />}
      <span>{label ?? email}</span>
    </a>
  );
}
