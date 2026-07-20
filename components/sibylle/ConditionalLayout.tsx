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

  if (isCrm) {
    return <>{children}</>;
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
