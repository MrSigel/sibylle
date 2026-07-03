'use client';
import { motion } from 'framer-motion';
import { CTAButton } from './CTAButton';
import { ctaLinks } from '@/lib/sibylle/siteData';

export function ClosingCTA() {
  return <section className="grain relative overflow-hidden bg-warmBlack px-4 py-24 text-cream md:py-36"><div className="absolute left-1/2 top-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-olive/25 blur-[120px]"/><motion.div initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.9}} className="container relative z-10 text-center"><p className="eyebrow !text-sand">Der nächste Schritt</p><h2 className="editorial mx-auto mt-8 max-w-5xl text-[clamp(3.5rem,7vw,7.6rem)] leading-[.88]">Du musst dein Muster nicht allein <span className="italic text-sand">verstehen.</span></h2><p className="mx-auto mt-8 max-w-xl text-base leading-8 text-cream/60">Schreib Sibylle, was dich gerade bewegt. Im ersten Kontakt klärt ihr, welcher Rahmen zu deinem Anliegen passt.</p><div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"><CTAButton href={ctaLinks.primary.href} className="!bg-cream !text-deepOlive">Sibylle schreiben</CTAButton><CTAButton href={ctaLinks.secondary.href} variant="secondary" external className="!border-cream/25 !bg-cream/5 !text-cream">Erstgespräch buchen</CTAButton></div></motion.div></section>;
}
