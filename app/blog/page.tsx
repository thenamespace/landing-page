import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Container, Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { PostCard, PostCardFeatured } from "@/components/blog/PostCard";
import { Cta as CTASection } from "@/components/landing/Cta";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes, case studies, and product drops from the Namespace team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog — ${SITE.name}`,
    description:
      "Engineering notes, case studies, and product drops from the Namespace team.",
    url: `${SITE.url}/blog`,
    type: "website",
  },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <PageShell>
      <Section className="pt-20 md:pt-28 pb-0">
        <Container size="wide">
          <div className="flex flex-col items-start gap-6 mb-12 md:mb-16">
            <Tag>The Journal</Tag>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight max-w-4xl">
              Dispatches from the{" "}
              <em className="italic text-accent">naming layer.</em>
            </h1>
            <p className="max-w-2xl text-lg text-text-muted leading-relaxed">
              Case studies, engineering notes, and product drops from the
              Namespace team. Everything we&apos;ve learned shipping ENS-based
              identity at scale.
            </p>
          </div>
        </Container>
      </Section>

      {featured ? (
        <Section className="pt-0 pb-0">
          <Container size="wide">
            <PostCardFeatured post={featured} />
          </Container>
        </Section>
      ) : null}

      {rest.length > 0 ? (
        <Section>
          <Container size="wide">
            <div className="flex items-baseline justify-between gap-4 mb-8 md:mb-10">
              <div className="text-xs font-mono uppercase tracking-widest text-text-subtle">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                  All posts · {posts.length}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CTASection />
    </PageShell>
  );
}
