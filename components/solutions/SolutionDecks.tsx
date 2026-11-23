import React from "react";
import type { Solution } from "@/lib/solutions";

type Deck = NonNullable<Solution["decks"]>["items"][number];

/** Slide-deck cards: cover thumbnail linking to the hosted PDF, plus an optional secondary link. */
export function SolutionDecks({ items }: { items: Deck[] }) {
  return (
    <div className="solution-decks">
      {items.map((deck) => (
        <article key={deck.pdf} className="solution-deck">
          <a
            href={deck.pdf}
            target="_blank"
            rel="noopener"
            className="solution-deck-cover"
            aria-label={`${deck.title} (PDF)`}
          >
            <img src={deck.cover} alt={deck.coverAlt} loading="lazy" width={1280} height={720} />
          </a>
          <div className="solution-deck-body">
            <span className="solution-deck-kind">{deck.kind}</span>
            <h3 className="heading-style-h6">{deck.title}</h3>
            <p>{deck.description}</p>
            <div className="solution-deck-links">
              <a href={deck.pdf} target="_blank" rel="noopener" className="solution-deck-link is-primary">
                View slides (PDF)
              </a>
              {deck.secondary && (
                <a
                  href={deck.secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="solution-deck-link"
                >
                  {deck.secondary.label}
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
