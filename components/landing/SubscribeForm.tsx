"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function SubscribeForm({
  formId,
  noteText = "No spam. Just new posts, launches, and the occasional sharp ENS update.",
}: {
  formId: string;
  noteText?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email") as string;
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? "You're subscribed!");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="blog-subscribe_form-block w-form">
        <div className="w-form-done" style={{ display: "block" }}>
          <div>{message || "Thanks for subscribing!"}</div>
        </div>
        <div className="blog-subscribe_note">{noteText}</div>
      </div>
    );
  }

  return (
    <div className="blog-subscribe_form-block w-form">
      <form
        id={formId}
        name={formId}
        className="blog-subscribe_form"
        onSubmit={handleSubmit}
      >
        <input
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
          className="button w-variant-9e301513-bb31-a799-9ca0-2d690dec60e2 blog-subscribe_button"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <div className="w-form-fail" style={{ display: "block" }}>
          <div>{message}</div>
        </div>
      )}
      <div className="blog-subscribe_note">{noteText}</div>
    </div>
  );
}
