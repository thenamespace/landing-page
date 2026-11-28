// GENERATED from webapp/packages/analytics/src by `pnpm --filter @namespace/analytics sync:landing`.
// Do not edit here; change the source and re-run the sync.
import { landingEvents } from "./landing";
import type { EventMap, EventProps, InferProps } from "./schema";
import type { landingSuperProps, personSetOnceProps, personSetProps } from "./shared";

export { landingEvents };

export type LandingEventName = keyof typeof landingEvents;
export type LandingEventProps<E extends LandingEventName> = EventProps<typeof landingEvents, E>;
export type LandingSuperProps = InferProps<typeof landingSuperProps>;
export type PersonSetProps = Partial<InferProps<typeof personSetProps>>;
export type PersonSetOnceProps = Partial<InferProps<typeof personSetOnceProps>>;

export type Track<M extends EventMap> = <E extends keyof M & string>(event: E, props: EventProps<M, E>) => void;
