import type { MouseEvent } from "react";

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
    .catch(() => window.open(CAL_HREF, "_blank", "noopener,noreferrer"));
}

function handleCalClick(e: MouseEvent<HTMLAnchorElement>): void {
  // Let the browser handle "open in a new tab/window" intents.
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
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
    onClick: handleCalClick,
    onMouseEnter: warmCal,
    onFocus: warmCal,
  };
}
