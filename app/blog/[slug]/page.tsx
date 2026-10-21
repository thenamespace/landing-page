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
import { JsonLd, articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import { getAuthor } from "@/lib/authors";
import { TocNav } from "@/components/blog/TocNav";
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
  // "[Case Study]" is a card label, not part of the title search engines show.
  const title = cleanTitle(post.title);
  return {
    title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: post.author ? [post.author] : undefined,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [image],
    },
  };
}

function cleanTitle(title: string) {
  return title.replace(/^\[Case Study\]\s*/i, "");
}

function stripLeadingH1(html: string): string {
  return html.replace(/^\s*<h1[\s\S]*?<\/h1>\s*/i, "");
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
      <Image
        src={avatarSrc}
        alt=""
        width={56}
        height={56}
        className="article-author-avatar"
      />
      <span className="article-author-name">{displayName}</span>
    </>
  );

  if (author?.link) {
    return (
      <a
        href={author.link}
        target="_blank"
        rel="noopener noreferrer"
        className="article-author"
      >
        {inner}
      </a>
    );
  }

  return <span className="article-author">{inner}</span>;
}

function AuthorBox({ authorName }: { authorName?: string }) {
  const author = getAuthor(authorName);
  if (!author?.bio) return null;
  const member = author.member;
  return (
    <aside className="article-authorbox" aria-label="About the author">
      <Image
        src={author.avatar}
        alt=""
        width={112}
        height={112}
        className="article-authorbox-avatar"
      />
      <div>
        <p className="article-authorbox-name">
          {author.name}
          {member && <span className="article-authorbox-ens">{member.ens}</span>}
        </p>
        <p className="article-authorbox-bio">{author.bio}</p>
        {author.link && member?.x && (
          <a
            href={author.link}
            target="_blank"
            rel="noopener noreferrer"
            className="article-authorbox-link"
          >
            Follow @{member.x} on X
          </a>
        )}
      </div>
    </aside>
  );
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

  const bodyHtml = stripLeadingH1(post.html);
  const headings = extractHeadings(bodyHtml);

  const postUrl = `${SITE.url}/blog/${post.slug}`;
  const shareX = `https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`;

  return (
    <PageShell>
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema(post)} />
      {post.faqs.length >= 2 && <JsonLd data={faqPageSchema(post.faqs)} />}

      <section className="article-page">
        <div
          {...{ "padding-global": "" }}
          className="section-inner-background is-top-only is-full article-panel"
        >
          <div {...{ container: "large" }}>
            <div className="article-layout">

              {/* Left sticky sidebar */}
              <aside className="article-aside">
                <a
                  href={shareX}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-share-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Share on X
                </a>
                {headings.length > 0 && <TocNav headings={headings} />}
              </aside>

              <article className="article-main">
                <header className="article-header">
                  <h1 className="article-title">{cleanTitle(post.title)}</h1>
                  {post.description && (
                    <p className="article-dek">{post.description}</p>
                  )}
                  <div className="article-meta">
                    <AuthorByline authorName={post.author} />
                    <span className="article-meta-sep" aria-hidden="true">·</span>
                    <time dateTime={post.date}>{formatLongDate(post.date)}</time>
                    <span className="article-meta-sep" aria-hidden="true">·</span>
                    <span>{post.readingLabel}</span>
                  </div>
                </header>

                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    width={1280}
                    height={720}
                    priority
                    sizes="(max-width: 767px) 100vw, 40rem"
                    className="article-cover"
                  />
                )}

                <div
                  className="post-prose"
                  dangerouslySetInnerHTML={{ __html: bodyHtml }}
                />

                <AuthorBox authorName={post.author} />
              </article>

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
              <div className="blog-related-label">Related Articles</div>
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
