import Link from "next/link";
import Image from "next/image";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ArrowUpRight } from "@/components/ui/Icons";
import { getAllPosts } from "@/lib/posts";

export async function CaseStudies() {
  const all = await getAllPosts();
  const caseStudies = all
    .filter(
      (p) =>
        p.slug.startsWith("case-study") ||
        p.title.toLowerCase().includes("case study"),
    )
    .slice(0, 3);

  const posts = caseStudies.length > 0 ? caseStudies : all.slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <Section className="relative">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <SectionHeader
            eyebrow="Case studies"
            title={
              <>
                How teams are shipping{" "}
                <em className="italic">identity</em> today.
              </>
            }
            className="mb-0 flex-1"
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors group shrink-0"
          >
            Browse all stories
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative rounded-xl border border-border bg-surface/60 overflow-hidden hover:border-border-strong transition-colors flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-surface to-surface-2 flex items-center justify-center font-display text-4xl text-text-muted">
                    {post.title.slice(0, 1)}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-text bg-bg/70 backdrop-blur border border-border-strong rounded-full px-2.5 py-1">
                  {post.tag ?? "Case study"}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display text-2xl leading-tight tracking-tight group-hover:text-accent transition-colors">
                  {post.title.replace(/^\[Case Study\]\s*/i, "")}
                </h3>
                {post.description ? (
                  <p className="mt-3 text-sm text-text-muted leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                ) : null}
                <div className="mt-auto pt-6 flex items-center justify-between text-xs text-text-subtle">
                  <span className="font-mono">{post.readingLabel}</span>
                  <span className="inline-flex items-center gap-1 text-text-muted group-hover:text-accent transition-colors">
                    Read story
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
