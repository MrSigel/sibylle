'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CTAButton } from '@/components/sibylle/CTAButton';
import { ctaLinks, getWhatsAppLink } from '@/lib/sibylle/siteData';

const ease = [0.22, 1, 0.36, 1] as const;

export function FamilienmusterClient() {
  const waLink = getWhatsAppLink("Hallo Sibylle, ich möchte gerne mehr über meine Familienmuster erfahren und wie ich diese systemisch lösen kann.");
  
  return (
    <main className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="grain relative flex min-h-[60svh] items-center overflow-hidden px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-sand/20 blur-[100px]" />
        <div className="absolute -right-24 top-12 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[110px]" />
        
        <div className="container relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease }}
            className="mx-auto max-w-4xl"
          >
            <p className="eyebrow mx-auto">Herkunft & Schicksal</p>
            <h1 className="editorial mt-7 text-[clamp(3.2rem,7vw,7.5rem)] leading-[.88] text-warmBlack">
              Welche <span className="italic text-deepGold">Geschichten</span> wiederholen sich?
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-deepGold/85 md:text-xl md:leading-9">
              Familienmuster wirken oft still im Hintergrund. Erst wenn wir sie sichtbar machen, gewinnen wir die Freiheit, unseren eigenen Weg zu gehen.
            </p>
            
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <CTAButton href={waLink}>Muster erkennen</CTAButton>
              <CTAButton href="/methode" variant="secondary">Zur Methode</CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="section-shell">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
            >
              <h2 className="editorial text-4xl md:text-5xl lg:text-6xl text-warmBlack">Die Kraft der <span className="italic text-gold">Ahnenlinie</span>.</h2>
              <div className="mt-8 space-y-6 text-base leading-8 text-deepGold/85">
                <p>
                  In jedem von uns fließt die Energie unserer Vorfahren. Doch manchmal tragen wir unbewusst Lasten, die gar nicht unsere eigenen sind. Wir wiederholen Schicksale, übernehmen Rollen oder fühlen uns für Dinge verantwortlich, die Generationen vor uns geschehen sind.
                </p>
                <p>
                  Die systemische Aufstellung erlaubt uns, diese Verstrickungen behutsam zu lösen. Es geht nicht darum, die Vergangenheit zu verändern, sondern die eigene Position darin zu klären – in Achtung vor dem, was war, und in Freiheit für das, was kommt.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Wiederkehrende Beziehungskonflikte",
                    "Gefühl von 'nicht dazugehören'",
                    "Ungeklärte Schuldgefühle oder Lasten",
                    "Schwierige Dynamiken zwischen Eltern und Kindern"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-softGold" />
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
                 className="relative h-full w-full overflow-hidden rounded-[3.5rem] border border-gold/15 shadow-2xl"
               >
                 <Image src="/assets/sibylle/portraits/2.jpg" alt="Familienaufstellung und Muster" fill className="object-cover" />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation / Insights Cards */}
      <section className="section-shell bg-white/40">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="editorial text-4xl md:text-5xl">Freiheit in Verantwortung</h2>
            <p className="mt-6 text-deepGold/70 leading-relaxed">Systemische Arbeit ist ein Weg zu dir selbst. Sie hilft dir, deinen richtigen Platz im System einzunehmen.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="premium-panel rounded-[2.5rem] p-10 md:p-14"
            >
              <h3 className="font-serif text-2xl text-warmBlack">Ahnenlinien und Rollen</h3>
              <p className="mt-6 text-base leading-8 text-deepGold/80">
                Wir schauen auf die Rollen, die du in deiner Familie übernommen hast. Warst du das 'brave Kind', der 'Retter' oder vielleicht derjenige, der die Lasten der Eltern getragen hat? Das Erkennen dieser Rollen ist der erste Schritt zur Lösung.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="premium-panel rounded-[2.5rem] p-10 md:p-14"
            >
              <h3 className="font-serif text-2xl text-warmBlack">Stille Dynamiken</h3>
              <p className="mt-6 text-base leading-8 text-deepGold/80">
                Oft wirken Geheimnisse oder ausgeschlossene Familienmitglieder über Generationen hinweg. Die Aufstellung bringt diese Dynamiken ans Licht und ermöglicht eine neue Ordnung, in der jeder seinen Platz hat und die Liebe wieder fließen kann.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ / AEO Section */}
      <section className="section-shell">
        <div className="container max-w-4xl text-center">
          <h2 className="editorial text-4xl md:text-5xl mb-12">Fragen zur Familienaufstellung</h2>
          <div className="space-y-6 text-left">
            {[
              {
                q: "Muss meine Familie bei der Aufstellung dabei sein?",
                a: "Nein, das ist nicht notwendig. Wir arbeiten mit deiner inneren Repräsentation des Systems. Eine Aufstellung kann im Einzelsetting oder mit Stellvertretern durchgeführt werden. Die Veränderung in deiner Wahrnehmung wirkt sich auf das gesamte System aus."
              },
              {
                q: "Was passiert, wenn ich wenig über meine Vorfahren weiß?",
                a: "Das 'wissende Feld' zeigt uns oft Informationen, die über den rein verstandesmäßigen Wissensstand hinausgehen. Es geht mehr um die energetische Wahrheit und die Wirkung im Jetzt als um historische Fakten."
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
          <h2 className="editorial text-4xl md:text-5xl lg:text-7xl">Löse die Fäden der <span className="italic text-softGold">Vergangenheit</span>.</h2>
          <p className="mt-10 text-xl leading-relaxed text-white/75">
            Finde deinen eigenen Platz und beginne, dein Leben nach deinen eigenen Werten zu gestalten.
          </p>
          <div className="mt-14 flex flex-col justify-center gap-5 sm:flex-row">
            <CTAButton href={waLink} className="!bg-softGold !text-deepGold hover:!bg-white">
              Nachricht an Sibylle
            </CTAButton>
            <CTAButton href={ctaLinks.secondary.href} variant="secondary" external className="border-white/20 text-white hover:bg-white/10">
              Erstgespräch vereinbaren
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
