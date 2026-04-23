import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export type NewsletterEmailProps = {
  title: string;
  description?: string;
  slug: string;
  image?: string;
  tag?: string;
  date?: string;
  bodyHtml: string;
  baseUrl?: string;
};

export function NewsletterEmail({
  title,
  description,
  slug,
  image,
  tag,
  date,
  bodyHtml,
  baseUrl = "https://namespace.ninja",
}: NewsletterEmailProps) {
  const postUrl = `${baseUrl}/blog/${slug}`;
  const imageUrl = image?.startsWith("/") ? `${baseUrl}${image}` : image;
  const displayDate = date
    ? new Date(date + "T00:00:00Z").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "";

  return (
    <Html lang="en">
      <Head />
      <Preview>{description ?? title}</Preview>
      <Body
        style={{
          backgroundColor: "#0a0a0a",
          margin: "0",
          padding: "0",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <Container
          style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 20px" }}
        >
          {/* Header */}
          <Section style={{ paddingBottom: "32px" }}>
            <table
              width="100%"
              cellPadding={0}
              cellSpacing={0}
              style={{ borderCollapse: "collapse" }}
            >
              <tbody>
                <tr>
                  <td>
                    <Link href={baseUrl} style={{ textDecoration: "none" }}>
                      <span
                        style={{
                          color: "#ffffff",
                          fontSize: "18px",
                          fontWeight: 700,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        Namespace
                      </span>
                      <span
                        style={{ color: "#5474f6", fontSize: "18px", fontWeight: 700 }}
                      >
                        .
                      </span>
                    </Link>
                  </td>
                  <td align="right">
                    <span
                      style={{
                        color: "#666",
                        fontSize: "12px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      Namespace Journal
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr style={{ borderColor: "#1e1e1e", margin: "0 0 32px 0" }} />

          {/* Tag + date */}
          <Section style={{ paddingBottom: "16px" }}>
            {tag && (
              <span
                style={{
                  display: "inline-block",
                  background: "#1a1a2e",
                  color: "#5474f6",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  marginRight: "12px",
                }}
              >
                {tag}
              </span>
            )}
            {displayDate && (
              <span style={{ color: "#555", fontSize: "12px" }}>
                {displayDate}
              </span>
            )}
          </Section>

          {/* Title */}
          <Heading
            as="h1"
            style={{
              margin: "0 0 16px 0",
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: 700,
              lineHeight: "1.25",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </Heading>

          {/* Cover image */}
          {imageUrl && (
            <Section style={{ paddingBottom: "28px" }}>
              <Link href={postUrl}>
                <Img
                  src={imageUrl}
                  alt={title}
                  width={560}
                  style={{
                    width: "100%",
                    maxWidth: "560px",
                    borderRadius: "8px",
                    display: "block",
                  }}
                />
              </Link>
            </Section>
          )}

          {/* Full post body — inline styles applied by juice before render */}
          <Section style={{ paddingBottom: "28px" }}>
            <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          </Section>

          {/* CTA */}
          <Section style={{ paddingBottom: "40px" }}>
            <Button
              href={postUrl}
              style={{
                backgroundColor: "#5474f6",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "600",
                textDecoration: "none",
                padding: "14px 28px",
                borderRadius: "6px",
                display: "inline-block",
              }}
            >
              Read on namespace.ninja →
            </Button>
          </Section>

          <Hr style={{ borderColor: "#1e1e1e", margin: "0 0 28px 0" }} />

          {/* Footer */}
          <Section>
            <Text
              style={{
                margin: "0",
                color: "#444",
                fontSize: "12px",
                lineHeight: "1.6",
              }}
            >
              You're receiving this because you subscribed to Namespace Journal.
              <br />
              <Link
                href="{{{RESEND_UNSUBSCRIBE_URL}}}"
                style={{ color: "#555", textDecoration: "underline" }}
              >
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default NewsletterEmail;
