/** Identity section — `section_identity` */

function VerticalLine({ pulseClass }: { pulseClass: string }) {
  return (
    <div className="identity_component_vertical-line w-embed">
      <svg width="2" height="40">
        <line x1="1" y1="0" x2="1" y2="40" stroke="#878787" />
        <line x1="1" y1="0" x2="1" y2="40" className={`pulse ${pulseClass}`} strokeWidth="2" pathLength="100" />
      </svg>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9C16.5 13.1421 13.1421 16.5 9 16.5ZM7.28252 14.7506C6.56057 13.2194 6.11799 11.5307 6.02048 9.75H3.04642C3.3435 12.1324 5.03729 14.081 7.28252 14.7506ZM7.52302 9.75C7.63582 11.5791 8.15835 13.2973 9 14.814C9.84165 13.2973 10.3642 11.5791 10.477 9.75H7.52302ZM14.9536 9.75H11.9795C11.882 11.5307 11.4395 13.2194 10.7175 14.7506C12.9627 14.081 14.6565 12.1324 14.9536 9.75ZM3.04642 8.25H6.02048C6.11799 6.46933 6.56057 4.78055 7.28252 3.24942C5.03729 3.919 3.3435 5.86762 3.04642 8.25ZM7.52302 8.25H10.477C10.3642 6.42092 9.84165 4.70269 9 3.18599C8.15835 4.70269 7.63582 6.42092 7.52302 8.25ZM10.7175 3.24942C11.4395 4.78055 11.882 6.46933 11.9795 8.25H14.9536C14.6565 5.86762 12.9627 3.919 10.7175 3.24942Z" fill="white"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M12.1626 1.5H14.3679L9.54994 7.00667L15.2179 14.5H10.7799L7.30394 9.95533L3.3266 14.5H1.11994L6.27327 8.61L0.835938 1.5H5.3866L8.5286 5.654L12.1626 1.5ZM11.3886 13.18H12.6106L4.7226 2.75067H3.41127L11.3886 13.18Z" fill="white"/>
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M8.5 0C3.808 0 0 3.808 0 8.5C0 13.192 3.808 17 8.5 17C13.192 17 17 13.192 17 8.5C17 3.808 13.192 0 8.5 0ZM12.444 5.78C12.3165 7.123 11.764 10.387 11.4835 11.8915C11.3645 12.529 11.1265 12.7415 10.9055 12.767C10.4125 12.8095 10.0385 12.444 9.5625 12.1295C8.8145 11.6365 8.3895 11.3305 7.667 10.8545C6.8255 10.302 7.3695 9.996 7.854 9.503C7.9815 9.3755 10.1575 7.395 10.2 7.2165C10.2059 7.18946 10.2051 7.1614 10.1977 7.13473C10.1903 7.10807 10.1765 7.08362 10.1575 7.0635C10.1065 7.021 10.0385 7.038 9.979 7.0465C9.9025 7.0635 8.7125 7.854 6.392 9.418C6.052 9.6475 5.746 9.7665 5.474 9.758C5.168 9.7495 4.59 9.588 4.1565 9.4435C3.621 9.2735 3.2045 9.18 3.2385 8.8825C3.2555 8.7295 3.468 8.5765 3.8675 8.415C6.3495 7.3355 7.9985 6.6215 8.823 6.2815C11.186 5.2955 11.6705 5.1255 11.9935 5.1255C12.0615 5.1255 12.223 5.1425 12.325 5.2275C12.41 5.2955 12.4355 5.389 12.444 5.457C12.4355 5.508 12.4525 5.661 12.444 5.78Z" fill="white"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 0.222656C4.0275 0.222656 0 4.25241 0 9.22266C0 13.1999 2.5785 16.5727 6.15375 17.7614C6.60375 17.8462 6.76875 17.5679 6.76875 17.3287C6.76875 17.1149 6.76125 16.5487 6.7575 15.7987C4.254 16.3417 3.726 14.5912 3.726 14.5912C3.3165 13.5524 2.72475 13.2749 2.72475 13.2749C1.9095 12.7169 2.78775 12.7282 2.78775 12.7282C3.6915 12.7912 4.16625 13.6552 4.16625 13.6552C4.96875 15.0314 6.273 14.6339 6.7875 14.4037C6.8685 13.8217 7.10025 13.4249 7.3575 13.1999C5.35875 12.9749 3.258 12.2009 3.258 8.75241C3.258 7.76991 3.60675 6.96741 4.18425 6.33741C4.083 6.11016 3.77925 5.19516 4.263 3.95541C4.263 3.95541 5.01675 3.71391 6.738 4.87791C7.458 4.67766 8.223 4.57866 8.988 4.57416C9.753 4.57866 10.518 4.67766 11.238 4.87791C12.948 3.71391 13.7017 3.95541 13.7017 3.95541C14.1855 5.19516 13.8818 6.11016 13.7917 6.33741C14.3655 6.96741 14.7142 7.76991 14.7142 8.75241C14.7142 12.2099 12.6105 12.9712 10.608 13.192C10.9267 13.4737 11.214 14.0274 11.214 14.8762C11.214 16.0912 11.2027 17.0687 11.2027 17.3699C11.2027 17.6024 11.3602 17.8799 11.8215 17.7924C15.426 16.5802 18 13.1924 18 9.22266C18 4.25241 13.9718 0.222656 9 0.222656Z" fill="white"/>
    </svg>
  );
}

export function Identity() {
  return (
    <section padding-global="" className="section_identity">
      <div container="large" className="padding-section-large is-top-medium">
        <div className="identity_component">
          <div className="margin-bottom margin-custom3">
            <div data-wf--component-heading-center--variant="gap-1rem" className="component_heading w-variant-c9a5a966-524c-263c-caa2-6c07211e9b42">
              <div data-wf--component-tag--variant="light" className="tag"><div>What is ENS?</div></div>
              <h2>Onchain Identity</h2>
            </div>
          </div>

          <div className="identity_component_middle-block">
            <div className="tag large">
              <div className="text-style-capped">0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045</div>
            </div>

            <VerticalLine pulseClass="line1" />

            <div className="identity_circle-button">
              <img src="/assets/images/identity-ens-icon.svg" loading="lazy" alt="ENS name profile illustration" className="identity_circle-button_icon" />
            </div>

            <VerticalLine pulseClass="line2" />

            <div data-wf--component-tag--variant="large-white" className="tag w-variant-b1d28440-46d3-85bb-ae26-5999b60bbdb5">
              <div>vitalik.eth</div>
            </div>

            {/* Desktop branching paths SVG */}
            <div className="identitiy_component_bottom-svg hide-mobile-landscape w-embed">
              <svg width="64.4rem" height="161" viewBox="0 0 1032 161" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: "100%" }}>
                <path d="M516 0V160" stroke="#878787" className="static curved1" />
                <path d="M516 0V160" className="pulse curved curved1" strokeWidth="1" pathLength="100" />

                <path d="M500 0V36C500 65 476 89 447 89H54C24 89 1 113 1 142V160" stroke="#878787" className="static curved2" />
                <path d="M500 0V36C500 65 476 89 447 89H54C24 89 1 113 1 142V160" className="pulse curved curved2" strokeWidth="1" pathLength="100" />

                <path d="M508 0V37C508 70 481 97 448 97H309C276 97 249 124 249 157V161" stroke="#878787" className="static curved3" />
                <path d="M508 0V37C508 70 481 97 448 97H309C276 97 249 124 249 157V161" className="pulse curved curved3" strokeWidth="1" pathLength="100" />

                <path d="M524 0V37C524 70 551 97 584 97H724C757 97 784 124 784 157V161" stroke="#878787" className="static curved4" />
                <path d="M524 0V37C524 70 551 97 584 97H724C757 97 784 124 784 157V161" className="pulse curved curved4" strokeWidth="1" pathLength="100" />

                <path d="M532 0V36C532 65 556 89 585 89H978C1008 89 1031 113 1030 142V160" stroke="#878787" className="static curved5" />
                <path d="M532 0V36C532 65 556 89 585 89H978C1008 89 1030 113 1030 142V160" className="pulse curved curved5" strokeWidth="1" pathLength="100" />
              </svg>
            </div>

            {/* Mobile landscape fallback */}
            <VerticalLine pulseClass="line2 show-mobile-lp-only" />
          </div>

          {/* Identity attribute cards */}
          <div className="identity_component_cards-list">
            {/* Profile */}
            <div className="identity_component_cards-list_item">
              <div className="identity_component_cards-list_item-card">
                <p className="text-weight-bold">Profile</p>
                <div className="identity_component_cards-list_item-card_row">
                  <div className="identity_component_cards-list_item-card_avatar-wrapper">
                    <div className="identity_component_cards-list_item-card_avatar-card">
                      <img src="/assets/images/identity-avatar-vitalik.avif" loading="lazy" width={87} alt="vitalik.eth ENS profile demo" className="identity_component_cards-list_item-card_avatar-card-img" />
                    </div>
                    <div className="text-size-small text-weight-bold">Profile</div>
                  </div>
                  <div className="identity_component_cards-list_item-card_avatar-wrapper">
                    <div className="identity_component_cards-list_item-card_avatar-card">
                      <img src="/assets/images/identity-avatar-demo.avif" loading="lazy" width={87} alt="ENS subname identity demo" className="identity_component_cards-list_item-card_avatar-card-img" />
                    </div>
                    <div className="text-size-small text-weight-bold">Cover</div>
                  </div>
                </div>
                <div className="identity_component_cards-list_info-list">
                  <div className="identity_component_cards-list_info-list_item">
                    <div className="text-size-small text-weight-medium text-color-black-200">Name</div>
                    <div className="text-size-small text-weight-bold text-style-capped">Vitalik</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item">
                    <div className="text-size-small text-weight-medium text-color-black-200">Bio</div>
                    <div className="text-size-small text-weight-bold text-style-capped">Founder of Ethereum</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item">
                    <div className="text-size-small text-weight-medium text-color-black-200">Location</div>
                    <div className="text-size-small text-weight-bold text-style-capped">Onchain</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="identity_component_cards-list_item">
              <div className="identity_component_cards-list_item-card">
                <p className="text-weight-bold">Socials</p>
                <div className="identity_component_cards-list_info-list">
                  <div className="identity_component_cards-list_info-list_item is-left">
                    <div className="icon-embed-custom w-embed"><GlobeIcon /></div>
                    <div className="text-size-small text-weight-bold text-style-capped">vitalik.eth.limo</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item is-left">
                    <div className="icon-embed-custom w-embed"><XIcon /></div>
                    <div className="text-size-small text-weight-bold text-style-capped">@VitalikButerin</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item is-left">
                    <div className="icon-embed-custom w-embed"><TelegramIcon /></div>
                    <div className="text-size-small text-weight-bold text-style-capped">@vitalik</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item is-left">
                    <div className="icon-embed-custom w-embed"><GithubIcon /></div>
                    <div className="text-size-small text-weight-bold text-style-capped">@vitalik.eth</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="identity_component_cards-list_item">
              <div className="identity_component_cards-list_item-card">
                <p className="text-weight-bold">Addresses</p>
                <div className="identity_component_cards-list_info-list">
                  <div className="identity_component_cards-list_info-list_item is-left">
                    <img src="/assets/images/identity-icon-btc.svg" loading="lazy" alt="Bitcoin (BTC) address icon" className="identity_component_cards-list_info-list_icon-img" />
                    <div className="text-size-small text-weight-bold text-style-capped">0x35eBr...24d3A</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item is-left">
                    <img src="/assets/images/identity-icon-eth.svg" loading="lazy" alt="Ethereum (ETH) address icon" className="identity_component_cards-list_info-list_icon-img" />
                    <div className="text-size-small text-weight-bold text-style-capped">bc1pjmu...2gd6m</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item is-left">
                    <img src="/assets/images/identity-icon-sol.svg" loading="lazy" alt="Solana address icon" className="identity_component_cards-list_info-list_icon-img" />
                    <div className="text-size-small text-weight-bold text-style-capped">0xmLdk...mqg5n</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item is-left">
                    <img src="/assets/images/identity-icon-cosmos.svg" loading="lazy" alt="Cosmos address icon" className="identity_component_cards-list_info-list_icon-img" />
                    <div className="text-size-small text-weight-bold text-style-capped">0x3Mk4g...9Olf4</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item is-left">
                    <img src="/assets/images/identity-icon-polygon.svg" loading="lazy" alt="Polygon address icon" className="identity_component_cards-list_info-list_icon-img" />
                    <div className="text-size-small text-weight-bold text-style-capped">cFP3v4i...yYMcSx</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item is-left">
                    <img src="/assets/images/identity-icon-chain.svg" loading="lazy" alt="Chain address icon" className="identity_component_cards-list_info-list_icon-img" />
                    <div className="text-size-small text-weight-bold text-style-capped">TP3RZE...Hrc3b2</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Records */}
            <div className="identity_component_cards-list_item">
              <div className="identity_component_cards-list_item-card">
                <p className="text-weight-bold">Other Records</p>
                <div className="identity_component_cards-list_info-list">
                  <div className="identity_component_cards-list_info-list_item">
                    <div className="text-size-small text-weight-medium text-color-black-200">Avatar</div>
                    <div className="text-size-small text-weight-bold text-style-capped">https://ecu.il/vitalik</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item">
                    <div className="text-size-small text-weight-medium text-color-black-200">Header</div>
                    <div className="text-size-small text-weight-bold text-style-capped">https://ecu.il/vitalik</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item">
                    <div className="text-size-small text-weight-medium text-color-black-200">Contenthash</div>
                    <div className="text-size-small text-weight-bold text-style-capped">ipns://bafyb...</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item">
                    <div className="text-size-small text-weight-medium text-color-black-200">ABI</div>
                    <div className="text-size-small text-weight-bold text-style-capped">ipfs://QmXoy...Wo6co</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item">
                    <div className="text-size-small text-weight-medium text-color-black-200">Custom</div>
                    <div className="text-size-small text-weight-bold text-style-capped">eth.ens.delegate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ownership */}
            <div className="identity_component_cards-list_item">
              <div className="identity_component_cards-list_item-card">
                <p className="text-weight-bold">Ownership</p>
                <div className="identity_component_cards-list_info-list">
                  <div className="identity_component_cards-list_info-list_item">
                    <div className="text-size-small text-weight-medium text-color-black-200">Manager</div>
                    <div className="text-size-small text-weight-bold text-style-capped">thecap.eth</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item">
                    <div className="text-size-small text-weight-medium text-color-black-200">Owner</div>
                    <div className="text-size-small text-weight-bold text-style-capped">thecap.eth</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item">
                    <div className="text-size-small text-weight-medium text-color-black-200">Expiry</div>
                    <div className="text-size-small text-weight-bold text-style-capped">July 26, 2028</div>
                  </div>
                  <div className="identity_component_cards-list_info-list_item">
                    <div className="text-size-small text-weight-medium text-color-black-200">Parent</div>
                    <div className="text-size-small text-weight-bold">eth</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
