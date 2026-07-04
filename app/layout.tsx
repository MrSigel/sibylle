import type { Metadata } from "next";
import "./globals.css";
import { ConditionalLayout } from "@/components/sibylle/ConditionalLayout";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sibylle-bergold.de"),
  title: {
    default: "Sibylle Bergold | Systemische Klarheit",
    template: "%s | Sibylle Bergold",
  },
  description:
    "Systemische Aufstellung und Coaching mit Sibylle Bergold. Beziehungsmuster, Familienmuster und Selbsterfahrung online und in München.",
  keywords: [
    "Systemische Aufstellung",
    "Familienaufstellung",
    "Sibylle Bergold",
    "Beziehungsmuster lösen",
    "Systemisches Coaching",
    "Selbsterfahrung",
    "München",
  ],
  applicationName: "Sibylle Bergold",
  manifest: "/assets/sibylle/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/assets/sibylle/favicon/favicon.ico" },
      { url: "/assets/sibylle/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/sibylle/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/sibylle/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/sibylle/favicon/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/assets/sibylle/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/assets/sibylle/favicon/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/sibylle/favicon/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/assets/sibylle/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/assets/sibylle/favicon/safari-pinned-tab.svg", color: "#846733" }],
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "Sibylle Bergold",
    title: "Sibylle Bergold | Systemische Klarheit",
    description: "Systemische Aufstellung, Coaching und Selbsterfahrung mit Sibylle Bergold.",
    images: [{ url: "/assets/sibylle/og/og-image-1200x630.png", width: 1200, height: 630, alt: "Sibylle Bergold" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sibylle Bergold | Systemische Klarheit",
    description: "Systemische Aufstellung, Coaching und Selbsterfahrung mit Sibylle Bergold.",
    images: ["/assets/sibylle/og/og-image-1200x630.png"],
  },
  other: {
    "msapplication-config": "/assets/sibylle/favicon/browserconfig.xml",
    "theme-color": "#846733",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://sibylle-bergold.de/#organization",
        name: "Sibylle Bergold | Systemische Klarheit",
        url: "https://sibylle-bergold.de",
        logo: "https://sibylle-bergold.de/assets/sibylle/brand/logo-primary.png",
        image: "https://sibylle-bergold.de/assets/sibylle/portraits/Design-ohne-Titel-2.png",
        description:
          "Systemische Aufstellung, Beziehungsmuster lösen und Coaching als Selbsterfahrung mit Sibylle Bergold.",
        telephone: "+491785511230",
        areaServed: ["München", "Deutschland", "Online"],
        knowsAbout: [
          "Systemische Aufstellung",
          "Familienaufstellung",
          "Beziehungsmuster",
          "Systemisches Coaching",
          "Selbsterfahrung",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "München",
          addressCountry: "DE",
        },
      },
      {
        "@type": "Person",
        "@id": "https://sibylle-bergold.de/#person",
        name: "Sibylle Bergold",
        jobTitle: "Systemische Aufstellerin und Coach",
        description: "Gründerin der Deutschen Akademie für Systemaufstellungen mit über 25 Jahren Erfahrung.",
        url: "https://sibylle-bergold.de",
        worksFor: { "@id": "https://sibylle-bergold.de/#organization" },
      },
      {
        "@type": "WebSite",
        "@id": "https://sibylle-bergold.de/#website",
        url: "https://sibylle-bergold.de",
        name: "Sibylle Bergold",
        publisher: { "@id": "https://sibylle-bergold.de/#organization" },
      },
    ],
  };

  return (
    <html lang="de">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <div className={`sibylle-site ${serif.variable} ${sans.variable}`}>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
