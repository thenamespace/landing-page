'use client';

import { useEffect, useState } from 'react';

type Heading = { level: number; id: string; text: string };

export function TocNav({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-10% 0% -70% 0%' },
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc-nav">
      <p className="toc-label">Contents</p>
      <ul className="toc-list">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={[
                'post-toc-link',
                h.level === 3 ? 'is-h3' : '',
                activeId === h.id ? 'is-active' : '',
              ].filter(Boolean).join(' ')}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
