/**
 * Blog preview section — `section_blog`
 * Server component: reads the latest 3 posts from content/blog/ at build time.
 * Matches the Webflow HTML structure of the original section_blog section.
 */

import { getAllPosts, formatLongDate } from "@/lib/posts";
import { WebflowButton } from "@/components/ui/WebflowButton";
import Image from "next/image";

export async function BlogPreview() {
  const allPosts = await getAllPosts();
  const posts = allPosts.slice(0, 3);

  return (
    <section className="section_blog">
      <div padding-global="" className="section-inner-background no-border-radius background-color-secondary">
        <div container="large" className="padding-section-large is-top-medium is-small-mobile">
          <div className="blog_component">

            {/* Section heading */}
            <div className="component_heading">
              <div
                data-wf--component-tag--variant="dark"
                className="tag w-variant-b6bce3ac-5c2a-b1ee-66d6-218f87a88dd1"
              >
                <div>Blog</div>
              </div>
              <h2>Namespace Journal</h2>
            </div>

            {/* Post list */}
            <div className="blog_list-wrapper w-dyn-list">
              <div role="list" className="blog_list w-dyn-items">
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    role="listitem"
                    className="blog_item-wrapper w-dyn-item"
                  >
                    <a
                      href={`/blog/${post.slug}`}
                      className="blog_item w-inline-block"
                    >
                      <div
                        data-wf--component-blog-card--variant="base"
                        className="blog_card"
                      >
                        {/* Card image */}
                        <div className="blog_card-img-wrapper">
                          {post.image ? (
                            <Image
                              src={post.image}
                              loading="lazy"
                              width={70}
                              height={70}
                              alt={post.imageAlt ?? post.title}
                              className="blog_card-img"
                            />
                          ) : (
                            <img
                              src="/assets/images/eth-bg.png"
                              loading="lazy"
                              width={70}
                              alt={post.title}
                              className="blog_card-img"
                            />
                          )}
                        </div>

                        {/* Card content */}
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
                            <h3 className="heading-style-h5">{post.title}</h3>
                            <p className="text-color-black-600">
                              {post.description}
                            </p>
                          </div>
                          <div className="blog_card-date-wrapper">
                            <div>{formatLongDate(post.date)}</div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscribe block */}
            <div className="blog-subscribe">
              <div className="blog-subscribe_content">
                <div className="blog-subscribe_eyebrow">Subscribe</div>
                <h3 className="heading-style-h5">
                  Get every new post from Namespace Journal
                </h3>
                <p className="blog-subscribe_text text-size-medium text-weight-medium">
                  Case studies, ENS product updates, and ecosystem notes
                  delivered when something worth reading ships.
                </p>
              </div>
              <div className="blog-subscribe_form-block w-form">
                <form
                  id="blog-subscribe-form-home"
                  name="blog-subscribe-form-home"
                  data-name="Blog Subscribe Form Home"
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
                    id="blog-subscribe-home-email"
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

            {/* View All button */}
            <div className="button-group align-center">
              <WebflowButton
                label="View All"
                href="/blog"
                variant="secondary"
                external={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
