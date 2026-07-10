'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { faqItems } from '@/lib/sibylle/siteData';

export function FAQAccordion() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="section-shell bg-white/55">
      <div className="container grid gap-12 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
        <div>
          <p className="eyebrow">FAQ zu systemischer Aufstellung</p>
          <h2 className="editorial mt-6 text-5xl leading-none md:text-7xl">Klare Antworten für deine nächste Entscheidung.</h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-gold">
            Kurze, direkte Antworten zu systemischem Coaching, Familienaufstellung und dem geschützten Rahmen bei Sibylle Jutta Bergold.
          </p>
        </div>
        <div className="divide-y divide-gold/15 border-y border-gold/15">
          {faqItems.map((item, index) => {
            const open = active === index;
            return (
              <div key={item.question}>
                <button type="button" aria-expanded={open} onClick={() => setActive(open ? null : index)} className="focus-ring group flex w-full items-center justify-between gap-6 py-7 text-left">
                  <span className="editorial text-2xl leading-tight md:text-3xl">{item.question}</span>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/25 text-xl text-deepGold transition duration-500 ${open ? 'bg-deepGold text-cream' : ''}`}>
                    {open ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.45}} className="overflow-hidden">
                      <p className="max-w-2xl pb-8 pr-12 leading-8 text-deepGold/75">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
