"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";

export function ConsentAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function updateConsent() {
      setEnabled(localStorage.getItem("sibylle-cookie-consent") === "all");
    }

    updateConsent();
    window.addEventListener("sibylle-cookie-consent-change", updateConsent);
    window.addEventListener("storage", updateConsent);

    return () => {
      window.removeEventListener("sibylle-cookie-consent-change", updateConsent);
      window.removeEventListener("storage", updateConsent);
    };
  }, []);

  return enabled ? <Analytics /> : null;
}
