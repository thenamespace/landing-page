import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

/* ─── Simple in-memory rate limiter ───
 * NOTE: Edge functions are stateless and distributed across regions.
 * This limiter only tracks requests within a single isolate. For
 * production scale, migrate to Redis (e.g. Upstash) or Vercel KV.
 */
const rateLimitMap = new Map<
  string,
  { count: number; resetAt: number }
>();

function rateLimit(
  identifier: string,
  max = 5,
  windowMs = 60_000,
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

const CORS_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "*";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": CORS_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export async function POST(request: Request) {
  // Rate limit by IP
  const clientIp = getClientIp(request);
  if (!rateLimit(clientIp, 5, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: corsHeaders() },
    );
  }

  // Parse body
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400, headers: corsHeaders() },
    );
  }

  // Validate email
  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { error: "Valid email required" },
      { status: 400, headers: corsHeaders() },
    );
  }

  const { RESEND_API_KEY, RESEND_NEWSLETTER_AUDIENCE_ID } = process.env;
  if (!RESEND_API_KEY || !RESEND_NEWSLETTER_AUDIENCE_ID) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500, headers: corsHeaders() },
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  const { data, error } = await resend.contacts.create({
    email,
    audienceId: RESEND_NEWSLETTER_AUDIENCE_ID,
    unsubscribed: false,
  });

  if (error) {
    // Resend returns a generic error object; 409 (duplicate) isn't always
    // surfaced cleanly via the SDK, so we treat known messages as success.
    const message = error.message || "";
    if (/already exists|duplicate/i.test(message)) {
      return NextResponse.json(
        { success: true, message: "Already subscribed" },
        { headers: corsHeaders() },
      );
    }
    return NextResponse.json(
      { error: message || "Failed to subscribe" },
      { status: 500, headers: corsHeaders() },
    );
  }

  return NextResponse.json(
    { success: true, id: data?.id },
    { headers: corsHeaders() },
  );
}
