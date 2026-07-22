'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CTAButton } from '@/components/sibylle/CTAButton';
import { getWhatsAppLink, whatsappConfig } from '@/lib/sibylle/siteData';

const ease = [0.22, 1, 0.36, 1] as const;

type FaqItem = { q: string; a: string };

export function BeziehungsmusterClient({ faq = [] }: { faq?: FaqItem[] }) {
  const waLink = getWhatsAppLink(whatsappConfig.messages.beziehungsmuster);
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="grain relative flex min-h-[65svh] items-center overflow-hidden px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-sand/20 blur-[100px]" />
        <div className="absolute -right-24 top-12 h-[30rem] w-[30rem] rounded-full bg-softGold/10 blur-[110px]" />
        
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease }}
            >
              <p className="eyebrow mx-auto">Wenn Liebe sich wiederholt</p>
              <h1 className="editorial mt-7 text-[clamp(2.6rem,6vw,6.4rem)] leading-[.9] text-warmBlack">
                Beziehungsmuster erkennen – <span className="italic text-deepGold">warum passiert mir das immer wieder?</span>
              </h1>
              <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-deepGold/85 md:text-xl md:leading-9">
                Du gibst viel, hoffst auf echte Nähe – und landest doch immer wieder in ähnlichen Dynamiken. Vielleicht wiederholen sich Konflikte, Rückzug, Bindungsangst oder das Gefühl, nicht wirklich gesehen zu werden.
              </p>
              
              <div className="mt-10 rounded-[2rem] bg-white/30 p-8 text-base leading-8 text-deepGold/80">
                In einer Systemaufstellung mit Sibylle Jutta Bergold geht es nicht darum, Schuld bei dir oder deinem Partner zu suchen. Es geht darum, sichtbar zu machen, welche tieferen Muster im Hintergrund wirken – und warum sie sich in Beziehungen immer wieder zeigen.
              </div>

              <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
                <CTAButton href={waLink}>Jetzt persönlich bei Sibylle melden</CTAButton>
                <CTAButton href={waLink} variant="secondary" external>Termin für erste Session</CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Abschnitt 1: Wiederkehrende Muster */}
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
              <h2 className="editorial mt-6 text-4xl md:text-5xl lg:text-6xl">Wiederkehrende Beziehungsmuster erkennen</h2>
              <h3 className="mt-6 font-serif text-2xl italic text-deepGold/70">Wenn Liebe sich wiederholt – aber nicht erfüllt</h3>
              <div className="mt-8 space-y-6 text-base leading-8 text-deepGold/85">
                <p>
                  Manche Menschen erleben in Beziehungen immer wieder ähnliche Situationen: Sie ziehen sich zurück, sobald Nähe entsteht. Sie geben zu viel. Sie geraten an Menschen, die nicht wirklich verfügbar sind.
                </p>
                <p>
                  Oder sie spüren nach einer Trennung, dass sich derselbe Schmerz schon von früher wiederholt. Solche Muster entstehen oft nicht zufällig. Häufig tragen sie eine Geschichte in sich, die älter ist als die aktuelle Beziehung.
                </p>
              </div>
            </motion.div>
            <div className="relative aspect-square lg:aspect-[4/5]">
               <div className="absolute inset-0 rounded-[3rem] bg-white/40 blur-3xl" />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="relative h-full w-full overflow-hidden rounded-[3.5rem] border border-gold/10 shadow-xl"
               >
                 <Image src="/assets/sibylle/portraits/3.jpg" alt="Beziehungsmuster verstehen" fill className="object-cover" />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Abschnitt 2: Ursprung */}
      <section className="section-shell bg-white/20 overflow-hidden">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-[.45fr_1fr]">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="eyebrow">Abschnitt 2</p>
              <h2 className="editorial mt-6 text-4xl md:text-5xl">Ursprung nicht im aktuellen Partner</h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="premium-panel rounded-[3rem] p-10 md:p-14"
            >
              <h3 className="font-serif text-3xl text-deepGold">Vielleicht geht es nicht nur um diese eine Beziehung</h3>
              <div className="mt-8 space-y-7 text-lg leading-9 text-deepGold/80">
                <p>
                  Wenn ein Beziehungsmuster sich wiederholt, liegt die Ursache oft nicht allein im aktuellen Partner oder in der aktuellen Situation. In der Aufstellungsarbeit zeigt sich manchmal, dass alte Loyalitäten, Erfahrungen aus der Herkunftsfamilie oder übernommene Dynamiken bis heute wirken.
                </p>
                <div className="rounded-2xl bg-white/50 p-8 shadow-sm">
                   <p className="font-semibold text-deepGold italic">Das bedeutet nicht, dass du „falsch“ bist. Es bedeutet, dass etwas gesehen werden möchte, das bisher im Hintergrund geblieben ist.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beziehungsmuster erkennen & verstehen */}
      <section className="section-shell overflow-hidden bg-white/30">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mx-auto">Selbstreflexion</p>
            <h2 className="editorial mt-6 text-4xl md:text-5xl lg:text-6xl">Beziehungsmuster erkennen</h2>
            <h3 className="mt-6 font-serif text-2xl italic text-deepGold/70">Woran du sie im Alltag bemerkst</h3>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-deepGold/85">
              Ein Beziehungsmuster zeigt sich selten als einzelnes Ereignis, sondern als Wiederholung. Diese Anzeichen helfen dir, dein eigenes Muster zu erkennen und besser zu verstehen.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Der immer gleiche Streit", desc: "Konflikte drehen sich – unabhängig vom Gegenüber – immer wieder um dasselbe Thema." },
              { title: "Rückzug, sobald Nähe entsteht", desc: "Wird es verbindlich, meldet sich der Impuls, Abstand zu schaffen." },
              { title: "Ähnliche Partnerwahl", desc: "Du landest wiederholt bei Menschen mit vergleichbarer Prägung oder Verfügbarkeit." },
              { title: "Zu viel Verantwortung", desc: "Du fühlst dich für das Wohlbefinden des anderen zuständig – bis zur eigenen Erschöpfung." },
              { title: "Angst vor Verlust", desc: "Schon kleine Distanz löst starke innere Unruhe oder Kontrollimpulse aus." },
              { title: "Ein vertrautes Gefühl", desc: "Der Schmerz wirkt seltsam bekannt – als hättest du ihn schon viel früher erlebt." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.7, ease }}
                className="premium-panel rounded-[2rem] p-8"
              >
                <span className="editorial text-3xl text-softGold/40">0{index + 1}</span>
                <h4 className="mt-5 font-serif text-xl text-deepGold">{item.title}</h4>
                <p className="mt-4 text-[.95rem] leading-7 text-deepGold/75">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-14 max-w-3xl rounded-[2.5rem] bg-white/50 p-10 text-center shadow-sm md:p-12"
          >
            <p className="text-lg leading-9 text-deepGold/85">
              Wer sein Beziehungsmuster wirklich <span className="font-semibold">verstehen</span> möchte, kommt mit Nachdenken allein oft nicht weiter. In der systemischen Aufstellung wird sichtbar, <span className="font-semibold">woher</span> das Muster stammt – und genau dort kann es sich lösen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Abschnitt 3: Wie Aufstellung helfen kann */}
      <section className="section-shell overflow-hidden">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
             <p className="eyebrow mx-auto">Abschnitt 3</p>
             <h2 className="editorial mt-6 text-4xl md:text-5xl lg:text-6xl">Wie Aufstellung helfen kann</h2>
             <h3 className="mt-6 font-serif text-2xl italic text-deepGold/70">Was sichtbar wird, kann sich verändern</h3>
          </div>
          
          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <p className="text-lg leading-9 text-deepGold/85">
                In einer Systemaufstellung wird dein inneres oder familiäres Beziehungssystem sichtbar gemacht. Dadurch kann erkennbar werden, warum bestimmte Dynamiken immer wieder entstehen:
              </p>
              <ul className="grid gap-4">
                {[
                  "Nähe und Rückzug",
                  "Angst vor Verlassenwerden",
                  "Schuldgefühle",
                  "Verlust des Selbst in Beziehungen"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 rounded-2xl bg-white/20 p-5 text-[.95rem] font-bold text-deepGold">
                    <span className="h-2 w-2 rounded-full bg-softGold" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="premium-panel rounded-[2.5rem] p-10 lg:p-14"
            >
              <p className="text-base leading-8 text-deepGold/80">
                Sibylle schafft dafür einen ruhigen, geschützten Raum. Nicht über Druck. Nicht über schnelle Versprechen. Sondern über einen klaren Blick auf das, was unter der Oberfläche wirkt.
              </p>
              <div className="mt-10">
                <CTAButton href={waLink} variant="secondary" external className="w-full">Jetzt Termin für erste Session</CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ – targets "beziehungsmuster erkennen / verstehen" search queries */}
      {faq.length > 0 && (
        <section className="section-shell overflow-hidden bg-white/30">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mx-auto">Häufige Fragen</p>
              <h2 className="editorial mt-6 text-4xl md:text-5xl lg:text-6xl">Beziehungsmuster erkennen &amp; verstehen</h2>
              <h3 className="mt-6 font-serif text-2xl italic text-deepGold/70">Antworten auf die häufigsten Fragen</h3>
            </div>

            <div className="mx-auto mt-14 max-w-3xl space-y-5">
              {faq.map((item, index) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.6, ease }}
                  className="premium-panel rounded-[2rem] p-8 md:p-10"
                >
                  <h4 className="font-serif text-xl text-deepGold md:text-2xl">{item.q}</h4>
                  <p className="mt-4 text-[.98rem] leading-8 text-deepGold/80">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="section-shell bg-white py-28 text-center text-warmBlack border-t border-gold/10">
        <div className="container max-w-3xl">
          <h2 className="editorial text-4xl md:text-5xl lg:text-6xl">Wenn du dein Muster wirklich ansehen möchtest...</h2>
          <p className="mt-10 text-xl leading-relaxed text-deepGold/75">
            Der erste Schritt muss nicht groß sein. Oft reicht ein ehrliches Gespräch, um zu spüren, ob dieser Weg für dich passt. Schreib Sibylle dein Anliegen.
          </p>
          <div className="mt-14 flex flex-col justify-center gap-5 sm:flex-row">
            <CTAButton href={waLink} className="!bg-deepGold !text-white hover:!bg-gold">
              Nachricht schreiben
            </CTAButton>
            <CTAButton href={waLink} variant="secondary" external className="!border-gold/20 !text-deepGold hover:!bg-gold/10">
              Gespräch vereinbaren
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
