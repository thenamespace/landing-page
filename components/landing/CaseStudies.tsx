/**
 * CaseStudies — `section_case-studies`
 * Trusted by Ecosystem Leaders cards + partner logos CSS marquee
 */
"use client";

import { useEffect } from "react";

const CASE_STUDIES = [
  {
    logo: "/assets/images/6945373585d07009e09683b9_Frame-1.svg",
    logoAlt: "Celo logo",
    logoDark: "/assets/images/692476dfa4f0ba1f2f910485_Frame.svg",
    description: "ENS-based L2 identity system",
    href: "https://ens.domains/blog/post/celonames-powered-by-ens",
  },
  {
    logo: "/assets/images/69453736a38b1ae29d53e471_Layer_1-1.svg",
    logoAlt: "Unicorn wallet logo",
    logoDark: "/assets/images/69396bb2c7b3e3f8f9f1d86f_Layer_1.svg",
    description: "In-app brandable usernames",
    href: null,
  },
  {
    logo: "/assets/images/69396bb1d9197e1281b20ef7_Frame.svg",
    logoAlt: "Filecoin logo",
    logoDark: "/assets/images/69396bb127f72f88384e7491_Frame-1.svg",
    description: "Wallet names for users",
    href: "/blog/case-study-namespace-x-unicorn",
  },
  {
    logo: "/assets/images/69453736ec25da42ad60eee7_Layer_1.svg",
    logoAlt: "PinMe logo",
    logoDark: "/assets/images/69453767fac7dca59df68820_Layer_1.svg",
    description: "Forever Frontends",
    href: "/blog/case-study-pinme-forever-frontends",
  },
];

const MARQUEE_LOGOS = [
  { src: "/assets/images/697cc595651621cb691e2b47_67914172ef2b2164c18cc4a6_ethereum-logo-landscape-black.b8f4e822.avif", alt: "Ethereum logo" },
  { src: "/assets/images/697cc595a7541c3b4424b837_6792411b716f452d40758d3e_Horizontal_-_positive_-_ETH_Belgrade_2024_-_logo_1).avif", alt: "ETH Belgrade 2024 logo" },
  { src: "/assets/images/697cc5952aceb77dfc44b9d5_679142bb2c13999bca9c8ce9_unruggable.avif", alt: "Unruggable logo" },
  { src: "/assets/images/697cc59599ee554b9905c4a6_679142958c0bfa572205dad1_tatum.avif", alt: "Tatum logo" },
  { src: "/assets/images/697cc595dcfcb06d8b5f1503_679142c695a0bcfd9239d9b7_webhash.avif", alt: "WebHash logo" },
  { src: "/assets/images/697cc5951a0de2abc8bd612f_6791455243f0e6b3a6f220cd_QuickNode_Logo-removebg-preview.avif", alt: "QuickNode logo" },
  { src: "/assets/images/697cc595581804a87be59864_679142a989531e77b203cf1e_PizzaDAO_v1.avif", alt: "PizzaDAO logo" },
  { src: "/assets/images/697cc59567793dd90ef63d46_6791415e75c709885f068d06_Chainlink-Logo-Blue.avif", alt: "Chainlink logo" },
  { src: "/assets/images/697cc923f007505845e4e5c3_679141b07d863b8ee74abec0_web3js.avif", alt: "web3.js logo" },
  { src: "/assets/images/697cc94123af522db7e3d6e5_6791456d2ecc68c949fc9701_full_width.avif", alt: "Namespace ecosystem partner logo" },
  { src: "/assets/images/697cc595b1532dba22f0b182_6791423c8489ea6db83c2dd4_farcaster.avif", alt: "Farcaster logo" },
  { src: "/assets/images/697cca0a8aa031b8b4b94f80_67914273b2bccf0a05b6ace8_unicorn.avif", alt: "Unicorn wallet logo" },
  { src: "/assets/images/697cc5953cbe3aa2a4645a87_6791414a815d01b21928fd31_ens-logo-Blue.avif", alt: "ENS (Ethereum Name Service) logo" },
  { src: "/assets/images/697cc59526d2aadebe5b6e31_679141811b052c7fa1b7da20_Optimism-Red-48.avif", alt: "Optimism logo" },
  { src: "/assets/images/697cc59512bb10897a804059_6791413327ac1794c6681789_Base-logo.avif", alt: "Base logo" },
];

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" shapeRendering="crispEdges">
      <path d="M1 9 L9 1 M9 1 H3 M9 1 V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LogoMarquee() {
  // Duplicate logos for seamless infinite loop
  const allLogos = [...MARQUEE_LOGOS, ...MARQUEE_LOGOS];

  return (
    <div className="partner-marquee">
      <div className="partner-marquee-track">
        {allLogos.map((logo, i) => (
          <div key={`${logo.alt}-${i}`} className="partner-marquee-item">
            <img loading="eager" src={logo.src} alt={logo.alt} className="marquee-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CaseStudies() {
  useEffect(() => {
    // Custom cursor hover effect for case studies list (desktop only)
    if (window.matchMedia("(max-width: 1025px)").matches) return;

    const list = document.querySelector(".case-studies_list") as HTMLElement | null;
    const hoverDiv = document.querySelector(".case-studies-card_hover") as HTMLElement | null;

    if (!list || !hoverDiv) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let isHovering = false;
    let animationFrame: number | null = null;

    hoverDiv.style.position = "fixed";
    hoverDiv.style.pointerEvents = "none";
    hoverDiv.style.opacity = "0";
    hoverDiv.style.willChange = "transform, opacity";
    hoverDiv.style.top = "0";
    hoverDiv.style.left = "0";
    hoverDiv.style.zIndex = "9999";

    function animate() {
      const ease = 0.15;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;
      if (hoverDiv) {
        hoverDiv.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }

      if (!isHovering) {
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          if (animationFrame !== null) cancelAnimationFrame(animationFrame);
          animationFrame = null;
          return;
        }
      }
      animationFrame = requestAnimationFrame(animate);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isHovering) {
        isHovering = true;
        currentX = mouseX;
        currentY = mouseY;
        if (hoverDiv) hoverDiv.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      if (!animationFrame) animate();
    };

    const onMouseEnter = () => {
      isHovering = true;
      list.style.cursor = "none";
      if (hoverDiv) {
        hoverDiv.style.opacity = "1";
        hoverDiv.style.transition = "opacity 0.3s ease";
      }
    };

    const onMouseLeave = () => {
      isHovering = false;
      list.style.cursor = "";
      if (hoverDiv) {
        hoverDiv.style.opacity = "0";
        hoverDiv.style.transition = "opacity 0.3s ease";
      }
      if (!animationFrame) animate();
    };

    list.addEventListener("mousemove", onMouseMove);
    list.addEventListener("mouseenter", onMouseEnter);
    list.addEventListener("mouseleave", onMouseLeave);

    return () => {
      list.removeEventListener("mousemove", onMouseMove);
      list.removeEventListener("mouseenter", onMouseEnter);
      list.removeEventListener("mouseleave", onMouseLeave);
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section id="case-studies" className="section_case-studies">
      <div padding-global="" className="section-inner-background is-top-only background-color-secondary">
        <div container="large" className="padding-section-medium is-bottom-small is-larger-mobile">
          <div className="case-studies_component">
            <div data-wf--component-tag--variant="dark" className="tag w-variant-b6bce3ac-5c2a-b1ee-66d6-218f87a88dd1">
              <div>Trusted by Ecosystem Leaders</div>
            </div>

            {/* Partner logos marquee — right to left */}
            <div className="case-studies_marquee-wrapper">
              <LogoMarquee />
            </div>

            <div className="case-studies_wrapper">
              <div className="case-studies_list">
                {/* Custom cursor div — positioned via JS in useEffect */}
                <div className="case-studies-card_hover">
                  <div className="custom-cursor w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 22 26" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.839844 4.54736L7.07051 24.3637L10.7332 17.634L10.9391 17.2987L19.859 14.4941L0.839844 4.54736Z" fill="black" stroke="#878787"/>
                    </svg>
                  </div>
                  <div className="case-studies-card_hover-text">Read Case Study</div>
                </div>

                {CASE_STUDIES.map((study) => {
                  const inner = (
                    <div className="case-studies_card">
                      <div className="case-studies-card_logo-wrapper">
                        <img src={study.logo} loading="lazy" width={126} alt={study.logoAlt} className="case-studies-card_logo is-white"/>
                        <img src={study.logoDark} loading="lazy" alt={study.logoAlt} className="case-studies-card_logo"/>
                      </div>
                      <p className="pointer-events-none">{study.description}</p>
                      <div className="case-studies-card_arrow-wrapper">
                        <div className="icon-embed-custom w-embed"><ArrowIcon /></div>
                      </div>
                    </div>
                  );
                  if (study.href) {
                    return (
                      <a key={study.description} href={study.href} target="_blank" className="case-studies_item w-inline-block">
                        {inner}
                      </a>
                    );
                  }
                  return (
                    <div key={study.description} className="case-studies_item">
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
