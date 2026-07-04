'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { testimonials, getWhatsAppLink, whatsappConfig } from '@/lib/sibylle/siteData';
import { CTAButton } from '@/components/sibylle/CTAButton';

const ease = [0.22, 1, 0.36, 1] as const;

export function ReferenzenClient() {
  const waLink = getWhatsAppLink(whatsappConfig.messages.default);
  return (
    <main className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="grain relative flex min-h-[50svh] items-center overflow-hidden px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-sand/20 blur-[100px]" />
        <div className="absolute -right-24 top-12 h-[30rem] w-[30rem] rounded-full bg-softGold/10 blur-[110px]" />
        
        <div className="container relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease }}
            className="mx-auto max-w-4xl"
          >
            <p className="eyebrow mx-auto">Vertrauen & Erfahrung</p>
            <h1 className="editorial mt-7 text-[clamp(3.2rem,7vw,7.5rem)] leading-[.88] text-warmBlack">
              Was meine Klienten <span className="italic text-deepGold">erleben.</span>
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-deepGold/85 md:text-xl md:leading-9">
              Worte können die Tiefe einer Aufstellung nur begrenzt einfangen. Hier teilen Menschen ihre persönlichen Erfahrungen und den Weg zu ihrer eigenen Klarheit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-shell">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((item, idx) => (
              <motion.article 
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: (idx % 2) * 0.1, ease }}
                className="premium-panel group flex flex-col rounded-[3rem] p-10 md:p-14"
              >
                <div className="flex gap-0.5 text-softGold">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                
                <blockquote className="editorial mt-8 flex-grow text-2xl italic leading-snug text-deepGold/90 md:text-3xl">
                  „{item.text}“
                </blockquote>

                <div className="mt-12 flex items-center gap-5 border-t border-gold/10 pt-8">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gold/10 shadow-sm transition-transform duration-500 group-hover:scale-110">
                    <Image 
                      src={item.image || ""} 
                      alt={item.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="block font-serif text-xl font-medium text-warmBlack">{item.name}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-softGold/70">Klienten-Feedback</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-shell relative overflow-hidden bg-white py-32 text-center text-warmBlack border-t border-gold/10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-24 top-0 h-[40rem] w-[40rem] rounded-full bg-softGold/10 blur-[120px]" />
          <div className="absolute -right-24 bottom-0 h-[40rem] w-[40rem] rounded-full bg-deepGold/10 blur-[120px]" />
        </div>
        
        <div className="container relative z-10 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
             <span className="eyebrow mb-6">Wachstum & Begleitung</span>
             <h2 className="editorial mt-6 text-[clamp(3.5rem,8vw,8rem)] leading-[.85]">
               Möchtest du deinen <br />
               <span className="italic text-gold">eigenen Weg</span> gehen?
             </h2>
          </motion.div>
          
          <p className="mx-auto mt-10 max-w-2xl text-xl leading-relaxed text-deepGold/70">
            Jede Veränderung beginnt mit dem ersten Impuls. Lass uns in einem unverbindlichen Gespräch schauen, was dein System braucht.
          </p>
          
          <div className="mt-16 flex flex-col justify-center gap-6 sm:flex-row">
            <CTAButton 
              href={waLink} 
              className="!h-16 !px-12 !text-base !bg-deepGold !text-white hover:!bg-gold transition-colors"
            >
              Sibylle schreiben
            </CTAButton>
            <CTAButton 
              href={waLink} 
              variant="secondary" 
              external 
              className="!h-16 !px-12 !text-base !border-gold/20 !text-deepGold hover:!bg-gold/10 transition-all"
            >
              Gespräch buchen
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
