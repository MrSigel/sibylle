'use client';

import { motion } from 'framer-motion';
import { testimonials, initialsFromName } from '@/lib/sibylle/siteData';

export function TestimonialMarquee() {
  // Double the items for a seamless loop
  const items = [...testimonials, ...testimonials];

  return (
    <section className="section-shell overflow-hidden bg-white/20">
      <div className="container mb-16 text-center">
        <p className="eyebrow mx-auto">Erfahrungen</p>
        <h2 className="editorial mt-6 text-[clamp(2.8rem,5vw,5.5rem)] leading-none">Das sagen meine Klienten</h2>
      </div>

      <div className="relative flex overflow-hidden py-10">
        <motion.div 
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 160, // Slower for premium feel
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="w-[420px] shrink-0 rounded-[2.5rem] border border-gold/10 bg-white p-10 shadow-[0_20px_50px_rgba(35,42,26,0.05)] transition-all hover:border-softGold/30 hover:shadow-md"
            >
              <div className="flex gap-0.5 text-softGold">
                {[...Array(item.rating)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <p className="mt-6 whitespace-normal text-[1.05rem] leading-relaxed italic text-deepGold/85">
                „{item.short}“
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/15 bg-sand/40 font-serif text-sm font-bold text-deepGold">
                  {initialsFromName(item.name)}
                </div>
                <span className="font-serif text-lg font-medium text-deepGold">{item.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Gradients for soft edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8f3ea] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f8f3ea] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
