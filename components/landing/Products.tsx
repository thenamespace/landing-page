"use client";

import { useEffect, useRef, useState } from "react";
import { WebflowButton } from "@/components/ui/WebflowButton";

/* ---------- data ---------- */

interface Product {
  id: string;
  title: string;
  description: string;
  tags: string[];
  buttons: { label: string; href: string }[];
  image: string;
  imageAlt: string;
  srcSet?: string;
}

const PRODUCTS: Product[] = [
  {
    id: "offchain-subnames",
    title: "Offchain Subnames",
    description: "Simplest, safest, and quickest way to issue ENS Subnames at scale powered by CCIP-read.",
    tags: ["Quick Setup", "Scalable", "Gasless", "Easy to use"],
    buttons: [
      { label: "Create Subnames", href: "https://app.namespace.ninja/offchain" },
      { label: "Integrate in app", href: "https://docs.namespace.ninja/developer-guide/guide/create-offchain-subnames" },
    ],
    image: "/assets/images/product-offchain.avif",
    imageAlt: "Offchain CCIP-read ENS subnames / subdomains view in Namespace app.",
    srcSet: "/assets/images/product-offchain-500.avif 500w, /assets/images/product-offchain-800.avif 800w, /assets/images/product-offchain.avif 1438w",
  },
  {
    id: "onchain-subnames",
    title: "Onchain Subnames",
    description: "Mint L1 or L2 subnames on Ethereum, Base or Optimsm with no coding skills required.",
    tags: ["Secure", "Verifiable", "Unruggable", "Permissionless"],
    buttons: [
      { label: "No-code App", href: "https://app.namespace.ninja/onchain" },
      { label: "Integrate in app", href: "https://docs.namespace.ninja/developer-guide/guide/mint-l1-l2-subnames" },
    ],
    image: "/assets/images/product-onchain.webp",
    imageAlt: "Onchain ENS subnames / subdomains view in Namespace app. L1 or L2 subnames on Ethereum, Base, Celo, Optimism, etc.",
    srcSet: "/assets/images/product-onchain-500.webp 500w, /assets/images/product-onchain-800.webp 800w, /assets/images/product-onchain-1080.webp 1080w, /assets/images/product-onchain.webp 1438w",
  },
  {
    id: "sdk-api",
    title: "SDK / API",
    description: "Implement ENS subname registrations and management in your apps with ease.",
    tags: ["Quick start & setup", "LLM-friendly", "SKILLS", "Onchain & offchain support"],
    buttons: [
      { label: "View SDK", href: "https://docs.namespace.ninja/developer-guide/sdks/introduction" },
      { label: "View API", href: "https://docs.namespace.ninja/api-reference/introduction" },
    ],
    image: "/assets/images/product-widget.avif",
    imageAlt: "Namespace ENS SDK API for subname / subdomain registration.",
    srcSet: "/assets/images/product-widget-500.avif 500w, /assets/images/product-widget-800.avif 800w, /assets/images/product-widget.avif 1438w",
  },
  {
    id: "resolvio",
    title: "Resolvio",
    description: "Universal domain resolution service.",
    tags: ["Bulk resolution", "Test playground", "Free to use"],
    buttons: [{ label: "Learn More", href: "https://resolvio.xyz/" }],
    image: "/assets/images/product-ens-app.png",
    imageAlt: "Resolvio — universal ENS domain resolution service",
    srcSet: "/assets/images/product-ens-app-500.png 500w, /assets/images/product-ens-app-800.png 800w, /assets/images/product-ens-app-1080.png 1080w, /assets/images/product-ens-app.png 1447w",
  },
];

interface SmallProduct {
  id: string;
  title: string;
  description: string;
  button: { label: string; href: string };
  image: string;
  imageAlt: string;
}

const SMALL_PRODUCTS_ROW1: SmallProduct[] = [
  {
    id: "ens-components",
    title: "ENS Components",
    description: "Ready-made ENS React components with name and subname registrations (onchain or offchain), record editting and more.",
    button: { label: "See Components", href: "https://enscomponents.com/" },
    image: "/assets/images/product-subpages.avif",
    imageAlt: "ENS Components — ready-made React components for ENS registrations",
  },
  {
    id: "ens-mcp",
    title: "ENS MCP",
    description: "Open-source tool that allows AI models to understand, query, and interact with ENS domain names in real-time.",
    button: { label: "View on GitHub", href: "https://github.com/thenamespace/ens-mcp" },
    image: "/assets/images/product-sdk.svg",
    imageAlt: "ENS MCP — open-source AI model context protocol for ENS",
  },
];

const SMALL_PRODUCTS_ROW2: SmallProduct[] = [
  {
    id: "subpages",
    title: "Subpages",
    description: "Launch your own subname minting website in minutes; white-label, customizable, subname minting enabled from get-go.",
    button: { label: "GitHub Repo", href: "https://github.com/thenamespace/subpages" },
    image: "/assets/images/product-resolvio.avif",
    imageAlt: "Launch ENS subname minting web page in minutes.",
  },
  {
    id: "ens-widget",
    title: "ENS Widget",
    description: "Embed subname registrations directly inside your website and sell ENS names or subnames at different prices.",
    button: { label: "View Widget", href: "https://app.namespace.ninja/widgets" },
    image: "/assets/images/product-custom.avif",
    imageAlt: "Sell ENS domains and subdomains from your own website.",
  },
];

const NAV_ITEMS = ["Offchain Subnames", "Onchain Subnames", "SDK / API", "Resolvio", "Other"];
const NAV_HREFS = ["#offchain-subnames", "#onchain-subnames", "#sdk-api", "#resolvio", "#products-five"];

function OffchainIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M14.5834 15.8332H7.50005C6.41827 15.8329 5.35788 15.5318 4.43737 14.9636C3.51685 14.3953 2.77249 13.5823 2.28744 12.6153C1.8024 11.6484 1.5958 10.5656 1.69071 9.48802C1.78563 8.41041 2.17833 7.38043 2.82492 6.51316C3.47152 5.64589 4.34655 4.9755 5.35222 4.57691C6.35789 4.17832 7.45459 4.06723 8.51976 4.25606C9.58493 4.44488 10.5766 4.92618 11.384 5.64618C12.1914 6.36617 12.7826 7.29649 13.0917 8.33317H14.5834C15.5779 8.33317 16.5318 8.72826 17.235 9.43152C17.9383 10.1348 18.3334 11.0886 18.3334 12.0832C18.3334 13.0777 17.9383 14.0316 17.235 14.7348C16.5318 15.4381 15.5779 15.8332 14.5834 15.8332Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function OnchainIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V7.5C2.5 7.96024 2.8731 8.33333 3.33333 8.33333H7.5C7.96024 8.33333 8.33333 7.96024 8.33333 7.5V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.6667 2.5H12.5001C12.0398 2.5 11.6667 2.8731 11.6667 3.33333V7.5C11.6667 7.96024 12.0398 8.33333 12.5001 8.33333H16.6667C17.127 8.33333 17.5001 7.96024 17.5001 7.5V3.33333C17.5001 2.8731 17.127 2.5 16.6667 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.6667 11.6665H12.5001C12.0398 11.6665 11.6667 12.0396 11.6667 12.4998V16.6665C11.6667 17.1267 12.0398 17.4998 12.5001 17.4998H16.6667C17.127 17.4998 17.5001 17.1267 17.5001 16.6665V12.4998C17.5001 12.0396 17.127 11.6665 16.6667 11.6665Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 11.6665H3.33333C2.8731 11.6665 2.5 12.0396 2.5 12.4998V16.6665C2.5 17.1267 2.8731 17.4998 3.33333 17.4998H7.5C7.96024 17.4998 8.33333 17.1267 8.33333 16.6665V12.4998C8.33333 12.0396 7.96024 11.6665 7.5 11.6665Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 5.5C10.6 5.5 11.3333 5.5 11.5 5.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 15C10.6 15 11.3333 15 11.5 15" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 11.5C5 9.9 5 9.16667 5 9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M15 11.5C15 9.9 15 9.16667 15 9" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function SdkApiIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6.66667 2.5H5.83333C5.39131 2.5 4.96738 2.67559 4.65482 2.98816C4.34226 3.30072 4.16667 3.72464 4.16667 4.16667V8.33333C4.16667 8.77536 3.99107 9.19928 3.67851 9.51184C3.36595 9.8244 2.94203 10 2.5 10C2.94203 10 3.36595 10.1756 3.67851 10.4882C3.99107 10.8007 4.16667 11.2246 4.16667 11.6667V15.8333C4.16667 16.75 4.91667 17.5 5.83333 17.5H6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3333 17.5H14.1666C14.6086 17.5 15.0325 17.3244 15.3451 17.0118C15.6577 16.6993 15.8333 16.2754 15.8333 15.8333V11.6667C15.8333 10.75 16.5833 10 17.4999 10C17.0579 10 16.634 9.8244 16.3214 9.51184C16.0088 9.19928 15.8333 8.77536 15.8333 8.33333V4.16667C15.8333 3.72464 15.6577 3.30072 15.3451 2.98816C15.0325 2.67559 14.6086 2.5 14.1666 2.5H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ResolvioIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M18.3334 10.0002C18.3334 9.53993 17.9603 9.16683 17.5001 9.16683C17.0398 9.16683 16.6667 9.53993 16.6667 10.0002C16.6667 10.4604 17.0398 10.8335 17.5001 10.8335C17.9603 10.8335 18.3334 10.4604 18.3334 10.0002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 10C8.89071 10 9.78643 3 2.61286 3H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 10C8.89071 10 9.78643 12.33 2.61286 12.33H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 7.66992H2.61286C9.79429 7.66992 8.89071 9.99992 13 9.99992" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17H2.61286C9.79429 17 8.89071 10 13 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function OtherIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M17.5 6.66675C17.4997 6.37448 17.4225 6.08742 17.2763 5.83438C17.13 5.58134 16.9198 5.37122 16.6667 5.22508L10.8333 1.89175C10.58 1.74547 10.2926 1.66846 10 1.66846C9.70744 1.66846 9.42003 1.74547 9.16667 1.89175L3.33333 5.22508C3.08022 5.37122 2.86998 5.58134 2.72372 5.83438C2.57745 6.08742 2.5003 6.37448 2.5 6.66675V13.3334C2.5003 13.6257 2.57745 13.9127 2.72372 14.1658C2.86998 14.4188 3.08022 14.6289 3.33333 14.7751L9.16667 18.1084C9.42003 18.2547 9.70744 18.3317 10 18.3317C10.2926 18.3317 10.58 18.2547 10.8333 18.1084L16.6667 14.7751C16.9198 14.6289 17.13 14.4188 17.2763 14.1658C17.4225 13.9127 17.4997 13.6257 17.5 13.3334V6.66675Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.75 5.8335L10 10.0002L17.25 5.8335" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 18.3333V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const NAV_ICONS = [OffchainIcon, OnchainIcon, SdkApiIcon, ResolvioIcon, OtherIcon];

/* ---------- component ---------- */

function ProductCard({ p }: { p: Product }) {
  return (
    <div id={p.id} className="products_card">
      <div className="products_card-top">
        <div className="products_title-wrapper">
          <h3>{p.title}</h3>
          <p className="text-color-black-600 text-size-medium text-weight-medium">{p.description}</p>
          <div className="products_categories-list">
            {p.tags.map((t) => (
              <div key={t} className="products_categories-item"><div>{t}</div></div>
            ))}
          </div>
        </div>
        <div className="button-group">
          {p.buttons.map((b) => (
            <WebflowButton key={b.label} label={b.label} href={b.href} variant="secondary" />
          ))}
        </div>
      </div>
      <div className="products_card-img-wrapper">
        <img
          src={p.image}
          loading="lazy"
          width={719}
          sizes="(max-width: 767px) 100vw, 719px"
          alt={p.imageAlt}
          srcSet={p.srcSet}
          className="products_card-img"
        />
      </div>
    </div>
  );
}

function SmallProductCard({ p }: { p: SmallProduct }) {
  return (
    <div id={p.id} className="products_small-card">
      <div className="products_small-card-img-wrapper">
        <img src={p.image} loading="lazy" width={325.5} alt={p.imageAlt} className="products_small-card-img" />
      </div>
      <div className="products_small-card-content">
        <h3 className="heading-style-h5">{p.title}</h3>
        <p className="text-weight-medium text-color-black-600">{p.description}</p>
      </div>
      <div className="button-group">
        <WebflowButton label={p.button.label} href={p.button.href} variant="secondary" />
      </div>
    </div>
  );
}

const ALL_SECTION_IDS = ["offchain-subnames", "onchain-subnames", "sdk-api", "resolvio", "products-five"];

export function Products() {
  const [activeId, setActiveId] = useState(ALL_SECTION_IDS[0]);

  // IntersectionObserver: whichever section is most visible wins
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const ratios = new Map<string, number>();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.intersectionRatio));
        let best = ALL_SECTION_IDS[0];
        let bestRatio = -1;
        ratios.forEach((ratio, id) => { if (ratio > bestRatio) { bestRatio = ratio; best = id; } });
        if (bestRatio > 0) setActiveId(best);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    ALL_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="section_products">
      <div padding-global="" className="section-inner-background is-bottom-only background-color-secondary">
        <div container="large" className="padding-section-large is-small-mobile">
          <div className="products_component">
            {/* Heading */}
            <div className="component_heading">
              <div data-wf--component-tag--variant="dark" className="tag w-variant-b6bce3ac-5c2a-b1ee-66d6-218f87a88dd1">
                <div>Products and Services</div>
              </div>
              <h2>ENS made easy</h2>
              <div className="max-width-medium">
                <p className="text-weight-medium is-linespace-smaller text-color-black-900">
                  Plug-and-play ENS naming for chains, wallets, apps, and agents.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="products_content">
              {/* Left nav */}
              <div className="products_content-left">
                {NAV_ITEMS.map((label, i) => {
                  const Icon = NAV_ICONS[i];
                  const isActive = activeId === ALL_SECTION_IDS[i];
                  return (
                    <a
                      key={label}
                      href={NAV_HREFS[i]}
                      onClick={(e) => handleNavClick(e, NAV_HREFS[i])}
                      className={`products_content-left-item w-inline-block${isActive ? " w--current" : ""}`}
                    >
                      <div className="products_content-active-cricle" />
                      <div className="products_content-item-right">
                        <div className="products_content-icon-wrapper">
                          <div className="icon-embed-custom1 w-embed">
                            <Icon />
                          </div>
                        </div>
                        <div className="text-size-large text-weight-medium">{label}</div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Right cards */}
              <div className="products_content-right">
                {PRODUCTS.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}

                {/* Small card grid */}
                <div id="products-five" className="products_card-column">
                  <div className="products_content-right-row">
                    {SMALL_PRODUCTS_ROW1.map((p) => (
                      <SmallProductCard key={p.id} p={p} />
                    ))}
                  </div>
                  <div className="products_content-right-row">
                    {SMALL_PRODUCTS_ROW2.map((p) => (
                      <SmallProductCard key={p.id} p={p} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
