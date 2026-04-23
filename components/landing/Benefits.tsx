/** Benefits section — `section_benefits` */

export function Benefits() {
  return (
    <section className="section_benefits">
      <div className="padding-section-xlarge" style={{ paddingTop: "var(--_responsive---padding-section--medium)" }}>
        <div padding-global="">
          <div container="large">
            <div data-wf--component-heading-center--variant="gap-1rem" className="component_heading w-variant-c9a5a966-524c-263c-caa2-6c07211e9b42">
              <div data-wf--component-tag--variant="light" className="tag"><div>Benefits</div></div>
              <h2>Why integrate ENS?</h2>
            </div>

            <div className="benefits-bento">

              {/* 1: Brand usernames — wide dark, absolute SVG */}
              <div className="benefits_card b-wide" style={{ position: "relative", flexDirection: "column", minHeight: "22rem", overflow: "hidden" }}>
                <div className="benefits_card-top" style={{ position: "relative", zIndex: 1 }}>
                  <h3 className="heading-style-h4">Brand usernames</h3>
                  <div className="max-width-small"><p className="benefits_card-paragraph">Give every user a universal, human-readable identity tied to your brand, like user.brand.eth</p></div>
                </div>
                <img src="/assets/images/benefit-brand.svg" loading="lazy" alt="Brand visibility with ENS subnames" style={{ position: "absolute", bottom: 0, right: "-4%", width: "62%", height: "auto" }} />
              </div>

              {/* 2: User experience — is-ux */}
              <div className="benefits_card is-ux">
                <div className="benefits_card-top">
                  <h3 className="heading-style-h4">User experience</h3>
                  <div className="max-width-small"><p className="benefits_card-paragraph">Make onboarding and transacting experience effortless with human-readable names.</p></div>
                </div>
                <div className="benefits_card-img-wrapper">
                  <img src="/assets/images/benefit-ux.svg" loading="lazy" alt="Improved user experience with ENS names illustration" className="benefits_card-img" />
                </div>
              </div>

              {/* 3: Enhanced security — is-security */}
              <div className="benefits_card is-security">
                <div className="benefits_card-top">
                  <h3 className="heading-style-h4">Enhanced security</h3>
                  <div className="max-width-small"><p className="benefits_card-paragraph">Remove address-related errors, scams, spoofing or poisoning attacks with wallet names.</p></div>
                </div>
                <div className="benefits_card-img-wrapper">
                  <img src="/assets/images/benefit-security.svg" loading="lazy" alt="Enhanced security with ENS names illustration" className="benefits_card-img" />
                </div>
              </div>

              {/* 4: Revenue Opportunity — is-ecosystem */}
              <div className="benefits_card is-ecosystem">
                <div className="benefits_card-top">
                  <h3 className="heading-style-h4">Revenue Opportunity</h3>
                  <div className="max-width-small"><p className="benefits_card-paragraph">Registration prices, premium names, renewals; turning identity into a revenue stream.</p></div>
                </div>
                <div className="benefits_card-img-wrapper">
                  <img src="/assets/images/benefit-revenue.svg" loading="lazy" alt="Revenue opportunity with ENS subnames illustration" className="benefits_card-img" />
                </div>
              </div>

              {/* 5: Works Everywhere — is-black-600 */}
              <div className="benefits_card is-black-600">
                <div className="benefits_card-top">
                  <h3 className="heading-style-h4">Works Everywhere</h3>
                  <div className="max-width-small"><p className="benefits_card-paragraph">Supports 100+ chains, compatible with 1,000+ apps, wallets, and protocols.</p></div>
                </div>
                <div className="benefits_card-img-wrapper">
                  <img src="/assets/images/benefit-compatibility.svg" loading="lazy" alt="ENS names work everywhere — universal compatibility illustration" className="benefits_card-img" />
                </div>
              </div>

              {/* 6: Brand Visibility — no extra class */}
              <div className="benefits_card">
                <div className="benefits_card-top">
                  <h3 className="heading-style-h4">Brand Visibility</h3>
                  <div className="max-width-small"><p className="benefits_card-paragraph">Every subname carries your brand across social and onchain spaces, extending your reach.</p></div>
                </div>
                <div className="benefits_card-img-wrapper">
                  <img src="/assets/images/benefit-visibility.svg" loading="lazy" alt="ENS network effect illustration" className="benefits_card-img" />
                </div>
              </div>

              {/* 7: Network Effect — wide white, absolute SVG */}
              <div className="benefits_card is-white b-wide" style={{ position: "relative", flexDirection: "column", minHeight: "22rem", overflow: "hidden" }}>
                <div className="benefits_card-top" style={{ position: "relative", zIndex: 1 }}>
                  <h3 className="heading-style-h4">Network Effect</h3>
                  <div className="max-width-small"><p className="benefits_card-paragraph">As adoption grows, every new subname strengthens your ecosystem and amplifies your brand&apos;s presence across Web3.</p></div>
                </div>
                <img src="/assets/images/benefit-network.svg" loading="lazy" alt="ENS network effect illustration" style={{ position: "absolute", bottom: 0, right: "-4%", width: "62%", height: "auto" }} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
