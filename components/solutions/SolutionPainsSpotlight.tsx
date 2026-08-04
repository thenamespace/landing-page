"use client";
import { useEffect, useRef, useState } from "react";

interface PainItem {
  question: string;
  detail: string;
}

function renderBoldParts(text: string, keyBase: number) {
  return text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <b key={`${keyBase}-${i}`}>{part.slice(2, -2)}</b>;
    }
    if (part.startsWith("__") && part.endsWith("__")) {
      return (
        <span key={`${keyBase}-${i}`} className="solution-spotlight-name">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

/** Renders [text](url) links and **bold** inside copy strings. */
function renderLinks(text: string) {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  const out: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) out.push(...renderBoldParts(parts[i], i));
    if (parts[i + 1] && parts[i + 2]) {
      out.push(
        <a
          key={i}
          href={parts[i + 2]}
          target="_blank"
          rel="noopener noreferrer"
          className="solution-spotlight-link"
        >
          {parts[i + 1]}
        </a>
      );
    }
  }
  return out;
}

/**
 * Problem section spotlight: stacked full-width cards, each with an accent
 * edge, a NN / NN counter, title left and body right. The card nearest the
 * viewport center is at full emphasis; the others dim.
 */
export function SolutionPainsSpotlight({ items }: { items: PainItem[] }) {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items.length]);

  const total = String(items.length).padStart(2, "0");

  return (
    <div className="solution-spotlight-cards is-wide">
      {items.map((item, i) => (
        <div
          key={item.question}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={`solution-spotlight-card is-split${i === active ? " is-active" : ""}`}
        >
          <div className="solution-spotlight-left">
            <div className="solution-spotlight-counter" aria-hidden="true">
              {String(i + 1).padStart(2, "0")} <i>/ {total}</i>
            </div>
            <h3 className="solution-spotlight-title">{item.question}</h3>
          </div>
          <p className="text-weight-medium solution-spotlight-detail">
            {renderLinks(item.detail)}
          </p>
        </div>
      ))}
    </div>
  );
}
