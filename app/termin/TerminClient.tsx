'use client';

import Image from 'next/image';
import { getWhatsAppLink, whatsappConfig } from '@/lib/sibylle/siteData';
import { trackEvent } from '@/lib/sibylle/tracking';

const WHATSAPP_PATH =
  'M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.06 1.6 5.83L2 22l4.4-1.15a9.9 9.9 0 0 0 5.64 1.74h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.6.68.7-2.53-.2-.32a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 5.83 2.42 8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z';

const waHref = getWhatsAppLink(whatsappConfig.messages.familienaufstellung);

function WhatsAppCTA({ source, className = '' }: { source: string; className?: string }) {
  return (
    <a
      href={waHref}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => trackEvent('whatsapp_click', { source })}
      className={`focus-ring group inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 font-bold text-white shadow-[0_14px_38px_rgba(37,211,102,.4)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[.98] ${className}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={WHATSAPP_PATH} />
      </svg>
      Per WhatsApp anfragen
    </a>
  );
}

const bullets = [
  'Wiederkehrende familiäre Muster sichtbar machen und lösen',
  'Blockaden aus der Herkunftsfamilie verstehen',
  'Einfühlsam begleitet – online oder in Aschaffenburg',
];

const steps = [
  ['01', 'Schreiben', 'Du meldest dich mit einem Klick per WhatsApp.'],
  ['02', 'Anliegen klären', 'Sibylle hört zu und schaut, ob eine Aufstellung passt.'],
  ['03', 'Termin finden', 'Ihr vereinbart gemeinsam einen passenden Termin.'],
];

export function TerminClient() {
  return (
    <main className="sibylle-landing grain relative min-h-[100svh] overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -left-32 -top-24 h-[42rem] w-[42rem] rounded-full bg-sand/40 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 top-10 h-[34rem] w-[34rem] rounded-full bg-softGold/10 blur-[110px]" />

      <header className="relative z-10 flex justify-center pt-8 pb-2">
        <span className="editorial text-lg tracking-wide text-deepGold">Sibylle Jutta Bergold</span>
      </header>

      <section className="container relative z-10 pb-16 pt-4 md:pt-10">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="eyebrow justify-center lg:justify-start">Systemische Aufstellung · nach Bert Hellinger</p>

            <h1 className="editorial mt-6 text-[clamp(2.5rem,5.5vw,4.6rem)] leading-[.94] text-warmBlack">
              Familienaufstellung <span className="italic text-deepGold">nach Hellinger</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-deepGold/85 lg:mx-0">
              Wiederkehrende Muster aus deiner Herkunftsfamilie sichtbar machen und lösen –
              einfühlsam begleitet von Sibylle Jutta Bergold, <span className="font-semibold">online oder in Aschaffenburg</span>.
            </p>

            {/* Trust row */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-deepGold lg:justify-start">
              <span className="flex items-center gap-1.5">
                <span className="text-base text-softGold">★★★★★</span>
                34 Bewertungen auf Google
              </span>
              <span className="hidden text-gold/40 sm:inline">·</span>
              <span>Über 25 Jahre Erfahrung</span>
              <span className="hidden text-gold/40 sm:inline">·</span>
              <span>Arbeit nach Hellinger</span>
            </div>

            {/* Primary CTA */}
            <div className="mt-9 flex flex-col items-center gap-3 lg:items-start">
              <WhatsAppCTA source="landing-familienaufstellung-hero" className="h-16 w-full max-w-sm text-base sm:w-auto sm:px-10" />
              <a
                href={`tel:+${whatsappConfig.phone}`}
                onClick={() => trackEvent('call_click', { source: 'landing-familienaufstellung' })}
                className="text-sm font-semibold text-deepGold/70 underline-offset-4 hover:text-deepGold hover:underline"
              >
                Oder direkt anrufen: 0178 5511230
              </a>
            </div>

            {/* Bullets */}
            <ul className="mx-auto mt-9 flex max-w-md flex-col gap-3 text-left lg:mx-0">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[.98rem] leading-7 text-warmBlack">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-deepGold text-[.7rem] font-bold text-cream">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-[440px] lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[3.5rem] border border-gold/15 bg-white shadow-[0_40px_110px_rgba(35,42,26,.18)]">
              <Image
                src="/assets/sibylle/portraits/1.jpg"
                alt="Sibylle Jutta Bergold – Familienaufstellung nach Hellinger"
                fill
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 z-20 flex h-24 w-24 items-center justify-center rounded-full bg-deepGold shadow-2xl sm:h-28 sm:w-28">
              <Image src="/assets/sibylle/brand/monogram-cream.png" alt="" width={618} height={799} className="h-14 w-auto sm:h-16" />
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-5 md:mt-20 md:grid-cols-3">
          {steps.map(([num, title, text]) => (
            <div key={num} className="premium-panel rounded-[2rem] p-7 text-center md:text-left">
              <span className="editorial text-3xl text-softGold/40">{num}</span>
              <p className="mt-3 text-lg font-semibold text-warmBlack">{title}</p>
              <p className="mt-2 text-sm leading-6 text-deepGold/80">{text}</p>
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-14 flex flex-col items-center gap-3 text-center">
          <p className="editorial text-2xl text-warmBlack">Mach den ersten Schritt.</p>
          <WhatsAppCTA source="landing-familienaufstellung-closing" className="h-14 px-9" />
        </div>
      </section>

      {/* Sticky mobile CTA (this route has no global sticky bar) */}
      <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-gold/15 bg-cream/90 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-16px_45px_rgba(31,33,26,.1)] backdrop-blur-xl md:hidden">
        <WhatsAppCTA source="landing-familienaufstellung-sticky" className="mx-auto flex h-14 max-w-md" />
      </div>

      {/* Minimal legal footer */}
      <footer className="relative z-10 border-t border-gold/10 px-4 pb-28 pt-8 text-center md:pb-10">
        <p className="text-xs text-deepGold/60">
          © {2026} Sibylle Jutta Bergold ·{' '}
          <a href="/impressum" className="hover:text-deepGold hover:underline">Impressum</a> ·{' '}
          <a href="/datenschutz" className="hover:text-deepGold hover:underline">Datenschutz</a> ·{' '}
          <a href="/cookies" className="hover:text-deepGold hover:underline">Cookies</a>
        </p>
      </footer>
    </main>
  );
}
