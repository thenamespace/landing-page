import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { SolutionPage } from "@/components/solutions/SolutionPage";
import { SolutionV2Page } from "@/components/solutions/SolutionV2Page";
import {
  getSolution,
  getAllSolutionSlugs,
  type Solution,
} from "@/lib/solutions";
import {
  getSolutionV2,
  getAllSolutionV2Slugs,
  type SolutionV2,
} from "@/lib/solutions-v2";
import { JsonLd } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return [...getAllSolutionSlugs(), ...getAllSolutionV2Slugs()].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v2 = getSolutionV2(slug);
  if (v2) {
    const url = `${SITE.url}/solutions/${v2.slug}`;
    return {
      title: v2.title,
      description: v2.description,
      keywords: [...v2.keywords],
      alternates: { canonical: url },
      // Draft pages for comparison: third-party stats pending verification.
      robots: { index: false },
      openGraph: {
        type: "website",
        title: v2.title,
        description: v2.description,
        url,
        images: [{ url: SITE.ogImage }],
      },
    };
  }
  const solution = getSolution(slug);
  if (!solution) return { title: "Not found" };
  const url = `${SITE.url}/solutions/${solution.slug}`;
  return {
    title: solution.metaTitle,
    description: solution.metaDescription,
    keywords: [...solution.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: solution.metaTitle,
      description: solution.metaDescription,
      url,
      images: [{ url: SITE.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: solution.metaTitle,
      description: solution.metaDescription,
      images: [SITE.ogImage],
    },
  };
}

function v2FaqSchema(v2: SolutionV2) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: v2.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function v2BreadcrumbSchema(v2: SolutionV2) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: v2.title,
        item: `${SITE.url}/solutions/${v2.slug}`,
      },
    ],
  };
}

function v2ServiceSchema(v2: SolutionV2) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: v2.title,
    alternateName: [
      "ENS subnames",
      "ENS usernames",
      "web3 usernames",
      "ENS names",
    ],
    serviceType: "ENS Naming Infrastructure",
    description: v2.description,
    url: `${SITE.url}/solutions/${v2.slug}`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: "Worldwide",
  };
}

function solutionFaqSchema(solution: Solution) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: solution.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function solutionBreadcrumbSchema(solution: Solution) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: solution.navLabel,
        item: `${SITE.url}/solutions/${solution.slug}`,
      },
    ],
  };
}

function solutionServiceSchema(solution: Solution) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.metaTitle,
    alternateName: [
      "ENS subnames",
      "ENS usernames",
      "web3 usernames",
      "ENS names",
      "ENS subdomains",
    ],
    serviceType: "ENS Naming Infrastructure",
    description: solution.metaDescription,
    url: `${SITE.url}/solutions/${solution.slug}`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: "Worldwide",
  };
}

export default async function SolutionRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v2 = getSolutionV2(slug);
  if (v2) {
    return (
      <PageShell>
        <JsonLd data={v2FaqSchema(v2)} />
        <JsonLd data={v2BreadcrumbSchema(v2)} />
        <JsonLd data={v2ServiceSchema(v2)} />
        <SolutionV2Page solution={v2} />
      </PageShell>
    );
  }

  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <PageShell>
      <JsonLd data={solutionFaqSchema(solution)} />
      <JsonLd data={solutionBreadcrumbSchema(solution)} />
      <JsonLd data={solutionServiceSchema(solution)} />
      <SolutionPage solution={solution} />
    </PageShell>
  );
}
