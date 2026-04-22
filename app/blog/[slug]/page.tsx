import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Container, Section } from "@/components/ui/Section";
import { PostCard } from "@/components/blog/PostCard";
import { Cta as CTASection } from "@/components/landing/Cta";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ArrowUpRight, X, LinkedIn } from "@/components/ui/Icons";
import {
  getAllPosts,
  getAllSlugs,
  getPostBySlug,
  formatLongDate,
} from "@/lib/posts";
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
} from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  const url = `${SITE.url}/blog/${post.slug}`;
  const image = post.image ? `${SITE.url}${post.image}` : SITE.ogImage;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: post.author ? [post.author] : undefined,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

function cleanTitle(title: string) {
  return title.replace(/^\[Case Study\]\s*/i, "");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  const postUrl = `${SITE.url}/blog/${post.slug}`;
  const shareX = `https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  return (
    <PageShell>
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema(post)} />

      <article>
        {/* Post header */}
        <Section className="pt-16 md:pt-24 pb-0">
          <Container size="narrow">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-subtle"
            >
              <Link
                href="/blog"
                className="hover:text-accent transition-colors inline-flex items-center gap-1.5"
              >
                <span aria-hidden>←</span> Back to blog
              </Link>
              {post.tag ? (
                <>
                  <span>·</span>
                  <span>{post.tag}</span>
                </>
              ) : null}
            </nav>

            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tight">
              {cleanTitle(post.title)}
            </h1>

            {post.description ? (
              <p className="mt-6 text-xl md:text-2xl text-text-muted leading-[1.4] font-display">
                {post.description}
              </p>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-muted">
              <span className="inline-flex items-center gap-2">
                <span className="h-8 w-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-mono text-accent text-xs">
                  N
                </span>
                <span className="text-text font-medium">
                  {post.author ?? "Namespace"}
                </span>
              </span>
              <span className="h-4 w-px bg-border-strong" />
              <span className="font-mono">{formatLongDate(post.date)}</span>
              <span className="h-4 w-px bg-border-strong" />
              <span className="font-mono">{post.readingLabel}</span>
            </div>
          </Container>
        </Section>

        {/* Cover image */}
        {post.image ? (
          <Section className="pt-12 pb-0">
            <Container size="default">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border bg-surface-2">
                <Image
                  src={post.image}
                  alt={post.imageAlt ?? post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 1024px, 100vw"
                />
              </div>
            </Container>
          </Section>
        ) : null}

        {/* Body */}
        <Section className="pt-12 pb-0">
          <Container size="narrow">
            <div
              className="post-prose"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            <div className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono uppercase tracking-widest text-text-subtle">
                Share this
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={shareX}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="h-9 w-9 rounded-full border border-border hover:border-accent hover:text-accent text-text-muted flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4" />
                </a>
                <a
                  href={shareLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="h-9 w-9 rounded-full border border-border hover:border-accent hover:text-accent text-text-muted flex items-center justify-center transition-colors"
                >
                  <LinkedIn className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-10 rounded-xl border border-border bg-surface/60 p-8 md:p-10">
              <div className="text-xs font-mono uppercase tracking-widest text-text-subtle mb-3">
                Ready to ship?
              </div>
              <h3 className="font-display text-2xl md:text-3xl tracking-tight leading-tight">
                Talk to the team that builds ENS identity at scale.
              </h3>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  href="https://cal.com/thecap.eth/discovery"
                  external
                  withArrow="up-right"
                >
                  Book a call
                </Button>
                <Button
                  href="https://docs.namespace.ninja/"
                  external
                  variant="secondary"
                  withArrow="up-right"
                >
                  Read the docs
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </article>

      {/* Related */}
      {related.length > 0 ? (
        <Section className="pt-24">
          <Container size="wide">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight">
                Keep reading
              </h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors group"
              >
                All posts
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CTASection />
    </PageShell>
  );
}
