import type { Metadata } from "next";
import "./globals.css";
import { ConditionalLayout } from "@/components/sibylle/ConditionalLayout";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { ConsentAnalytics } from "@/components/sibylle/ConsentAnalytics";
import { pricingPackages } from "@/lib/sibylle/siteData";

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
  const baseUrl = "https://sibylle-bergold.de";
  const servicePages = [
    ["Systemaufstellung", "/systemaufstellung", "Systemische Aufstellungen online und vor Ort zur Klärung familiärer, beruflicher und persönlicher Dynamiken."],
    ["Familienaufstellung", "/familienmuster", "Familienmuster sichtbar machen und wiederkehrende Prägungen aus der Herkunftsfamilie verstehen."],
    ["Beziehungsmuster lösen", "/beziehungsmuster", "Systemisches Coaching für wiederkehrende Nähe-, Rückzugs- und Bindungsmuster in Beziehungen."],
    ["Partnerschaft", "/partnerschaft", "Begleitung für Dynamiken in Liebe, Nähe und Partnerschaft."],
    ["Berufliche Aufstellung", "/berufliche-aufstellung", "Systemische Aufstellung für berufliche Entscheidungen, Rollen, Erfolgsmuster und Organisationsthemen."],
    ["Inneres Kind", "/inneres-kind", "Systemische Selbsterfahrung zur Arbeit mit inneren Anteilen, alten Prägungen und emotionalen Mustern."],
  ] as const;
  const breadcrumbPages = [
    ["Start", "/"],
    ["Über mich", "/ueber-mich"],
    ["Systemaufstellung", "/systemaufstellung"],
    ["Beziehungsmuster", "/beziehungsmuster"],
    ["Partnerschaft", "/partnerschaft"],
    ["Preise", "/preise"],
    ["Referenzen", "/referenzen"],
    ["FAQ", "/faq"],
  ] as const;
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
        priceRange: "399 EUR - 9999 EUR",
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+491785511230",
            contactType: "customer service",
            availableLanguage: ["de"],
          },
        ],
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
      ...servicePages.map(([name, url, description]) => ({
        "@type": "Service",
        "@id": `${baseUrl}${url}#service`,
        name,
        description,
        url: `${baseUrl}${url}`,
        provider: { "@id": "https://sibylle-bergold.de/#organization" },
        areaServed: ["Deutschland", "München", "Online"],
        serviceType: "Systemische Aufstellung und Coaching",
      })),
      ...pricingPackages.map((pkg) => ({
        "@type": "Offer",
        "@id": `${baseUrl}/preise#${pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        name: pkg.title,
        description: `${pkg.duration}: ${pkg.features.join(", ")}`,
        price: pkg.price.replace(/[^\d,.]/g, "").replace(",", "."),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: `${baseUrl}/preise`,
        seller: { "@id": "https://sibylle-bergold.de/#organization" },
      })),
      ...breadcrumbPages.map(([name, url]) => ({
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}${url === "/" ? "" : url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Start",
            item: baseUrl,
          },
          ...(url === "/"
            ? []
            : [
                {
                  "@type": "ListItem",
                  position: 2,
                  name,
                  item: `${baseUrl}${url}`,
                },
              ]),
        ],
      })),
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
          <ConsentAnalytics />
        </div>
      </body>
    </html>
  );
}
