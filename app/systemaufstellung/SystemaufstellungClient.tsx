'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { CTAButton } from '@/components/sibylle/CTAButton';
import { ctaLinks, getWhatsAppLink, whatsappConfig } from '@/lib/sibylle/siteData';

const ease = [0.22, 1, 0.36, 1] as const;

type SystemType = {
  title: string;
  label: string;
  desc: string;
  video: string;
};

function VideoCard({ system, idx }: { system: SystemType; idx: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function handlePlay() {
    setStarted(true);
    videoRef.current?.play();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.2, duration: 1, ease }}
      className="group flex flex-col"
    >
      <div className="mb-8 flex flex-col rounded-[2.8rem] border border-gold/10 bg-white p-10 shadow-[0_20px_60px_rgba(35,42,26,0.04)] transition-all duration-500 group-hover:border-softGold/40 group-hover:shadow-xl group-hover:-translate-y-2">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-2 w-2 rounded-full bg-softGold" />
          <span className="text-xs font-bold uppercase tracking-[.2em] text-softGold">{system.label}</span>
        </div>
        <h3 className="editorial text-4xl text-deepGold">{system.title}</h3>
        <p className="mt-6 text-[1.05rem] leading-relaxed text-deepGold/70">{system.desc}</p>
      </div>

      <div className="relative overflow-hidden rounded-[2.8rem] bg-deepGold shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[360px] bg-deepGold">
          <video
            ref={videoRef}
            src={system.video}
            controls={started}
            playsInline
            preload="metadata"
            onPlay={() => setStarted(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {!started && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label={`${system.title} Video abspielen`}
              className="group/play absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-softGold/60 via-gold/45 to-deepGold/70 backdrop-blur-[2px] transition-all duration-500 hover:from-softGold/70 hover:to-deepGold/60"
            >
              {/* Soft golden sheen for a translucent, premium look */}
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.28),transparent_60%)]" />
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-white/20 shadow-2xl backdrop-blur-md"
              >
                <span className="ml-2 h-0 w-0 border-y-[15px] border-y-transparent border-l-[25px] border-l-white" />
                <motion.span
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full bg-white/40"
                />
              </motion.span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function SystemaufstellungClient() {
  const waLink = getWhatsAppLink(whatsappConfig.messages.erstgespraech);
  const systemTypes = [
    {
      title: "Familiensystem",
      label: "Familienaufstellung",
      desc: "Lösung von Verstrickungen innerhalb der Herkunfts- oder Gegenwartsfamilie.",
      video: "/assets/sibylle/videos/Familiensystem.mp4"
    },
    {
      title: "Organisationssystem",
      label: "Organisationsaufstellung",
      desc: "Klärung von Dynamiken in Unternehmen, Teams oder beruflichen Kontexten.",
      video: "/assets/sibylle/videos/Organisation.mp4"
    },
    {
      title: "Abstrahiertes System",
      label: "Strukturaufstellung",
      desc: "Arbeit mit abstrakten Elementen wie Zielen, Hindernissen oder inneren Anteilen.",
      video: "/assets/sibylle/videos/Systemaufstellung.mp4"
    }
  ];

  const systemMembers = [
    { title: "Geschwister", desc: "Alle, auch verstorben oder abgetrieben" },
    { title: "Eltern & Geschwister", desc: "Die Herkunftslinie und deren Geschwister" },
    { title: "Großeltern", desc: "Wichtige Wurzeln beider Elternteile" },
    { title: "Urgroßeltern", desc: "Noch lebend oder prägend für das Feld" },
    { title: "Platzhalter", desc: "Personen, die für Familienmitglieder Platz machten" },
    { title: "Frühere Partner", desc: "Ehemalige Bindungen der Eltern oder Großeltern" }
  ];

  return (
    <main>
      {/* Clean Hero Section without Image */}
      <section className="grain relative flex min-h-[75svh] items-center overflow-hidden px-4 pb-20 pt-24 md:pb-32 md:pt-36">
        <div className="absolute -left-32 -top-20 h-[45rem] w-[45rem] rounded-full bg-sand/20 blur-[130px]" />
        <div className="absolute -right-24 top-0 h-[35rem] w-[35rem] rounded-full bg-softGold/10 blur-[110px]" />
        
        <div className="container relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease }}
            className="mx-auto max-w-5xl"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="eyebrow mx-auto"
            >
              Tiefe · Ordnung · Klarheit
            </motion.p>
            <h1 className="editorial mt-8 text-[clamp(3.8rem,9vw,9.5rem)] leading-[.82] text-warmBlack">
              Den unsichtbaren <br/>
              <span className="italic text-deepGold">Raum</span> lesen.
            </h1>
            <p className="mx-auto mt-12 max-w-2xl text-lg leading-relaxed text-deepGold/85 md:text-2xl md:leading-relaxed">
              Systemaufstellung macht Dynamiken im Raum sichtbar, die Worte oft nicht erreichen. Ein behutsamer Prozess, um Verstrickungen zu lösen und Kraft aus den Wurzeln zu schöpfen.
            </p>
            <div className="mt-16 flex flex-col justify-center gap-6 sm:flex-row">
              <CTAButton href={waLink} className="px-10 py-5 text-lg">Termin anfragen</CTAButton>
              <CTAButton href={waLink} variant="secondary" external className="px-10 py-5 text-lg">Erstgespräch buchen</CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Side-by-Side Windows & Videos */}
      <section className="section-shell bg-white/40">
        <div className="container">
          <div className="mb-24 flex flex-col items-center text-center">
            <p className="eyebrow mb-6">Anwendungsfelder</p>
            <h2 className="editorial text-5xl md:text-7xl">Arten der Aufstellung</h2>
            <p className="mt-8 max-w-2xl text-xl text-deepGold/70 leading-relaxed">
              Jedes System folgt eigenen Gesetzen. Wir wählen den Rahmen, der dein Anliegen am besten hält.
            </p>
          </div>
          
          <div className="grid gap-10 lg:grid-cols-3">
            {systemTypes.map((system, idx) => (
              <VideoCard key={system.title} system={system} idx={idx} />
            ))}
          </div>
          
          <div className="mt-20 flex flex-col items-center gap-6 rounded-[3rem] bg-white/30 p-10 text-center">
            <p className="font-serif text-2xl text-deepGold italic">„Muster lassen sich sehen, ohne sie zu bewerten.“</p>
            <CTAButton href={waLink} variant="secondary" external>Direkt Erstgespräch vereinbaren</CTAButton>
          </div>
        </div>
      </section>

      {/* Deep Content Section */}
      <section className="section-shell bg-white/40">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="editorial text-4xl md:text-5xl lg:text-6xl">Bedeutung der Aufstellungsarbeit</h2>
            <p className="mt-10 text-lg leading-9 text-deepGold/85 md:text-xl">
              Aufstellungen sind eine Art Selbsterfahrung, um Einsichten und Lösungsmöglichkeiten zu gewinnen, die bisher unzugänglich waren. Es werden Zusammenhänge und Verstrickungen aufgezeigt, die oft über viele Generationen zurückliegen.
            </p>
          </div>

          <div className="mt-24 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Das „Wissende Feld“", desc: "Arbeitsmittel ist die Wahrnehmung. Stellvertreter können gefühlsmäßig erfassen, wie die aufgestellten Personen zueinander stehen – ein altes Menschheitswissen." },
              { title: "Systemische Ordnung", desc: "Wird die Ordnung in Familien oder Systemen verletzt, entsteht oft Unruhe. Die Aufstellung hilft, diese Ordnung wiederherzustellen." },
              { title: "Vielseitigkeit", desc: "Es gibt fast nichts, was nicht aufgestellt werden kann: Personen, Objekte, Abteilungen, Krankheiten, Projekte oder sogar Haustiere." }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="premium-panel group rounded-[2.5rem] p-10 hover:border-softGold/20">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-softGold/10 text-xl font-serif text-softGold">0{i+1}</div>
                <h3 className="text-2xl font-bold text-deepGold">{item.title}</h3>
                <p className="mt-5 text-base leading-8 text-deepGold/75">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Adjusted Morphogenetisches Feld */}
      <section className="section-shell overflow-hidden bg-white/20">
        <div className="container">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col justify-center">
              <p className="eyebrow">Hintergrund</p>
              <h2 className="editorial mt-8 text-5xl md:text-7xl">Die digitale Cloud der <span className="italic text-deepGold">Seele</span>.</h2>
              <p className="mt-8 text-lg leading-[1.8] text-deepGold/85">
                Das morphogenetische Feld funktioniert ähnlich wie eine Cloud: Es ist ein Informationsspeicher, der jedes Lebewesen umgibt. Hier sind alle Erfahrungen und Ereignisse einer Person und ihrer Umgebung gespeichert.
              </p>
              <div className="mt-10 rounded-[2.5rem] border-l-4 border-softGold bg-white/40 p-10 italic text-deepGold/80 shadow-sm">
                „Ähnlich wie wir in Suchmaschinen Worte eingeben, sind Stellvertretende in der Lage, alle Informationen zu bekommen, die zur Lösung dienlich sind.“
              </div>
              <div className="mt-12">
                <CTAButton href={ctaLinks.primary.href} variant="ghost" className="!pl-0 hover:!pl-4 transition-all">Mehr zur Theorie erfahren</CTAButton>
              </div>
            </motion.div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[30rem] w-[30rem] animate-pulse rounded-full bg-softGold/10 blur-[100px]" />
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 grid grid-cols-2 gap-4"
              >
                {["Erfahrungen", "Ahnen", "Gefühle", "Werte", "Muster", "Zukunft"].map((item) => (
                  <div key={item} className="flex aspect-square items-center justify-center rounded-[2.5rem] border border-gold/10 bg-white/60 p-6 text-center text-[1.05rem] font-bold text-deepGold backdrop-blur-md shadow-[0_10px_30px_rgba(35,42,26,0.03)] transition-all duration-500 hover:-translate-y-2 hover:border-softGold/30 hover:bg-white">
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned System-Mitglieder Section */}
      <section className="section-shell bg-white py-32 text-warmBlack border-t border-gold/10">
        <div className="container">
          <div className="mb-24 text-center">
            <p className="eyebrow mb-6">Ordnung schaffen</p>
            <h2 className="editorial text-5xl md:text-8xl">Das System</h2>
            <p className="mt-8 text-xl text-deepGold/70 max-w-2xl mx-auto leading-relaxed">Wer gehört zum Gegenwartssystem? Jedes Mitglied kann unbewusst Einfluss auf dein heutiges Erleben haben.</p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {systemMembers.map((member, i) => (
              <motion.div 
                key={member.title} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ y: -12, backgroundColor: "rgba(255,255,255,0.8)" }}
                className="group relative overflow-hidden rounded-[3rem] border border-gold/15 bg-white p-10 shadow-[0_15px_45px_rgba(132,103,51,0.04)] transition-all duration-500"
              >
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-softGold/10 text-softGold group-hover:bg-softGold group-hover:text-white transition-colors duration-500">
                  <span className="editorial text-2xl">0{i+1}</span>
                </div>
                <h3 className="editorial text-3xl text-warmBlack">{member.title}</h3>
                <p className="mt-5 text-[1.05rem] leading-relaxed text-deepGold/60 transition-colors duration-500 group-hover:text-deepGold/90">{member.desc}</p>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-softGold/5 to-transparent transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

          <div className="mt-28 flex flex-col items-center justify-center border-t border-gold/15 pt-20">
            <h3 className="editorial text-4xl text-center mb-12">Bist du bereit, dein System zu ordnen?</h3>
            <CTAButton href={waLink} className="bg-deepGold !text-white hover:bg-gold px-12 py-5 text-lg">
              Jetzt persönlichen Termin anfragen
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Final Closing */}
      <section className="section-shell text-center">
        <div className="container max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mb-14 inline-block"
          >
             <div className="absolute inset-0 -rotate-2 rounded-2xl bg-softGold/15" />
             <div className="absolute inset-0 rotate-1 rounded-2xl border border-softGold/25" />
             <p className="relative z-10 px-8 py-3 font-serif text-xl italic text-softGold md:text-2xl">Bereit für Klarheit?</p>
          </motion.div>
          <h2 className="editorial text-4xl md:text-5xl lg:text-7xl">Erlebe die Wirkung selbst.</h2>
          <p className="mx-auto mt-10 max-w-2xl text-xl leading-relaxed text-deepGold/75">
            Theorie ist das eine – die Erfahrung im Feld das andere. Lass uns gemeinsam schauen, was dein System heute braucht.
          </p>
          <div className="mt-14 flex flex-col justify-center gap-5 sm:flex-row">
            <CTAButton href={waLink} className="!bg-deepGold !text-white hover:!bg-gold">Nachricht schreiben</CTAButton>
            <CTAButton href={waLink} variant="secondary" external className="!border-gold/20 !text-deepGold hover:!bg-gold/10">Erstgespräch buchen</CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
