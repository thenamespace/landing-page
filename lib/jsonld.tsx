import { SITE } from "./site";
import type { Post } from "./posts";
import { FAQ_DATA } from "./faq-data";
import { getAuthor } from "./authors";
import { TEAM, getTeamMember, personId, type TeamMember } from "./team";

/** Stable entity ids so every page's JSON-LD describes one connected graph. */
export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
const orgRef = { "@id": ORG_ID };

export function personSchema(member: TeamMember) {
  return {
    "@type": "Person",
    "@id": personId(SITE.url, member),
    name: member.nick,
    alternateName: member.ens,
    jobTitle: member.role,
    image: `${SITE.url}${member.img}`,
    url: `${SITE.url}/about#${member.ens.replace(/\.eth$/, "")}`,
    sameAs: [
      ...(member.x ? [`https://x.com/${member.x}`] : []),
      `https://app.ens.domains/${member.ens}`,
    ],
    worksFor: orgRef,
  };
}

export function organizationSchema() {
  const founder = getTeamMember("cap.eth");
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: ["Namespace ENS", "Namespace Ninja"],
    description: SITE.description,
    disambiguatingDescription:
      "Namespace (namespace.ninja) is an ENS subname service provider in the ENS DAO Service Provider Program. Not affiliated with Namespace Labs.",
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/assets/images/favicon-128.png`,
      width: 256,
      height: 256,
    },
    image: SITE.ogImage,
    slogan: "Name the next billion Web3 users",
    inLanguage: "en",
    foundingDate: "2023-08",
    ...(founder ? { founder: { "@id": personId(SITE.url, founder) } } : {}),
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
      "https://docs.namespace.ninja",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en",
    publisher: orgRef,
  };
}

/** Team members as linked Person entities (About page). */
export function teamSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": TEAM.map(personSchema),
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
    provider: orgRef,
    areaServed: "Worldwide",
    offers: [
      {
        "@type": "Offer",
        name: "Offchain Subnames",
        description:
          "Gasless ENS subname issuance using CCIP-Read. Always free - no charge to Namespace or end users regardless of volume.",
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

export function faqPageSchema(
  items: { question: string; answer: string }[] = FAQ_DATA,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function isCaseStudy(post: Post) {
  return post.slug.startsWith("case-study-") || /^\[Case Study\]/i.test(post.title);
}

function articleAuthor(post: Post) {
  const author = getAuthor(post.author);
  if (author?.member) {
    return {
      ...personSchema(author.member),
      name: author.name,
      description: author.bio,
    };
  }
  return author
    ? { "@type": "Person", name: author.name, worksFor: orgRef }
    : orgRef;
}

export function articleSchema(post: Post) {
  const url = `${SITE.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": isCaseStudy(post) ? "Article" : "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title.replace(/^\[Case Study\]\s*/i, ""),
    description: post.description,
    url,
    image: post.image ? `${SITE.url}${post.image}` : SITE.ogImage,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "en",
    ...(post.tag ? { articleSection: post.tag } : {}),
    author: articleAuthor(post),
    publisher: orgRef,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
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
