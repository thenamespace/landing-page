"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import type { SolutionFaqItem } from "@/lib/solutions";

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="#1F1F1F"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FaqAccordion({ item }: { item: SolutionFaqItem }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) setHeight(bodyRef.current.scrollHeight);
  }, [open]);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <div
      role="listitem"
      className={`faq_accordion w-dyn-item${open ? " is-active" : ""}`}
    >
      <div
        className="faq_question"
        onClick={toggle}
        style={{ cursor: "pointer" }}
      >
        <div className="faq_qustion-title">{item.question}</div>
        <div
          className="faq_icon-wrapper"
          style={{
            transform: open ? "rotate(180deg)" : undefined,
            transition: "transform 0.3s",
          }}
        >
          <div className="icon-embed-small w-embed">
            <ChevronIcon />
          </div>
        </div>
      </div>
      <div
        className="faq_answer"
        ref={bodyRef}
        style={{
          maxHeight: open ? `${height}px` : 0,
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.3s ease",
        }}
      >
        <div className="margin-bottom margin-small">
          <div className="faq_answer-rich-text w-richtext">
            <p>{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SolutionFaqList({ items }: { items: SolutionFaqItem[] }) {
  return (
    <div className="faq_list-wrapper w-dyn-list">
      <div role="list" className="faq_list w-dyn-items">
        {items.map((item) => (
          <FaqAccordion key={item.question} item={item} />
        ))}
      </div>
    </div>
  );
}
