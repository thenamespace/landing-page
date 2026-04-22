"use client";

import { useState } from "react";
import { cn } from "@/components/ui/cn";
import { ArrowRight, Check } from "@/components/ui/Icons";

type State = "idle" | "loading" | "success" | "error";

export function NewsletterForm({
  variant = "inline",
  className,
}: {
  variant?: "inline" | "stacked";
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error || "Subscription failed. Try again.");
      }
      setState("success");
      setMessage("You're in. Check your inbox soon.");
      setEmail("");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (variant === "stacked") {
    return (
      <form
        onSubmit={onSubmit}
        className={cn("w-full max-w-md flex flex-col gap-3", className)}
      >
        <label htmlFor="news-email" className="sr-only">
          Email address
        </label>
        <input
          id="news-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          autoComplete="email"
          className="h-12 px-4 rounded-full bg-surface border border-border text-text placeholder:text-text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 transition"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="group h-12 rounded-full bg-accent text-accent-fg font-medium flex items-center justify-center gap-2 hover:bg-accent-strong transition disabled:opacity-60"
        >
          {state === "loading"
            ? "Subscribing…"
            : state === "success"
              ? "Subscribed"
              : "Subscribe"}
          {state === "success" ? (
            <Check className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>
        {message ? (
          <p
            className={cn(
              "text-sm mt-1",
              state === "success" ? "text-accent" : "text-[var(--danger)]",
            )}
          >
            {message}
          </p>
        ) : null}
      </form>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("w-full max-w-lg", className)}
      aria-describedby={message ? "newsletter-status" : undefined}
    >
      <div className="group flex items-center gap-2 h-14 pl-5 pr-2 rounded-full bg-surface border border-border focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30 transition-colors">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          autoComplete="email"
          aria-label="Email address"
          className="flex-1 bg-transparent text-text placeholder:text-text-subtle focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="h-10 px-5 rounded-full bg-accent text-accent-fg text-sm font-medium hover:bg-accent-strong transition disabled:opacity-60 inline-flex items-center gap-2"
        >
          {state === "loading"
            ? "…"
            : state === "success"
              ? "Subscribed"
              : "Subscribe"}
          {state === "success" ? (
            <Check className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </button>
      </div>
      {message ? (
        <p
          id="newsletter-status"
          aria-live="polite"
          className={cn(
            "text-sm mt-3 pl-5",
            state === "success" ? "text-accent" : "text-[var(--danger)]",
          )}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
