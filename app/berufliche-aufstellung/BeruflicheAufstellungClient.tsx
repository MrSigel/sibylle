'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CTAButton } from '@/components/sibylle/CTAButton';
import { ctaLinks, getWhatsAppLink } from '@/lib/sibylle/siteData';

const ease = [0.22, 1, 0.36, 1] as const;

export function BeruflicheAufstellungClient() {
  const waLink = getWhatsAppLink("Hallo Sibylle, ich möchte eine berufliche Situation oder mein Business systemisch aufstellen lassen.");
  
  return (
    <main className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="grain relative flex min-h-[60svh] items-center overflow-hidden px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-softGold/10 blur-[100px]" />
        <div className="absolute -right-24 top-12 h-[30rem] w-[30rem] rounded-full bg-sand/20 blur-[110px]" />
        
        <div className="container relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease }}
            className="mx-auto max-w-4xl"
          >
            <p className="eyebrow mx-auto">Business & Erfolg</p>
            <h1 className="editorial mt-7 text-[clamp(3.2rem,7vw,7.5rem)] leading-[.88] text-warmBlack">
              Klarheit für dein <span className="italic text-deepGold">Business.</span>
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-deepGold/85 md:text-xl md:leading-9">
              Beruflicher Erfolg, Teamdynamiken oder die eigene Positionierung – systemische Aufstellungen machen Blockaden im Business sichtbar und lösbar.
            </p>
            
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <CTAButton href={waLink}>Business-Check anfragen</CTAButton>
              <CTAButton href={ctaLinks.secondary.href} variant="secondary" external>Erstgespräch buchen</CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-shell">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1 relative aspect-square lg:aspect-[4/5]">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="relative h-full w-full overflow-hidden rounded-[3.5rem] border border-gold/10 shadow-2xl"
               >
                 <Image src="/assets/sibylle/portraits/erfolg_.png" alt="Berufliche Aufstellung" fill className="object-cover" />
               </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="editorial text-4xl md:text-5xl lg:text-6xl">Systeme im Beruf</h2>
              <div className="mt-8 space-y-6 text-base leading-8 text-deepGold/85">
                <p>
                  Jedes Unternehmen und jede berufliche Rolle ist Teil eines Systems. Wenn Projekte stocken oder Konflikte im Team immer wiederkehren, liegt das oft an einer verletzten systemischen Ordnung.
                </p>
                <p>
                  Eine Organisationsaufstellung hilft dir, Distanz zu gewinnen und die verborgenen Dynamiken zu erkennen. So kannst du kluge Entscheidungen treffen, die dein Business und dein Wohlbefinden stützen.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Unklare Hierarchien oder Verantwortlichkeiten",
                    "Blockaden bei der Kundengewinnung",
                    "Immer wiederkehrende Teamkonflikte",
                    "Entscheidungsfindung bei Neuausrichtungen"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ / AEO Section */}
      <section className="section-shell bg-white/40">
        <div className="container max-w-4xl text-center">
          <h2 className="editorial text-4xl md:text-5xl mb-12">Häufige Fragen zum Business-Coaching</h2>
          <div className="grid gap-6 text-left">
            {[
              {
                q: "Muss mein ganzes Team bei der Aufstellung dabei sein?",
                a: "Nein. Wir können dein berufliches Anliegen auch im Einzelsetting (online oder vor Ort) mit Platzhaltern oder Figuren aufstellen. Dein Blickwinkel verändert das System."
              },
              {
                q: "Eignet sich die Aufstellung für Selbstständige?",
                a: "Besonders für Solopreneure ist die systemische Arbeit wertvoll, um die Beziehung zum eigenen Business, zum Geld oder zu den Kunden zu klären."
              }
            ].map((faq, idx) => (
              <div key={idx} className="premium-panel rounded-[2.5rem] p-10">
                <h3 className="text-xl font-bold text-warmBlack mb-4">{faq.q}</h3>
                <p className="text-deepGold/80 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Funnel CTA */}
      <section className="section-shell bg-white py-28 text-center text-warmBlack border-t border-gold/10">
        <div className="container max-w-3xl">
          <h2 className="editorial text-4xl md:text-5xl lg:text-7xl">Bringe dein Business in den <span className="italic text-gold">Fluss</span>.</h2>
          <p className="mt-10 text-xl leading-relaxed text-deepGold/75">
            Klarheit im Inneren führt zu Erfolg im Äußeren. Lass uns dein berufliches System ordnen.
          </p>
          <div className="mt-14 flex flex-col justify-center gap-5 sm:flex-row">
            <CTAButton href={waLink} className="!bg-deepGold !text-white hover:!bg-gold">
              Sibylle schreiben
            </CTAButton>
            <CTAButton href={ctaLinks.secondary.href} variant="secondary" external>
              Erstgespräch buchen
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
