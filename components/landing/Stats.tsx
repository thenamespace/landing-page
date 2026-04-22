"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: ">800k", label: "Subnames", description: "Actively managed and run client subnames." },
  { value: "15M", label: "Resolutions", description: "The historical usage of all subnames issued." },
  { value: "30+", label: "Clients", description: "We love building with web3 teams." },
  { value: "220", label: "Namespaces", description: "Number of activated ENS names issuing subnames." },
  { value: "130", label: "ENS Widgets", description: "Number of ENS Widget installations across websites." },
];

function parseValue(raw: string): { prefix: string; num: number; suffix: string } {
  const match = raw.match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);
  if (!match) return { prefix: "", num: 0, suffix: raw };
  return { prefix: match[1], num: parseInt(match[2], 10), suffix: match[3] };
}

function StatCard({ stat }: { stat: (typeof STATS)[number] }) {
  const { prefix, num, suffix } = parseValue(stat.value);
  const [displayed, setDisplayed] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    const duration = 1800;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [triggered, num]);

  return (
    <div ref={ref} className="stats_item">
      <div className="stats_card">
        <h3 className="heading-style-h2 text-line-height-normal mobile-h1">
          {prefix}{displayed}{suffix}
        </h3>
        <div className="stats_card-content">
          <p className="text-size-medium text-weight-medium">{stat.label}</p>
          <p className="text-color-black-900">{stat.description}</p>
        </div>
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="section_stats">
      <div padding-global="" className="section-inner-background is-top-only background-color-secondary">
        <div container="large" className="padding-section-medium is-top-xlarge-mobile">
          <div className="stats_component">
            <div data-wf--component-heading-center--variant="gap-1rem" className="component_heading w-variant-c9a5a966-524c-263c-caa2-6c07211e9b42">
              <div data-wf--component-tag--variant="dark" className="tag w-variant-b6bce3ac-5c2a-b1ee-66d6-218f87a88dd1">
                <div>Namespace Stats</div>
              </div>
              <h2>Impact in numbers</h2>
            </div>
            <div className="stats_list">
              {STATS.map((s) => <StatCard key={s.label} stat={s} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
