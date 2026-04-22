/** Stats section — `section_stats` */

const STATS = [
  { value: ">800k", label: "Subnames", description: "Actively managed and run client subnames." },
  { value: "15M", label: "Resolutions", description: "The historical usage of all subnames issued." },
  { value: "30+", label: "Clients", description: "We love building with web3 teams." },
  { value: "220", label: "Namespaces", description: "Number of activated ENS names issuing subnames." },
  { value: "130", label: "ENS Widgets", description: "Number of ENS Widget installations across websites." },
];

export function Stats() {
  return (
    <section className="section_stats">
      <div padding-global="" className="section-inner-background is-top-only background-color-secondary">
        <div container="large" className="padding-section-medium is-top-xlarge-mobile">
          <div className="stats_component">
            <div data-wf--component-heading-center--variant="gap-1rem" className="component_heading w-variant-c9a5a966-524c-263c-caa2-6c07211e9b42">
              <div data-wf--component-tag--variant="dark" className="tag w-variant-b6bce3ac-5c2a-b1ee-66d6-218f87a88dd1">
                <div>Namespace Stats</div>
              </div>
              <h2>Impact in numbers</h2>
            </div>
            <div className="stats_list">
              {STATS.map((s) => (
                <div key={s.label} className="stats_item">
                  <div className="stats_card">
                    <h3 data-countup="" className="heading-style-h2 text-line-height-normal mobile-h1">{s.value}</h3>
                    <div className="stats_card-content">
                      <p className="text-size-medium text-weight-medium">{s.label}</p>
                      <p className="text-color-black-900">{s.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
