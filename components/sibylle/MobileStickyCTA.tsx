'use client';
import { CTAButton } from './CTAButton';
import { ctaLinks } from '@/lib/sibylle/siteData';

export function MobileStickyCTA() {
  return <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-olive/15 bg-cream/90 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-16px_45px_rgba(31,33,26,.1)] backdrop-blur-xl md:hidden"><div className="mx-auto grid max-w-md grid-cols-2 gap-2"><CTAButton href={ctaLinks.primary.href} variant="secondary" className="!h-12 !px-3">Nachricht</CTAButton><CTAButton href={ctaLinks.secondary.href} external className="!h-12 !px-3">Termin</CTAButton></div></div>;
}
