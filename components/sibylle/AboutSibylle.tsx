'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutSibylle() {
  return (
    <section className="section-shell overflow-hidden">
      <div className="container grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
        <div className="relative mx-auto w-full max-w-[500px]">
          <motion.div 
            initial={{opacity:0,scale:.96,x:-20}} 
            whileInView={{opacity:1,scale:1,x:0}} 
            viewport={{once:true}} 
            transition={{duration:1,ease:[0.22, 1, 0.36, 1]}}
            className="relative aspect-[4/5] overflow-hidden rounded-[3.5rem] bg-white border border-gold/10 shadow-[0_35px_90px_rgba(35,42,26,.14)]"
          >
            <Image 
              src="/assets/sibylle/portraits/kontakt.png" 
              alt="Sibylle Bergold" 
              fill 
              sizes="(min-width: 1024px) 500px, 90vw" 
              className="object-cover transition-transform duration-700 hover:scale-105" 
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute -bottom-8 -right-8 z-20 flex h-28 w-28 items-center justify-center rounded-full bg-deepGold shadow-2xl md:h-36 md:w-36"
          >
             <Image src="/assets/sibylle/brand/monogram-cream.png" alt="" width={618} height={799} className="h-16 w-auto md:h-22" />
          </motion.div>
        </div>
        
        <motion.div initial={{opacity:0,x:35}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:1,ease:[0.22, 1, 0.36, 1]}}>
          <p className="eyebrow">Sibylle Bergold</p>
          <h2 className="editorial mt-7 text-[clamp(3.4rem,5.5vw,6rem)] leading-[.92]">Wärme, Klarheit und systemische Tiefe.</h2>
          <blockquote className="editorial my-10 border-l-4 border-softGold pl-8 text-3xl italic leading-snug text-deepGold/90">
            „Muster lassen sich sehen, ohne sie zu bewerten.“
          </blockquote>
          <p className="max-w-xl text-lg leading-9 text-deepGold/80">
            Als Gründerin der Deutschen Akademie für Systemaufstellungen begleitet Sibylle seit über 25 Jahren Menschen bei Beziehungsmustern, Herkunftsfragen und persönlicher Orientierung. Ihre Arbeit ist geprägt von tiefer Wahrnehmung und der Ruhe, die es für echte Veränderung braucht.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
             <div className="inline-flex items-center gap-4 rounded-full border border-gold/20 bg-white/55 px-6 py-4 text-xs font-bold uppercase tracking-[.14em] text-deepGold shadow-sm">
               <span className="h-2 w-2 rounded-full bg-softGold"/>
               Deutsche Akademie für Systemaufstellungen
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
