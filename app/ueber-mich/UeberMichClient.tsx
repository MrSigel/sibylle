'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CTAButton } from '@/components/sibylle/CTAButton';
import { getWhatsAppLink, whatsappConfig } from '@/lib/sibylle/siteData';

const ease = [0.22, 1, 0.36, 1] as const;

export function UeberMichClient() {
  const waLink = getWhatsAppLink(whatsappConfig.messages.erstgespraech);
  const ausbildungen = [
    { year: "2018", title: "Einweihungen & Meisterschaft", desc: "Ki Mann Heiler, Crystal Matrix, Drachenstimme, Ägyptische RaSheeba Meisterin, Curandera intensiv." },
    { year: "2017", title: "Naturheilpraxis & Quantenheilung", desc: "Freie Mitarbeiterin Naturheilpraxis Bradel, Ausbildung BE ONE Matrix Quantum durch Balian Buschbaum." },
    { year: "2016", title: "Einhandrutenkurs", desc: "Fachliche Weiterbildung bei Karin M.K. Wolf." },
    { year: "2014", title: "Verbandsgründung", desc: "Gründung des Deutschen Verbandes für Systemaufstellung – Finanzvorstand." },
    { year: "2011", title: "Eigene Praxis", desc: "Eröffnung der eigenen Praxis für systemische Arbeit in Aschaffenburg." },
    { year: "2009 - 2011", title: "Systemische Ausbildung", desc: "Ausbildung zum Organisations- und Systemaufsteller (Dr. Friedrich Assländer) & Systemaufstellerin (Bärbel Rosenmayer)." },
    { year: "2010", title: "Hypnose", desc: "Hypnoseausbildung in der Hypnoseschule Augsburg." },
    { year: "2009", title: "Heilerausbildung", desc: "Umfassende Heilerausbildung durch Paola Bätge." },
  ];

  const schwerpunkte = [
    "Ausbildungen",
    "Private oder berufliche Anliegen",
    "Auflösen von Familienthematiken",
    "Bewältigung von Angst und Panikattacken",
    "Körperliche oder seelische Anliegen",
    "Ursachenlösung statt Symptombehandlung",
    "Auflösen von energetischen Blockaden",
    "Matrix Quantum - Quantenheilung",
    "Potentialentfaltung"
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="grain relative overflow-hidden px-4 pb-20 pt-12 md:pb-28 md:pt-20">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-sand/20 blur-[100px]" />
        <div className="absolute -right-24 top-12 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[110px]" />
        
        <div className="container relative z-10">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              <p className="eyebrow">Mentorin & Coach</p>
              <h1 className="editorial mt-7 text-[clamp(3.2rem,6vw,6.5rem)] leading-[.92] text-warmBlack">
                Sibylle Bergold – <span className="italic text-deepGold">Erfahrung</span> und Intuition.
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-deepGold/85 md:text-lg">
                Als Inhaberin der Deutschen Akademie für Systemaufstellungen begleite ich Menschen dabei, versteckte Dynamiken sichtbar zu machen und Potenziale zu entfalten.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CTAButton href={waLink}>Kontakt aufnehmen</CTAButton>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, ease }}
              className="relative mx-auto w-full max-w-[480px] lg:mx-0"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3.5rem] border border-gold/15 shadow-[0_35px_100px_rgba(35,42,26,.12)]">
                <Image 
                  src="/assets/sibylle/portraits/cho.png" 
                  alt="Sibylle Bergold" 
                  fill 
                  priority 
                  sizes="(min-width: 1024px) 480px, 90vw" 
                  className="object-cover" 
                />
              </div>
              <div className="absolute -bottom-6 -left-6 flex h-28 w-28 items-center justify-center rounded-full bg-softGold shadow-soft">
                <Image src="/assets/sibylle/brand/monogram-cream.png" alt="" width={618} height={799} className="h-20 w-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Text Section */}
      <section className="section-shell overflow-hidden">
        <div className="container relative">
          <div className="grid gap-16 lg:grid-cols-[1fr_.8fr]">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="editorial text-[clamp(2.6rem,4.5vw,4.8rem)] leading-[1.05]">
                Mein Weg zur <span className="italic text-deepGold">Systemik</span>.
              </h2>
              <div className="mt-10 space-y-7 text-base leading-8 text-deepGold/85">
                <p>
                  Als ehemalige Bankkauffrau bin ich heute Inhaberin der Deutschen Akademie für Systemaufstellungen in Aschaffenburg und gleichzeitig Gründerin des Internationalen Verbandes für Systemaufstellungen und Energiearbeit e.V.
                </p>
                <p>
                  Meine Leidenschaft liegt in meiner Tätigkeit als Mentorin, da ich davon überzeugt bin, dass die Ausbildung alle Prozessschritte bietet, die Teilnehmende brauchen, um sich über ihren Ursprung und ihre Potenziale bewusst zu werden. Hier erfolgt die größte Veränderung – professionell begleitet.
                </p>
                <p>
                  Ebenso leite ich Workshops und Seminare über die modernen und effektiven Methoden der Aufstellungsarbeit. Es ist meine Stärke, versteckte Dynamiken und Unbewusstes sichtbar zu machen.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
              className="premium-panel rounded-[2.5rem] p-8 md:p-12"
            >
              <h3 className="font-serif text-2xl text-deepGold">Für wen ist Aufstellungsarbeit geeignet?</h3>
              <p className="mt-5 text-sm leading-7 text-deepGold/70">
                Du möchtest dich persönlich weiterentwickeln? Aufstellungsarbeit bietet Raum für:
              </p>
              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {["Einzelpersonen", "Führungskräfte", "Familien", "Kinder", "Paare", "Geschwister", "Geschäftspartner"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-deepGold/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-softGold" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs italic text-deepGold/60">...alles ist denkbar und möglich.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schwerpunkte */}
      <section className="section-shell bg-white/30">
        <div className="container text-center">
          <p className="eyebrow mx-auto">Expertise</p>
          <h2 className="editorial mt-6 text-[clamp(2.4rem,4vw,4.2rem)]">Meine Schwerpunkte</h2>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {schwerpunkte.map((item, index) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 rounded-2xl bg-white/60 p-6 text-left shadow-sm backdrop-blur-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-softGold/10 text-xs font-bold text-softGold">
                  {index + 1}
                </span>
                <span className="text-[.95rem] font-semibold text-deepGold">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-shell overflow-hidden">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-[.4fr_1fr]">
            <div>
              <p className="eyebrow">Werdegang</p>
              <h2 className="editorial mt-6 text-5xl leading-tight">Ausbildungen & Stationen</h2>
            </div>
            <div className="space-y-12">
              {ausbildungen.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative grid gap-4 border-l border-gold/20 pl-8 md:grid-cols-[140px_1fr]"
                >
                  <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-softGold" />
                  <span className="font-serif text-xl font-medium text-softGold">{item.year}</span>
                  <div>
                    <h3 className="text-xl font-bold text-deepGold">{item.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-deepGold/75">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-shell bg-deepGold py-24 text-center text-white">
        <div className="container max-w-3xl">
          <h2 className="editorial text-4xl md:text-5xl lg:text-6xl">Bereit für den ersten Schritt?</h2>
          <p className="mt-8 text-lg text-white/70">
            Lass uns gemeinsam schauen, was in deinem System gesehen werden möchte.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <CTAButton href={waLink} className="bg-softGold text-deepGold hover:bg-white">
              Nachricht schreiben
            </CTAButton>
            <CTAButton href={waLink} variant="secondary" external className="border-white/20 text-white hover:bg-white/10">
              Erstgespräch buchen
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
