import posthog from "posthog-js";

import { SITE } from "@/lib/site";

import { detectAppEnv, pageContext } from "./page-context";
import { TAXONOMY_VERSION } from "./taxonomy/shared";

let enabled = false;

export const isAnalyticsEnabled = () => enabled;

/** Properties that must never leave the browser, even if a call site passes them by mistake. */
const FORBIDDEN_PROPS = ["email", "name", "attendee", "attendees"];

/**
 * Starts PostHog (EU project, through the t.namespace.ninja managed proxy). Off without a key and
 * in local development. Runs from instrumentation-client.ts, before the app hydrates.
 */
export function initAnalytics() {
  if (enabled || typeof window === "undefined" || !SITE.posthog.key) return;
  if (process.env.NODE_ENV !== "production" || detectAppEnv(window.location.hostname) === "development") return;

  posthog.init(SITE.posthog.key, {
    api_host: SITE.posthog.host,
    autocapture: { capture_copied_text: false },
    before_send: (event) => {
      if (!event) return null;
      for (const key of FORBIDDEN_PROPS) delete event.properties[key];
      // Page context on every event, so autocapture and $pageview are sliceable by page.
      const url = event.properties.$current_url;
      if (typeof url === "string") Object.assign(event.properties, pageContext(new URL(url).pathname));
      return event;
    },
    capture_dead_clicks: true,
    capture_exceptions: { capture_unhandled_errors: true, capture_unhandled_rejections: true },
    capture_heatmaps: true,
    capture_pageleave: true,
    capture_pageview: "history_change",
    capture_performance: { network_timing: true, web_vitals: true, web_vitals_attribution: true },
    cross_subdomain_cookie: true,
    custom_campaign_params: ["ref", "via"],
    defaults: "2026-08-30",
    person_profiles: "identified_only",
    rageclick: true,
    session_recording: { maskAllInputs: true, recordBody: false, recordHeaders: false },
    ui_host: "https://eu.posthog.com",
  });
  posthog.register({
    app: "landing",
    app_env: detectAppEnv(window.location.hostname),
    taxonomy_version: TAXONOMY_VERSION,
  });
  enabled = true;
}

export { posthog };
