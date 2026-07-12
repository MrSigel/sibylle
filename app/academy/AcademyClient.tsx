"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CTAButton } from "@/components/sibylle/CTAButton";
import { academyInfo, ctaLinks } from "@/lib/sibylle/siteData";

const ease = [0.22, 1, 0.36, 1] as const;

const formats = [
  {
    title: "Aufzeichnungen ausgewählter Sessions",
    text: "Lerne anhand echter Aufstellungsarbeit. Ausgewählte Sessions stehen dir als Aufzeichnung zur Verfügung, damit du Dynamiken in deinem Tempo nachvollziehen kannst.",
  },
  {
    title: "Selbst-Aufstellungs-Übungen",
    text: "Geführte Übungen für zuhause, mit denen du eigene Themen behutsam sichtbar machst – ein ruhiger Raum für deine persönliche Vertiefung.",
  },
  {
    title: "Monatliche Live-Gruppensession",
    text: "Einmal im Monat kommen wir live zusammen: gemeinsame Aufstellungsarbeit, Fragen und Austausch in einem geschützten, wertschätzenden Rahmen.",
  },
];

const audience = [
  "Menschen, die ihre eigenen Muster kontinuierlich und tiefer verstehen möchten",
  "Wegbegleiter:innen, die systemisches Denken in ihren Alltag oder Beruf integrieren wollen",
  "Alle, die nach einer Aufstellung dranbleiben und in der Tiefe weiterarbeiten möchten",
];

export function AcademyClient() {
  return (
    <main className="overflow-hidden bg-white">
      {/* Hero */}
      <section className="grain relative flex min-h-[50svh] items-center overflow-hidden px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-sand/20 blur-[100px]" />
        <div className="absolute -right-24 top-12 h-[30rem] w-[30rem] rounded-full bg-softGold/10 blur-[110px]" />
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="mx-auto max-w-4xl">
            <p className="eyebrow mx-auto">Academy</p>
            <h1 className="editorial mt-7 text-[clamp(2.8rem,6vw,6.5rem)] leading-[.95] text-warmBlack">
              Systemische Tiefe, <span className="italic text-deepGold">kontinuierlich</span> begleitet.
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-deepGold/85 md:text-xl">
              Die Deutsche Akademie für Systemaufstellungen ist Sibylle Jutta Bergolds Raum für alle, die dranbleiben möchten – mit Aufzeichnungen, Übungen und monatlichen Live-Sessions. Coaching und Selbsterfahrung, ohne Heilversprechen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-shell pt-0">
        <div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, ease }}>
            <p className="eyebrow">Über die Academy</p>
            <h2 className="editorial mt-6 text-4xl leading-tight text-warmBlack md:text-5xl">
              Ein Ort, an dem Wachstum <span className="italic text-deepGold">weitergeht</span>.
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: .1, ease }} className="space-y-6 text-lg leading-8 text-deepGold/80">
            <p>
              Gegründet von Sibylle Jutta Bergold, die Menschen seit über 25 Jahren in systemischer Aufstellung, Coaching und Selbsterfahrung begleitet, ist die Academy für alle gedacht, die tiefer eintauchen wollen – über die einzelne Sitzung hinaus.
            </p>
            <p>
              Statt einmaliger Impulse entsteht ein kontinuierlicher Raum: Du lernst aus echter Aufstellungsarbeit, übst eigenständig und kommst regelmäßig in einer vertrauten Gruppe zusammen.
            </p>
            <Link href="/ueber-mich" className="inline-flex items-center gap-2 text-sm font-bold text-deepGold transition hover:gap-3">Mehr über Sibylle <span aria-hidden="true">→</span></Link>
          </motion.div>
        </div>
      </section>

      {/* Formats */}
      <section className="section-shell bg-white/40 pt-0">
        <div className="container">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow">Deine Inhalte</p>
            <h2 className="editorial mt-6 text-4xl leading-tight text-warmBlack md:text-5xl">Was in der Academy auf dich wartet.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {formats.map((item, index) => (
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

      {/* Membership + audience */}
      <section className="section-shell">
        <div className="container grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-stretch">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[3rem] border border-gold/15 bg-white p-12 shadow-soft">
            <p className="eyebrow">Für wen</p>
            <h2 className="editorial mt-6 text-3xl leading-tight text-warmBlack md:text-4xl">Passt die Academy zu dir?</h2>
            <ul className="mt-8 space-y-4">
              {audience.map((item) => (
                <li key={item} className="flex gap-4 text-base leading-8 text-deepGold/80">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-softGold" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} className="flex flex-col justify-between rounded-[3rem] bg-deepGold p-12 text-white shadow-soft">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-softGold">Mitgliedschaft</p>
              <div className="mt-6 flex items-end gap-2">
                <span className="editorial text-5xl leading-none md:text-6xl">{academyInfo.price}</span>
              </div>
              <ul className="mt-10 space-y-3 text-sm leading-7 text-white/85">
                {academyInfo.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="text-softGold">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={ctaLinks.primary.href}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-12 inline-flex items-center justify-center rounded-full bg-softGold px-8 py-4 text-sm font-bold text-deepGold shadow-soft transition hover:bg-white"
            >
              Platz anfragen
            </a>
            <p className="mt-4 text-center text-xs text-white/55">Details und Verfügbarkeit klären wir persönlich mit dir.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell bg-white pt-0 text-center">
        <div className="container max-w-3xl">
          <p className="eyebrow mx-auto">Noch unsicher?</p>
          <h2 className="editorial mt-6 text-4xl leading-tight text-warmBlack md:text-5xl">
            Sprich mit <span className="italic text-deepGold">Sibylle</span> darüber.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-deepGold/75">
            Ob Academy oder ein erstes Einzelgespräch – finde in Ruhe heraus, was für dich gerade stimmig ist.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
            <CTAButton href={ctaLinks.secondary.href}>Termin für erste Session</CTAButton>
            <CTAButton href="/preise" variant="secondary">Einzel-Begleitung &amp; Preise</CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
