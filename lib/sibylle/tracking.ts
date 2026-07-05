"use client";

import { track } from "@vercel/analytics";

type TrackingProperties = Record<string, string | number | boolean | null | undefined>;

function hasTrackingConsent() {
  return typeof window !== "undefined" && localStorage.getItem("sibylle-cookie-consent") === "all";
}

export function trackEvent(name: string, properties?: TrackingProperties) {
  if (!hasTrackingConsent()) return;
  track(name, properties);
}
