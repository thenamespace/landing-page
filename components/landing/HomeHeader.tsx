/**
 * HomeHeader — Hero section (`section_home-header`)
 * Includes: tag chip, h1, canvas particles, dotlottie player, mobile video, subcopy, CTA buttons
 */
"use client";

import { useEffect } from "react";

/* ─── Particle system ─── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  a: number; maxA: number;
  life: number; age: number;
}

function makeParticle(w: number, h: number, scattered = false): Particle {
  const life = 3500 + Math.random() * 4500;
  return {
    x: Math.random() * w,
    y: scattered ? Math.random() * h : h + Math.random() * 20,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -(0.15 + Math.random() * 0.35),
    r: 0.6 + Math.random() * 1.5,
    a: 0,
    maxA: 0.1 + Math.random() * 0.25,
    life,
    age: scattered ? Math.random() * life : 0,
  };
}

function runParticles(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const COUNT = 60;
  let w = 0, h = 0;
  let raf: number;

  function setSize() {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
  }

  setSize();
  const particles: Particle[] = Array.from({ length: COUNT }, () =>
    makeParticle(w, h, true)
  );

  const ro = new ResizeObserver(setSize);
  ro.observe(canvas);

  let prev = performance.now();

  function tick(now: number) {
    const dt = Math.min(now - prev, 50);
    prev = now;
    ctx!.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.age += dt;
      p.x += (p.vx * dt) / 16;
      p.y += (p.vy * dt) / 16;

      const fadeIn = 600, fadeOut = 700;
      if (p.age < fadeIn) {
        p.a = p.maxA * (p.age / fadeIn);
      } else if (p.age > p.life - fadeOut) {
        p.a = p.maxA * Math.max(0, (p.life - p.age) / fadeOut);
      } else {
        p.a = p.maxA;
      }

      if (p.age >= p.life || p.y < -10) {
        particles[i] = makeParticle(w, h);
        continue;
      }

      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(255,255,255,${p.a.toFixed(3)})`;
      ctx!.fill();
    }

    raf = requestAnimationFrame(tick);
  }

  raf = requestAnimationFrame(tick);

  return () => {
    ro.disconnect();
    cancelAnimationFrame(raf);
  };
}

function ButtonArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="auto" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
      <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WfButton({ href, label, variant = "primary" }: { href: string; label: string; variant?: "primary" | "outline" | "white" | "ghost" }) {
  const variantClass = variant === "outline" ? " is-hero-outline" : variant === "white" ? " is-hero-white" : variant === "ghost" ? " is-hero-ghost" : " is-accent";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`button w-inline-block${variantClass}`}>
      <div className="button_text">{label}</div>
      <div className="button_icon-wrapper">
        <div className="button_icon-item"><div className="button_icon is-hover w-embed"><ButtonArrow /></div></div>
        <div className="button_icon-item"><div className="button_icon is-hover w-embed"><ButtonArrow /></div></div>
      </div>
    </a>
  );
}

export function HomeHeader() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.getElementById("particles") as HTMLCanvasElement | null;
    if (!canvas) return;
    return runParticles(canvas);
  }, []);

  return (
    <header id="hero" className="section_home-header">
      <div className="home-header_component">
        <div padding-global="" container="large">
          <div className="home-header_heading-wrapper">
            <div className="z-index-1">
              <div data-wf--component-tag--variant="background-blur" className="tag w-variant-1ec346f0-aef7-27e9-e90b-2eb557766f44">
                <div>ENS Service Provider</div>
                <div className="icon-embed-custom1 w-embed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3.20898 7.1826C3.08735 6.63471 3.10603 6.06497 3.26328 5.52622C3.42053 4.98746 3.71127 4.49714 4.10854 4.1007C4.50581 3.70427 4.99674 3.41455 5.53582 3.25843C6.0749 3.1023 6.64468 3.08482 7.19232 3.2076C7.49374 2.73619 7.90898 2.34823 8.39977 2.07951C8.89056 1.81078 9.4411 1.66992 10.0006 1.66992C10.5602 1.66992 11.1107 1.81078 11.6015 2.07951C12.0923 2.34823 12.5076 2.73619 12.809 3.2076C13.3575 3.08429 13.9282 3.10169 14.4681 3.2582C15.0081 3.4147 15.4997 3.70522 15.8972 4.10273C16.2947 4.50024 16.5852 4.99183 16.7417 5.53177C16.8982 6.07171 16.9156 6.64246 16.7923 7.19093C17.2637 7.49236 17.6517 7.9076 17.9204 8.39839C18.1891 8.88918 18.33 9.43972 18.33 9.99927C18.33 10.5588 18.1891 11.1094 17.9204 11.6001C17.6517 12.0909 17.2637 12.5062 16.7923 12.8076C16.9151 13.3552 16.8976 13.925 16.7415 14.4641C16.5854 15.0032 16.2957 15.4941 15.8992 15.8914C15.5028 16.2886 15.0125 16.5794 14.4737 16.7366C13.9349 16.8939 13.3652 16.9126 12.8173 16.7909C12.5163 17.2642 12.1007 17.6538 11.6091 17.9237C11.1175 18.1936 10.5657 18.3351 10.0048 18.3351C9.44396 18.3351 8.89217 18.1936 8.40054 17.9237C7.90892 17.6538 7.49335 17.2642 7.19232 16.7909C6.64468 16.9137 6.0749 16.8962 5.53582 16.7401C4.99674 16.584 4.50581 16.2943 4.10854 15.8978C3.71127 15.5014 3.42053 15.0111 3.26328 14.4723C3.10603 13.9336 3.08735 13.3638 3.20898 12.8159C2.73395 12.5153 2.34266 12.0994 2.07152 11.6069C1.80038 11.1145 1.6582 10.5614 1.6582 9.99927C1.6582 9.4371 1.80038 8.88405 2.07152 8.39159C2.34266 7.89912 2.73395 7.48323 3.20898 7.1826Z" fill="#5474F6"/>
                    <path d="M7.5 10.0007L9.16667 11.6673L12.5 8.33398" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="z-index-1">Name the next<br/>billion Web3 users</h1>
            <canvas id="particles" className="home-header_canvas" />
          </div>
        </div>

        {/* Desktop Lottie */}
        <div id="first-lottie-container" className="home-header_lottie-wrapper">
          <div className="home-header_lottie-embed w-embed">
            {/* @ts-expect-error dotlottie-player is a web component loaded via CDN */}
            <dotlottie-player
              id="first-lottie"
              src="/assets/lottie/namespace-home.lottie"
              background="transparent"
              speed="1"
              loop
              autoplay
              poster="/assets/images/hero-video-poster.jpg"
              style={{ width: "auto", height: "auto" }}
              renderer="svg"
            />
          </div>

          {/* Mobile video fallback */}
          <div
            data-poster-url="/assets/images/hero-video-poster.jpg"
            data-video-urls="/assets/video/hero_compressed.mp4,/assets/video/hero_compressed.webm"
            data-autoplay="true"
            data-loop="true"
            className="home-header_mobile-video w-background-video w-background-video-atom"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              data-object-fit="cover"
              style={{ backgroundImage: "url(/assets/images/hero-video-poster.jpg)" }}
            >
              <source src="/assets/video/hero_compressed.mp4" />
              <source src="/assets/video/hero_compressed.webm" />
            </video>
          </div>
        </div>

        {/* Bottom: subcopy + CTAs */}
        <div padding-global="">
          <div container="large">
            <div className="home-header_bottom">
              <div className="max-width-medium is-37rem">
                <p className="text-size-medium text-weight-medium">
                  Namespace is an ENS DAO-backed service provider that helps wallets, chains, apps, agents, and communities build ENS naming and identity systems. Fast to integrate. Built for scale.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1.25rem" }}>
                {/* Proof strip */}
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.5, margin: 0 }}>
                  <span style={{ color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>&gt;850k</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 500 }}> subnames. </span>
                  <span style={{ color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>16M</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 500 }}> resolutions. </span>
                  <span style={{ color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>30+</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 500 }}> clients.</span>
                </p>
                <div className="button-group is-right">
                  <div className="tablet-max-width-full">
                    <WfButton href="https://app.namespace.ninja/" label="Launch App" variant="white" />
                  </div>
                  <div className="tablet-max-width-full">
                    <WfButton href="https://docs.namespace.ninja/" label="Dev Docs" variant="outline" />
                  </div>
                  <div className="tablet-max-width-full">
                    <WfButton href="https://cal.com/thecap.eth/discovery" label="Book a call" variant="outline" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
