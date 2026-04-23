"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { FAQ_DATA } from "@/lib/faq-data";
import type { FaqItem } from "@/lib/faq-data";

function ChevronIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="#1F1F1F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function FaqAccordion({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) setHeight(bodyRef.current.scrollHeight);
  }, [open]);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <div role="listitem" className={`faq_accordion w-dyn-item${open ? " is-active" : ""}`}>
      <div className="faq_question" onClick={toggle} style={{ cursor: "pointer" }}>
        <div className="faq_qustion-title">{item.question}</div>
        <div className="faq_icon-wrapper" style={{ transform: open ? "rotate(180deg)" : undefined, transition: "transform 0.3s" }}>
          <div className="icon-embed-small w-embed"><ChevronIcon /></div>
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
          <div className="faq_answer-rich-text w-richtext"><p>{item.answer}</p></div>
        </div>
      </div>
    </div>
  );
}

const CATEGORIES = ["General", "Integrations", "Technology"];

export function Faq() {
  const [filter, setFilter] = useState<string | null>("General");
  const filtered = filter ? FAQ_DATA.filter((f) => f.category === filter) : FAQ_DATA;

  return (
    <section className="section_faq">
      <div padding-global="" className="section-inner-background is-bottom-only background-color-secondary">
        <div container="large" className="padding-section-large is-top-medium is-bottom-small-mobile">
          <div className="faq_component">
            <div data-wf--component-heading-center--variant="base" className="component_heading">
              <div data-wf--component-tag--variant="dark" className="tag w-variant-b6bce3ac-5c2a-b1ee-66d6-218f87a88dd1"><div>FAQ</div></div>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="faq_content">
              <div className="faq_filters-form-block w-form">
                <div className="faq_filters-list-wrapper w-dyn-list">
                  <div role="list" className="faq_filters-list w-dyn-items">
                    {CATEGORIES.map((cat) => (
                      <div key={cat} role="listitem" className="faq_filters-item w-dyn-item">
                        <label className="fs-checkbox_field w-radio" style={{ cursor: "pointer" }} onClick={() => setFilter(filter === cat ? null : cat)}>
                          <div className={`w-form-formradioinput w-form-formradioinput--inputType-custom fs-checkbox_button-1 w-radio-input${filter === cat ? " w--redirected-checked" : ""}`} />
                          <span className="fs-checkbox_label-1 w-form-label">{cat}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="faq_list-wrapper w-dyn-list">
                <div role="list" className="faq_list w-dyn-items">
                  {filtered.map((item) => <FaqAccordion key={item.question} item={item} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
