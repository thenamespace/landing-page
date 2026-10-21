import { promises as fs } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Container, Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/lib/jsonld";

const ALLOWED = new Set(["disclaimer", "privacy-policy", "terms-of-service"]);

const META: Record<string, { title: string; description: string }> = {
  disclaimer: {
    title: "Disclaimer",
    description: "Disclaimer for the Namespace platform: how ENS name and subname management works, third-party responsibility, NFT ownership, and the limits of our liability.",
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description: "How Namespace collects, uses, shares and protects personal information, wallet addresses and transaction data when you use the platform, and your rights.",
  },
  "terms-of-service": {
    title: "Terms of Service",
    description: "The terms that govern your use of Namespace's platform and services for ENS names and subnames, including ownership, assumption of risk and termination.",
  },
};

export function generateStaticParams() {
  return Array.from(ALLOWED).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = META[slug];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `${SITE.url}/legal/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!ALLOWED.has(slug)) notFound();
  const meta = META[slug];

  const filePath = path.join(process.cwd(), "content", "legal", `${slug}.html`);
  const html = await fs.readFile(filePath, "utf8");

  return (
    <PageShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
            {
              "@type": "ListItem",
              position: 2,
              name: meta.title,
              item: `${SITE.url}/legal/${slug}`,
            },
          ],
        }}
      />
      <Section className="pt-16 md:pt-24 pb-0">
        <Container size="narrow">
          <Tag>Legal</Tag>
          <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1] tracking-tight">
            {meta.title}
          </h1>
          <p className="mt-5 text-lg text-text-muted leading-relaxed">
            {meta.description}
          </p>
          <div className="mt-8 text-xs font-mono uppercase tracking-widest text-text-subtle">
            Last updated · {new Date().getFullYear()}
          </div>
        </Container>
      </Section>

      <Section className="pt-12">
        <Container size="narrow">
          <div
            className="post-prose is-on-dark"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
