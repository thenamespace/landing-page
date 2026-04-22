function ButtonArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="auto" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
      <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function Solutions() {
  return (
    <section className="section_solutions">
      <div className="padding-section-xlarge is-bottom-medium">
        <div padding-global="">
          <div className="max-width-xlarge align-center">
            <div className="component_heading gap-1rem">
              <div data-wf--component-tag--variant="light" className="tag"><div>Custom Solutions</div></div>
              <h2>When standard tools don&apos;t fit, we engineer custom ones!</h2>
            </div>
          </div>
        </div>
        <div className="solutions_component">
          <div id="second-lottie-container" className="solutions_lottie-wrapper">
            <div className="solutions_lottie-embed w-embed">
              {/* @ts-expect-error dotlottie-player is a web component */}
              <dotlottie-player
                src="/assets/lottie/693c1daf1734c3f3dfc241b1_Namespace_Line.json"
                background="transparent"
                speed="1"
                loop
                autoplay
                poster="/assets/images/693c3c0de6fae90def9a9462_Namespace_Line_0-00-00-00).webp"
                style={{ width: "auto", height: "auto" }}
                renderer="svg"
              />
            </div>
          </div>
        </div>
        <div className="max-width-medium is-37rem align-center text-align-center">
          <div className="margin-bottom margin-small">
            <p className="text-size-medium text-weight-medium text-color-black100">
              Namespace is the ENS DAO&apos;s official Service Provider, trusted to deliver custom integrations for wallets, chains, and apps of any scale.
            </p>
          </div>
          <div className="button-group is-center">
            <a
              data-wf--component-button-primary--variant="primary-large"
              href="https://cal.com/thecap.eth/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="button w-variant-af6e9889-a545-3801-8ad3-ccb7e3d0b06d w-inline-block"
            >
              <div className="button_text">Book Discovery Call</div>
              <div className="button_icon-wrapper w-variant-af6e9889-a545-3801-8ad3-ccb7e3d0b06d">
                <div className="button_icon-item">
                  <div className="button_icon is-hover w-variant-af6e9889-a545-3801-8ad3-ccb7e3d0b06d w-embed"><ButtonArrow /></div>
                </div>
                <div className="button_icon-item">
                  <div className="button_icon is-hover w-variant-af6e9889-a545-3801-8ad3-ccb7e3d0b06d w-embed"><ButtonArrow /></div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
