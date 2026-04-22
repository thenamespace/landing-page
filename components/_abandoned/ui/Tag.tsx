import { cn } from "./cn";

export function Tag({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "accent" | "outline";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-tight uppercase",
        tone === "default" && "bg-surface-2 text-text-muted border border-border",
        tone === "accent" && "bg-accent/10 text-accent border border-accent/20",
        tone === "outline" && "border border-border-strong text-text",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "accent" ? "bg-accent animate-pulse-dot" : "bg-text-subtle",
        )}
      />
      {children}
    </span>
  );
}
