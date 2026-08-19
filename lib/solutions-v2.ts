/**
 * Solutions V2: six vertical pages on the shared 13-block master template.
 *
 * Blocks: hero, answer capsule, problem, product picture, how it works,
 * proof, what you get, why Namespace, business case, integration effort,
 * FAQ, related resources, final CTA.
 *
 * Copy source: the user's master template document. Third-party statistics
 * are pending verification (see the source document's Appendix A), so these
 * pages ship noindex until approved.
 */

export interface V2Cta {
  label: string;
  href: string;
  external?: boolean;
}

export interface V2Table {
  columns: string[];
  rows: string[][];
}

export interface V2Quote {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface SolutionV2 {
  slug: string;
  navLabel: string;
  title: string;
  description: string;
  keywords: string[];
  hero: {
    eyebrow: string;
    h1: string;
    subhead: string;
    proofLine: string;
    ctas: V2Cta[];
    visual: "phone" | "sendflow" | "browser" | "api" | "agent" | "tree";
    heroName: string;
  };
  capsule: { text: string; facts: string[] };
  problem: { h2: string; items: { title: string; body: string }[] };
  product: { h2: string; items: { title: string; body: string }[] };
  how: {
    h2: string;
    steps: { title: string; body: string }[];
    tableCaption: string;
    table: V2Table;
    recommendation: string;
    note?: string;
  };
  proof: {
    h2: string;
    items: { title: string; body: string }[];
    quotes: V2Quote[];
    stats: string[];
  };
  included: { h2: string; items: { title: string; body: string }[] };
  why: {
    h2: string;
    intro: string;
    tableCaption?: string;
    table?: V2Table;
    noLockIn: string;
  };
  business?: { h2: string; paragraphs: string[] };
  effort: {
    h2: string;
    body: string;
    code?: string;
    codeLabel?: string;
    footnote?: string;
  };
  faqs: { question: string; answer: string }[];
  resources: { label: string; href?: string }[];
  finalCta: { title: string; cta: V2Cta }[];
}

const CAL = "https://cal.com/thecap.eth/discovery";
const DOCS = "https://docs.namespace.ninja/";
const APP = "https://app.namespace.ninja/";
const AV = {
  griff: "/assets/images/testimonial-griff.avif",
  kate: "/assets/images/katecelo.jpg",
  joan: "/assets/images/testimonial-joan.jpg",
  ted: "/assets/images/testimonial-ted.jpg",
  ben: "/assets/images/testimonial-ben.avif",
};

export const SOLUTIONS_V2: SolutionV2[] = [
];

export function getSolutionV2(slug: string): SolutionV2 | undefined {
  return SOLUTIONS_V2.find((s) => s.slug === slug);
}

export function getAllSolutionV2Slugs(): string[] {
  return SOLUTIONS_V2.map((s) => s.slug);
}
