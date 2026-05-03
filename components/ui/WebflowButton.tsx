/**
 * Reusable Webflow-style button with the arrow icon animation.
 * Maps to the .button + .button_icon-wrapper structure in the legacy HTML.
 */

interface WebflowButtonProps {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "white";
  external?: boolean;
}

function ArrowSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
      <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function WebflowButton({ label, href, variant = "primary", external = true }: WebflowButtonProps) {
  const variantClass =
    variant === "secondary" ? " w-variant-9e301513-bb31-a799-9ca0-2d690dec60e2" :
    variant === "outline" ? " is-products-outline" :
    variant === "white" ? " is-hero-white" :
    " is-accent";
  return (
    <a
      data-wf--component-button-primary--variant={variant}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`button${variantClass} w-inline-block`}
    >
      <div className="button_text">{label}</div>
      <div className={`button_icon-wrapper${variantClass}`}>
        <div className="button_icon-item">
          <div className="button_icon is-hover w-embed"><ArrowSvg /></div>
        </div>
        <div className="button_icon-item">
          <div className="button_icon is-hover w-embed"><ArrowSvg /></div>
        </div>
      </div>
    </a>
  );
}
