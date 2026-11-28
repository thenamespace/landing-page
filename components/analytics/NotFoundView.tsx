"use client";

import { useEffect } from "react";

import { track } from "@/lib/analytics/track";

/** Reports the 404 with the referring host, to find broken inbound links. Renders nothing. */
export function NotFoundView() {
  useEffect(() => {
    const referrerHost = document.referrer ? new URL(document.referrer).hostname : undefined;
    track("landing:not_found_view", { referrer_host: referrerHost });
  }, []);
  return null;
}
