import { cn } from "./cn";

export function Section({
  id,
  children,
  className,
  bleed = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        bleed ? "" : "py-20 md:py-28",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto px-5 md:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        align === "left" && "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? (
        <div className="mb-4 flex items-center gap-3">
          {align === "center" ? (
            <span className="mx-auto flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-text-subtle">
              <span className="h-px w-6 bg-border-strong" />
              {eyebrow}
              <span className="h-px w-6 bg-border-strong" />
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-subtle">
              <span className="h-px w-6 bg-border-strong" />
              {eyebrow}
            </span>
          )}
        </div>
      ) : null}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">{title}</h2>
      {description ? (
        <p className="mt-5 text-lg text-text-muted leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
