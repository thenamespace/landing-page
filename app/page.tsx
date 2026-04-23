import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { HomeHeader } from "@/components/landing/HomeHeader";
import { CaseStudies } from "@/components/landing/CaseStudies";
import { Products } from "@/components/landing/Products";
import { Solutions } from "@/components/landing/Solutions";
import { Identity } from "@/components/landing/Identity";
import { UseCases } from "@/components/landing/UseCases";
import { Benefits } from "@/components/landing/Benefits";
import { Testimonials } from "@/components/landing/Testimonials";
import { Stats } from "@/components/landing/Stats";
import { Faq } from "@/components/landing/Faq";
import { Cta } from "@/components/landing/Cta";
import { BlogPreview } from "@/components/landing/BlogPreview";
import { SITE } from "@/lib/site";
import { JsonLd, faqPageSchema, serviceSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    type: "website",
    images: [{ url: SITE.ogImage }],
  },
};

export default function HomePage() {
  return (
    <PageShell>
      <JsonLd data={faqPageSchema()} />
      <JsonLd data={serviceSchema()} />
      <HomeHeader />
      <CaseStudies />
      <Products />
      <Solutions />
      <div className="section-divider" />
      <Identity />
      <div className="section-divider" />
      <UseCases />
      <div className="section-divider" />
      <Benefits />
      <Testimonials />
      <Stats />
      <BlogPreview />
      <Faq />
      <Cta />
    </PageShell>
  );
}
