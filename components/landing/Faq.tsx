"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface FaqItem { question: string; answer: string; category: string; }

const FAQ_DATA: FaqItem[] = [
  { question: "What is Namespace?", answer: "Namespace is an ENS service provider working on Web3 naming and identity.", category: "General" },
  { question: "Mission?", answer: "To name every crypto user by building and operating universal naming infrastructure for wallets, applications, and blockchains.", category: "General" },
  { question: "Vision?", answer: "A decentralized internet where every user, AI agent, contract, asset, and blockchain record is identified by a name first and address second.", category: "General" },
  { question: "Is Namespace a protocol or a company?", answer: "Namespace is a company that builds production-grade infra, tooling, and apps on top of open protocols like ENS.", category: "General" },
  { question: "How is Namespace different from ENS itself?", answer: "ENS is a protocol. Namespace is execution and distribution engine. ENS defines how names work; Namespace builds the systems that make naming easily usable at scale.", category: "General" },
  { question: "How big is Namespace today?", answer: "Namespace manages 800k+ subnames, serves millions of resolution requests, and works with 30+ partners across wallets, chains, DAOs, and apps.", category: "General" },
  { question: "What happens if Namespace disappears?", answer: "Names are not trapped. ENS records are portable, resolvable, and recoverable. Namespace is infrastructure\u2014not a custodial lock-in.", category: "General" },
  { question: "How does Namespace make money?", answer: "We charge a fixed 5% fee on all minted subnames (if subnames have a price set). If subnames are minted for free, we don\u2019t charge anything.", category: "General" },
  { question: "What\u2019s the difference between onchain and offchain subnames?", answer: "Onchain: on Ethereum or L2s, higher guarantees, mint costs, NFTs. Offchain: stored in database, free to create, and designed for scale.", category: "Technology" },
  { question: "Are offchain names secure?", answer: "Yes. They are signed, verifiable, and resolvable through ENS standards. They trade onchain guarantees for scalability and cost efficiency.", category: "Technology" },
  { question: "Does Namespace support L2s and rollups?", answer: "Yes. Currently we support Base, Optimism, Celo, Filecoin, with custom deployments tailored to each ecosystem.", category: "Technology" },
  { question: "Is Namespace production-ready?", answer: "Yes. Namespace infrastructure is live, battle-tested, and already operating at large scale with real users.", category: "Technology" },
  { question: "Who typically integrates Namespace?", answer: "Wallets, L2s and rollups, apps and platforms, defi and payment apps, AI agent platforms, DAOs and communities.", category: "Integrations" },
  { question: "How long does an integration take?", answer: "Depending on scope, anywhere from a few days to a few weeks. Namespace works with you from brainstorming to launch to post-launch support.", category: "Integrations" },
  { question: "Why not build this ourselves?", answer: "Many teams try. Most underestimate the complexity. Running naming infrastructure at scale requires resolvers, indexing, metadata services, security, monitoring, and syncing with protocol updates.", category: "Integrations" },
  { question: "Do you provide SDKs and APIs?", answer: "Yes. Namespace provides SDK / API and documentation to issue, manage, and resolve subnames.", category: "Integrations" },
  { question: "Does Namespace offer ongoing support?", answer: "Yes. We work as a long-term infrastructure partner, not a one-off vendor. Currently we support Celo (Celonames) and Filecoin (Filpay usernames).", category: "Integrations" },
];

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
  const [filter, setFilter] = useState<string | null>(null);
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
