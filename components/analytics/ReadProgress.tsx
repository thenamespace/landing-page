"use client";

import { useEffect } from "react";

import { isAnalyticsEnabled, posthog } from "@/lib/analytics/client";
import { track } from "@/lib/analytics/track";

const MILESTONES = [25, 50, 75, 100] as const;
/** A read counts once the reader reached the end and spent this share of the estimated time. */
const MIN_TIME_SHARE = 0.4;

/**
 * Article read depth: fires landing:post_read_progress at 25/50/75/100% of the article body
 * (`.post-prose`, not the whole page) and landing:post_read_complete once it was really read.
 */
export function ReadProgress({ author, readingMinutes }: { author: string; readingMinutes: number }) {
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    const body = document.querySelector(".post-prose");
    if (!body) return;

    posthog.register({ post_author: author });
    const startedAt = Date.now();
    const reached = new Set<number>();
    let completed = false;
    const seconds = () => Math.round((Date.now() - startedAt) / 1000);

    const onScroll = () => {
      const rect = body.getBoundingClientRect();
      const seen = (window.innerHeight - rect.top) / Math.max(rect.height, 1);
      const depth = Math.min(100, Math.max(0, seen * 100));
      for (const milestone of MILESTONES) {
        if (depth < milestone || reached.has(milestone)) continue;
        reached.add(milestone);
        track("landing:post_read_progress", { read_depth: milestone, reading_minutes: readingMinutes, seconds_since_pageview: seconds() });
      }
      if (!completed && reached.has(100) && seconds() >= readingMinutes * 60 * MIN_TIME_SHARE) {
        completed = true;
        track("landing:post_read_complete", { reading_minutes: readingMinutes, seconds_on_post: seconds() });
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Someone who reached the end quickly but keeps reading still completes on the next tick.
    const timer = window.setInterval(onScroll, 5000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(timer);
      posthog.unregister("post_author");
    };
  }, [author, readingMinutes]);

  return null;
}
