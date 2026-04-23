import { WebflowButton } from "@/components/ui/WebflowButton";

/** CTA section — `section_cta` */

const CTA_CARDS = [
  {
    title: "Issue subnames (no code required)",
    description: "Issue onchain or offchain subnames in record time, using our no-code app.",
    button: { label: "Launch App", href: "https://app.namespace.ninja/" },
    image: "/assets/images/cta-decoration-2.svg",
    imageAlt: "Get started issuing ENS subnames — no code required",
  },
  {
    title: "Build with ENS Subnames",
    description: "Integrate subname registrations in your rollup, wallet, or app with our SDK.",
    button: { label: "Build with Subnames", href: "https://docs.namespace.ninja/" },
    image: "/assets/images/cta-decoration-1.svg",
    imageAlt: "Build with ENS Subnames using Namespace SDK and API",
  },
  {
    title: "Partner with Namespace",
    description: "Bring ENS to your product, ecosystem, or community with custom ENS solution.",
    button: { label: "Book a Call", href: "https://cal.com/thecap.eth/discovery" },
    image: "/assets/images/cta-decoration-3.svg",
    imageAlt: "Partner with Namespace for custom ENS naming solutions",
  },
];

export function Cta() {
  return (
    <section padding-global="" className="section_cta">
      <div container="large" className="padding-section-large is-top-medium-bottom-small-mobile">
        <div className="margin-bottom margin-xlarge is-medium-mobile">
          <div className="max-width-large align-center">
            <div className="text-align-center">
              <h2>Ready to Build with ENS Subnames?</h2>
            </div>
          </div>
        </div>
        <div className="cta_component">
          {CTA_CARDS.map((card) => (
            <div key={card.title} className="cta_card">
              <div className="cta_card-content">
                <div className="cta_card-content-top">
                  <div className="margin-bottom margin-xxsmall">
                    <h3 className="heading-style-h6">{card.title}</h3>
                  </div>
                  <p className="text-color-black-200 text-weight-medium is-linespace-smaller">{card.description}</p>
                </div>
                <div className="button-group">
                  <WebflowButton label={card.button.label} href={card.button.href} />
                </div>
              </div>
              <div className="cta_card-img-wrapper">
                <img src={card.image} loading="lazy" alt={card.imageAlt} className="cta_card-img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
