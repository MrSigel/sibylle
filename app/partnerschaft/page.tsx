'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CTAButton } from '@/components/sibylle/CTAButton';
import { ctaLinks, getWhatsAppLink, whatsappConfig } from '@/lib/sibylle/siteData';

const ease = [0.22, 1, 0.36, 1] as const;

export default function PartnerschaftPage() {
  const waLink = getWhatsAppLink(whatsappConfig.messages.partnerschaft);
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="grain relative flex min-h-[60svh] items-center overflow-hidden px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-sand/20 blur-[100px]" />
        <div className="absolute -right-24 top-12 h-[30rem] w-[30rem] rounded-full bg-softGold/10 blur-[110px]" />
        
        <div className="container relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease }}
            className="mx-auto max-w-4xl"
          >
            <p className="eyebrow mx-auto">Verbindung & Dynamik</p>
            <h1 className="editorial mt-7 text-[clamp(3.2rem,7vw,7.5rem)] leading-[.88] text-warmBlack">
              Wenn Beziehung sich <span className="italic text-deepGold">schwerer</span> anfühlt, als sie sollte.
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-deepGold/85 md:text-xl md:leading-9">
              Vielleicht liebst du – und trotzdem entsteht immer wieder Abstand. Vielleicht geratet ihr in dieselben Konflikte, obwohl ihr es anders wollt. Oder du spürst nach einer Trennung, dass der Schmerz tiefer sitzt als diese eine Beziehung.
            </p>
            
            <div className="mt-10 rounded-[2rem] bg-white/40 backdrop-blur-sm border border-gold/10 p-8 text-base leading-8 text-deepGold/80">
              In der systemischen Aufstellung mit Sibylle Bergold geht es nicht darum, Schuld zu suchen. Nicht bei dir. Nicht beim anderen. Sondern darum, sichtbar zu machen, welche Dynamik im Hintergrund wirkt – und was endlich gesehen werden möchte.
            </div>

            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <CTAButton href={waLink}>Jetzt persönlich bei Sibylle melden</CTAButton>
              <CTAButton href={waLink} variant="secondary" external>Kostenloses Erstgespräch buchen</CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Abschnitt 1: Beziehungskrise */}
      <section className="section-shell overflow-hidden">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow">Abschnitt 1</p>
              <h2 className="editorial mt-6 text-4xl md:text-5xl lg:text-6xl">Beziehungskrise</h2>
              <h3 className="mt-6 font-serif text-2xl italic text-deepGold/70">Wenn Nähe und Abstand sich ständig abwechseln</h3>
              <div className="mt-8 space-y-6 text-base leading-8 text-deepGold/85">
                <p>
                  Manche Beziehungen fühlen sich an wie ein Kreis: Hoffnung, Nähe, Rückzug, Streit, Versöhnung – und irgendwann beginnt alles von vorn.
                </p>
                <p>
                  Oft geht es dabei nicht nur um Kommunikation oder den aktuellen Konflikt. Manchmal berührt eine Partnerschaft alte Muster: Angst, verlassen zu werden. Das Gefühl, nicht genug zu sein. Oder die unbewusste Erwartung, Liebe müsse schwer sein.
                </p>
                <div className="rounded-2xl border-l-4 border-softGold bg-white/20 p-6 italic text-deepGold/80">
                  Eine Aufstellung kann sichtbar machen, was zwischen zwei Menschen wirkt – ohne Vorwurf, ohne Schuld, ohne Druck.
                </div>
              </div>
            </motion.div>
            <div className="relative aspect-square lg:aspect-[4/5]">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="relative h-full w-full overflow-hidden rounded-[3.5rem] border border-gold/10 shadow-2xl"
               >
                 <Image src="/assets/sibylle/portraits/cho.png" alt="Beziehungskrise" fill className="object-cover object-center" priority />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Abschnitt 2: Singles */}
      <section className="section-shell bg-white/20 overflow-hidden">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1 relative aspect-square lg:aspect-[4/5]">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="relative h-full w-full overflow-hidden rounded-[3.5rem] border border-gold/10 shadow-2xl"
               >
                 <Image src="/assets/sibylle/portraits/be_you.webp" alt="Single Muster verstehen" fill className="object-cover object-center" />
               </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <p className="eyebrow">Abschnitt 2</p>
              <h2 className="editorial mt-6 text-4xl md:text-5xl lg:text-6xl">Für Singles</h2>
              <h3 className="mt-6 font-serif text-2xl italic text-deepGold/70">Warum ziehe ich immer wieder ähnliche Menschen an?</h3>
              <div className="mt-8 space-y-6 text-base leading-8 text-deepGold/85">
                <p>
                  Vielleicht begegnest du immer wieder Menschen, die emotional nicht wirklich verfügbar sind. Oder du wünschst dir Nähe, aber sobald sie möglich wird, entsteht Unsicherheit.
                </p>
                <p>
                  Solche Muster entstehen selten zufällig. In der Aufstellungsarbeit kann sichtbar werden, welche inneren Bilder von Liebe, Bindung und Sicherheit im Hintergrund wirken.
                </p>
                <p className="font-semibold text-deepGold/90">Nicht um dich zu bewerten. Sondern um zu verstehen, warum sich etwas wiederholt.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Abschnitt 3: Trennungsschmerz */}
      <section className="section-shell overflow-hidden">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
             <p className="eyebrow mx-auto">Abschnitt 3</p>
             <h2 className="editorial mt-6 text-4xl md:text-5xl lg:text-6xl">Trennungsschmerz</h2>
             <h3 className="mt-6 font-serif text-2xl italic text-deepGold/70">Wenn eine Trennung mehr berührt als das Ende einer Beziehung</h3>
          </div>
          
          <div className="mt-16 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="premium-panel max-w-4xl rounded-[3rem] p-10 md:p-14"
            >
              <div className="space-y-8 text-lg leading-9 text-deepGold/80">
                <p>
                  Manchmal schmerzt eine Trennung nicht nur wegen des Menschen, der gegangen ist. Manchmal öffnet sie etwas Tieferes: alte Verlustgefühle, alte Bindungen, alte Erfahrungen von Alleinsein.
                </p>
                <p>
                  In einer Aufstellung darf sichtbar werden, was wirklich schmerzt. Dadurch entsteht oft mehr Klarheit darüber, was zu dieser Beziehung gehört – und was vielleicht viel älter ist.
                </p>
              </div>
              <div className="mt-12 flex justify-center">
                <CTAButton href={ctaLinks.primary.href}>Jetzt Begleitung anfragen</CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-shell bg-white py-28 text-center text-warmBlack border-t border-gold/10">
        <div className="container max-w-3xl">
          <h2 className="editorial text-4xl md:text-5xl lg:text-7xl">Klarheit für dein Herz.</h2>
          <p className="mt-10 text-xl leading-relaxed text-deepGold/75">
            Du musst deine Beziehung nicht sofort erklären können. Schreib Sibylle dein Anliegen. Gemeinsam schaut ihr, ob eine Aufstellung der richtige nächste Schritt für dich ist.
          </p>
          <div className="mt-14 flex flex-col justify-center gap-5 sm:flex-row">
            <CTAButton href={waLink} className="bg-deepGold !text-white hover:bg-gold">
              Anfrage senden
            </CTAButton>
            <CTAButton href={waLink} variant="secondary" external className="border-gold/20 text-deepGold hover:!bg-gold/10">
              Kostenloses Erstgespräch
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
