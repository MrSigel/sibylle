'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { CTAButton } from './CTAButton';
import { ctaLinks, heroQuestions } from '@/lib/sibylle/siteData';

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  
  // Panels that "open" sideways
  const leftPanelX = useTransform(scrollYProgress, [0, 0.4], ["0%", "-100%"]);
  const rightPanelX = useTransform(scrollYProgress, [0, 0.4], ["0%", "100%"]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section ref={containerRef} className="grain relative min-h-[calc(100svh-82px)] overflow-hidden px-4 pb-20 pt-8 md:pb-28 md:pt-14 lg:flex lg:items-center">
      <div className="absolute -left-32 -top-20 h-[45rem] w-[45rem] rounded-full bg-sand/25 blur-[120px]" />
      <div className="absolute -right-24 top-0 h-[35rem] w-[35rem] rounded-full bg-softGold/10 blur-[110px]" />
      
      <div className="container relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_.9fr] lg:gap-24">
          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: .15 } } }}>
            <motion.p variants={{ hidden:{opacity:0,y:16},show:{opacity:1,y:0,transition:{duration:.7,ease}} }} className="eyebrow">Systemische Klarheit · persönlich begleitet</motion.p>
            <motion.h1 variants={{ hidden:{opacity:0,y:30},show:{opacity:1,y:0,transition:{duration:1,ease}} }} className="editorial mt-7 max-w-[720px] text-[clamp(2.8rem,5.8vw,6.2rem)] leading-[.9] text-warmBlack">
              Wenn dein Leben <span className="italic text-deepOlive">wiederholt,</span> will etwas gesehen werden.
            </motion.h1>
            <motion.p variants={{ hidden:{opacity:0,y:20},show:{opacity:1,y:0,transition:{duration:.8,ease}} }} className="mt-8 max-w-lg text-lg leading-8 text-deepOlive/85 md:text-xl">
              Ein geschützter Raum für Beziehungsmuster, Sinnfragen und familiäre Dynamiken – ruhig, klar und ohne Druck.
            </motion.p>
            <motion.div variants={{ hidden:{opacity:0,y:20},show:{opacity:1,y:0,transition:{duration:.8,ease}} }} className="mt-12 flex flex-col gap-4 sm:flex-row">
              <CTAButton href={ctaLinks.primary.href}>Persönlich Kontakt aufnehmen</CTAButton>
              <CTAButton href={ctaLinks.secondary.href} variant="secondary" external>Kostenloses Erstgespräch buchen</CTAButton>
            </motion.div>
            
            <motion.div variants={{ hidden:{opacity:0},show:{opacity:1,transition:{delay:1.2,duration:1}} }} className="mt-14 flex items-center gap-6 border-t border-olive/10 pt-10">
              <div className="flex -space-x-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-4 border-cream shadow-md">
                  <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150" alt="Frau" fill className="object-cover" />
                </div>
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-4 border-cream shadow-md">
                  <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150" alt="Mann" fill className="object-cover" />
                </div>
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-4 border-cream shadow-md">
                  <Image src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=150&h=150" alt="Familie" fill className="object-cover" />
                </div>
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-cream bg-softGold font-bold text-white shadow-md text-sm">
                  +30
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-1 text-softGold text-lg">
                  {[1,2,3,4,5].map(star => <span key={star}>★</span>)}
                </div>
                <p className="text-[.95rem] font-bold text-deepOlive tracking-tight">30+ 5-Sterne Bewertungen auf Google</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{opacity:0,scale:0.98,x:20}} 
            animate={{opacity:1,scale:1,x:0}} 
            transition={{duration:1.4,delay:.3,ease}} 
            className="relative mx-auto w-full max-w-[560px] lg:mx-0"
          >
            {/* The "Opening" Container */}
            <motion.div 
              style={{ scale }}
              className="relative aspect-[3/4] overflow-hidden rounded-[4.5rem] border border-olive/15 bg-sibylleMist shadow-[0_50px_130px_rgba(35,42,26,.18)]"
            >
              <motion.div style={{ y: portraitY }} className="relative h-full w-full">
                <Image 
                  src="/assets/sibylle/portraits/Design-ohne-Titel-2.png" 
                  alt="Sibylle Bergold – systemische Klarheit" 
                  fill 
                  priority 
                  sizes="(min-width: 1024px) 560px, 90vw" 
                  className="object-cover" 
                />
              </motion.div>
              
              {/* Sliding Panels that "open" */}
              <motion.div 
                style={{ x: leftPanelX, opacity: panelOpacity }}
                className="absolute inset-y-0 left-0 z-10 w-1/2 bg-cream/40 backdrop-blur-md border-r border-white/20 pointer-events-none"
              />
              <motion.div 
                style={{ x: rightPanelX, opacity: panelOpacity }}
                className="absolute inset-y-0 right-0 z-10 w-1/2 bg-cream/40 backdrop-blur-md border-l border-white/20 pointer-events-none"
              />
            </motion.div>

            <div className="absolute -bottom-8 -left-8 z-20 flex h-32 w-32 items-center justify-center rounded-full bg-deepOlive shadow-2xl sm:h-40 sm:w-40">
              <Image src="/assets/sibylle/brand/monogram-cream.png" alt="" width={618} height={799} className="h-20 w-auto sm:h-28" />
            </div>

            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-6 z-20 rounded-[2.5rem] bg-white/95 p-6 shadow-2xl backdrop-blur-md border border-olive/5"
            >
              <p className="font-serif text-xl italic text-deepOlive">15+ Jahre Erfahrung</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial="hidden" animate="show" variants={{hidden:{},show:{transition:{delayChildren:1.4,staggerChildren:.15}}}} className="mt-24 grid gap-5 md:mt-32 md:grid-cols-3">
          {heroQuestions.map((question,index)=><motion.div key={question} variants={{hidden:{opacity:0,y:30},show:{opacity:1,y:0,transition:{duration:.8,ease}}}} whileHover={{y:-12,borderColor:'rgba(198,168,114,.4)',boxShadow:'0 20px 40px rgba(35,42,26,0.08)'}} className="premium-panel group cursor-default rounded-[2.5rem] p-8 transition-all duration-500 bg-white/40">
            <div className="flex flex-col gap-6">
              <span className="editorial text-4xl text-softGold/30 group-hover:text-softGold transition-colors duration-500">0{index+1}</span>
              <p className="text-xl leading-8 text-warmBlack group-hover:text-deepOlive transition-colors duration-500">{question}</p>
            </div>
          </motion.div>)}
        </motion.div>
      </div>
    </section>
  );
}
