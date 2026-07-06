'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CTAButton } from '@/components/sibylle/CTAButton';
import { ctaLinks, getWhatsAppLink } from '@/lib/sibylle/siteData';

const ease = [0.22, 1, 0.36, 1] as const;

export function AhnenmusterClient() {
  const waLink = getWhatsAppLink("Hallo Sibylle, ich interessiere mich für die Arbeit mit Ahnenmustern und möchte gerne mehr erfahren.");
  
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
            <p className="eyebrow mx-auto">Transgenerationale Weitergabe</p>
            <h1 className="editorial mt-7 text-[clamp(3.2rem,7vw,7.5rem)] leading-[.88] text-warmBlack">
              Die Geschichte deiner <span className="italic text-deepGold">Ahnen</span> in dir.
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-deepGold/85 md:text-xl md:leading-9">
              Oft tragen wir Lasten, Schicksale oder Geheimnisse unserer Vorfahren, ohne es zu wissen. Diese unbewusste Loyalität kann uns in unserem eigenen Leben blockieren.
            </p>
            
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <CTAButton href={waLink}>Ahnenmuster klären</CTAButton>
              <CTAButton href={ctaLinks.secondary.href} variant="secondary" external>Erstgespräch buchen</CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-shell">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
            >
              <h2 className="editorial text-4xl md:text-5xl lg:text-6xl">Was sind Ahnenmuster?</h2>
              <div className="mt-8 space-y-6 text-base leading-8 text-deepGold/85">
                <p>
                  Ahnenmuster sind Verhaltensweisen, Glaubenssätze oder emotionale Reaktionen, die über Generationen hinweg weitergegeben wurden. In der Epigenetik und der systemischen Arbeit wissen wir heute: Erfahrungen unserer Großeltern können noch in uns wirken.
                </p>
                <p>
                  Ob Flucht, Verlust, unerfüllte Träume oder Familiengeheimnisse – das System strebt nach Vollständigkeit. Wenn jemand ausgeschlossen wurde oder ein Schicksal nicht gewürdigt wurde, übernimmt oft ein Nachkomme unbewusst diese Rolle.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Ungeklärte Ängste ohne eigenen Auslöser",
                    "Wiederkehrende Schicksalsschläge in der Familie",
                    "Gefühl, nicht am eigenen Platz zu sein",
                    "Blockaden bei Erfolg oder Glück"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <div className="relative aspect-square lg:aspect-[4/5]">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="relative h-full w-full overflow-hidden rounded-[3.5rem] border border-gold/10 shadow-2xl"
               >
                 <Image src="/assets/sibylle/portraits/3.jpg" alt="Ahnenmuster verstehen" fill className="object-cover" />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* AEO / FAQ Section for GEO */}
      <section className="section-shell bg-white/40">
        <div className="container max-w-4xl">
          <h2 className="editorial text-center text-4xl md:text-5xl mb-16">Fragen zu Ahnenmustern</h2>
          <div className="space-y-12">
            {[
              {
                q: "Kann ich Muster lösen, ohne meine Vorfahren zu kennen?",
                a: "Ja. In einer Aufstellung arbeiten wir mit dem 'wissenden Feld'. Informationen, die für die Lösung relevant sind, zeigen sich im Raum, auch wenn Fakten fehlen."
              },
              {
                q: "Bin ich schuld an den Lasten meiner Vorfahren?",
                a: "Nein. Es geht nicht um Schuld, sondern um eine unbewusste, kindliche Loyalität. Das Lösen geschieht in Liebe und Würdigung, nicht in Ablehnung."
              },
              {
                q: "Wie lange dauert es, ein Ahnenmuster zu lösen?",
                a: "Oft bringt eine einzige intensive Aufstellung den entscheidenden Impuls für die Lösung. Der Prozess der Integration im Alltag darf danach in Ruhe wirken."
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
          <h2 className="editorial text-4xl md:text-5xl lg:text-7xl">Bist du bereit für deine <span className="italic text-gold">Freiheit</span>?</h2>
          <p className="mt-10 text-xl leading-relaxed text-deepGold/75">
            Löse die unsichtbaren Fäden der Vergangenheit und nimm deinen Platz im Hier und Jetzt ein.
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
