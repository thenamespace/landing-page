import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const { RESEND_API_KEY, RESEND_NEWSLETTER_AUDIENCE_ID } = process.env;
  if (!RESEND_API_KEY || !RESEND_NEWSLETTER_AUDIENCE_ID) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  const res = await fetch(
    `https://api.resend.com/audiences/${RESEND_NEWSLETTER_AUDIENCE_ID}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    },
  );

  if (res.status === 409) {
    return NextResponse.json({ success: true, message: "Already subscribed" });
  }
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
