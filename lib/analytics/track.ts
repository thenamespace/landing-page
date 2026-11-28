import { isAnalyticsEnabled, posthog } from "./client";
import type { landingEvents, PersonSetOnceProps, PersonSetProps, Track } from "./taxonomy/catalog";

/** Typed capture: unknown events or wrong property shapes fail to compile. No-op when disabled. */
export const track: Track<typeof landingEvents> = (event, props) => {
  if (!isAnalyticsEnabled()) return;
  posthog.capture(event, props);
};

/** Same as track, but sent immediately with sendBeacon: use right before the page navigates away. */
export const trackBeforeUnload: Track<typeof landingEvents> = (event, props) => {
  if (!isAnalyticsEnabled()) return;
  posthog.capture(event, props, { send_instantly: true, transport: "sendBeacon" });
};

export function setPersonProps(set: PersonSetProps, setOnce?: PersonSetOnceProps) {
  if (!isAnalyticsEnabled()) return;
  posthog.setPersonProperties(set, setOnce);
}
