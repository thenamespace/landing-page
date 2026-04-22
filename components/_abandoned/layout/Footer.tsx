import Link from "next/link";
import { Container } from "@/components/ui/Section";
import {
  Logo,
  X,
  LinkedIn,
  Github,
  Discord,
  Telegram,
  Farcaster,
} from "@/components/ui/Icons";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Offchain Subnames", href: "/#products" },
      { label: "Onchain Subnames", href: "/#products" },
      { label: "SDK / API", href: "https://docs.namespace.ninja/", external: true },
      { label: "ENS Widget", href: "https://docs.namespace.ninja/", external: true },
      { label: "Dev Portal", href: "https://dev.namespace.ninja/", external: true },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Wallets", href: "/#solutions" },
      { label: "L2s / Rollups", href: "/#solutions" },
      { label: "AI Agents", href: "/#solutions" },
      { label: "Communities", href: "/#solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Book a call", href: "https://cal.com/thecap.eth/discovery", external: true },
      { label: "Privacy policy", href: "/legal/privacy-policy" },
      { label: "Terms of service", href: "/legal/terms-of-service" },
      { label: "Disclaimer", href: "/legal/disclaimer" },
    ],
  },
] as const;

const SOCIAL = [
  { label: "X", href: "https://x.com/namespace_eth", Icon: X },
  {
    label: "Farcaster",
    href: "https://farcaster.xyz/namespace",
    Icon: Farcaster,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/namespace-eth/",
    Icon: LinkedIn,
  },
  { label: "GitHub", href: "https://github.com/thenamespace", Icon: Github },
  { label: "Discord", href: "https://discord.gg/FR7fngrA4s", Icon: Discord },
  { label: "Telegram", href: "https://t.me/+8jHmGt7DYcZiOTIy", Icon: Telegram },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <Container size="wide" className="py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="Namespace home"
            >
              <Logo className="h-6 w-auto text-text" />
            </Link>
            <p className="font-display text-3xl leading-tight text-text max-w-sm">
              Name the next billion{" "}
              <em className="italic text-accent">Web3</em> users.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 rounded-full border border-border hover:border-accent hover:text-accent text-text-muted flex items-center justify-center transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-mono uppercase tracking-widest text-text-subtle mb-4">
                  {col.title}
                </div>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => {
                    const external = "external" in link && link.external;
                    return (
                      <li key={link.label}>
                        {external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-text-muted hover:text-text transition-colors"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm text-text-muted hover:text-text transition-colors"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs font-mono text-text-subtle uppercase tracking-widest">
            © {new Date().getFullYear()} Namespace · ENS Service Provider
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-text-subtle">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
            All systems operational
          </div>
        </div>
      </Container>
    </footer>
  );
}
