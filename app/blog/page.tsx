import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Cta as CTASection } from "@/components/landing/Cta";
import { getAllPosts, formatLongDate } from "@/lib/posts";
import { SITE } from "@/lib/site";
import { JsonLd, blogListingSchema } from "@/lib/jsonld";
import type { Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, thoughts and lessons, ecosystem updates, deep dives and case studies.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog — ${SITE.name}`,
    description:
      "Insights, thoughts and lessons, ecosystem updates, deep dives and case studies.",
    url: `${SITE.url}/blog`,
    type: "website",
  },
};

function cleanTitle(title: string) {
  return title.replace(/^\[Case Study\]\s*/i, "");
}

function BlogCardImage({ post }: { post: Post }) {
  if (post.image) {
    return (
      <Image
        src={post.image}
        loading="lazy"
        width={800}
        height={450}
        alt={post.imageAlt ?? post.title}
        className="blog_card-img"
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/images/eth-bg.png"
      loading="lazy"
      width={70}
      alt={post.title}
      className="blog_card-img"
    />
  );
}

function BlogCardMeta({ tag, readingLabel }: { tag?: string; readingLabel: string }) {
  return (
    <div className="blog_card-content-top">
      {tag && (
        <div
          data-wf--component-tag--variant="black"
          className="tag w-variant-e059100f-ffd8-c18b-006b-8271a2c949c4"
        >
          <div>{tag}</div>
        </div>
      )}
      <div className="separator-dot" />
      <p className="text-color-black-600 text-size-small text-weight-medium is-read-time">
        {readingLabel}
      </p>
    </div>
  );
}

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <PageShell>
      <JsonLd data={blogListingSchema(posts)} />
      {/* Blog header */}
      <header
        {...{ "padding-global": "" }}
        className="section_blog-header"
      >
        <div {...{ container: "large" }}>
          <div className="blog-header_component">
            <div data-wf--component-tag--variant="light" className="tag">
              <div>Blog</div>
            </div>
            <h1>Namespace Journal</h1>
            <div className="max-width-large is-40rem">
              <p className="text-size-medium text-weight-medium is-linespace-smaller">
                Insights, thoughts and lessons, ecosystem updates, deep dives
                and case studies.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Blog overview */}
      <section className="section_blog-overview">
        <div
          {...{ "padding-global": "" }}
          className="section-inner-background is-top-only is-full background-color-secondary"
        >
          <div
            {...{ container: "large" }}
            className="padding-section-large is-top-medium"
          >
            <div className="blog-overview_component">

              {/* Featured post — horizontal card */}
              {featured && (
                <div className="blog-featured_list-wrapper w-dyn-list">
                  <div role="list" className="blog-featured_list w-dyn-items">
                    <div role="listitem" className="blog_item-wrapper w-dyn-item">
                      <Link
                        href={`/blog/${featured.slug}`}
                        className="blog_item w-inline-block"
                      >
                        <div
                          data-wf--component-blog-card--variant="horizontal"
                          className="blog_card w-variant-6ef4b717-2cf9-3e1b-d357-89175d5ef17e"
                        >
                          <div className="blog_card-img-wrapper w-variant-6ef4b717-2cf9-3e1b-d357-89175d5ef17e">
                            <BlogCardImage post={featured} />
                          </div>
                          <div className="blog_card-content-wrapper w-variant-6ef4b717-2cf9-3e1b-d357-89175d5ef17e">
                            <div className="blog_card-content">
                              <BlogCardMeta tag={featured.tag} readingLabel={featured.readingLabel} />
                              <h3 className="heading-style-h5">
                                {cleanTitle(featured.title)}
                              </h3>
                              {featured.description && (
                                <p className="text-color-black-600">
                                  {featured.description}
                                </p>
                              )}
                            </div>
                            <div className="blog_card-date-wrapper">
                              <div>{formatLongDate(featured.date)}</div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* All remaining posts */}
              {rest.length > 0 && (
                <div className="blog_list-wrapper w-dyn-list">
                  <div role="list" className="blog_list w-dyn-items">
                    {rest.map((post) => (
                      <div
                        key={post.slug}
                        role="listitem"
                        className="blog_item-wrapper w-dyn-item"
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="blog_item w-inline-block"
                        >
                          <div
                            data-wf--component-blog-card--variant="base"
                            className="blog_card"
                          >
                            <div className="blog_card-img-wrapper">
                              <BlogCardImage post={post} />
                            </div>
                            <div className="blog_card-content-wrapper">
                              <div className="blog_card-content">
                                <BlogCardMeta tag={post.tag} readingLabel={post.readingLabel} />
                                <h3 className="heading-style-h5">
                                  {cleanTitle(post.title)}
                                </h3>
                                {post.description && (
                                  <p className="text-color-black-600">
                                    {post.description}
                                  </p>
                                )}
                              </div>
                              <div className="blog_card-date-wrapper">
                                <div>{formatLongDate(post.date)}</div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter subscribe */}
              <div className="blog-subscribe">
                <div className="blog-subscribe_content">
                  <div className="blog-subscribe_eyebrow">Subscribe</div>
                  <h3 className="heading-style-h5">Namespace Journal</h3>
                  <p className="blog-subscribe_text text-size-medium text-weight-medium">
                    Join the list for fresh case studies, ENS insights, and
                    product notes from the Namespace team.
                  </p>
                </div>
                <div className="blog-subscribe_form-block w-form">
                  <form
                    id="blog-subscribe-form-page"
                    name="blog-subscribe-form-page"
                    data-name="Blog Subscribe Form Page"
                    method="post"
                    className="blog-subscribe_form"
                    data-resend-form="newsletter"
                  >
                    <input
                      className="blog-subscribe_input w-input"
                      maxLength={256}
                      name="email"
                      data-name="Email"
                      placeholder="Enter your email"
                      type="email"
                      id="blog-subscribe-page-email"
                      required
                    />
                    <button
                      type="submit"
                      className="button w-variant-9e301513-bb31-a799-9ca0-2d690dec60e2 blog-subscribe_button"
                    >
                      Subscribe
                    </button>
                  </form>
                  <div className="blog-subscribe_note">
                    No spam. Just new posts, launches, and the occasional sharp
                    ENS update.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
