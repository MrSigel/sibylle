'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

type Status = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Etwas ist schiefgelaufen. Bitte versuche es erneut.');
        return;
      }

      setStatus('success');
      setMessage(
        data.alreadySubscribed
          ? 'Du bist bereits eingetragen – schön, dass du dabei bist!'
          : 'Fast geschafft: Bitte prüfe dein Postfach für die Bestätigung.',
      );
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Verbindung fehlgeschlagen. Bitte versuche es später erneut.');
    }
  }

  return (
    <section className="section-shell">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="relative overflow-hidden rounded-[3rem] border border-gold/10 bg-deepGold px-6 py-16 text-center text-cream shadow-[0_30px_80px_rgba(35,42,26,.18)] md:px-16 md:py-20"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-softGold/20 blur-[110px]" />
          <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-softGold/10 blur-[110px]" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-softGold">Newsletter</p>
            <h2 className="editorial mt-6 text-[clamp(2.6rem,5vw,4.5rem)] leading-[.95] text-cream">
              Bleib in Verbindung.
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-cream/80">
              Erhalte ruhige Impulse rund um systemische Aufstellung – und erfahre als Erste:r, sobald die
              <span className="font-semibold text-cream"> Academy</span> und neue Angebote verfügbar sind.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Deine E-Mail-Adresse"
                aria-label="E-Mail-Adresse"
                className="focus-ring w-full flex-1 rounded-full border border-cream/20 bg-cream/10 px-6 py-4 text-cream placeholder:text-cream/50 outline-none focus:border-softGold"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded-full bg-cream px-7 py-4 font-bold text-deepGold transition-all hover:bg-softGold hover:text-warmBlack disabled:opacity-60"
              >
                {status === 'loading' ? 'Wird gesendet…' : 'Eintragen'}
              </button>
            </form>

            {message && (
              <p className={`mt-5 text-sm font-medium ${status === 'error' ? 'text-red-200' : 'text-cream'}`}>
                {message}
              </p>
            )}

            <p className="mx-auto mt-6 max-w-md text-xs text-cream/50">
              Kein Spam. Du kannst dich jederzeit wieder abmelden.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
