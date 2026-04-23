import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Cta as CTASection } from "@/components/landing/Cta";
import {
  getAllPosts,
  getAllSlugs,
  getPostBySlug,
  formatLongDate,
} from "@/lib/posts";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import { getAuthor } from "@/lib/authors";
import type { Post } from "@/lib/posts";

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

function extractHeadings(html: string) {
  const headings: { level: number; id: string; text: string }[] = [];
  const regex = /<h([23])\b[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    if (text) headings.push({ level, id, text });
  }
  return headings;
}

function AuthorByline({ authorName }: { authorName?: string }) {
  const author = getAuthor(authorName);
  const displayName = author?.name ?? authorName ?? "Namespace";
  const avatarSrc = author?.avatar ?? "/assets/images/thecap-avatar.jpg";

  const inner = (
    <>
      <div className="blog_author-img-wrapper">
        <Image
          src={avatarSrc}
          alt={displayName}
          width={40}
          height={40}
          className="blog_author-img"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{displayName}</div>
      </div>
    </>
  );

  if (author?.link) {
    return (
      <a
        href={author.link}
        target="_blank"
        rel="noopener noreferrer"
        className="blog_author-wrapper"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {inner}
      </a>
    );
  }

  return <div className="blog_author-wrapper">{inner}</div>;
}

function RelatedCard({ post }: { post: Post }) {
  return (
    <div role="listitem" className="blog_item-wrapper w-dyn-item">
      <Link href={`/blog/${post.slug}`} className="blog_item w-inline-block">
        <div data-wf--component-blog-card--variant="base" className="blog_card">
          <div className="blog_card-img-wrapper">
            {post.image ? (
              <Image
                src={post.image}
                loading="lazy"
                width={600}
                height={340}
                alt={post.imageAlt ?? post.title}
                className="blog_card-img"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/assets/images/eth-bg.png"
                loading="lazy"
                width={70}
                alt={post.title}
                className="blog_card-img"
              />
            )}
          </div>
          <div className="blog_card-content-wrapper">
            <div className="blog_card-content">
              <div className="blog_card-content-top">
                {post.tag && (
                  <div
                    data-wf--component-tag--variant="black"
                    className="tag w-variant-e059100f-ffd8-c18b-006b-8271a2c949c4"
                  >
                    <div>{post.tag}</div>
                  </div>
                )}
                <div className="separator-dot" />
                <p className="text-color-black-600 text-size-small text-weight-medium is-read-time">
                  {post.readingLabel}
                </p>
              </div>
              <h3 className="heading-style-h5">{cleanTitle(post.title)}</h3>
              {post.description && (
                <p className="text-color-black-600">{post.description}</p>
              )}
            </div>
            <div className="blog_card-date-wrapper">
              <div>{formatLongDate(post.date)}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
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
  const headings = extractHeadings(post.html);

  const postUrl = `${SITE.url}/blog/${post.slug}`;
  const shareX = `https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`;

  return (
    <PageShell>
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema(post)} />

      {/* Blog post header */}
      <header
        {...{ "padding-global": "" }}
        className="section_blog-header"
      >
        <div {...{ container: "large" }}>
          <div className="blog-header_component is-details-page">
            {post.tag && (
              <div data-wf--component-tag--variant="light" className="tag">
                <div>{post.tag}</div>
              </div>
            )}
            <h1>{cleanTitle(post.title)}</h1>
            {post.description && (
              <div className="max-width-large is-40rem">
                <p className="text-size-medium text-weight-medium is-linespace-smaller">
                  {post.description}
                </p>
              </div>
            )}
            <div className="blog_author-wrapper">
              <AuthorByline authorName={post.author} />
              <div className="blog_author-row">
                <div style={{ opacity: 0.6, fontSize: "0.875rem" }}>
                  {formatLongDate(post.date)} · {post.readingLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Blog post body */}
      <section className="section_blog-detail">
        <div
          {...{ "padding-global": "" }}
          className="section-inner-background is-top-only is-full background-color-secondary"
        >
          <div
            {...{ container: "large" }}
            className="padding-section-large is-top-medium"
          >
            <div className="blog-detail_component">

              {/* Hero image */}
              {post.image && (
                <div className="blog-detail_component_img-wrapper">
                  <Image
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    width={1200}
                    height={675}
                    priority
                    className="blog-detail_component_img-wrapper_img"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}

              {/* Content layout */}
              <div className="blog-detail_component_detail-wrapper">

                {/* Left sticky sidebar */}
                <div className="blog-detail_component_detail-wrapper_left">
                  <AuthorByline authorName={post.author} />
                  <p style={{ opacity: 0.6 }}>{formatLongDate(post.date)}</p>
                  <p style={{ opacity: 0.6 }}>{post.readingLabel}</p>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <a
                      href={shareX}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on X"
                      className="button"
                      style={{ fontSize: "0.75rem", padding: "0.4rem 0.75rem" }}
                    >
                      Share on X
                    </a>
                  </div>

                  {headings.length > 0 && (
                    <nav style={{ marginTop: "1.5rem" }}>
                      <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.5, marginBottom: "0.5rem", fontWeight: 600 }}>
                        Contents
                      </p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                        {headings.map((h) => (
                          <li key={h.id}>
                            <a
                              href={`#${h.id}`}
                              className="post-toc-link"
                              style={{
                                fontSize: h.level === 2 ? "0.8rem" : "0.75rem",
                                paddingLeft: h.level === 3 ? "0.75rem" : "0rem",
                              }}
                            >
                              {h.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </div>

                {/* Main content */}
                <div className="blog-detail_component_detail-wrapper_content-wrapper">
                  <div
                    className="blog-detail_component_detail-wrapper_left_embed post-prose"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                  />
                </div>

                {/* Right sidebar (empty — matches original layout) */}
                <div className="blog-detail_component_detail-wrapper_right" />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="section_blog-related">
          <div
            {...{ "padding-global": "" }}
            className="section-inner-background background-color-secondary"
          >
            <div
              {...{ container: "large" }}
              className="padding-section-large"
            >
              <div style={{ marginBottom: "2rem" }}>
                <p style={{ fontSize: "0.75rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.5 }}>
                  Related Blogs
                </p>
              </div>
              <div className="blog_list-wrapper w-dyn-list">
                <div role="list" className="blog_list w-dyn-items">
                  {related.map((p) => (
                    <RelatedCard key={p.slug} post={p} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </PageShell>
  );
}
