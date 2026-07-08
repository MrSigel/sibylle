'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CTAButton } from '@/components/sibylle/CTAButton';
import { methodSteps, ctaLinks, themeCards } from '@/lib/sibylle/siteData';

const ease = [0.22, 1, 0.36, 1] as const;

export function MethodeClient() {
  return (
    <main className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="grain relative flex min-h-[50svh] items-center overflow-hidden px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-sand/20 blur-[100px]" />
        <div className="absolute -right-24 top-12 h-[30rem] w-[30rem] rounded-full bg-softGold/10 blur-[110px]" />
        
        <div className="container relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease }}
            className="mx-auto max-w-4xl"
          >
            <p className="eyebrow mx-auto">Der Prozess</p>
            <h1 className="editorial mt-7 text-[clamp(2.8rem,6vw,6.5rem)] leading-[.95] text-warmBlack">
              Von der Wahrnehmung zur <span className="italic text-deepGold">Veränderung.</span>
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-deepGold/85 md:text-xl">
              Systemische Aufstellungen sind ein Weg, unbewusste Dynamiken sichtbar zu machen und neue, heilsame Perspektiven einzunehmen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-shell pt-0">
        <div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, ease }}>
            <p className="eyebrow">Systemische Aufstellung</p>
            <h2 className="editorial mt-6 text-4xl leading-tight text-warmBlack md:text-5xl">
              Was in einer Aufstellung <span className="italic text-deepGold">geschieht</span>.
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: .1, ease }} className="space-y-6 text-lg leading-8 text-deepGold/80">
            <p>
              In einer systemischen Aufstellung wird dein Anliegen räumlich sichtbar gemacht – über Stellvertreter, Bilder oder innere Positionen. Was vorher nur als diffuses Gefühl spürbar war, bekommt plötzlich eine Ordnung, die du wahrnehmen und verstehen kannst.
            </p>
            <p>
              Oft zeigen sich dabei Dynamiken, die über Generationen wirken: Loyalitäten, unausgesprochene Themen, übernommene Rollen. Sie sichtbar zu machen ist der erste, entscheidende Schritt, um innerlich einen stimmigeren Platz einzunehmen – ruhig, ohne Druck und ohne Bewertung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-shell pt-0">
        <div className="container">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow">In fünf Schritten</p>
            <h2 className="editorial mt-6 text-4xl leading-tight text-warmBlack md:text-5xl">Der Weg durch den Prozess.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {methodSteps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="premium-panel flex flex-col rounded-[2.5rem] p-10 transition-transform hover:-translate-y-2"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-softGold/10 text-2xl font-serif font-bold text-softGold">
                  0{index + 1}
                </div>
                <h2 className="mt-8 text-2xl font-bold text-warmBlack">
                  {step.title}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-deepGold/75">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer / Important Info */}
      <section className="section-shell bg-white/40">
        <div className="container max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] border border-gold/15 bg-white p-12 md:p-16 shadow-soft"
          >
            <h2 className="editorial text-3xl md:text-4xl text-warmBlack">Wichtige Hinweise</h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-deepGold/80">
              <p>
                Die systemische Begleitung ist ein Raum für Selbsterfahrung, Achtsamkeit und tiefes Verständnis deiner Lebenszusammenhänge.
              </p>
              <p className="font-medium text-warmBlack/80">
                Wichtiger Hinweis: Diese Arbeit ist Coaching und Selbsterfahrung, keine ärztliche, psychologische oder psychotherapeutische Behandlung. Sie ersetzt keine medizinisch notwendigen Maßnahmen.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vertiefen */}
      <section className="section-shell">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="eyebrow mx-auto">Vertiefen</p>
            <h2 className="editorial mt-6 text-4xl leading-tight text-warmBlack md:text-5xl">Wobei diese Arbeit besonders wirkt.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {themeCards.map((card, index) => (
              <motion.div key={card.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <Link href={card.href} className="group flex h-full flex-col rounded-[2.5rem] border border-gold/15 bg-white p-8 shadow-soft transition-all hover:-translate-y-1 hover:border-gold/35">
                  <p className="text-xs font-bold uppercase tracking-widest text-softGold">{card.label}</p>
                  <h3 className="mt-4 text-xl font-bold text-warmBlack">{card.title}</h3>
                  <p className="mt-3 flex-grow text-sm leading-7 text-deepGold/70">{card.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-deepGold transition group-hover:gap-3">Mehr erfahren <span aria-hidden="true">→</span></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="section-shell bg-deepGold py-28 text-center text-white">
        <div className="container max-w-3xl">
          <h2 className="editorial text-4xl md:text-5xl lg:text-7xl">Bereit für dein <span className="italic text-softGold">Erkennen</span>?</h2>
          <p className="mt-10 text-xl leading-relaxed text-white/75">
            Lass uns in einem kurzen Gespräch schauen, ob diese Methode für dein Anliegen passend ist.
          </p>
          <div className="mt-14 flex flex-col justify-center gap-5 sm:flex-row">
            <CTAButton href={ctaLinks.primary.href} className="!bg-softGold !text-deepGold hover:!bg-white">
              Jetzt Kontakt aufnehmen
            </CTAButton>
            <CTAButton href="/preise" variant="secondary" className="border-white/20 text-white hover:bg-white/10">
              Zu den Preisen
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
