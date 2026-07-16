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

  // Lock scrolling while a decision is pending, so the page behind cannot be used.
  useEffect(() => {
    if (!show) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [show]);

  function decide(choice: 'all' | 'essential') {
    localStorage.setItem('sibylle-cookie-consent', choice);
    window.dispatchEvent(new Event('sibylle-cookie-consent-change'));
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-banner-title"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-warmBlack/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-gold/15 bg-cream p-8 shadow-[0_30px_90px_rgba(35,42,26,0.35)] md:p-10"
          >
            <h2 id="cookie-banner-title" className="editorial text-2xl text-warmBlack md:text-3xl">
              Ein Moment für deine Privatsphäre
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-deepGold/75 md:text-base md:leading-7">
              Wir nutzen Cookies, um die Seite sicher und zuverlässig zu betreiben. Zusätzlich möchten wir mit
              Google Analytics verstehen, wie die Seite genutzt wird – das ist freiwillig. Bitte triff eine Auswahl.
            </p>

            {/* Both options are intentionally equal in size and weight: rejecting must be
                as easy as accepting for the consent to be legally valid (DSGVO/TTDSG). */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => decide('all')}
                className="focus-ring flex h-14 items-center justify-center rounded-full bg-deepGold px-6 text-xs font-bold uppercase tracking-widest text-cream transition hover:bg-gold"
              >
                Alle akzeptieren
              </button>
              <button
                type="button"
                onClick={() => decide('essential')}
                className="focus-ring flex h-14 items-center justify-center rounded-full border border-gold/40 bg-white px-6 text-xs font-bold uppercase tracking-widest text-deepGold transition hover:bg-white/70"
              >
                Nur essenziell
              </button>
            </div>

            <p className="mt-7 text-center text-xs leading-6 text-deepGold/50">
              Mehr dazu in der{' '}
              <Link href="/cookies" className="underline underline-offset-2 hover:text-softGold">
                Cookie-Richtlinie
              </Link>{' '}
              und der{' '}
              <Link href="/datenschutz" className="underline underline-offset-2 hover:text-softGold">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
