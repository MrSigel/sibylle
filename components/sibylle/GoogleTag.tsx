"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

/**
 * Loads the Google tag (gtag.js) for GA4 and/or Google Ads and wires it to the
 * existing cookie banner via Google Consent Mode v2.
 *
 * - The consent DEFAULT (all denied) is set inline in <head> in app/layout.tsx
 *   so it runs before any tag fires — required for EEA/DE compliance.
 * - Here we only load the library + config and push a consent UPDATE whenever
 *   the user accepts ("all") or declines ("essential") in the banner.
 *
 * If neither env var is set the component renders nothing, so the site keeps
 * working locally without a Google account configured.
 */
export function GoogleTag() {
  useEffect(() => {
    function applyConsent() {
      const state =
        localStorage.getItem("sibylle-cookie-consent") === "all" ? "granted" : "denied";
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof gtag === "function") {
        gtag("consent", "update", {
          ad_storage: state,
          ad_user_data: state,
          ad_personalization: state,
          analytics_storage: state,
        });
      }
    }

    applyConsent();
    window.addEventListener("sibylle-cookie-consent-change", applyConsent);
    window.addEventListener("storage", applyConsent);
    return () => {
      window.removeEventListener("sibylle-cookie-consent-change", applyConsent);
      window.removeEventListener("storage", applyConsent);
    };
  }, []);

  if (!GA_ID && !ADS_ID) return null;

  const loaderId = GA_ID ?? ADS_ID;

  return (
    <>
      <Script
        id="gtag-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {[
          GA_ID ? `gtag('config', '${GA_ID}');` : "",
          ADS_ID ? `gtag('config', '${ADS_ID}');` : "",
        ]
          .filter(Boolean)
          .join("\n")}
      </Script>
    </>
  );
}
