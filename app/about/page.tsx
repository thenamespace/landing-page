import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Stats } from "@/components/landing/Stats";
import { Cta } from "@/components/landing/Cta";
import { WebflowButton } from "@/components/ui/WebflowButton";
import { JsonLd, organizationSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "About Namespace" },
  description:
    "Namespace is the ENS DAO-backed service provider building and operating naming infrastructure for wallets, chains, apps, and AI agents. 850k+ subnames, 21M+ resolutions, 30+ partners.",
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    type: "website",
    title: "About Namespace",
    description:
      "The ENS DAO-backed team building and operating naming infrastructure for wallets, chains, apps, and AI agents.",
    url: `${SITE.url}/about`,
    images: [{ url: SITE.ogImage }],
  },
};

const BOOK_CALL = "https://cal.com/thecap.eth/discovery";

function aboutBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE.url}/about` },
    ],
  };
}

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={aboutBreadcrumbSchema()} />

      {/* Hero */}
      <header className="section_solution-hero">
        <div className="solution-hero-backdrop" aria-hidden="true" />
        <div padding-global="">
          <div container="large" className="padding-section-large is-top-medium">
            <div className="about-hero">
              <div
                data-wf--component-tag--variant="background-blur"
                className="tag w-variant-1ec346f0-aef7-27e9-e90b-2eb557766f44 solution-anim solution-anim-1"
              >
                <div>About Namespace</div>
              </div>
              <h1 className="solution-hero-heading solution-anim solution-anim-2">
                We put names on web3
              </h1>
              <div className="max-width-medium is-37rem solution-anim solution-anim-3">
                <p className="text-size-medium text-weight-medium solution-hero-sub">
                  Namespace is an ENS DAO-backed service provider, founded in
                  2023. We design, build and operate the naming systems that
                  turn raw addresses into identities: for wallets, chains,
                  apps, communities and AI agents.
                </p>
              </div>
              <div className="button-group solution-anim solution-anim-4">
                <WebflowButton label="Book a Call" href={BOOK_CALL} variant="white" external />
                <WebflowButton label="Join the Community" href="https://t.me/+BJMGddUg8hk4MDEy" variant="hero-outline" external />
              </div>
              <div className="solution-anim solution-anim-5">
                <p className="solution-proof-strip">
                  <span className="solution-proof-num">&gt;850k</span>
                  <span className="solution-proof-label"> subnames</span>
                  <span className="solution-proof-dot"> · </span>
                  <span className="solution-proof-num">21M</span>
                  <span className="solution-proof-label"> resolutions</span>
                  <span className="solution-proof-dot"> · </span>
                  <span className="solution-proof-num">30+</span>
                  <span className="solution-proof-label"> partners</span>
                  <span className="solution-proof-dot"> · </span>
                  <span className="solution-proof-label">Backed by ENS DAO</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mission & vision */}
      <section className="section_about-mission">
        <div padding-global="">
          <div container="large">
            <div className="about-duo">
              <div className="solution-definition">
                <div className="solution-definition-marker" aria-hidden="true" />
                <div className="solution-definition-body">
                  <h2 className="heading-style-h5">Our mission</h2>
                  <p className="text-weight-medium solution-definition-answer">
                    To name every crypto user, by building and operating
                    universal naming infrastructure for wallets, applications
                    and blockchains.
                  </p>
                </div>
              </div>
              <div className="solution-definition">
                <div className="solution-definition-marker" aria-hidden="true" />
                <div className="solution-definition-body">
                  <h2 className="heading-style-h5">Our vision</h2>
                  <p className="text-weight-medium solution-definition-answer">
                    A decentralized internet where every user, AI agent, smart
                    contract and asset is identified by a name first and an
                    address second, making web3 as legible as the web.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="section_about-what">
        <div padding-global="">
          <div container="large" className="padding-section-large is-top-medium">
            <div className="margin-bottom margin-xlarge">
              <div className="solution-eyebrow">
                <span className="solution-eyebrow-num">01</span>
                <span className="solution-eyebrow-rule" aria-hidden="true" />
                <span className="solution-eyebrow-label">What we do</span>
              </div>
              <h2 className="solution-section-heading">
                Products, infrastructure, partnership
              </h2>
            </div>
            <div className="solution-pains-grid">
              <div className="solution-pain-card">
                <h3 className="heading-style-h5 solution-pain-question">We build the products</h3>
                <p className="text-weight-medium solution-pain-detail">
                  Offchain and onchain subnames, the SDK and REST API, the ENS
                  Widget, Subpages, Resolvio and ENS Diamonds: tools that make
                  ENS usable for real products at real scale.
                </p>
              </div>
              <div className="solution-pain-card">
                <h3 className="heading-style-h5 solution-pain-question">We run the infrastructure</h3>
                <p className="text-weight-medium solution-pain-detail">
                  Resolvers, CCIP-Read gateways, indexing and monitoring,
                  operated with SLAs. 21M+ resolutions served at 100% uptime,
                  so naming is never our partners' on-call problem.
                </p>
              </div>
              <div className="solution-pain-card">
                <h3 className="heading-style-h5 solution-pain-question">We partner long-term</h3>
                <p className="text-weight-medium solution-pain-detail">
                  Celo's Celonames, Filecoin's Filpay usernames, POAP, PinMe,
                  Unicorn and 30+ more teams: multi-year operating
                  partnerships, not one-off builds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Namespace vs ENS */}
      <section className="section_about-ens">
        <div padding-global="">
          <div container="large" className="padding-section-large is-top-medium">
            <div className="solution-definition">
              <div className="solution-definition-marker" aria-hidden="true" />
              <div className="solution-definition-body">
                <h2 className="heading-style-h5">How is Namespace different from ENS?</h2>
                <p className="text-weight-medium solution-definition-answer">
                  ENS is the naming protocol; Namespace is the execution and
                  distribution engine built on top of it. ENS defines how
                  names work; Namespace builds the systems - resolvers, APIs,
                  SDKs, managed infrastructure - that make naming usable at
                  scale. We are an official ENS service provider, supported by
                  the ENS DAO since 2023.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stats />
      <Cta />
    </PageShell>
  );
}
