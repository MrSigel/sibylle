import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/sibylle/SiteHeader";
import { SiteFooter } from "@/components/sibylle/SiteFooter";
import { MobileStickyCTA } from "@/components/sibylle/MobileStickyCTA";
import { CookieBanner } from "@/components/sibylle/CookieBanner";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

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
  metadataBase: new URL("https://www.klickfunden.de"),
  title: {
    default: "Sibylle Bergold | Systemische Klarheit",
    template: "%s | Sibylle Bergold",
  },
  description:
    "Klarheit, Wahrnehmung, innere Verbindung und systemische Tiefe – persönlich begleitet von Sibylle Bergold.",
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
      {
        url: "/assets/sibylle/favicon/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/assets/sibylle/favicon/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/assets/sibylle/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/assets/sibylle/favicon/safari-pinned-tab.svg",
        color: "#3F4A2C",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "Sibylle Bergold",
    title: "Sibylle Bergold | Systemische Klarheit",
    description:
      "Klarheit, Wahrnehmung, innere Verbindung und systemische Tiefe.",
    images: [
      {
        url: "/assets/sibylle/og/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Sibylle Bergold",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sibylle Bergold | Systemische Klarheit",
    description:
      "Klarheit, Wahrnehmung, innere Verbindung und systemische Tiefe.",
    images: ["/assets/sibylle/og/og-image-1200x630.png"],
  },
  other: {
    "msapplication-config": "/assets/sibylle/favicon/browserconfig.xml",
    "theme-color": "#3F4A2C",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <div className={`sibylle-site ${serif.variable} ${sans.variable}`}>
          <SiteHeader />
          {children}
          <SiteFooter />
          <MobileStickyCTA />
          <CookieBanner />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
