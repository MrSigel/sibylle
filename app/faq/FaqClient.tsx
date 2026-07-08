"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CTAButton } from "@/components/sibylle/CTAButton";
import { faqItems, ctaLinks } from "@/lib/sibylle/siteData";

const ease = [0.22, 1, 0.36, 1] as const;

export function FaqClient() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <main className="overflow-hidden bg-white">
      {/* Hero */}
      <section className="grain relative flex min-h-[46svh] items-center overflow-hidden px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-sand/20 blur-[100px]" />
        <div className="absolute -right-24 top-12 h-[30rem] w-[30rem] rounded-full bg-softGold/10 blur-[110px]" />
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="mx-auto max-w-4xl">
            <p className="eyebrow mx-auto">Häufige Fragen</p>
            <h1 className="editorial mt-7 text-[clamp(2.8rem,6vw,6.5rem)] leading-[.95] text-warmBlack">
              Antworten, die <span className="italic text-deepGold">Klarheit</span> geben.
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-deepGold/85 md:text-xl">
              Ablauf, Wirkung und Rahmen systemischer Aufstellungen – ehrlich erklärt, ohne Heilversprechen. Deine Frage ist nicht dabei? Schreib Sibylle direkt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Accordion */}
      <section className="section-shell pt-0">
        <div className="container max-w-3xl">
          <div className="divide-y divide-gold/15 border-y border-gold/15">
            {faqItems.map((item, index) => {
              const open = active === index;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setActive(open ? null : index)}
                    className="focus-ring group flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="editorial text-2xl leading-tight md:text-3xl">{item.question}</span>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/25 text-xl text-deepGold transition duration-500 ${open ? "bg-deepGold text-cream" : ""}`}>
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45 }} className="overflow-hidden">
                        <p className="max-w-2xl pb-8 pr-4 leading-8 text-deepGold/75 md:pr-12">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell bg-deepGold py-28 text-center text-white">
        <div className="container max-w-3xl">
          <p className="eyebrow mx-auto !text-softGold">Noch offene Fragen?</p>
          <h2 className="editorial mt-6 text-4xl md:text-5xl lg:text-6xl">
            Sprich direkt mit <span className="italic text-softGold">Sibylle</span>.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/75">
            In einem kurzen, unverbindlichen Gespräch klären wir, ob eine systemische Aufstellung zu deinem Anliegen passt.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
            <CTAButton href={ctaLinks.secondary.href} className="!bg-softGold !text-deepGold hover:!bg-white">
              Kostenloses Erstgespräch
            </CTAButton>
            <CTAButton href="/preise" variant="secondary" className="!border-white/25 !text-white hover:!bg-white/10">
              Zu den Preisen
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
