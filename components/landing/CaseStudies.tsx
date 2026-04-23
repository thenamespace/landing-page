/**
 * CaseStudies — `section_case-studies`
 * Trusted by Ecosystem Leaders cards + partner logos CSS marquee
 */
"use client";

import { useEffect } from "react";

const CASE_STUDIES = [
  {
    logo: "/assets/images/logo-celo.svg",
    logoAlt: "Celo logo",
    logoDark: "/assets/images/logo-celo-dark.svg",
    description: "ENS-based L2 identity system",
    href: "https://ens.domains/blog/post/celonames-powered-by-ens",
  },
  {
    logo: "/assets/images/logo-unicorn-wallet.svg",
    logoAlt: "Unicorn wallet logo",
    logoDark: "/assets/images/logo-unicorn-wallet-dark.svg",
    description: "In-app brandable usernames",
    href: null,
  },
  {
    logo: "/assets/images/logo-filecoin.svg",
    logoAlt: "Filecoin logo",
    logoDark: "/assets/images/logo-filecoin-dark.svg",
    description: "Wallet names for users",
    href: "/blog/case-study-namespace-x-unicorn",
  },
  {
    logo: "/assets/images/logo-pinme.svg",
    logoAlt: "PinMe logo",
    logoDark: "/assets/images/logo-pinme-dark.svg",
    description: "Forever Frontends",
    href: "/blog/case-study-pinme-forever-frontends",
  },
];

const MARQUEE_LOGOS = [
  { src: "/assets/images/partner-ethereum.avif", alt: "Ethereum logo" },
  { src: "/assets/images/partner-eth-belgrade.avif", alt: "ETH Belgrade 2024 logo" },
  { src: "/assets/images/partner-unruggable.avif", alt: "Unruggable logo" },
  { src: "/assets/images/partner-tatum.avif", alt: "Tatum logo" },
  { src: "/assets/images/partner-webhash.avif", alt: "WebHash logo" },
  { src: "/assets/images/partner-quicknode.avif", alt: "QuickNode logo" },
  { src: "/assets/images/partner-pizzadao.avif", alt: "PizzaDAO logo" },
  { src: "/assets/images/partner-chainlink.avif", alt: "Chainlink logo" },
  { src: "/assets/images/partner-web3js.avif", alt: "web3.js logo" },
  { src: "/assets/images/partner-namespace.avif", alt: "Namespace ecosystem partner logo" },
  { src: "/assets/images/partner-farcaster.avif", alt: "Farcaster logo" },
  { src: "/assets/images/partner-unicorn.avif", alt: "Unicorn wallet logo" },
  { src: "/assets/images/partner-ens.avif", alt: "ENS (Ethereum Name Service) logo" },
  { src: "/assets/images/partner-optimism.avif", alt: "Optimism logo" },
  { src: "/assets/images/partner-base.avif", alt: "Base logo" },
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

            {/* Partner logos marquee — right to left */}
            <div className="case-studies_marquee-wrapper">
              <LogoMarquee />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
