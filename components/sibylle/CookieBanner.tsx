'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('sibylle-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('sibylle-cookie-consent', 'all');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('sibylle-cookie-consent', 'essential');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 bottom-4 z-[100] md:bottom-8 md:left-auto md:right-8 md:w-[420px]"
        >
          <div className="premium-panel overflow-hidden rounded-[2.5rem] p-8 shadow-[0_20px_60px_rgba(35,42,26,0.15)]">
            <h3 className="editorial text-2xl text-warmBlack">Ein Moment für deine Privatsphäre</h3>
            <p className="mt-4 text-sm leading-relaxed text-deepGold/70">
              Wir nutzen Cookies, um die Seite sicher und zuverlässig zu betreiben und dein Erlebnis zu verbessern. Einige sind essenziell, andere helfen uns dabei.
            </p>
            
            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={handleAccept}
                className="focus-ring flex h-12 items-center justify-center rounded-full bg-deepGold px-6 text-xs font-bold uppercase tracking-widest text-cream transition hover:bg-softGold"
              >
                Alle akzeptieren
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDecline}
                  className="focus-ring flex h-12 items-center justify-center rounded-full border border-gold/20 bg-white/50 px-4 text-[10px] font-bold uppercase tracking-widest text-deepGold transition hover:bg-white"
                >
                  Nur essenziell
                </button>
                <Link
                  href="/cookies"
                  onClick={() => setShow(false)}
                  className="focus-ring flex h-12 items-center justify-center rounded-full border border-gold/20 bg-white/50 px-4 text-[10px] font-bold uppercase tracking-widest text-deepGold transition hover:bg-white"
                >
                  Einstellungen
                </Link>
              </div>
            </div>
            
            <p className="mt-6 text-center text-[10px] text-deepGold/40">
              Mehr Details findest du in unserer{' '}
              <Link href="/datenschutz" className="underline underline-offset-2 hover:text-softGold">
                Datenschutzerklärung
              </Link>.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
