"use client";

/** Testimonials section — `section_testimonials` */

import { useEffect, useRef, RefObject } from "react";

const AVATAR_IMGS = [
  "/assets/images/694bd50fd4ef2c02a7f4127b_Frame_1948759081.avif",
  "/assets/images/694bd50f07dc9ec869c69916_Frame_1948759082.avif",
  "/assets/images/694bd50fd6098f26a89c6368_Frame_1948759083.avif",
  "/assets/images/694bd50fc547fee6a2aca735_Frame_40.avif",
  "/assets/images/694bd50fe0b2986dfcef464f_Frame_41.avif",
];

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  { quote: "The Namespace team have been very proactive and supportive of our timelines to build an integrations with our offering. Definitely recommend working with them!", name: "Joan", title: "Founder of OpenFort", avatar: "/assets/images/699f3afee4d1ad2f81c16474_2026-02-25_19.09.57.jpg" },
  { quote: "Our experience working with Namespace has been exceptional. Their team combines strong technical expertise with clear communication and a true spirit of partnership.", name: "Kate", title: "Head of Product & GTM @ CELO", avatar: "/assets/images/katecelo.jpg" },
  { quote: "Namespace has been a core partner for PinMe. Their APIs are extremely easy to use, their subdomain infrastructure is stable and built for the long term.", name: "Ted", title: "Co-founder of PinMe", avatar: "/assets/images/699db60438b7e09254a8a526_EQWeTq4Y_400x400.jpg" },
  { quote: "From simple to complex Subname needs, Namespace has the tools and expertise to make it happen. Fully recommend.", name: "Simon", title: "Lead DevRel @ ENS Labs", avatar: "/assets/images/699db572c1a14ce8202c0dbd_7nc4pHHi_400x400.jpg" },
  { quote: "ENS is the future, and Namespace offers critical tools for making that happen", name: "brantly.eth", title: "Founder of EFP", avatar: "/assets/images/6943bcf398167d091b4ec3cb_image_36.avif" },
  { quote: "You've developed an innovative and frictionless way for people to monetize their domains, empowering users to unlock new value with ENS.", name: "Alex Netto", title: "Founder of Blockful", avatar: "/assets/images/6939861c5a3809f3d1031b83_image_37.avif" },
  { quote: "Namespace is providing a magical service. They made issuing thousands of subdomains for ETHDenver attendees simple and nearly effortless.", name: "Griff.eth", title: "Founder of Unicorn & Giveth", avatar: "/assets/images/6939863083b6df57e82c86a9_image_38.avif" },
  { quote: "We have found in Namespace an efficient partner that quickly understood our needs and provided very solid solutions", name: "Patricio", title: "Founder of POAP", avatar: "/assets/images/694bd50fd6098f26a89c6368_Frame_1948759083.avif" },
  { quote: "When I was exploring ways to launch a local onchain music community, Namespace immediately came to mind. Their tooling made it effortless.", name: "Marcus", title: "ENS DAO", avatar: "/assets/images/6939864407ffd7357d3d36d1_image_40.avif" },
  { quote: "Namespace has quickly become the go-to platform for managing ENS subnames. What was once confusing and error-prone is now a streamlined, intuitive experience.", name: "Ben", title: "Co-founder of ETH.LIMO", avatar: "/assets/images/69398653f54fc038c265ecc4_image_42.avif" },
  { quote: "Y'all are killing it and I think every product should have their own subname. And y'all are now my go-to rec. Love y'all 💛", name: "Jesse Pollak", title: "Founder of Base", avatar: "/assets/images/6939867a78c312a0e9e92967_image_34.avif" },
  { quote: "Namespace is the best tool for creating and issuing ENS subdomains, I think. The dashboard is very easy to use.", name: "Sahil", title: "DevRel at QuickNode", avatar: "/assets/images/6939869e90d86d5d4df98222_image_35.avif" },
  { quote: "Our collaboration with Namespace and the Web3.js Plugin went really well. The plugin enabled developers to register and interact with ENS domains.", name: "Santiago", title: "DevRel at Web3js", avatar: "/assets/images/693986b5f56458b7d3442a05_image_39.avif" },
  { quote: "The Namespace team is incredibly friendly and a pleasure to work with. Their passion and dedication to the ENS ecosystem are evident in everything they do.", name: "Thomas Clowes", title: "Co-founder of Unruggable", avatar: "/assets/images/693986cdc6a6e7b3c889525e_image_41.avif" },
  { quote: "Namespace helped PizzaDAO's members mint subnames to show their affiliation all over the metaverse. The pizza flavored minting website is *chef's kiss*.", name: "snax.eth", title: "Head of Stuff at PizzaDAO", avatar: "/assets/images/693986e1ae6d65f8a86b5a9c_image_43.avif" },
];

// Alternate distribution matching the original JS: even indices → top, odd indices → bottom
const TOP_TESTIMONIALS = TESTIMONIALS.filter((_, i) => i % 2 === 0);
const BOTTOM_TESTIMONIALS = TESTIMONIALS.filter((_, i) => i % 2 !== 0);

function QuoteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z" fill="#5474F6"/>
    </svg>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div role="listitem" className="testimonials_item w-dyn-item">
      <div className="testimonials_card">
        <div className="testimonials_card-top">
          <div className="testimonials_quote-wrapper">
            <div className="icon-embed-xsmall w-embed"><QuoteIcon /></div>
          </div>
          <div className="testimonial_rich-text w-richtext">
            <blockquote>{t.quote}</blockquote>
          </div>
        </div>
        <div className="testimonials_card-author-wrapper">
          <div className="testimonials_author-avatar-wrapper">
            <img loading="lazy" src={t.avatar} alt={`${t.name} testimonial photo`} className="testimonials_author-avatar" />
          </div>
          <div className="testimonials_card-author-info">
            <p className="text-size-medium text-weight-bold is-author">{t.name}</p>
            <p className="text-size-small text-weight-medium is-testimonials-author-title">{t.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function useMarquee(
  listRef: RefObject<HTMLDivElement | null>,
  direction: "left" | "right"
) {
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const speed = 0.6;
    let currentSpeed = speed;
    const slowSpeed = speed / 2;
    let position = 0;
    let setWidth = 0;
    let rafId = 0;

    function updateSetWidth() {
      setWidth = list!.scrollWidth / 3;
    }

    function animate() {
      if (direction === "left") {
        position -= currentSpeed;
        if (position <= -setWidth) position += setWidth;
      } else {
        position += currentSpeed;
        if (position >= 0) position -= setWidth;
      }
      list!.style.transform = `translateX(${position}px)`;
      rafId = requestAnimationFrame(animate);
    }

    const wrapper = list.parentElement;
    const onEnter = () => { currentSpeed = slowSpeed; };
    const onLeave = () => { currentSpeed = speed; };
    wrapper?.addEventListener("mouseenter", onEnter);
    wrapper?.addEventListener("mouseleave", onLeave);

    let resizeTimeout: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const oldWidth = setWidth;
        updateSetWidth();
        if (oldWidth !== 0) position = (position / oldWidth) * setWidth;
      }, 100);
    }
    window.addEventListener("resize", onResize);

    updateSetWidth();
    if (direction === "right") position = -setWidth;
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      wrapper?.removeEventListener("mouseenter", onEnter);
      wrapper?.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimeout);
    };
  }, [listRef, direction]);
}

function MarqueeRow({
  testimonials,
  direction,
}: {
  testimonials: Testimonial[];
  direction: "left" | "right";
}) {
  const listRef = useRef<HTMLDivElement>(null);
  useMarquee(listRef, direction);

  // Triplicate for seamless looping (matches original JS: innerHTML × 3)
  const tripled = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div ref={listRef} style={{ display: "flex", gap: "1.25rem", willChange: "transform" }}>
      {tripled.map((t, i) => (
        <TestimonialCard key={`${t.name}-${i}`} t={t} />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="section_testimonials">
      <div className="padding-section-large is-top-medium is-custom-padding-mobile">
        <div padding-global="">
          <div container="large">
            <div className="margin-bottom margin-xlarge">
              <div className="component_heading">
                <div className="tag is-testimonials">
                  <div className="small-avatars_list">
                    {AVATAR_IMGS.map((src, i) => (
                      <div key={src} className={`small-avatars_circle${i === 0 ? " is-first" : ""}`}>
                        <img src={src} loading="lazy" alt="ENS partner avatar" className="small-avatars_img" />
                      </div>
                    ))}
                  </div>
                  <div>Join<span className="text-weight-bold"> 30+</span> Partners</div>
                </div>
                <h2>Wall of Love</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="testimonials_component">
          <div className="testimonials_top-wrapper">
            <div className="testimonials_top-list">
              <MarqueeRow testimonials={TOP_TESTIMONIALS} direction="left" />
            </div>
          </div>
          <div className="testimonials_bottom-wrapper">
            <div className="testimonials_bottom-list">
              <MarqueeRow testimonials={BOTTOM_TESTIMONIALS} direction="right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
