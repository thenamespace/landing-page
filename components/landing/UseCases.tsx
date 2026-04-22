/** UseCases section — `section_use-cases` */

interface UseCase {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  srcSet?: string;
}

const USE_CASES_ROWS: UseCase[][] = [
  [
    {
      id: "wallet-names",
      title: "Wallet names",
      description: "Users get a human-readable wallet name during onboarding or in app, improving UX, social presence, and transaction safety.",
      image: "/assets/images/692dbc0488bc6f0f7f33b502_Frame_1948758912.avif",
      imageAlt: "ENS subnames for wallet names — use case illustration",
      srcSet: "/assets/images/692dbc0488bc6f0f7f33b502_Frame_1948758912-p-500.avif 500w, /assets/images/692dbc0488bc6f0f7f33b502_Frame_1948758912-p-800.avif 800w, /assets/images/692dbc0488bc6f0f7f33b502_Frame_1948758912.avif 826w",
    },
    {
      id: "chain-identity-system",
      title: "Chain identity system",
      description: "L2s and rollups offer subnames to all users as a unified identity layer for the chain. One namespace for all users and builders.",
      image: "/assets/images/692dbc04e08c4a98a7f3b5dd_Frame_1948759065.avif",
      imageAlt: "ENS chain identity system for L2 rollups — use case illustration",
      srcSet: "/assets/images/692dbc04e08c4a98a7f3b5dd_Frame_1948759065-p-500.avif 500w, /assets/images/692dbc04e08c4a98a7f3b5dd_Frame_1948759065-p-800.avif 800w, /assets/images/692dbc04e08c4a98a7f3b5dd_Frame_1948759065.avif 826w",
    },
  ],
  [
    {
      id: "decentralized-websites",
      title: "Decentralized websites",
      description: "Deploy and pin websites to a censorship-resistant, decentralized domains and subdomains.",
      image: "/assets/images/692dbd70293872c06c109eb9_Frame_1948758911.avif",
      imageAlt: "Decentralized ENS websites — use case illustration",
      srcSet: "/assets/images/692dbd70293872c06c109eb9_Frame_1948758911-p-500.avif 500w, /assets/images/692dbd70293872c06c109eb9_Frame_1948758911-p-800.avif 800w, /assets/images/692dbd70293872c06c109eb9_Frame_1948758911-p-1080.avif 1080w, /assets/images/692dbd70293872c06c109eb9_Frame_1948758911-p-1600.avif 1600w, /assets/images/692dbd70293872c06c109eb9_Frame_1948758911.avif 1694w",
    },
  ],
  [
    {
      id: "ai-agent-names",
      title: "AI Agent identity",
      description: "Assign persistent, verifiable identities to AI agents. Supported in ERC-8004 standard.",
      image: "/assets/images/693c0a965213fac9ae43c643_Frame_1948759080.avif",
      imageAlt: "AI agent ENS identity — use case illustration",
      srcSet: "/assets/images/693c0a965213fac9ae43c643_Frame_1948759080-p-500.avif 500w, /assets/images/693c0a965213fac9ae43c643_Frame_1948759080-p-800.avif 800w, /assets/images/693c0a965213fac9ae43c643_Frame_1948759080.avif 827w",
    },
    {
      id: "in-app-usernames",
      title: "In-app usernames",
      description: "Give your users ENS-based portable identities that live beyond your app.",
      image: "/assets/images/692dbc045c230e692580f136_Frame_1948759068.avif",
      imageAlt: "In-app ENS usernames — use case illustration",
      srcSet: "/assets/images/692dbc045c230e692580f136_Frame_1948759068-p-500.avif 500w, /assets/images/692dbc045c230e692580f136_Frame_1948759068-p-800.avif 800w, /assets/images/692dbc045c230e692580f136_Frame_1948759068.avif 826w",
    },
  ],
  [
    {
      id: "payments-and-defi-apps",
      title: "Payments and Defi apps",
      description: "Simplify sending and receiving. Replace addresses with names. Seamless, error-free payments and transactions.",
      image: "/assets/images/692dbc04156c8ee3b2dc9592_Frame_1948759069.avif",
      imageAlt: "ENS payments and DeFi apps — use case illustration",
      srcSet: "/assets/images/692dbc04156c8ee3b2dc9592_Frame_1948759069-p-500.avif 500w, /assets/images/692dbc04156c8ee3b2dc9592_Frame_1948759069-p-800.avif 800w, /assets/images/692dbc04156c8ee3b2dc9592_Frame_1948759069-p-1080.avif 1080w, /assets/images/692dbc04156c8ee3b2dc9592_Frame_1948759069-p-1600.avif 1600w, /assets/images/692dbc04156c8ee3b2dc9592_Frame_1948759069.avif 1692w",
    },
  ],
  [
    {
      id: "waas",
      title: "Wallet-as-a-Service",
      description: "Bundle identity into every wallet created. Automatically assign ENS subnames at signup.",
      image: "/assets/images/692dbc04213f714b583ca9e7_Frame_1948759070.avif",
      imageAlt: "Wallet-as-a-Service ENS naming — use case illustration",
      srcSet: "/assets/images/692dbc04213f714b583ca9e7_Frame_1948759070-p-500.avif 500w, /assets/images/692dbc04213f714b583ca9e7_Frame_1948759070-p-800.avif 800w, /assets/images/692dbc04213f714b583ca9e7_Frame_1948759070.avif 826w",
    },
    {
      id: "community-names",
      title: "Community names",
      description: "Personalized names create belonging and loyalty and strengthen the community.",
      image: "/assets/images/6939773a46d8a889c9009a36_Frame_1948759016.svg",
      imageAlt: "Community ENS names — use case illustration",
    },
  ],
  [
    {
      id: "raas",
      title: "Rollup-as-a-Service",
      description: "Deploy chains with native identity built in. Offer subnames as default usernames under a shared root namespace.",
      image: "/assets/images/692dbc048a2de9b460439bca_Frame_1948759071.avif",
      imageAlt: "Rollup-as-a-Service ENS identity — use case illustration",
      srcSet: "/assets/images/692dbc048a2de9b460439bca_Frame_1948759071-p-500.avif 500w, /assets/images/692dbc048a2de9b460439bca_Frame_1948759071-p-800.avif 800w, /assets/images/692dbc048a2de9b460439bca_Frame_1948759071-p-1080.avif 1080w, /assets/images/692dbc048a2de9b460439bca_Frame_1948759071-p-1600.avif 1600w, /assets/images/692dbc048a2de9b460439bca_Frame_1948759071.avif 1694w",
    },
  ],
];

function UseCaseCard({ uc }: { uc: UseCase }) {
  return (
    <div id={uc.id} className="use-cases_card">
      <div className="use-cases_card-top">
        <h3 className="heading-style-h5">{uc.title}</h3>
        <div className="max-width-small">
          <p className="text-weight-medium text-color-black100">{uc.description}</p>
        </div>
      </div>
      <div className="use-cases_card-img-wrapper">
        <img
          src={uc.image}
          loading="lazy"
          alt={uc.imageAlt}
          sizes="100vw"
          srcSet={uc.srcSet}
          className="use-cases_card-img"
        />
      </div>
    </div>
  );
}

export function UseCases() {
  return (
    <section padding-global="" className="section_use-cases">
      <div container="large" className="padding-section-medium is-top-xlarge-mobile">
        <div className="use-cases_component">
          <div className="use-cases_left">
            <div className="max-width-xsmall">
              <div data-wf--component-heading-center--variant="align-left" className="component_heading w-variant-20b1377f-206d-b441-f9ce-3f498c30acfc">
                <div data-wf--component-tag--variant="light" className="tag"><div>Use Cases</div></div>
                <h2>How is ENS used today?</h2>
              </div>
            </div>
          </div>
          <div className="use-cases_cards-list">
            {USE_CASES_ROWS.map((row, i) => (
              <div key={i} className="use-cases_cards-row">
                {row.map((uc) => <UseCaseCard key={uc.id} uc={uc} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
