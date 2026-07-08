"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CTAButton } from "@/components/sibylle/CTAButton";
import { ctaLinks } from "@/lib/sibylle/siteData";

const ease = [0.22, 1, 0.36, 1] as const;

const principles = [
  {
    title: "Alles ist verbunden",
    text: "In einem System beeinflusst jeder Teil das Ganze. Was sich in einer Beziehung zeigt, hat seine Wurzeln oft an ganz anderer Stelle – in der Familie, in der Herkunft, in früheren Erfahrungen.",
  },
  {
    title: "Muster wiederholen sich",
    text: "Unbewusste Dynamiken suchen sich immer wieder neue Bühnen. Sie wiederholen sich so lange, bis sie gesehen, verstanden und gewürdigt werden dürfen.",
  },
  {
    title: "Sichtbarkeit verändert",
    text: "Sobald eine Dynamik wahrnehmbar wird, entsteht innerer Raum. Aus diesem Raum kann eine neue, stimmigere Haltung wachsen – ohne Druck und ohne Bewertung.",
  },
];

const patterns = [
  { label: "Beziehungsmuster", href: "/beziehungsmuster", text: "Warum sich Nähe, Rückzug und Verlustangst wiederholen – und wie sich der Kreislauf lösen lässt." },
  { label: "Familienmuster", href: "/familienmuster", text: "Wie Loyalitäten, Rollen und Prägungen aus der Herkunftsfamilie bis heute in dir wirken." },
  { label: "Ahnenmuster", href: "/ahnenmuster", text: "Transgenerationale Weitergabe: Themen, die nicht bei dir begonnen haben, aber durch dich wirken." },
  { label: "Inneres Kind", href: "/inneres-kind", text: "Alte Gefühle und innere Anteile, die im Erwachsenenleben oft noch leise die Regie führen." },
  { label: "Partnerschaft", href: "/partnerschaft", text: "Die Dynamik zwischen Nähe und Autonomie – Bindung, Freiheit und stille Erwartungen." },
  { label: "Beruf & Erfolg", href: "/berufliche-aufstellung", text: "Erfolgsmuster, Rollen und Blockaden im beruflichen System sichtbar und beweglich machen." },
];

export function WissenClient() {
  return (
    <main className="overflow-hidden bg-white">
      {/* Hero */}
      <section className="grain relative flex min-h-[48svh] items-center overflow-hidden px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-sand/20 blur-[100px]" />
        <div className="absolute -right-24 top-12 h-[30rem] w-[30rem] rounded-full bg-softGold/10 blur-[110px]" />
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="mx-auto max-w-4xl">
            <p className="eyebrow mx-auto">Wissen</p>
            <h1 className="editorial mt-7 text-[clamp(2.8rem,6vw,6.5rem)] leading-[.95] text-warmBlack">
              Muster verstehen, die dein Leben <span className="italic text-deepGold">prägen</span>.
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-deepGold/85 md:text-xl">
              Hintergründe zur systemischen Arbeit – damit du nachvollziehen kannst, wie Beziehungen, Familie und Herkunft in dir wirken. Klar erklärt, als Coaching und Selbsterfahrung ohne Heilversprechen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-shell pt-0">
        <div className="container">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow">Grundgedanken</p>
            <h2 className="editorial mt-6 text-4xl leading-tight text-warmBlack md:text-5xl">Wie systemisches Denken wirkt.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="premium-panel flex flex-col rounded-[2.5rem] p-10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-softGold/10 font-serif text-xl font-bold text-softGold">
                  0{index + 1}
                </div>
                <h3 className="mt-8 text-2xl font-bold text-warmBlack">{item.title}</h3>
                <p className="mt-5 text-base leading-relaxed text-deepGold/75">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Patterns */}
      <section className="section-shell bg-white/40">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="eyebrow mx-auto">Themenfelder</p>
            <h2 className="editorial mt-6 text-4xl leading-tight text-warmBlack md:text-5xl">Wo Muster besonders sichtbar werden.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {patterns.map((item, index) => (
              <motion.div key={item.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
                <Link href={item.href} className="group flex h-full flex-col rounded-[2.5rem] border border-gold/15 bg-white p-8 shadow-soft transition-all hover:-translate-y-1 hover:border-gold/35">
                  <h3 className="text-xl font-bold text-warmBlack">{item.label}</h3>
                  <p className="mt-3 flex-grow text-sm leading-7 text-deepGold/70">{item.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-deepGold transition group-hover:gap-3">Mehr erfahren <span aria-hidden="true">→</span></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Method + FAQ teaser */}
      <section className="section-shell">
        <div className="container grid gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col justify-between rounded-[3rem] border border-gold/15 bg-white p-12 shadow-soft">
            <div>
              <p className="eyebrow">Der Prozess</p>
              <h2 className="editorial mt-6 text-3xl leading-tight text-warmBlack md:text-4xl">Wie eine Aufstellung abläuft.</h2>
              <p className="mt-6 text-base leading-8 text-deepGold/75">Von der Klärung deines Anliegens über das Sichtbarmachen bis zur behutsamen Integration – in fünf ruhigen Schritten.</p>
            </div>
            <Link href="/methode" className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-deepGold transition hover:gap-3">Zur Methode <span aria-hidden="true">→</span></Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} className="flex flex-col justify-between rounded-[3rem] border border-gold/15 bg-white p-12 shadow-soft">
            <div>
              <p className="eyebrow">Häufige Fragen</p>
              <h2 className="editorial mt-6 text-3xl leading-tight text-warmBlack md:text-4xl">Was du realistisch erwarten kannst.</h2>
              <p className="mt-6 text-base leading-8 text-deepGold/75">Ehrliche Antworten zu Ablauf, Wirkung, Voraussetzungen und den Grenzen der Methode.</p>
            </div>
            <Link href="/faq" className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-deepGold transition hover:gap-3">Zu den Fragen <span aria-hidden="true">→</span></Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell bg-deepGold py-28 text-center text-white">
        <div className="container max-w-3xl">
          <p className="eyebrow mx-auto !text-softGold">Vom Verstehen ins Erleben</p>
          <h2 className="editorial mt-6 text-4xl md:text-5xl lg:text-6xl">
            Bereit, dein Muster <span className="italic text-softGold">sichtbar</span> zu machen?
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/75">
            Lass uns in einem ruhigen Erstgespräch schauen, welches Thema bei dir gerade Raum braucht.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
            <CTAButton href={ctaLinks.secondary.href} className="!bg-softGold !text-deepGold hover:!bg-white">
              Kostenloses Erstgespräch
            </CTAButton>
            <CTAButton href="/systemaufstellung" variant="secondary" className="!border-white/25 !text-white hover:!bg-white/10">
              Systemaufstellung entdecken
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
