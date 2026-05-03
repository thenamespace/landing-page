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
      image: "/assets/images/usecase-wallet.avif",
      imageAlt: "ENS subnames for wallet names — use case illustration",
      srcSet: "/assets/images/usecase-wallet-500.avif 500w, /assets/images/usecase-wallet-800.avif 800w, /assets/images/usecase-wallet.avif 826w",
    },
    {
      id: "chain-identity-system",
      title: "Chain identity system",
      description: "L2s and rollups offer subnames to all users as a unified identity layer for the chain. One namespace for all users and builders.",
      image: "/assets/images/usecase-defi.avif",
      imageAlt: "ENS chain identity system for L2 rollups — use case illustration",
      srcSet: "/assets/images/usecase-defi-500.avif 500w, /assets/images/usecase-defi-800.avif 800w, /assets/images/usecase-defi.avif 826w",
    },
  ],
  [
    {
      id: "decentralized-websites",
      title: "Decentralized websites",
      description: "Deploy websites to decentralized, censorship-resistant domains. Permanent and unblockable.",
      image: "/assets/images/usecase-gaming.avif",
      imageAlt: "Decentralized ENS websites — use case illustration",
      srcSet: "/assets/images/usecase-gaming-500.avif 500w, /assets/images/usecase-gaming-800.avif 800w, /assets/images/usecase-gaming-1080.avif 1080w, /assets/images/usecase-gaming-1600.avif 1600w, /assets/images/usecase-gaming.avif 1694w",
    },
  ],
  [
    {
      id: "ai-agent-names",
      title: "AI Agent identity",
      description: "Assign AI agents persistent, multi-chain ENS identities, compliant with ERC-8004.",
      image: "/assets/images/usecase-events.avif",
      imageAlt: "AI agent ENS identity — use case illustration",
      srcSet: "/assets/images/usecase-events-500.avif 500w, /assets/images/usecase-events-800.avif 800w, /assets/images/usecase-events.avif 827w",
    },
    {
      id: "in-app-usernames",
      title: "In-app usernames",
      description: "Register user.brand.eth for every user at signup. Works across any wallet or protocol that supports ENS.",
      image: "/assets/images/usecase-dao.avif",
      imageAlt: "In-app ENS usernames — use case illustration",
      srcSet: "/assets/images/usecase-dao-500.avif 500w, /assets/images/usecase-dao-800.avif 800w, /assets/images/usecase-dao.avif 826w",
    },
  ],
  [
    {
      id: "payments-and-defi-apps",
      title: "Payments and DeFi apps",
      description: "Replace 0x addresses with human-readable names. Fewer errors, faster payments, no copy-paste anxiety.",
      image: "/assets/images/usecase-social.avif",
      imageAlt: "ENS payments and DeFi apps — use case illustration",
      srcSet: "/assets/images/usecase-social-500.avif 500w, /assets/images/usecase-social-800.avif 800w, /assets/images/usecase-social-1080.avif 1080w, /assets/images/usecase-social-1600.avif 1600w, /assets/images/usecase-social.avif 1692w",
    },
  ],
  [
    {
      id: "waas",
      title: "Wallet-as-a-Service",
      description: "Bundle identity into every wallet created. Automatically assign ENS subnames at signup.",
      image: "/assets/images/usecase-ai.avif",
      imageAlt: "Wallet-as-a-Service ENS naming — use case illustration",
      srcSet: "/assets/images/usecase-ai-500.avif 500w, /assets/images/usecase-ai-800.avif 800w, /assets/images/usecase-ai.avif 826w",
    },
    {
      id: "community-names",
      title: "Community names",
      description: "Give every member an identity that follows them across wallets, dApps, and ENS-enabled social platforms.",
      image: "/assets/images/usecase-custom.svg",
      imageAlt: "Community ENS names — use case illustration",
    },
  ],
  [
    {
      id: "raas",
      title: "Rollup-as-a-Service",
      description: "Deploy chains with native identity built in. Offer subnames as default usernames under a shared root namespace.",
      image: "/assets/images/usecase-identity.avif",
      imageAlt: "Rollup-as-a-Service ENS identity — use case illustration",
      srcSet: "/assets/images/usecase-identity-500.avif 500w, /assets/images/usecase-identity-800.avif 800w, /assets/images/usecase-identity-1080.avif 1080w, /assets/images/usecase-identity-1600.avif 1600w, /assets/images/usecase-identity.avif 1694w",
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
              <p className="text-size-medium text-color-black-200 text-weight-medium margin-top margin-small">ENS names are the identity layer for Web3, powering wallet names, in-app usernames, community namespaces, smart contracts, and AI agent identities.</p>
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
