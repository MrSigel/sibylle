"use client";

import { track } from "@vercel/analytics";

type TrackingProperties = Record<string, string | number | boolean | null | undefined>;

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

// Map internal event names to Google Ads conversion labels (from the Ads UI,
// "Conversion action" → tag setup → the part after the slash: AW-XXXXX/<label>).
// Only events with a configured label fire an Ads conversion; all events are
// still sent to GA4 as regular events for import/analysis.
const ADS_CONVERSION_LABELS: Record<string, string | undefined> = {
  whatsapp_click: process.env.NEXT_PUBLIC_ADS_LABEL_WHATSAPP,
  booking_request: process.env.NEXT_PUBLIC_ADS_LABEL_BOOKING,
};

function hasTrackingConsent() {
  return typeof window !== "undefined" && localStorage.getItem("sibylle-cookie-consent") === "all";
}

function getGtag() {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
}

export function trackEvent(name: string, properties?: TrackingProperties) {
  if (!hasTrackingConsent()) return;

  // Vercel Analytics
  track(name, properties);

  const gtag = getGtag();
  if (typeof gtag !== "function") return;

  // GA4 event (can be marked as a conversion / key event in GA4 and imported into Ads)
  gtag("event", name, properties ?? {});

  // Direct Google Ads conversion, if a label is configured for this event
  const label = ADS_CONVERSION_LABELS[name];
  if (ADS_ID && label) {
    gtag("event", "conversion", { send_to: `${ADS_ID}/${label}` });
  }
}
