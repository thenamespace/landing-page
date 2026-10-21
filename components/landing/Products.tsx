import { WebflowButton } from "@/components/ui/WebflowButton";
import { TrySketch } from "@/components/landing/NameTry";

/*
 * Products and Services, structured as the two decisions every customer makes:
 *   01. Which kind of names to issue (offchain vs onchain) - side by side, same spec rows
 *   02. How to ship them - lanes ordered by how much code you write, ending with "we build it"
 * Every product is visible at once. Anchor ids are kept because the navbar and llms.txt link to them.
 */

export const BOOK_CALL = "https://cal.com/thecap.eth/discovery";

/* ---------- 01: the names ---------- */

/* ---------- 02: how you ship ---------- */

interface Tool {
  id?: string;
  title: string;
  description: string;
  href: string;
  /** Brand logo for products with their own identity, otherwise a line icon of what it does */
  icon: React.ReactNode;
  badge?: "new" | "soon";
  /** Spans the full width of its lane */
  wide?: boolean;
}

export interface Lane {
  num: string;
  name: string;
  who: string;
  tools: Tool[];
}

export const LANES: Lane[] = [
  {
    num: "A",
    name: "No code",
    who: "Ship in minutes",
    tools: [
      {
        id: "offchain-subnames",
        title: "Offchain Subnames",
        description: "Free at any volume. No gas, no contracts.",
        href: "https://app.namespace.ninja/offchain",
        icon: <CloudIcon />,
      },
      {
        id: "onchain-subnames",
        title: "Onchain Subnames",
        description: "Minted on Ethereum, Base or Optimism, held as an NFT.",
        href: "https://app.namespace.ninja/onchain",
        icon: <LinkIcon />,
      },
      {
        id: "ens-widget",
        title: "ENS Widget",
        description: "Add ENS name and subname registration to any website or app in minutes.",
        href: "https://app.namespace.ninja/widgets",
        icon: <WidgetIcon />,
      },
      {
        id: "ens-diamonds",
        title: "ENS Diamonds",
        description: "Pool funds with friends to collectively purchase and own premium ENS names.",
        href: "https://ens.diamonds",
        icon: <LogoImg src="/assets/images/logos/ens-diamonds.png" />,
      },
    ],
  },
  {
    num: "B",
    name: "Low code",
    who: "Ship in hours",
    tools: [
      {
        id: "ens-components",
        title: "ENS Components",
        description: "Ready-to-use React components for integrating ENS registrations, profiles, and record management.",
        href: "https://enscomponents.com/",
        icon: <ComponentsIcon />,
      },
      {
        id: "subpages",
        title: "Subpages",
        description: "Launch your own branded ENS subname registration website in minutes, with no coding required.",
        href: "https://github.com/thenamespace/subpages",
        icon: <SubpagesIcon />,
      },
      {
        id: "ens-mcp",
        title: "ENS MCP",
        description: "Give AI agents the ability to look up, understand, and interact with ENS names.",
        href: "https://github.com/thenamespace/ens-mcp",
        icon: <McpIcon />,
      },
    ],
  },
  {
    num: "C",
    name: "Full code",
    who: "Ship at your own pace",
    tools: [
      {
        id: "subname-dev",
        title: "subname.dev",
        description: "Deploy complete ENS subname infrastructure on any supported L2 chain.",
        href: "https://subname.dev",
        badge: "soon",
        icon: <LayersIcon />,
      },
      {
        id: "ens-forge",
        title: "ENS Forge",
        description: "An open-source developer toolkit for building with ENSv1 and ENSv2 through a unified SDK.",
        href: "https://ensforge.com",
        badge: "new",
        icon: <LogoImg src="/assets/images/logos/ens-forge.svg" />,
      },
      {
        id: "resolvio",
        title: "Resolvio",
        description: "A fast, reliable API for resolving ENS names, addresses, and records at scale.",
        href: "https://resolvio.xyz/",
        icon: <LogoImg src="/assets/images/logos/resolvio.svg" solid />,
      },
      {
        id: "sdk-api",
        title: "SDK / API",
        description: "Everything developers need to create, manage, and integrate ENS subnames at scale.",
        href: "https://docs.namespace.ninja/developer-guide/sdks/introduction",
        icon: <SdkIcon />,
      },
      {
        id: "namera",
        title: "Namera",
        description: "Secure agent wallets with programmable onchain policies.",
        href: "https://namera.ai",
        icon: <NameraLogo />,
      },
    ],
  },
];

/* ---------- icons ---------- */

function CloudIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 15.5a3.5 3.5 0 0 1-.3-7 4.5 4.5 0 0 1 8.7-.6 3.5 3.5 0 0 1-.4 7.6Z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8.5 11.5l3-3" />
      <path d="M9.5 6l1.2-1.2a3 3 0 0 1 4.3 4.3L13.8 10.3" />
      <path d="M10.5 14l-1.2 1.2A3 3 0 0 1 5 10.9L6.2 9.7" />
    </svg>
  );
}

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* Brand logos are shown in black and white to match the section. solid flattens a one-colour logo to black. */
function LogoImg({ src, solid }: { src: string; solid?: boolean }) {
  return <img src={src} alt="" width={20} height={20} loading="lazy" decoding="async" className={`prow-logo${solid ? " is-solid" : ""}`} />;
}

/* Namera's official mark, from the namera.ai header */
function NameraLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 149" fill="currentColor" aria-hidden="true">
      <path d="M52.9445 21.4688H0V42.6488H52.9445V21.4688Z" />
      <path d="M137.233 63.5289H158.413V0H52.5352V21.18H105.468V42.3489H52.5352V63.5289H105.468V84.709H52.5352V105.878H105.468V127.058H52.5352V148.238H158.413V84.709H137.233V63.5289Z" />
      <path d="M52.9445 63.8218H0V85.0018H52.9445V63.8218Z" />
      <path d="M52.9445 106.164H0V127.344H52.9445V106.164Z" />
      <path d="M180 63.8218H158.82V85.0018H180V63.8218Z" />
    </svg>
  );
}

function ComponentsIcon() {
  return (
    <svg {...iconProps}>
      <path d="M10 1.9L12.6 4.5L10 7.1L7.4 4.5L10 1.9Z" />
      <path d="M15.5 7.4L18.1 10L15.5 12.6L12.9 10L15.5 7.4Z" />
      <path d="M4.5 7.4L7.1 10L4.5 12.6L1.9 10L4.5 7.4Z" />
      <path d="M10 12.9L12.6 15.5L10 18.1L7.4 15.5L10 12.9Z" />
    </svg>
  );
}

function WidgetIcon() {
  return (
    <svg {...iconProps}>
      <path d="M10 2.5V16.67C10 17.13 9.63 17.5 9.17 17.5H4.17C3.25 17.5 2.5 16.75 2.5 15.83V4.17C2.5 3.25 3.25 2.5 4.17 2.5H15.83C16.75 2.5 17.5 3.25 17.5 4.17V9.17C17.5 9.63 17.13 10 16.67 10H2.5" />
      <path d="M15.41 12.47V18.13M12.59 15.3H18.24" />
    </svg>
  );
}

function SubpagesIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2.5" y="3.33" width="15" height="13.33" rx="1.67" />
      <path d="M2.5 7.08H17.5" />
      <path d="M5 5.21H5.01M7.08 5.21H7.09" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg {...iconProps}>
      <path d="M10.83 11.45C10.32 11.75 9.68 11.75 9.17 11.45L2.08 7.39C1.53 7.08 1.53 6.25 2.08 5.94L9.17 1.88C9.68 1.59 10.32 1.59 10.83 1.88L17.92 5.94C18.47 6.25 18.47 7.08 17.92 7.39L10.83 11.45Z" />
      <path d="M16.67 11.9L17.92 12.61C18.47 12.92 18.47 13.75 17.92 14.06L10.83 18.12C10.32 18.41 9.68 18.41 9.17 18.12L2.08 14.06C1.53 13.75 1.53 12.92 2.08 12.61L3.33 11.9" />
    </svg>
  );
}

function McpIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2.5" y="4.17" width="15" height="11.67" rx="1.67" />
      <path d="M6.67 8.33L9.17 10.83L6.67 13.33" />
      <path d="M10.83 13.33H13.33" />
    </svg>
  );
}

function SdkIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6.67 2.5H5.83C4.91 2.5 4.17 3.25 4.17 4.17V8.33C4.17 9.25 3.42 10 2.5 10C3.42 10 4.17 10.75 4.17 11.67V15.83C4.17 16.75 4.92 17.5 5.83 17.5H6.67" />
      <path d="M13.33 17.5H14.17C15.09 17.5 15.83 16.75 15.83 15.83V11.67C15.83 10.75 16.58 10 17.5 10C16.58 10 15.83 9.25 15.83 8.33V4.17C15.83 3.25 15.09 2.5 14.17 2.5H13.33" />
    </svg>
  );
}

/* ---------- component ---------- */

export function ToolBadge({ kind }: { kind: "new" | "soon" }) {
  return kind === "soon" ? <span className="pstack-new is-soon">Coming soon</span> : <span className="pstack-new">New</span>;
}

export function ArrowUpRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Section heading. */
export function ProductsTop() {
  return (
    <>
      {/* Heading */}
      <div className="component_heading">
        <div data-wf--component-tag--variant="dark" className="tag w-variant-b6bce3ac-5c2a-b1ee-66d6-218f87a88dd1">
          <div>Products and Services</div>
        </div>
        <h2>Build with ENS</h2>
        <div className="max-width-medium">
          <p className="text-weight-medium is-linespace-smaller text-color-black-900">
            ENS usernames for wallets, apps, chains, and agents. Onchain or offchain.
          </p>
        </div>
      </div>

    </>
  );
}

export function Products() {
  return (
    <section className="section_products">
      <div padding-global="" className="section-inner-background is-bottom-only background-color-secondary">
        <div container="large" className="padding-section-large is-small-mobile">
          <div className="pstack">
            <ProductsTop />

            {/* How you ship: lanes from no code to done for you */}
            <div className="pstack-block">

              <div className="pstack-axis" aria-hidden="true">
                <span>Less code, faster launch</span>
                <span className="pstack-axis-line" />
                <span>More code, more control</span>
              </div>

              {/* One panel per lane, tools as rows */}
              <div className="prows">
                {LANES.map((lane) => (
                  <div key={lane.name} className="prows-lane">
                    <div className="prows-head">
                      <h3>{lane.name}</h3>
                      <p>{lane.who}</p>
                    </div>
                    <div className="prows-panel">
                      {lane.tools.map((t) => (
                        <a key={t.title} id={t.id} href={t.href} target="_blank" rel="noopener noreferrer" className="prow">
                          <span className="prow-icon">{t.icon}</span>
                          <span className="prow-text">
                            <span className="prow-title">
                              {t.title}
                              {t.badge && <ToolBadge kind={t.badge} />}
                            </span>
                            {/* Rolls out on hover or keyboard focus; always shown on touch screens */}
                            <span className="prow-desc">
                              <span>{t.description}</span>
                            </span>
                          </span>
                          <span className="prow-arrow">
                            <ArrowUpRight />
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}

                {/* The service: the end of the axis, where we write the code */}
                <div className="prows-lane">
                  <div className="prows-head">
                    <h3>Done for you</h3>
                    <p>We build and run it</p>
                  </div>
                  <div className="prows-service">
                    <h4>Custom Solutions</h4>
                    <p>
                      End-to-end ENS solutions tailored to your needs. Custom infrastructure for wallets,
                      chains, and apps. From development to deployment and ongoing maintenance.
                    </p>
                    <WebflowButton label="Book a call" href={BOOK_CALL} variant="white" cal />
                  </div>
                </div>
              </div>
            </div>

            {/* Closes the section: what a name is made of; click the ending to try other domains */}
            <TrySketch />
          </div>
        </div>
      </div>
    </section>
  );
}
