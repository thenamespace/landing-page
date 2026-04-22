"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo, ArrowUpRight } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";

type MenuGroup = {
  label: string;
  items: { label: string; description: string; href: string; external?: boolean }[];
};

const SOLUTIONS: MenuGroup = {
  label: "Solutions",
  items: [
    {
      label: "Wallets",
      description: "In-app usernames for wallet users.",
      href: "/#solutions",
    },
    {
      label: "L2s / Rollups",
      description: "Chain-wide branded identity and ENS.",
      href: "/#solutions",
    },
    {
      label: "AI Agents",
      description: "Names and reputation for agent identities.",
      href: "/#solutions",
    },
    {
      label: "Communities",
      description: "Unified identity for communities and DAOs.",
      href: "/#solutions",
    },
  ],
};

const PRODUCTS: MenuGroup = {
  label: "Products",
  items: [
    {
      label: "Offchain Subnames",
      description: "Gasless, scalable ENS subnames via CCIP-Read.",
      href: "/#products",
    },
    {
      label: "Onchain Subnames",
      description: "Fully onchain ENS subnames with wrapped NFTs.",
      href: "/#products",
    },
    {
      label: "SDK / API",
      description: "Drop-in TypeScript SDK and REST API.",
      href: "https://docs.namespace.ninja/",
      external: true,
    },
    {
      label: "ENS Widget",
      description: "Embeddable subname registration widget.",
      href: "https://docs.namespace.ninja/",
      external: true,
    },
  ],
};

function MenuDropdown({ group }: { group: MenuGroup }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors h-10 px-3"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {group.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        >
          <path
            d="M2 4l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[420px] z-50 transition-all duration-200",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none",
        )}
      >
        <div className="rounded-xl border border-border bg-surface/95 backdrop-blur-xl p-2 shadow-soft">
          {group.items.map((item) => {
            const content = (
              <div className="rounded-lg px-4 py-3 hover:bg-surface-2 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text">
                    {item.label}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-text-subtle group-hover:text-accent transition-colors" />
                </div>
                <p className="mt-1 text-xs text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              );
            }
            return (
              <Link key={item.label} href={item.href} className="block">
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto max-w-7xl px-5 md:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-text hover:text-text transition"
          aria-label="Namespace home"
        >
          <Logo className="h-5 w-auto" />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <MenuDropdown group={SOLUTIONS} />
          <MenuDropdown group={PRODUCTS} />
          <Link
            href="/blog"
            className={cn(
              "text-sm transition-colors h-10 px-3 flex items-center",
              pathname?.startsWith("/blog")
                ? "text-text"
                : "text-text-muted hover:text-text",
            )}
          >
            Blog
          </Link>
          <a
            href="https://docs.namespace.ninja/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted hover:text-text transition-colors h-10 px-3 flex items-center gap-1"
          >
            Docs
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Button
            href="https://cal.com/thecap.eth/discovery"
            external
            variant="ghost"
            size="md"
            withArrow="none"
          >
            Book a call
          </Button>
          <Button
            href="https://app.namespace.ninja"
            external
            variant="primary"
            size="md"
            withArrow="up-right"
          >
            Launch app
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-border text-text"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            {mobileOpen ? (
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 5h12M2 11h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border bg-bg transition-[max-height] duration-300",
          mobileOpen ? "max-h-[520px]" : "max-h-0",
        )}
      >
        <div className="px-5 py-6 flex flex-col gap-1">
          <Link
            href="/"
            className="py-3 text-base font-medium border-b border-border"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="py-3 text-base font-medium border-b border-border"
          >
            Blog
          </Link>
          <a
            href="https://docs.namespace.ninja/"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 text-base font-medium border-b border-border flex items-center gap-1"
          >
            Docs <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <div className="pt-4 flex flex-col gap-3">
            <Button
              href="https://cal.com/thecap.eth/discovery"
              external
              variant="secondary"
              size="lg"
              withArrow="up-right"
            >
              Book a call
            </Button>
            <Button
              href="https://app.namespace.ninja"
              external
              variant="primary"
              size="lg"
              withArrow="up-right"
            >
              Launch app
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
