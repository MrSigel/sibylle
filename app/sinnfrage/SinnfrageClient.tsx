'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CTAButton } from '@/components/sibylle/CTAButton';
import { ctaLinks, getWhatsAppLink } from '@/lib/sibylle/siteData';

const ease = [0.22, 1, 0.36, 1] as const;

export function SinnfrageClient() {
  const waLink = getWhatsAppLink("Hallo Sibylle, ich beschäftige mich gerade mit Sinnfragen in meinem Leben und möchte schauen, wie eine systemische Aufstellung mir helfen kann.");
  
  return (
    <main className="overflow-hidden bg-white">
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
            <p className="eyebrow mx-auto">Orientierung & Essenz</p>
            <h1 className="editorial mt-7 text-[clamp(3.2rem,7vw,7.5rem)] leading-[.88] text-warmBlack">
              Dein Leben als <span className="italic text-deepGold">Antwort.</span>
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-deepGold/85 md:text-xl md:leading-9">
              Sinnfragen zeigen sich oft als innere Leere oder unerfüllte Sehnsucht. Systemische Arbeit hilft dir, den eigenen Platz zu klären und deinen Weg stimmig zu gestalten.
            </p>
            
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <CTAButton href={waLink}>Sinnweg klären</CTAButton>
              <CTAButton href={ctaLinks.secondary.href} variant="secondary" external>Termin für erste Session</CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="section-shell">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1 relative aspect-square lg:aspect-[4/5]">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="relative h-full w-full overflow-hidden rounded-[3.5rem] border border-gold/15 shadow-2xl"
               >
                 <Image src="/assets/sibylle/portraits/1.jpg" alt="Sinnsuche und Orientierung" fill className="object-cover" />
               </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="editorial text-4xl md:text-5xl lg:text-6xl text-warmBlack">Stille <span className="italic text-gold">Transformation</span>.</h2>
              <div className="mt-8 space-y-6 text-base leading-8 text-deepGold/85">
                <p>
                  Wir leben in einer Welt voller Möglichkeiten, doch oft fühlen wir uns innerlich leer. Wir fragen uns: „War das schon alles?“ oder „Was ist meine eigentliche Aufgabe?“. Diese Fragen sind kostbare Wegweiser zu unserem wahren Kern.
                </p>
                <p>
                  Ohne Druck schauen wir in der systemischen Arbeit auf die Muster, die deine Lebensenergie blockieren. Es geht nicht um schnelle, rationale Antworten, sondern um eine echte Übereinstimmung mit deinem Wesen. Wenn du deinen Platz im System findest, kehrt die Energie zurück.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Gefühl von Stillstand oder Leere",
                    "Suche nach beruflicher oder privater Neuausrichtung",
                    "Wunsch nach mehr Lebendigkeit und Tiefe",
                    "Klärung der eigenen Identität und Werte"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-medium">
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

      {/* Quote / Highlight Section */}
      <section className="section-shell bg-sand/10">
        <div className="container text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="premium-panel rounded-[3rem] p-12 md:p-20"
          >
            <p className="font-serif text-3xl md:text-4xl italic text-deepGold leading-relaxed">
              „Der Sinn des Lebens besteht nicht darin, sich selbst zu finden, sondern sich selbst zu erschaffen – aus der Kraft der eigenen Wurzeln.“
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ / AEO Section */}
      <section className="section-shell">
        <div className="container max-w-4xl text-center">
          <h2 className="editorial text-4xl md:text-5xl mb-12">Fragen zur Sinnfindung</h2>
          <div className="space-y-6 text-left">
            {[
              {
                q: "Kann eine Aufstellung wirklich meinen Lebenssinn klären?",
                a: "Eine Aufstellung ist kein Orakel, das dir einen Beruf diktiert. Aber sie kann die unbewussten Loyalitäten oder Blockaden sichtbar machen, die dich daran hindern, deine Potenziale zu leben. Wenn diese Hindernisse weichen, wird dein Weg meist ganz von selbst klar."
              },
              {
                q: "Muss ich eine Krise haben, um zu kommen?",
                a: "Nein. Oft kommen Menschen zu mir, denen es 'eigentlich gut geht', die aber spüren, dass da noch mehr ist. Ein tiefes Ja zum Leben braucht keine vorherige Katastrophe, sondern nur den Mut, hinzuschauen."
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

      {/* WhatsApp CTA */}
      <section className="section-shell bg-deepGold py-28 text-center text-white">
        <div className="container max-w-3xl">
          <h2 className="editorial text-4xl md:text-5xl lg:text-7xl">Finde deine <span className="italic text-softGold">Stimmigkeit</span>.</h2>
          <p className="mt-10 text-xl leading-relaxed text-white/75">
            Lass uns gemeinsam schauen, was deiner Lebensfreude im Weg steht.
          </p>
          <div className="mt-14 flex flex-col justify-center gap-5 sm:flex-row">
            <CTAButton href={waLink} className="!bg-softGold !text-deepGold hover:!bg-white">
              Sibylle schreiben
            </CTAButton>
            <CTAButton href={ctaLinks.secondary.href} variant="secondary" external className="border-white/20 text-white hover:bg-white/10">
              Termin für erste Session
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
