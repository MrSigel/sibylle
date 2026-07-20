"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileStickyCTA } from "./MobileStickyCTA";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { CookieBanner } from "./CookieBanner";
import { ExitIntentBanner } from "./ExitIntentBanner";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCrm = pathname?.startsWith("/crm") || pathname?.startsWith("/login");
  // Dedicated Ads landing page: no header/footer/floats — one focused message
  // and a single WhatsApp CTA. Keep the cookie banner so consent + conversion
  // tracking still work.
  const isLanding = pathname?.startsWith("/termin");

  if (isCrm) {
    return <>{children}</>;
  }

  if (isLanding) {
    return (
      <>
        {children}
        <CookieBanner />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <MobileStickyCTA />
      <WhatsAppFloat />
      <CookieBanner />
      <ExitIntentBanner />
    </>
  );
}
