import Link from 'next/link';
import Image from 'next/image';
import { footerLinks, focusLinks } from '@/lib/sibylle/siteData';

const discoverLinks = [
  { href: '/methode', label: 'Methode' },
  { href: '/faq', label: 'Häufige Fragen' },
  { href: '/wissen', label: 'Wissen' },
  { href: '/academy', label: 'Academy' },
];

export function SiteFooter() {
  return (
    <footer className="grain relative overflow-hidden border-t border-gold/15 bg-white px-4 pb-8 pt-16 text-sm text-deepGold/70 md:px-0 md:pt-20">
      <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-softGold/10 blur-[120px]" />
      <div className="container relative z-10">
        <div className="grid gap-12 border-b border-gold/15 pb-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] md:items-start">
          <div className="space-y-6">
            <Image src="/assets/sibylle/brand/logo-primary.png" alt="Sibylle Bergold" width={1114} height={536} className="h-auto w-[220px]" />
            <p className="max-w-sm text-base leading-7 text-deepGold/80">Klarheit, Wahrnehmung und systemische Tiefe – persönlich begleitet von Sibylle Bergold.</p>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-warmBlack">Themen</h4>
            <ul className="grid gap-3">
              {focusLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-softGold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-warmBlack">Entdecken</h4>
            <ul className="grid gap-3">
              {discoverLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-softGold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:text-right space-y-6">
            <p className="editorial text-3xl leading-tight text-warmBlack md:text-4xl">Was dich bewegt, darf Raum bekommen.</p>
            <a href="mailto:kontakt@sibylle-bergold.com" className="focus-ring inline-flex items-center gap-3 rounded-full border border-gold/20 px-6 py-3 font-semibold text-deepGold transition hover:bg-softGold hover:text-white">
              Sibylle persönlich schreiben <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        
        <div className="flex flex-col gap-6 pt-7 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-3 order-2 md:order-1">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-softGold">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 md:items-end order-1 md:order-2">
            <p>© {new Date().getFullYear()} Sibylle Bergold</p>
            <p className="text-xs text-deepGold/40">Website von <a href="https://klickfunden.de" target="_blank" rel="noreferrer noopener" className="text-deepGold/70 underline decoration-softGold/50 underline-offset-4 transition hover:text-softGold">klickfunden.de</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
