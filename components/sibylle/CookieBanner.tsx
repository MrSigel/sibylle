'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('sibylle-cookie-consent');
    if (!consent) setShow(true);
  }, []);

  function decide(choice: 'all' | 'essential') {
    localStorage.setItem('sibylle-cookie-consent', choice);
    window.dispatchEvent(new Event('sibylle-cookie-consent-change'));
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Cookie-Hinweis"
          // Slim, NON-blocking bar: the page and its call-to-action stay fully
          // usable. Consent is still requested (tracking only fires on "accept"),
          // but we never block the content behind a wall — that costs conversions
          // and a blocking wall is not required by DSGVO/TTDSG.
          className="fixed inset-x-0 bottom-0 z-[210] border-t border-gold/20 bg-cream/95 px-4 py-4 shadow-[0_-14px_40px_rgba(35,42,26,.16)] backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 md:flex-row md:justify-between md:gap-8">
            <p className="text-center text-xs leading-relaxed text-deepGold/80 md:text-left md:text-sm">
              Wir nutzen Cookies für einen sicheren Betrieb und – mit deiner Zustimmung – anonyme Statistik
              (Google Analytics).{' '}
              <Link href="/cookies" className="underline underline-offset-2 hover:text-softGold">
                Cookie-Richtlinie
              </Link>{' '}
              ·{' '}
              <Link href="/datenschutz" className="underline underline-offset-2 hover:text-softGold">
                Datenschutz
              </Link>
            </p>

            {/* Accept and reject are equal in size and weight (DSGVO/TTDSG). */}
            <div className="flex w-full shrink-0 gap-3 md:w-auto">
              <button
                type="button"
                onClick={() => decide('essential')}
                className="focus-ring flex h-11 flex-1 items-center justify-center rounded-full border border-gold/40 bg-white px-6 text-xs font-bold uppercase tracking-widest text-deepGold transition hover:bg-white/70 md:flex-none"
              >
                Ablehnen
              </button>
              <button
                type="button"
                onClick={() => decide('all')}
                className="focus-ring flex h-11 flex-1 items-center justify-center rounded-full bg-deepGold px-6 text-xs font-bold uppercase tracking-widest text-cream transition hover:bg-gold md:flex-none"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
