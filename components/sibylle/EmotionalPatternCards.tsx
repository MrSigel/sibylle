'use client';
import { motion } from 'framer-motion';
import { emotionalPatterns } from '@/lib/sibylle/siteData';
import { CTAButton } from './CTAButton';

export function EmotionalPatternCards() {
  return <section className="grain section-shell overflow-hidden bg-warmBlack text-cream">
    <div className="absolute left-[15%] top-0 h-[40rem] w-[40rem] rounded-full bg-olive/20 blur-[130px]" />
    <div className="container relative z-10 grid gap-16 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-24">
      <motion.div initial={{opacity:0,x:-35}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:1,ease:[0.22, 1, 0.36, 1]}}>
        <p className="eyebrow !text-sand">Emotionale Muster</p>
        <h2 className="editorial mt-7 text-[clamp(3.2rem,5.5vw,6rem)] leading-[.92]">Die Geschichte kennt dich schon.</h2>
        <p className="mt-8 max-w-lg text-lg leading-9 text-cream/65">
          Wiederholungen haben oft eine innere Logik. Wenn sie sichtbar wird, entsteht Raum für eine eigene Position und neue Freiheit.
        </p>
        <div className="mt-12">
           <CTAButton href="/beziehungsmuster" variant="secondary" className="border-white/20 text-white hover:bg-white/10">Mehr über Muster erfahren</CTAButton>
        </div>
      </motion.div>

      <div className="relative space-y-6 py-6">
        <div className="absolute bottom-0 left-7 top-0 w-px bg-gradient-to-b from-transparent via-softGold/30 to-transparent" />
        {emotionalPatterns.map((item,index)=>(
          <motion.article 
            key={item.title} 
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{once:true,amount:0.2}} 
            variants={{
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] } },
              hover: { 
                x: 12, 
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(198, 168, 114, 0.4)",
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            className="group relative rounded-[2.2rem] border border-cream/10 bg-cream/[.045] p-8 pl-20 backdrop-blur-md transition-all duration-500 md:p-10 md:pl-28"
          >
            <motion.span 
              variants={{
                initial: { x: 0, scale: 1 },
                hover: { x: 10, scale: 1.15 }
              }}
              className="editorial absolute left-8 top-8 text-4xl text-softGold/40 transition-colors duration-500 group-hover:text-softGold md:left-10 md:top-10"
            >
              0{index+1}
            </motion.span>
            <h3 className="editorial text-3xl md:text-4xl">{item.title}</h3>
            <p className="mt-4 max-w-lg text-base leading-8 text-cream/60 transition-colors duration-500 group-hover:text-cream/80">
              {item.description}
            </p>
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-[2.2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-softGold/5 to-transparent pointer-events-none" />
          </motion.article>
        ))}
      </div>
    </div>
  </section>;
}
