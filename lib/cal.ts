import type { MouseEvent } from "react";

import { placementOf, type CtaPlacement } from "@/lib/analytics/placement";
import { track } from "@/lib/analytics/track";

/**
 * Cal.com booking integration — single source of truth.
 *
 * Booking triggers are plain `<a href={CAL_HREF}>` links. Spread
 * `calTriggerProps()` onto one to enhance it: hovering/focusing warms the embed,
 * and a plain click opens the in-page booking modal. Anything we don't handle
 * (modifier clicks, no-JS, or a click before the embed has warmed) falls back to
 * the real link — so a booking CTA is never a dead click. The embed chunk is
 * loaded on demand, so pages without a CTA never download it.
 */

/** The Cal event slug. Change this in one place to repoint every booking CTA. */
export const CAL_SLUG = "thecap.eth/discovery";
/** Public booking URL, derived from the slug — used as the link/fallback. */
export const CAL_HREF = `https://cal.com/${CAL_SLUG}`;

const CAL_BRAND = "#5474F6";

// Theme/brand applied to the modal (set once via cal("ui")).
const CAL_UI_CONFIG = {
  theme: "dark",
  cssVarsPerTheme: {
    light: { "cal-brand": CAL_BRAND },
    dark: { "cal-brand": CAL_BRAND },
  },
  hideEventTypeDetails: false,
  layout: "month_view",
};

const CAL_MODAL_CONFIG = { layout: "month_view", theme: "dark" };

type CalApi = (action: string, config?: Record<string, unknown>) => void;

type CalEvent = { detail?: { data?: { startTime?: string; endTime?: string } } };

// Where the last booking was started from, for the Cal callbacks (which carry no DOM context).
let lastSource: CtaPlacement = "page_body";
let openedAt = 0;
let bookedThisOpen = false;

const minutesBetween = (start?: string, end?: string) => {
  const ms = start && end ? Date.parse(end) - Date.parse(start) : Number.NaN;
  return Number.isFinite(ms) && ms > 0 ? Math.round(ms / 60_000) : undefined;
};

/** Cal embed callbacks → booking funnel. Attendee details in the payload are never forwarded. */
function listenToCal(api: CalApi) {
  api("on", { action: "linkReady", callback: () => track("landing:book_call_view", { call_source: lastSource }) });
  api("on", { action: "linkFailed", callback: () => track("landing:book_call_fail", { failure_reason: "link_failed" }) });
  const onBooked = (event: CalEvent) => {
    if (bookedThisOpen) return; // Cal emits both the legacy and the V2 success event.
    bookedThisOpen = true;
    track("landing:book_call_complete", {
      call_source: lastSource,
      event_duration_min: minutesBetween(event.detail?.data?.startTime, event.detail?.data?.endTime),
      seconds_since_open: openedAt ? Math.round((Date.now() - openedAt) / 1000) : undefined,
    });
  };
  api("on", { action: "bookingSuccessfulV2", callback: onBooked });
  api("on", { action: "bookingSuccessful", callback: onBooked });
}

let calApiPromise: Promise<CalApi> | null = null;
// Synchronous "is the embed warmed and ready to open instantly?" flag. Used to
// decide, at click time, whether to open the modal or let the link through.
let calReady = false;

function loadCal(): Promise<CalApi> {
  if (!calApiPromise) {
    calApiPromise = import("@calcom/embed-react")
      .then((m) => m.getCalApi())
      .then((cal) => {
        const api = cal as unknown as CalApi;
        api("ui", CAL_UI_CONFIG);
        listenToCal(api);
        calReady = true;
        return api;
      })
      .catch((err) => {
        calApiPromise = null; // allow a retry on the next interaction
        throw err;
      });
  }
  return calApiPromise;
}

/**
 * Warm the embed (hover/focus). Fire-and-forget: it never rejects to the caller,
 * so it's safe to use directly as an event handler without leaking an unhandled
 * promise rejection when the chunk fails to load.
 */
function warmCal(): void {
  void loadCal().catch(() => {});
}

function openCalModal(): void {
  loadCal()
    .then((cal) => cal("modal", { calLink: CAL_SLUG, config: CAL_MODAL_CONFIG }))
    .catch(() => {
      track("landing:book_call_fail", { failure_reason: "embed_error" });
      window.open(CAL_HREF, "_blank", "noopener,noreferrer");
    });
}

function handleCalClick(e: MouseEvent<HTMLAnchorElement>): void {
  lastSource = placementOf(e.currentTarget);
  openedAt = Date.now();
  bookedThisOpen = false;
  const modifier = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
  track("landing:book_call_open", {
    call_source: lastSource,
    open_mode: modifier ? "new_tab" : calReady ? "modal" : "new_tab_fallback",
    was_prewarmed: calReady,
  });
  // Let the browser handle "open in a new tab/window" intents.
  if (modifier) return;
  // Not warmed yet → don't hijack the click. The real link opens the booking
  // page (never a dead click); warm the embed so the next click uses the modal.
  if (!calReady) {
    warmCal();
    return;
  }
  e.preventDefault();
  openCalModal();
}

/**
 * Props to spread onto an `<a href={CAL_HREF}>` booking trigger — the single
 * source of truth for the click + hover/focus-preload wiring.
 */
export function calTriggerProps() {
  return {
    // Marks the link so the global click tracker leaves book_call_open to this module.
    "data-ph-cal": "1",
    onClick: handleCalClick,
    onMouseEnter: warmCal,
    onFocus: warmCal,
  };
}
