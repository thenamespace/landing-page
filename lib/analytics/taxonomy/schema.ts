// GENERATED from webapp/packages/analytics/src by `pnpm --filter @namespace/analytics sync:landing`.
// Do not edit here; change the source and re-run the sync.
/**
 * A tiny, dependency-free property schema. Every event is declared once as runtime data, and from
 * that single declaration we derive:
 *   - the TypeScript type of its properties (`InferProps`), used by the typed `track()` wrappers;
 *   - PostHog event + property definitions (descriptions, property types) pushed by provisioning;
 *   - the generated human-readable catalog (`events-catalog.md`).
 *
 * Kept deliberately small: no validation at runtime, only description + type metadata.
 */

/** PostHog property_definition types. Lists are stored as JSON strings by PostHog. */
export type PropertyType = "String" | "Numeric" | "Boolean" | "DateTime";

export type PropSpec<T, IsOptional extends boolean = boolean> = {
  readonly description: string;
  readonly propertyType: PropertyType;
  readonly values?: readonly (string | number)[];
  readonly isList: boolean;
  readonly isOptional: IsOptional;
  /** Phantom field carrying the inferred value type. Never set at runtime. */
  readonly valueType?: T;
};

const spec = <T>(
  propertyType: PropertyType,
  description: string,
  extra: { values?: readonly (string | number)[]; isList?: boolean } = {},
): PropSpec<T, false> => ({
  description,
  isList: extra.isList ?? false,
  isOptional: false,
  propertyType,
  values: extra.values,
});

export const p = {
  boolean: (description: string) => spec<boolean>("Boolean", description),
  /** ISO-8601 string. */
  datetime: (description: string) => spec<string>("DateTime", description),
  enum: <const V extends readonly string[]>(values: V, description: string) =>
    spec<V[number]>("String", description, { values }),
  list: <T>(item: PropSpec<T, false>, description: string) =>
    spec<T[]>("String", description, { isList: true, values: item.values }),
  number: (description: string) => spec<number>("Numeric", description),
  numberEnum: <const V extends readonly number[]>(
    values: V,
    description: string,
  ) => spec<V[number]>("Numeric", description, { values }),
  optional: <T>(inner: PropSpec<T, false>): PropSpec<T, true> => ({
    ...inner,
    isOptional: true,
  }),
  string: (description: string) => spec<string>("String", description),
};

export type PropsShape = Readonly<Record<string, PropSpec<unknown>>>;

type InferValue<S> = S extends PropSpec<infer T, boolean> ? T : never;
type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type InferProps<S extends PropsShape> = Prettify<
  {
    [K in keyof S as S[K] extends PropSpec<unknown, true>
      ? never
      : K]: InferValue<S[K]>;
  } & {
    [K in keyof S as S[K] extends PropSpec<unknown, true>
      ? K
      : never]?: InferValue<S[K]>;
  }
>;

export type EventSpec<S extends PropsShape = PropsShape> = {
  /** What happened, in one sentence. Pushed to PostHog as the event description. */
  readonly description: string;
  /** Where to fire it: `repo/path:line` plus the condition. Implementation guidance only. */
  readonly trigger: string;
  readonly props: S;
  /** Marks core business events; pushed as `verified` and tagged `critical`. */
  readonly isCritical?: boolean;
};

export const defineEvent = <const S extends PropsShape>(
  event: EventSpec<S>,
): EventSpec<S> => event;

export type EventMap = Readonly<Record<string, EventSpec>>;

export type EventProps<
  M extends EventMap,
  E extends keyof M,
> = M[E] extends EventSpec<infer S> ? InferProps<S> : never;
