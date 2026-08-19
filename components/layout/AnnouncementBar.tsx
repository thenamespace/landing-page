"use client";

import { useEffect, useState } from "react";
import { SITE, annDismissedKey, ANN_DISMISSED_VALUE } from "@/lib/site";
import { CAL_HREF, calTriggerProps } from "@/lib/cal";

/**
 * Thin announcement strip pinned above the (fixed) navbar.
 *
 * Layout: the bar is `position: fixed` at the very top. The root layout adds
 * `.has-announcement` to <html> (a plain class, so it works without `:has()`),
 * which pushes the navbar and page content down by `--announcement-h`. Dismissing
 * adds `.ann-dismissed`, collapsing that variable to 0 so the layout snaps back.
 *
 * The CTA is a real link to Cal.com enhanced via `calTriggerProps()` — a warm
 * click opens the in-page modal; cold/modifier/no-JS clicks use the link.
 */
export function AnnouncementBar() {
  const a = SITE.announcement;
  const [dismissed, setDismissed] = useState(false);

  // Session-scoped dismissal: a visitor can close the bar for their current
  // session, but it returns on their next visit — it is never hidden forever,
  // and isn't coupled to bumping `id` when the announcement changes.
  const storageKey = annDismissedKey(a.id);

  // Restore dismissal for this session only (client-only).
  useEffect(() => {
    if (!a.enabled) return;
    try {
      if (window.sessionStorage.getItem(storageKey) === ANN_DISMISSED_VALUE) {
        // Match the pre-paint script: collapse the layout offset and hide the bar.
        document.documentElement.classList.add("ann-dismissed");
        setDismissed(true);
      }
    } catch {
      /* sessionStorage unavailable (private mode, etc.) — just show the bar */
    }
  }, [a.enabled, storageKey]);

  if (!a.enabled || dismissed) return null;

  const dismiss = () => {
    try {
      window.sessionStorage.setItem(storageKey, ANN_DISMISSED_VALUE);
    } catch {
      /* ignore persistence failure */
    }
    // Collapse the offset (--announcement-h → 0) so content slides back up.
    document.documentElement.classList.add("ann-dismissed");
    // Move focus off the disappearing button to a stable landmark.
    document
      .querySelector<HTMLElement>(".navbar2_logo-link")
      ?.focus();
    setDismissed(true);
  };

  return (
    <div
      id="announcement-bar"
      role="region"
      aria-label="Announcement"
      className="fixed inset-x-0 top-0 z-[1001] flex h-[var(--announcement-h)] items-center justify-center gap-x-4 bg-[#5474F6] px-10 text-white"
    >
      <p className="min-w-0 truncate text-xs font-medium sm:text-sm">
        Meet us at <span className="font-semibold">{a.conf}</span>
        <span className="hidden sm:inline"> in {a.city}</span>
        <span className="mx-1.5 opacity-60">·</span>
        {a.dates}
      </p>

      <a
        href={CAL_HREF}
        {...calTriggerProps()}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex shrink-0 items-center gap-x-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2f43a8] transition-colors hover:bg-white/90 sm:text-sm"
      >
        {a.ctaLabel}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        >
          <path
            d="M2.5 6h7M6.5 3l3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M3.5 3.5l7 7M10.5 3.5l-7 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
