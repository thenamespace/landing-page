"use client";

import { useState, useRef, useEffect } from "react";
import { setPersonProps, track } from "@/lib/analytics/track";
import type { LandingEventProps } from "@/lib/analytics/taxonomy/catalog";

type FormId = LandingEventProps<"landing:newsletter_submit">["form_id"];
type FailureReason = LandingEventProps<"landing:newsletter_fail">["failure_reason"];

const failureReason = (status: number): FailureReason =>
  status === 400 ? "invalid_email" : status === 429 ? "rate_limited" : "server_error";

type Status = "idle" | "loading" | "success" | "error";

export function SubscribeForm({
  formId,
  noteText = "No spam. Unsubscribe anytime.",
}: {
  formId: FormId;
  noteText?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email") as string;
    setStatus("loading");
    // The email itself is never sent to analytics.
    track("landing:newsletter_submit", { form_id: formId });

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        const already = data.message === "Already subscribed";
        track("landing:newsletter_complete", { form_id: formId, is_already_subscribed: already });
        setPersonProps({ is_newsletter_subscriber: true }, { newsletter_subscribed_at: new Date().toISOString() });
        setStatus("success");
        setMessage(data.message ?? "Welcome aboard. You're subscribed.");
        if (inputRef.current) inputRef.current.value = "";
        timeoutRef.current = setTimeout(() => setStatus("idle"), 4000);
      } else {
        track("landing:newsletter_fail", { failure_reason: failureReason(res.status), form_id: formId });
        setStatus("error");
        setMessage(data.error ?? "Couldn't subscribe. Try again?");
      }
    } catch {
      track("landing:newsletter_fail", { failure_reason: "network_error", form_id: formId });
      setStatus("error");
      setMessage("Connection hiccup. Please try again.");
    }
  }

  return (
    <div className="blog-subscribe_form-block w-form">
      <div aria-live="polite" aria-atomic="true">
        {status === "success" && (
          <div className="w-form-done" style={{ display: "block", marginBottom: "0.85rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {message || "Welcome aboard. You're subscribed."}
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="w-form-fail" style={{ display: "block" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {message}
            </div>
          </div>
        )}
      </div>
      <form
        id={formId}
        name={formId}
        className="blog-subscribe_form"
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          className="blog-subscribe_input w-input"
          maxLength={256}
          name="email"
          data-name="Email"
          placeholder="Enter your email"
          type="email"
          id={`${formId}-email`}
          required
          disabled={status === "loading"}
        />
        <button
          type="submit"
          className="button blog-subscribe_button"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      <div className="blog-subscribe_note">{noteText}</div>
    </div>
  );
}
