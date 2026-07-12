'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CTAButton } from '@/components/sibylle/CTAButton';
import { ctaLinks, getWhatsAppLink } from '@/lib/sibylle/siteData';

const ease = [0.22, 1, 0.36, 1] as const;

export function InneresKindClient() {
  const waLink = getWhatsAppLink("Hallo Sibylle, ich möchte gerne mit meinem inneren Kind im systemischen Kontext arbeiten.");
  
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
            <p className="eyebrow mx-auto">Emotionale Reife & Heilung</p>
            <h1 className="editorial mt-7 text-[clamp(3.2rem,7vw,7.5rem)] leading-[.88] text-warmBlack">
              Dem <span className="italic text-deepGold">inneren Kind</span> Raum geben.
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-deepGold/85 md:text-xl md:leading-9">
              Viele unserer heutigen Reaktionen stammen aus der Kindheit. In der systemischen Arbeit begegnen wir dem inneren Kind dort, wo es Halt und Sicherheit braucht.
            </p>
            
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <CTAButton href={waLink}>Inneres Kind begleiten</CTAButton>
              <CTAButton href={ctaLinks.secondary.href} variant="secondary" external>Termin für erste Session</CTAButton>
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
              <h2 className="editorial text-4xl md:text-5xl lg:text-6xl">Systemische Kindheitsarbeit</h2>
              <div className="mt-8 space-y-6 text-base leading-8 text-deepGold/85">
                <p>
                  Das 'Innere Kind' ist ein Symbol für die Gefühle, Erinnerungen und Prägungen aus unserer Kindheit. Wenn diese Anteile heute noch unbewusst das Steuer übernehmen, reagieren wir oft emotionaler, als es der Situation angemessen wäre.
                </p>
                <p>
                  In der systemischen Aufstellung schauen wir darauf, was das Kind damals gebraucht hätte und wer im System ihm diesen Halt geben kann. Es geht darum, dass du heute als Erwachsene den Platz einnimmst, an dem du gut für dich sorgen kannst.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Übermäßige Angst vor Ablehnung",
                    "Schwierigkeiten, Grenzen zu setzen",
                    "Gefühl von emotionaler Abhängigkeit",
                    "Selbstzweifel und mangelnder Selbstwert"
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
                 <Image src="/assets/sibylle/portraits/2.jpg" alt="Arbeit mit dem inneren Kind" fill className="object-cover" />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-shell bg-white/40">
        <div className="container max-w-4xl text-center">
          <h2 className="editorial text-4xl md:text-5xl mb-12">Häufige Fragen</h2>
          <div className="space-y-6 text-left">
            {[
              {
                q: "Ist das Therapie?",
                a: "Nein. Meine Arbeit ist Coaching und Selbsterfahrung. Wir arbeiten lösungsorientiert im Hier und Jetzt, um deine Handlungsfähigkeit als Erwachsene zu stärken."
              },
              {
                q: "Wie unterscheidet sich die systemische Arbeit von anderen Methoden?",
                a: "Wir schauen nicht nur auf das Kind allein, sondern auf das gesamte Familiensystem. Oft entlastet es das Kind, wenn die Eltern oder Ahnen ihren Platz einnehmen."
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
          <h2 className="editorial text-4xl md:text-5xl lg:text-7xl">Werde dein eigener <span className="italic text-gold">Halt</span>.</h2>
          <p className="mt-10 text-xl leading-relaxed text-deepGold/75">
            Heile die alten Wunden und finde zu einer neuen emotionalen Freiheit in deinem Leben.
          </p>
          <div className="mt-14 flex flex-col justify-center gap-5 sm:flex-row">
            <CTAButton href={waLink} className="!bg-deepGold !text-white hover:!bg-gold">
              Sibylle schreiben
            </CTAButton>
            <CTAButton href={ctaLinks.secondary.href} variant="secondary" external>
              Termin für erste Session
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
