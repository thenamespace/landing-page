import { SITE } from "./site";
import type { Post } from "./posts";
import { FAQ_DATA } from "./faq-data";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/assets/images/og-image.png`,
    },
    slogan: "Name the next billion Web3 users",
    inLanguage: "en",
    foundingDate: "2023-08",
    areaServed: "Worldwide",
    knowsAbout: [
      "Ethereum Name Service",
      "ENS subnames",
      "Web3 identity",
      "blockchain naming",
      "CCIP-Read",
      "onchain identity",
      "AI agent identity",
    ],
    sameAs: [
      "https://x.com/namespace_eth",
      "https://www.linkedin.com/company/namespace-eth/",
      "https://farcaster.xyz/namespace",
      "https://github.com/thenamespace",
      "https://discord.gg/FR7fngrA4s",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Namespace ENS Subname Service",
    serviceType: "ENS Naming Infrastructure",
    description:
      "ENS subname issuance, management, and resolution infrastructure for wallets, L2 chains, DeFi apps, and AI agents. Issue human-readable ENS identities at scale with offchain (gasless) or onchain (NFT) subnames.",
    url: SITE.url,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: "Worldwide",
    offers: [
      {
        "@type": "Offer",
        name: "Offchain Subnames",
        description:
          "Gasless ENS subname issuance using CCIP-Read. Always free — no charge to Namespace or end users regardless of volume.",
        price: "0",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Onchain Subnames",
        description:
          "ENS subnames minted as NFTs on Ethereum, Base, or Optimism. Namespace charges a 5% fee on registration revenue if subnames have a price set.",
      },
      {
        "@type": "Offer",
        name: "SDK / API",
        description:
          "Developer SDK (JavaScript/TypeScript) and REST API for programmatic subname registration and management. Free to use with no restrictions.",
        price: "0",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Custom Solutions",
        description:
          "Custom ENS naming integrations for wallets, L2 chains, and apps. Pricing case-by-case, partially subsidized by ENS DAO for qualifying projects.",
      },
    ],
  };
}

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image ? `${SITE.url}${post.image}` : SITE.ogImage,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Organization",
      name: post.author ?? SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/assets/images/og-image.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${post.slug}`,
    },
  };
}

export function breadcrumbSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE.url}/blog/${post.slug}`,
      },
    ],
  };
}

export function blogListingSchema(posts: Post[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Namespace Blog",
    description:
      "Insights, thoughts and lessons, ecosystem updates, deep dives and case studies from the Namespace team.",
    url: `${SITE.url}/blog`,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE.url}/blog/${post.slug}`,
      name: post.title,
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
