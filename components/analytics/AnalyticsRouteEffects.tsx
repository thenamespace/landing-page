"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { isAnalyticsEnabled } from "@/lib/analytics/client";
import { installClickTracking, observeSections } from "@/lib/analytics/dom-tracking";

/** Link-click tracking (once) and section reach (re-armed on every page). Renders nothing. */
export function AnalyticsRouteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    installClickTracking();
  }, []);

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    // Wait a frame so the new page's sections are in the DOM.
    let stop: (() => void) | undefined;
    const frame = requestAnimationFrame(() => {
      stop = observeSections();
    });
    return () => {
      cancelAnimationFrame(frame);
      stop?.();
    };
  }, [pathname]);

  return null;
}
