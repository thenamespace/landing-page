import Link from "next/link";
import { cn } from "./cn";
import { ArrowUpRight, ArrowRight } from "./Icons";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
  withArrow?: "none" | "right" | "up-right";
};

const base =
  "group inline-flex items-center justify-center gap-2 font-medium tracking-tight rounded-full transition-[background-color,color,border-color,transform] duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-strong active:translate-y-[1px]",
  secondary:
    "bg-surface text-text border border-border hover:border-border-strong hover:bg-surface-2 active:translate-y-[1px]",
  ghost:
    "bg-transparent text-text hover:text-accent border border-transparent hover:border-border",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  children,
  withArrow = "right",
  onClick,
  type,
  disabled,
}: CommonProps & {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const arrow =
    withArrow === "up-right" ? (
      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    ) : withArrow === "right" ? (
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    ) : null;

  const content = (
    <>
      <span>{children}</span>
      {arrow}
    </>
  );

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, disabled && "opacity-50 cursor-not-allowed")}
    >
      {content}
    </button>
  );
}
