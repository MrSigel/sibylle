'use client';

import { motion } from 'framer-motion';
import { pricingPackages, academyInfo, ctaLinks, getWhatsAppLink, whatsappConfig } from '@/lib/sibylle/siteData';
import { CTAButton } from '@/components/sibylle/CTAButton';

const ease = [0.22, 1, 0.36, 1] as const;

export default function PreisePage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="grain relative px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-sand/20 blur-[100px]" />
        <div className="container relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease }}
            className="mx-auto max-w-4xl"
          >
            <p className="eyebrow mx-auto">Investment in dich</p>
            <h1 className="editorial mt-7 text-[clamp(3rem,7vw,7.5rem)] leading-[.88] text-warmBlack">
              Klarheit hat ihren <span className="italic text-deepGold">Wert.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-deepGold/80 md:text-xl">
              Wähle den Rahmen, der dir den Raum für deine Transformation bietet. Vom ersten Impuls bis zur intensiven Begleitung über mehrere Monate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="section-shell">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingPackages.map((pkg, idx) => (
              <motion.article
                key={pkg.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.7 }}
                className={`relative flex flex-col rounded-[2.5rem] p-10 transition-all duration-500 hover:-translate-y-2 ${
                  pkg.highlight 
                  ? 'bg-deepGold text-cream shadow-[0_30px_80px_rgba(35,42,26,.18)]' 
                  : 'bg-white border border-gold/10 hover:border-softGold/30 shadow-sm'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-softGold px-5 py-1 text-[10px] font-bold uppercase tracking-widest text-deepGold">
                    Empfehlung
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="font-serif text-3xl">{pkg.title}</h3>
                  <p className={`mt-2 text-sm font-medium tracking-wide uppercase ${pkg.highlight ? 'text-softGold' : 'text-softGold'}`}>
                    {pkg.duration}
                  </p>
                </div>

                <div className="mb-8 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  {pkg.title === "Academy" && <span className="text-sm opacity-60">/ Monat</span>}
                </div>

                <ul className="mb-12 flex-grow space-y-5 border-t border-current/10 pt-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[.95rem] leading-snug">
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${pkg.highlight ? 'bg-softGold' : 'bg-softGold'}`} />
                      <span className={pkg.highlight ? 'text-cream/80' : 'text-deepGold/80'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <CTAButton 
                    href={`/success?paket=${encodeURIComponent(pkg.title)}`}
                    variant={pkg.highlight ? 'secondary' : 'primary'}
                    className="w-full"
                  >
                    Paket direkt buchen
                  </CTAButton>
                  <CTAButton 
                    href={getWhatsAppLink(whatsappConfig.messages.paketAnfrage(pkg.title))}
                    variant="ghost"
                    className={`w-full !h-10 text-[10px] ${pkg.highlight ? 'text-cream/90 hover:text-cream hover:bg-white/10' : 'text-deepGold/80 hover:bg-gold/5'}`}
                  >
                    Vorher per WhatsApp klären
                  </CTAButton>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Academy Section */}
      <section className="section-shell bg-white/30">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[3rem] bg-white border border-gold/10 shadow-xl"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-softGold/10 blur-[80px]" />
            <div className="grid items-center gap-12 p-10 lg:grid-cols-[1fr_.7fr] lg:p-20">
              <div>
                <p className="eyebrow">Selbststudium & Community</p>
                <h2 className="editorial mt-6 text-4xl md:text-5xl lg:text-6xl">{academyInfo.title}</h2>
                <p className="mt-8 text-lg leading-8 text-deepGold/80">
                  Werde Teil der Academy und erhalte Zugang zu wertvollen Inhalten für deine eigene Prozessarbeit – flexibel und im eigenen Tempo.
                </p>
                <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                  {academyInfo.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4 text-sm font-semibold text-deepGold">
                      <span className="h-2 w-2 rounded-full bg-softGold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white/50 p-10 text-center">
                <span className="text-sm font-bold uppercase tracking-widest text-softGold">Ab</span>
                <span className="mt-2 text-5xl font-bold text-deepGold">{academyInfo.price}</span>
                <div className="mt-8 w-full">
                   <CTAButton href={getWhatsAppLink(whatsappConfig.messages.paketAnfrage('Academy'))} className="w-full">Jetzt Platz anfragen</CTAButton>
                </div>
                <p className="mt-4 text-xs text-deepGold/50">Jederzeit monatlich kündbar</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Individual Inquiry */}
      <section className="section-shell text-center">
        <div className="container max-w-3xl">
          <h2 className="editorial text-4xl md:text-5xl">Individuelle Begleitung</h2>
          <p className="mt-8 text-lg text-deepGold/70 leading-8">
            Keines der Pakete passt genau zu deiner Situation? Rahmen, Dauer und Konditionen können auch ganz individuell passend zu deinem Anliegen vereinbart werden.
          </p>
          <div className="mt-12">
            <CTAButton href={getWhatsAppLink(whatsappConfig.messages.default)} variant="secondary">
              Schreib Sibylle eine Nachricht
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
