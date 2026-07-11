'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { CTAButton } from './CTAButton';
import { ctaLinks, heroQuestions, testimonials, initialsFromName } from '@/lib/sibylle/siteData';

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <section ref={containerRef} className="grain relative min-h-[calc(100svh-82px)] overflow-hidden px-4 pb-20 pt-8 md:pb-28 md:pt-14 lg:flex lg:items-center">
      <div className="absolute -left-32 -top-20 h-[45rem] w-[45rem] rounded-full bg-sand/25 blur-[120px]" />
      <div className="absolute -right-24 top-0 h-[35rem] w-[35rem] rounded-full bg-softGold/10 blur-[110px]" />

      <div className="container relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_.9fr] lg:gap-24">
          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: .15 } } }}>
            <motion.p variants={{ hidden:{opacity:0,y:16},show:{opacity:1,y:0,transition:{duration:.7,ease}} }} className="eyebrow">
              Systemische Klarheit · persönlich begleitet
            </motion.p>
            <motion.h1 variants={{ hidden:{opacity:0,y:30},show:{opacity:1,y:0,transition:{duration:1,ease}} }} className="editorial mt-7 max-w-[760px] text-[clamp(2.8rem,5.8vw,6.2rem)] leading-[.9] text-warmBlack">
              Systemische Aufstellung, wenn dein Leben <span className="italic text-deepGold">Muster wiederholt.</span>
            </motion.h1>
            <motion.p variants={{ hidden:{opacity:0,y:20},show:{opacity:1,y:0,transition:{duration:.8,ease}} }} className="mt-8 max-w-xl text-lg leading-8 text-deepGold/85 md:text-xl">
              Sibylle Jutta Bergold begleitet dich mit <span className="font-semibold">über 25 Jahren Erfahrung</span> in systemischem Coaching und Selbsterfahrung - ruhig, klar und ohne Heilversprechen.
            </motion.p>
            <motion.div variants={{ hidden:{opacity:0,y:20},show:{opacity:1,y:0,transition:{duration:.8,ease}} }} className="mt-12 flex flex-col gap-4 sm:flex-row">
              <CTAButton href={ctaLinks.primary.href}>Persönlich Kontakt aufnehmen</CTAButton>
              <CTAButton href={ctaLinks.secondary.href} variant="secondary" external>Erstgespräch buchen</CTAButton>
            </motion.div>

            <motion.div variants={{ hidden:{opacity:0},show:{opacity:1,transition:{delay:1.2,duration:1}} }} className="mt-14 flex items-center gap-6 border-t border-gold/10 pt-10">
              <div className="flex -space-x-4">
                {testimonials.slice(0, 3).map((t) => (
                  <div key={t.name} className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-sand font-serif text-base font-bold text-deepGold shadow-md">
                    {initialsFromName(t.name)}
                  </div>
                ))}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-softGold text-sm font-bold text-white shadow-md">
                  34
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-1 text-lg text-softGold">
                  {[1,2,3,4,5].map(star => <span key={star}>★</span>)}
                </div>
                <p className="text-[.95rem] font-bold tracking-tight text-deepGold">34 Bewertungen auf Google</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{opacity:0,scale:0.98,x:20}}
            animate={{opacity:1,scale:1,x:0}}
            transition={{duration:1.4,delay:.3,ease}}
            className="relative mx-auto w-full max-w-[560px] lg:mx-0"
          >
            <motion.div
              style={{ scale, perspective: 1800 }}
              className="relative aspect-[3/4] overflow-hidden rounded-[4.5rem] border border-gold/15 bg-white shadow-[0_50px_130px_rgba(35,42,26,.18)]"
            >
              <motion.div style={{ y: portraitY }} className="relative h-full w-full">
                <Image
                  src="/assets/sibylle/portraits/1.jpg"
                  alt="Sibylle Bergold - systemische Aufstellung und Coaching"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Two panels swing open on load (like double doors) so the
                  portrait is revealed within ~1.5s without any scrolling. */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -105 }}
                transition={{ duration: 1.5, delay: 0.5, ease }}
                style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 border-r border-white/40 bg-gradient-to-br from-cream via-sand to-cream shadow-[inset_-24px_0_50px_rgba(35,42,26,.10)]"
              />
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 105 }}
                transition={{ duration: 1.5, delay: 0.5, ease }}
                style={{ transformOrigin: 'right center', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 border-l border-white/40 bg-gradient-to-bl from-cream via-sand to-cream shadow-[inset_24px_0_50px_rgba(35,42,26,.10)]"
              />
            </motion.div>

            <div className="absolute -bottom-8 -left-8 z-20 flex h-32 w-32 items-center justify-center rounded-full bg-deepGold shadow-2xl sm:h-40 sm:w-40">
              <Image src="/assets/sibylle/brand/monogram-cream.png" alt="" width={618} height={799} className="h-20 w-auto sm:h-28" />
            </div>
          </motion.div>
        </div>

        <motion.div initial="hidden" animate="show" variants={{hidden:{},show:{transition:{delayChildren:1.4,staggerChildren:.15}}}} className="mt-24 grid gap-5 md:mt-32 md:grid-cols-3">
          {heroQuestions.map((question,index)=>(
            <motion.div key={question} variants={{hidden:{opacity:0,y:30},show:{opacity:1,y:0,transition:{duration:.8,ease}}}} whileHover={{y:-12,borderColor:'rgba(198,168,114,.4)',boxShadow:'0 20px 40px rgba(35,42,26,0.08)'}} className="premium-panel group cursor-default rounded-[2.5rem] bg-white/40 p-8 transition-all duration-500">
              <div className="flex flex-col gap-6">
                <span className="editorial text-4xl text-softGold/30 transition-colors duration-500 group-hover:text-softGold">0{index+1}</span>
                <p className="text-xl leading-8 text-warmBlack transition-colors duration-500 group-hover:text-deepGold">{question}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
