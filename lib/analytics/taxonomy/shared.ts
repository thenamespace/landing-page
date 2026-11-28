// GENERATED from webapp/packages/analytics/src by `pnpm --filter @namespace/analytics sync:landing`.
// Do not edit here; change the source and re-run the sync.
/**
 * Enums, super properties, person properties and reusable property groups shared by the landing
 * page and the webapp. Literal values mirror the codebases (see research/map/*.md).
 */
import { p } from "./schema";

/** Bump when an event's meaning changes; registered as a super property on every event. */
export const TAXONOMY_VERSION = 1;

export const apps = ["landing", "webapp"] as const;
export const appEnvs = [
  "production",
  "staging",
  "preview",
  "development",
] as const;
/** `webapp/packages/sdk/src/models/chains.ts` */
export const supportedChains = [
  "mainnet",
  "sepolia",
  "base",
  "baseSepolia",
  "optimism",
] as const;
export const networks = ["mainnet", "testnet"] as const;
export const ensVersions = [1, 2] as const;
export const ensProtocols = ["v1", "v2"] as const;

// ── Super properties (registered with posthog.register, present on every event) ──────────────

export const commonSuperProps = {
  app: p.enum(apps, "Which product emitted the event."),
  app_env: p.enum(
    appEnvs,
    "Deployment environment, derived from hostname / env at init.",
  ),
  taxonomy_version: p.number(
    "Version of this tracking plan the client was built against.",
  ),
} as const;

/** Landing: derived from `$pathname` in `before_send`, so autocapture and $pageview get them too. */
export const landingPageTypes = [
  "home",
  "about",
  "blog_index",
  "blog_post",
  "solution",
  "legal",
  "not_found",
] as const;

export const landingSuperProps = {
  ...commonSuperProps,
  is_case_study: p.optional(
    p.boolean("True when the blog post slug starts with case-study-."),
  ),
  page_type: p.enum(
    landingPageTypes,
    "Kind of marketing page the event happened on.",
  ),
  post_author: p.optional(
    p.string("Blog post author key (Cap, Happy) when on a post."),
  ),
  post_slug: p.optional(
    p.string("Blog post slug when page_type is blog_post."),
  ),
  solution_slug: p.optional(
    p.enum(
      [
        "wallets",
        "l2s-rollups",
        "fintechs-neobanks",
        "waas",
        "decentralized-websites",
        "ai-agents",
        "universal-usernames",
      ],
      "Solution page slug when page_type is solution.",
    ),
  ),
} as const;

export const webappSuperProps = {
  ...commonSuperProps,
  flag_ens_v2_enabled: p.boolean("VITE_ENABLE_ENS_V2."),
  flag_ens_v2_issuing_paused: p.boolean("VITE_ENS_V2_ISSUING_PAUSED."),
  flag_v2_widget_enabled: p.boolean("VITE_ENABLE_V2_WIDGET."),
  is_siwe_signed_in: p.boolean(
    "A valid SIWE session exists for the connected address.",
  ),
  is_wallet_connected: p.boolean("Wallet connected at the time of the event."),
  network: p.enum(networks, "VITE_NETWORK of the build."),
  route_id: p.optional(
    p.string(
      "TanStack route fullPath, e.g. /ens/$name. Masks hide it from $pathname.",
    ),
  ),
  wallet_chain_id: p.optional(p.number("Chain id the wallet is on.")),
  wallet_connector: p.optional(
    p.string("wagmi connector name, e.g. MetaMask, WalletConnect."),
  ),
} as const;

// ── Person properties ($set / $set_once) ─────────────────────────────────────────────────────

export const personSetProps = {
  has_activated_ensv2_listing: p.boolean("Ever completed an ENSv2 activation."),
  has_api_key: p.boolean("Ever created an API key."),
  has_avatar: p.boolean("Primary name has an avatar record."),
  has_ensv1_listing: p.boolean("Ever submitted an ENSv1 listing."),
  has_offchain_subnames: p.boolean("Ever created an offchain subname."),
  has_primary_name: p.boolean("Primary name is set."),
  has_universal_usernames: p.boolean(
    "Ever went live with Universal Usernames.",
  ),
  has_widget: p.boolean("Ever created a widget."),
  is_newsletter_subscriber: p.boolean(
    "Subscribed through a landing page form.",
  ),
  network_last: p.enum(networks, "Network of the latest session."),
  owned_ens_name_count: p.number("ENS names owned (names panel count)."),
  owned_subname_count: p.number("Subnames owned."),
  primary_ens_name: p.optional(
    p.string("Reverse-resolved primary name, if any."),
  ),
  wallet_address: p.string(
    "Lowercased connected address (also the distinct_id).",
  ),
  wallet_connector_last: p.string("Connector used on the latest connect."),
} as const;

export const personSetOnceProps = {
  first_app_seen_at: p.datetime("First webapp event."),
  first_core_action: p.string("Event name of the first core value action."),
  first_core_action_at: p.datetime(
    "When the first core value action happened.",
  ),
  first_landing_seen_at: p.datetime("First landing page event."),
  first_wallet_connected_at: p.datetime("First wallet connect."),
  first_wallet_connector: p.string("Connector used on the first connect."),
  newsletter_subscribed_at: p.datetime("First successful newsletter signup."),
} as const;

// ── Reusable property groups ─────────────────────────────────────────────────────────────────

export const nameProps = {
  label_length: p.number("Character length of the first label."),
  name: p.string(
    "Full ENS name, e.g. alice.eth or bob.alice.eth (public onchain data).",
  ),
} as const;

export const subnameProps = {
  full_name: p.string("Full subname, e.g. bob.alice.eth."),
  label: p.string("Subname label, e.g. bob."),
  label_length: p.number("Character length of the label."),
  parent_name: p.string("Parent name, e.g. alice.eth."),
} as const;

export const errorProps = {
  error_code: p.optional(
    p.string("Error class / code, e.g. ContractFunctionRevertedError, 4001."),
  ),
  error_message: p.optional(
    p.string("First 200 chars of the short message. Never includes PII."),
  ),
  is_user_rejection: p.boolean("Wallet user rejected / denied the request."),
} as const;

export const durationProps = {
  duration_ms: p.optional(
    p.number("Milliseconds since the matching *_open / *_start event."),
  ),
} as const;
