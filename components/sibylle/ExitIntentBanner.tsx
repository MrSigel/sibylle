'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppLink, whatsappConfig } from '@/lib/sibylle/siteData';
import { CTAButton } from './CTAButton';

export function ExitIntentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem('exit_banner_shown');
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    setHasShown(true);
    sessionStorage.setItem('exit_banner_shown', 'true');
  };

  const waLink = getWhatsAppLink("Hallo Sibylle, ich weiß gerade nicht genau weiter und brauche akut schnelle Hilfe. Können wir kurz sprechen?");

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-warmBlack/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl md:p-12"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-sand/20 text-deepGold transition-colors hover:bg-sand/40"
              aria-label="Schließen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-softGold/10 text-softGold">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>

              <h2 className="editorial text-3xl text-warmBlack md:text-4xl">
                Brauchst du <span className="italic text-deepGold">akut</span> Hilfe?
              </h2>
              
              <p className="mt-6 text-lg leading-relaxed text-deepGold/80">
                Du weißt nicht, was du tun musst oder brauchst einfach schnell Unterstützung? Lass uns direkt sprechen.
              </p>

              <div className="mt-10 flex flex-col gap-4">
                <CTAButton 
                  href={waLink} 
                  onClick={handleClose}
                  className="w-full justify-center py-5 text-lg"
                >
                  Jetzt Hilfe per WhatsApp anfragen
                </CTAButton>
                
                <button 
                  onClick={handleClose}
                  className="text-sm font-semibold text-deepGold/50 transition hover:text-deepGold"
                >
                  Vielleicht später
                </button>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-softGold/5 blur-2xl" />
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sand/10 blur-xl" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
