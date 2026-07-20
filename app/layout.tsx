import type { Metadata } from "next";
import "./globals.css";
import { ConditionalLayout } from "@/components/sibylle/ConditionalLayout";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { ConsentAnalytics } from "@/components/sibylle/ConsentAnalytics";
import { GoogleTag } from "@/components/sibylle/GoogleTag";
import { pricingPackages } from "@/lib/sibylle/siteData";

// Google Consent Mode v2 default: everything denied until the user accepts in
// the cookie banner. Must run before any Google tag fires (EEA/DE requirement).
const consentDefault = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('set','ads_data_redaction',true);
gtag('js',new Date());
`;

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
  metadataBase: new URL("https://sibylle-bergold.com"),
  title: {
    default: "Sibylle Bergold | Systemische Klarheit",
    template: "%s | Sibylle Bergold",
  },
  description:
    "Systemische Aufstellung und Coaching mit Sibylle Jutta Bergold. Beziehungsmuster, Familienmuster und Selbsterfahrung online und in Aschaffenburg.",
  keywords: [
    "Systemische Aufstellung",
    "Familienaufstellung",
    "Sibylle Bergold",
    "Beziehungsmuster lösen",
    "Systemisches Coaching",
    "Selbsterfahrung",
    "Aschaffenburg",
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
    description: "Systemische Aufstellung, Coaching und Selbsterfahrung mit Sibylle Jutta Bergold.",
    images: [{ url: "/assets/sibylle/og/og-image-1200x630.png", width: 1200, height: 630, alt: "Sibylle Bergold" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sibylle Bergold | Systemische Klarheit",
    description: "Systemische Aufstellung, Coaching und Selbsterfahrung mit Sibylle Jutta Bergold.",
    images: ["/assets/sibylle/og/og-image-1200x630.png"],
  },
  other: {
    "msapplication-config": "/assets/sibylle/favicon/browserconfig.xml",
    "theme-color": "#846733",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const baseUrl = "https://sibylle-bergold.com";
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
        "@id": "https://sibylle-bergold.com/#organization",
        name: "Sibylle Bergold | Systemische Klarheit",
        url: "https://sibylle-bergold.com",
        logo: "https://sibylle-bergold.com/assets/sibylle/brand/logo-primary.png",
        image: "https://sibylle-bergold.com/assets/sibylle/portraits/1.jpg",
        description:
          "Systemische Aufstellung, Beziehungsmuster lösen und Coaching als Selbsterfahrung mit Sibylle Jutta Bergold.",
        telephone: "+491785511230",
        email: "kontakt@sibylle-bergold.com",
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+491785511230",
            email: "kontakt@sibylle-bergold.com",
            contactType: "customer service",
            availableLanguage: ["de"],
          },
        ],
        areaServed: ["Aschaffenburg", "Deutschland", "Online"],
        knowsAbout: [
          "Systemische Aufstellung",
          "Familienaufstellung",
          "Beziehungsmuster",
          "Systemisches Coaching",
          "Selbsterfahrung",
        ],
        sameAs: [
          "https://www.instagram.com/sibyllebergold/",
          "https://www.facebook.com/sibylle.bergold/",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Cranachstraße 52",
          postalCode: "63739",
          addressLocality: "Aschaffenburg",
          addressCountry: "DE",
        },
      },
      {
        "@type": "Person",
        "@id": "https://sibylle-bergold.com/#person",
        name: "Sibylle Jutta Bergold",
        jobTitle: "Systemische Aufstellerin und Coach",
        description: "Gründerin der Deutschen Akademie für Systemaufstellungen mit über 25 Jahren Erfahrung.",
        url: "https://sibylle-bergold.com",
        worksFor: { "@id": "https://sibylle-bergold.com/#organization" },
        sameAs: [
          "https://www.instagram.com/sibyllebergold/",
          "https://www.facebook.com/sibylle.bergold/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://sibylle-bergold.com/#website",
        url: "https://sibylle-bergold.com",
        name: "Sibylle Bergold",
        publisher: { "@id": "https://sibylle-bergold.com/#organization" },
      },
      ...servicePages.map(([name, url, description]) => ({
        "@type": "Service",
        "@id": `${baseUrl}${url}#service`,
        name,
        description,
        url: `${baseUrl}${url}`,
        provider: { "@id": "https://sibylle-bergold.com/#organization" },
        areaServed: ["Deutschland", "Aschaffenburg", "Online"],
        serviceType: "Systemische Aufstellung und Coaching",
      })),
      ...pricingPackages.map((pkg) => ({
        "@type": "Offer",
        "@id": `${baseUrl}/preise#${pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        name: pkg.title,
        description: `${pkg.duration}: ${pkg.features.join(", ")}`,
        availability: "https://schema.org/InStock",
        url: `${baseUrl}/preise`,
        seller: { "@id": "https://sibylle-bergold.com/#organization" },
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
        <script dangerouslySetInnerHTML={{ __html: consentDefault }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <div className={`sibylle-site ${serif.variable} ${sans.variable}`}>
          <ConditionalLayout>{children}</ConditionalLayout>
          <ConsentAnalytics />
          <GoogleTag />
        </div>
      </body>
    </html>
  );
}
