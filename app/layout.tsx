import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../styles/globals.css";
import "../styles/webflow-page-overrides.css";
import { SITE, annDismissedKey, ANN_DISMISSED_VALUE } from "@/lib/site";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/jsonld";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s — Namespace" },
  description: SITE.description,
  applicationName: SITE.name,
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/assets/images/favicon-32.png",
        sizes: "32x32",
      },
    ],
    apple: "/assets/images/favicon-128.png",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: SITE.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  other: {
    "google-site-verification": "FcyieALJc7g7b9C02E2m6XYNVBXuvOrbmozUcn7rz7U",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={SITE.announcement.enabled ? "has-announcement" : undefined}
      suppressHydrationWarning
    >
      <head>
        {/*
          No-flash announcement bar: if this session already dismissed the bar,
          mark <html> before first paint so the bar is hidden and the nav/content
          offset is removed — avoiding the SSR-render-then-unmount layout jump.
        */}
        {SITE.announcement.enabled ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{if(sessionStorage.getItem(${JSON.stringify(
                annDismissedKey(SITE.announcement.id),
              )})===${JSON.stringify(
                ANN_DISMISSED_VALUE,
              )}){document.documentElement.classList.add('ann-dismissed');}}catch(e){}})();`,
            }}
          />
        ) : null}

        {/* Webflow shared CSS — source of truth for all visual classes */}
        <link
          rel="stylesheet"
          href="/assets/css/namespace-dev.webflow.shared.3f58c4ac4.css"
        />

        {/* JSON-LD structured data */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />

        {/* Dotlottie player for hero + solutions Lottie animations */}
        <Script
          src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
          type="module"
          strategy="beforeInteractive"
        />

        {/* Splide CSS for partner logos marquee */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide-core.min.css"
        />
      </head>
      <body>
        <AnnouncementBar />
        {children}

        {/* ── GSAP + ScrollTrigger + Observer — sticky benefits, scroll anims ── */}
        <Script
          src="/assets/js/gsap.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/ScrollTrigger.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/Observer.min.js"
          strategy="afterInteractive"
        />

        {/* ── Splide JS for partner logos carousel ── */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-auto-scroll@0.5.3/dist/js/splide-extension-auto-scroll.min.js"
          strategy="afterInteractive"
        />

        {/* ── Google Analytics ── */}
        {SITE.gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${SITE.gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
