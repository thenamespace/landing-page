import React from "react";
import type { Solution } from "@/lib/solutions";

type Deck = NonNullable<Solution["decks"]>["items"][number];

/** Slide-deck cards: cover thumbnail and button, both linking to the hosted PDF. */
export function SolutionDecks({ items }: { items: Deck[] }) {
  return (
    <div className={`solution-decks${items.length === 1 ? " is-single" : ""}`}>
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
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
