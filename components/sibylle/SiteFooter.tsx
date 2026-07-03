import Link from 'next/link';
import Image from 'next/image';
import { footerLinks } from '@/lib/sibylle/siteData';

export function SiteFooter() {
  return (
    <footer className="grain relative overflow-hidden border-t border-cream/10 bg-warmBlack px-4 pb-8 pt-16 text-sm text-cream/60 md:px-0 md:pt-20">
      <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-olive/20 blur-[100px]" />
      <div className="container relative z-10">
        <div className="grid gap-12 border-b border-cream/10 pb-14 md:grid-cols-[1fr_.9fr] md:items-end">
          <div><Image src="/assets/sibylle/brand/logo-primary-cream.png" alt="Sibylle Bergold" width={1114} height={536} className="h-auto w-[220px]" /><p className="mt-6 max-w-sm text-base leading-7 text-cream/65">Klarheit, Wahrnehmung und systemische Tiefe – persönlich begleitet.</p></div>
          <div className="md:text-right"><p className="editorial text-3xl leading-tight text-cream md:text-4xl">Was dich bewegt, darf Raum bekommen.</p><a href="mailto:kontakt@sibylle-bergold.de" className="focus-ring mt-7 inline-flex items-center gap-3 rounded-full border border-cream/20 px-6 py-3 font-semibold text-cream transition hover:border-softGold hover:text-softGold">Sibylle persönlich schreiben <span aria-hidden="true">→</span></a></div>
        </div>
        <div className="flex flex-col gap-6 pt-7 md:flex-row md:items-center md:justify-between"><div className="flex flex-wrap gap-x-5 gap-y-3">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-softGold">
              {item.label}
            </Link>
          ))}
        </div><div className="flex flex-col gap-2 md:items-end"><p>© {new Date().getFullYear()} Sibylle Bergold</p><p className="text-xs text-cream/40">Website von <a href="https://klickfunden.de" target="_blank" rel="noreferrer noopener" className="text-cream/70 underline decoration-softGold/50 underline-offset-4 transition hover:text-softGold">klickfunden.de</a></p></div></div>
      </div>
    </footer>
  );
}
