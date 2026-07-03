'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { methodSteps } from '@/lib/sibylle/siteData';

export function MethodStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({target:ref,offset:['start .75','end .35']});
  const line = useTransform(scrollYProgress,[0,1],['0%','100%']);
  return <section ref={ref} className="grain section-shell overflow-hidden bg-deepOlive text-cream">
    <div className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-softGold/10 blur-[110px]" />
    <div className="container relative z-10"><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
      <div className="lg:sticky lg:top-32 lg:h-fit"><p className="eyebrow !text-sand">Die Methode</p><h2 className="editorial mt-7 text-[clamp(3.2rem,5.2vw,5.8rem)] leading-[.92]">Vom Thema zur neuen Bewegung.</h2><p className="mt-7 max-w-md leading-8 text-cream/60">Fünf klare Phasen geben dem Prozess Orientierung, ohne das persönliche Erleben in ein starres Schema zu pressen.</p></div>
      <div className="relative pl-12 md:pl-20"><div className="absolute bottom-8 left-[15px] top-8 w-px bg-cream/15 md:left-[31px]"/><motion.div style={{height:line}} className="absolute left-[15px] top-8 w-px bg-gradient-to-b from-softGold to-sand md:left-[31px]"/>
        {methodSteps.map((step,index)=><motion.article key={step.title} initial={{opacity:.25,x:25}} whileInView={{opacity:1,x:0}} viewport={{amount:.65}} transition={{duration:.6}} className="relative min-h-[15rem] border-b border-cream/10 py-10 last:border-0">
          <motion.span whileInView={{scale:[.7,1.18,1],backgroundColor:['#3F4A2C','#A99450','#FEFAF0']}} viewport={{amount:.7}} className="absolute -left-[48px] top-12 flex h-8 w-8 items-center justify-center rounded-full border border-softGold/60 text-xs font-bold text-deepOlive md:-left-[64px]">{index+1}</motion.span>
          <span className="text-[.65rem] font-bold uppercase tracking-[.25em] text-sand/70">Phase 0{index+1}</span><h3 className="editorial mt-3 text-4xl md:text-5xl">{step.title}</h3><p className="mt-4 max-w-xl leading-8 text-cream/60">{step.description}</p>
        </motion.article>)}
      </div>
    </div></div>
  </section>;
}
